let lokasiGPS = "";

// LOGIN
function login() {
  const nama = document.getElementById("nama").value;
  const kode = document.getElementById("kode").value;

  if (nama !== "" && kode === "Z41f4C4Nt1k") {
    sessionStorage.setItem("login", "true");
    sessionStorage.setItem("nama", nama);
    window.location.href = "home.html";
  } else {
    document.getElementById("error").innerText =
      "Nama atau kode presensi salah 💔";
  }
}

// CEK LOGIN
function cekLogin() {
  if (sessionStorage.getItem("login") !== "true") {
    window.location.href = "login.html";
  }
  tampilkanGaleri();
}

// GPS
function ambilLokasi() {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(pos => {
      lokasiGPS =
        pos.coords.latitude.toFixed(5) + ", " +
        pos.coords.longitude.toFixed(5);

      document.getElementById("lokasiText").innerText =
        "📍 Lokasi: " + lokasiGPS;
    }, () => {
      alert("Izin lokasi ditolak 💔");
    });
  }
}

// UPLOAD FOTO
function uploadFoto() {
  const foto = document.getElementById("foto").files[0];
  const caption = document.getElementById("caption").value;

  if (!foto) return alert("Pilih foto dulu ya 🌸");

  const reader = new FileReader();
  reader.onload = function () {
    const data = {
      img: reader.result,
      caption,
      lokasi: lokasiGPS || "Lokasi tidak tersedia"
    };

    const galeri = JSON.parse(localStorage.getItem("galeri")) || [];
    galeri.push(data);
    localStorage.setItem("galeri", JSON.stringify(galeri));

    bungaJatuh();
    document.getElementById("overlay").classList.remove("hidden");
    tampilkanGaleri();
  };
  reader.readAsDataURL(foto);
}

// TAMPIL GALERI
function tampilkanGaleri() {
  const galeri = JSON.parse(localStorage.getItem("galeri")) || [];
  const container = document.getElementById("galeri");
  if (!container) return;

  container.innerHTML = "";
  galeri.forEach(item => {
    container.innerHTML += `
      <div>
        <img src="${item.img}">
        <p>${item.caption}</p>
        <small>📍 ${item.lokasi}</small>
      </div>
    `;
  });
}

// BUNGA JATUH
function bungaJatuh() {
  for (let i = 0; i < 30; i++) {
    const bunga = document.createElement("div");
    bunga.className = "flower";
    bunga.innerText = "🌸";
    bunga.style.left = Math.random() * window.innerWidth + "px";
    bunga.style.animationDuration = (3 + Math.random() * 3) + "s";
    bunga.style.fontSize = (16 + Math.random() * 20) + "px";
    document.body.appendChild(bunga);
    setTimeout(() => bunga.remove(), 6000);
  }
}

function tutupOverlay() {
  document.getElementById("overlay").classList.add("hidden");
}

// LOGOUT
function keluar() {
  sessionStorage.clear();
  window.location.href = "login.html";
}
