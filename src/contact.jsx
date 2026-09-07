import React, { useState } from 'react';
import { createRoot } from 'react-dom/client';
import { Ico, Arrow, Header, Footer, usePageChrome, ToTop, postForm } from './shared.jsx';

/* A general-enquiry form. People who need support are sent to the support form
   on the home page instead — that one asks the right questions and carries the
   emergency notice, and this one deliberately does not duplicate it. */
const REASONS = ['General enquiry', 'Volunteering', 'Partnership or CSR', 'Donating',
                 'Spreading the word', 'Press or media', 'Something else'];

const DETAILS = [
  ['phone', 'Phone', '+91 97869 23221', 'tel:+919786923221', 'Mon–Sat, 9:00 AM – 6:00 PM'],
  ['mail', 'Email', 'info@iandhfoundation.org', 'mailto:info@iandhfoundation.org', 'We reply within two working days'],
  ['pin', 'Office', 'No. 123, Hope Street, Anna Nagar', null, 'Trichy, Tamil Nadu, India'],
];

const ROUTES = [
  ['heart', 'I need support', 'The support form asks what we need to know to help.', '/#help'],
  ['people', 'I want to volunteer', 'Tell us your skills and where you are based.', '#enquiry'],
  ['handshake', 'Partner or donate', 'Talk to us about CSR programmes and giving.', '#enquiry'],
];

function Enquiry() {
  const [state, setState] = useState('idle');
  // a "Get Involved" link arrives as ?reason=... — start with it chosen
  const fromUrl = new URLSearchParams(location.search).get('reason');
  const [reason, setReason] = useState(REASONS.includes(fromUrl) ? fromUrl : '');
  const submit = async e => {
    e.preventDefault();
    const form = e.target;
    setState('sending');
    const result = await postForm(form);
    if (result === 'ok') form.reset();
    setState(result);
  };
  return (
    <form className="help-form" id="enquiry" onSubmit={submit}>
      <input type="hidden" name="_subject" value="Website enquiry from iandhfoundation.org" />
      <input type="hidden" name="request" value="General enquiry" />
      <input type="text" name="_gotcha" tabIndex={-1} autoComplete="off" className="hp" aria-hidden="true" />

      <div className="field">
        <label htmlFor="c-name">Your name <i>*</i></label>
        <input id="c-name" name="name" type="text" required autoComplete="name" placeholder="Full name" />
      </div>
      <div className="field">
        <label htmlFor="c-email">Email <i>*</i></label>
        <input id="c-email" name="email" type="email" required autoComplete="email" placeholder="you@example.com" />
      </div>
      <div className="field">
        <label htmlFor="c-phone">Phone <small>(optional)</small></label>
        <input id="c-phone" name="phone" type="tel" autoComplete="tel"
               pattern="[0-9\s+\(\)\-]{7,}" placeholder="+91 " />
      </div>
      <div className="field">
        <label htmlFor="c-reason">What is it about? <i>*</i></label>
        <select id="c-reason" name="reason" required value={reason}
                onChange={e => setReason(e.target.value)}>
          <option value="" disabled>Please choose one</option>
          {REASONS.map(r => <option key={r}>{r}</option>)}
        </select>
      </div>
      <div className="field wide">
        <label htmlFor="c-msg">Message <i>*</i></label>
        <textarea id="c-msg" name="message" rows="4" required placeholder="How can we help?" />
      </div>

      <div className="form-foot">
        <button className="btn navy" type="submit" disabled={state === 'sending'}>
          {state === 'sending' ? 'Sending…' : <>Send Message <Arrow /></>}
        </button>
        <p>We use these details only to reply to you. See our <a href="/privacy.html">Privacy Policy</a>.</p>
      </div>

      {state === 'ok' && (
        <p className="form-ok" role="status">Thank you &mdash; your message has been sent. We&rsquo;ll reply within two working days.</p>
      )}
      {state === 'error' && (
        <p className="form-err" role="alert">
          Sorry, that didn&rsquo;t go through. Please try again, or email{' '}
          <a href="mailto:info@iandhfoundation.org">info@iandhfoundation.org</a>.
        </p>
      )}
      {state === 'unset' && (
        <p className="form-err" role="alert">
          This form isn&rsquo;t connected yet, so your message was <b>not</b> sent. Please email{' '}
          <a href="mailto:info@iandhfoundation.org">info@iandhfoundation.org</a> or call{' '}
          <a href="tel:+919786923221">+91 97869 23221</a>.
        </p>
      )}
    </form>
  );
}

function App() {
  const up = usePageChrome();
  return (<>
    <Header current="/contact.html" />
    <main id="main">
      <section className="page-head">
        <div className="page-head-inner">
          <nav className="crumbs" aria-label="Breadcrumb">
            <a href="/#home">Home</a> <span aria-hidden="true">/</span>
            <span aria-current="page">Contact</span>
          </nav>
          <h1>Contact Us</h1>
          <p>Call, email, or send us a message. If you or someone you know needs support,
             the support form is the fastest route to the right person.</p>
        </div>
      </section>

      <section className="contact-details">
        {DETAILS.map(([ic, label, value, href, note]) => (
          <article className="detail rv" key={label}>
            <span><Ico n={ic} s={20} /></span>
            <b>{label}</b>
            {href ? <a href={href}>{value}</a> : <span className="plain">{value}</span>}
            <small>{note}</small>
          </article>
        ))}
      </section>

      <section className="routes">
        {ROUTES.map(([ic, t, d, href]) => (
          <a className="route rv" href={href} key={t}>
            <span><Ico n={ic} s={19} /></span>
            <div><b>{t}</b><p>{d}</p></div>
            <Arrow />
          </a>
        ))}
      </section>

      <section className="help" id="message">
        <div className="help-grid rv">
          <aside className="help-aside">
            <h3>Send us a message</h3>
            <p>For anything that isn&rsquo;t an urgent request for support. We read everything
               and reply within two working days.</p>
            <p className="urgent-note">
              <b>Need support yourself?</b> Use the{' '}
              <a href="/#help">support request form</a> instead — it asks what we need to know.
              In an emergency call 108, police 100, or Childline 1098.
            </p>
            <ul>
              <li><span><Ico n="phone" s={16} /></span><div><b>Prefer to call?</b><a href="tel:+919786923221">+91 97869 23221</a></div></li>
              <li><span><Ico n="target" s={16} /></span><div><b>Office hours</b>Mon–Sat, 9:00 AM – 6:00 PM</div></li>
            </ul>
          </aside>
          <Enquiry />
        </div>
      </section>
    </main>
    <Footer />
    <ToTop show={up} />
  </>);
}
const host = document.getElementById('root');
(host._root ||= createRoot(host)).render(<App />);
