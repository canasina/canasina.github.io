// Elementleri seç
const loginBtn = document.getElementById("loginBtn");
const loginModal = document.getElementById("loginModal");
const closeBtn = document.querySelector(".close");

// Oturum Aç butonuna tıklanınca modalı göster
loginBtn.addEventListener("click", () => {
    loginModal.style.display = "flex";
});

// Kapat (X) butonuna tıklanınca modalı gizle
closeBtn.addEventListener("click", () => {
    loginModal.style.display = "none";
});

// Modal dışına tıklanırsa kapat
window.addEventListener("click", (event) => {
    if (event.target === loginModal) {
        loginModal.style.display = "none";
    }
});
