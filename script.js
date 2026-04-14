(() => {
  const NAV_ITEMS = [
    { id: 'home', label: 'Home', href: 'index.html' },
    { id: 'blog', label: 'Blog', href: 'blog.html' },
    { id: 'article', label: 'Article', href: 'article.html' },
    { id: 'guides', label: 'Guides', href: 'guides.html' },
    { id: 'accessories', label: 'Accessories', href: 'accessories.html' },
    { id: 'fps', label: 'FPS Boost', href: 'fps-boost.html' },
    { id: 'reviews', label: 'Reviews', href: 'reviews.html' },
    { id: 'esports', label: 'Esports', href: 'esports.html' },
    { id: 'about', label: 'About', href: 'about.html' },
    { id: 'contact', label: 'Contact', href: 'contact.html' }
  ];

  function createNode(tag, className, text) {
    const node = document.createElement(tag);
    if (className) {
      node.className = className;
    }
    if (typeof text === 'string') {
      node.textContent = text;
    }
    return node;
  }

  function injectTopStrip() {
    if (document.querySelector('.top-strip')) {
      return;
    }

    const topTitle = document.body.dataset.topTitle || 'Ultra Gaming Hub';
    const topSubtitle =
      document.body.dataset.topSubtitle || 'Gaming tips, tricks and accessories guides.';

    const strip = createNode('div', 'top-strip');
    strip.appendChild(createNode('h1', '', topTitle));
    strip.appendChild(createNode('p', '', topSubtitle));

    document.body.prepend(strip);
  }

  function injectHeader() {
    if (document.querySelector('.site-header')) {
      return;
    }

    const currentPage = document.body.dataset.page || '';
    const header = createNode('header', 'site-header');

    const brand = createNode('a', 'brand');
    brand.href = 'index.html';
    brand.appendChild(document.createTextNode('Ultra'));
    const brandAccent = createNode('span', '', 'GamingHub');
    brand.appendChild(brandAccent);

    const toggle = createNode('button', 'menu-toggle', 'Menu');
    toggle.setAttribute('data-menu-toggle', '');
    toggle.setAttribute('aria-expanded', 'false');
    toggle.setAttribute('aria-label', 'Open navigation');

    const nav = createNode('nav', 'site-nav');
    nav.setAttribute('data-site-nav', '');

    NAV_ITEMS.forEach((item) => {
      const link = createNode('a', '', item.label);
      link.href = item.href;
      if (item.id === currentPage) {
        link.classList.add('active');
      }
      nav.appendChild(link);
    });

    header.appendChild(brand);
    header.appendChild(toggle);
    header.appendChild(nav);

    const main = document.querySelector('main');
    if (main) {
      main.before(header);
    } else {
      document.body.appendChild(header);
    }
  }

  function injectFooter() {
    if (document.querySelector('.footer')) {
      return;
    }

    const note = document.body.dataset.footerNote || 'All rights reserved.';
    const footer = createNode('footer', 'footer');

    footer.appendChild(document.createTextNode('Copyright '));
    const year = createNode('span');
    year.setAttribute('data-year', '');
    footer.appendChild(year);
    footer.appendChild(document.createTextNode(' UltraGamingHub. ' + note));

    document.body.appendChild(footer);
  }

  function bindMenuToggle() {
    const navToggle = document.querySelector('[data-menu-toggle]');
    const nav = document.querySelector('[data-site-nav]');

    if (!navToggle || !nav) {
      return;
    }

    navToggle.addEventListener('click', () => {
      const expanded = navToggle.getAttribute('aria-expanded') === 'true';
      navToggle.setAttribute('aria-expanded', String(!expanded));
      nav.classList.toggle('open');
    });

    nav.querySelectorAll('a').forEach((link) => {
      link.addEventListener('click', () => {
        nav.classList.remove('open');
        navToggle.setAttribute('aria-expanded', 'false');
      });
    });
  }

  function applyYear() {
    const year = String(new Date().getFullYear());
    document.querySelectorAll('[data-year]').forEach((node) => {
      node.textContent = year;
    });
  }

  function bindReveal() {
    const revealItems = document.querySelectorAll('[data-reveal]');
    if (revealItems.length === 0) {
      return;
    }

    if (!('IntersectionObserver' in window)) {
      revealItems.forEach((item) => item.classList.add('show'));
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('show');
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.12 }
    );

    revealItems.forEach((item) => observer.observe(item));
  }

  injectTopStrip();
  injectHeader();
  injectFooter();
  bindMenuToggle();
  applyYear();
  bindReveal();
})();
