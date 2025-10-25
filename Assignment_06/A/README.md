# Calculator Web Application with User Login

## Description
 The application validates user credentials against hardcoded users and provides real-time form validation using jQuery.

## Features Implemented

### Login Page
- Email validation with @northeastern.edu domain requirement
- Password validation with minimum 8 characters requirement
- Real-time validation on keyup and blur events
- Dynamic login button state (disabled until validation passes)
- Remember Me functionality using localStorage/sessionStorage
- Error messages displayed below input fields
- Success message with smooth animation before redirect
- No pop-up alerts for better user experience

### Calculator Page
- Session authentication check on page load
- Welcome message with username display
- Two number input fields with validation
- Four arithmetic operations: Add, Subtract, Multiply, Divide
- Single arrow function handling all operations
- Division by zero error handling
- Real-time input validation for numeric values
- Support for decimals and negative numbers
- Result display in read-only field
- Logout functionality with fade animation
- Automatic redirect to login page for unauthenticated users

## Technologies Used
- HTML5
- CSS3 (Flexbox and Grid Layout)
- JavaScript ES6+ (Arrow Functions)
- jQuery 3.6.0
