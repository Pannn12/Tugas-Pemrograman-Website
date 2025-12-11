const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('.nav-menu');
const scrollTopBtn = document.getElementById("scrollTopBtn");


// ===========================================
// 1. LOGIKA HAMBURGER DAN MENU
// ===========================================

// Toggle Menu dan Animasi X
if (hamburger) {
    hamburger.addEventListener('click', () => {
        navMenu.classList.toggle('active');
        hamburger.classList.toggle('active'); 
    });
}

// Tutup menu dan hamburger saat link di klik (termasuk link #)
document.querySelectorAll('.nav-menu a').forEach(link => {
    link.addEventListener('click', () => {
        // Hanya tutup jika menu sedang terbuka (untuk mobile)
        if (navMenu.classList.contains('active')) {
            navMenu.classList.remove('active');
            // Pastikan hamburger juga nonaktif (kembali ke garis 3)
            if (hamburger) {
                 hamburger.classList.remove('active'); 
            }
        }
    });
});


// ===========================================
// 2. LOGIKA SMOOTH SCROLL
// ===========================================

function smoothScroll(targetID) {
    const target = document.querySelector(targetID);
    
    // Jika target adalah #home atau target tidak ditemukan, gulir ke atas
    let targetPosition = 0;
    
    if (target && targetID !== '#home') {
        const navbar = document.querySelector('.navbar');
        // Mendapatkan tinggi navbar untuk offset
        const navbarHeight = navbar ? navbar.offsetHeight : 0; 
        targetPosition = target.offsetTop - navbarHeight;
    }

    window.scrollTo({
        top: targetPosition,
        behavior: "smooth"
    });
}

// Event listener untuk semua link # di halaman
document.addEventListener('click', function(e) {
    // Memeriksa jika yang diklik adalah link yang menuju #ID
    if (e.target.matches('a[href^="#"]')) {
        const targetID = e.target.getAttribute('href');
        if (targetID && targetID.startsWith('#')) {
            e.preventDefault();
            smoothScroll(targetID);
        }
    }
});


// ===========================================
// 3. LOGIKA KEMBALI KE ATAS (SCROLL TO TOP)
// ===========================================

if (scrollTopBtn) {
    // Tampilkan/Sembunyikan tombol berdasarkan posisi scroll
    window.onscroll = function() {
        // 300px adalah batas munculnya tombol
        if (document.body.scrollTop > 300 || document.documentElement.scrollTop > 300) {
            scrollTopBtn.style.display = "block";
        } else {
            scrollTopBtn.style.display = "none";
        }
    };

    // Saat tombol diklik, panggil smoothScroll ke #home (posisi 0)
    scrollTopBtn.addEventListener('click', function() {
        smoothScroll('#home'); 
    });
}


// ===========================================
// 4. LOGIKA MODAL (POP-UP) GALERI
// ===========================================

// Pastikan semua elemen modal ada, jika tidak, kode ini tidak akan dijalankan
if (document.getElementById("imageModal")) {
    const modal = document.getElementById("imageModal");
    const modalImage = document.getElementById("modalImage");
    const modalTitle = document.getElementById("modalTitle");
    const modalDescription = document.getElementById("modalDescription");

    window.openModal = function(element) {
        modalImage.src = element.src;
        modalTitle.textContent = element.getAttribute('data-title');
        modalDescription.textContent = element.getAttribute('data-description');
        modal.style.display = "block";
        document.body.style.overflow = "hidden"; // Kunci scroll
    }

    window.closeModal = function() {
        modal.style.display = "none";
        document.body.style.overflow = "auto"; // Aktifkan scroll
    }

    window.onclick = function(event) {
        if (event.target === modal) {
            closeModal();
        }
    };
}