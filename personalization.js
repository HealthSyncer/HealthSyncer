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

// Check if user is authenticated
auth.onAuthStateChanged(function(user) {
  if (user) {
    // User is signed in
    const userRef = database.ref('users/' + user.uid);

    // Load existing user data
    userRef.once('value').then(function(snapshot) {
      const data = snapshot.val();

      if (data) {
        document.getElementById('age').value = data.age || '';
        document.getElementById('gender').value = data.gender || '';
        document.getElementById('weight').value = data.weight || '';
        document.getElementById('height').value = data.height || '';

        if (data.healthComplications) {
          data.healthComplications.forEach(comp => {
            document.querySelector(`input[value="${comp}"]`).checked = true;
          });
        }
      }
    }).catch(error => {
      console.error('Error loading user data:', error);
    });
  } else {
    // Done
    alert('User Not Logged In.')
    window.location.href = "index.html";
  }
});

document.getElementById('personalizationForm').addEventListener('submit', function(event) {
  event.preventDefault();

  // Get the selected health complications
  const selectedComplications = Array.from(document.querySelectorAll('input[name="health-complications"]:checked')).map(el => el.value);

  // Get the user
  const user = auth.currentUser;

  if (user) {
    // Save the form data
    const userRef = database.ref('users/' + user.uid);

    userRef.update({
      age: document.getElementById('age').value,
      gender: document.getElementById('gender').value,
      weight: document.getElementById('weight').value,
      height: document.getElementById('height').value,
      healthComplications: selectedComplications
    }).then(() => {
    // Done
      alert('User Details Saved!!')
      window.location.href = "home.html";
      }
    }).catch(error => {
      console.error('Error updating preferences:', error);
      alert('Error: ' + error.message);
    });
  } else {
    console.error('No user is signed in.');
    alert('User Not Logged In.')
    window.location.href = "index.html";
  }
});
