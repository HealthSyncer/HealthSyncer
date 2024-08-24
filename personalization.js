document.addEventListener('DOMContentLoaded', function () {
    const userId = "uniqueUserId"; // You can replace this with an actual unique user ID from your authentication system

    // Reference to the user's preferences in Firebase
    const userRef = firebase.database().ref('users/' + userId + '/preferences');

    // Preload saved preferences from Firebase
    userRef.once('value').then((snapshot) => {
        const data = snapshot.val();
        if (data) {
            if (data.fitnessGoal) {
                document.getElementById('goal').value = data.fitnessGoal;
            }
            if (data.fitnessExperience) {
                document.getElementById('experience').value = data.fitnessExperience;
            }
            if (data.workoutAvailability) {
                document.getElementById('availability').value = data.workoutAvailability;
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
        userRef.set({
            fitnessGoal: goal,
            fitnessExperience: experience,
            workoutAvailability: availability
        }, function (error) {
            if (error) {
                alert("Failed to save preferences. Please try again.");
                console.error("Error storing data:", error);
            } else {
                alert('Preferences saved! You can now view your personalized dashboard.');
                window.location.href = 'home.html';
            }
        });
    });
});
