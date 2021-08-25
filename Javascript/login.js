const firebaseConfig = {
    apiKey: "AIzaSyCPTQ8obTfADKuCPVRRxveyTD8tGcb1J-8",
    authDomain: "digi-notes-ecc60.firebaseapp.com",
    databaseURL: "https://digi-notes-ecc60-default-rtdb.firebaseio.com",
    projectId: "digi-notes-ecc60",
    storageBucket: "digi-notes-ecc60.appspot.com",
    messagingSenderId: "1018107893092",
    appId: "1:1018107893092:web:95025af6e9e4063d6e5671",
    measurementId: "G-L8Y3NV57BV"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);
console.log(firebase);
let database = firebase.database();

//------------------------- Sign-Up Function -------------------------

function showSignUp() {
    var signup = document.querySelector('.sign-up').style.display = "flex";
    var login = document.querySelector('.log-in').style.display = "none";
}
function signup() {
    var signup_Email = document.getElementById('sign-up-email').value;
    var signup_Password = document.getElementById('sign-up-password').value;
    var signup_conf_password = document.getElementById('conf-password').value;
    var val = true;

    //------------------------- Form Validation -------------------------
    if (signup_Email == 0) {
        document.getElementById('verify-3').innerHTML = "*Please Fill E-mail ID";
        return val = false;
    }
    else if(signup_Email != 0){
        document.getElementById('verify-3').innerHTML = "";
    }
    if (signup_Password == 0) {
        document.getElementById('verify-4').innerHTML = "*Please Fill Password";
        return val = false;
    }
    else if(signup_Password != 0){
        document.getElementById('verify-4').innerHTML = "";
    }
    if (signup_conf_password == 0) {
        document.getElementById('verify-5').innerHTML = "*Please Confirm Your Password";
        return val = false;
    }
    else if(signup_conf_password != 0){
        document.getElementById('verify-5').innerHTML = "";
    }
    if (signup_Password != signup_conf_password) {
        document.getElementById('verify-5').innerHTML = "*Password Did Not Match!";
        return val = false;
    }
    else {
        let users = database.ref('users');
        let data = {
            email: signup_Email,
            password: signup_Password
        }
        users.push(data, finished);
        function finished(error) {
            if (error) {
                console.log(error);
            }
            else {
                console.log("data saved");
                localStorage.setItem("user-email", signup_Email);
                localStorage.setItem("code", "secret");
                alert("Sign-Up Successfully!");
                location.assign("index.html")
            }
        }
    }
}

//------------------------- Login Function -------------------------

function login() {
    var email = document.getElementById('email').value;
    var password = document.getElementById('password').value;
    var val = true;
    //------------------------- Form Validation -------------------------
    if (email == 0) {
        document.getElementById('verify-1').innerHTML = "*Please Fill E-mail ID";
        return val = false;
    }
    if (password == 0) {
        document.getElementById('verify-2').innerHTML = "*Please Fill Password";
        return val = false;
    }
    else {
        //------------------------- Log-in Authentication -------------------------
        let ref = database.ref('users');
        ref.on('value', gotData, errData);
        function gotData(data) {
            var users = data.val();
            var keys = Object.keys(users);
            for (var i = 0; i < keys.length; i++) {
                var key = keys[i];
                var user = users[key];
                if (email == user.email && password == user.password) {
                    alert("Logged-In Successfully!");
                    localStorage.setItem("user-email", user.email);
                    localStorage.setItem("code", "secret");
                    location.assign("index.html");
                    return;
                }
            }
            alert("invalid Email Id Or Password!");
        }
        function errData(err) {
            console.log(err);
        }
    }
}
