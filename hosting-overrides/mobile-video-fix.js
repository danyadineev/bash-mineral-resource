(() => {
  const mobileSources = new Map([
    ["/hero-september28-mobile.mp4", "/hero-september28-mobile-v2.mp4"],
    ["/hero-gypsum-september29-mobile.mp4", "/hero-gypsum-september29-mobile-v2.mp4"],
    ["/hero-manganese-september29-mobile.mp4", "/hero-manganese-september29-mobile-v2.mp4"],
  ]);

  const prepared = new WeakSet();
  const contactEmail = "info@bashmineral.ru";

  const normalizeMobileCopy = () => {
    document.querySelectorAll('.productHeroCopy').forEach(copy => {
      const gypsum = copy.closest('.productHero--gypsum');
      const existing = copy.querySelector('.reserveFacts');
      const reserveKey = gypsum ? 'gypsum' : 'manganese';
      if (existing?.dataset.product === reserveKey) return;
      existing?.remove();
      const facts = document.createElement('div');
      facts.className = 'reserveFacts';
      facts.dataset.product = reserveKey;
      facts.innerHTML = `<p>Балансовые запасы по категориям В+С1+С2 — <strong>${gypsum ? '11,5' : '44,2'} млн тонн</strong></p><p>Прогнозные запасы — <strong>${gypsum ? '424' : '140'} млн тонн</strong></p>`;
      copy.append(facts);
    });
    const history = document.querySelector('.historySection');
    if (history && !document.querySelector('#geology')) {
      const geology = document.createElement('section');
      geology.id = 'geology';
      geology.className = 'section geologySection';
      geology.innerHTML = '<div><p class="eyebrow">Месторождение</p><h2>Геология</h2><p>Горизонтальное залегание марганцовистых известняков и подстилающих их попутно разрабатываемых гипсов и гипсоангидритов и относительно небольшая мощность вскрышных пород (глины) позволяют вести разработку всех участков месторождения открытым способом.</p></div><img src="/content/sep27-manganese-mining.webp" alt="Открытая разработка карьера" loading="lazy">';
      history.after(geology);
    }
    const benefits = document.querySelector('.gypsumApplication--cement .applicationBenefits');
    if (benefits && !benefits.dataset.oct9) {
      benefits.dataset.oct9 = '1';
      benefits.innerHTML = '<h3>Преимущество нашего продукта — высокое содержание серного ангидрида (SO₃)</h3><p class="so3Intro">В нашем камне SO₃ составляет 45–50% и выше. У большинства поставщиков на рынке этот показатель — 35–40%.</p><h3>Что это даёт цементному заводу:</h3><ul><li><p>Нужное содержание SO₃ в цементе набирается меньшим количеством добавки.</p></li><li><p>Снижаются закупки, затраты на перевозку, складирование и дозирование.</p></li><li><p>В помол попадает меньше примесей, поэтому состав цемента стабильнее.</p></li></ul>';
    }
    // Keep the brand lockup on one line in both the header and the footer.
    document.querySelectorAll(".logoWordmark").forEach((wordmark) => {
      if (wordmark.textContent.trim() !== "БАШМИНЕРАЛРЕСУРС" && wordmark.textContent.includes("БАШМИНЕРАЛ")) {
        wordmark.textContent = "БАШМИНЕРАЛРЕСУРС";
      }
    });

    // Both layouts retain the full product names and the original two-line buttons.
    document.querySelectorAll(".headerNavLink").forEach((link) => {
      const href = link.getAttribute("href") || "";
      const lines = href === "#/gypsum" ? ["Камень гипсовый и", "гипсоангидритовый"]
        : href === "#/manganese" ? ["Марганцовистый", "флюсующий известняк"] : null;
      if (lines && (link.children.length !== 2 || [...link.children].some((span, index) => span.textContent !== lines[index]))) {
        link.replaceChildren(...lines.map(text => {
          const span = document.createElement("span");
          span.textContent = text;
          return span;
        }));
      }
      if (href === "#history" && link.textContent.trim() !== "О компании") link.textContent = "О компании";
    });

    // Use the exact copy requested for the two gypsum directions.
    const cementTitle = document.querySelector(".gypsumApplication--cement .applicationHeader h2");
    if (cementTitle && cementTitle.textContent.trim() !== "Для производства цемента") cementTitle.textContent = "Для производства цемента";
    const dryMixTitle = document.querySelector(".gypsumApplication--dry-mixes .applicationHeader h2");
    if (dryMixTitle && dryMixTitle.textContent.trim() !== "Для производства сухих строительных смесей") dryMixTitle.textContent = "Для производства сухих строительных смесей";

    [[".gypsumApplication--cement .applicationPhoto figcaption", "Камень гипсоангидритовый"],
      [".gypsumApplication--dry-mixes .applicationPhoto figcaption", "Камень гипсовый"]].forEach(([selector, text]) => {
      const caption = document.querySelector(selector);
      if (caption && caption.textContent.trim() !== text) caption.textContent = text;
    });

    // Both product pages use the same concise quality-passport heading.
    document.querySelectorAll(".applicationPassport > h3").forEach((heading) => {
      if (heading.textContent.trim() !== "Паспорт качества") heading.textContent = "Паспорт качества";
    });

    // Removing the desktop line breaks must not join words on mobile.
    const historyTitle = document.querySelector(".historySection .sectionHeading h2");
    if (historyTitle && historyTitle.textContent.trim() !== "От геологической разведки к современному производству") {
      historyTitle.textContent = "От геологической разведки к современному производству";
    }

    const contactTitle = document.querySelector(".contactSection:not(.contactSection--algorithm) .sectionHeading h2");
    if (contactTitle && contactTitle.textContent.trim() !== "Обсудить продукт и условия поставки") {
      contactTitle.textContent = "Обсудить продукт и условия поставки";
    }

    // Replace the unsuitable fused-flux close-up with the even-fraction sample image.
    document.querySelectorAll(".manganeseDirectionImage--flux img").forEach((image) => {
      if (image.dataset.mobileMaterialFixed === "1") return;
      image.src = window.matchMedia("(max-width: 767px)").matches ? "/content/manganese-flux-owner-original.jpg" : "/content/manganese-fused-flux.webp";
      image.alt = "Марганцовистый плавленный флюс";
      image.dataset.mobileMaterialFixed = "1";
    });
  };

  const normalizeContactEmail = () => {
    document.querySelectorAll('a[href^="mailto:"]').forEach((link) => {
      const href = link.getAttribute("href") || "";
      const query = href.includes("?") ? href.slice(href.indexOf("?")) : "";
      link.setAttribute("href", `mailto:${contactEmail}${query}`);

      const walker = document.createTreeWalker(link, NodeFilter.SHOW_TEXT);
      let node;
      while ((node = walker.nextNode())) {
        if (node.nodeValue.includes("@")) {
          node.nodeValue = node.nodeValue.replace(/[\w.+-]+@[\w.-]+\.[A-Za-z]{2,}/g, contactEmail);
        }
      }
    });
  };

  const mobileGalleryPath = (value, reorder = false) => {
    if (reorder && typeof value === 'string' && /company-galleries\/laboratory-(01|07)(-mobile)?\.webp/.test(value)) {
      value = value.replace(/laboratory-(01|07)/, (_, n) => `laboratory-${n === '01' ? '07' : '01'}`);
    }
    if (!window.matchMedia("(max-width: 719px)").matches || typeof value !== "string") return value;
    try {
      const url = new URL(value, location.href);
      if (!/^\/content\/(company|product)-galleries\//.test(url.pathname) || /-mobile\.(webp|jpe?g)$/i.test(url.pathname)) return value;
      url.pathname = url.pathname.replace(/\.(webp|jpe?g)$/i, "-mobile.webp");
      return url.href;
    } catch {
      return value;
    }
  };

  const nativeSetAttribute = Element.prototype.setAttribute;
  Element.prototype.setAttribute = function setAttribute(name, value) {
    if (name === "src" && this instanceof HTMLImageElement) value = mobileGalleryPath(value, true);
    return nativeSetAttribute.call(this, name, value);
  };

  const imageSrc = Object.getOwnPropertyDescriptor(HTMLImageElement.prototype, "src");
  if (imageSrc?.set && imageSrc.get) {
    Object.defineProperty(HTMLImageElement.prototype, "src", {
      configurable: imageSrc.configurable,
      enumerable: imageSrc.enumerable,
      get: imageSrc.get,
      set(value) {
        imageSrc.set.call(this, mobileGalleryPath(value, true));
        this.decoding = "async";
      },
    });
  }

  const optimizeExistingGalleryImages = () => {
    if (!window.matchMedia("(max-width: 719px)").matches) return;
    document.querySelectorAll("img").forEach((image) => {
      const optimized = mobileGalleryPath(image.currentSrc || image.src);
      if (optimized !== (image.currentSrc || image.src)) {
        imageSrc.set.call(image, optimized);
        image.decoding = "async";
      }
    });
  };

  const addPlayFallback = (video) => {
    const host = video.closest(".hero, .productHero") || video.parentElement;
    if (!host) return null;

    let button = host.querySelector(".heroVideoPlay");
    if (!button) {
      button = document.createElement("button");
      button.type = "button";
      button.className = "heroVideoPlay";
      button.setAttribute("aria-label", "Запустить фоновое видео");
      button.innerHTML = '<span aria-hidden="true">▶</span> Запустить видео';
      host.append(button);
    }
    return button;
  };

  const optimizeVideoSource = (video) => {
    if (video.matches('video.heroMedia')) {
      if (!video.src.endsWith('/hero-home-oct9.mp4')) {
        video.src = '/hero-home-oct9.mp4';
        video.load();
        video.play().catch(() => {});
      }
      return;
    }
    if (!window.matchMedia("(max-width: 719px)").matches) return;
    const currentPath = new URL(video.currentSrc || video.src, location.href).pathname;
    const optimizedSource = mobileSources.get(currentPath);
    if (!optimizedSource || video.src.endsWith(optimizedSource)) return;
    video.muted = true;
    video.src = optimizedSource;
    video.load();
    video.play().catch(() => {});
  };

  const prepareVideo = (video) => {
    if (prepared.has(video)) return;
    prepared.add(video);

    video.muted = true;
    video.defaultMuted = true;
    video.volume = 0;
    video.autoplay = true;
    video.loop = true;
    video.playsInline = true;
    video.preload = "auto";
    video.setAttribute("muted", "");
    video.setAttribute("autoplay", "");
    video.setAttribute("playsinline", "");
    video.setAttribute("webkit-playsinline", "");

    const button = addPlayFallback(video);
    let fallbackTimer;

    const hideFallback = () => {
      clearTimeout(fallbackTimer);
      if (button) button.hidden = true;
    };

    const showFallback = () => {
      if (button && (video.paused || video.readyState < 2)) button.hidden = false;
    };

    const markPlaying = () => {
      video.classList.add("is-ready");
      hideFallback();
    };

    const play = () => {
      video.muted = true;
      const result = video.play();
      if (result && typeof result.catch === "function") result.catch(showFallback);
    };

    button?.addEventListener("click", () => {
      button.hidden = true;
      play();
    });
    video.addEventListener("playing", markPlaying);
    video.addEventListener("timeupdate", () => {
      if (video.currentTime > 0) markPlaying();
    }, { once: true });
    video.addEventListener("canplay", play);
    video.addEventListener("error", showFallback);

    if (button) button.hidden = true;
    fallbackTimer = window.setTimeout(showFallback, 2200);
    play();
  };

  const videoSelector = "video.heroMedia, video.productHeroMedia";
  const scan = () => document.querySelectorAll(videoSelector).forEach((video) => {
    optimizeVideoSource(video);
    prepareVideo(video);
  });

  new MutationObserver(() => {
    scan();
    optimizeExistingGalleryImages();
    normalizeContactEmail();
    normalizeMobileCopy();
  }).observe(document.documentElement, {
    childList: true,
    subtree: true,
    attributes: true,
    attributeFilter: ["src"],
  });

  const rescanAfterRouteChange = () => {
    scan();
    optimizeExistingGalleryImages();
    normalizeContactEmail();
    normalizeMobileCopy();
    window.setTimeout(scan, 120);
  };

  window.addEventListener("hashchange", rescanAfterRouteChange);
  window.setInterval(scan, 1000);

  document.addEventListener("visibilitychange", () => {
    if (!document.hidden) {
      document.querySelectorAll(videoSelector).forEach((video) => video.play().catch(() => {}));
    }
  });

  document.addEventListener("touchstart", () => {
    document.querySelectorAll(videoSelector).forEach((video) => video.play().catch(() => {}));
  }, { once: true, passive: true, capture: true });

  scan();
  optimizeExistingGalleryImages();
  normalizeContactEmail();
  normalizeMobileCopy();
})();
