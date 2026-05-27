export function initScrollAnimations() {
  const gsap = window.gsap;
  const ScrollTrigger = window.ScrollTrigger;
  const Lenis = window.Lenis;

  if (!gsap || !ScrollTrigger || !Lenis) {
    console.warn('[scroll] GSAP / ScrollTrigger / Lenis not yet loaded');
    return () => {};
  }

  gsap.registerPlugin(ScrollTrigger);

  // ── Lenis smooth scroll ───────────────────────────────────────────
  const lenis = new Lenis({ lerp: 0.1 });
  lenis.on('scroll', ScrollTrigger.update);
  gsap.ticker.add((time) => lenis.raf(time * 1000));
  gsap.ticker.lagSmoothing(0);

  // ── Scroll progress bar ───────────────────────────────────────────
  // Reuse existing bar if StrictMode re-runs before cleanup fires
  let bar = document.getElementById('gsap-progress-bar');
  if (!bar) {
    bar = document.createElement('div');
    bar.id = 'gsap-progress-bar';
    bar.style.cssText = [
      'position:fixed', 'top:0', 'left:0', 'height:2px', 'width:0%',
      'background:linear-gradient(90deg,#7c3aed,#a78bfa,#c4b5fd)',
      'z-index:9999', 'pointer-events:none', 'will-change:width',
    ].join(';');
    document.body.appendChild(bar);
  }

  // ── gsap.context() tracks every tween + trigger for clean revert ──
  const ctx = gsap.context(() => {

    ScrollTrigger.create({
      start: 'top top',
      end: 'bottom bottom',
      onUpdate: (self) => { bar.style.width = (self.progress * 100) + '%'; },
    });

    // Helper — always re-splits so StrictMode second run starts fresh
    function splitWords(el) {
      const raw = el.textContent.trim();
      el.innerHTML = raw
        .split(/\s+/)
        .map((w) => `<span class="gsap-word">${w}</span>`)
        .join(' ');
      return el.querySelectorAll('.gsap-word');
    }

    // ── Hero heading word burst ─────────────────────────────────────
    const heroHeading = document.getElementById('hero-heading');
    if (heroHeading) {
      const words = splitWords(heroHeading);
      gsap.from(words, {
        y: 70, opacity: 0, stagger: 0.07,
        duration: 1.1, ease: 'power3.out', delay: 0.2,
      });
    }

    // Hero subtext + CTA
    const heroSub = document.getElementById('hero-subtext');
    const heroCta = document.getElementById('hero-cta');
    if (heroSub || heroCta) {
      gsap.from([heroSub, heroCta].filter(Boolean), {
        y: 28, opacity: 0, stagger: 0.18,
        duration: 0.9, ease: 'power3.out', delay: 0.9,
      });
    }

    // Hero image parallax
    const heroImgWrap = document.getElementById('hero-image-wrap');
    if (heroImgWrap) {
      gsap.to(heroImgWrap, {
        yPercent: 12, ease: 'none',
        scrollTrigger: {
          trigger: '#hero-section',
          start: 'top top', end: 'bottom top', scrub: true,
        },
      });
    }

    // ── Scroll-reveal: word-by-word (no guard — always re-split) ────
    document.querySelectorAll('.scroll-reveal').forEach((el) => {
      const words = splitWords(el);
      gsap.from(words, {
        opacity: 0, y: 28, stagger: 0.038,
        scrollTrigger: {
          trigger: el,
          start: 'top 87%', end: 'top 45%',
          scrub: 0.9,
        },
      });
    });

    // ── Staggered card / item grids ─────────────────────────────────
    document.querySelectorAll('.stagger-in').forEach((container) => {
      gsap.from(Array.from(container.children), {
        y: 55, opacity: 0, stagger: 0.13,
        duration: 0.85, ease: 'power3.out',
        scrollTrigger: {
          trigger: container,
          start: 'top 80%', once: true,
        },
      });
    });

    // ── Generic fade-up ─────────────────────────────────────────────
    document.querySelectorAll('.fade-up').forEach((el) => {
      gsap.from(el, {
        y: 40, opacity: 0,
        duration: 0.85, ease: 'power3.out',
        scrollTrigger: {
          trigger: el,
          start: 'top 83%', once: true,
        },
      });
    });

    // ── Horizontal features scroll (desktop only) ───────────────────
    if (window.innerWidth > 768) {
      const hSection = document.querySelector('.h-scroll-section');
      const strip = document.querySelector('.features-strip');

      if (hSection && strip) {
        const hTween = gsap.to(strip, {
          x: () => -(strip.scrollWidth - window.innerWidth + 48),
          ease: 'none',
          scrollTrigger: {
            trigger: hSection,
            pin: true,
            scrub: 1,
            end: () => '+=' + (strip.scrollWidth - window.innerWidth),
            invalidateOnRefresh: true,
          },
        });

        strip.querySelectorAll('.feature-card').forEach((card) => {
          gsap.from(card, {
            scale: 0.9, opacity: 0,
            scrollTrigger: {
              trigger: card,
              containerAnimation: hTween,
              start: 'left 92%', end: 'left 55%',
              scrub: true,
            },
          });
        });
      }
    }

  }); // end gsap.context

  // ── Cleanup: ctx.revert() restores all element inline styles ─────
  return () => {
    lenis.destroy();
    ctx.revert(); // kills all tweens + ScrollTriggers, reverts CSS props
    document.getElementById('gsap-progress-bar')?.remove();
  };
}
