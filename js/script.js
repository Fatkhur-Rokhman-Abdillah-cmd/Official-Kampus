(function () {
  "use strict";

  const THEME_KEY = "pnc-theme";
  const body = document.body;
  const themeButton = document.getElementById("tombolTema");
  const prefersDark = window.matchMedia &&
    window.matchMedia("(prefers-color-scheme: dark)").matches;
  const savedTheme = localStorage.getItem(THEME_KEY);

  function applyTheme(isDark) {
    body.classList.toggle("dark", isDark);
    if (themeButton) {
      themeButton.textContent = isDark ? "☀️" : "🌙";
      themeButton.setAttribute(
        "aria-label",
        isDark ? "Aktifkan mode terang" : "Aktifkan mode gelap"
      );
    }
  }

  applyTheme(savedTheme ? savedTheme === "dark" : prefersDark);

  if (themeButton) {
    themeButton.addEventListener("click", function () {
      const isDark = !body.classList.contains("dark");
      applyTheme(isDark);
      localStorage.setItem(THEME_KEY, isDark ? "dark" : "light");
    });
  }
})();

// ===== BAGIAN MAHASISWA 4 (Kontak) =====

const tombolKirim = document.getElementById("tombol-kirim");

if (tombolKirim) {

    tombolKirim.addEventListener("click", function () {

        const nama =
            document.getElementById("nama").value;

        const email =
            document.getElementById("email").value;

        const pesan =
            document.getElementById("pesan").value;

        const status =
            document.getElementById("status-form");


        // Validasi form
        if (nama === "" || email === "" || pesan === "") {

            status.textContent =
                "Semua kolom wajib diisi.";

        } else {

            status.textContent =
                "Terima kasih, " + nama +
                ". Pesan Anda diterima.";

        }

    });

}