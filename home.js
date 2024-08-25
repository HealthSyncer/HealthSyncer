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

async function startHeartRateTracking() {
    const video = document.getElementById('cameraView');
    const heartRateResult = document.getElementById('heartRateResult');

    try {
        // Request access to the user's camera
        const stream = await navigator.mediaDevices.getUserMedia({ video: { facingMode: 'environment' } });
        video.srcObject = stream;
        video.play();

        heartRateResult.innerHTML = "Place your finger on the back camera and hold still...";

        // Analyze the video frames for heart rate
        analyzeHeartRate(video);
    } catch (err) {
        console.error("Error accessing camera: ", err);
        heartRateResult.innerHTML = "Camera access denied or unavailable.";
    }
}

function analyzeHeartRate(video) {
    const context = document.createElement('canvas').getContext('2d');
    const heartRateResult = document.getElementById('heartRateResult');

    let frameData = [];
    const sampleSize = 100;
    const samplingInterval = 50; // ms

    const processFrame = () => {
        if (frameData.length >= sampleSize) {
            calculateHeartRate(frameData);
            return;
        }

        // Capture video frame
        context.drawImage(video, 0, 0, 640, 480);
        const frame = context.getImageData(0, 0, 640, 480).data;

        // Analyze the red channel intensity (simple average)
        let redSum = 0;
        for (let i = 0; i < frame.length; i += 4) {
            redSum += frame[i];
        }

        const redAverage = redSum / (frame.length / 4);
        frameData.push(redAverage);

        setTimeout(processFrame, samplingInterval);
    };

    processFrame();
}

function calculateHeartRate(frameData) {
    const heartRateResult = document.getElementById('heartRateResult');

    // Apply a simple moving average to smooth data
    const smoothedData = movingAverage(frameData, 5);

    // Detect peaks (indicating heart beats)
    const peaks = detectPeaks(smoothedData);

    // Calculate beats per minute (BPM)
    const intervals = peaks.map((peak, index) => {
        if (index > 0) {
            return peak - peaks[index - 1];
        }
    }).filter(interval => interval);

    const averageInterval = intervals.reduce((a, b) => a + b, 0) / intervals.length;
    const bpm = (60 / (averageInterval * (50 / 1000))); // Convert intervals to seconds

    heartRateResult.innerHTML = `Heart Rate: ${Math.round(bpm)} BPM`;
}

// Helper: Moving average to smooth data
function movingAverage(data, windowSize) {
    return data.map((value, index, array) => {
        const start = Math.max(0, index - windowSize + 1);
        const subset = array.slice(start, index + 1);
        return subset.reduce((a, b) => a + b, 0) / subset.length;
    });
}

// Helper: Detect peaks (simple threshold-based)
function detectPeaks(data) {
    const threshold = 1.5; // Adjust this based on testing
    const peaks = [];

    for (let i = 1; i < data.length - 1; i++) {
        if (data[i] > data[i - 1] && data[i] > data[i + 1] && data[i] > threshold) {
            peaks.push(i);
        }
    }

    return peaks;
}
