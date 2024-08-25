// Your web app's Firebase configuration
var firebaseConfig = {
  apiKey: "AIzaSyCmENSjs-wTyV1DlBPdEgVBYnZLCGsb-Ds",
  authDomain: "fitnessapp-ec7b6.firebaseapp.com",
  projectId: "fitnessapp-ec7b6",
  storageBucket: "fitnessapp-ec7b6.appspot.com",
  messagingSenderId: "501872278608",
  appId: "1:501872278608:web:2edd766fb14b1de60ae555",
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);

// Initialize variables
const auth = firebase.auth();
const database = firebase.database();

// Function to personalize and save user data
function personalize() {
  // Get all input fields
  const age = document.getElementById('age').value;
  const gender = document.getElementById('gender').value;
  const weight = document.getElementById('weight').value;
  const height = document.getElementById('height').value;
  const selectedComplications = Array.from(document.querySelectorAll('input[name="health-complications"]:checked')).map(el => el.value);

  // Validate input fields
  if (!validate_weight(weight) || !validate_height(height)) {
    alert('Weight or Height are not entered correctly!');
    return;
  }
  if (!validate_field(age) || !validate_field(gender) || selectedComplications.length === 0) {
    alert('One or more fields are missing!');
    return;
  }

  // Check if user is authenticated
  auth.onAuthStateChanged(function(user) {
    if (user) {
      // User is signed in, save the data
      const userRef = database.ref('users/' + user.uid);

      const userData = {
        age: age,
        gender: gender,
        weight: weight,
        height: height,
        healthComplications: selectedComplications,
        last_personalization: Date.now()
      };

      // Update the user data
      userRef.update(userData).then(() => {
        alert('User Details Saved!');
        window.location.href = "home.html"; // Redirect to home.html after saving
      }).catch(error => {
        console.error('Error updating preferences:', error);
        alert('Error: ' + error.message);
      });
    } else {
      alert('User not logged in!');
      window.location.href = "index.html";
    }
  });
}

// Event listener for the form submission
document.getElementById('personalizationForm').addEventListener('submit', function(event) {
  event.preventDefault();
  personalize(); // Call the personalize function
});

// Validation functions
function validate_weight(weight) {
  return weight > 0; // Simple validation for weight
}

function validate_height(height) {
  return height > 0; // Simple validation for height
}

function validate_field(field) {
  return field != null && field.trim().length > 0;
}
