function selectEvent(eventName) {
    document.getElementById("eventName").value = eventName;
    window.location.href = "#register";
}

document
.getElementById("registrationForm")
.addEventListener("submit", function(event){

    event.preventDefault();

    let name =
        document.getElementById("name").value;

    let email =
        document.getElementById("email").value;

    let eventName =
        document.getElementById("eventName").value;

    if(name === "" || email === "" || eventName === ""){
        alert("Please fill all fields");
        return;
    }

    document.getElementById("message").innerHTML =
        `Registration Successful! <br>
         Name: ${name} <br>
         Event: ${eventName}`;

    document.getElementById("registrationForm").reset();
});
