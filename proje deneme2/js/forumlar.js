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
    <div class="button-group">
        <div class="button">
            <button id="publish-button" class="btn-secondary">Yayınla</button>
        </div>
       
    </div>
    <div id="sort-dropdown" class="sort-dropdown" style="display: none;">
        <button data-sort="new">En Yeni</button>
        <button data-sort="old">Eski Yorumlar</button>
        <button data-sort="liked">En Çok Favorilenen</button>
    </div>
</div>

            <div id="previous-messages">
                <h3>Önerilen Mesajlar</h3>
                <ul id="message-list">
                    ${forumMessages.map((msg, index) => `
                        <li>
                            <p>${msg.text}</p>
                            <div class="meta">
                                <span>${msg.userName}</span> - <span>${msg.date}</span>
                                <button class="like-button">👍</button> <span class="like-count">${msg.likes || 0}</span>
                                <button class="dislike-button">👎</button> <span class="dislike-count">${msg.dislikes || 0}</span>
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
        setupSortDropdown();
        setupLikeDislikeButtons(forumKey);
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
                    date: new Date().toLocaleString(),
                    likes: 0,
                    dislikes: 0
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
                <button class="like-button">👍</button> <span class="like-count">${message.likes}</span>
                <button class="dislike-button">👎</button> <span class="dislike-count">${message.dislikes}</span>
                ${
                    currentUser.isAdmin || currentUser.id === message.userId
                        ? `<button class="delete-button" data-index="${messageIndex}">X</button>`
                        : ""
                }
            </div>`;

        messageList.appendChild(newMessage);
        setupDeleteButtons(forumKey);
        setupLikeDislikeButtons(forumKey);
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

    // Like ve Dislike butonlarını ayarla
    function setupLikeDislikeButtons(forumKey) {
        const likeButtons = document.querySelectorAll(".like-button");
        const dislikeButtons = document.querySelectorAll(".dislike-button");

        likeButtons.forEach((button, index) => {
            button.addEventListener("click", () => {
                const messages = getMessages(forumKey);
                messages[index].likes += 1;
                localStorage.setItem(`forum_${forumKey}`, JSON.stringify(messages));
                button.nextElementSibling.textContent = messages[index].likes;
            });
        });

        dislikeButtons.forEach((button, index) => {
            button.addEventListener("click", () => {
                const messages = getMessages(forumKey);
                messages[index].dislikes += 1;
                localStorage.setItem(`forum_${forumKey}`, JSON.stringify(messages));
                button.nextElementSibling.textContent = messages[index].dislikes;
            });
        });
    }

    // Sırala butonu ve sıralama seçeneklerini ayarla
    function setupSortDropdown() {
        const sortButton = document.getElementById("sort-button");
        const dropdown = document.getElementById("sort-dropdown");

        sortButton.addEventListener("click", (e) => {
            e.stopPropagation();
            dropdown.style.display = dropdown.style.display === "block" ? "none" : "block";
        });

        document.addEventListener("click", (e) => {
            if (!sortButton.contains(e.target) && !dropdown.contains(e.target)) {
                dropdown.style.display = "none";
            }
        });

        dropdown.querySelectorAll("button").forEach(button => {
            button.addEventListener("click", function () {
                const sortType = this.getAttribute("data-sort");
                sortMessages(sortType);
                dropdown.style.display = "none";
            });
        });
    }

    // Mesajları sıralama işlevi
    function sortMessages(sortType) {
        const messages = Array.from(document.querySelectorAll("#message-list li"));
        const messageList = document.getElementById("message-list");

        messages.sort((a, b) => {
            const aDate = new Date(a.querySelector(".meta span:nth-child(2)").textContent);
            const bDate = new Date(b.querySelector(".meta span:nth-child(2)").textContent);
            if (sortType === "new") {
                return bDate - aDate;
            } else if (sortType === "old") {
                return aDate - bDate;
            } else if (sortType === "liked") {
                return parseInt(b.querySelector(".like-count").textContent) - parseInt(a.querySelector(".like-count").textContent);
            }
        });

        messageList.innerHTML = "";
        messages.forEach(msg => messageList.appendChild(msg));
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
