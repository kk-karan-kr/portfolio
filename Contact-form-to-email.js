function emailSend() {
    const form = document.querySelector(".get-in-touch form") || document.querySelector("form");
    const submitBtn = form.querySelector(".btn-primary");

    // Disable button + change text
    submitBtn.disabled = true;
    submitBtn.innerText = "Sending...";

    // Get form values
    const userName = document.getElementById('name').value.trim();
    const phone    = document.getElementById('phone').value.trim();
    const email    = document.getElementById('email').value.trim();
    const message  = document.getElementById('message').value.trim();

    // Basic validation
    if (!userName || !phone || !email || !message) {
        swal("Warning", "Please fill all fields.", "warning");
        submitBtn.disabled = false;
        submitBtn.innerText = "Submit";
        return;
    }

    // Extra tracking info
    const submittedAt = new Date().toLocaleString("en-IN", {
        timeZone: "Asia/Kolkata",
        year: "numeric",
        month: "short",
        day: "2-digit",
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit"
    });

    const browserInfo = navigator.userAgent;
    const pageUrl     = window.location.href;

    // Default IP value (in case fetch fails)
    let ipAddress = "Unavailable";

    // Fetch public IP (optional but cool)
    fetch("https://api.ipify.org?format=json")
        .then(res => res.json())
        .then(data => {
            if (data && data.ip) {
                ipAddress = data.ip;
            }
        })
        .catch(() => {
            // ignore, keep "Unavailable"
        })
        .finally(() => {
            // Build EmailJS params
            const params = {
                name:          userName,
                phone:         phone,
                email:         email,
                message:       message,
                submitted_at:  submittedAt,
                browser:       browserInfo,
                page_url:      pageUrl,
                ip_address:    ipAddress
            };

            // Send using EmailJS
            emailjs
                .send(
                    "service_apwow49",      // your service ID
                    "template_0m716im",     // your template ID
                    params,
                    "QbahimZpuaCG8xtt6"     // your public key
                )
                .then(function () {
                    swal(
                        "Successful",
                        "Thank you for getting in touch with me. Your message has been successfully received. I will review it and get back to you as soon as possible.",
                        "success"
                    );

                    // Reset form after success
                    form.reset();
                })
                .catch(function (error) {
                    console.error("EmailJS error:", error);
                    swal(
                        "Error",
                        "Oops! Something went wrong while processing your request. If the problem persists, you can contact me through other means.",
                        "error"
                    );
                })
                .finally(function () {
                    // Re-enable button
                    submitBtn.disabled = false;
                    submitBtn.innerText = "Submit";
                });
        });
}
