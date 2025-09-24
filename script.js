// Animate chef hat on hover
const hat = document.querySelector('.chef-hat');
hat.addEventListener('mouseover', () => {
  hat.classList.add('bounce');
});
hat.addEventListener('animationend', () => {
  hat.classList.remove('bounce');
});

// Accordion functionality for menu
const headers = document.querySelectorAll('.accordion-header');
headers.forEach(header => {
  header.addEventListener('click', () => {
    const body = header.nextElementSibling;
    body.classList.toggle('open');
    header.querySelector('.icon').textContent = body.classList.contains('open') ? '-' : '+';
  });
});

// Reveal animation on scroll
function reveal() {
  const reveals = document.querySelectorAll('.reveal');
  for (let i = 0; i < reveals.length; i++) {
    const windowHeight = window.innerHeight;
    const revealTop = reveals[i].getBoundingClientRect().top;
    const revealPoint = 150;

    if (revealTop < windowHeight - revealPoint) {
      reveals[i].classList.add('active');
    } else {
      reveals[i].classList.remove('active');
    }
  }
}

window.addEventListener('scroll', reveal);
