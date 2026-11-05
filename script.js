// ===== DATA: ubah di sini saja =====
const USAHA = {
  nama: "Kedai Sidikalang",
  tagline: "Kopi dan kue khas Sumatra Utara, dibuat segar setiap hari.",
  wa: "6281200000000", // format 62812..., tanpa + dan tanpa 0 di depan
  instagram: "https://instagram.com/kedaisidikalang",
  facebook: "https://facebook.com/kedaisidikalang",
  tiktok: "https://tiktok.com/@kedaisidikalang",
  alamat: "Jl. Contoh No. 1, Medan, Sumatera Utara",
  jam: "Setiap hari, 08.00–21.00 WIB"
};
const PRODUK = [
  { nama: "Kopi Sidikalang Hitam", kategori: "Kopi", harga: 22000, ikon: "☕", deskripsi: "Seduhan arabika Sidikalang, aroma kuat dan pahit yang bersih." },
  { nama: "Kopi Susu Gula Aren", kategori: "Kopi", harga: 25000, ikon: "🥛", deskripsi: "Kopi susu dingin dengan gula aren, manisnya lembut." },
  { nama: "Bubuk Kopi Sidikalang 250 g", kategori: "Kopi", harga: 65000, ikon: "🫘", deskripsi: "Bubuk gilingan sedang, cocok untuk tubruk dan V60." },
  { nama: "Bika Ambon", kategori: "Kue", harga: 85000, ikon: "🍰", deskripsi: "Kue sarang lebah khas Medan, kenyal dengan aroma santan dan pandan." },
  { nama: "Bolu Gulung Pandan", kategori: "Kue", harga: 45000, ikon: "🍥", deskripsi: "Bolu gulung lembut berisi krim vanila." },
  { nama: "Lapis Legit Mini", kategori: "Kue", harga: 70000, ikon: "🎂", deskripsi: "Berlapis tipis, kaya mentega dan rempah." },
  { nama: "Pancake Durian", kategori: "Kue", harga: 60000, ikon: "🥞", deskripsi: "Pancake isi krim durian, disajikan dingin." },
  { nama: "Paket Oleh-oleh Medan", kategori: "Paket", harga: 150000, ikon: "🎁", deskripsi: "Bika Ambon, Lapis Legit Mini, dan bubuk kopi 250 g." }
];

// ===== PROGRAM =====
const rupiah = (n) => new Intl.NumberFormat("id-ID", { style: "currency", currency: "IDR", maximumFractionDigits: 0 }).format(n);
const linkWA = (pesan) => `https://wa.me/${USAHA.wa}?text=${encodeURIComponent(pesan)}`;
const isi = (sel, fn) => document.querySelectorAll(sel).forEach(fn);

isi("[data-wa]", (e) => (e.href = linkWA(`Halo ${USAHA.nama}, saya ingin bertanya.`)));
isi("[data-ig]", (e) => (e.href = USAHA.instagram));
isi("[data-fb]", (e) => (e.href = USAHA.facebook));
isi("[data-tt]", (e) => (e.href = USAHA.tiktok));

const daftar = document.getElementById("daftar");
const cari = document.getElementById("cari");
const kategori = document.getElementById("kategori");
const status = document.getElementById("status");
const kosong = document.getElementById("kosong");

[...new Set(PRODUK.map((p) => p.kategori))].forEach((k) => kategori.add(new Option(k, k)));

function kartu(p) {
  const a = document.createElement("article");
  a.className = "produk";
  a.innerHTML = `
    <div class="gambar" aria-hidden="true">${p.ikon}</div>
    <p class="label">${p.kategori}</p>
    <h3>${p.nama}</h3>
    <p>${p.deskripsi}</p>
    <p class="harga">${rupiah(p.harga)}</p>
    <a class="tombol wa" target="_blank" rel="noopener"
       href="${linkWA(`Halo ${USAHA.nama}, saya ingin memesan ${p.nama} (${rupiah(p.harga)}).`)}">Pesan lewat WhatsApp</a>`;
  return a;
}

function tampilkan() {
  const kata = cari.value.trim().toLowerCase();
  const hasil = PRODUK.filter((p) =>
    `${p.nama} ${p.deskripsi} ${p.kategori}`.toLowerCase().includes(kata) &&
    (kategori.value === "semua" || p.kategori === kategori.value));
  daftar.replaceChildren(...hasil.map(kartu));
  status.textContent = `Menampilkan ${hasil.length} dari ${PRODUK.length} produk.`;
  kosong.hidden = hasil.length !== 0;
}

cari.addEventListener("input", tampilkan);
kategori.addEventListener("change", tampilkan);
tampilkan();
