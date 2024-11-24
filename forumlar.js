document.addEventListener("DOMContentLoaded", function () {
    const forumLinks = document.querySelectorAll(".forum-item a");
    const forumContent = document.querySelector(".content-container");

    // Kullanıcı bilgileri (Örnek)
    const currentUser = {
        id: "user123", // Kullanıcı kimliği
        isAdmin: true // Yönetici mi?
    };

    // Forum bağlantılarına tıklama olayları ekle
    forumLinks.forEach(link => {
        link.addEventListener("click", function (e) {
            e.preventDefault();
            const contentKey = this.getAttribute("data-content");
            loadForumContent(contentKey);
        });
    });

    // Forum içeriğini yükleme
    function loadForumContent(forumKey) {
        const forumMessages = getMessages(forumKey);
        const title = getForumTitle(forumKey);

        forumContent.innerHTML = `
            <h2>${title}</h2>
            <div id="message-section">
                <textarea id="user-message" placeholder="Mesajınızı buraya yazın..."></textarea>
                <button id="publish-button" class="btn-secondary">Yayınla</button>
            </div>
            <div id="previous-messages">
                <h3>Önerilen Mesajlar</h3>
                <ul id="message-list">
                    ${forumMessages.map((msg, index) => `
                        <li>
                            <p>${msg.text}</p>
                            <div class="meta">
                                <span>${msg.userName}</span> - <span>${msg.date}</span>
                                ${
                                    currentUser.isAdmin || currentUser.id === msg.userId
                                        ? `<button class="delete-button" data-index="${index}">X</button>`
                                        : ""
                                }
                            </div>
                        </li>
                    `).join("")}
                </ul>
            </div>`;
        setupPublishButton(forumKey);
        setupDeleteButtons(forumKey);
    }

    // Yayınla butonunu ayarla
    function setupPublishButton(forumKey) {
        const publishButton = document.getElementById("publish-button");
        publishButton.addEventListener("click", function () {
            const userMessage = document.getElementById("user-message").value.trim();
            if (userMessage) {
                const messageData = {
                    text: userMessage,
                    userName: "Kullanıcı Adı Soyisim",
                    userId: currentUser.id,
                    date: new Date().toLocaleString()
                };
                saveMessage(forumKey, messageData);
                addMessageToList(messageData, forumKey);
                document.getElementById("user-message").value = "";
            } else {
                alert("Lütfen bir mesaj girin.");
            }
        });
    }

    // Yeni mesajı listeye ekle
    function addMessageToList(message, forumKey) {
        const messageList = document.getElementById("message-list");
        const newMessage = document.createElement("li");

        const messageIndex = getMessages(forumKey).length - 1; // Mesajın indexi
        newMessage.innerHTML = `
            <p>${message.text}</p>
            <div class="meta">
                <span>${message.userName}</span> - <span>${message.date}</span>
                ${
                    currentUser.isAdmin || currentUser.id === message.userId
                        ? `<button class="delete-button" data-index="${messageIndex}">X</button>`
                        : ""
                }
            </div>`;
        messageList.appendChild(newMessage);
        setupDeleteButtons(forumKey);
    }

    // Silme butonlarını ayarla
    function setupDeleteButtons(forumKey) {
        const deleteButtons = document.querySelectorAll(".delete-button");
        deleteButtons.forEach(button => {
            button.addEventListener("click", function () {
                const index = this.getAttribute("data-index");
                deleteMessage(forumKey, index);
                this.parentElement.parentElement.remove();
            });
        });
    }

    // Mesajı sil
    function deleteMessage(forumKey, index) {
        const messages = getMessages(forumKey);
        messages.splice(index, 1); // Mesajı diziden çıkar
        localStorage.setItem(`forum_${forumKey}`, JSON.stringify(messages)); // Güncellenmiş mesajları kaydet
    }

    // Mesajı kaydet
    function saveMessage(forumKey, message) {
        const messages = getMessages(forumKey);
        messages.push(message);
        localStorage.setItem(`forum_${forumKey}`, JSON.stringify(messages));
    }

    // Mesajları al
    function getMessages(forumKey) {
        const messages = localStorage.getItem(`forum_${forumKey}`);
        return messages ? JSON.parse(messages) : [];
    }

    // Forum başlıklarını al
    function getForumTitle(forumKey) {
        const forumTitles = {
            ogretmenler: "Öğretmenler Forumu",
            saglikcilar: "Sağlık Çalışanları Forumu",
            muhendisler: "Mühendisler Forumu",
            hukukcular: "Hukukçular Forumu",
            bilisim: "Bilişim ve Yazılım Forumu",
            avukatlar: "Avukatlar Forumu",
            pilotlar: "Pilotlar Forumu",
            mimarlar: "Mimarlar Forumu",
            gazeteciler: "Gazeteciler Forumu",
            muzisyenler: "Müzisyenler Forumu",
            ekonomistler: "Ekonomistler Forumu",
            kamu_gorevlileri: "Kamu Görevlileri Forumu",
            asci: "Aşçılar Forumu",
            lojistik: "Lojistik Uzmanları Forumu",
            sporcular: "Sporcular Forumu",
            ciftciler: "Çiftçiler Forumu",
            sanatcilar: "Sanatçılar Forumu",
            yazarlar: "Yazarlar Forumu"
        };
        return forumTitles[forumKey] || "Forum Bulunamadı";
    }
});
