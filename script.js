document.addEventListener("DOMContentLoaded", function () {

    const form = document.getElementById("registrationForm");

    if(form){

        form.addEventListener("submit", function(e){

            e.preventDefault();

            const name = document.getElementById("name").value;
            const event = document.getElementById("event").value;

            document.getElementById("success").innerHTML =
                `Registration Successful!<br>
                 Thank You ${name}<br>
                 Event: ${event}`;

            form.reset();
        });
    }
});
