// Form validation
const firstNameIn = document.getElementById('first-name');
const lastNameIn = document.getElementById('last-name');
const emailIn = document.getElementById('email');
const messageIn = document.getElementById('message');

$('#contact-form').submit(function(e){
    var contactPosY = $('#contact').offset().top;
    window.scrollTo(0, contactPosY);

    // Validate fields
    var isFirstNameValid = checkName(firstNameIn),
        isLastNameValid = checkName(lastNameIn),
        isEmailValid = checkEmail(),
        isMessageValid = checkMessage();

    var isFormValid = isFirstNameValid &&
        isLastNameValid &&
        isEmailValid &&
        isMessageValid;

    // Prevent the form from submitting if errors and scroll to top of form
    if (!isFormValid) {
        e.preventDefault();
        $('#form__error-info').html('Error: Please check your inputs below.');
    }
});

// Check Names Inputs are Valid
const checkName = (input) => {
    var valid = false;

    const min = 1,
        max = 25;

    const inputTrim = input.value.trim();

    // Check if input isn't blank
    if (!isRequired(inputTrim)) {
        showError(input, 'Feild cannot be blank.'); 
    } 
    // Check if input isnt too long or short
    else if (!isBetween(inputTrim.length, min, max)) {
        showError(input, `Feild must be between ${min} and ${max} characters.`);
    } 
    
    else {
        showSuccess(input);
        valid = true;
    }
    return valid;
};

// Check Message Inputs is valid
const checkMessage = () => {

    var valid = false;

    const min = 1,
        max = 750;

    const messageTrim = messageIn.value.trim();

    // Check if input isn't blank
    if (!isRequired(messageTrim)) {
        showError(messageIn, 'Feild cannot be blank.');
    } 
    // Check if input isnt too long or short
    else if (!isBetween(messageTrim.length, min, max)) {
        showError(messageIn, `Feild must be between ${min} and ${max} characters.`);
    }
    
    else {
        showSuccess(messageIn);
        valid = true;
    }
    return valid;
};

// Check Email is in a valid format and is present
const checkEmail = () => {
    var valid = false;
    const email = emailIn.value.trim();
    if (!isRequired(email)) {
        showError(emailIn, 'Email cannot be blank.');
    } else if (!isEmailValid(email)) {
        showError(emailIn, 'Email is not valid.');
    } else {
        showSuccess(emailIn);
        valid = true;
    }
    return valid;
};

const isEmailValid = (email) => {
    const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(email);
};

const isRequired = value => value === '' ? false : true;
const isBetween = (length, min, max) => length < min || length > max ? false : true;


const showError = (input, message) => {
    // Get the form-field element
    const formField = input.parentElement;

    // Add event listener for input changes
    if ($.inArray('error', input.classList) != 1) {
        addChangeListener(input);
    }

    // Add the error class
    input.classList.remove('success');
    input.classList.add('error');

    // Show the error message
    const error = formField.querySelector('small');
    error.textContent = message;
};

const showSuccess = (input) => {
    // Get the form-field element
    const formField = input.parentElement;

    // Remove the error class
    input.classList.remove('error');
    input.classList.add('success');

    // Hide the error message
    const error = formField.querySelector('small');
    error.textContent = '';
};

function addChangeListener(input) {
    var id = `#${input.id}`;
    $(id).change(function() {
        if (input == firstNameIn) {
            checkName(firstNameIn);
        }

        else if(input == lastNameIn) {
            checkName(lastNameIn);
        }

        else if(input == emailIn) {
            checkEmail();
        }

        else if(input == messageIn) {
            checkMessage();
        }
    });
}
