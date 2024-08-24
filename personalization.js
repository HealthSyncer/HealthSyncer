// Your web app's Firebase configuration
const firebaseConfig = {
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
const app = firebase.initializeApp(firebaseConfig);
const auth = firebase.auth()
const database = firebase.database()

document.addEventListener('DOMContentLoaded', function () {
    const userId = "uniqueUserId"; // You can replace this with an actual unique user ID from your authentication system

    // Reference to the user's details in Firebase
    const userRef = firebase.database().ref('users/' + userId);

    // Preload saved preferences from Firebase
    userRef.once('value').then((snapshot) => {
        const data = snapshot.val();
        if (data) {
            if (data.preferences) {
                if (data.preferences.fitnessGoal) {
                    document.getElementById('goal').value = data.preferences.fitnessGoal;
                }
                if (data.preferences.fitnessExperience) {
                    document.getElementById('experience').value = data.preferences.fitnessExperience;
                }
                if (data.preferences.workoutAvailability) {
                    document.getElementById('availability').value = data.preferences.workoutAvailability;
                }
            }
        }
    });

    document.getElementById('personalizationForm').addEventListener('submit', function (e) {
        e.preventDefault();

        // Get selected values
        const goal = document.getElementById('goal').value;
        const experience = document.getElementById('experience').value;
        const availability = document.getElementById('availability').value;

        // Store preferences in Firebase
        userRef.update({
            preferences: {
                fitnessGoal: goal,
                fitnessExperience: experience,
                workoutAvailability: availability
            }
        }).then(() => {
            alert('Preferences saved! You can now view your personalized dashboard.');
            window.location.href = 'home.html';
        }).catch(error => {
            alert("Failed to save preferences. Please try again.");
            console.error("Error storing data:", error);
        });
    });
});
