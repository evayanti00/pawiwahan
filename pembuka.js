window.addEventListener("load", () => {
  document.body.classList.add("modal-open");
  const modal = document.getElementById("modal");
  modal.classList.add("show"); // tampilkan popup
});

function hideplay() {
  const modal = document.getElementById("modal");
  modal.classList.remove("show"); // sembunyikan popup

  // aktifkan musik
  const audio = document.getElementById("myAudio");
  if (audio) {
    audio.muted = false;
    audio.play().catch(err => console.log("Autoplay gagal:", err));
  }

  // tampilkan semua section utama
  document.querySelectorAll("section").forEach(sec => sec.classList.add("show"));

  // buka scroll
  document.body.classList.remove("modal-open");
}

document.getElementById("btn-open").addEventListener("click", hideplay);