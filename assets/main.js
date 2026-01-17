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

// Global Modal Logic (Event Delegation)
document.addEventListener('DOMContentLoaded', function () {
  const modal = document.getElementById('quote-modal');
  const closeBtn = document.getElementById('close-modal');

  // OPEN MODAL: Listens for clicks on the document and checks if they came from a quote button
  document.body.addEventListener('click', function (e) {
    const btn = e.target.closest('.btn-quote-trigger-header, #product-quote-trigger, .btn-quote, .btn-get-quote, a[href="#quote"]');

    if (btn) {
      e.preventDefault();

      if (!modal) return; // Exit if no modal exists (shouldn't happen if HTML is fixed)

      // Check for Context (Product Page)
      const productName = btn.getAttribute('data-product');
      const messageArea = modal.querySelector('textarea[name="message"]');

      if (messageArea) {
        if (productName) {
          messageArea.value = "I am interested in a quote for " + productName + ".";
        } else {
          const currentVal = messageArea.value;
          if (currentVal && currentVal.includes("I am interested in a quote for")) {
            messageArea.value = "";
          }
        }
      }

      modal.style.display = 'flex'; // Use flex to center
      modal.classList.add('active'); // Add active class for transitions if any
      document.body.style.overflow = 'hidden';
    }
  });

  // CLOSE MODAL
  if (closeBtn) {
    closeBtn.addEventListener('click', function () {
      if (modal) {
        modal.style.display = 'none';
        modal.classList.remove('active');
        document.body.style.overflow = '';
      }
    });
  }

  window.addEventListener('click', function (e) {
    if (modal && e.target === modal) {
      modal.style.display = 'none';
      modal.classList.remove('active');
      document.body.style.overflow = '';
    }
  });

  // AJAX Form Handling
  const form = document.getElementById('quote-form');
  const successMsg = document.getElementById('success-message');
  const closeSuccess = document.getElementById('close-success-btn');

  if (form) {
    form.addEventListener('submit', function (e) {
      e.preventDefault();
      const btn = form.querySelector('.btn-submit');
      const originalText = btn.innerText;
      btn.innerText = 'Sending...';
      btn.disabled = true;

      fetch(form.action, {
        method: 'POST',
        body: new FormData(form),
        headers: { 'Accept': 'application/json' }
      })
        .then(response => {
          form.style.display = 'none';
          if (successMsg) successMsg.style.display = 'block';
          form.reset();
        })
        .catch(err => alert('Error sending form. Please try again.'))
        .finally(() => {
          btn.innerText = originalText;
          btn.disabled = false;
        });
    });
  }

  if (closeSuccess) {
    closeSuccess.addEventListener('click', function () {
      if (modal) {
        modal.style.display = 'none';
        modal.classList.remove('active');
        document.body.style.overflow = '';
      }
      setTimeout(() => {
        if (successMsg) successMsg.style.display = 'none';
        if (form) form.style.display = 'block';
      }, 500);
    });
  }
});
