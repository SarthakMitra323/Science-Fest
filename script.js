// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCVCxeldlGIaafXvtX4S86SioaSWvCW-sk",
  authDomain: "science-fest-c5913.firebaseapp.com",
  databaseURL: "https://science-fest-c5913-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "science-fest-c5913",
  storageBucket: "science-fest-c5913.firebasestorage.app",
  messagingSenderId: "694899856907",
  appId: "1:694899856907:web:df37dc712bc6ae1fb7990e",
  measurementId: "G-C7RQJJBTKS"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

const feedbackForm = document.getElementById('feedback-form');

// Listen for the form submission event
feedbackForm.addEventListener('submit', (e) => {
    // Prevent the default form submission behavior
    e.preventDefault();

    // Get the values from the form inputs
    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const message = document.getElementById('message').value;

    // Push the collected data to the 'feedback' node in your database
    database.ref('feedback').push({
        name: name,
        email: email,
        message: message,
        submittedAt: new Date().toISOString() // Optional: add a timestamp
    });

    // Notify the user and reset the form
    alert('Thank you for your feedback!');
    feedbackForm.reset();
});