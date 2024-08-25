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

window.onload = function() {
  const userId = localStorage.getItem('userId');

  if (userId) {
    const userRef = database.ref('users/' + userId);

    userRef.once('value').then((snapshot) => {
      const userData = snapshot.val();

      if (userData) {
        // Display welcome message
        document.getElementById('welcomeMessage').innerText = `Welcome, ${userData.first_name}!`;

        // Load user preferences and dynamically generate content
        loadUserPreferences(userData.preferences);
      }
    }).catch((error) => {
      console.error("Error fetching user data:", error);
    });
  } else {
    // Redirect to login page if no user is logged in
    window.location.href = "index.html";
  }
};

// Function to dynamically load user preferences
function loadUserPreferences(preferences) {
  const dataLoggingSection = document.getElementById('customDataLogging');
  dataLoggingSection.innerHTML = ''; // Clear previous content

  // Add buttons based on preferences
  if (preferences.trackHeartRate) {
    dataLoggingSection.innerHTML += `<button onclick="window.location.href='#'">Heart Rate Input</button>`;
  }
  if (preferences.trackFoodIntake) {
    dataLoggingSection.innerHTML += `<button onclick="window.location.href='#'">Food Intake Input</button>`;
  }
  if (preferences.trackWaterIntake) {
    dataLoggingSection.innerHTML += `<button onclick="window.location.href='#'">Water Intake Input</button>`;
  }
  // Add more options dynamically based on user preferences
}

// Initialize Firebase (if not already initialized in this file)
// Your Firebase configuration should already be set up before this code

// Fetch the user's first name from Firebase and update the header
auth.onAuthStateChanged(function(user) {
    if (user) {
        const userId = user.uid;

        // Reference to the user's data in the Firebase database
        const userRef = database.ref('users/' + userId);

        // Fetch the user's first name and update the welcome message
        userRef.once('value').then(function(snapshot) {
            const userData = snapshot.val();
            const firstName = userData.first_name || "User"; // Fallback if the first name isn't available
            document.getElementById('userFirstName').textContent = firstName;
        }).catch(function(error) {
            console.error('Error fetching user data:', error);
        });
    } else {
        // Redirect to login page if user is not authenticated
        window.location.href = "index.html";
    }
});
