function emailSend() {

    var userName = document.getElementById('name').value;
    var phone = document.getElementById('phone').value;
    var email = document.getElementById('email').value;
    var message = document.getElementById('message').value;

    var params = {
        name: userName,
        phone: phone,
        email: email,
        message: message
    };

    emailjs.send("service_apwow49", "template_0m716im", params)
        .then(function () {
            swal(
                "Successful",
                "Thank you for getting in touch!",
                "success"
            );
        }, function () {
            swal(
                "Error",
                "Something went wrong!",
                "error"
            );
        });
}
