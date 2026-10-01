/* ============================================================
   Works page interactions
   ------------------------------------------------------------
   - Wheel / trackpad scrolls the image strip horizontally
   - "Index" word toggles between side-scroll and grid view
   - Clicking a grid image jumps to it in the scroll view
   - Escape closes the grid view
   ============================================================ */

(function () {
  const strip = document.getElementById('worksStrip');
  const toggle = document.getElementById('indexToggle');
  const body = document.body;

  /* ---------- Wheel / trackpad → horizontal scroll ---------- */
  strip.addEventListener('wheel', function (e) {
    if (body.classList.contains('index-open')) return;
    e.preventDefault();
    strip.scrollLeft += e.deltaY;
  }, { passive: false });

  /* ---------- Index toggle ---------- */
  toggle.addEventListener('click', function () {
    body.classList.toggle('index-open');

    const isOpen = body.classList.contains('index-open');
    toggle.textContent = isOpen ? 'Close' : 'Index';

    if (!isOpen) strip.scrollLeft = 0;
  });

  /* ---------- Click a grid image → jump to it in scroll view ---------- */
  const works = strip.querySelectorAll('.work');

  works.forEach(function (work) {
    work.addEventListener('click', function () {
      // Only act when the grid is open
      if (!body.classList.contains('index-open')) return;

      const index = parseInt(work.dataset.index, 10);
      const target = works[index];

      // Close the grid
      body.classList.remove('index-open');
      toggle.textContent = 'Index';

      // Wait a frame so the grid layout releases, then scroll to the image
      requestAnimationFrame(function () {
        // Re-enable horizontal scrolling on the strip first
        strip.scrollLeft = target.offsetLeft - 40;
      });
    });
  });

  /* ---------- Escape closes the grid ---------- */
  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape' && body.classList.contains('index-open')) {
      body.classList.remove('index-open');
      toggle.textContent = 'Index';
      strip.scrollLeft = 0;
    }
  });
})();