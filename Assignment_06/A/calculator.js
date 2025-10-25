const calculate = (num1, num2, operation) => {
    const n1 = parseFloat(num1);
    const n2 = parseFloat(num2);
    
    switch(operation) {
        case 'add':
            return n1 + n2;
        case 'subtract':
            return n1 - n2;
        case 'multiply':
            return n1 * n2;
        case 'divide':
            if (n2 === 0) {
                throw new Error('Cannot divide by zero');
            }
            return n1 / n2;
        default:
            throw new Error('Invalid operation');
    }
};

const validateNumber = (value) => {
    if (!value || value.trim() === '') {
        return { valid: false, message: 'Please enter a valid number' };
    }
    
    const numRegex = /^-?\d*\.?\d+$/;
    if (!numRegex.test(value.trim())) {
        return { valid: false, message: 'Please enter a valid number' };
    }
    
    return { valid: true, message: '' };
};

$(document).ready(() => {
    const sessionData = JSON.parse(sessionStorage.getItem('userSession')) || 
                       JSON.parse(localStorage.getItem('userSession'));
    
    if (!sessionData || !sessionData.isLoggedIn) {
        window.location.href = 'login.html';
        return;
    }
    
    $('#welcomeMessage').text(`Welcome, ${sessionData.username}!`);
    
    $('#number1').on('focus', () => {
        $('#number1Error').text('').hide();
    });
    
    $('#number2').on('focus', () => {
        $('#number2Error').text('').hide();
    });
    
    $('#number1, #number2').on('keyup blur', function() {
        const value = $(this).val();
        const errorId = $(this).attr('id') + 'Error';
        const validation = validateNumber(value);
        
        if (value && !validation.valid) {
            $('#' + errorId).text(validation.message).show();
        } else {
            $('#' + errorId).text('').hide();
        }
    });
    
    $('.operation-btn').on('click', function() {
        const operation = $(this).data('operation');
        const num1 = $('#number1').val();
        const num2 = $('#number2').val();
        
        const validation1 = validateNumber(num1);
        const validation2 = validateNumber(num2);
        
        let hasError = false;
        
        if (!validation1.valid) {
            $('#number1Error').text(validation1.message).show();
            hasError = true;
        } else {
            $('#number1Error').text('').hide();
        }
        
        if (!validation2.valid) {
            $('#number2Error').text(validation2.message).show();
            hasError = true;
        } else {
            $('#number2Error').text('').hide();
        }
        
        if (hasError) {
            $('#result').val('');
            return;
        }
        
        try {
            const result = calculate(num1, num2, operation);
            $('#result').val(result).fadeIn(300);
        } catch (error) {
            if (operation === 'divide' && parseFloat(num2) === 0) {
                $('#number2Error').text('Cannot divide by zero').show();
                $('#result').val('');
            } else {
                $('#result').val('Error');
            }
        }
    });
    
    $('#logoutBtn').on('click', () => {
        sessionStorage.removeItem('userSession');
        localStorage.removeItem('userSession');
        
        $('.calculator-card').fadeOut(500, () => {
            window.location.href = 'login.html';
        });
    });
});



