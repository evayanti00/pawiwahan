// === Countdown ===
function startCountdown() {
  const eventDate = new Date("2026-04-22T12:00:00"); // sesuaikan tanggal acara
  const countdown = setInterval(() => {
    const now = new Date();
    const distance = eventDate - now;

    if (distance <= 0) {
      clearInterval(countdown);
      ["hari","jam","menit","detik"].forEach(id => {
        document.getElementById(id).innerText = "0";
      });
      return;
    }

    const days = Math.floor(distance / (1000 * 60 * 60 * 24));
    const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((distance % (1000 * 60)) / 1000);

    updateCountdown("hari", days);
    updateCountdown("jam", hours);
    updateCountdown("menit", minutes);
    updateCountdown("detik", seconds);
  }, 1000);
}

function updateCountdown(id, value) {
  const el = document.getElementById(id);
  if (el.innerText !== value.toString()) {
    el.innerText = value;
    el.classList.add("pulse");
    setTimeout(() => el.classList.remove("pulse"), 500);
  }
}

// === Audio Control ===
const audio = document.getElementById("myAudio");
const playPauseBtn = document.getElementById("playPausebtn");

function play() {
  if (audio.paused) {
    audio.play();
    playPauseBtn.style.opacity = "1";
  } else {
    audio.pause();
    playPauseBtn.style.opacity = "0.5";
  }
}
  window.addEventListener("load", () => {
    const savedTime = localStorage.getItem("musicTime");
    if (savedTime) {
      audio.currentTime = parseFloat(savedTime); // lanjut dari posisi terakhir
    }
    audio.muted = false; // pastikan audio tidak mute
    audio.play();
  });


// === RSVP ===
document.getElementById("formRSVP").addEventListener("submit", function(e) {
  e.preventDefault();

  let nama = document.getElementById("nama").value;
  let hadir = document.getElementById("kehadiran").value;

  if (!nama || !hadir) {
    document.getElementById("status").innerText = "Isi dulu semua data ya!";
    return;
  }

  let url = "https://docs.google.com/forms/d/e/1FAIpQLSdB9hutjzIZrCnDo6inaN2qJI5bvt1cQIR-8TtIsZiM2xyN8A/formResponse?usp=header";

  let formData = new FormData();
  formData.append("entry.2056520347", nama);
  formData.append("entry.431234189", hadir);

  fetch(url, { method: "POST", mode: "no-cors", body: formData });

  document.getElementById("status").innerText = "Terima kasih, konfirmasi berhasil!";
  document.getElementById("formRSVP").reset();
});

// === Ucapan & Doa ===
function kirimUcapan() {
  let nama = document.getElementById("namaUcapan").value;
  let isi = document.getElementById("isiUcapan").value;

  if (!nama || !isi) {
    alert("Isi dulu ya!");
    return;
  }

  let url = "https://docs.google.com/forms/d/e/1FAIpQLSfM7088aJSxfsHJxfGPGNPkhyVAUihBfi9qVRdwoGUyz3GWVA/formResponse?usp=header";

  let formData = new FormData();
  formData.append("entry.1878474689", nama);
  formData.append("entry.1516796828", isi);

  fetch(url, { method: "POST", mode: "no-cors", body: formData });

  document.getElementById("namaUcapan").value = "";
  document.getElementById("isiUcapan").value = "";

  setTimeout(loadUcapan, 6000);
}

function loadUcapan() {
  let url = "https://docs.google.com/spreadsheets/d/1eWU9iJfVjnAJ8FwfBKsXNUPbLF90yLYNLx69mNc1e8w/gviz/tq?tqx=out:json";

  fetch(url)
    .then(res => res.text())
    .then(data => {
      let start = data.indexOf("{");
      let end = data.lastIndexOf("}");
      let json = JSON.parse(data.substring(start, end + 1));
      let rows = json.table.rows;

      console.log("Rows:", rows); // cek isi

      let container = document.getElementById("listUcapan");
      container.innerHTML = "";

      rows.reverse().forEach(row => {
        let cols = row.c;
        let timestamp = cols[0]?.f || "";
        let nama = cols[1]?.v || "";
        let ucapan = cols[2]?.v || "";

        if (nama && ucapan) {
          let div = document.createElement("div");
          div.classList.add("item-ucapan");
          div.innerHTML = `
            <h4>${nama} <small style="color:gray;font-size:12px;">${timestamp}</small></h4>
            <p>${ucapan}</p>
          `;
          container.prepend(div);
        }
      });

      if (container.innerHTML === "") {
        container.innerText = "Belum ada ucapan.";
      }
    })
    .catch(err => {
      console.error("Gagal load ucapan:", err);
      document.getElementById("listUcapan").innerText = "Belum ada ucapan.";
    });
}

// pastikan dipanggil
window.addEventListener("DOMContentLoaded", loadUcapan);

// === Galeri ===
function showImage(src) {
  document.getElementById("myModal").style.display = "block";
  document.getElementById("imgModal").src = src;
}

function closeModal() {
  document.getElementById("myModal").style.display = "none";
}

document.querySelectorAll('.galeri-container img').forEach(img => {
  img.addEventListener('click', () => showImage(img.src));
});


// === Animasi Scroll Global ===
document.addEventListener("DOMContentLoaded", () => {
  const elements = document.querySelectorAll("section, div, img, h1, h2, h3, p, button");

  // tambahkan class scroll-anim ke semua elemen
  elements.forEach(el => el.classList.add("scroll-anim"));

  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add("show");
      } else {
        // saat elemen keluar viewport, hapus class show
        entry.target.classList.remove("show");
      }
    });
  }, { threshold: 0.1 });

  elements.forEach(el => observer.observe(el));
});

// === Jalankan Countdown saat DOM siap ===
document.addEventListener("DOMContentLoaded", startCountdown);