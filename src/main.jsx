import React, { useEffect, useRef, useState } from 'react';
import { createRoot } from 'react-dom/client';
import { gsap } from 'gsap';
import { A, Ico, Arrow, Title, Header, Footer, Cta, usePageChrome, ToTop, postForm,
         EVENTS, EventCard } from './shared.jsx';
import statsData from '../content/stats.json';
import storiesData from '../content/stories.json';
import galleryData from '../content/gallery.json';
import partnersData from '../content/partners.json';
import testimonialsData from '../content/testimonials.json';

/* ---------- content ---------- */
const WAYS = [
  ['heart', 'navy', 'I Need Help', 'Are you or someone you know facing a difficult situation? We are here to listen and support.', 'Request Help', '#help'],
  ['heart', 'red', 'I Want to Help', 'Your support can bring hope and change lives. Help someone in need today.', 'Help Someone', '#donate'],
  ['people', 'navy', 'Volunteer With Us', 'Give your time, skills and energy to meaningful community work.', 'Become a Volunteer', '#involved'],
  ['people', 'red', 'Partner With Us', 'Work with us to create lasting impact in communities.', 'Become a Partner', '#involved'],
];

// what kinds of support a request can be about
const SUPPORT = ['Education support', 'Health & medical', 'Food support',
                 'Livelihood or skills training', 'Disaster relief', 'Something else'];

const STATS = statsData.items;

const WORK = [
  ['mega', 'Awareness Camps', 'about-classroom.webp'],
  ['cross', 'Health & Medical Camps', 'program-healthcare.webp'],
  ['book', 'Education Support', 'program-education.webp'],
  ['woman', 'Women Empowerment', 'program-women.webp'],
  ['school', 'Child Welfare', 'hero-children.webp'],
  ['home', 'Disaster Relief', 'program-disaster.webp'],
  ['leaf', 'Community Development', 'program-environment.webp'],
  ['heart', 'Poverty Support', 'program-food.webp'],
];

/* [title, blurb, image, full story (optional)].
   Add a fourth entry and a "Read More" disclosure appears for that story. Left
   empty on purpose: these are real people's lives, so the long version has to be
   written from what they actually told you, with their consent to publish it. */
const STORIES = storiesData.items;

/* The gallery is the one place any photo fits, so it carries the least-reused
   images. Programme and event cards need a topically correct photo, so they get
   first claim on the specific ones. */
const GALLERY = galleryData.items;

/* each opens the contact form with the right reason already chosen —
   these used to point at #donate, which is not what any of them are */
const INVOLVED = [
  ['people', 'Volunteer With Us', 'Volunteering'],
  ['heart', 'Partner With Us', 'Partnership or CSR'],
  ['mega', 'Spread Awareness', 'Spreading the word'],
];

/* [name, descriptor, logo file in /images].
   Drop the partner-supplied file in and it replaces the text lockup automatically;
   until the file exists the card falls back to type, so nothing renders broken. */
const PARTNERS = partnersData.items;

/* ---------- hero ---------- */
function Hero() {
  const root = useRef(null);
  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from('.hero-enter', { y: 26, opacity: 0, stagger: .1, duration: .85, ease: 'power3.out', delay: .1 });
      gsap.from('.float-card', { x: 34, opacity: 0, stagger: .13, duration: .8, ease: 'power3.out', delay: .45 });
    }, root);
    return () => ctx.revert();
  }, []);
  return (
    <section className="hero" id="home" ref={root}>
      <div className="hero-photo">
        <img src={A + 'hero-schoolgirl-3d.webp'} alt="Smiling schoolgirl holding her books" width="1200" height="800" fetchPriority="high" />
      </div>
      <div className="hero-inner">
        <div className="hero-copy">
          <h1 className="hero-enter">Together, We Turn<br />Compassion Into <em>Change</em></h1>
          <p className="hero-enter intro">I&amp;H Foundation connects people facing difficult circumstances with donors, volunteers, organizations and individuals who are ready to help.</p>
          <div className="hero-enter actions">
            <a className="btn navy" href="#help"><Ico n="people" s={17} /> I Need Help</a>
            <a className="btn red" href="#donate"><Ico n="heart" s={17} /> I Want to Help</a>
          </div>
          <ul className="pillars hero-enter">
            {[['heart', 'Compassion'], ['people', 'Support'], ['heart', 'Hope'], ['heart', 'Action']].map(([n, t], i) => (
              <li key={t}>{i > 0 && <b>&#9670;</b>}<Ico n={n} s={15} />{t}</li>
            ))}
          </ul>
        </div>
        <div className="floats">
          {[['heart', 'People Helping People'], ['people', 'Community Support'], ['heart', 'Creating Hope']].map(([n, t]) => (
            <div className="float-card" key={t}><span><Ico n={n} s={17} /></span>{t}</div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ---------- how you can help ---------- */
const Ways = () => (
  <section className="ways" id="ways">
    <div className="panel">
      <Title>How You Can Make a Difference</Title>
      <div className="ways-grid">
        {WAYS.map(([ic, tone, t, d, cta, href]) => (
          <article className="way rv" key={t}>
            <span className={'bubble ' + tone}><Ico n={ic} s={24} /></span>
            <h3>{t}</h3><p>{d}</p>
            <a href={href}>{cta} <Arrow /></a>
          </article>
        ))}
      </div>
    </div>
  </section>
);

/* ---------- about + mission/vision ---------- */
const About = () => (
  <section className="about" id="about">
    <div className="about-copy rv">
      <h2>About I&amp;H Foundation<i /></h2>
      <p>I&amp;H Foundation exists to help people who are genuinely in need and to connect them with people who are willing to make a difference.</p>
      <p>We believe that every person deserves dignity, compassion and an opportunity for a better future. Through community initiatives, awareness programs, support activities and partnerships, we work to reach people who need help and connect them with appropriate support.</p>
      <strong>Every Helping Hand Can Create Hope.</strong>
      <a className="btn navy" href="/about.html">Learn More About Us <Arrow /></a>
    </div>
    <div className="about-photo rv"><img src={A + 'program-food.webp'} alt="Volunteers handing out supply kits" width="800" height="600" loading="lazy" /></div>
    <div className="mv rv" id="mission">
      <div className="mv-card navy">
        <span><Ico n="target" s={20} /></span>
        <h3>Our Mission</h3>
        <p className="lead">Helping People in Need.</p>
        <p>Our mission is simple: to help people who are genuinely in need and connect them with people who are willing and able to help.</p>
        <b>Connect. Support. Empower. Create Hope.</b>
      </div>
      <div className="mv-card red">
        <span><Ico n="eye" s={20} /></span>
        <h3>Our Vision</h3>
        <p>To build a compassionate society where people facing difficult circumstances can find support, opportunity and hope, and where individuals and organizations can come together to make a meaningful difference.</p>
      </div>
    </div>
  </section>
);

/* ---------- stats ---------- */
const fmtNum = n => n.toLocaleString('en-IN');

function Stats() {
  const el = useRef(null);
  useEffect(() => {
    // The real figures are already in the markup. Only animate as an enhancement:
    // if this never runs, the section still reads correctly instead of "0+".
    if (matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    const io = new IntersectionObserver(([e], o) => {
      if (!e.isIntersecting) return;
      o.disconnect();
      el.current.querySelectorAll('[data-to]').forEach(n => {
        const to = +n.dataset.to, t0 = performance.now();
        const tick = t => {
          // clamp low: a rAF timestamp can predate the performance.now() above,
          // and a negative p makes the easing render a negative count
          const p = Math.min(Math.max((t - t0) / 1500, 0), 1);
          n.firstChild.nodeValue = fmtNum(Math.round(to * (1 - Math.pow(1 - p, 3))));
          if (p < 1) requestAnimationFrame(tick);
        };
        requestAnimationFrame(tick);
      });
    }, { threshold: .4 });
    io.observe(el.current);
    return () => io.disconnect();
  }, []);
  return (
    <section className="stats-wrap"><div className="stats rv" ref={el}>
      {STATS.map(({ icon, value, label }) => (
        <div className="stat" key={label}>
          <Ico n={icon} s={30} />
          <div><b data-to={value}>{fmtNum(value)}<sup>+</sup></b><span>{label}</span></div>
        </div>
      ))}
      <div className="stats-photo"><img src={A + 'hero-children.webp'} alt="" width="600" height="400" loading="lazy" /></div>
    </div></section>
  );
}

/* ---------- our work ---------- */
const Work = () => (
  <section className="work" id="work">
    <Title sub="Turning compassion into action through community-focused initiatives.">Our Work</Title>
    <div className="work-grid">
      {WORK.map(([ic, t, img]) => (
        <article className="work-card rv" key={t}>
          <h3><span><Ico n={ic} s={19} /></span>{t}</h3>
          <img src={A + img} alt={t} width="400" height="260" loading="lazy" />
        </article>
      ))}
    </div>
    <div className="center"><a className="btn navy" href="#work">View All Our Work <Arrow /></a></div>
  </section>
);

/* ---------- gallery + lightbox ---------- */
function Gallery() {
  const [at, setAt] = useState(-1);            // index of the open image, -1 = closed
  const dlg = useRef(null);
  const step = n => setAt(i => (i + n + GALLERY.length) % GALLERY.length);

  // <dialog> gives focus trapping, Escape and inertness for free
  useEffect(() => {
    const d = dlg.current; if (!d) return;
    if (at >= 0 && !d.open) d.showModal();
    if (at < 0 && d.open) d.close();
  }, [at]);

  useEffect(() => {
    if (at < 0) return;
    const onKey = e => {
      if (e.key === 'ArrowRight') step(1);
      if (e.key === 'ArrowLeft') step(-1);
    };
    addEventListener('keydown', onKey);
    return () => removeEventListener('keydown', onKey);
  }, [at]);

  return (
    <div className="col rv" id="gallery">
      <Title sub="Glimpses from our community initiatives.">Moments of Impact</Title>
      <div className="gal">
        {GALLERY.map(({ image: g, alt }, i) => (
          <button className="gal-item" key={g} onClick={() => setAt(i)} aria-label={`Open image: ${alt}`}>
            <img src={A + g} alt={alt} width="180" height="130" loading="lazy" />
          </button>
        ))}
      </div>
      <div className="center">
        <button className="text-link as-btn" onClick={() => setAt(0)}>View Gallery <Arrow /></button>
      </div>

      <dialog className="lightbox" ref={dlg}
              onClose={() => setAt(-1)}
              onClick={e => { if (e.target === dlg.current) setAt(-1); }}>
        {at >= 0 && (
          <div className="lb-inner">
            <img src={A + GALLERY[at].image} alt={GALLERY[at].alt} />
            <p className="lb-cap">{GALLERY[at].alt}<span>{at + 1} / {GALLERY.length}</span></p>
            <button className="lb-nav prev" onClick={() => step(-1)} aria-label="Previous image">&lsaquo;</button>
            <button className="lb-nav next" onClick={() => step(1)} aria-label="Next image">&rsaquo;</button>
            <button className="lb-close" onClick={() => setAt(-1)} aria-label="Close gallery">&times;</button>
          </div>
        )}
      </dialog>
    </div>
  );
}

/* ---------- upcoming events ---------- */
const Events = ({ onRegister }) => (
  <section className="events" id="events">
    <Title sub="Come along, lend a hand, or tell someone who needs to be there.">Upcoming Events</Title>
    <div className="events-grid">
      {EVENTS.map(ev => (
        <EventCard key={ev.title} event={ev}
          action={<a className="btn navy" href="#help" onClick={() => onRegister(ev.title)}>
                    Register Interest <Arrow /></a>} />
      ))}
    </div>
    <div className="center"><a className="btn navy" href="/events.html">See All Events <Arrow /></a></div>
  </section>
);

/* ---------- donate ---------- */
/* No payment is taken on the site, so this explains how giving actually works
   rather than pretending there is a checkout. The <mark> placeholders are
   account details and figures only the Foundation can supply — they render in
   yellow so this cannot be published half-finished. */
const Todo = ({ children }) => <mark className="todo">[{children}]</mark>;

const WAYS_TO_GIVE = [
  ['phone', 'UPI', <>Send to <Todo>UPI ID</Todo> from any UPI app. Add your name in the note so we can send a receipt.</>],
  ['scale', 'Bank transfer', <>Account <Todo>account name, number and IFSC</Todo>. Email us the reference and we will confirm.</>],
  ['people', 'In person or by cheque', <>Visit the office at No. 123, Hope Street, Anna Nagar, Trichy, or post a cheque made out to <Todo>payee name</Todo>.</>],
];

const Donate = () => (
  <section className="donate" id="donate">
    <Title sub="Every rupee goes into programmes. Here is how to give, and what happens next.">
      Support Our Work
    </Title>
    <div className="donate-grid rv">
      <div className="give-ways">
        {WAYS_TO_GIVE.map(([ic, t, d]) => (
          <article className="give" key={t}>
            <span><Ico n={ic} s={19} /></span>
            <div><h3>{t}</h3><p>{d}</p></div>
          </article>
        ))}
        <p className="give-note">
          Prefer to talk it through, or giving as a company? <a href="/contact.html">Contact our team</a>{' '}
          and we will arrange it with you directly.
        </p>
      </div>

      <aside className="give-aside">
        <h3>What happens to your gift</h3>
        <ul>
          <li><b>You give</b>Send it by UPI, transfer or in person — whatever suits you.</li>
          <li><b>We confirm</b>You get a receipt from us within <Todo>number of working days</Todo>.</li>
          <li><b>It reaches a programme</b>Education, health, food, livelihoods, relief or community work.</li>
          <li><b>We report back</b>Regular donors receive an update on what their giving paid for.</li>
        </ul>
        <p className="give-tax">
          <b>Tax relief:</b> <Todo>state whether donations qualify under section 80G, and give the
          registration number if so — leave this out entirely if they do not</Todo>
        </p>
      </aside>
    </div>
  </section>
);

/* ---------- stories / gallery / get involved ---------- */
function Trio() {
  const [i, setI] = useState(0);
  const { title: t, blurb: d, image: img, full } = STORIES[i];
  return (
    <section className="trio" id="involved">
      <div className="col rv" id="stories">
        <Title sub="Real stories. Real impact.">Stories of Hope</Title>
        <article className="story" aria-live="polite">
          <img src={A + img} alt={t} width="200" height="150" loading="lazy" />
          <div>
            <h4>{t}</h4><p>{d}</p>
            {/* only offered when there is genuinely more to read */}
            {full && <details className="story-more"><summary>Read More <Arrow /></summary><p>{full}</p></details>}
          </div>
        </article>
        <div className="dots">
          {STORIES.map((s, n) => (
            <button key={s.title} className={n === i ? 'on' : ''} onClick={() => setI(n)}
                    aria-current={n === i ? 'true' : undefined}
                    aria-label={`Story ${n + 1} of ${STORIES.length}: ${s.title}`} />
          ))}
        </div>
      </div>
      <Gallery />
      <div className="col rv">
        <Title sub="There are many ways to make a difference.">Get Involved</Title>
        <ul className="inv">
          {INVOLVED.map(([n, t, reason]) => (
            <li key={t}>
              <a href={`/contact.html?reason=${encodeURIComponent(reason)}`}>
                <span><Ico n={n} s={18} /></span>{t}<Arrow />
              </a>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

/* ---------- testimonials ---------- */
/* PLACEHOLDER QUOTES — written to show the layout, not collected from real people.
   Replace with quotes you actually have permission to publish before going live. */
const VOICES = testimonialsData.items;

function Testimonials() {
  const { ref: rail, at, go, sync } = useRail();
  return (
    <section className="voices" id="voices">
      <Title sub="Volunteers, families, donors and partners on working with us.">What People Say</Title>
      <div className="rail-wrap rv">
        <button className="rail-btn" onClick={() => go(-1)} disabled={at.start} aria-label="Previous testimonials">&lsaquo;</button>
        <div className="rail voices-rail" ref={rail} onScroll={sync}>
          {VOICES.map(({ quote, name, detail, role }) => (
            <figure className="voice" key={name}>
              <span className="mark" aria-hidden="true">&ldquo;</span>
              <span className="stars" aria-label="5 out of 5">&#9733;&#9733;&#9733;&#9733;&#9733;</span>
              <blockquote>{quote}</blockquote>
              <figcaption>
                <span className="avatar" aria-hidden="true">{name[0]}</span>
                <span className="who"><b>{name}</b><small>{detail}</small></span>
                <span className="role">{role}</span>
              </figcaption>
            </figure>
          ))}
        </div>
        <button className="rail-btn" onClick={() => go(1)} disabled={at.end} aria-label="Next testimonials">&rsaquo;</button>
      </div>
    </section>
  );
}

/* ---------- partners ---------- */
/* One horizontal rail, used by both the partner strip and the testimonials.
   Steps by a card pitch (never mid-card) and reports when it is at either end
   so the arrows can disable instead of looking broken. */
function useRail() {
  const ref = useRef(null);
  const [at, setAt] = useState({ start: true, end: true });
  const sync = () => {
    const r = ref.current; if (!r) return;
    setAt({ start: r.scrollLeft < 4, end: r.scrollLeft >= r.scrollWidth - r.clientWidth - 4 });
  };
  useEffect(() => {
    sync();
    addEventListener('resize', sync);
    return () => removeEventListener('resize', sync);
  }, []);
  const go = d => {
    const r = ref.current;
    const pitch = r.firstElementChild.offsetWidth + parseFloat(getComputedStyle(r).gap || 0);
    const behavior = matchMedia('(prefers-reduced-motion: reduce)').matches ? 'auto' : 'smooth';
    r.scrollBy({ left: d * pitch, behavior });
  };
  return { ref, at, go, sync };
}

/* Falls back to the text lockup if the logo file is absent or fails to decode,
   so a missing partner asset never shows a broken image. */
function PartnerLogo({ name, sub, file }) {
  const [failed, setFailed] = useState(!file);
  if (failed) return <div className="logo-card"><b>{name}</b><span>{sub}</span></div>;
  return (
    <div className="logo-card has-logo">
      {/* not lazy: 7 small logos, and a deferred request means the text fallback
          would not appear until the card scrolls into view */}
      <img src={A + file} alt={`${name} ${sub}`} onError={() => setFailed(true)} />
    </div>
  );
}

function Partners() {
  const { ref: rail, at, go, sync } = useRail();
  return (
    <section className="partners rv">
      <Title>Our Valued Donors &amp; Partners</Title>
      <div className="rail-wrap">
        <button className="rail-btn" onClick={() => go(-1)} disabled={at.start} aria-label="Previous partners">&lsaquo;</button>
        <div className="rail" ref={rail} onScroll={sync}>
          {PARTNERS.map(({ name, sub, logo }) => <PartnerLogo key={name} name={name} sub={sub} file={logo} />)}
        </div>
        <button className="rail-btn" onClick={() => go(1)} disabled={at.end} aria-label="Next partners">&rsaquo;</button>
      </div>
    </section>
  );
}

/* ---------- request support form ---------- */
// Put your Formspree form id in .env as VITE_FORMSPREE_ID (the bit after /f/ in the
// endpoint Formspree gives you), then restart the dev server.
function HelpForm({ pickedEvent }) {
  const [state, setState] = useState('idle'); // idle | sending | ok | error | unset
  const [mode, setMode] = useState('support'); // support | event
  const [event, setEvent] = useState('');
  // a Register link from /events.html arrives as ?event=... — pick it up on mount
  useEffect(() => {
    const fromUrl = new URLSearchParams(location.search).get('event');
    if (fromUrl && EVENTS.some(e => e.title === fromUrl)) { setMode('event'); setEvent(fromUrl); }
  }, []);
  // a Register button on an event card flips the form over and preselects it
  useEffect(() => {
    if (!pickedEvent) return;
    setMode('event');
    setEvent(pickedEvent);
    setState('idle');
  }, [pickedEvent]);
  const isEvent = mode === 'event';
  const submit = async e => {
    e.preventDefault();
    const form = e.target;
    setState('sending');
    const result = await postForm(form);
    if (result === 'ok') form.reset();
    setState(result);
  };
  const sent = state === 'ok';
  return (
    <section className="help" id="help">
      <Title sub="Ask for help, or register for one of our upcoming events.">Get in Touch</Title>
      <div className="help-grid rv">
        <aside className="help-aside">
          <h3>{isEvent ? 'Good to have you along.' : 'You don’t have to sort this out alone.'}</h3>
          <p>{isEvent
            ? 'Tell us who is coming and we will send you the joining details and directions closer to the day.'
            : 'Share as much or as little as you are comfortable with. We will get back to you within two working days.'}</p>
          {/* the form is read in working hours — say so before someone in a crisis waits on it */}
          {!isEvent && (
            <p className="urgent-note">
              <b>In an emergency, please don&rsquo;t wait for us.</b> We reply within two working
              days. For a medical emergency call 108, police 100, or Childline 1098.
            </p>
          )}
          <ul>
            <li><span><Ico n="phone" s={16} /></span><div><b>Call us</b><a href="tel:+919786923221">+91 97869 23221</a></div></li>
            <li><span><Ico n="mail" s={16} /></span><div><b>Email us</b><a href="mailto:info@iandhfoundation.org">info@iandhfoundation.org</a></div></li>
            <li><span><Ico n="pin" s={16} /></span><div><b>Visit us</b>Trichy, Tamil Nadu, India</div></li>
          </ul>
        </aside>

        <form className="help-form" onSubmit={submit} noValidate={false}>
          <input type="hidden" name="_subject"
                 value={isEvent ? 'Event registration from iandhfoundation.org'
                                : 'New support request from iandhfoundation.org'} />
          <fieldset className="mode field wide">
            <legend>What is this about? <i>*</i></legend>
            <label className={!isEvent ? 'on' : ''}>
              <input type="radio" name="request" value="Support request" checked={!isEvent}
                     onChange={() => setMode('support')} /> I need support
            </label>
            <label className={isEvent ? 'on' : ''}>
              <input type="radio" name="request" value="Event registration" checked={isEvent}
                     onChange={() => setMode('event')} /> Registering for an event
            </label>
          </fieldset>
          <input type="text" name="_gotcha" tabIndex={-1} autoComplete="off" className="hp" aria-hidden="true" />
          <div className="field">
            <label htmlFor="hf-name">Your name <i>*</i></label>
            <input id="hf-name" name="name" type="text" required autoComplete="name" placeholder="Full name" />
          </div>
          <div className="field">
            <label htmlFor="hf-phone">Phone number <i>*</i></label>
            <input id="hf-phone" name="phone" type="tel" required autoComplete="tel"
                   pattern="[0-9\s+\(\)\-]{7,}" placeholder="+91 " />
          </div>
          <div className="field">
            <label htmlFor="hf-email">Email <small>(optional)</small></label>
            <input id="hf-email" name="email" type="email" autoComplete="email" placeholder="you@example.com" />
          </div>
          <div className="field">
            <label htmlFor="hf-place">Town or district <i>*</i></label>
            <input id="hf-place" name="place" type="text" required placeholder="Where you are based" />
          </div>
          {/* rendered, not hidden: a display:none required control blocks submit
              and the browser cannot focus it to show the error */}
          {isEvent ? (
            <div className="field wide">
              <label htmlFor="hf-event">Which event? <i>*</i></label>
              <select id="hf-event" name="event" required value={event}
                      onChange={e => setEvent(e.target.value)}>
                <option value="" disabled>Please choose one</option>
                {EVENTS.map(({ title }) => <option key={title}>{title}</option>)}
              </select>
            </div>
          ) : (
            <div className="field wide">
              <label htmlFor="hf-type">What kind of support do you need? <i>*</i></label>
              <select id="hf-type" name="type" required defaultValue="">
                <option value="" disabled>Please choose one</option>
                {SUPPORT.map(s => <option key={s}>{s}</option>)}
              </select>
            </div>
          )}
          <div className="field wide">
            <label htmlFor="hf-msg">
              {isEvent ? <>Anything we should know? <small>(optional)</small></>
                       : <>Tell us about the situation <i>*</i></>}
            </label>
            <textarea id="hf-msg" name="message" rows="4" required={!isEvent}
                      placeholder={isEvent ? 'How many are coming, access needs, questions…'
                                           : 'What is happening, and what would help most?'} />
          </div>
          <div className="form-foot">
            <button className="btn navy" type="submit" disabled={state === 'sending'} aria-busy={state === 'sending'}>
              {state === 'sending' ? 'Sending…'
                : <>{isEvent ? 'Confirm Registration' : 'Send Request'} <Arrow /></>}
            </button>
            <p>We use these details only to contact you about this request.</p>
          </div>
          {sent && (
            <p className="form-ok" role="status">
              {isEvent ? (
                <>Thank you &mdash; your registration has been sent. We&rsquo;ll be in touch
                  with joining details and directions before the day.</>
              ) : (
                <>Thank you &mdash; your request has been sent. If this is urgent, please also
                  call <a href="tel:+919786923221">+91 97869 23221</a>.</>
              )}
            </p>
          )}
          {state === 'error' && (
            <p className="form-err" role="alert">
              Sorry, that didn&rsquo;t go through. Please try again, or call us on
              {' '}<a href="tel:+919786923221">+91 97869 23221</a>.
            </p>
          )}
          {state === 'unset' && (
            <p className="form-err" role="alert">
              This form isn&rsquo;t connected yet, so your message was <b>not</b> sent. Please call
              {' '}<a href="tel:+919786923221">+91 97869 23221</a> or email
              {' '}<a href="mailto:info@iandhfoundation.org">info@iandhfoundation.org</a>.
            </p>
          )}
        </form>
      </div>
    </section>
  );
}

/* ---------- newsletter ---------- */
function Newsletter() {
  const [state, setState] = useState('idle');
  const submit = async e => {
    e.preventDefault();
    const form = e.target;
    setState('sending');
    const result = await postForm(form);
    if (result === 'ok') form.reset();
    setState(result);
  };
  return (
    <section className="news rv" id="newsletter">
      <div className="news-copy">
        <span><Ico n="mail" s={22} /></span>
        <div>
          <h3>Stay in the loop</h3>
          <p>Occasional updates on our work, upcoming camps and where support is needed most.</p>
        </div>
      </div>
      <form className="news-form" onSubmit={submit}>
        <input type="hidden" name="_subject" value="Newsletter signup from iandhfoundation.org" />
        <input type="hidden" name="request" value="Newsletter signup" />
        <input type="text" name="_gotcha" tabIndex={-1} autoComplete="off" className="hp" aria-hidden="true" />
        <label className="sr-only" htmlFor="nl-email">Email address</label>
        <input id="nl-email" name="email" type="email" required autoComplete="email"
               placeholder="you@example.com" />
        <button className="btn red" type="submit" disabled={state === 'sending'}>
          {state === 'sending' ? 'Signing up…' : <>Subscribe <Arrow /></>}
        </button>
        <p className="news-note">A few times a year, never shared. Unsubscribe any time.</p>
        {state === 'ok' && <p className="news-msg ok" role="status">Thanks &mdash; you&rsquo;re on the list.</p>}
        {state === 'error' && <p className="news-msg err" role="alert">That didn&rsquo;t go through. Please try again.</p>}
        {state === 'unset' && (
          <p className="news-msg err" role="alert">
            Sign-up isn&rsquo;t connected yet, so you were <b>not</b> added. Email{' '}
            <a href="mailto:info@iandhfoundation.org">info@iandhfoundation.org</a> to be added manually.
          </p>
        )}
      </form>
    </section>
  );
}

/* ---------- app ---------- */
function App() {
  const up = usePageChrome();
  // set by an event card's Register button; the form switches mode and preselects it
  const [pickedEvent, setPickedEvent] = useState(null);
  return (<>
    <Header />
    <main id="main">
      <Hero /><Ways /><About /><Stats /><Work />
      <Events onRegister={setPickedEvent} />
      <Trio /><Testimonials /><Donate /><Partners />
      <HelpForm pickedEvent={pickedEvent} />
      <Cta />
      <Newsletter />
    </main>
    <Footer />
    <ToTop show={up} />
  </>);
}
// reuse the root across HMR updates; calling createRoot twice on one container warns
const host = document.getElementById('root');
(host._root ||= createRoot(host)).render(<App />);
