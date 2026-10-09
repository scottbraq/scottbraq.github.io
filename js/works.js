/* ============================================================
   Works page interactions
   ------------------------------------------------------------
   - Wheel / trackpad scrolls the image strip horizontally
   - Smooth, eased motion for a more premium feel
   ============================================================ */

(function () {
  const strip = document.getElementById('worksStrip');

  /* ---------- Wheel / trackpad → horizontal scroll ---------- */
  let target = 0;
  let current = 0;
  let rafId = null;

  function animate() {
    current += (target - current) * 0.12;

    if (Math.abs(target - current) < 0.5) {
      current = target;
      strip.scrollLeft = current;
      rafId = null;
      return;
    }

    strip.scrollLeft = current;
    rafId = requestAnimationFrame(animate);
  }

  strip.addEventListener('wheel', function (e) {
    e.preventDefault();

    const maxScroll = strip.scrollWidth - strip.clientWidth;

    target = Math.max(0, Math.min(maxScroll, target + e.deltaY));

    if (rafId === null) {
      current = strip.scrollLeft;
      rafId = requestAnimationFrame(animate);
    }
  }, { passive: false });
})();
