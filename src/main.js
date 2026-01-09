

// Populate Product Grid (Existing Code)
const products = [
  { title: "3D Signs & Lettering", image: "/assets/images/products/3D%20Lettering.webp" },
  { title: "Vehicle Graphics", image: "/assets/images/products/vehicle.webp" },
  { title: "Window Graphics", image: "/assets/images/products/window.webp" },
  { title: "Illuminated Signs", image: "/assets/images/products/illuminated.webp" },
  { title: "Channel Letters", image: "/assets/images/products/channel.webp" },
  { title: "Pylon Signs", image: "/assets/images/products/pylon.webp" },
  { title: "Office & Wall Signs", image: "/assets/images/products/office.webp" },
  { title: "Construction Signs", image: "/assets/images/products/construction.webp" },
  { title: "Digital Signs", image: "/assets/images/products/digital.webp" }
];

const grid = document.getElementById('product-grid');

products.forEach(product => {
  const card = document.createElement('div');
  card.classList.add('product-card');
  card.innerHTML = `
        <img src="${product.image}" alt="${product.title}">
        <div class="card-body">
            <h3>${product.title}</h3>
        </div>
    `;
  grid.appendChild(card);
});


// Testimonial Scroll Logic
const testimonialContainer = document.getElementById('testimonial-container');
const prevBtn = document.getElementById('prev-reviews');
const nextBtn = document.getElementById('next-reviews');

if (testimonialContainer && prevBtn && nextBtn) {
  prevBtn.addEventListener('click', () => {
    testimonialContainer.scrollBy({ left: -380, behavior: 'smooth' }); // Card width + gap
  });

  nextBtn.addEventListener('click', () => {
    testimonialContainer.scrollBy({ left: 380, behavior: 'smooth' });
  });
}


// Modal Logic
// Modal Logic
const modal = document.getElementById('quote-modal');
// Select both the hero button and the header button (or any other trigger)
const openBtns = document.querySelectorAll('#open-quote-modal, .btn-quote-trigger-header');
const closeBtn = document.getElementById('close-modal');

if (modal && closeBtn) {
  openBtns.forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault(); // Prevent anchor jump
      modal.classList.add('active');
      document.body.style.overflow = 'hidden';
    });
  });

  closeBtn.addEventListener('click', () => {
    modal.classList.remove('active');
    document.body.style.overflow = '';
  });

  // Close on outside click
  modal.addEventListener('click', (e) => {
    if (e.target === modal) {
      modal.classList.remove('active');
      document.body.style.overflow = '';
    }
  });
}
