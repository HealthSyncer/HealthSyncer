// Initialize Firebase
var firebaseConfig = {
  apiKey: "AIzaSyCmENSjs-wTyV1DlBPdEgVBYnZLCGsb-Ds",
  authDomain: "fitnessapp-ec7b6.firebaseapp.com",
  projectId: "fitnessapp-ec7b6",
  storageBucket: "fitnessapp-ec7b6.appspot.com",
  messagingSenderId: "501872278608",
  appId: "1:501872278608:web:2edd766fb14b1de60ae555",
};
firebase.initializeApp(firebaseConfig);
const database = firebase.database();

// Load the user’s information on the home page
window.onload = function() {
  const userId = localStorage.getItem('userId');

  if (userId) {
    const userRef = database.ref('users/' + userId);

    userRef.once('value').then((snapshot) => {
      const userData = snapshot.val();

      if (userData && userData.first_name) {
        // Display the welcome message with the user's first name
        document.getElementById('welcomeMessage').innerText = Welcome, ${userData.first_name}!;
      }
    }).catch((error) => {
      console.error("Error fetching user data:", error);
    });
  } else {
    // If no user is found, redirect to the login page
    window.location.href = "index.html";
  }
};
