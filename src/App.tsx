import { useEffect } from 'react';

export default function App() {
  useEffect(() => {
    const controller = new AbortController();
    const { signal } = controller;

    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const clamp = (value: number, min: number, max: number) => Math.min(Math.max(value, min), max);

    const scrollMeter = document.querySelector(".scroll-meter") as HTMLElement | null;
    const updateScrollMeter = () => {
      if (!scrollMeter) return;
      const maxScroll = document.documentElement.scrollHeight - window.innerHeight;
      const progress = maxScroll <= 0 ? 0 : window.scrollY / maxScroll;
      scrollMeter.style.transform = `scaleX(${clamp(progress, 0, 1)})`;
    };

    window.addEventListener("scroll", updateScrollMeter, { passive: true, signal });
    window.addEventListener("resize", updateScrollMeter, { signal });
    updateScrollMeter();

    const revealItems = document.querySelectorAll("[data-reveal]");
    let revealObserver: IntersectionObserver | undefined;
    let storyObserver: IntersectionObserver | undefined;

    if ("IntersectionObserver" in window) {
      revealObserver = new IntersectionObserver(
        (entries, observer) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              entry.target.classList.add("is-visible");
              observer.unobserve(entry.target);
            }
          });
        },
        { rootMargin: "0px 0px -12% 0px", threshold: 0.12 }
      );

      revealItems.forEach((item) => revealObserver?.observe(item));
    } else {
      revealItems.forEach((item) => item.classList.add("is-visible"));
    }

    const previewContent: Record<string, { title: string; label: string; text: string }> = {
      draft: {
        title: "Private draft",
        label: "Seller-only product data",
        text: "Purchase price and broker notes stay private until you decide what buyers should see.",
      },
      publish: {
        title: "Buyer-safe publish",
        label: "Edited at push time",
        text: "Name, description, photos, selling price, and launch status are selected for the buyer app.",
      },
      notify: {
        title: "Instant buyer reach",
        label: "Approved buyers only",
        text: "The branded app updates immediately and sends launch alerts to people you have approved.",
      },
      order: {
        title: "Structured order",
        label: "WhatsApp plus history",
        text: "Buyers send clean order messages, and the seller app keeps a follow-up record.",
      },
    };

    const storySteps = Array.from(document.querySelectorAll(".story-step")) as HTMLElement[];
    const previewFrame = document.querySelector(".preview-frame") as HTMLElement | null;
    const previewTitle = document.getElementById("previewTitle");
    const previewLabel = document.getElementById("previewLabel");
    const previewText = document.getElementById("previewText");

    const setStoryStage = (stage: string) => {
      const content = previewContent[stage];
      if (!content || !previewFrame) return;

      storySteps.forEach((step) => step.classList.toggle("active", step.dataset.stage === stage));
      previewFrame.dataset.previewStage = stage;
      if (previewTitle) previewTitle.textContent = content.title;
      if (previewLabel) previewLabel.textContent = content.label;
      if (previewText) previewText.textContent = content.text;
    };

    storySteps.forEach((step) => {
      step.addEventListener("mouseenter", () => setStoryStage(step.dataset.stage!), { signal });
      step.addEventListener("click", () => setStoryStage(step.dataset.stage!), { signal });
    });

    if ("IntersectionObserver" in window) {
      storyObserver = new IntersectionObserver(
        (entries) => {
          const visible = entries
            .filter((entry) => entry.isIntersecting)
            .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
          if (visible) setStoryStage((visible.target as HTMLElement).dataset.stage!);
        },
        { rootMargin: "-34% 0px -42% 0px", threshold: [0.25, 0.5, 0.75] }
      );

      storySteps.forEach((step) => storyObserver?.observe(step));
    }

    const featureContent: Record<string, { eyebrow: string; title: string; text: string; badge: string }> = {
      catalog: {
        eyebrow: "Live catalog",
        title: "Current products, no stale forwarding.",
        text: "Your team publishes selected fabrics into a buyer-safe catalog. Pull a product when it is gone and it disappears from the branded app.",
        badge: "118 buyers notified",
      },
      branded: {
        eyebrow: "White-label buyer app",
        title: "Your business stays at the center.",
        text: "Buyers open an app with your name, colors, logo, store code gate, and approved catalog. Sauda2Sales stays behind the scenes.",
        badge: "Private buyer access",
      },
      notify: {
        eyebrow: "Push notifications",
        title: "New launches reach phones instantly.",
        text: "Approved buyers get alerts when a fabric goes live, so new products stop disappearing inside crowded WhatsApp groups.",
        badge: "Launch alert sent",
      },
      visual: {
        eyebrow: "AI visual search",
        title: "A buyer photo becomes a catalog search.",
        text: "Dealers can upload a fabric reference photo and find the closest live matches, reducing back-and-forth for repeat patterns.",
        badge: "92% closest match",
      },
      orders: {
        eyebrow: "Order management",
        title: "Requests stop living only in chat.",
        text: "Buyer requests are saved as order history and still open WhatsApp for the relationship-first follow-up wholesalers already use.",
        badge: "24 pending today",
      },
      access: {
        eyebrow: "Controlled access",
        title: "Only approved buyers see prices.",
        text: "Approve, remove, and segment buyers without sending public links or exposing catalog details to the wrong people.",
        badge: "Approval required",
      },
    };

    const featureCards = Array.from(document.querySelectorAll(".feature-card")) as HTMLElement[];
    const featureEyebrow = document.getElementById("featureEyebrow");
    const featureTitle = document.getElementById("featureTitle");
    const featureText = document.getElementById("featureText");
    const featureBadge = document.getElementById("featureBadge");

    const setFeature = (feature: string) => {
      const content = featureContent[feature];
      if (!content) return;

      featureCards.forEach((card) => card.classList.toggle("active", card.dataset.feature === feature));
      if (featureEyebrow) featureEyebrow.textContent = content.eyebrow;
      if (featureTitle) featureTitle.textContent = content.title;
      if (featureText) featureText.textContent = content.text;
      if (featureBadge) featureBadge.textContent = content.badge;
    };

    featureCards.forEach((card) => {
      card.tabIndex = 0;
      card.setAttribute("role", "button");
      const h3 = card.querySelector("h3");
      card.setAttribute("aria-label", `Show ${h3 ? h3.textContent : ""} details`);
      card.addEventListener("mouseenter", () => setFeature(card.dataset.feature!), { signal });
      card.addEventListener("focus", () => setFeature(card.dataset.feature!), { signal });
      card.addEventListener("click", () => setFeature(card.dataset.feature!), { signal });
      card.addEventListener("keydown", (event) => {
        if (event.key === "Enter" || event.key === " ") {
          event.preventDefault();
          setFeature(card.dataset.feature!);
        }
      }, { signal });
    });

    const tradeContent: Record<string, { kicker: string; text: string }> = {
      surat: {
        kicker: "Surat ready",
        text: "Designed around fast-moving fabric catalogs, buyer approvals, WhatsApp conversations, and no numerical stock counts.",
      },
      buyers: {
        kicker: "Relationship scale",
        text: "Works for compact dealer circles and larger buyer networks where every launch needs consistent reach and controlled access.",
      },
      manual: {
        kicker: "Less forwarding",
        text: "Replace repetitive photo blasting with one publish action while keeping WhatsApp for the final business conversation.",
      },
      team: {
        kicker: "Manager friendly",
        text: "Managers can help upload, publish, and handle orders without exposing purchase prices or private seller notes.",
      },
    };

    const tradeItems = Array.from(document.querySelectorAll(".trade-item")) as HTMLElement[];
    const tradeKicker = document.getElementById("tradeKicker");
    const tradeText = document.getElementById("tradeText");

    tradeItems.forEach((item) => {
      item.addEventListener("click", () => {
        const content = tradeContent[item.dataset.trade!];
        if (!content) return;

        tradeItems.forEach((button) => button.classList.toggle("active", button === item));
        if (tradeKicker) tradeKicker.textContent = content.kicker;
        if (tradeText) tradeText.textContent = content.text;
      }, { signal });
    });

    if (!prefersReducedMotion) {
      document.querySelectorAll(".tilt-card").forEach((node) => {
        const card = node as HTMLElement;
        card.addEventListener("pointermove", (event) => {
          const rect = card.getBoundingClientRect();
          const x = (event.clientX - rect.left) / rect.width - 0.5;
          const y = (event.clientY - rect.top) / rect.height - 0.5;
          card.style.setProperty("--tilt-x", `${x * 8}deg`);
          card.style.setProperty("--tilt-y", `${y * -8}deg`);
        }, { signal });

        card.addEventListener("pointerleave", () => {
          card.style.setProperty("--tilt-x", "0deg");
          card.style.setProperty("--tilt-y", "0deg");
        }, { signal });
      });
    }

    const searchBoard = document.getElementById("searchBoard");
    const lens = document.getElementById("lens");
    const matchScore = document.getElementById("matchScore");
    const matchCopy = document.getElementById("matchCopy");
    const searchMatches = [
      {
        score: "92%",
        copy: "Floral digital print, teal base, running in your live catalog.",
      },
      {
        score: "87%",
        copy: "Mustard woven stripe with green border, available in New Launches.",
      },
      {
        score: "84%",
        copy: "Indigo abstract print with similar motif density and color balance.",
      },
      {
        score: "79%",
        copy: "Rani red repeat pattern, close color family but different scale.",
      },
    ];

    const updateSearchPreview = (clientX: number, clientY: number) => {
      if (!searchBoard || !lens || !matchScore || !matchCopy) return;
      const rect = searchBoard.getBoundingClientRect();
      const x = clamp(clientX - rect.left, 78, rect.width - 78);
      const y = clamp(clientY - rect.top, 78, rect.height - 78);
      const horizontalZone = x < rect.width / 2 ? 0 : 1;
      const verticalZone = y < rect.height / 2 ? 0 : 2;
      const match = searchMatches[horizontalZone + verticalZone];

      lens.style.transform = `translate3d(${x - 77}px, ${y - 77}px, 0)`;
      matchScore.textContent = match.score;
      matchCopy.textContent = match.copy;
    };

    if (searchBoard) {
      searchBoard.addEventListener("pointermove", (event) => updateSearchPreview(event.clientX, event.clientY), { signal });
      searchBoard.addEventListener("pointerleave", () => {
        const rect = searchBoard.getBoundingClientRect();
        updateSearchPreview(rect.left + rect.width * 0.42, rect.top + rect.height * 0.42);
      }, { signal });
    }

    const onSearchResize = () => {
      if (!searchBoard) return;
      const rect = searchBoard.getBoundingClientRect();
      updateSearchPreview(rect.left + rect.width * 0.42, rect.top + rect.height * 0.42);
    };
    window.addEventListener("resize", onSearchResize, { signal });

    let animationId: number | undefined;

    const setupLoomCanvas = () => {
      const canvas = document.getElementById("loomCanvas") as HTMLCanvasElement | null;
      const hero = document.querySelector(".hero") as HTMLElement | null;
      if (!canvas || !hero) return;

      const context = canvas.getContext("2d");
      if (!context) return;

      const pointer = { x: 0.7, y: 0.34, active: false };
      const palette = ["#007c78", "#f0a51c", "#c33d74", "#2c397d", "#d54f31", "#26835d"];
      const threads = Array.from({ length: 56 }, (_, index) => ({
        color: palette[index % palette.length],
        offset: index * 19,
        speed: 0.26 + (index % 7) * 0.035,
        width: 1.2 + (index % 4) * 0.6,
        wave: 5 + (index % 5),
      }));
      let width = 0;
      let height = 0;
      let deviceRatio = 1;

      const resizeCanvas = () => {
        const rect = canvas.getBoundingClientRect();
        width = rect.width;
        height = rect.height;
        deviceRatio = Math.min(window.devicePixelRatio || 1, 2);
        canvas.width = Math.floor(width * deviceRatio);
        canvas.height = Math.floor(height * deviceRatio);
        context.setTransform(deviceRatio, 0, 0, deviceRatio, 0, 0);
      };

      type Thread = { color: string; offset: number; speed: number; width: number; wave: number };

      const drawThread = (start: number, horizontal: boolean, thread: Thread, time: number) => {
        context.beginPath();
        const influence = pointer.active ? 26 : 12;
        const mouseX = pointer.x * width;
        const mouseY = pointer.y * height;
        const length = horizontal ? width : height;
        const step = 36;

        for (let distance = -step; distance <= length + step; distance += step) {
          const wave = Math.sin((distance + thread.offset + time * thread.speed) * 0.018) * thread.wave;
          const pull = horizontal
            ? Math.max(0, 1 - Math.abs(start - mouseY) / 180) * Math.sin(distance / 42) * influence
            : Math.max(0, 1 - Math.abs(start - mouseX) / 180) * Math.cos(distance / 42) * influence;
          const x = horizontal ? distance : start + wave + pull;
          const y = horizontal ? start + wave + pull : distance;

          if (distance === -step) {
            context.moveTo(x, y);
          } else {
            context.lineTo(x, y);
          }
        }

        context.strokeStyle = thread.color;
        context.globalAlpha = horizontal ? 0.42 : 0.24;
        context.lineWidth = thread.width;
        context.stroke();
      };

      const drawBobbins = (time: number) => {
        const startX = width * 0.64;
        const startY = height * 0.18;
        const bobbinColors = ["#f0a51c", "#c33d74", "#007c78", "#d54f31", "#2c397d"];

        bobbinColors.forEach((color, index) => {
          const x = startX + index * 58;
          const y = startY + Math.sin(time * 0.0012 + index) * 12;
          const bobbinWidth = 34;
          const bobbinHeight = 126 + (index % 2) * 28;

          context.save();
          context.translate(x, y);
          context.rotate(-0.22 + index * 0.08);
          context.fillStyle = "rgba(255,255,255,0.16)";
          context.fillRect(-bobbinWidth / 2 - 4, -14, bobbinWidth + 8, 12);
          context.fillRect(-bobbinWidth / 2 - 4, bobbinHeight, bobbinWidth + 8, 12);
          context.fillStyle = color;
          context.globalAlpha = 0.86;
          context.fillRect(-bobbinWidth / 2, 0, bobbinWidth, bobbinHeight);
          context.fillStyle = "rgba(255,255,255,0.22)";
          context.fillRect(-bobbinWidth / 2 + 5, 0, 4, bobbinHeight);
          context.restore();
        });
      };

      const draw = (time: number) => {
        context.clearRect(0, 0, width, height);
        context.globalAlpha = 1;
        context.fillStyle = "#101714";
        context.fillRect(0, 0, width, height);

        for (let y = -20; y < height + 24; y += 24) {
          const thread = threads[Math.abs(Math.floor(y / 24)) % threads.length];
          drawThread(y, true, thread, time);
        }

        for (let x = -18; x < width + 24; x += 34) {
          const thread = threads[Math.abs(Math.floor(x / 34) + 11) % threads.length];
          drawThread(x, false, thread, time * 0.84);
        }

        context.globalAlpha = 0.16;
        context.fillStyle = "#ffffff";
        for (let y = 0; y < height; y += 76) {
          context.fillRect(0, y, width, 1);
        }

        context.globalAlpha = 1;
        drawBobbins(time);
      };

      const animate = (time: number) => {
        draw(time);
        if (!prefersReducedMotion) {
          animationId = requestAnimationFrame(animate);
        }
      };

      hero.addEventListener("pointermove", (event: PointerEvent) => {
        const rect = hero.getBoundingClientRect();
        pointer.x = clamp((event.clientX - rect.left) / rect.width, 0, 1);
        pointer.y = clamp((event.clientY - rect.top) / rect.height, 0, 1);
        pointer.active = true;
      }, { signal });

      hero.addEventListener("pointerleave", () => {
        pointer.active = false;
      }, { signal });

      window.addEventListener("resize", () => {
        resizeCanvas();
        draw(performance.now());
      }, { signal });

      resizeCanvas();
      animate(0);
    };

    setupLoomCanvas();

    if (searchBoard) {
      const boardRect = searchBoard.getBoundingClientRect();
      updateSearchPreview(boardRect.left + boardRect.width * 0.42, boardRect.top + boardRect.height * 0.42);
    }

    // Benefits Tabs
    const benefitTabButtons = document.querySelectorAll('.tabs-header .tab-button');
    const benefitTabContents = document.querySelectorAll('.tabs-container .tab-content');
    
    benefitTabButtons.forEach((btn) => {
      btn.addEventListener('click', () => {
        const targetId = btn.getAttribute('aria-controls');
        if (!targetId) return;
        
        benefitTabButtons.forEach((b) => {
          b.classList.remove('active');
          b.setAttribute('aria-selected', 'false');
        });
        benefitTabContents.forEach((c) => {
          c.classList.remove('active');
          (c as HTMLElement).hidden = true;
        });
        
        btn.classList.add('active');
        btn.setAttribute('aria-selected', 'true');
        const targetContent = document.getElementById(targetId);
        if (targetContent) {
          targetContent.classList.add('active');
          targetContent.hidden = false;
        }
      }, { signal });
    });

    // Preview Tabs
    const previewTabButtons = document.querySelectorAll('.preview-tabs .preview-tab');
    const previewTabPanels = document.querySelectorAll('.preview-tabs .preview-panel');

    previewTabButtons.forEach((btn) => {
      btn.addEventListener('click', () => {
        const targetId = btn.getAttribute('data-target');
        if (!targetId) return;

        previewTabButtons.forEach((b) => {
          b.classList.remove('active');
          b.setAttribute('aria-selected', 'false');
        });
        previewTabPanels.forEach((p) => {
          p.classList.remove('active');
          (p as HTMLElement).hidden = true;
        });

        btn.classList.add('active');
        btn.setAttribute('aria-selected', 'true');
        const targetPanel = document.getElementById(targetId);
        if (targetPanel) {
          targetPanel.classList.add('active');
          targetPanel.hidden = false;
        }
      }, { signal });
    });

    // FAQ Accordion
    const faqQuestions = document.querySelectorAll('.faq-question');
    faqQuestions.forEach((btn) => {
      btn.addEventListener('click', () => {
        const isExpanded = btn.getAttribute('aria-expanded') === 'true';
        faqQuestions.forEach((b) => b.setAttribute('aria-expanded', 'false'));
        if (!isExpanded) {
          btn.setAttribute('aria-expanded', 'true');
        }
      }, { signal });
    });

    return () => {
      controller.abort();
      if (animationId !== undefined) cancelAnimationFrame(animationId);
      if (revealObserver) revealObserver.disconnect();
      if (storyObserver) storyObserver.disconnect();
    };
  }, []);

  return (
    <>
      <div className="scroll-meter" aria-hidden="true"></div>

      <header className="site-nav">
        <a className="brand" href="#top" aria-label="Sauda2Sales home">
          <span className="brand-mark" aria-hidden="true">S2</span>
          <span>Sauda2Sales</span>
        </a>
        <nav className="nav-links" aria-label="Main navigation">
          <a href="#system">System</a>
          <a href="#features">Features</a>
          <a href="#flow">Flow</a>
          <a href="#pricing">Pricing</a>
          <a href="#faq">FAQ</a>
        </nav>
        <a className="nav-cta" href="#contact">Book Demo</a>
      </header>

      <main id="top">
        <section className="hero" aria-labelledby="hero-title">
          <canvas id="loomCanvas" className="loom-canvas" aria-hidden="true"></canvas>
          <div className="hero-shade" aria-hidden="true"></div>

          <div className="hero-grid">
            <div className="hero-copy">
              <p className="eyebrow">Private digital catalogs for fabric wholesalers</p>
              <h1 id="hero-title">Stop sending catalog photos on WhatsApp.</h1>
              <p className="hero-lede">
                Give every approved buyer a branded app, publish fabrics in seconds,
                and keep all WhatsApp orders organized inside one seller dashboard.
              </p>
              <div className="hero-actions" aria-label="Primary actions">
                <a className="button button-primary" href="#contact">Book a Free Demo</a>
                <a className="button button-secondary" href="#flow">See How It Works</a>
              </div>
              <dl className="hero-stats" aria-label="Product summary">
                <div>
                  <dt>2 apps</dt>
                  <dd>seller + buyer</dd>
                </div>
                <div>
                  <dt>0 stock counts</dt>
                  <dd>live or draft only</dd>
                </div>
                <div>
                  <dt>AI search</dt>
                  <dd>match fabric photos</dd>
                </div>
              </dl>
            </div>

            <div className="hero-product" aria-label="Product preview">
              <div className="seller-console tilt-card">
                <div className="console-top">
                  <span>Seller app</span>
                  <strong>Live catalog control</strong>
                </div>
                <div className="product-row active">
                  <span className="swatch swatch-one"></span>
                  <div>
                    <strong>Floral georgette</strong>
                    <small>Published to 118 buyers</small>
                  </div>
                  <button type="button">Pull</button>
                </div>
                <div className="product-row">
                  <span className="swatch swatch-two"></span>
                  <div>
                    <strong>Cotton print</strong>
                    <small>Draft, not visible</small>
                  </div>
                  <button type="button">Push</button>
                </div>
                <div className="console-orders">
                  <span>Orders today</span>
                  <strong>24</strong>
                </div>
              </div>
              <div className="buyer-phone tilt-card">
                <div className="phone-speaker"></div>
                <div className="phone-brand">Your buyer app</div>
                <div className="phone-fabric"></div>
                <strong>New Launches</strong>
                <p>Buyers browse only what you publish.</p>
                <span className="phone-pill">WhatsApp order ready</span>
              </div>
            </div>
          </div>

          <a className="scroll-cue" href="#problem">Scroll to explore</a>
        </section>

        <section id="problem" className="section problem-section">
          <div className="section-heading">
            <p className="eyebrow">The current mess</p>
            <h2>Still running your business on WhatsApp folders?</h2>
          </div>
          <div className="problem-grid">
            <article className="problem-card tilt-card" data-reveal="true">
              <span className="card-index">01</span>
              <h3>Manual photo sharing</h3>
              <p>New fabrics get forwarded buyer by buyer. Repeat buyers ask again. Old photos keep circulating.</p>
            </article>
            <article className="problem-card tilt-card" data-reveal="true">
              <span className="card-index">02</span>
              <h3>Scattered orders</h3>
              <p>Orders arrive as calls, screenshots, voice notes, and chats. Tracking what is handled becomes guesswork.</p>
            </article>
            <article className="problem-card tilt-card" data-reveal="true">
              <span className="card-index">03</span>
              <h3>No catalog control</h3>
              <p>Prices leak, unavailable fabrics stay visible, and there is no simple way to remove buyer access.</p>
            </article>
          </div>
        </section>

        <section id="benefits" className="section benefits-section">
          <div className="section-heading" data-reveal="true">
            <p className="eyebrow">Value for Everyone</p>
            <h2>What They Get</h2>
          </div>
          <div className="tabs-container" data-reveal="true">
            <div className="tabs-header" role="tablist" aria-label="Benefits tabs" style={{ display: 'flex', justifyContent: 'center', gap: '1rem', flexWrap: 'wrap' }}>
              <button className="tab-button active" role="tab" aria-selected="true" aria-controls="seller-benefits" id="tab-seller">Wholesaler (Seller)</button>
              <button className="tab-button" role="tab" aria-selected="false" aria-controls="buyer-benefits" id="tab-buyer">Consumer (Buyer)</button>
            </div>
            <div className="tab-content active" id="seller-benefits" role="tabpanel" aria-labelledby="tab-seller">
              <div className="benefit-grid">
                <div className="benefit-card">
                  <h3>Catalog Privacy</h3>
                  <p>Keep purchase prices and broker notes hidden. Only show what buyers need to see.</p>
                </div>
                <div className="benefit-card">
                  <h3>Unified Orders</h3>
                  <p>Stop hunting through chat history. All orders land in one neat seller dashboard.</p>
                </div>
                <div className="benefit-card">
                  <h3>Access Control</h3>
                  <p>Instantly approve or remove buyer access. Your catalog is never public.</p>
                </div>
              </div>
            </div>
            <div className="tab-content" id="buyer-benefits" role="tabpanel" aria-labelledby="tab-buyer" hidden>
              <div className="benefit-grid">
                <div className="benefit-card">
                  <h3>Zero Clutter</h3>
                  <p>No more thousands of forwarded photos clogging up phone galleries.</p>
                </div>
                <div className="benefit-card">
                  <h3>Instant Alerts</h3>
                  <p>Push notifications when new collections drop so they never miss out.</p>
                </div>
                <div className="benefit-card">
                  <h3>Easy Ordering</h3>
                  <p>Add items to cart and send clean structured orders straight to your WhatsApp.</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section id="system" className="section system-section">
          <div className="section-heading wide" data-reveal="true">
            <p className="eyebrow">One system. Two apps. Total control.</p>
            <h2>Publish once. Every approved buyer sees the right catalog instantly.</h2>
            <p>
              Sauda2Sales separates private seller data from buyer-safe catalog data.
              Your team manages products, buyers, and orders in the seller app. Dealers
              browse your branded app and send structured WhatsApp orders.
            </p>
          </div>

          <div className="system-story">
            <div className="story-steps" aria-label="Scroll active product story">
              <article className="story-step active" data-stage="draft" data-reveal="true">
                <span>Draft</span>
                <h3>Add fabric privately</h3>
                <p>Upload photos, purchase details, broker notes, and internal descriptions. Buyers see none of this until you publish.</p>
              </article>
              <article className="story-step" data-stage="publish" data-reveal="true">
                <span>Publish</span>
                <h3>Choose buyer-facing details</h3>
                <p>Edit catalog name, description, photos, selling price, and New Launch status right when pushing live.</p>
              </article>
              <article className="story-step" data-stage="notify" data-reveal="true">
                <span>Notify</span>
                <h3>Approved buyers get notified</h3>
                <p>Your branded app shows the fabric immediately and sends a phone notification to approved buyers.</p>
              </article>
              <article className="story-step" data-stage="order" data-reveal="true">
                <span>Order</span>
                <h3>Orders return to one place</h3>
                <p>Buyer requests open WhatsApp with clean order text and are saved in your seller app for follow-up.</p>
              </article>
            </div>

            <aside className="sticky-preview" aria-label="Active flow preview" data-reveal="true">
              <div className="preview-frame" data-preview-stage="draft">
                <div className="preview-header">
                  <span className="status-dot"></span>
                  <strong id="previewTitle">Private draft</strong>
                </div>
                <div className="preview-body">
                  <div className="preview-fabric"></div>
                  <div className="preview-copy">
                    <span id="previewLabel">Seller-only product data</span>
                    <p id="previewText">Purchase price and broker notes stay private.</p>
                  </div>
                </div>
                <div className="preview-rail" aria-hidden="true">
                  <span></span><span></span><span></span><span></span>
                </div>
              </div>
            </aside>
          </div>
        </section>

        <section id="features" className="section features-section">
          <div className="section-heading" data-reveal="true">
            <p className="eyebrow">What you get</p>
            <h2>Everything your fabric business needs, without stock-count drama.</h2>
          </div>

          <div className="feature-board">
            <article className="feature-card active tilt-card" data-feature="catalog" data-reveal="true">
              <span className="feature-icon">01</span>
              <h3>Live Catalog</h3>
              <p>Push products live, pull them down, and keep buyers looking at current fabrics only.</p>
            </article>
            <article className="feature-card tilt-card" data-feature="branded" data-reveal="true">
              <span className="feature-icon">02</span>
              <h3>Branded Buyer App</h3>
              <p>Your dealers install an app with your business identity, not a generic marketplace.</p>
            </article>
            <article className="feature-card tilt-card" data-feature="notify" data-reveal="true">
              <span className="feature-icon">03</span>
              <h3>Push Notifications</h3>
              <p>New launches reach approved buyers on their phones the moment you publish.</p>
            </article>
            <article className="feature-card tilt-card" data-feature="visual" data-reveal="true">
              <span className="feature-icon">04</span>
              <h3>Visual Fabric Search</h3>
              <p>Buyers upload a fabric photo and the app finds the closest catalog matches using AI.</p>
            </article>
            <article className="feature-card tilt-card" data-feature="orders" data-reveal="true">
              <span className="feature-icon">05</span>
              <h3>Order Management</h3>
              <p>Requests land in the seller app, ready to review, handle, and track.</p>
            </article>
            <article className="feature-card tilt-card" data-feature="access" data-reveal="true">
              <span className="feature-icon">06</span>
              <h3>Controlled Access</h3>
              <p>Approve buyers one by one, remove access anytime, and protect catalog pricing.</p>
            </article>
          </div>

          <div className="feature-highlight" data-reveal="true">
            <div>
              <p className="eyebrow" id="featureEyebrow">Live catalog</p>
              <h3 id="featureTitle">Current products, no stale forwarding.</h3>
              <p id="featureText">
                Your team publishes selected fabrics into a buyer-safe catalog. Pull a product when it is gone and it disappears from the branded app.
              </p>
            </div>
            <div className="highlight-visual" aria-hidden="true">
              <div className="fabric-stack">
                <span></span><span></span><span></span><span></span>
              </div>
              <div className="highlight-badge" id="featureBadge">118 buyers notified</div>
            </div>
          </div>
        </section>

        <section className="section visual-section" aria-labelledby="visual-title">
          <div className="section-heading wide" data-reveal="true">
            <p className="eyebrow">AI search built for fabric photos</p>
            <h2 id="visual-title">Let buyers search by the fabric they already have in hand.</h2>
            <p>Move across the fabric board to see how visual matching narrows from pattern to closest catalog results.</p>
          </div>
          <div className="visual-lab" data-reveal="true">
            <div className="search-board" id="searchBoard" aria-label="Interactive fabric search preview">
              <div className="lens" id="lens" aria-hidden="true"></div>
              <span className="pattern pattern-a"></span>
              <span className="pattern pattern-b"></span>
              <span className="pattern pattern-c"></span>
              <span className="pattern pattern-d"></span>
            </div>
            <div className="match-panel">
              <span>Closest match</span>
              <strong id="matchScore">92%</strong>
              <p id="matchCopy">Floral digital print, teal base, running in your live catalog.</p>
            </div>
          </div>
        </section>

        <section id="preview" className="section preview-section">
          <div className="section-heading" data-reveal="true">
            <p className="eyebrow">Application Preview</p>
            <h2>See How It Works</h2>
          </div>
          <div className="preview-tabs" data-reveal="true">
            <div className="tabs-header" role="tablist" style={{ display: 'flex', justifyContent: 'center', gap: '1rem', flexWrap: 'wrap', marginBottom: '2rem' }}>
              <button className="preview-tab active" role="tab" aria-selected="true" data-target="preview-seller">Wholesaler Dashboard</button>
              <button className="preview-tab" role="tab" aria-selected="false" data-target="preview-buyer">Consumer App</button>
            </div>
            <div className="preview-panels">
              <div id="preview-seller" className="preview-panel active" role="tabpanel">
                <div className="demo-app-window" style={{ border: '1px solid #e5e7eb', borderRadius: '8px', overflow: 'hidden', display: 'flex', height: '420px', backgroundColor: '#fff', color: '#111827', textAlign: 'left', boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1)' }}>
                  <div className="demo-sidebar" style={{ width: '200px', backgroundColor: '#f9fafb', padding: '1rem', borderRight: '1px solid #e5e7eb' }}>
                    <div style={{ fontWeight: 'bold', marginBottom: '2rem', fontSize: '1.2rem', color: '#111827' }}>Sauda2Sales</div>
                    <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                      <li style={{ fontWeight: '600', color: '#4f46e5' }}>Catalog</li>
                      <li style={{ color: '#4b5563' }}>Buyers</li>
                      <li style={{ color: '#4b5563' }}>Orders (24)</li>
                      <li style={{ color: '#4b5563' }}>Settings</li>
                    </ul>
                  </div>
                  <div className="demo-main" style={{ flex: 1, padding: '1.5rem', overflowY: 'auto' }}>
                    <h3 style={{ marginTop: 0, marginBottom: '1.5rem', color: '#111827' }}>Manage Catalog</h3>
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))', gap: '1rem', marginBottom: '1.5rem' }}>
                       <div style={{ padding: '1rem', border: '1px solid #e5e7eb', borderRadius: '6px' }}>Total Items: <br/><strong style={{ fontSize: '1.5rem' }}>142</strong></div>
                       <div style={{ padding: '1rem', border: '1px solid #e5e7eb', borderRadius: '6px' }}>Active Buyers: <br/><strong style={{ fontSize: '1.5rem' }}>86</strong></div>
                       <div style={{ padding: '1rem', border: '1px solid #e5e7eb', borderRadius: '6px' }}>Pending Orders: <br/><strong style={{ fontSize: '1.5rem' }}>12</strong></div>
                    </div>
                    <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                      <thead>
                        <tr style={{ borderBottom: '2px solid #e5e7eb', textAlign: 'left', color: '#6b7280' }}>
                          <th style={{ padding: '0.5rem' }}>Product</th>
                          <th style={{ padding: '0.5rem' }}>SKU</th>
                          <th style={{ padding: '0.5rem' }}>Wholesale Price</th>
                          <th style={{ padding: '0.5rem' }}>Status</th>
                        </tr>
                      </thead>
                      <tbody style={{ color: '#374151' }}>
                        <tr style={{ borderBottom: '1px solid #e5e7eb' }}>
                          <td style={{ padding: '0.75rem 0.5rem', fontWeight: '500' }}>Floral Digital Print</td>
                          <td style={{ padding: '0.75rem 0.5rem' }}>FDP-101</td>
                          <td style={{ padding: '0.75rem 0.5rem' }}>₹145/m</td>
                          <td style={{ padding: '0.75rem 0.5rem' }}><span style={{ background: '#dcfce7', color: '#166534', padding: '0.2rem 0.5rem', borderRadius: '999px', fontSize: '0.8rem', fontWeight: 'bold' }}>Live</span></td>
                        </tr>
                        <tr style={{ borderBottom: '1px solid #e5e7eb' }}>
                          <td style={{ padding: '0.75rem 0.5rem', fontWeight: '500' }}>Cotton Stripe</td>
                          <td style={{ padding: '0.75rem 0.5rem' }}>CS-204</td>
                          <td style={{ padding: '0.75rem 0.5rem' }}>₹95/m</td>
                          <td style={{ padding: '0.75rem 0.5rem' }}><span style={{ background: '#dcfce7', color: '#166534', padding: '0.2rem 0.5rem', borderRadius: '999px', fontSize: '0.8rem', fontWeight: 'bold' }}>Live</span></td>
                        </tr>
                        <tr>
                          <td style={{ padding: '0.75rem 0.5rem', fontWeight: '500' }}>Silk Jacquard</td>
                          <td style={{ padding: '0.75rem 0.5rem' }}>SJ-089</td>
                          <td style={{ padding: '0.75rem 0.5rem' }}>₹320/m</td>
                          <td style={{ padding: '0.75rem 0.5rem' }}><span style={{ background: '#f3f4f6', color: '#374151', padding: '0.2rem 0.5rem', borderRadius: '999px', fontSize: '0.8rem', fontWeight: 'bold' }}>Draft</span></td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
              <div id="preview-buyer" className="preview-panel" role="tabpanel" hidden>
                <div className="demo-app-phone" style={{ width: '320px', height: '600px', border: '12px solid #1f2937', borderRadius: '36px', overflow: 'hidden', margin: '0 auto', backgroundColor: '#f3f4f6', color: '#111827', display: 'flex', flexDirection: 'column', boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.1)' }}>
                  <div style={{ backgroundColor: '#ffffff', padding: '1rem', borderBottom: '1px solid #e5e7eb', display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontWeight: 'bold' }}>
                    <span style={{ fontSize: '1.1rem' }}>Surat Textiles</span>
                    <span style={{ background: '#4f46e5', color: '#fff', borderRadius: '50%', width: '24px', height: '24px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '0.8rem' }}>2</span>
                  </div>
                  <div style={{ padding: '1rem', flex: 1, overflowY: 'auto' }}>
                    <h4 style={{ margin: '0 0 1rem 0', textAlign: 'left' }}>New Launches</h4>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                      <div style={{ backgroundColor: '#fff', borderRadius: '8px', overflow: 'hidden', boxShadow: '0 1px 3px rgba(0,0,0,0.1)', textAlign: 'left' }}>
                        <div style={{ height: '140px', backgroundColor: '#e0e7ff', backgroundSize: 'cover', backgroundPosition: 'center', backgroundImage: 'url("https://images.unsplash.com/photo-1558622765-502a820ea3f3?q=80&w=400&auto=format&fit=crop")' }}></div>
                        <div style={{ padding: '1rem' }}>
                          <div style={{ fontWeight: 'bold', fontSize: '1.1rem' }}>Floral Digital Print</div>
                          <div style={{ color: '#6b7280', fontSize: '0.9rem', marginBottom: '0.75rem', marginTop: '0.25rem' }}>₹145/m • Min: 50m</div>
                          <button style={{ width: '100%', padding: '0.6rem', backgroundColor: '#4f46e5', color: '#fff', border: 'none', borderRadius: '6px', fontWeight: 'bold', cursor: 'pointer' }}>Add to Cart</button>
                        </div>
                      </div>
                      <div style={{ backgroundColor: '#fff', borderRadius: '8px', overflow: 'hidden', boxShadow: '0 1px 3px rgba(0,0,0,0.1)', textAlign: 'left' }}>
                        <div style={{ height: '140px', backgroundColor: '#dcfce7', backgroundSize: 'cover', backgroundPosition: 'center', backgroundImage: 'url("https://images.unsplash.com/photo-1620799140188-3b2a02fd9a77?q=80&w=400&auto=format&fit=crop")' }}></div>
                        <div style={{ padding: '1rem' }}>
                          <div style={{ fontWeight: 'bold', fontSize: '1.1rem' }}>Cotton Stripe</div>
                          <div style={{ color: '#6b7280', fontSize: '0.9rem', marginBottom: '0.75rem', marginTop: '0.25rem' }}>₹95/m • Min: 100m</div>
                          <button style={{ width: '100%', padding: '0.6rem', backgroundColor: '#e5e7eb', color: '#374151', border: 'none', borderRadius: '6px', fontWeight: 'bold', cursor: 'pointer' }}>Added</button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section id="flow" className="section flow-section">
          <div className="section-heading" data-reveal="true">
            <p className="eyebrow">Up and running in three steps</p>
            <h2>A simple operating rhythm for wholesale teams.</h2>
          </div>
          <div className="flow-grid">
            <article className="flow-card" data-reveal="true">
              <span>1</span>
              <h3>Add your catalog</h3>
              <p>Upload fabric photos, buyer-facing details, and prices. Keep internal cost data private.</p>
            </article>
            <article className="flow-card" data-reveal="true">
              <span>2</span>
              <h3>Buyers browse and order</h3>
              <p>Approved dealers install your branded app, browse live fabrics, and send clean order requests.</p>
            </article>
            <article className="flow-card" data-reveal="true">
              <span>3</span>
              <h3>Handle everything in one place</h3>
              <p>See pending requests, contact buyers on WhatsApp, and mark orders handled from the seller app.</p>
            </article>
          </div>
        </section>

        <section id="results" className="section results-section">
          <div className="section-heading" data-reveal="true">
            <p className="eyebrow">Proven Impact</p>
            <h2>The Numbers Speak</h2>
          </div>
          <div className="results-grid" data-reveal="true">
             <div className="stat-card">
               <span className="stat-number">40%</span>
               <span className="stat-label">Faster order processing</span>
             </div>
             <div className="stat-card">
               <span className="stat-number">0</span>
               <span className="stat-label">Pricing leaks</span>
             </div>
             <div className="stat-card">
               <span className="stat-number">3x</span>
               <span className="stat-label">Faster launch awareness</span>
             </div>
          </div>
          <div className="chart-container" data-reveal="true">
             <h4>WhatsApp Clutter Over Time</h4>
             <div className="mock-chart">
               <div className="chart-bar before" style={{ height: '90%' }}><span>Before</span></div>
               <div className="chart-bar after" style={{ height: '20%' }}><span>After</span></div>
             </div>
          </div>
        </section>

        <section className="section trade-section">
          <div className="trade-copy" data-reveal="true">
            <p className="eyebrow">Built for the fabric trade</p>
            <h2>Made for wholesalers who sell through relationships, not random marketplace traffic.</h2>
          </div>
          <div className="trade-list" data-reveal="true">
            <button className="trade-item active" type="button" data-trade="surat">
              Saree and fabric wholesalers in Surat
            </button>
            <button className="trade-item" type="button" data-trade="buyers">
              Businesses with 10 to 500+ dealer relationships
            </button>
            <button className="trade-item" type="button" data-trade="manual">
              Sellers tired of manual catalog forwarding
            </button>
            <button className="trade-item" type="button" data-trade="team">
              Teams that need managers without exposing purchase prices
            </button>
          </div>
          <div className="trade-panel" data-reveal="true">
            <span id="tradeKicker">Surat ready</span>
            <p id="tradeText">Designed around fast-moving fabric catalogs, buyer approvals, WhatsApp conversations, and no numerical stock counts.</p>
          </div>
        </section>

        <section id="testimonials" className="section testimonials-section">
           <div className="section-heading" data-reveal="true">
            <p className="eyebrow">Testimonials</p>
            <h2>Trusted by Wholesalers</h2>
          </div>
          <div className="testimonial-grid" data-reveal="true">
            <blockquote className="testimonial-card">
              <p>"We used to spend hours forwarding photos. Now we publish once and all our buyers get a push notification. It's magic."</p>
              <footer>
                <strong>Rajesh T.</strong>
                <span>Surat Textiles</span>
              </footer>
            </blockquote>
            <blockquote className="testimonial-card">
              <p>"The best part is keeping purchase prices hidden from my sales team and buyers. Only I see the backend."</p>
              <footer>
                <strong>Anita P.</strong>
                <span>Ethnic Wears</span>
              </footer>
            </blockquote>
          </div>
        </section>

        <section id="pricing" className="section pricing-section">
          <div className="section-heading" data-reveal="true">
            <p className="eyebrow">Clear Pricing</p>
            <h2>Tailored to Your Scale</h2>
          </div>
          <div className="pricing-grid" data-reveal="true">
             <div className="pricing-tier">
                <h3>Starter</h3>
                <p className="price">Custom Quote</p>
                <ul>
                  <li>Up to 50 Approved Buyers</li>
                  <li>Basic Seller Dashboard</li>
                  <li>Branded Buyer App</li>
                </ul>
             </div>
             <div className="pricing-tier featured">
                <h3>Growth</h3>
                <p className="price">Custom Quote</p>
                <ul>
                  <li>Up to 250 Approved Buyers</li>
                  <li>Advanced Analytics</li>
                  <li>AI Visual Search</li>
                  <li>Priority Support</li>
                </ul>
                <a className="button button-primary" href="#contact">Get Quote</a>
             </div>
             <div className="pricing-tier">
                <h3>Enterprise</h3>
                <p className="price">Custom Quote</p>
                <ul>
                  <li>Unlimited Buyers</li>
                  <li>Custom Integration</li>
                  <li>Dedicated Account Manager</li>
                </ul>
             </div>
          </div>
        </section>

        <section id="faq" className="section faq-section">
          <div className="section-heading" data-reveal="true">
            <p className="eyebrow">Got Questions?</p>
            <h2>Frequently Asked Questions</h2>
          </div>
          <div className="faq-list" data-reveal="true">
            <div className="faq-item">
              <button className="faq-question" aria-expanded="false">Does the buyer need to download an app?</button>
              <div className="faq-answer"><p>Yes, buyers install your custom-branded app from a secure link to browse your catalog seamlessly.</p></div>
            </div>
            <div className="faq-item">
              <button className="faq-question" aria-expanded="false">How is order processing handled?</button>
              <div className="faq-answer"><p>Buyers create a cart in the app and submit it. This instantly sends a structured WhatsApp message to your business number and logs the order in your seller dashboard.</p></div>
            </div>
            <div className="faq-item">
              <button className="faq-question" aria-expanded="false">Can I block a buyer?</button>
              <div className="faq-answer"><p>Absolutely. You have full control. If you revoke access, the buyer immediately loses visibility into your catalog.</p></div>
            </div>
          </div>
        </section>

        <section id="contact" className="section contact-section">
           <div className="contact-box" data-reveal="true">
            <p className="eyebrow">Ready to upgrade?</p>
            <h2>Book Your Free Demo</h2>
            <p>See exactly how Sauda2Sales can organize your wholesale fabric business. Host your private catalog today.</p>
            <form className="contact-form" onSubmit={(e) => e.preventDefault()}>
               <div className="form-group">
                 <label htmlFor="name">Name</label>
                 <input type="text" id="name" placeholder="Your Name" required />
               </div>
               <div className="form-group">
                 <label htmlFor="company">Company</label>
                 <input type="text" id="company" placeholder="Your Business Name" required />
               </div>
               <div className="form-group">
                 <label htmlFor="phone">Phone Number</label>
                 <input type="tel" id="phone" placeholder="+91" required />
               </div>
               <button type="submit" className="button button-primary">Request Demo</button>
            </form>
          </div>
        </section>
      </main>

      <footer className="site-footer">
        <span>Sauda2Sales</span>
        <span>Private catalogs for fabric wholesalers.</span>
      </footer>
    </>
  );
}
