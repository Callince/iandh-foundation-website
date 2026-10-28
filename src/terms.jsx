import React from 'react';
import { createRoot } from 'react-dom/client';
import { Ico, Header, Footer, PageHead, usePageChrome, ToTop } from './shared.jsx';

/* Written from what this site actually does: it publishes information, takes
   support requests and event registrations through one form, and collects
   newsletter addresses. It does NOT process payments and has no user accounts,
   so there are deliberately no payment or account terms here.

   <Todo> marks commitments only I&H Foundation can make. They render in yellow
   so the page looks unfinished until a person has decided each one. */
const Todo = ({ children }) => <mark className="todo">[{children}]</mark>;

const Section = ({ id, n, title, children }) => (
  <section className="legal-sec" id={id}>
    <h2><span>{n}</span>{title}</h2>
    {children}
  </section>
);

function App() {
  const up = usePageChrome();
  return (<>
    <Header current="/terms.html" />
    <main id="main">
      <PageHead crumb="Terms and conditions" title="Terms and conditions"
                meta={<>Last updated <Todo>date these terms were approved</Todo></>}>
        What you can expect from this website, and what we ask of you when you use it.
      </PageHead>

      <div className="legal">
        <aside className="legal-note urgent">
          <Ico n="cross" s={20} />
          <div>
            <b>If someone is in immediate danger, do not use this website</b>
            <p>Our forms are read by people during working hours and we aim to reply within two
               working days. That is not fast enough for an emergency. In a medical emergency
               call <b>108</b>, for police call <b>100</b>, and for a child in danger call
               <b> 1098</b> (Childline).</p>
          </div>
        </aside>

        <Section id="who" n="1" title="Who these terms are with">
          <p>This website is operated by I&amp;H Foundation, <Todo>registered legal name and
             registration or trust number</Todo>, of No. 123, Hope Street, Anna Nagar, Trichy,
             Tamil Nadu, India. By using the site you agree to these terms. If you do not agree
             with them, please do not use the site.</p>
        </Section>

        <Section id="what" n="2" title="What this website does — and what it does not">
          <p>The site tells you about our work, lets you ask for support, lets you register
             interest in an event, and lets you subscribe to our newsletter. There are no user
             accounts, and no payments are taken on this site.</p>
          <p className="legal-callout"><b>Submitting a request does not guarantee support.</b> We
             assess every request we receive, but our funds, volunteers and programmes are
             limited, and some needs fall outside what we are able to help with. We will tell
             you either way, and where we cannot help we will try to point you elsewhere.</p>
          <p>We are not a medical, legal, financial or counselling service, and nothing on this
             site is professional advice of any kind.</p>
        </Section>

        <Section id="forms" n="3" title="Using our forms">
          <p>When you submit a request, a registration or a newsletter sign-up, you agree that:</p>
          <ul className="legal-list">
            <li>The information you give us is accurate to the best of your knowledge.</li>
            <li>If you are submitting on someone else&rsquo;s behalf, you have their permission
              to share their details with us.</li>
            <li>You will not use our forms to send abusive, unlawful or deliberately false
              content, or to advertise anything.</li>
          </ul>
          <p>We may decline or stop responding to a request that is abusive or knowingly false.
             How we handle the information you send is set out in our{' '}
            <a href="/privacy.html">Privacy Policy</a>.</p>
        </Section>

        <Section id="events" n="4" title="Events">
          <p>Registering interest in an event reserves you a place where places are limited, but
             does not create a contract with us. Events depend on weather, volunteers, venues and
             funding, so dates and locations can change or an event can be cancelled — we will
             tell registered attendees as early as we can.</p>
          <p>You attend at your own risk and are responsible for your own travel and belongings.
             Children must be accompanied by a parent or guardian. If we photograph an event for
             our website or reports, we will say so at the venue, and you can ask not to appear.</p>
        </Section>

        <Section id="donations" n="5" title="Donations">
          <p>No payment is taken through this website. The Donate buttons put you in touch with
             our team, who will arrange your contribution directly.</p>
          <p>Donations are used for our charitable work at our discretion, guided by any
             preference you express. <Todo>State whether donations are refundable and under what
             conditions</Todo>. <Todo>State whether donations qualify for tax relief under
             section 80G and give the registration number if so</Todo>. Receipts are issued
             <Todo>state how and when receipts are issued</Todo>.</p>
        </Section>

        <Section id="content" n="6" title="Content on this site">
          <p>The text, images, logo and design of this site belong to I&amp;H Foundation or are
             used with permission. You may share and link to our pages freely. Please ask before
             reproducing our photographs or reports elsewhere, particularly any image showing a
             person we work with.</p>
          <p>Partner and donor logos shown on this site remain the property of those
             organisations and are used with their permission.</p>
          <p>Anything you send us — a story, a photograph, a message — remains yours. By sending
             it you allow us to use it for the purpose you sent it for. We will ask separately,
             and in writing, before using your story or picture in our publicity.</p>
        </Section>

        <Section id="links" n="7" title="Links to other websites">
          <p>Where we link to another organisation, we do not control that site and are not
             responsible for its content or its handling of your data. Their terms and privacy
             policy apply once you leave ours.</p>
        </Section>

        <Section id="availability" n="8" title="Availability and changes">
          <p>We aim to keep the site available and accurate, but we cannot promise it will always
             be online or error-free. Programme details, event dates and figures can change. We
             may update, suspend or withdraw any part of the site, and we may revise these terms
             — the date at the top shows when they last changed.</p>
        </Section>

        <Section id="liability" n="9" title="Liability">
          <p><Todo>This section needs wording from a lawyer. It should set out the limits of the
             Foundation&rsquo;s liability for use of the site and for support arranged through
             it, within what Indian law permits — liability for death or personal injury caused
             by negligence, and for fraud, cannot be excluded</Todo>.</p>
        </Section>

        <Section id="law" n="10" title="Governing law">
          <p>These terms are governed by the laws of India, and the courts of{' '}
            <Todo>city where your organisation is registered</Todo>, Tamil Nadu have exclusive
            jurisdiction over any dispute arising from them.</p>
        </Section>

        <Section id="contact" n="11" title="Contact">
          <p>Questions about these terms? Email{' '}
            <a href="mailto:info@iandhfoundation.org">info@iandhfoundation.org</a>, call{' '}
            <a href="tel:+919786923221">+91 97869 23221</a>, or write to us at the address above.</p>
        </Section>

        <p className="legal-foot">
          See also our <a href="/privacy.html">Privacy Policy</a>, which explains what we do with
          the information you send us.
        </p>
      </div>
    </main>
    <Footer />
    <ToTop show={up} />
  </>);
}
const host = document.getElementById('root');
(host._root ||= createRoot(host)).render(<App />);
