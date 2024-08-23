// Set up our password reset function
function resetPassword() {
    // Get the email from the form
    var email = document.getElementById('email').value;

    // Validate the email
    if (validate_email(email) == false) {
        alert('Please enter a valid email address!');
        return;
    }

    // Send password reset email
    auth.sendPasswordResetEmail(email)
        .then(function() {
            alert('Password reset email sent! Please check your inbox.');
        })
        .catch(function(error) {
            // Firebase will use this to alert of its errors
            var error_code = error.code;
            var error_message = error.message;

            alert(error_message);
        });
}
