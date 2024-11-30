function selectTemplate(templateNumber) {
    // Seçilen taslağı kaydediyoruz
    localStorage.setItem("selectedTemplate", templateNumber);

    // Taslak seçim ekranını gizle, düzenleme ekranını göster
    document.querySelector('.cv-selection-container').style.display = 'none';
    const editorContainer = document.getElementById('cv-editor-container');
    editorContainer.style.display = 'block';

    // Seçilen taslağı yükle
    const templateContainer = document.getElementById('cv-template');
    if (templateNumber === 1) {
        templateContainer.innerHTML = `
            <h1>Ad Soyad</h1>
            <p>Adres | Telefon | E-posta</p>
            <h2>Profil</h2>
            <p>Kendinizi tanıtan kısa bir açıklama yazınız...</p>
            <h2>Deneyimler</h2>
            <ul>
                <li>İş deneyimleriniz burada listelenecek...</li>
            </ul>
            <h2>Eğitim</h2>
            <p>Eğitim bilgilerinizi buraya yazabilirsiniz...</p>
        `;
    } else if (templateNumber === 2) {
        templateContainer.innerHTML = `
            <h1>Ad Soyad</h1>
            <p>Hakkınızda kısa bir bilgi yazınız...</p>
            <h2>Beceriler</h2>
            <ul>
                <li>Beceri 1</li>
                <li>Beceri 2</li>
            </ul>
            <h2>Deneyim</h2>
            <p>İş deneyimlerinizi buraya yazınız...</p>
        `;
    } else if (templateNumber === 3) {
        templateContainer.innerHTML = `
            <h1>Ad Soyad</h1>
            <h2>Eğitim</h2>
            <p>Eğitim geçmişiniz buraya eklenecek...</p>
            <h2>Deneyimler</h2>
            <p>Deneyimlerinizi yazınız...</p>
        `;
    }
}

// CV'yi PDF olarak indir
function downloadCV() {
    const template = document.getElementById('cv-template');
    const { jsPDF } = window.jspdf;
    const doc = new jsPDF("p", "mm", "a4");

    doc.html(template, {
        callback: function (doc) {
            doc.save("CV.pdf");
        },
        x: 10,
        y: 10
    });
}
