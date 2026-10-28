import React, { useEffect, useState } from 'react';
import './styles.css';
import eventsData from '../content/events.json';
import { whenLabel } from './when.js';

export const A = '/images/';

/* ---------- icons: 24x24 path data, one <Ico> for all of them ---------- */
export const P = {
  heart: 'M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z',
  people: 'M16 11c1.66 0 3-1.34 3-3s-1.34-3-3-3-3 1.34-3 3 1.34 3 3 3zm-8 0c1.66 0 3-1.34 3-3S9.66 5 8 5 5 6.34 5 8s1.34 3 3 3zm0 2c-2.33 0-7 1.17-7 3.5V19h14v-2.5c0-2.33-4.67-3.5-7-3.5zm8 0c-.29 0-.62.02-.97.05 1.16.84 1.97 1.97 1.97 3.45V19h6v-2.5c0-2.33-4.67-3.5-7-3.5z',
  book: 'M21 5c-1.11-.35-2.33-.5-3.5-.5-1.95 0-4.05.4-5.5 1.5-1.45-1.1-3.55-1.5-5.5-1.5S2.45 4.9 1 6v14.65c0 .25.25.5.5.5.1 0 .15-.05.25-.05C3.1 20.45 5.05 20 6.5 20c1.95 0 4.05.4 5.5 1.5 1.35-.85 3.8-1.5 5.5-1.5 1.65 0 3.35.3 4.75 1.05.1.05.15.05.25.05.25 0 .5-.25.5-.5V6c-.6-.45-1.25-.75-2-1z',
  cross: 'M19 13h-6v6h-2v-6H5v-2h6V5h2v6h6v2z',
  home: 'M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8z',
  leaf: 'M6.05 8.05a7 7 0 0 0-.02 9.9c1.47-3.4 4.09-6.24 7.36-7.93A15.9 15.9 0 0 0 8 19.32c1.83.75 3.95.65 5.75-.32C19.13 16.12 20 10.5 20 4c-5.5 0-11.5 1.5-13.95 4.05z',
  woman: 'M12 2a3 3 0 1 1 0 6 3 3 0 0 1 0-6zm3 7H9a2 2 0 0 0-1.94 1.5L5 18h3v4h8v-4h3l-2.06-7.5A2 2 0 0 0 15 9z',
  phone: 'M6.62 10.79c1.44 2.83 3.76 5.14 6.59 6.59l2.2-2.2c.27-.27.67-.36 1.02-.24 1.12.37 2.33.57 3.57.57.55 0 1 .45 1 1V20c0 .55-.45 1-1 1-9.39 0-17-7.61-17-17 0-.55.45-1 1-1h3.5c.55 0 1 .45 1 1 0 1.25.2 2.45.57 3.57.11.35.03.74-.25 1.02l-2.2 2.2z',
  mail: 'M20 4H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z',
  pin: 'M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5a2.5 2.5 0 0 1 0-5 2.5 2.5 0 0 1 0 5z',
  clock: 'M12 2a10 10 0 1 0 0 20 10 10 0 0 0 0-20zm0 2a8 8 0 1 1 0 16 8 8 0 0 1 0-16zm.5 3H11v6l5.25 3.15.75-1.23-4.5-2.67V7z',
};
export const Ico = ({ n, s = 22 }) => (
  <svg width={s} height={s} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d={P[n]} /></svg>
);

/* Header: the logo is the way home, so "Home" is not repeated in the nav.
   Root-relative so every link works from any page; on the home page a "/#x"
   href is same-document navigation and just scrolls. */
export const NAV = [['About us', '/about.html'], ['Our work', '/#work'], ['Events', '/events.html'],
                    ['Get involved', '/#involved'], ['Contact', '/contact.html']];

export const LINKS = {
  'About us': '/about.html', 'Our mission': '/about.html#mission', 'Our work': '/#work',
  'Events': '/events.html', 'Ask for help': '/#help', 'Donate': '/#donate',
  'Volunteer': '/contact.html?reason=Volunteering', 'Partner with us': '/contact.html?reason=Partnership%20or%20CSR',
  'Contact us': '/contact.html', 'Privacy policy': '/privacy.html', 'Terms and conditions': '/terms.html',
};

export const PHONE = ['+91 97869 23221', 'tel:+919786923221'];
export const EMAIL = ['info@iandhfoundation.org', 'mailto:info@iandhfoundation.org'];

export function Brand({ dark }) {
  return (
    <a className={'brand' + (dark ? ' on-dark' : '')} href="/">
      <img src={A + 'logo.webp'} alt="I&amp;H Foundation, home" width="520" height="260" />
    </a>
  );
}

/* Section heading: title on the left, optional short intro beside it, and an
   optional control (a link, rail arrows) at the far end. */
export const Title = ({ children, sub, action }) => (
  <div className="sec-head">
    <h2>{children}</h2>
    {sub && <p>{sub}</p>}
    {action && <div className="sec-act">{action}</div>}
  </div>
);

/* ---------- kolam ----------
   The dot-and-loop pattern drawn at Tamil doorsteps as a welcome. Concentric
   rings, each looping once around every dot it passes, on a 7x7 grid turned 45°.
   Paths use pathLength=1 so the CSS can draw them on with one dash value. */
const KS = 24, KH = KS / 2, KN = 3;
const turn = ([x, y], q) => [[x, y], [-y, x], [-x, -y], [y, -x]][q];
function kolamRing(k) {
  const R = k * KS;
  // one side: a 270° loop round the corner dot, then a half-loop over each dot along the edge
  const side = [[1, [-R + KH, -R]]];
  for (let x = -R + KS; x < R; x += KS) side.push([0, [x + KH, -R]]);
  let d = `M${-R} ${-R + KH}`;
  for (let q = 0; q < 4; q++) for (const [large, p] of side) {
    const [x, y] = turn(p, q);
    d += `A${KH} ${KH} 0 ${large} 1 ${x} ${y}`;
  }
  return d + 'Z';
}
const KOLAM_RINGS = [1, 2, 3].map(kolamRing);
const KOLAM_DOTS = [];
for (let i = -KN; i <= KN; i++) for (let j = -KN; j <= KN; j++) KOLAM_DOTS.push([i * KS, j * KS]);

export const Kolam = ({ className = '' }) => (
  <svg className={'kolam ' + className} viewBox="-122 -122 244 244" aria-hidden="true">
    <g transform="rotate(45)">
      {KOLAM_DOTS.map(([x, y]) => <circle key={x + ',' + y} cx={x} cy={y} r="2.6" />)}
      <circle className="kl" cx="0" cy="0" r={KH} pathLength="1" />
      {KOLAM_RINGS.map(d => <path className="kl" key={d} d={d} pathLength="1" />)}
    </g>
  </svg>
);

/* ---------- the two doors ----------
   Everyone arrives needing one of two things. Hero and page ends both use this. */
export const Doors = () => (
  <div className="doors">
    <div className="door need">
      <h2>I need help</h2>
      <p>Tell us what is happening. We reply within two working days.</p>
      {/* same shape in both doors — one button, one "or" line — so they align */}
      <div className="door-actions">
        <a className="btn white" href="/#help">Ask for help</a>
        <p>Or call <a href={PHONE[1]}>{PHONE[0]}</a></p>
      </div>
    </div>
    <div className="door give">
      <h2>I want to help</h2>
      <p>Give, volunteer, or bring your organisation on board.</p>
      <div className="door-actions">
        <a className="btn red" href="/#donate">Donate</a>
        <p>Or <a href={LINKS['Volunteer']}>volunteer</a> or <a href={LINKS['Partner with us']}>partner with us</a></p>
      </div>
    </div>
  </div>
);

/* Opening band on the inner pages. */
export const PageHead = ({ crumb, title, meta, children }) => (
  <section className="page-head">
    <Kolam />
    <div className="wrap">
      <nav className="crumbs" aria-label="Breadcrumb">
        <a href="/">Home</a> <span aria-hidden="true">/</span> <span aria-current="page">{crumb}</span>
      </nav>
      <h1>{title}</h1>
      <p>{children}</p>
      {meta && <p className="page-meta">{meta}</p>}
    </div>
  </section>
);

/* Closing band on the inner pages. */
export const Cta = () => (
  <section className="band">
    <div className="wrap"><Doors /></div>
  </section>
);

/* ---------- form delivery ---------- */
export const FORM_ID = import.meta.env.VITE_FORMSPREE_ID;
const ENDPOINT = FORM_ID ? `https://formspree.io/f/${FORM_ID}` : null;

// 'unset' when no endpoint is configured — never report success in that case,
// or someone's message silently goes nowhere.
export async function postForm(form) {
  if (!ENDPOINT) return 'unset';
  try {
    const res = await fetch(ENDPOINT, {
      method: 'POST',
      headers: { Accept: 'application/json' },
      body: new FormData(form),
    });
    return res.ok ? 'ok' : 'error';
  } catch {
    return 'error';
  }
}

/* ---------- events ---------- */
/* Photos are stand-ins from the programme set until the dedicated event-*.webp
   shots exist. PLACEHOLDER DATES AND VENUES: replace before publishing. */
export const EVENTS = eventsData.items;
const MON = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
const DAY = ['Sun','Mon','Tue','Wed','Thu','Fri','Sat'];

/* One agenda row, two callers: the home page passes a button that flips the form
   in place, the events page passes a link that carries the event in the URL. */
export function EventRow({ event, action, blurb }) {
  const { at, title, time, place, photo, fallback, detail } = event;
  /* Render the known-good stand-in first, then probe for the dedicated event
     photo and swap it in if it exists. Relying on the <img>'s own onError does
     not work here: loading="lazy" defers the request, so the error — and the
     fallback with it — can arrive long after the row is on screen, or never. */
  const [src, setSrc] = useState(A + fallback);
  useEffect(() => {
    const probe = new Image();
    probe.onload = () => setSrc(A + photo);
    probe.src = A + photo;
    return () => { probe.onload = null; };
  }, [photo]);
  const d = new Date(at);
  const when = whenLabel(at);
  return (
    <article className={'event' + (when ? '' : ' past')}>
      <p className="event-date">
        <b>{d.getDate()}</b>
        <span>{MON[d.getMonth()]} {d.getFullYear()}</span>
        <span>{DAY[d.getDay()]}</span>
      </p>
      <div className="event-body">
        <h3>{title}</h3>
        <p className="event-meta">
          <span><Ico n="clock" s={16} /> {time}</span>
          <span><Ico n="pin" s={16} /> {place}</span>
        </p>
        {blurb && detail && <p className="event-detail">{detail}</p>}
        <div className="event-foot">
          <span className="event-when">{when || 'This event has finished. Thank you to everyone who came.'}</span>
          {when && action}
        </div>
      </div>
      <img className="event-photo" src={src} alt="" width="600" height="375" loading="lazy" />
    </article>
  );
}

/* ---------- header ---------- */
// Of the sections currently crossing the scroll-spy band, pick the innermost one
// (a nested section beats its parent), then the one highest on screen.
export function pickSection(els) {
  if (!els.length) return null;
  const innermost = els.filter(t => !els.some(o => o !== t && t.contains(o)));
  return innermost.sort((a, b) =>
    a.getBoundingClientRect().top - b.getBoundingClientRect().top)[0] || null;
}

export function Header({ current }) {
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState(current || null);
  useEffect(() => {
    const onScroll = () => document.documentElement.classList.toggle('is-scrolled', scrollY > 8);
    addEventListener('scroll', onScroll, { passive: true }); onScroll();
    const onKey = e => { if (e.key === 'Escape') setOpen(false); };
    addEventListener('keydown', onKey);
    if (current) return () => { removeEventListener('scroll', onScroll); removeEventListener('keydown', onKey); };

    // scroll-spy: highlight whichever section is crossing the middle of the viewport.
    // Entries only report *changes*, so keep the running set ourselves. Sections can
    // nest, so prefer the innermost match or a parent would always win.
    const byEl = new Map();
    NAV.forEach(([, h]) => {
      if (!h.startsWith('/#')) return;         // only anchors on this page
      const el = document.querySelector('#' + h.slice(2));
      if (el) byEl.set(el, h);
    });
    const visible = new Set();
    const io = new IntersectionObserver(entries => {
      entries.forEach(e => e.isIntersecting ? visible.add(e.target) : visible.delete(e.target));
      const pick = pickSection([...visible]);
      setActive(pick ? byEl.get(pick) : null);
    }, { rootMargin: '-45% 0px -50% 0px' });
    byEl.forEach((_, el) => io.observe(el));
    return () => { removeEventListener('scroll', onScroll); removeEventListener('keydown', onKey); io.disconnect(); };
  }, [current]);
  return (
    <header className={open ? 'menu-open' : ''}>
      <a className="skip" href="#main">Skip to content</a>
      <Brand />
      <nav id="site-nav" aria-label="Main" onClick={() => setOpen(false)}>
        {NAV.map(([t, h]) => (
          <a key={h} href={h} className={h === active ? 'active' : ''}
             aria-current={h === active ? (current ? 'page' : 'true') : undefined}>{t}</a>
        ))}
      </nav>
      <div className="head-actions">
        <a className="btn navy sm" href="/#help">I need help</a>
        <a className="btn red sm" href="/#donate">Donate</a>
        <button className="burger" aria-label={open ? 'Close menu' : 'Open menu'} aria-controls="site-nav"
                aria-expanded={open} onClick={() => setOpen(!open)}><i /><i /><i /></button>
      </div>
    </header>
  );
}

/* ---------- footer ---------- */
/* [key, label, icon path, profile URL].
   An icon only renders once its URL is filled in — an icon linking to "#" is a
   button that does nothing, which is worse than no icon. */
const SOCIAL = [
  ['fb', 'Facebook', 'M13.5 21v-8h2.7l.4-3.1h-3.1V7.9c0-.9.25-1.5 1.55-1.5H16.7V3.6c-.3 0-1.3-.13-2.46-.13-2.44 0-4.1 1.49-4.1 4.21v2.35H7.4V13h2.74v8h3.36z', ''],
  ['ig', 'Instagram', 'M7 2h10a5 5 0 015 5v10a5 5 0 01-5 5H7a5 5 0 01-5-5V7a5 5 0 015-5zm0 2a3 3 0 00-3 3v10a3 3 0 003 3h10a3 3 0 003-3V7a3 3 0 00-3-3H7zm5 3a5 5 0 110 10 5 5 0 010-10zm0 2a3 3 0 100 6 3 3 0 000-6zm5.5-2.75a1.25 1.25 0 110 2.5 1.25 1.25 0 010-2.5z', ''],
  ['yt', 'YouTube', 'M23 7.5a3 3 0 00-2.1-2.1C19 4.9 12 4.9 12 4.9s-7 0-8.9.5A3 3 0 001 7.5C.5 9.4.5 12 .5 12s0 2.6.5 4.5a3 3 0 002.1 2.1c1.9.5 8.9.5 8.9.5s7 0 8.9-.5a3 3 0 002.1-2.1c.5-1.9.5-4.5.5-4.5s0-2.6-.5-4.5zM9.75 15.5v-7l6 3.5-6 3.5z', ''],
  ['li', 'LinkedIn', 'M4.98 3.5a2.5 2.5 0 11-.02 5 2.5 2.5 0 01.02-5zM3 8.98h4v12H3v-12zm7 0h3.8v1.64h.05c.53-1 1.83-2.05 3.76-2.05 4.02 0 4.76 2.64 4.76 6.08v6.33h-4v-5.61c0-1.34-.02-3.06-1.87-3.06-1.87 0-2.15 1.46-2.15 2.96v5.71h-4v-12z', ''],
];
const FCOLS = [
  ['Foundation', ['About us', 'Our mission', 'Our work', 'Events']],
  ['Get involved', ['Ask for help', 'Donate', 'Volunteer', 'Partner with us']],
  ['Information', ['Contact us', 'Privacy policy', 'Terms and conditions']],
];
export const Footer = () => (
  <footer>
    <div className="foot-grid">
      <div className="foot-brand">
        <Brand dark />
        <p>Connecting people who need help with people who can give it, across Tamil Nadu.</p>
        <div className="social">
          {SOCIAL.filter(([, , , url]) => url).map(([c, label, d, url]) => (
            <a href={url} key={c} aria-label={label} target="_blank" rel="noopener noreferrer">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d={d} /></svg>
            </a>
          ))}
        </div>
      </div>
      {/* an item appears once LINKS gives it a destination — no href="#" stubs */}
      {FCOLS.map(([h, items]) => (
        <nav key={h} aria-label={h}><h2>{h}</h2>
          {items.filter(t => LINKS[t]).map(t => <a key={t} href={LINKS[t]}>{t}</a>)}
        </nav>
      ))}
      <div><h2>Contact</h2>
        <a href={PHONE[1]}><Ico n="phone" s={16} /> {PHONE[0]}</a>
        <a href={EMAIL[1]}><Ico n="mail" s={16} /> {EMAIL[0]}</a>
        <span><Ico n="pin" s={16} /> Trichy, Tamil Nadu</span>
      </div>
    </div>
    <p className="copy">&copy; {new Date().getFullYear()} I&amp;H Foundation</p>
  </footer>
);

/* ---------- fragment fix + back-to-top, shared by every page ---------- */
export function usePageChrome() {
  const [up, setUp] = useState(false);
  useEffect(() => {
    // These pages render client-side, so the element a URL fragment points at does
    // not exist when the browser first handles it and the jump is dropped. Redo it
    // once React has mounted. scroll-padding-top keeps it clear of the sticky header.
    if (location.hash) {
      try {
        const target = document.querySelector(location.hash);
        if (target) requestAnimationFrame(() => target.scrollIntoView());
      } catch { /* not a usable selector — ignore */ }
    }
    const f = () => setUp(scrollY > 900);
    addEventListener('scroll', f, { passive: true });
    return () => removeEventListener('scroll', f);
  }, []);
  return up;
}
export const ToTop = ({ show }) => (
  <button className={'to-top' + (show ? ' show' : '')} aria-label="Back to top"
          onClick={() => scrollTo({ top: 0, behavior: 'smooth' })}>
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4"
         strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M12 19V5M5 12l7-7 7 7" /></svg>
  </button>
);
