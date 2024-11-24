// Makale Listesi
const articles = [
    { title: "Kariyer Değişiminde İlk Adımlar", description: "Kariyer değişimi için rehberlik.", category: "career-change", link: "makale1.html" },
    { title: "Yeni Yetenekler Geliştirme", description: "Becerilerinizi nasıl geliştirebilirsiniz?", category: "skill-development", link: "makale2.html" },
    { title: "Mülakat Hazırlığı", description: "Mülakatlarda başarılı olmanın ipuçları.", category: "interviews", link: "makale3.html" },
    { title: "Etkili Networking Stratejileri", description: "Doğru kişilerle iletişim kurun.", category: "networking", link: "makale4.html" },
    { title: "İş Değişiminde Planlama", description: "Kariyer değişimini planlama yöntemleri.", category: "career-change", link: "makale5.html" },
    { title: "Özgeçmiş Hazırlama İpuçları", description: "Dikkat çekici bir CV hazırlayın.", category: "career-change", link: "makale6.html" },
    { title: "Eğitim Yoluyla Büyüme", description: "Kariyer gelişiminde eğitim önemi.", category: "skill-development", link: "makale7.html" },
    { title: "İş Görüşmelerinde Soru Sorma", description: "Doğru soruları nasıl sorarsınız?", category: "interviews", link: "makale8.html" },
    { title: "Bağlantılarınızı Genişletin", description: "Networking ağınızı büyütün.", category: "networking", link: "makale9.html" },
    { title: "Freelance Çalışma Rehberi", description: "Freelance dünyasına giriş.", category: "career-change", link: "makale10.html" },
    { title: "Soft Skills Neden Önemlidir?", description: "Soft skills ile kariyer avantajı.", category: "skill-development", link: "makale11.html" },
    { title: "Mülakatlarda Doğru İzlenim", description: "Pozitif bir etki bırakın.", category: "interviews", link: "makale12.html" },
    { title: "Etkili İletişim Teknikleri", description: "Profesyonel iletişim yolları.", category: "networking", link: "makale13.html" },
    { title: "Kariyer Hedefleri Belirleme", description: "Hedeflerinizi netleştirin.", category: "career-change", link: "makale14.html" },
    { title: "Yaratıcılığı Teşvik Etmek", description: "İş dünyasında yaratıcılık.", category: "skill-development", link: "makale15.html" },
    { title: "Stres Yönetimi", description: "Mülakat öncesi stres yönetimi.", category: "interviews", link: "makale16.html" },
    { title: "Mentorluk ve Danışmanlık", description: "Doğru mentor bulmak.", category: "networking", link: "makale17.html" },
    { title: "Başarılı Kariyer Değişimi", description: "Başarılı bir geçişin sırları.", category: "career-change", link: "makale18.html" },
    { title: "Etkili Zaman Yönetimi", description: "Verimliliği artırmanın yolları.", category: "skill-development", link: "makale19.html" },
    { title: "Online Mülakat İpuçları", description: "Dijital dünyada başarı.", category: "interviews", link: "makale20.html" }
];

// Makaleleri yükle
function loadArticles(category = "all") {
    const articleList = document.getElementById("article-list");
    articleList.innerHTML = ""; // Mevcut içerikleri temizle

    const filteredArticles = category === "all"
        ? articles
        : articles.filter(article => article.category === category);

    filteredArticles.forEach(article => {
        const articleCard = document.createElement("div");
        articleCard.classList.add("article-card");
        articleCard.innerHTML = `
            <h3>${article.title}</h3>
            <p>${article.description}</p>
            <a href="${article.link}">Devamını Oku</a>
        `;
        articleList.appendChild(articleCard);
    });
}

// Kategori filtreleme
document.querySelectorAll(".sidebar ul li a").forEach(link => {
    link.addEventListener("click", (event) => {
        event.preventDefault();
        const category = event.target.getAttribute("data-category");
        loadArticles(category);
    });
});

// Tüm makaleleri başlangıçta yükle
document.addEventListener("DOMContentLoaded", () => loadArticles());
