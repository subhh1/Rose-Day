document.getElementById("yesBtn").addEventListener("click", function() {
  document.getElementById("dialog").classList.add("hidden");
  document.getElementById("thankYou").classList.remove("hidden");
});
document.getElementById("nextBtn").addEventListener("click", function() {
    window.location.href = "page1.html";
});

document.getElementById("noBtn").addEventListener("click", rejectValentine);

document.getElementById("whyBtn").addEventListener("click", function() {
    // Inject font dynamically
    const style = document.createElement("style");
    style.innerHTML = `
        @font-face {
            font-family: 'Loud';
            src: url('fonts/loud.ttf') format('truetype');
        }
    `;
    document.head.appendChild(style);

    // Create blackout overlay
    const blackout = document.createElement("div");
    blackout.style.position = "fixed";
    blackout.style.top = "0";
    blackout.style.left = "0";
    blackout.style.width = "100vw";
    blackout.style.height = "100vh";
    blackout.style.backgroundColor = "black";
    blackout.style.zIndex = "9999";
    blackout.style.display = "flex";
    blackout.style.justifyContent = "center";
    blackout.style.alignItems = "center";
    blackout.style.color = "red";
    blackout.style.fontSize = "2rem";
    blackout.style.fontFamily = "'Loud', sans-serif"; // Loud font ONLY here
    blackout.innerText = "You dared to ask WHY? ⚡ Access revoked by the gods of love!";
    document.body.appendChild(blackout);

    // Delay before closing
    setTimeout(() => {
        localStorage.setItem("valentineRejected", "true");
        window.open('', '_self', '');
        window.close();
    }, 3000);
});

function rejectValentine() {
    alert("BHAGGGGGGGGGG!");
    localStorage.setItem("valentineRejected", "true");
    window.open('', '_self', '');
    window.close();
}

window.onload = function () {
  if (localStorage.getItem("valentineRejected") === "true") {

    const style = document.createElement("style");
    style.innerHTML = `
      @font-face {
        font-family: 'Loud';
        src: url('fonts/loud.ttf') format('truetype');
      }

      body {
        margin: 0;
        background-color: red;
        color: black;
        display: flex;
        justify-content: center;
        align-items: center;
        height: 100vh;
        font-family: 'Loud', sans-serif;
      }

      h2 {
        margin: 0;
        text-align: center;
        max-width: 90%;
        line-height: 1.3;
      }
    `;
    document.head.appendChild(style);

    document.body.innerHTML = `
      <h2>
        YOU CAN SIMPLY SAY "YES" BUT YOU DIDN'T,<br>
        🚫 ACCESS DENIED FOR YOU UNGRATEFUL POTATO
      </h2>
    `;
  }
};


document.addEventListener("DOMContentLoaded", function () {
  const heartContainer = document.querySelector(".hearts-fall-container");
  if (!heartContainer) return;

  const heartEmojis = ["💗", "🤍"];

  function spawnHeart() {
    const heart = document.createElement("div");
    heart.className = "falling-heart";
    heart.textContent =
      heartEmojis[Math.floor(Math.random() * heartEmojis.length)];

    heart.style.left = Math.random() * 100 + "vw";
    heart.style.fontSize = Math.random() * 8 + 12 + "px";
    heart.style.animationDuration = Math.random() * 3 + 4 + "s";

    heartContainer.appendChild(heart);

    setTimeout(() => {
      heart.remove();
    }, 8000);
  }

  setInterval(spawnHeart, 300);
});
const heart = document.createElement("span");
heart.classList.add("falling-heart");
heart.innerHTML = "❤️";
document.body.appendChild(heart);
/* 😈 NO button runs away (max 5 times) */
const noBtn = document.getElementById("noBtn");
let escapeCount = 0;
const maxEscapes = 5;

noBtn.addEventListener("mouseenter", () => {
  if (escapeCount >= maxEscapes) return;

  escapeCount++;

  const x = Math.random() * 200 - 100;
  const y = Math.random() * 140 - 70;

  noBtn.style.transform = `translate(${x}px, ${y}px)`;

  if (escapeCount === maxEscapes) {
    noBtn.textContent = "Okayy click meee";
    noBtn.style.opacity = "0.75";
  }
});

/* ❓ WHY button adds more question marks */
const whyBtn = document.getElementById("whyBtn");
let questionCount = 2;

whyBtn.addEventListener("mouseenter", () => {
  questionCount++;
  whyBtn.textContent = "Why should I" + "?".repeat(questionCount);
});
