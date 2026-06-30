document.querySelectorAll('.carousel').forEach(function (carousel) {
  var track  = carousel.querySelector('.carousel-track');
  var slides = Array.prototype.slice.call(track.children); // images d'origine
  var total  = slides.length;
  if (total < 2) return; // rien à faire avec une seule image

  // on clone la 1ère image et on la colle à la fin :
  // ça permet de boucler vers la gauche sans à-coup visible
  var clone = slides[0].cloneNode(true);
  track.appendChild(clone);

  var index = 0;
  var timer = null;

  // ── points de navigation (optionnels) ──
  var dotsWrap = carousel.querySelector('.carousel-dots');
  var dots = [];
  if (dotsWrap) {
    slides.forEach(function (_, i) {
      var dot = document.createElement('button');
      dot.className = 'carousel-dot' + (i === 0 ? ' active' : '');
      dot.setAttribute('aria-label', 'Image ' + (i + 1));
      dot.addEventListener('click', function () { goTo(i); });
      dotsWrap.appendChild(dot);
      dots.push(dot);
    });
  }

  function updateDots() {
    if (!dots.length) return;
    dots.forEach(function (d, i) {
      d.classList.toggle('active', i === index % total);
    });
  }

  function render() {
    track.classList.add('animate');
    track.style.transform = 'translateX(-' + (index * 100) + '%)';
  }

  function goTo(n) {
    index = n;
    render();
    updateDots();
    resetTimer();
  }

  function next() {
    index++;
    render();
    updateDots();

    // on vient de glisser sur le clone (= dernière position) :
    // une fois la transition finie, on revient au tout début
    // instantanément, sans transition (donc invisible à l'œil)
    if (index === total) {
      track.addEventListener('transitionend', function handler() {
        track.removeEventListener('transitionend', handler);
        track.classList.remove('animate');
        index = 0;
        track.style.transform = 'translateX(0%)';
      });
    }
  }

  function resetTimer() {
    clearInterval(timer);
    timer = setInterval(next, 4000);
  }

  updateDots();
  resetTimer();
});
