// Input ve buton
const searchInput = document.getElementById("searchInput");
const searchBtn = document.getElementById("searchBtn");

// TÜM kitap kartlarını al
const cards = document.querySelectorAll(".card");

// Arama fonksiyonu
function searchBooks() {
    const value = searchInput.value.toLowerCase().trim();
    if (value === "") {
        cards.forEach(card => {
            card.parentElement.style.display = "block";
        });
        return;
    }
    cards.forEach(card => {
        const titleElement = card.querySelector(".card-title");
        const genreElement = card.querySelector(".card-text");
        const title = titleElement ? titleElement.innerText.toLowerCase() : "";
        const genre = genreElement ? genreElement.innerText.toLowerCase() : "";
        if (title.includes(value) || genre.includes(value)) {
            card.parentElement.style.display = "block";
        } else {
            card.parentElement.style.display = "none";
        }
    });
}

// Kategori filtreleme
function filterByCategory(category) {
    searchInput.value = "";
    const categoryLower = category.toLowerCase();
    if (categoryLower === "tümü" || categoryLower === "all") {
        cards.forEach(card => {
            card.parentElement.style.display = "block";
        });
        return;
    }
    cards.forEach(card => {
        const genreElement = card.querySelector(".card-text");
        const genre = genreElement ? genreElement.innerText.toLowerCase() : "";
        if (genre.includes(categoryLower)) {
            card.parentElement.style.display = "block";
        } else {
            card.parentElement.style.display = "none";
        }
    });
}

// Ara butonu
if (searchBtn) {
    searchBtn.addEventListener("click", function() {
        searchBooks();
    });
}

// Enter tuşu
if (searchInput) {
    searchInput.addEventListener("keydown", function(e) {
        if (e.key === "Enter") {
            e.preventDefault();
            searchBooks();
        }
    });
}

// Dropdown menü
document.addEventListener('DOMContentLoaded', function() {
    const categoryDropdown = document.querySelectorAll('.nav-item.dropdown')[0];
    if (categoryDropdown) {
        const dropdownItems = categoryDropdown.querySelectorAll('.dropdown-item');
        dropdownItems.forEach(item => {
            item.addEventListener('click', function(e) {
                e.preventDefault();
                const categoryText = this.innerText.trim();
                filterByCategory(categoryText);
            });
        });
    }
    yukleKullaniciBilgileri();
    yukleKisilikSonucu();
    yukleModTercihi();
    gununSozunuAyarla();
});

// ========================================
// GECE/GÜNDÜZ MODU
// ========================================

function modDegistir() {
    var body = document.body;
    var modToggle = document.getElementById('modToggle');
    if (body.classList.contains('light-mode')) {
        body.classList.remove('light-mode');
        modToggle.innerHTML = '<i class="bi bi-moon-fill"></i>';
        localStorage.setItem('tema', 'dark');
    } else {
        body.classList.add('light-mode');
        modToggle.innerHTML = '<i class="bi bi-sun-fill"></i>';
        localStorage.setItem('tema', 'light');
    }
}

function yukleModTercihi() {
    var tema = localStorage.getItem('tema');
    var modToggle = document.getElementById('modToggle');
    if (tema === 'light' && modToggle) {
        document.body.classList.add('light-mode');
        modToggle.innerHTML = '<i class="bi bi-sun-fill"></i>';
    }
}

// ========================================
// KİŞİLİK ANALİZİ SONUCU
// ========================================

function yukleKisilikSonucu() {
    var kisilikTipi = localStorage.getItem('kisilikTipi');
    if (kisilikTipi) {
        var kisilikSonuc = document.getElementById('kisilikSonuc');
        var kisilikLi = document.querySelector('.kisilik-sonuc');
        if (kisilikSonuc && kisilikLi) {
            kisilikSonuc.innerHTML = '<i class="bi bi-person-badge"></i> Kişiliğim: ' + kisilikTipi;
            kisilikLi.style.display = 'block';
        }
    }
}

// ========================================
// KULLANICI GİRİŞ KONTROLÜ
// ========================================

function yukleKullaniciBilgileri() {
    var girisYapildi = localStorage.getItem('girisYapildi');
    var kullaniciIsim = localStorage.getItem('kullanici');
    if (girisYapildi === 'true' && kullaniciIsim) {
        document.querySelectorAll('.giris-yok').forEach(function(item) {
            item.style.display = 'none';
        });
        document.querySelectorAll('.giris-var').forEach(function(item) {
            item.style.display = 'block';
        });
        var kullaniciIsimElement = document.getElementById('kullaniciIsim');
        var kullaniciMenuElement = document.getElementById('kullaniciMenu');
        if (kullaniciIsimElement) kullaniciIsimElement.textContent = kullaniciIsim;
        if (kullaniciMenuElement) kullaniciMenuElement.textContent = kullaniciIsim;
        var uyeOlBtn = document.querySelector('.uye-ol-btn');
        if (uyeOlBtn) {
            uyeOlBtn.style.display = 'none';
        }
        var cikisYapBtn = document.getElementById('cikisYap');
        if (cikisYapBtn) {
            cikisYapBtn.addEventListener('click', function(e) {
                e.preventDefault();
                localStorage.removeItem('girisYapildi');
                localStorage.removeItem('kullanici');
                alert('Oturum kapatıldı!');
                location.reload();
            });
        }
    }
}

// ========================================
// FAVORİ VE YILDIZ FONKSİYONLARI
// ========================================

function favoriDegistir(element) {
    var card = element.closest('.card');
    var kitapIsim = card.querySelector('.card-title').textContent;
    var ikon = element.querySelector('i');
    if (ikon.classList.contains('fa-regular')) {
        ikon.classList.remove('fa-regular');
        ikon.classList.add('fa-solid');
        element.classList.add('aktif');
        favoriyeEkle(kitapIsim);
    } else {
        ikon.classList.remove('fa-solid');
        ikon.classList.add('fa-regular');
        element.classList.remove('aktif');
        favoridenCikar(kitapIsim);
    }
}

function favoriyeEkle(kitapIsim) {
    var favoriler = localStorage.getItem('favoriler');
    var liste = favoriler ? JSON.parse(favoriler) : [];
    if (!liste.includes(kitapIsim)) {
        liste.push(kitapIsim);
        localStorage.setItem('favoriler', JSON.stringify(liste));
    }
}

function favoridenCikar(kitapIsim) {
    var favoriler = localStorage.getItem('favoriler');
    var liste = favoriler ? JSON.parse(favoriler) : [];
    var index = liste.indexOf(kitapIsim);
    if (index > -1) {
        liste.splice(index, 1);
        localStorage.setItem('favoriler', JSON.stringify(liste));
    }
}

function yildizVer(element, puan) {
    var yildizKutusu = element.parentElement;
    var card = yildizKutusu.closest('.card');
    var kitapIsim = card.querySelector('.card-title').textContent;
    var tumYildizlar = yildizKutusu.querySelectorAll('i');
    tumYildizlar.forEach(function(yildiz) {
        yildiz.classList.remove('fa-solid', 'dolu');
        yildiz.classList.add('fa-regular');
    });
    for (var i = 0; i < puan; i++) {
        tumYildizlar[i].classList.remove('fa-regular');
        tumYildizlar[i].classList.add('fa-solid', 'dolu');
    }
    puanKaydet(kitapIsim, puan);
}

function puanKaydet(kitapIsim, puan) {
    var puanlar = localStorage.getItem('puanlar');
    var liste = puanlar ? JSON.parse(puanlar) : {};
    liste[kitapIsim] = puan;
    localStorage.setItem('puanlar', JSON.stringify(liste));
}

// Sayfa yüklenince favori ve puanları getir
window.addEventListener('DOMContentLoaded', function() {
    var favoriler = localStorage.getItem('favoriler');
    if (favoriler) {
        var liste = JSON.parse(favoriler);
        document.querySelectorAll('.card').forEach(function(card) {
            var kitapIsim = card.querySelector('.card-title').textContent;
            if (liste.includes(kitapIsim)) {
                var favoriIkon = card.querySelector('.favori-ikon');
                if (favoriIkon) {
                    var ikon = favoriIkon.querySelector('i');
                    ikon.classList.remove('fa-regular');
                    ikon.classList.add('fa-solid');
                    favoriIkon.classList.add('aktif');
                }
            }
        });
    }
    var puanlar = localStorage.getItem('puanlar');
    if (puanlar) {
        var liste = JSON.parse(puanlar);
        document.querySelectorAll('.card').forEach(function(card) {
            var kitapIsim = card.querySelector('.card-title').textContent;
            if (liste[kitapIsim]) {
                var puan = liste[kitapIsim];
                var yildizlar = card.querySelectorAll('.yildiz-kutusu i');
                for (var i = 0; i < puan; i++) {
                    yildizlar[i].classList.remove('fa-regular');
                    yildizlar[i].classList.add('fa-solid', 'dolu');
                }
            }
        });
    }
});

// ========================================
// KİTAP İNDİRME FONKSİYONU
// ========================================

function kitapIndir(kitapIsim, premium) {
    var kullaniciPremium = localStorage.getItem('premium') === 'true';
    if (premium && !kullaniciPremium) {
        alert('⛔ Bu kitap premium içeriktir!\n\nPremium üye olarak okuyabilirsiniz.');
        window.location.href = 'premium.html';
        return;
    }
    
    var kitaplar = {
        '1984': 'Winston Smith totaliter bir rejim altında yaşayan sıradan bir vatandaştır...',
        'Dune': 'Genç Paul Atreides, ailesiyle birlikte çöl gezegeni Arrakis\'e taşınır...',
        'Simyacı': 'Genç çoban Santiago, rüyasında gördüğü hazineyi bulmak için İspanya\'dan Mısır\'a doğru bir yolculuğa çıkar...',
        'Sefiller': 'Jean Valjean, ekmek çaldığı için 19 yıl hapis yatar...',
        'Hayvan Çiftliği': 'Manor Çiftliği\'ndeki hayvanlar, insan sahibi Bay Jones\'a karşı ayaklanır...',
        'Suç ve Ceza': 'Fakir öğrenci Raskolnikov, bir tefeci kadını öldürür...',
        'Beyaz Diş': 'Beyaz Diş, vahşi doğada doğan kurt-köpek melezi bir hayvandır...',
        'Kürk Mantolu Madonna': 'Raif Efendi, sanat tarihçisi olarak Berlin\'de çalışırken Maria Puder adlı Alman bir kadınla tanışır...',
        'Satranç': 'Stefan Zweig\'ın ustaca işlediği psikolojik bir hikaye...',
        'İnce Memed': 'Yaşar Kemal\'in ünlü romanı. Çukurova\'da zalim bir ağanın baskısı altında ezilen köylüler...',
        'Tutunamayanlar': 'Oğuz Atay\'ın başyapıtı. Modern Türk toplumunda yabancılaşmış bireylerin trajikomik hikayeleri...',
        'Nutuk': 'Mustafa Kemal Atatürk\'ün Kurtuluş Savaşı ve Cumhuriyet\'in kuruluşunu anlattığı tarihi eseri...',
        'Küçük Prens': 'Antoine de Saint-Exupéry\'nin ünlü masalı. Küçük bir prens farklı gezegenleri ziyaret ederek hayat dersleri öğrenir...',
        'Çalıkuşu': 'Reşat Nuri Güntekin\'in en ünlü romanı. Genç öğretmen Feride\'nin Anadolu\'nun farklı köşelerindeki maceraları...',
        'Fahrenheit 451': 'Ray Bradbury\'nin klasik distopyası. Kitapların yakıldığı, düşüncenin yasaklandığı bir toplumda...',
        'Savaş ve Barış': 'Tolstoy\'un muhteşem eseri. Napolyon\'un Rusya işgali sırasında aristokrat ailelerin yaşamları...',
        'Yüzüklerin Efendisi': 'J.R.R. Tolkien\'in destansı fantezi romanı. Orta Dünya\'da yüzüğü yok etmek için verilen epik mücadele...',
        'Hobbit': 'Bilbo Baggins\'in ejderha Smaug\'un hazinesini bulmak için gittiği macera dolu yolculuk...',
        'Cesur Yeni Dünya': 'Aldous Huxley\'nin ünlü distopyası. İnsanların laboratuvarda üretildiği ve mutluluğun zorla empoze edildiği gelecek...',
        'Martin Eden': 'Jack London\'ın otobiyografik romanı. Genç bir denizcinin yazar olma mücadelesi ve aşk hikayesi...'
    };
    
    var icerik = kitaplar[kitapIsim];
    if (!icerik) {
        alert('❌ Kitap içeriği bulunamadı!');
        return;
    }
    
    var blob = new Blob([icerik], { type: 'text/plain;charset=utf-8' });
    var link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = kitapIsim + '.txt';
    link.click();
    alert('✅ "' + kitapIsim + '" indirildi!');
}

// ========================================
// GÜNÜN ÖZLÜ SÖZÜ
// ========================================

const gununSozleri = [
    { soz: "Zaman, insanın içinden geçer.", yazar: "Ahmet Hamdi Tanpınar" },
    { soz: "Yaşamak bir ağaç gibi tek ve hür.", yazar: "Nazım Hikmet" },
    { soz: "İnsan, insana iyi gelir.", yazar: "Cemal Süreya" },
    { soz: "Hayal gücü bilgiden üstündür.", yazar: "Albert Einstein" },
    { soz: "Kendini bilmek bilgeliğin başlangıcıdır.", yazar: "Sokrates" },
    { soz: "Okumak ruha seyahat yaptırır.", yazar: "Cemil Meriç" },
    { soz: "Kitaplar sessiz öğretmenlerdir.", yazar: "Sokrates" },
    { soz: "Okuyan insan asla yalnız değildir.", yazar: "Attilâ İlhan" }
];

function gununSozunuAyarla() {
    const today = new Date().toDateString();
    let index = 0;
    for (let i = 0; i < today.length; i++) {
        index += today.charCodeAt(i);
    }
    index = index % gununSozleri.length;
    
    var gununSozuEl = document.getElementById("gununSozu");
    var gununYazarEl = document.getElementById("gununYazar");
    
    if (gununSozuEl && gununYazarEl) {
        gununSozuEl.innerText = '"' + gununSozleri[index].soz + '"';
        gununYazarEl.innerText = '— ' + gununSozleri[index].yazar;
    }
}