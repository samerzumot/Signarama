// Populate Product Grid (Existing Code)
const products = [
  { name: '3D Signs & Lettering', image: '/assets/products/3d-signs-lettering.jpg' },
  { name: 'Channel Letters', image: '/assets/products/channel-letters.jpg' },
  { name: 'Light Boxes', image: '/assets/products/light-boxes.jpg' },
  { name: 'Pylon Signs', image: '/assets/products/pylon-signs.jpg' },
  { name: 'Indoor Signs', image: '/assets/products/indoor-signs.jpg' },
  { name: 'Vehicle Grahics', image: '/assets/products/vehicle-graphics.jpg' },
  { name: 'Window Frosting', image: '/assets/products/window-frosting.jpg' },
  { name: 'Wayfinding', image: '/assets/products/wayfinding.jpg' },
  { name: 'Safety Signs', image: '/assets/products/safety-signs.jpg' },
  { name: 'A-Frames', image: '/assets/products/a-frames.jpg' },
  { name: 'Banners', image: '/assets/products/banners.jpg' }
];

const grid = document.getElementById('product-grid');

products.forEach(product => {
  const card = document.createElement('div');
  card.classList.add('product-card');
  card.innerHTML = `
    <img src="${product.image}" alt="${product.name}">
    <div class="card-body">
      <h3>${product.name}</h3>
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

  // AJAX Form Submission
  const form = document.getElementById('quote-form');
  const successMsg = document.getElementById('success-message');
  const closeSuccessBtn = document.getElementById('close-success-btn');

  if (form) {
    form.addEventListener('submit', function (e) {
      e.preventDefault();

      const submitBtn = form.querySelector('.btn-submit');
      const originalText = submitBtn.innerText;
      submitBtn.innerText = 'Sending...';
      submitBtn.disabled = true;

      fetch(form.action, {
        method: 'POST',
        body: new FormData(form),
        headers: {
          'Accept': 'application/json'
        }
      })
        .then(response => {
          if (response.ok) {
            form.style.display = 'none';
            successMsg.style.display = 'block';
            form.reset(); // Clear form
          } else {
            alert('Oops! There was a problem submitting your form');
          }
        })
        .catch(error => {
          alert('Oops! There was a problem submitting your form');
        })
        .finally(() => {
          submitBtn.innerText = originalText;
          submitBtn.disabled = false;
        });
    });
  }

  if (closeSuccessBtn) {
    closeSuccessBtn.addEventListener('click', () => {
      modal.classList.remove('active');
      document.body.style.overflow = '';
      // Reset view for next time
      setTimeout(() => {
        successMsg.style.display = 'none';
        form.style.display = 'block';
      }, 500);
    });
  }

  // Close on outside click
  modal.addEventListener('click', (e) => {
    if (e.target === modal) {
      modal.classList.remove('active');
      document.body.style.overflow = '';
    }
  });
}
