// --- DATA PRODUK (Dengan Gambar Asli dari Unsplash) ---
const products = [
    {
        id: 1,
        name: "iPhone 13 Pro Max 128GB Bekas Mulus",
        price: 12500000,
        category: "elektronik",
        image: "https://images.unsplash.com/photo-1632661674596-df8be070a5c5?auto=format&fit=crop&w=500&q=60"
    },
    {
        id: 2,
        name: "Laptop Gaming ASUS ROG Strix",
        price: 18000000,
        category: "elektronik",
        image: "https://images.unsplash.com/photo-1603302576837-37561b2e2302?auto=format&fit=crop&w=500&q=60"
    },
    {
        id: 3,
        name: "Sepatu Nike Air Jordan High",
        price: 2500000,
        category: "fashion",
        image: "https://images.unsplash.com/photo-1552346154-21d32810aba3?auto=format&fit=crop&w=500&q=60"
    },
    {
        id: 4,
        name: "Jasa Desain Logo & Branding Identity",
        price: 300000,
        category: "jasa",
        image: "https://images.unsplash.com/photo-1626785774573-4b799314346d?auto=format&fit=crop&w=500&q=60"
    },
    {
        id: 5,
        name: "Motor Vespa Primavera 150cc",
        price: 45000000,
        category: "otomotif",
        image: "https://images.unsplash.com/photo-1621251346083-2070e1009c45?auto=format&fit=crop&w=500&q=60"
    },
    {
        id: 6,
        name: "Kamera Sony A7III Body Only",
        price: 22000000,
        category: "elektronik",
        image: "https://images.unsplash.com/photo-1516035069371-29a1b244cc32?auto=format&fit=crop&w=500&q=60"
    },
    {
        id: 7,
        name: "Jasa Service AC Rumah & Kantor",
        price: 75000,
        category: "jasa",
        image: "https://images.unsplash.com/photo-1621905251189-08b45d6a269e?auto=format&fit=crop&w=500&q=60"
    },
    {
        id: 8,
        name: "Jam Tangan Casio G-Shock Original",
        price: 1200000,
        category: "fashion",
        image: "https://images.unsplash.com/photo-1524592094714-0f0654e20314?auto=format&fit=crop&w=500&q=60"
    },
    {
        id: 9,
        name: "Helm KYT R10 Full Face",
        price: 350000,
        category: "otomotif",
        image: "https://images.unsplash.com/photo-1557805166-5c4222487e0c?auto=format&fit=crop&w=500&q=60"
    },
    {
        id: 10,
        name: "Jasa Pembuatan Website Company Profile",
        price: 1500000,
        category: "jasa",
        image: "https://images.unsplash.com/photo-1547658719-da2b51169166?auto=format&fit=crop&w=500&q=60"
    }
];

// Konfigurasi WhatsApp
const myPhoneNumber = "6285730571377"; // Format internasional tanpa '+'

// --- FUNGSI UTAMA ---

// 1. Format Rupiah
function formatRupiah(number) {
    return new Intl.NumberFormat('id-ID', {
        style: 'currency',
        currency: 'IDR',
        minimumFractionDigits: 0
    }).format(number);
}

// 2. Render Produk ke HTML
function renderProducts(data) {
    const container = document.getElementById('productContainer');
    container.innerHTML = ''; // Bersihkan konten lama

    if (data.length === 0) {
        container.innerHTML = '<p style="grid-column: 1/-1; text-align:center; padding: 20px;">Produk tidak ditemukan.</p>';
        return;
    }

    data.forEach(product => {
        // Buat Link WhatsApp Otomatis
        const message = `Halo Admin, saya mau pesan:\n*${product.name}*\nHarga: ${formatRupiah(product.price)}\n\nApakah masih tersedia?`;
        const waLink = `https://wa.me/${myPhoneNumber}?text=${encodeURIComponent(message)}`;

        // Buat Element Card
        const card = document.createElement('div');
        card.className = 'product-card';
        card.innerHTML = `
            <div class="card-img-wrapper">
                <img src="${product.image}" alt="${product.name}" class="product-img" loading="lazy">
                <span class="badge">${product.category}</span>
            </div>
            <div class="product-info">
                <h3 class="product-title">${product.name}</h3>
                <div class="product-price">${formatRupiah(product.price)}</div>
                <a href="${waLink}" target="_blank" class="btn-wa">
                    <i class="fab fa-whatsapp"></i> Pesan Sekarang
                </a>
            </div>
        `;
        container.appendChild(card);
    });
}

// 3. Fungsi Filter Kategori
function filterProduct(category) {
    // Update tampilan tombol aktif
    const buttons = document.querySelectorAll('.cat-btn');
    buttons.forEach(btn => btn.classList.remove('active'));
    event.target.classList.add('active');

    // Filter data
    if (category === 'all') {
        renderProducts(products);
    } else {
        const filtered = products.filter(p => p.category === category);
        renderProducts(filtered);
    }
}

// 4. Fungsi Pencarian (Search)
const searchInput = document.getElementById('searchInput');
searchInput.addEventListener('keyup', (e) => {
    const keyword = e.target.value.toLowerCase();
    const filtered = products.filter(p => 
        p.name.toLowerCase().includes(keyword) || 
        p.category.toLowerCase().includes(keyword)
    );
    renderProducts(filtered);
});

// 5. Scroll Smooth ke Produk
function scrollToProducts() {
    document.getElementById('product-section').scrollIntoView({ behavior: 'smooth' });
}

// --- INITIALIZATION ---
// Jalankan saat halaman pertama kali dimuat
document.addEventListener('DOMContentLoaded', () => {
    renderProducts(products);
});