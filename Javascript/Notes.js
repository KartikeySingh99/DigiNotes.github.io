//--------------------Firebase Configuartion--------------------

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
var db = firebase.firestore();


//--------------------Global Variables--------------------

var subjectCode;
var fileURL;

//--------------------Function To Select Specific Course--------------------

function func(pagename, element) {
    let content, table, heading;
    table = document.getElementsByClassName('subcontent');
    content = document.querySelector('.content');
    heading = document.getElementById('download-notes');
    heading.style.display = "block";
    for (let i = 0; i < table.length; i++) {
        table[i].style.display = "none";
    }
    document.getElementById(pagename).style.display = "block";
    content.style.height = "80vh";
    subjectCode = pagename;
    return showData(subjectCode);
}

//--------------------Function to Display Upload Form--------------------

function upload() {
    let user = localStorage.getItem("code");
    if (!subjectCode) {
        alert("Please Select One Course To Upload");
    }
    else {
        if (user == "secret") {
            let form = document.querySelector('.form-container');
            form.style.display = "flex";
        }
        else {
            location.assign("Log-in.html");
        }
    }
}

//--------------------File Uploading--------------------

var fileButton = document.getElementById('link');
fileButton.addEventListener('change', function (e) {
    let file = e.target.files[0];
    uploadFile();
    async function uploadFile() {
        var storageRef = firebase.storage().ref(`${subjectCode}/` + file.name);
        let upload = storageRef.put(file);
        let loader = document.getElementById('progress');
        await upload.on('state_changed', function progress(snapshot) {
            var percentage = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
            loader.value = percentage;
        },
            //--------------------Function To Catch Error While Uploading File--------------------
            function (error) {
                console.log(error);
            },

            //--------------------Function To Download The URL OF The File--------------------
            function () {
                storageRef.getDownloadURL().then(function (url) {
                    console.log(url);
                    fileURL = url;
                })
            })
    }
});

//--------------------Function To Upload Notes To The Database--------------------

function uploadNotes() {
    let subject = document.getElementById('subject').value;
    let val = true;
    if (subject == 0) {
        alert("Please Fill The Input Box");
        return val = false;
    }
    if (fileButton == 0) {
        alert("Please Fill The Input Box");
        return val = false;
    }
    else {
        let docRef = db.collection(`${subjectCode}`);
        docRef.add({
            Subject: subject,
            link: fileURL
        })
            .then((docRef) => {
                alert("Notes Uploaded Successfully!");
                location.reload();
            })
            .catch((error) => {
                console.log(error);
            });
        showData();
    }
}

//--------------------Function to Display Data--------------------

function showData(subjectCode) {

    let subno = 0;
    var docRef = db.collection(`${subjectCode}/`).orderBy('Subject');
    docRef.get()
        .then((querySnashot) => {
            displayTable();
            querySnashot.forEach((doc) => {
                let myData = doc.data();
                let myID = doc.id;
                createTable(myData, myID);
                function createTable(Data, ID) {
                    let row = `<tr id="${ID}">
                    <td>${++subno}</td>
                    <td>${Data.Subject}</td>
                    <td><a href="${Data.link}" download>Download Here</a></td>
                    </tr>`;
                    let tableBody = document.querySelector(`.${subjectCode}`);
                    tableBody.innerHTML += row;
                }
            });
        })
        .catch((err) => {
            console.log(err);
        })
}

function displayTable() {
    let content = document.getElementById(`${subjectCode}`);
    let table = `<table class="table table-hover">
    <thead>
      <tr>
        <th scope="col">#</th>
        <th scope="col">Subject</th>
        <th scope="col">Download Link</th>
      </tr>
    </thead>
    <tbody class="${subjectCode}"></tbody>
  </table>`;
    content.innerHTML += table;
}

//--------------------Function To Go Back--------------------

function back() {
    window.history.back();
}



