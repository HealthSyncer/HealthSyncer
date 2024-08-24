    <script>
        // Your Firebase configuration
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
        const database = firebase.database();

        document.addEventListener('DOMContentLoaded', function () {
            const userId = "uniqueUserId"; // Replace this with the actual user ID from your authentication system

            // Reference to the user's preferences in Firebase
            const userRef = firebase.database().ref('users/' + userId + '/preferences');

            // Preload saved preferences from Firebase
            userRef.once('value').then((snapshot) => {
                const data = snapshot.val();
                if (data) {
                    if (data.age) {
                        document.getElementById('age').value = data.age;
                    }
                    if (data.gender) {
                        document.getElementById('gender').value = data.gender;
                    }
                    if (data.weight) {
                        document.getElementById('weight').value = data.weight;
                    }
                    if (data.height) {
                        document.getElementById('height').value = data.height;
                    }
                    if (data.healthComplications) {
                        // Pre-select multiple options for health complications
                        const healthComplications = data.healthComplications;
                        const healthCompSelect = document.getElementById('health-comp');
                        for (let option of healthCompSelect.options) {
                            if (healthComplications.includes(option.value)) {
                                option.selected = true;
                            }
                        }
                    }
                }
            });

            document.getElementById('personalizationForm').addEventListener('submit', function (e) {
                e.preventDefault();

                // Get selected values
                const age = document.getElementById('age').value;
                const gender = document.getElementById('gender').value;
                const weight = document.getElementById('weight').value;
                const height = document.getElementById('height').value;

                // Get all selected health complications
                const healthCompSelect = document.getElementById('health-comp');
                const healthComplications = Array.from(healthCompSelect.selectedOptions).map(option => option.value);

                // Store preferences in Firebase
                userRef.set({
                    age: age,
                    gender: gender,
                    weight: weight,
                    height: height,
                    healthComplications: healthComplications
                }, function (error) {
                    if (error) {
                        alert("Failed to save preferences. Please try again.");
                        console.error("Error storing data:", error);
                    } else {
                        alert('Preferences saved! You can now view your personalized dashboard.');
                        window.location.href = 'home.html'; // Redirect to home page
                    }
                });
            });
        });
