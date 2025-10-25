const hardcodedUsers = [
    { email: 'john.doe@northeastern.edu', password: 'Password123' },
    { email: 'jane.smith@northeastern.edu', password: 'SecurePass456' },
    { email: 'admin@northeastern.edu', password: 'Admin12345' }
];

let emailValid = false;
let passwordValid = false;

const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email) {
        return { valid: false, message: 'Please enter a valid Northeastern email' };
    }
    if (!emailRegex.test(email)) {
        return { valid: false, message: 'Please enter a valid Northeastern email' };
    }
    if (!email.endsWith('@northeastern.edu')) {
        return { valid: false, message: 'Please enter a valid Northeastern email' };
    }
    return { valid: true, message: '' };
};

const validatePassword = (password) => {
    if (!password) {
        return { valid: false, message: 'Password cannot be empty' };
    }
    if (password.length < 8) {
        return { valid: false, message: 'Password must be at least 8 characters' };
    }
    return { valid: true, message: '' };
};

const updateLoginButton = () => {
    if (emailValid && passwordValid) {
        $('#loginBtn').prop('disabled', false);
    } else {
        $('#loginBtn').prop('disabled', true);
    }
};

$(document).ready(() => {
    $('#email').on('focus', () => {
        $('#emailError').text('').hide();
        $('#loginError').text('').hide();
    });

    $('#email').on('keyup blur', function() {
        const email = $(this).val();
        const validation = validateEmail(email);
        
        if (!validation.valid) {
            $('#emailError').text(validation.message).show();
            emailValid = false;
        } else {
            $('#emailError').text('').hide();
            emailValid = true;
        }
        updateLoginButton();
    });

    $('#password').on('focus', () => {
        $('#passwordError').text('').hide();
        $('#loginError').text('').hide();
    });

    $('#password').on('keyup blur', function() {
        const password = $(this).val();
        const validation = validatePassword(password);
        
        if (!validation.valid) {
            $('#passwordError').text(validation.message).show();
            passwordValid = false;
        } else {
            $('#passwordError').text('').hide();
            passwordValid = true;
        }
        updateLoginButton();
    });

    $('#loginForm').on('submit', (e) => {
        e.preventDefault();
        
        const email = $('#email').val();
        const password = $('#password').val();
        const rememberMe = $('#rememberMe').is(':checked');
        
        const user = hardcodedUsers.find(u => u.email === email && u.password === password);
        
        if (user) {
            const username = email.split('@')[0];
            const sessionData = {
                username: username,
                email: email,
                loginTimestamp: new Date().toISOString(),
                isLoggedIn: true
            };
            
            const storage = rememberMe ? localStorage : sessionStorage;
            storage.setItem('userSession', JSON.stringify(sessionData));
            
            $('#loginError').text('').hide();
            $('#successMessage').text('Login successful! Redirecting...').fadeIn(300);
            
            setTimeout(() => {
                window.location.href = 'calculator.html';
            }, 2000);
        } else {
            $('#loginError').text('Invalid email or password').show();
        }
    });
});

