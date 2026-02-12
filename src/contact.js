/*
 * Script pour gérer l'envoi du formulaire de contact via EmailJS.
 * ⚠️ Remplace les valeurs par TES identifiants EmailJS.
 */

document.addEventListener("DOMContentLoaded", function () {

    // Bloque les dates passées
    const dateInput = document.getElementById("date_event");
    const today = new Date().toISOString().split("T")[0];
    dateInput.min = today;

    // 🔑 Initialise EmailJS
    emailjs.init("wcy9XEYLqeMZK0Rlu"); 
    // 👉 Remplace par ta clé publique EmailJS

    const form = document.getElementById("contact-form");
    const statusMessage = document.getElementById("form-status");

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
