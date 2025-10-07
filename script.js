const firebaseConfig = {
    apiKey: "AIzaSyD-JoW5Q0GTlm8taQUet6E5DcPU6EUejSg",
    authDomain: "science-fest-feedback-storage.firebaseapp.com",
    projectId: "science-fest-feedback-storage",
    storageBucket: "science-fest-feedback-storage.firebasestorage.app",
    messagingSenderId: "953304023023",
    appId: "1:953304023023:web:cbe5314ea19f68fbdf401a",
    measurementId: "G-MHZ0FG4S1J"
  };
// Initialize Firebase
firebase.initializeApp(firebaseConfig);

// Initialize Firestore
const db = firebase.firestore();

const feedbackForm = document.getElementById('feedback-form');

// Listen for the form submission event
feedbackForm.addEventListener('submit', (e) => {
    // Prevent the default form submission behavior
    e.preventDefault();

    // Get the values from the form inputs
    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const message = document.getElementById('message').value;

    // Add the collected data to the 'feedback' collection in Firestore
    db.collection('feedback').add({
        name: name,
        email: email,
        message: message,
        submittedAt: firebase.firestore.FieldValue.serverTimestamp() // Use server timestamp
    })
    .then((docRef) => {
        console.log('Document written with ID: ', docRef.id);
        // Notify the user and reset the form
        alert('Thank you for your feedback!');
        feedbackForm.reset();
    })
    .catch((error) => {
        console.error('Error adding document: ', error);
        alert('Sorry, there was an error submitting your feedback. Please try again.');
    });
});
