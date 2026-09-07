import React, { useEffect, useState } from 'react';
import './styles.css';
import eventsData from '../content/events.json';

export const A = '/images/';

/* ---------- icons: 24x24 path data, one <Ico> for all of them ---------- */
export const P = {
  heart: 'M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z',
  people: 'M16 11c1.66 0 3-1.34 3-3s-1.34-3-3-3-3 1.34-3 3 1.34 3 3 3zm-8 0c1.66 0 3-1.34 3-3S9.66 5 8 5 5 6.34 5 8s1.34 3 3 3zm0 2c-2.33 0-7 1.17-7 3.5V19h14v-2.5c0-2.33-4.67-3.5-7-3.5zm8 0c-.29 0-.62.02-.97.05 1.16.84 1.97 1.97 1.97 3.45V19h6v-2.5c0-2.33-4.67-3.5-7-3.5z',
  book: 'M21 5c-1.11-.35-2.33-.5-3.5-.5-1.95 0-4.05.4-5.5 1.5-1.45-1.1-3.55-1.5-5.5-1.5S2.45 4.9 1 6v14.65c0 .25.25.5.5.5.1 0 .15-.05.25-.05C3.1 20.45 5.05 20 6.5 20c1.95 0 4.05.4 5.5 1.5 1.35-.85 3.8-1.5 5.5-1.5 1.65 0 3.35.3 4.75 1.05.1.05.15.05.25.05.25 0 .5-.25.5-.5V6c-.6-.45-1.25-.75-2-1z',
  school: 'M12 3 1 9l4 2.18v6L12 21l7-3.82v-6L21 10.09V17h2V9L12 3zm6.82 6L12 12.72 5.18 9 12 5.28 18.82 9zM17 15.99l-5 2.73-5-2.73v-3.72L12 15l5-2.73v3.72z',
  cross: 'M19 13h-6v6h-2v-6H5v-2h6V5h2v6h6v2z',
  home: 'M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8z',
  mega: 'M18 11v2h4v-2h-4zm-2 6.61c.96.71 2.21 1.65 3.2 2.39l1.2-1.6c-.99-.74-2.24-1.68-3.2-2.4l-1.2 1.61zM20.4 5.6c-.4-.53-.8-1.07-1.2-1.6-.99.74-2.24 1.68-3.2 2.4l1.2 1.6c.96-.72 2.21-1.65 3.2-2.4zM4 9c-1.1 0-2 .9-2 2v2c0 1.1.9 2 2 2h1v4h2v-4h1l5 3V6L8 9H4zm11.5 3c0-1.33-.58-2.53-1.5-3.35v6.69c.92-.81 1.5-2.01 1.5-3.34z',
  leaf: 'M6.05 8.05a7 7 0 0 0-.02 9.9c1.47-3.4 4.09-6.24 7.36-7.93A15.9 15.9 0 0 0 8 19.32c1.83.75 3.95.65 5.75-.32C19.13 16.12 20 10.5 20 4c-5.5 0-11.5 1.5-13.95 4.05z',
  woman: 'M12 2a3 3 0 1 1 0 6 3 3 0 0 1 0-6zm3 7H9a2 2 0 0 0-1.94 1.5L5 18h3v4h8v-4h3l-2.06-7.5A2 2 0 0 0 15 9z',
  phone: 'M6.62 10.79c1.44 2.83 3.76 5.14 6.59 6.59l2.2-2.2c.27-.27.67-.36 1.02-.24 1.12.37 2.33.57 3.57.57.55 0 1 .45 1 1V20c0 .55-.45 1-1 1-9.39 0-17-7.61-17-17 0-.55.45-1 1-1h3.5c.55 0 1 .45 1 1 0 1.25.2 2.45.57 3.57.11.35.03.74-.25 1.02l-2.2 2.2z',
  mail: 'M20 4H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z',
  pin: 'M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5a2.5 2.5 0 0 1 0-5 2.5 2.5 0 0 1 0 5z',
  target: 'M12 2a10 10 0 1 0 0 20 10 10 0 0 0 0-20zm0 4a6 6 0 1 1 0 12 6 6 0 0 1 0-12zm0 4a2 2 0 1 0 0 4 2 2 0 0 0 0-4z',
  eye: 'M12 5c-7 0-10 7-10 7s3 7 10 7 10-7 10-7-3-7-10-7zm0 11a4 4 0 1 1 0-8 4 4 0 0 1 0 8zm0-6a2 2 0 1 0 0 4 2 2 0 0 0 0-4z',
  scale: 'M12 3a2 2 0 0 1 1.94 1.5H20v2h-2.2l2.7 6.2A3.8 3.8 0 0 1 17 16a3.8 3.8 0 0 1-3.5-3.3L16.2 6.5H13v12h4v2H7v-2h4v-12H7.8l2.7 6.2A3.8 3.8 0 0 1 7 16a3.8 3.8 0 0 1-3.5-3.3L6.2 6.5H4v-2h6.06A2 2 0 0 1 12 3z',
  handshake: 'M11 4h2l4 3h3a1 1 0 0 1 1 1v7a1 1 0 0 1-1 1h-1.6l-3.1 2.6a2 2 0 0 1-2.7-.1L9 15.6l-1.4 1a2 2 0 0 1-2.6-.3L4 15.4V8a1 1 0 0 1 1-1h2l4-3z',
};
export const Ico = ({ n, s = 22 }) => (
  <svg width={s} height={s} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d={P[n]} /></svg>
);
export const Arrow = () => <span className="arw" aria-hidden="true">&rarr;</span>;

/* Root-relative so every link works from any page. From the home page a "/#x"
   href is still same-document navigation, so it just scrolls. */
export const NAV = [['Home', '/#home'], ['About Us', '/about.html'], ['Our Work', '/#work'],
                    ['Events', '/events.html'], ['How We Help', '/#ways'],
                    ['Get Involved', '/#involved'], ['Contact', '/contact.html']];

export const LINKS = {
  'About Us': '/about.html', 'Our Mission': '/about.html#mission', 'Our Work': '/#work', 'How We Help': '/#ways',
  'I Need Help': '/#help', 'Donate': '/#donate', 'Volunteer': '/#involved', 'Partner With Us': '/#involved',
  'Events': '/events.html', 'Contact Us': '/contact.html', 'Privacy Policy': '/privacy.html', 'Terms & Conditions': '/terms.html',
};

export function Brand({ dark }) {
  return (
    <a className={'brand' + (dark ? ' on-dark' : '')} href="/#home">
      <img src={A + 'logo.webp'} alt="I&amp;H Foundation" width="520" height="260" />
      {dark && <small>Helping People in Need</small>}
    </a>
  );
}
export const Title = ({ children, sub }) => (
  <div className="sec-head rv">
    <h2><i />{children}<i /></h2>
    {sub && <p>{sub}</p>}
  </div>
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
/* Dates drive a live countdown, so keep them in the future or the card flips to
   "finished". Photos are stand-ins from the programme set — the dedicated
   event-*.webp shots in image-prompts.md have not been generated yet.
   PLACEHOLDER DATES AND VENUES: replace before publishing. */
export const EVENTS = eventsData.items;
const MON = ['JAN','FEB','MAR','APR','MAY','JUN','JUL','AUG','SEP','OCT','NOV','DEC'];

// Seconds remaining, or null once the date has passed.
export function timeLeft(iso, now = Date.now()) {
  const ms = new Date(iso) - now;
  if (!(ms > 0)) return null;
  const s = Math.floor(ms / 1000);
  return { days: Math.floor(s / 86400), hours: Math.floor(s / 3600) % 24,
           mins: Math.floor(s / 60) % 60, secs: s % 60 };
}

export function Countdown({ at }) {
  const [left, setLeft] = useState(() => timeLeft(at));
  useEffect(() => {
    const id = setInterval(() => setLeft(timeLeft(at)), 1000);
    return () => clearInterval(id);
  }, [at]);
  if (!left) return <p className="countdown done">This event has finished — thank you to everyone who came.</p>;
  const pad = n => String(n).padStart(2, '0');
  return (
    <div className="countdown" role="timer">
      {[[left.days, 'Days'], [left.hours, 'Hours'], [left.mins, 'Mins'], [left.secs, 'Secs']].map(([v, l]) => (
        <div key={l}><b>{pad(v)}</b><span>{l}</span></div>
      ))}
    </div>
  );
}

/* One card, two callers: the home page passes a button that flips the form in
   place, the events page passes a link that carries the event in the URL. */
export function EventCard({ event, action, blurb }) {
  const { at, title, time, place, photo, fallback, detail } = event;
  /* Render the known-good stand-in first, then probe for the dedicated event
     photo and swap it in if it exists. Relying on the <img>'s own onError does
     not work here: loading="lazy" defers the request, so the error — and the
     fallback with it — can arrive long after the card is on screen, or never. */
  const [src, setSrc] = useState(A + fallback);
  useEffect(() => {
    const probe = new Image();
    probe.onload = () => setSrc(A + photo);
    probe.src = A + photo;
    return () => { probe.onload = null; };
  }, [photo]);
  const d = new Date(at);
  return (
    <article className="event rv">
      <div className="event-thumb">
        <img src={src} alt={title} width="600" height="375" loading="lazy" />
        <div className="date-chip">
          <b>{String(d.getDate()).padStart(2, '0')}</b>
          <span>{MON[d.getMonth()]} {d.getFullYear()}</span>
        </div>
      </div>
      <div className="event-body">
        <h3>{title}</h3>
        {blurb && detail && <p className="event-detail">{detail}</p>}
        <div className="event-meta">
          <span><Ico n="target" s={15} /> {time}</span>
          <span><Ico n="pin" s={15} /> {place}</span>
        </div>
        <Countdown at={at} />
        {action}
      </div>
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
  const [active, setActive] = useState(current || '/#home');
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
      if (pick) setActive(byEl.get(pick));
    }, { rootMargin: '-45% 0px -50% 0px' });
    byEl.forEach((_, el) => io.observe(el));
    return () => { removeEventListener('scroll', onScroll); removeEventListener('keydown', onKey); io.disconnect(); };
  }, [current]);
  return (
    <header>
      <a className="skip" href="#main">Skip to content</a>
      <Brand />
      <nav className={open ? 'open' : ''} onClick={() => setOpen(false)}>
        {NAV.map(([t, h]) => (
          <a key={h} href={h} className={h === active ? 'active' : ''}
             aria-current={h === active ? 'true' : undefined}>{t}</a>
        ))}
      </nav>
      <div className="head-actions">
        <a className="btn navy sm" href="/#help"><Ico n="heart" s={15} /> I Need Help</a>
        <a className="btn red sm" href="/#donate"><Ico n="heart" s={15} /> Donate Now</a>
        <button className="burger" aria-label={open ? 'Close menu' : 'Open menu'}
                aria-expanded={open} onClick={() => setOpen(!open)}>&#9776;</button>
      </div>
    </header>
  );
}

/* ---------- split CTA ---------- */
export const Cta = () => (
  <section className="cta rv">
    <div className="cta-half navy">
      <Ico n="heart" s={46} />
      <div>
        <h3>Are You or Someone You Know<br />in Need of Support?</h3>
        <p>You don&rsquo;t have to face a difficult situation alone. Share your situation with our team.</p>
        <a className="btn white" href="/#help">I Need Help <Arrow /></a>
      </div>
    </div>
    <div className="cta-half red">
      <Ico n="heart" s={46} />
      <div>
        <h3>Your Kindness Can<br />Become Someone&rsquo;s Hope</h3>
        <p>A contribution can help us reach people and communities facing difficult circumstances.</p>
        <a className="btn white" href="/contact.html">Donate Now <Arrow /></a>
      </div>
    </div>
  </section>
);

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
  ['Foundation', ['About Us', 'Our Mission', 'Our Work', 'Events']],
  ['Get Involved', ['I Need Help', 'Donate', 'Volunteer', 'Partner With Us']],
  ['Information', ['Contact Us', 'Privacy Policy', 'Terms & Conditions']],
];
export const Footer = () => (
  <footer id="contact">
    <div className="foot-grid">
      <div>
        <Brand dark />
        <p>Connecting people who need help with people who can make a difference.</p>
        <div className="social">
          {SOCIAL.filter(([, , , url]) => url).map(([c, label, d, url]) => (
            <a href={url} key={c} className={c} aria-label={label} target="_blank" rel="noopener noreferrer">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d={d} /></svg>
            </a>
          ))}
        </div>
      </div>
      {/* an item appears once LINKS gives it a destination — no href="#" stubs */}
      {FCOLS.map(([h, items]) => (
        <div key={h}><b>{h}</b>
          {items.filter(t => LINKS[t]).map(t => <a key={t} href={LINKS[t]}>{t}</a>)}
        </div>
      ))}
      <div><b>Contact Us</b>
        <a href="tel:+919786923221"><Ico n="phone" s={15} /> +91 97869 23221</a>
        <a href="mailto:info@iandhfoundation.org"><Ico n="mail" s={15} /> info@iandhfoundation.org</a>
        <span><Ico n="pin" s={15} /> Trichy, Tamil Nadu, India</span>
      </div>
    </div>
    <small>&copy; {new Date().getFullYear()} I&amp;H Foundation. All Rights Reserved.</small>
  </footer>
);

/* ---------- reveal-on-scroll + back-to-top, shared by both pages ---------- */
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
    const io = new IntersectionObserver(es => es.forEach(e => {
      if (e.isIntersecting) { e.target.classList.add('in'); io.unobserve(e.target); }
    }), { threshold: .12 });
    document.querySelectorAll('.rv').forEach(n => io.observe(n));
    const f = () => setUp(scrollY > 700);
    addEventListener('scroll', f, { passive: true });
    return () => { io.disconnect(); removeEventListener('scroll', f); };
  }, []);
  return up;
}
export const ToTop = ({ show }) => (
  <button className={'to-top' + (show ? ' show' : '')} aria-label="Back to top"
          onClick={() => scrollTo({ top: 0, behavior: 'smooth' })}>&uarr;</button>
);
