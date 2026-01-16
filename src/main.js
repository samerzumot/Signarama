import { products } from './data.js';

const grid = document.getElementById('product-grid');

/*
if (grid) {
  products.forEach(product => {
    const card = document.createElement('div');
    card.classList.add('product-card');
    card.innerHTML = `
      <a href="./product.html?item=${product.slug}" style="text-decoration: none; color: inherit; display: block;">
        <img src="${product.image}" alt="${product.title}">
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


// Modal Logic
// Modal Logic
const modal = document.getElementById('quote-modal');
// Select both the hero button and the header button (or any other trigger)
const openBtns = document.querySelectorAll('#open-quote-modal, .btn-quote-trigger-header');
const closeBtn = document.getElementById('close-modal');

if (modal && closeBtn) {
  openBtns.forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();

      // If triggered from AI tool results, pre-fill context
      const bizName = document.getElementById('biz-name')?.value;
      const bizIndustry = document.getElementById('biz-industry')?.value;
      const bizStyle = document.getElementById('biz-style')?.value;

      const form = document.getElementById('quote-form');
      if (form && bizName) {
        const messageArea = form.querySelector('textarea[name="message"]');
        if (messageArea) {
          messageArea.value = `AI Tool Context:\nBusiness: ${bizName}\nIndustry: ${bizIndustry}\nStyle: ${bizStyle}\n\nI would like a formal quote for this AI generated concept.`;
        }
      }

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
