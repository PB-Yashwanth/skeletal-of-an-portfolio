document.addEventListener('DOMContentLoaded', () => {
  // Preloader
  const preloader = document.getElementById('preloader');
  if (preloader) {
    preloader.classList.add('hide');
    preloader.addEventListener('transitionend', () => preloader.remove());
  }

  // Typing effect on Research Interests
  const interestEl = document.getElementById('interest-typing');
  const interests = ["Distributed Computing", "Cloud Computing", "Cloud–Fog Security"];
  let idx = 0, pos = 0, deleting = false, delay = 100;

  function typeInterest() {
    if (!interestEl) return;

    const current = interests[idx];

    if (deleting) {
      pos--;
      interestEl.textContent = current.slice(0, pos);
    } else {
      pos++;
      interestEl.textContent = current.slice(0, pos);
    }

    // Update CSS variable --chars for dynamic width
    interestEl.style.setProperty('--chars', current.length);

    if (!deleting && pos === current.length) {
      deleting = true;
      delay = 1500; // Wait before deleting
    } else if (deleting && pos === 0) {
      deleting = false;
      idx = (idx + 1) % interests.length;
      delay = 500; // Wait before typing next
    } else {
      delay = deleting ? 50 : 100;
    }

    setTimeout(typeInterest, delay);
  }
  if (interestEl) typeInterest();

  // Collapsibles
  document.querySelectorAll('.collapsible').forEach(btn => {
    btn.addEventListener('click', () => {
      btn.classList.toggle('active');
      const content = btn.nextElementSibling;
      if (content) {
        content.classList.toggle('show');
        if (content.classList.contains('show')) {
          content.style.maxHeight = content.scrollHeight + "px";
        } else {
          content.style.maxHeight = null;
        }
      }
    });
  });

  // Fade-in sections on scroll
  const reveal = () => {
    document.querySelectorAll('.section').forEach(sec => {
      if (sec.getBoundingClientRect().top < window.innerHeight - 100) {
        sec.classList.add('visible');
      }
    });
  };
  window.addEventListener('scroll', reveal);
  reveal();

  // Load particles.js if available
  if (window.particlesJS) {
    particlesJS.load('particles-js', 'particles.json', () => {
      console.log('particles.js loaded');
    });
  }
});
