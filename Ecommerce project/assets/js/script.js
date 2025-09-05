document.querySelector(".mic-btn").addEventListener("click", () => {
    alert("Voice search feature coming soon! 🎤");
});


// Voice Search
const voiceBtn = document.getElementById("voiceSearchBtn");
if ('webkitSpeechRecognition' in window) {
    const recognition = new webkitSpeechRecognition();
    recognition.lang = "en-IN";
    recognition.continuous = false;
    recognition.interimResults = false;

    voiceBtn.addEventListener("click", () => {
        recognition.start();
        alert("🎤 Speak now...");
    });

    recognition.onresult = (event) => {
        const transcript = event.results[0][0].transcript.toLowerCase();
        localStorage.setItem("voiceSearchQuery", transcript);
        window.location.href = "products.html";
    };
} else {
    voiceBtn.addEventListener("click", () => {
        alert("Voice search not supported in this browser.");
    });
}
    

window.SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;

const recognition = new SpeechRecognition();
recognition.interimResults = false;
recognition.lang = 'en-US';

document.getElementById('voiceSearchBtn').addEventListener('click', () => {
    recognition.start();
});

recognition.addEventListener('result', (e) => {
    const transcript = Array.from(e.results)
        .map(result => result[0])
        .map(result => result.transcript)
        .join('');

    console.log('Recognized:', transcript);

    const searchInput = document.getElementById('searchInput');
    searchInput.value = transcript;

    const event = new Event('input');
    searchInput.dispatchEvent(event);
});

function filterProducts(searchText) {
  const productCards = document.querySelectorAll(".product-card");
  productCards.forEach((card) => {
    const name = card.querySelector(".product-name").textContent.toLowerCase();
    if (name.includes(searchText.toLowerCase())) {
      card.style.display = "block";
    } else {
      card.style.display = "none";
    }
  });
}

function handleSearch() {
  const searchInput = document.querySelector('input').value;
  window.location.href = `products.html?search=${encodeURIComponent(searchInput)}`;
}


function getQueryParam(param) {
  const urlParams = new URLSearchParams(window.location.search);
  return urlParams.get(param);
}

function filterProductsByQuery() {
  const searchTerm = getQueryParam("search");
  if (searchTerm) {
    document.querySelector("input").value = searchTerm;
    filterProducts(searchTerm);
  }
}

// your filter function should already be like this:
function filterProducts(searchText) {
  const productCards = document.querySelectorAll(".product-card");
  productCards.forEach((card) => {
    const name = card.querySelector(".product-name").textContent.toLowerCase();
    if (name.includes(searchText.toLowerCase())) {
      card.style.display = "block";
    } else {
      card.style.display = "none";
    }
  });
}

window.onload = filterProductsByQuery;


document.getElementById("searchForm").addEventListener("submit", function(e) {
    e.preventDefault();  // normal form submit stop panna
    let query = document.getElementById("searchInput").value.trim();
    if (query) {
        // products.html ku query pass pannudhu
        window.location.href = "products.html?search=" + encodeURIComponent(query);
    }
});


