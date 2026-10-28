import React, { useState } from 'react';
import { createRoot } from 'react-dom/client';
import { Ico, Title, Header, Footer, PageHead, usePageChrome, ToTop, postForm, PHONE, EMAIL } from './shared.jsx';

/* A general-enquiry form. People who need support are sent to the support form
   on the home page instead — that one asks the right questions and carries the
   emergency notice, and this one deliberately does not duplicate it. */
const REASONS = ['General enquiry', 'Volunteering', 'Partnership or CSR', 'Donating',
                 'Spreading the word', 'Press or media', 'Something else'];

const DETAILS = [
  ['phone', 'Phone', PHONE[0], PHONE[1], 'Mon to Sat, 9 am to 6 pm'],
  ['mail', 'Email', EMAIL[0], EMAIL[1], 'We reply within two working days'],
  ['pin', 'Office', 'No. 123, Hope Street, Anna Nagar', null, 'Trichy, Tamil Nadu'],
];

const ROUTES = [
  ['I need support', 'The support form asks what we need to know to help you.', '/#help', 'Go to the support form'],
  ['I want to volunteer', 'Tell us your skills and where you are based.', '?reason=Volunteering#message', 'Write to us about volunteering'],
  ['Partner or donate', 'Talk to us about CSR programmes and giving.', '?reason=Partnership%20or%20CSR#message', 'Write to us about partnering'],
];

function Enquiry() {
  const [state, setState] = useState('idle');
  // a "Get involved" link arrives as ?reason=... — start with it chosen
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
    <form className="form" id="enquiry" onSubmit={submit}>
      <input type="hidden" name="_subject" value="Website enquiry from iandhfoundation.org" />
      <input type="hidden" name="request" value="General enquiry" />
      <input type="text" name="_gotcha" tabIndex={-1} autoComplete="off" className="hp" aria-hidden="true" />

      <div className="field">
        <label htmlFor="c-name">Your name</label>
        <input id="c-name" name="name" type="text" required autoComplete="name" />
      </div>
      <div className="field">
        <label htmlFor="c-email">Email</label>
        <input id="c-email" name="email" type="email" required autoComplete="email" />
      </div>
      <div className="field">
        <label htmlFor="c-phone">Phone <small>optional</small></label>
        <input id="c-phone" name="phone" type="tel" autoComplete="tel" inputMode="tel"
               pattern="[0-9\s+\(\)\-]{7,}" placeholder="+91" />
      </div>
      <div className="field">
        <label htmlFor="c-reason">What is it about?</label>
        <select id="c-reason" name="reason" required value={reason}
                onChange={e => setReason(e.target.value)}>
          <option value="" disabled>Choose one</option>
          {REASONS.map(r => <option key={r}>{r}</option>)}
        </select>
      </div>
      <div className="field wide">
        <label htmlFor="c-msg">Message</label>
        <textarea id="c-msg" name="message" rows="5" required />
      </div>

      <div className="form-foot">
        <button className="btn navy" type="submit" disabled={state === 'sending'} aria-busy={state === 'sending'}>
          {state === 'sending' ? 'Sending…' : 'Send message'}
        </button>
        <p>We use these details only to reply to you. <a href="/privacy.html">Privacy policy</a></p>
      </div>

      {state === 'ok' && (
        <p className="form-msg ok" role="status">Message sent. We will reply within two working days.</p>
      )}
      {state === 'error' && (
        <p className="form-msg err" role="alert">
          Your message did not send. Check your connection and try again, or email{' '}
          <a href={EMAIL[1]}>{EMAIL[0]}</a>.
        </p>
      )}
      {state === 'unset' && (
        <p className="form-msg err" role="alert">
          This form is not connected yet, so nothing was sent. Email{' '}
          <a href={EMAIL[1]}>{EMAIL[0]}</a> or call <a href={PHONE[1]}>{PHONE[0]}</a>.
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
      <PageHead crumb="Contact" title="Contact us">
        Call, email or send a message. If you or someone you know needs support, the support
        form is the fastest way to reach the right person.
      </PageHead>

      <section className="wrap section">
        <ul className="details">
          {DETAILS.map(([ic, label, value, href, note]) => (
            <li key={label}>
              <h2><Ico n={ic} s={18} />{label}</h2>
              {href ? <a href={href}>{value}</a> : <p className="value">{value}</p>}
              <p>{note}</p>
            </li>
          ))}
        </ul>
      </section>

      <section className="band">
        <div className="wrap">
          <Title>Where to start</Title>
          <ul className="rules three">
            {ROUTES.map(([t, d, href, cta]) => (
              <li key={t}><h3>{t}</h3><p>{d}</p><a className="link" href={href}>{cta}</a></li>
            ))}
          </ul>
        </div>
      </section>

      <section className="wrap section" id="message">
        <div className="help-grid">
          <div className="help-aside">
            <h2>Send us a message</h2>
            <p>For anything that is not an urgent request for support. We read everything and
               reply within two working days.</p>
            <p className="emergency">
              <b>Need support yourself?</b> Use the <a href="/#help">support form</a> instead;
              it asks what we need to know. In an emergency, call 108 for an ambulance, 100 for
              the police, or 1098 for Childline.
            </p>
          </div>
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
