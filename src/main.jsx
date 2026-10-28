import React, { useEffect, useRef, useState } from 'react';
import { createRoot } from 'react-dom/client';
import { A, Ico, Title, Header, Footer, Doors, Kolam, usePageChrome, ToTop, postForm,
         EVENTS, EventRow, PHONE, EMAIL, LINKS } from './shared.jsx';
import { isUpcoming } from './when.js';
import statsData from '../content/stats.json';
import storiesData from '../content/stories.json';
import galleryData from '../content/gallery.json';
import partnersData from '../content/partners.json';
import testimonialsData from '../content/testimonials.json';

/* ---------- content ---------- */
// what kinds of support a request can be about
const SUPPORT = ['Education support', 'Health and medical', 'Food support',
                 'Livelihood or skills training', 'Disaster relief', 'Something else'];

const STATS = statsData.items;

const WORK = [
  ['Awareness camps', 'about-classroom.webp'],
  ['Health and medical camps', 'program-healthcare.webp'],
  ['Education support', 'program-education.webp'],
  ['Women’s empowerment', 'program-women.webp'],
  ['Child welfare', 'hero-children.webp'],
  ['Disaster relief', 'program-disaster.webp'],
  ['Community development', 'program-environment.webp'],
  ['Poverty support', 'program-food.webp'],
];

/* [title, blurb, image, full story (optional)].
   Add a "full" entry and a "Read the full story" disclosure appears for that
   story. Left empty on purpose: these are real people's lives, so the long
   version has to be written from what they told you, with their consent. */
const STORIES = storiesData.items;

/* The gallery is the one place any photo fits, so it carries the least-reused
   images. Programme and event rows need a topically correct photo. */
const GALLERY = galleryData.items;

/* [name, descriptor, logo file in /images].
   Drop the partner-supplied file in and it replaces the text automatically. */
const PARTNERS = partnersData.items;

/* PLACEHOLDER QUOTES — written to show the layout, not collected from real people.
   Replace with quotes you actually have permission to publish before going live. */
const VOICES = testimonialsData.items;

const Chevron = ({ left }) => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2"
       strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <path d={left ? 'M15 5l-7 7 7 7' : 'M9 5l7 7-7 7'} />
  </svg>
);

/* ---------- hero ---------- */
const Hero = () => (
  <section className="hero" id="home">
    <div className="hero-copy">
      <h1>We connect people who need help with people ready to give it.</h1>
      <p className="lead">Families across Tamil Nadu tell us what they are facing. We find the
        donors, volunteers and partner organisations who can help, and we stay involved until
        something actually changes.</p>
      <Doors />
    </div>
    <div className="hero-media">
      <div className="hero-photo">
        <img src={A + 'hero-schoolgirl-3d.webp'} alt="A schoolgirl in uniform holding her books, classmates behind her"
             width="1200" height="800" fetchPriority="high" />
      </div>
      <Kolam className="draw" />
    </div>
  </section>
);

/* ---------- who we are + figures ---------- */
const fmtNum = n => n.toLocaleString('en-IN');

const About = () => (
  <section className="wrap section" id="about">
    <div className="intro">
      <h2>Who we are</h2>
      <div className="intro-copy">
        <p>I&amp;H Foundation exists to help people who are genuinely in need, and to connect
           them with people who are willing to make a difference.</p>
        <p>We believe every person deserves dignity, compassion and a fair chance at a better
           future. Through community programmes, awareness camps and partnerships, we reach
           people who need help and link them to the right support.</p>
        <a className="link" href="/about.html">Read more about us</a>
      </div>
    </div>
    <ul className="figures">
      {STATS.map(({ value, label }) => (
        <li key={label}><b>{fmtNum(value)}+</b><span>{label}</span></li>
      ))}
    </ul>
  </section>
);

/* ---------- our work ---------- */
const Work = () => (
  <section className="band" id="work">
    <div className="wrap">
      <Title sub="The support people ask us for most, run with local volunteers and partner organisations.">
        Our work
      </Title>
      <ul className="work-grid">
        {WORK.map(([t, img]) => (
          <li className="work-tile" key={t}>
            <img src={A + img} alt="" width="400" height="500" loading="lazy" />
            <span>{t}</span>
          </li>
        ))}
      </ul>
    </div>
  </section>
);

/* ---------- stories + gallery ---------- */
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
    <div className="gallery" id="gallery">
      <h3>From our programmes</h3>
      <ul className="gal">
        {GALLERY.map(({ image: g, alt }, i) => (
          <li key={g}>
            <button className="gal-item" onClick={() => setAt(i)} aria-label={`Open photo: ${alt}`}>
              <img src={A + g} alt="" width="300" height="225" loading="lazy" />
            </button>
          </li>
        ))}
      </ul>

      <dialog className="lightbox" ref={dlg}
              onClose={() => setAt(-1)}
              onClick={e => { if (e.target === dlg.current) setAt(-1); }}>
        {at >= 0 && (
          <div className="lb-inner">
            <img src={A + GALLERY[at].image} alt={GALLERY[at].alt} />
            <p className="lb-cap">{GALLERY[at].alt}<span>{at + 1} of {GALLERY.length}</span></p>
            <button className="lb-nav prev" onClick={() => step(-1)} aria-label="Previous photo"><Chevron left /></button>
            <button className="lb-nav next" onClick={() => step(1)} aria-label="Next photo"><Chevron /></button>
            <button className="lb-close" onClick={() => setAt(-1)} aria-label="Close">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4"
                   strokeLinecap="round" aria-hidden="true"><path d="M6 6l12 12M18 6L6 18" /></svg>
            </button>
          </div>
        )}
      </dialog>
    </div>
  );
}

function Stories() {
  const [i, setI] = useState(0);
  const n = STORIES.length;
  const { title, blurb, image, full } = STORIES[i];
  return (
    <section className="wrap section" id="stories">
      <Title sub="What changed for some of the people we have worked with.">Stories</Title>
      <article className="story">
        <div className="story-photo"><img src={A + image} alt="" width="800" height="600" loading="lazy" /></div>
        <div className="story-text">
          <div aria-live="polite">
            <h3>{title}</h3>
            <p>{blurb}</p>
            {/* only offered when there is genuinely more to read */}
            {full && <details className="story-more"><summary>Read the full story</summary><p>{full}</p></details>}
          </div>
          {n > 1 && (
            <div className="story-nav">
              <button className="round" onClick={() => setI((i - 1 + n) % n)} aria-label="Previous story"><Chevron left /></button>
              <span>{i + 1} of {n}</span>
              <button className="round" onClick={() => setI((i + 1) % n)} aria-label="Next story"><Chevron /></button>
            </div>
          )}
        </div>
      </article>
      <Gallery />
    </section>
  );
}

/* ---------- upcoming events ---------- */
const Events = ({ onRegister }) => {
  const upcoming = EVENTS.filter(e => isUpcoming(e.at)).slice(0, 3);
  return (
    <section className="wrap section" id="events">
      <Title sub="Come along, lend a hand, or tell someone who needs to be there."
             action={<a className="link" href="/events.html">All events</a>}>
        Upcoming events
      </Title>
      {upcoming.length ? (
        <div className="events">
          {upcoming.map(ev => (
            <EventRow key={ev.title} event={ev}
              action={<a className="btn navy sm" href="#help" onClick={() => onRegister(ev.title)}>Register interest</a>} />
          ))}
        </div>
      ) : (
        <p className="empty">Nothing is scheduled right now. New camps and drives appear here
          as they are confirmed; <a href="#newsletter">join the newsletter</a> to hear first.</p>
      )}
    </section>
  );
};

/* ---------- testimonials ---------- */
/* Horizontal rail: steps by one card pitch and reports when it is at either
   end so the arrows can disable instead of looking broken. */
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
    const pitch = r.firstElementChild.offsetWidth + parseFloat(getComputedStyle(r).columnGap || 0);
    const behavior = matchMedia('(prefers-reduced-motion: reduce)').matches ? 'auto' : 'smooth';
    r.scrollBy({ left: d * pitch, behavior });
  };
  return { ref, at, go, sync };
}

function Voices() {
  const { ref, at, go, sync } = useRail();
  return (
    <section className="band" id="voices">
      <div className="wrap">
        <Title sub="Volunteers, families, donors and partners on working with us."
               action={!(at.start && at.end) && (
                 <div className="rail-btns">
                   <button className="round" onClick={() => go(-1)} disabled={at.start} aria-label="Previous quotes"><Chevron left /></button>
                   <button className="round" onClick={() => go(1)} disabled={at.end} aria-label="Next quotes"><Chevron /></button>
                 </div>
               )}>
          In their words
        </Title>
        <div className="rail" ref={ref} onScroll={sync}>
          {VOICES.map(({ quote, name, detail }) => (
            <figure className="voice" key={name}>
              <blockquote>{quote}</blockquote>
              <figcaption><b>{name}</b>{detail}</figcaption>
            </figure>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ---------- ways to help + donate ---------- */
/* No payment is taken on the site, so this explains how giving actually works
   rather than pretending there is a checkout. The <mark> placeholders are
   account details and figures only the Foundation can supply — they render in
   yellow so this cannot be published half-finished. */
const Todo = ({ children }) => <mark className="todo">[{children}]</mark>;

const WAYS_TO_GIVE = [
  ['UPI', <>Send to <Todo>UPI ID</Todo> from any UPI app. Add your name in the note so we can send a receipt.</>],
  ['Bank transfer', <>Account <Todo>account name, number and IFSC</Todo>. Email us the reference and we will confirm.</>],
  ['In person or by cheque', <>Visit the office at No. 123, Hope Street, Anna Nagar, Trichy, or post a cheque made out to <Todo>payee name</Todo>.</>],
];

const OTHER_WAYS = [
  ['Volunteer', 'Give your time and skills to camps, drives and community work near you.', 'Offer to volunteer', LINKS['Volunteer']],
  ['Partner with us', 'Companies, trusts and community groups can run programmes with us.', 'Talk to us about partnering', LINKS['Partner with us']],
  ['Spread the word', 'Tell someone who needs help that we exist, or share our events.', 'Get in touch', '/contact.html?reason=Spreading%20the%20word'],
];

const Involved = () => (
  <section className="wrap section" id="involved">
    <Title sub="Give money, give time, or bring your organisation in.">Ways to help</Title>
    <div className="giving" id="donate">
      <div>
        <h3>Give</h3>
        <p className="give-intro">There is no payment form on this site. Use any of these, and every rupee goes into programmes.</p>
        <dl className="give-list">
          {WAYS_TO_GIVE.map(([t, d]) => <div key={t}><dt>{t}</dt><dd>{d}</dd></div>)}
        </dl>
        <p className="give-note">Giving as a company, or want to talk it through?{' '}
          <a href="/contact.html?reason=Donating">Contact our team</a> and we will arrange it with you.</p>
      </div>
      <aside className="give-steps">
        <h3>What happens to your gift</h3>
        <ol>
          <li><b>You give</b>By UPI, bank transfer or in person, whichever suits you.</li>
          <li><b>We confirm</b>You get a receipt from us within <Todo>number of working days</Todo>.</li>
          <li><b>It reaches a programme</b>Education, health, food, livelihoods, relief or community work.</li>
          <li><b>We report back</b>Regular donors receive an update on what their giving paid for.</li>
        </ol>
        <p className="give-tax"><b>Tax relief:</b> <Todo>state whether donations qualify under section 80G, and give the
          registration number if so; leave this out entirely if they do not</Todo></p>
      </aside>
    </div>
    <ul className="ways">
      {OTHER_WAYS.map(([t, d, cta, href]) => (
        <li key={t}><h3>{t}</h3><p>{d}</p><a className="link" href={href}>{cta}</a></li>
      ))}
    </ul>
  </section>
);

/* ---------- supporters ---------- */
/* Falls back to the name in type if the logo file is absent or fails to decode,
   so a missing partner asset never shows a broken image. */
function PartnerLogo({ name, sub, file }) {
  const [failed, setFailed] = useState(!file);
  if (failed) return <span className="partner-name"><b>{name}</b> {sub}</span>;
  // not lazy: a deferred request means the text fallback would appear late or never
  return <img src={A + file} alt={`${name} ${sub}`} onError={() => setFailed(true)} />;
}

const Partners = () => (
  <section className="wrap partners" aria-labelledby="partners-h">
    <h2 id="partners-h">Supported by</h2>
    <ul>
      {PARTNERS.map(({ name, sub, logo }) => <li key={name}><PartnerLogo name={name} sub={sub} file={logo} /></li>)}
    </ul>
  </section>
);

/* ---------- ask for help / event registration ---------- */
// Put your Formspree form id in .env as VITE_FORMSPREE_ID (the bit after /f/ in the
// endpoint Formspree gives you), then restart the dev server.
function HelpForm({ pickedEvent }) {
  const [state, setState] = useState('idle'); // idle | sending | ok | error | unset
  const [mode, setMode] = useState('support'); // support | event
  const [event, setEvent] = useState('');
  const upcoming = EVENTS.filter(e => isUpcoming(e.at));
  // a Register link from /events.html arrives as ?event=... — pick it up on mount
  useEffect(() => {
    const fromUrl = new URLSearchParams(location.search).get('event');
    if (fromUrl && upcoming.some(e => e.title === fromUrl)) { setMode('event'); setEvent(fromUrl); }
  }, []);
  // a Register button on an event row flips the form over and preselects it
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
  return (
    <section className="band" id="help">
      <div className="wrap help-grid">
        <div className="help-aside">
          <h2>{isEvent ? 'Register for an event' : 'Ask for help'}</h2>
          <p>{isEvent
            ? 'Tell us who is coming and we will send joining details and directions closer to the day.'
            : 'Share as much or as little as you are comfortable with. We reply within two working days.'}</p>
          {/* the form is read in working hours — say so before someone in a crisis waits on it */}
          {!isEvent && (
            <p className="emergency">
              <b>In an emergency, do not wait for us.</b> Call 108 for an ambulance, 100 for
              the police, or 1098 for Childline.
            </p>
          )}
          <ul className="contact-list">
            <li><Ico n="phone" s={18} /><span>Call us<a href={PHONE[1]}>{PHONE[0]}</a></span></li>
            <li><Ico n="mail" s={18} /><span>Email us<a href={EMAIL[1]}>{EMAIL[0]}</a></span></li>
            <li><Ico n="clock" s={18} /><span>Office hours<b>Mon to Sat, 9 am to 6 pm</b></span></li>
          </ul>
        </div>

        <form className="form" onSubmit={submit}>
          <input type="hidden" name="_subject"
                 value={isEvent ? 'Event registration from iandhfoundation.org'
                                : 'New support request from iandhfoundation.org'} />
          <fieldset className="field wide">
            <legend>What is this about?</legend>
            <div className="seg">
              <label className={!isEvent ? 'on' : ''}>
                <input type="radio" name="request" value="Support request" checked={!isEvent}
                       onChange={() => setMode('support')} /> I need support
              </label>
              <label className={isEvent ? 'on' : ''}>
                <input type="radio" name="request" value="Event registration" checked={isEvent}
                       onChange={() => setMode('event')} /> Registering for an event
              </label>
            </div>
          </fieldset>
          <input type="text" name="_gotcha" tabIndex={-1} autoComplete="off" className="hp" aria-hidden="true" />
          <div className="field">
            <label htmlFor="hf-name">Your name</label>
            <input id="hf-name" name="name" type="text" required autoComplete="name" />
          </div>
          <div className="field">
            <label htmlFor="hf-phone">Phone number</label>
            <input id="hf-phone" name="phone" type="tel" required autoComplete="tel" inputMode="tel"
                   pattern="[0-9\s+\(\)\-]{7,}" placeholder="+91" />
          </div>
          <div className="field">
            <label htmlFor="hf-email">Email <small>optional</small></label>
            <input id="hf-email" name="email" type="email" autoComplete="email" />
          </div>
          <div className="field">
            <label htmlFor="hf-place">Town or district</label>
            <input id="hf-place" name="place" type="text" required autoComplete="address-level2" />
          </div>
          {/* rendered, not hidden: a display:none required control blocks submit
              and the browser cannot focus it to show the error */}
          {isEvent ? (
            <div className="field wide">
              <label htmlFor="hf-event">Which event?</label>
              <select id="hf-event" name="event" required value={event}
                      onChange={e => setEvent(e.target.value)}>
                <option value="" disabled>Choose an event</option>
                {upcoming.map(({ title }) => <option key={title}>{title}</option>)}
              </select>
            </div>
          ) : (
            <div className="field wide">
              <label htmlFor="hf-type">What kind of support do you need?</label>
              <select id="hf-type" name="type" required defaultValue="">
                <option value="" disabled>Choose one</option>
                {SUPPORT.map(s => <option key={s}>{s}</option>)}
              </select>
            </div>
          )}
          <div className="field wide">
            <label htmlFor="hf-msg">
              {isEvent ? <>Anything we should know? <small>optional</small></> : 'Tell us about the situation'}
            </label>
            <textarea id="hf-msg" name="message" rows="5" required={!isEvent}
                      placeholder={isEvent ? 'How many are coming, access needs, questions'
                                           : 'What is happening, and what would help most?'} />
          </div>
          <div className="form-foot">
            <button className="btn navy" type="submit" disabled={state === 'sending'} aria-busy={state === 'sending'}>
              {state === 'sending' ? 'Sending…' : isEvent ? 'Register' : 'Send request'}
            </button>
            <p>We use these details only to contact you about this request. <a href="/privacy.html">Privacy policy</a></p>
          </div>
          {state === 'ok' && (
            <p className="form-msg ok" role="status">
              {isEvent ? 'Registered. We will send joining details and directions before the day.'
                       : <>Request sent. If it is urgent, also call <a href={PHONE[1]}>{PHONE[0]}</a>.</>}
            </p>
          )}
          {state === 'error' && (
            <p className="form-msg err" role="alert">
              Your {isEvent ? 'registration' : 'request'} did not send. Check your connection and try
              again, or call <a href={PHONE[1]}>{PHONE[0]}</a>.
            </p>
          )}
          {state === 'unset' && (
            <p className="form-msg err" role="alert">
              This form is not connected yet, so nothing was sent. Call{' '}
              <a href={PHONE[1]}>{PHONE[0]}</a> or email <a href={EMAIL[1]}>{EMAIL[0]}</a>.
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
    <section className="news" id="newsletter">
      <div className="wrap news-grid">
        <div>
          <h2>Hear about new camps and drives</h2>
          <p>A few emails a year about our work and where help is needed. Never shared, and you can unsubscribe any time.</p>
        </div>
        <form className="news-form" onSubmit={submit}>
          <input type="hidden" name="_subject" value="Newsletter signup from iandhfoundation.org" />
          <input type="hidden" name="request" value="Newsletter signup" />
          <input type="text" name="_gotcha" tabIndex={-1} autoComplete="off" className="hp" aria-hidden="true" />
          <label className="sr-only" htmlFor="nl-email">Email address</label>
          <input id="nl-email" name="email" type="email" required autoComplete="email" placeholder="Your email address" />
          <button className="btn red" type="submit" disabled={state === 'sending'}>
            {state === 'sending' ? 'Subscribing…' : 'Subscribe'}
          </button>
          {state === 'ok' && <p className="news-msg ok" role="status">Subscribed. Look out for our next update.</p>}
          {state === 'error' && <p className="news-msg err" role="alert">That did not go through. Check your connection and try again.</p>}
          {state === 'unset' && (
            <p className="news-msg err" role="alert">
              Sign-up is not connected yet, so you were not added. Email <a href={EMAIL[1]}>{EMAIL[0]}</a> and we will add you.
            </p>
          )}
        </form>
      </div>
    </section>
  );
}

/* ---------- app ---------- */
function App() {
  const up = usePageChrome();
  // set by an event row's Register button; the form switches mode and preselects it
  const [pickedEvent, setPickedEvent] = useState(null);
  return (<>
    <Header />
    <main id="main">
      <Hero /><About /><Work /><Stories />
      <Events onRegister={setPickedEvent} />
      <Voices /><Involved /><Partners />
      <HelpForm pickedEvent={pickedEvent} />
      <Newsletter />
    </main>
    <Footer />
    <ToTop show={up} />
  </>);
}
// reuse the root across HMR updates; calling createRoot twice on one container warns
const host = document.getElementById('root');
(host._root ||= createRoot(host)).render(<App />);
