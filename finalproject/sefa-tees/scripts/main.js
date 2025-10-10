// Footer Year & Live Time Display
const yearSpan = document.getElementById("year");
const timeDisplay = document.getElementById("footer-time");

yearSpan.textContent = new Date().getFullYear();

function updateTime() {
  const now = new Date();
  const formatted = now.toLocaleString("en-US", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
  });
  timeDisplay.textContent = `🕒 ${formatted}`;
}

setInterval(updateTime, 1000);
updateTime();

