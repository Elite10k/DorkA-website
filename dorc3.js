// Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBxA3wiL3HgHfIyKp0Xz-mUkHpkkKsKWTs",
  authDomain: "http://gentle-trade.firebaseapp.com",
  projectId: "gentle-trade",
  storageBucket: "http://gentle-trade.firebasestorage.app",
  messagingSenderId: "993751040353",
  appId: "1:993751040353:web:a544be4ff5e477f5b24520"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);
const db = firebase.firestore();
const auth = firebase.auth();

// Function to handle user registration
function signUp(email, password) {
  auth.createUserWithEmailAndPassword(email, password)
      .then(userCredential => {
          // Add user to Firestore with initial account balance of 0
          db.collection("users").doc(userCredential.user.uid).set({
              email: email,
              balance: 0
          });
          alert("Account created successfully!");
      })
      .catch(error => alert("Error: " + error.message));
}

// Function to handle user login
function login(email, password) {
  auth.signInWithEmailAndPassword(email, password)
      .then(userCredential => {
          alert("Logged in successfully!");
          // You can redirect the user to their account page here
      })
      .catch(error => alert("Error: " + error.message));
}

// Function to get and display account balance
function getAccountBalance(userId) {
  db.collection("users").doc(userId).get().then(doc => {
      if (doc.exists) {
          const balance = doc.data().balance;
          document.getElementById("balanceDisplay").textContent = "Balance: $" + balance;
      }
  });
}

// Function to update account balance
function updateAccountBalance(userId, newBalance) {
  db.collection("users").doc(userId).update({ balance: newBalance })
      .then(() => alert("Balance updated successfully!"))
      .catch(error => alert("Error: " + error.message));
}