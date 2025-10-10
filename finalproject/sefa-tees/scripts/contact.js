const form = document.getElementById("contactForm");

form.addEventListener("submit", (e) => {
  const name = form.name.value.trim();
  const email = form.email.value.trim();
  const message = form.message.value.trim();

  let valid = true;

  if (!name) {
    document.getElementById("nameError").textContent = "Please enter your name.";
    valid = false;
  } else document.getElementById("nameError").textContent = "";

  if (!email.includes("@")) {
    document.getElementById("emailError").textContent = "Enter a valid email address.";
    valid = false;
  } else document.getElementById("emailError").textContent = "";

  if (message.length < 10) {
    document.getElementById("messageError").textContent = "Message should be at least 10 characters.";
    valid = false;
  } else document.getElementById("messageError").textContent = "";

  if (!valid) e.preventDefault();
});
