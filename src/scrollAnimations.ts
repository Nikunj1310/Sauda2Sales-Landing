type GsapLike = {
  registerPlugin: (plugin: unknown) => void
  ticker: {
    add: (fn: (time: number) => void) => void
    lagSmoothing: (value: number) => void
  }
  context: (cb: () => void) => { revert: () => void }
  from: (targets: unknown, vars: Record<string, unknown>) => unknown
  fromTo: (target: unknown, fromVars: Record<string, unknown>, toVars: Record<string, unknown>) => unknown
  to: (target: unknown, vars: Record<string, unknown>) => unknown
}

type ScrollTriggerLike = {
  create: (config: Record<string, unknown>) => void
  update: () => void
}

type LenisLike = new (options: { lerp: number }) => {
  on: (event: string, cb: () => void) => void
  raf: (time: number) => void
  destroy: () => void
}

function splitWords(el: Element): HTMLElement[] {
  const raw = el.textContent?.trim() ?? ''
  el.innerHTML = raw
    .split(/\s+/)
    .filter(Boolean)
    .map((word) => `<span class="gsap-word">${word}</span>`)
    .join(' ')

  return Array.from(el.querySelectorAll<HTMLElement>('.gsap-word'))
}

export function initScrollAnimations(): () => void {
  const gsap = window.gsap as GsapLike | undefined
  const ScrollTrigger = window.ScrollTrigger as ScrollTriggerLike | undefined
  const Lenis = window.Lenis as LenisLike | undefined

  if (!gsap || !ScrollTrigger || !Lenis) {
    console.warn('[scroll] GSAP / ScrollTrigger / Lenis not yet loaded')
    return () => {}
  }

  gsap.registerPlugin(ScrollTrigger)

  const lenis = new Lenis({ lerp: 0.1 })
  lenis.on('scroll', ScrollTrigger.update)
  gsap.ticker.add((time) => lenis.raf(time * 1000))
  gsap.ticker.lagSmoothing(0)

  let bar = document.getElementById('gsap-progress-bar')
  if (!bar) {
    bar = document.createElement('div')
    bar.id = 'gsap-progress-bar'
    bar.style.cssText = [
      'position:fixed',
      'top:0',
      'left:0',
      'height:2px',
      'width:0%',
      'background:linear-gradient(90deg,#4f46e5,#0ea5e9,#22c55e)',
      'z-index:9999',
      'pointer-events:none',
      'will-change:width',
    ].join(';')
    document.body.appendChild(bar)
  }

  const ctx = gsap.context(() => {
    ScrollTrigger.create({
      start: 'top top',
      end: 'bottom bottom',
      onUpdate: (self: { progress: number }) => {
        if (bar) {
          bar.style.width = `${self.progress * 100}%`
        }
      },
    })

    const heroHeading = document.getElementById('hero-heading')
    if (heroHeading) {
      const words = splitWords(heroHeading)
      gsap.from(words, {
        y: 70,
        opacity: 0,
        stagger: 0.07,
        duration: 1.1,
        ease: 'power3.out',
        delay: 0.2,
      })
    }

    const heroSub = document.getElementById('hero-subtext')
    const heroCta = document.getElementById('hero-cta')
    if (heroSub || heroCta) {
      gsap.from([heroSub, heroCta].filter(Boolean), {
        y: 28,
        opacity: 0,
        stagger: 0.18,
        duration: 0.9,
        ease: 'power3.out',
        delay: 0.9,
      })
    }

    const heroImgWrap = document.getElementById('hero-image-wrap')
    if (heroImgWrap) {
      gsap.to(heroImgWrap, {
        yPercent: 12,
        ease: 'none',
        scrollTrigger: {
          trigger: '#hero-section',
          start: 'top top',
          end: 'bottom top',
          scrub: true,
        },
      })
    }

    document.querySelectorAll('.scroll-reveal').forEach((el) => {
      const words = splitWords(el)
      gsap.from(words, {
        opacity: 0,
        y: 28,
        stagger: 0.038,
        scrollTrigger: {
          trigger: el,
          start: 'top 87%',
          end: 'top 45%',
          scrub: 0.9,
        },
      })
    })

    document.querySelectorAll('.stagger-in').forEach((container) => {
      gsap.from(Array.from(container.children), {
        y: 55,
        opacity: 0,
        stagger: 0.13,
        duration: 0.85,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: container,
          start: 'top 80%',
          once: true,
        },
      })
    })

    document.querySelectorAll('.fade-up').forEach((el) => {
      gsap.from(el, {
        y: 40,
        opacity: 0,
        duration: 0.85,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: el,
          start: 'top 83%',
          once: true,
        },
      })
    })

    document.querySelectorAll('.parallax-card').forEach((card) => {
      gsap.fromTo(
        card,
        { y: 80, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: card,
            start: 'top 85%',
            end: 'top 55%',
            scrub: 0.8,
          },
        },
      )
    })

    if (window.innerWidth > 768) {
      const hSection = document.querySelector<HTMLElement>('.h-scroll-section')
      const strip = document.querySelector<HTMLElement>('.features-strip')

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
        })

        strip.querySelectorAll('.feature-card').forEach((card) => {
          gsap.from(card, {
            scale: 0.9,
            opacity: 0,
            scrollTrigger: {
              trigger: card,
              containerAnimation: hTween,
              start: 'left 92%',
              end: 'left 55%',
              scrub: true,
            },
          })
        })
      }
    }
  })

  return () => {
    lenis.destroy()
    ctx.revert()
    document.getElementById('gsap-progress-bar')?.remove()
  }
}
