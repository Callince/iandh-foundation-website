import React from 'react';
import { createRoot } from 'react-dom/client';
import { Ico, Header, Footer, usePageChrome, ToTop } from './shared.jsx';

/* Everything stated here is derived from what the site's code actually does:
   two forms posting to Formspree, Google Fonts loaded from a CDN, no cookies,
   no analytics, no tracking scripts. If the site gains any of those, this page
   has to change with it.

   The <Todo> bits are facts only I&H Foundation can supply. They render in
   yellow on purpose — this page should look unfinished until they are filled in,
   so it cannot be published half-done by accident. */
const Todo = ({ children }) => <mark className="todo">[{children}]</mark>;

const COLLECTED = [
  ['Name', 'Support request form', 'Required', 'So we know who we are speaking to.'],
  ['Phone number', 'Support request form', 'Required', 'Usually the fastest way to reach you.'],
  ['Email address', 'Support form (optional) · Newsletter (required)', 'Optional / Required',
   'To reply, or to send newsletter updates.'],
  ['Town or district', 'Support request form', 'Required',
   'To route your request to the right team or partner.'],
  ['Type of support needed', 'Support request form', 'Required',
   'To pass your request to the right programme.'],
  ['Which event', 'Event registration', 'Required',
   'To know who is coming and send joining details.'],
  ['Your message', 'Support form (required) · Event registration (optional)', 'Varies',
   'Whatever you choose to tell us about your situation.'],
];

const RIGHTS = [
  ['Ask what we hold', 'Request a copy of the personal data we have about you.'],
  ['Correct it', 'Ask us to fix anything inaccurate or incomplete.'],
  ['Have it erased', 'Ask us to delete your data, unless we are required to keep it.'],
  ['Withdraw consent', 'Change your mind at any time. Withdrawing is as easy as giving it.'],
  ['Nominate someone', 'Name a person to exercise these rights if you cannot.'],
  ['Complain', 'Raise a grievance with us, and with the Data Protection Board of India.'],
];

const Section = ({ id, n, title, children }) => (
  <section className="legal-sec" id={id}>
    <h2><span>{n}</span>{title}</h2>
    {children}
  </section>
);

function App() {
  const up = usePageChrome();
  return (<>
    <Header current="/privacy.html" />
    <main id="main">
      <section className="page-head">
        <div className="page-head-inner">
          <nav className="crumbs" aria-label="Breadcrumb">
            <a href="/#home">Home</a> <span aria-hidden="true">/</span>
            <span aria-current="page">Privacy Policy</span>
          </nav>
          <h1>Privacy Policy</h1>
          <p>What we collect when you contact us, why we collect it, who else can see it,
             and how to get it removed.</p>
          <p className="page-head-meta">Last updated <Todo>date this policy was approved</Todo></p>
        </div>
      </section>

      <div className="legal">
        <aside className="legal-note">
          <Ico n="eye" s={20} />
          <div>
            <b>In short</b>
            <p>We only ask for what we need to help you. We do not use cookies, analytics or
               advertising trackers on this site, and we never sell or rent your details.
               Ask us to delete your information and we will.</p>
          </div>
        </aside>

        <Section id="who" n="1" title="Who we are">
          <p>This site is run by I&amp;H Foundation, <Todo>registered legal name and
             registration or trust number</Todo>, at No. 123, Hope Street, Anna Nagar,
             Trichy, Tamil Nadu, India.</p>
          <p>For anything about your personal data, contact <Todo>name and title of the person
             responsible for data requests</Todo> at{' '}
            <a href="mailto:info@iandhfoundation.org">info@iandhfoundation.org</a> or{' '}
            <a href="tel:+919786923221">+91 97869 23221</a>.</p>
        </Section>

        <Section id="collect" n="2" title="What we collect">
          <p>Only what you type into one of our two forms. We do not collect anything in the
             background, and there is no account to create.</p>
          <div className="legal-table-wrap">
            <table className="legal-table">
              <thead><tr><th>Information</th><th>Where from</th><th>Required?</th><th>Why we need it</th></tr></thead>
              <tbody>
                {COLLECTED.map(([what, where, req, why]) => (
                  <tr key={what + where}><td><b>{what}</b></td><td>{where}</td><td>{req}</td><td>{why}</td></tr>
                ))}
              </tbody>
            </table>
          </div>
          <p className="legal-callout">Please share only what is necessary. A support request
             is free text, so it can end up containing sensitive details about health, money
             or family circumstances. Tell us what we need to help — you are not required to
             tell us everything.</p>
        </Section>

        <Section id="why" n="3" title="Why we use it, and on what basis">
          <p>We use your details to respond to your request, to arrange the support or event
             place you asked for, and — if you signed up for the newsletter — to send you
             updates. That is all.</p>
          <p>We rely on your consent, given when you submit a form. We do not use your
             information to make automated decisions about you, and we do not profile you.</p>
        </Section>

        <Section id="sharing" n="4" title="Who else can see it">
          <ul className="legal-list">
            <li><b>Formspree</b> — form submissions are delivered to us through Formspree, a
              form service operated in the United States. Your submission passes through and
              is stored on their systems. See their privacy policy at{' '}
              <a href="https://formspree.io/legal/privacy-policy/" target="_blank" rel="noopener noreferrer">
                formspree.io/legal/privacy-policy</a>. This means your data leaves India.</li>
            <li><b>Google Fonts</b> — our typefaces load from Google's servers, so Google
              receives your IP address and browser details when a page loads. No form data is
              involved. This can be removed by self-hosting the fonts if you would prefer it.</li>
            <li><b>Our hosting provider</b> — <Todo>name of host once the site is deployed</Todo>,
              which keeps standard server logs.</li>
            <li><b>Partner organisations</b> — where your request is best met by a partner, we
              share only what that partner needs in order to help, and only with your agreement.</li>
          </ul>
          <p>We do not sell, rent or trade your personal data, and we do not share it for
             advertising.</p>
        </Section>

        <Section id="keep" n="5" title="How long we keep it">
          <p>Support requests are kept for <Todo>retention period, e.g. 24 months</Todo> so we
             can follow up and report on our work, then deleted. Newsletter details are kept
             until you unsubscribe. Ask us to delete yours sooner and we will, unless we are
             legally required to keep a record.</p>
        </Section>

        <Section id="rights" n="6" title="Your rights">
          <p>Under India's Digital Personal Data Protection Act 2023 you can:</p>
          <ul className="legal-list rights">
            {RIGHTS.map(([t, d]) => <li key={t}><b>{t}</b>{d}</li>)}
          </ul>
          <p>To use any of these, email{' '}
            <a href="mailto:info@iandhfoundation.org">info@iandhfoundation.org</a>. We will
            respond within <Todo>response time, e.g. 30 days</Todo>. If you are unhappy with
            our response you can complain to the Data Protection Board of India.</p>
        </Section>

        <Section id="cookies" n="7" title="Cookies and tracking">
          <p>This site sets no cookies. There is no analytics, no advertising pixel and no
             third-party tracking script. Nothing is stored in your browser between visits.</p>
        </Section>

        <Section id="children" n="8" title="Children">
          <p>Much of our work involves children, but this website is intended for adults. If
             you are under 18, please ask a parent or guardian to contact us on your behalf.
             Where a request concerns a child, we ask only what we need to arrange support.</p>
        </Section>

        <Section id="changes" n="9" title="Changes to this policy">
          <p>If we change how we handle your information, we will update this page and change
             the date at the top. Material changes will be notified to newsletter subscribers.</p>
        </Section>

        <p className="legal-foot">
          Questions about any of this? Email{' '}
          <a href="mailto:info@iandhfoundation.org">info@iandhfoundation.org</a> or call{' '}
          <a href="tel:+919786923221">+91 97869 23221</a>.
        </p>
      </div>
    </main>
    <Footer />
    <ToTop show={up} />
  </>);
}
const host = document.getElementById('root');
(host._root ||= createRoot(host)).render(<App />);
