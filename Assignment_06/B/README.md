# Event Stopwatch with Session Logging



## Features Implemented

### Core Features
- **Precision Stopwatch Timer**: Accurate time tracking with HH:MM:SS format display
- **Date Association**: HTML5 date picker to organize sessions by specific dates
- **Event Naming**: Text input field to label each timed activity
- **Session History**: Complete log of all saved sessions stored in localStorage
- **Date Filtering**: Filter session history by specific dates
- **Statistics Dashboard**: Real-time display of total sessions count and cumulative time
- **Validation System**: Comprehensive jQuery-based validation for all inputs

### Control Features
- **Start Button**: Initiates stopwatch with validation checks
- **Pause/Resume Button**: Toggle pause state with dynamic button text
- **Stop & Save Button**: Stops timer and persists session to localStorage
- **Reset Button**: Clears timer without saving the session


### Validation Rules
- **Date Field**: Required before starting timer
- **Event Name**: 
  - Required (minimum 3 characters, maximum 100 characters)
  - Only allows letters, numbers, spaces, hyphens, and apostrophes
  - Specific error messages for each validation failure

## Technologies Used
- **HTML5**: Semantic markup, date input type
- **CSS3**: Flexbox, Grid, Gradients, Animations, Media Queries
- **JavaScript ES6+**: Classes, Arrow Functions, Template Literals, Destructuring
- **jQuery 3.6.0**: DOM manipulation, Event handling, Validation

### Usage Instructions
1. **Select a Date**: Use the date picker to choose when you're timing the activity
2. **Enter Event Name**: Type a descriptive name (3-100 characters)
3. **Start Timer**: Click "Start" button to begin timing
4. **Pause/Resume**: Use pause button to temporarily stop timing
5. **Stop & Save**: Click to stop timer and save session to history
6. **Reset**: Clear timer without saving
7. **Filter History**: Select a date to view sessions from that specific day
8. **View Statistics**: Check total sessions and cumulative time at any moment

