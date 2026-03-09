document.addEventListener('DOMContentLoaded', () => {

  /* --------------------------
     LIGHTBOX / ZOOM (genérico)
  ---------------------------*/
  const modal = document.getElementById('imageModal');
  const modalImg = document.getElementById('modalImage');
  const closeBtn = modal ? modal.querySelector('.close') : null;

  // Abre modal ao clicar em QUALQUER elemento com a classe .zoom-img
  document.querySelectorAll('.zoom-img').forEach(el => {
    el.addEventListener('click', (e) => {
      if (!modal || !modalImg) return;
      // obter src da imagem (suporta <img src="...">)
      const src = el.src || el.getAttribute('src') || el.dataset.src;
      if (!src) return;
      modalImg.src = src;
      modal.style.display = 'flex';
      modal.setAttribute('aria-hidden', 'false');
      // impedir scroll do body enquanto modal aberto
      document.body.style.overflow = 'hidden';
    });
  });

  function closeModal() {
    if (!modal) return;
    modal.style.display = 'none';
    modal.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';
    // opcional: limpar src para libertar memória
    if (modalImg) modalImg.src = '';
  }

  if (closeBtn) {
    closeBtn.addEventListener('click', closeModal);
  }

  if (modal) {
    modal.addEventListener('click', (ev) => {
      if (ev.target === modal) closeModal();
    });
  }

  document.addEventListener('keydown', (ev) => {
    if (ev.key === 'Escape') closeModal();
  });


  /* --------------------------
     INTERSECTION OBSERVER (scroll animations)
  ---------------------------*/
  const hiddenEls = document.querySelectorAll('.hidden');
  if (hiddenEls.length > 0) {
    const obs = new IntersectionObserver((entries, observer) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('show');
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.15 });

    hiddenEls.forEach(el => obs.observe(el));
  }


  /* --------------------------
     DARK MODE (persistente)
  ---------------------------*/
  const darkToggle = document.getElementById('dark-mode-toggle');
  if (darkToggle) {
    const saved = localStorage.getItem('greenspot-darkmode');
    if (saved === 'on') {
      document.body.classList.add('dark-mode');
      darkToggle.textContent = '☀️';
    } else {
      darkToggle.textContent = '🌙';
    }

    darkToggle.addEventListener('click', () => {
      document.body.classList.toggle('dark-mode');
      const isDark = document.body.classList.contains('dark-mode');
      darkToggle.textContent = isDark ? '☀️' : '🌙';
      localStorage.setItem('greenspot-darkmode', isDark ? 'on' : 'off');
    });
  }


  /* --------------------------
     FORMULÁRIO (validação e feedback)
  ---------------------------*/
  const form = document.getElementById('contact-form');
  const feedback = document.getElementById('form-feedback');

  if (form) {
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      const nome = (document.getElementById('nome') || {}).value?.trim() || '';
      const email = (document.getElementById('email') || {}).value?.trim() || '';
      const mensagem = (document.getElementById('mensagem') || {}).value?.trim() || '';

      if (!nome || !email || !mensagem) {
        if (feedback) {
          feedback.textContent = 'Por favor preenche todos os campos!';
          feedback.style.color = 'red';
          feedback.style.display = 'block';
        }
        return;
      }

      // Placeholder: substitui por fetch() para enviar a um serviço real
      if (feedback) {
        feedback.textContent = 'Mensagem enviada com sucesso.✅';
        feedback.style.color = 'green';
        feedback.style.display = 'block';
      }
      form.reset();
    });
  }

}); // DOMContentLoaded end