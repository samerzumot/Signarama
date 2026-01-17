import { products } from './data.js';

const grid = document.getElementById('product-grid');

/*
if (grid) {
  products.forEach(product => {
    const card = document.createElement('div');
    card.classList.add('product-card');
    const imageSrc = product.image.startsWith('http') ? product.image : (window.assetBaseUrl + product.image);
    card.innerHTML = `
      <a href="/pages/product-details?item=${product.slug}" style="text-decoration: none; color: inherit; display: block;">
        <img src="${imageSrc}" alt="${product.title}">
        <div class="card-body">
          <h3>${product.title}</h3>
          <p style="font-size: 0.9rem; color: #666; margin-top: 0.5rem;">${product.description}</p>
        </div>
      </a>
    `;
    grid.appendChild(card);
  });
}
*/


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
