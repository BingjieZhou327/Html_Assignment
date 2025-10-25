class Stopwatch {
    constructor() {
        this.seconds = 0;
        this.isRunning = false;
        this.isPaused = false;
        this.intervalId = null;
        this.currentSession = {
            date: '',
            eventName: '',
            startTime: null
        };
        
        this.init();
    }

    init() {
        this.setTodayDate();
        this.loadHistory();
        this.updateStatistics();
        this.attachEventListeners();
    }

    setTodayDate() {
        const today = new Date().toISOString().split('T')[0];
        $('#eventDate').val(today);
    }

    attachEventListeners() {
        $('#startBtn').on('click', () => this.start());
        $('#pauseBtn').on('click', () => this.togglePause());
        $('#stopBtn').on('click', () => this.stopAndSave());
        $('#resetBtn').on('click', () => this.reset());
        
        $('#eventDate').on('focus', () => this.clearError('dateError'));
        $('#eventName').on('focus', () => this.clearError('nameError'));
        
        $('#filterDate').on('change', () => this.filterHistory());
        $('#clearFilterBtn').on('click', () => this.clearFilter());
    }

    clearError(errorId) {
        $(`#${errorId}`).text('');
    }

    validateInputs() {
        let isValid = true;
        const date = $('#eventDate').val().trim();
        const eventName = $('#eventName').val().trim();

        $('#dateError').text('');
        $('#nameError').text('');

        if (!date) {
            $('#dateError').text('Please select a date');
            isValid = false;
        }

        if (!eventName) {
            $('#nameError').text('Event name is required');
            isValid = false;
        } else if (eventName.length < 3) {
            $('#nameError').text('Event name must be at least 3 characters');
            isValid = false;
        } else if (eventName.length > 100) {
            $('#nameError').text('Event name too long (max 100 characters)');
            isValid = false;
        } else if (!/^[a-zA-Z0-9\s\-']+$/.test(eventName)) {
            $('#nameError').text('Event name contains invalid characters');
            isValid = false;
        }

        return isValid;
    }

    async start() {
        if (!this.validateInputs()) {
            return;
        }

        this.isRunning = true;
        this.isPaused = false;
        this.currentSession.date = $('#eventDate').val();
        this.currentSession.eventName = $('#eventName').val().trim();
        this.currentSession.startTime = new Date();

        $('#eventDate').prop('disabled', true);
        $('#eventName').prop('disabled', true);
        $('#startBtn').prop('disabled', true);
        $('#pauseBtn').prop('disabled', false);
        $('#stopBtn').prop('disabled', false);
        $('#resetBtn').prop('disabled', false);

        await this.runTimer();
    }

    async runTimer() {
        return new Promise((resolve) => {
            this.intervalId = setInterval(() => {
                if (!this.isPaused) {
                    this.seconds++;
                    this.updateDisplay();
                }
            }, 1000);
        });
    }

    togglePause() {
        this.isPaused = !this.isPaused;
        
        if (this.isPaused) {
            $('#pauseBtn').text('Resume').removeClass('btn-pause').addClass('btn-start');
        } else {
            $('#pauseBtn').text('Pause').removeClass('btn-start').addClass('btn-pause');
        }
    }

    async stopAndSave() {
        if (!this.isRunning) {
            return;
        }

        this.isRunning = false;
        this.isPaused = false;
        
        if (this.intervalId) {
            clearInterval(this.intervalId);
            this.intervalId = null;
        }

        await this.saveSession();
        this.reset();
        this.showNotification('Session saved successfully!', 'success');
    }

    async saveSession() {
        const session = {
            id: Date.now(),
            date: this.currentSession.date,
            eventName: this.currentSession.eventName,
            duration: this.seconds,
            timestamp: new Date().toISOString()
        };

        const sessions = this.getSessions();
        sessions.unshift(session);
        localStorage.setItem('stopwatchSessions', JSON.stringify(sessions));

        this.loadHistory();
        this.updateStatistics();
    }

    reset() {
        if (this.intervalId) {
            clearInterval(this.intervalId);
            this.intervalId = null;
        }

        this.seconds = 0;
        this.isRunning = false;
        this.isPaused = false;
        this.updateDisplay();

        $('#eventDate').prop('disabled', false);
        $('#eventName').prop('disabled', false);
        $('#startBtn').prop('disabled', false);
        $('#pauseBtn').prop('disabled', true).text('Pause').removeClass('btn-start').addClass('btn-pause');
        $('#stopBtn').prop('disabled', true);
        $('#resetBtn').prop('disabled', true);

        this.currentSession = {
            date: '',
            eventName: '',
            startTime: null
        };
    }

    updateDisplay() {
        const formatted = this.formatTime(this.seconds);
        $('#timerDisplay').text(formatted);
    }

    formatTime(totalSeconds) {
        const hours = Math.floor(totalSeconds / 3600);
        const minutes = Math.floor((totalSeconds % 3600) / 60);
        const seconds = totalSeconds % 60;

        return `${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
    }

    getSessions() {
        const sessionsData = localStorage.getItem('stopwatchSessions');
        return sessionsData ? JSON.parse(sessionsData) : [];
    }

    loadHistory(filterDate = null) {
        const sessions = this.getSessions();
        const $historyList = $('#historyList');
        $historyList.empty();

        let filteredSessions = sessions;
        if (filterDate) {
            filteredSessions = sessions.filter(session => session.date === filterDate);
        }

        if (filteredSessions.length === 0) {
            $historyList.html('<div class="empty-message">No sessions recorded yet</div>');
            return;
        }

        filteredSessions.forEach(session => {
            const $item = $('<div class="history-item"></div>');
            
            const formattedDate = new Date(session.date).toLocaleDateString('en-US', {
                year: 'numeric',
                month: 'long',
                day: 'numeric'
            });

            $item.html(`
                <div class="history-date">${formattedDate}</div>
                <div class="history-name">${this.escapeHtml(session.eventName)}</div>
                <div class="history-duration">${this.formatTime(session.duration)}</div>
            `);

            $historyList.append($item);
        });
    }

    filterHistory() {
        const filterDate = $('#filterDate').val();
        if (filterDate) {
            this.loadHistory(filterDate);
        } else {
            this.loadHistory();
        }
    }

    clearFilter() {
        $('#filterDate').val('');
        this.loadHistory();
    }

    updateStatistics() {
        const sessions = this.getSessions();
        const totalSessions = sessions.length;
        const totalSeconds = sessions.reduce((sum, session) => sum + session.duration, 0);

        $('#totalSessions').text(totalSessions);
        $('#totalTime').text(this.formatTime(totalSeconds));
    }

    showNotification(message, type = 'success') {
        const $notification = $('#notification');
        $notification.text(message);
        $notification.removeClass('error info').addClass(type);
        $notification.addClass('show');

        setTimeout(() => {
            $notification.removeClass('show');
        }, 3000);
    }

    escapeHtml(text) {
        const map = {
            '&': '&amp;',
            '<': '&lt;',
            '>': '&gt;',
            '"': '&quot;',
            "'": '&#039;'
        };
        return text.replace(/[&<>"']/g, m => map[m]);
    }
}

$(document).ready(() => {
    new Stopwatch();
});

