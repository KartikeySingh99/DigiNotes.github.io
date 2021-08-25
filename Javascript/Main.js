function popup() {
    console.log('clicked');
    document.querySelector('.popup').style.display = "none";
}

function openPopup() {
    // ------------------------- API Call -------------------------

    fetch("https://motivational-quotes1.p.rapidapi.com/motivation", {
        "method": "POST",
        "headers": {
            "content-type": "application/json",
            "x-rapidapi-key": "1d6cd7192dmshd6b49cb5369febbp149137jsn30f69cf6b755",
            "x-rapidapi-host": "motivational-quotes1.p.rapidapi.com"
        },
        "body": {
            "key1": "value",
            "key2": "value"
        }
    })
        .then((data) => {
            console.log(data);
            return data.text();
        })
        .then((mydata) => {
            document.getElementById('quote').innerHTML = mydata;
        })
        .catch(err => {
            console.error(err);
        });
    let popup = document.querySelector('.popup');
    setTimeout(() => {
        popup.style.display = "block";
    }, 10000);
}

let email = localStorage.getItem("user-email");
let code = localStorage.getItem("code");
let status = localStorage.getItem("status");
if (code == "secret") {
    if(!status){
        alert(`Hello ${email} Welcome To Digi Notes`);
        localStorage.setItem("status","true");
    }
}
else {
    document.getElementById('logout').style.display = "none";
}
let burger = document.querySelector('.burger');
let nav = document.querySelector('.nav');
let header = document.querySelector('header');
let logo = document.getElementById('logo');
burger.addEventListener('click', () => {
    console.log("burger working");
    if (burger.classList.toggle('change')) {
        nav.style.display = "flex";
        nav.style.display = "flex";
        nav.style.height = "200px";
        nav.style.flexdirection = "column";
        header.style.height = "350px";
        header.style.flexDirection = "column";
        header.style.justifyContent = "center";
        
        if (code == "secret") {
            document.getElementById('logout').style.display = "block";
            header.style.height = "400px"
        }
    }
    else {
        nav.style.display = "none";
        nav.style.flexdirection = "row";
        header.style.flexDirection = "row";
        header.style.height = "50px";
        header.style.justifyContent = "space-between"
        document.getElementById('logout').style.display = "none";
    }
});
function logout() {
    localStorage.clear();
    location.assign("index.html");
}





