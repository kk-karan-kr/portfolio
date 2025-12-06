function emailSend() {

    // Get button reference
    const submitBtn = document.querySelector(".btn-primary");

    // Disable button + change text
    submitBtn.disabled = true;
    submitBtn.innerText = "Sending...";

    // Get form values
    var userName = document.getElementById('name').value.trim();
    var phone    = document.getElementById('phone').value.trim();
    var email    = document.getElementById('email').value.trim();
    var message  = document.getElementById('message').value.trim();

    // Basic validation
    if (!userName || !phone || !email || !message) {
        swal("Warning", "Please fill all fields.", "warning");
        submitBtn.disabled = false;
        submitBtn.innerText = "Submit";
        return;
    }

    // Build email params
    var params = {
        name: userName,
        phone: phone,
        email: email,
        message: message
    };

    // EmailJS request
    emailjs
        .send(
            "service_apwow49",      // service ID
            "template_0m716im",     // template ID
            params,
            "QbahimZpuaCG8xtt6"     // public key
        )
        .then(
            function () {

                swal(
                    "Successful",
                    "Thank you for getting in touch! I will reply soon.",
                    "success"
                );

                // Reset form
                document.querySelector("form").reset();
            },
            function () {

                swal(
                    "Error",
                    "Something went wrong! Please try again later.",
                    "error"
                );
            }
        )
        .finally(function () {
            // Re-enable button
            submitBtn.disabled = false;
            submitBtn.innerText = "Submit";
        });
}
