/*
 * Script pour gérer l'envoi du formulaire de contact via EmailJS.
 * La clé publique peut être injectée au build via EMAILJS_PUBLIC_KEY.
 */

document.addEventListener("DOMContentLoaded", function () {
    const defaultPublicKey = "wcy9XEYLqeMZK0Rlu";
    const buildPlaceholder = "__EMAILJS_PUBLIC_KEY__";

    const getEmailJsPublicKey = () => {
        const meta = document.querySelector('meta[name="emailjs-public-key"]');
        const metaKey = meta?.content?.trim();

        if (metaKey && metaKey !== buildPlaceholder) {
            return metaKey;
        }

        return defaultPublicKey;
    };

    if (typeof emailjs === "undefined") {
        console.error("EmailJS SDK introuvable");
        return;
    }

    // Bloque les dates passées
    const dateInput = document.getElementById("date_event");
    if (dateInput) {
        const today = new Date().toISOString().split("T")[0];
        dateInput.min = today;
    }

    // Initialise EmailJS avec la clé injectée au build, sinon fallback projet.
    emailjs.init({
        publicKey: getEmailJsPublicKey()
    });

    const form = document.getElementById("contact-form");
    const statusMessage = document.getElementById("form-status");
    if (!form || !statusMessage) {
        return;
    }

    form.addEventListener("submit", function (event) {
        event.preventDefault();

        statusMessage.textContent = "Envoi en cours...";
        statusMessage.style.color = "#555";

        // 📤 Envoi du formulaire
        emailjs.sendForm(
            "service_bbzqnck",     // 👉 ex: service_xxxxx
            "template_zmzbz59",    // 👉 ex: template_xxxxx
            this
        )
        .then(function () {
            statusMessage.textContent = "Message envoyé avec succès ✅";
            statusMessage.style.color = "green";
            form.reset();
        })
        .catch(function (error) {
            console.error("Erreur EmailJS :", error);
            statusMessage.textContent = "Erreur lors de l'envoi ❌";
            statusMessage.style.color = "red";
        });
    });
});
