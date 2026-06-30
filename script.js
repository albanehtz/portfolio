document.addEventListener('DOMContentLoaded', function () {
  var wrap = document.querySelector('.nav-projets-wrap');
  var nav  = document.querySelector('.site-nav');
  var stage = document.querySelector('.hero-stage'); // only on home

  if (!wrap) return;

  var btn = wrap.querySelector('.nav-projets-btn');

  function openDropdown() {
    wrap.classList.add('open');
    if (nav)   nav.classList.add('dropdown-open');
    if (stage) stage.classList.add('dropdown-open');
  }

  function closeDropdown() {
    wrap.classList.remove('open');
    if (nav)   nav.classList.remove('dropdown-open');
    if (stage) stage.classList.remove('dropdown-open');
  }

  btn.addEventListener('click', function (e) {
    e.stopPropagation();
    wrap.classList.contains('open') ? closeDropdown() : openDropdown();
  });

  document.addEventListener('click', function (e) {
    if (!wrap.contains(e.target)) closeDropdown();
  });

  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape') closeDropdown();
  });
});

/* ══════════════════════════════════════
   VIDEO CARD — aperçu cliquable (YouTube / Vimeo)
══════════════════════════════════════ */
document.querySelectorAll('.video-card').forEach(function (card) {
  card.addEventListener('click', function () {
    var platform = card.dataset.platform; // "youtube" ou "vimeo"
    var id = card.dataset.id;             // l'identifiant de la vidéo
    var src = '';

    if (platform === 'youtube') {
      src = 'https://www.youtube.com/embed/' + id + '?autoplay=1&rel=0';
    } else if (platform === 'vimeo') {
      src = 'https://player.vimeo.com/video/' + id + '?autoplay=1';
    } else {
      return; // plateforme inconnue, on ne fait rien
    }

    var iframe = document.createElement('iframe');
    iframe.src = src;
    iframe.setAttribute('allow', 'autoplay; fullscreen; picture-in-picture');
    iframe.setAttribute('allowfullscreen', '');

    // on vide la carte (vignette, avatar, bouton play) et on met la vidéo à la place
    card.innerHTML = '';
    card.style.backgroundImage = 'none';
    card.style.cursor = 'default';
    card.appendChild(iframe);
  });
});
