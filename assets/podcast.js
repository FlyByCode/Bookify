const podcasts = [
    {
        title: "İnsan, İnsana Neden İyi Gelir?",
        desc: "Edebiyat ve insan ilişkileri üzerine kısa bir sohbet.",
        file: "assets/audio/podcast1.mp3"
    },
    {
        title: "Yalnızlık Gerçekten Bir Seçim mi?",
        desc: "Modern dünyada yalnız kalmak üzerine düşünceler.",
        file: "assets/audio/podcast2.mp3"
    },
    {
        title: "Okumak mı Dinlemek mi?",
        desc: "Kitap ve podcast kültürünün karşılaştırılması.",
        file: "assets/audio/podcast3.mp3"
    },
    {
        title: "Yazarlar Neden Acı Çeker?",
        desc: "Edebiyatın karanlık tarafı üzerine konuşma.",
        file: "assets/audio/podcast4.mp3"
    },
    {
        title: "Bir Cümle Hayatı Değiştirir mi?",
        desc: "Etkileyici sözlerin gücü üzerine kısa bölüm.",
        file: "assets/audio/podcast5.mp3"
    }
];

// GÜNE GÖRE PODCAST SEÇ
const today = new Date().toDateString();
let index = 0;
for (let i = 0; i < today.length; i++) {
    index += today.charCodeAt(i);
}
index = index % podcasts.length;

// ELEMENTLER
const audio = document.getElementById("podcastAudio");
const titleEl = document.getElementById("podcastTitle");
const descEl = document.getElementById("podcastDesc");
const playBtn = document.getElementById("playBtn");

// YERLEŞTİR
titleEl.innerText = podcasts[index].title;
descEl.innerText = podcasts[index].desc;
audio.src = podcasts[index].file;

// PLAY / PAUSE
let playing = false;

playBtn.addEventListener("click", () => {
    if (!playing) {
        audio.play();
        playBtn.innerHTML = `<i class="fa-solid fa-pause me-2"></i> Duraklat`;
    } else {
        audio.pause();
        playBtn.innerHTML = `<i class="fa-solid fa-play me-2"></i> Dinle`;
    }
    playing = !playing;
});