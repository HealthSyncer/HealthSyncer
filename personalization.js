document.getElementById('personalizationForm').addEventListener('submit', function (e) {
    e.preventDefault();

    // Get selected values
    const goal = document.getElementById('goal').value;
    const experience = document.getElementById('experience').value;
    const availability = document.getElementById('availability').value;

    // Store preferences in localStorage
    localStorage.setItem('fitnessGoal', goal);
    localStorage.setItem('fitnessExperience', experience);
    localStorage.setItem('workoutAvailability', availability);

    // Redirect to the dashboard or another relevant page
    alert('Preferences saved! You can now view your personalized dashboard.');
    window.location.href = 'home.html';
});

// Preload saved preferences if available
window.addEventListener('DOMContentLoaded', function () {
    if (localStorage.getItem('fitnessGoal')) {
        document.getElementById('goal').value = localStorage.getItem('fitnessGoal');
    }
    if (localStorage.getItem('fitnessExperience')) {
        document.getElementById('experience').value = localStorage.getItem('fitnessExperience');
    }
    if (localStorage.getItem('workoutAvailability')) {
        document.getElementById('availability').value = localStorage.getItem('workoutAvailability');
    }
});
