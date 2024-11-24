// İş ilanları listesi
const jobListings = [
    { title: "Yazılım Geliştirici", company: "Teknoloji A.Ş.", location: "İstanbul, Türkiye", experience: "Orta Düzey", category: "it" },
    { title: "Proje Yöneticisi", company: "Lider Projeler Ltd.", location: "Ankara, Türkiye", experience: "Üst Düzey", category: "management" },
    { title: "UI/UX Tasarımcı", company: "Kreatif Ajans", location: "İzmir, Türkiye", experience: "Giriş Seviyesi", category: "it" },
    { title: "Veri Analisti", company: "DataWorks", location: "İstanbul, Türkiye", experience: "Orta Düzey", category: "finance" },
    { title: "Pazarlama Uzmanı", company: "MarkaMatik", location: "Antalya, Türkiye", experience: "Giriş Seviyesi", category: "marketing" },
    { title: "Network Mühendisi", company: "NetWorkers", location: "Bursa, Türkiye", experience: "Orta Düzey", category: "it" },
    { title: "İnsan Kaynakları Yöneticisi", company: "Kariyer İnsan", location: "Eskişehir, Türkiye", experience: "Üst Düzey", category: "management" },
    { title: "Finansal Danışman", company: "FinancePro", location: "İstanbul, Türkiye", experience: "Orta Düzey", category: "finance" },
    { title: "Mobil Uygulama Geliştirici", company: "AppLab", location: "Ankara, Türkiye", experience: "Orta Düzey", category: "it" },
    { title: "Mekatronik Mühendisi", company: "TechMek", location: "İzmir, Türkiye", experience: "Üst Düzey", category: "engineering" },
    { title: "Dijital Pazarlama Uzmanı", company: "Dijital Atölye", location: "İstanbul, Türkiye", experience: "Giriş Seviyesi", category: "marketing" },
    { title: "DevOps Mühendisi", company: "CloudOps", location: "Bursa, Türkiye", experience: "Orta Düzey", category: "it" },
    { title: "Hukuk Danışmanı", company: "LegalForce", location: "Ankara, Türkiye", experience: "Üst Düzey", category: "management" },
    { title: "Veri Tabanı Yöneticisi", company: "DataBaseCo", location: "Eskişehir, Türkiye", experience: "Orta Düzey", category: "it" },
    { title: "SEO Uzmanı", company: "WebOptim", location: "Antalya, Türkiye", experience: "Giriş Seviyesi", category: "marketing" },
    { title: "Elektrik Elektronik Mühendisi", company: "ElectroTech", location: "Ankara, Türkiye", experience: "Üst Düzey", category: "engineering" },
    { title: "Bilgi Güvenliği Uzmanı", company: "CyberSec", location: "İstanbul, Türkiye", experience: "Orta Düzey", category: "it" },
    { title: "Pazarlama Direktörü", company: "MarkaMatik", location: "Antalya, Türkiye", experience: "Üst Düzey", category: "marketing" },
    { title: "Yapay Zeka Uzmanı", company: "AI Innovators", location: "İzmir, Türkiye", experience: "Orta Düzey", category: "it" },
    { title: "Sistem Yöneticisi", company: "SystemAdmins", location: "İstanbul, Türkiye", experience: "Üst Düzey", category: "it" }
];

// İş ilanlarını yükle
function loadJobListings(jobs) {
    const jobContainer = document.getElementById("job-listings");
    jobContainer.innerHTML = ""; // Mevcut içerikleri temizle
    jobs.forEach((job) => {
        const jobCard = document.createElement("div");
        jobCard.classList.add("job-card");
        jobCard.innerHTML = `
            <h3>${job.title}</h3>
            <p>Şirket: ${job.company}</p>
            <p>Lokasyon: ${job.location}</p>
            <p>Deneyim: ${job.experience}</p>
            <button class="apply-btn">Başvur</button>
        `;
        jobContainer.appendChild(jobCard);
    });
}

// Filtreleme formunu yönet
document.getElementById("filter-form").addEventListener("submit", (event) => {
    event.preventDefault(); // Sayfanın yenilenmesini önle
    const position = document.getElementById("position").value.toLowerCase();
    const location = document.getElementById("location").value.toLowerCase();
    const category = document.getElementById("category").value;
    const experience = document.getElementById("experience").value;

    const filteredJobs = jobListings.filter((job) => {
        const matchesPosition = job.title.toLowerCase().includes(position);
        const matchesLocation = job.location.toLowerCase().includes(location);
        const matchesCategory = category === "all" || job.category === category;
        const matchesExperience = experience === "all" || job.experience.toLowerCase() === experience.toLowerCase();
        return matchesPosition && matchesLocation && matchesCategory && matchesExperience;
    });

    loadJobListings(filteredJobs);
});

// Sayfa yüklendiğinde tüm ilanları göster
document.addEventListener("DOMContentLoaded", () => {
    loadJobListings(jobListings);
});
