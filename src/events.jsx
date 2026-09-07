import React from 'react';
import { createRoot } from 'react-dom/client';
import { Ico, Arrow, Title, Header, Footer, Cta, usePageChrome, ToTop,
         EVENTS, EventCard, timeLeft } from './shared.jsx';

/* Registration happens on the home page form. The link carries the event name in
   the query string so the form can preselect it after the page change — component
   state cannot cross a page load. */
const registerHref = title => `/?event=${encodeURIComponent(title)}#help`;

const EXPECT = [
  ['people', 'Everyone is welcome', 'You do not need to be a member, a donor or a volunteer to come to one of our camps or drives.'],
  ['heart', 'Nothing to pay', 'Our camps and community events are free. If a session has a materials cost we say so when you register.'],
  ['target', 'Come for part of it', 'Most events run for several hours. Turn up for the part you can manage — you do not have to stay all day.'],
  ['home', 'Bring family', 'Children are welcome with a parent or guardian. Tell us numbers when you register so we can plan.'],
];

function App() {
  const up = usePageChrome();
  const upcoming = EVENTS.filter(e => timeLeft(e.at));
  const past = EVENTS.filter(e => !timeLeft(e.at));
  return (<>
    <Header current="/events.html" />
    <main id="main">
      <section className="page-head">
        <div className="page-head-inner">
          <nav className="crumbs" aria-label="Breadcrumb">
            <a href="/#home">Home</a> <span aria-hidden="true">/</span>
            <span aria-current="page">Events</span>
          </nav>
          <h1>Events</h1>
          <p>Health camps, skills sessions and community drives. Come along, bring someone,
             or lend a few hours — every one of these runs on volunteers.</p>
        </div>
      </section>

      <section className="events" id="upcoming">
        <Title sub={upcoming.length
          ? 'Register below and we will send joining details and directions.'
          : 'Nothing scheduled at the moment — check back, or ask us what is coming up.'}>
          Upcoming Events
        </Title>
        {upcoming.length > 0 ? (
          <div className="events-grid">
            {upcoming.map(ev => (
              <EventCard key={ev.title} event={ev} blurb
                action={<a className="btn navy" href={registerHref(ev.title)}>
                          Register Interest <Arrow /></a>} />
            ))}
          </div>
        ) : (
          <p className="events-empty">
            We publish new camps and drives here as they are confirmed. To hear about them
            first, <a href="/#newsletter">join the newsletter</a> or{' '}
            <a href="/contact.html">get in touch</a>.
          </p>
        )}
      </section>

      <section className="expect">
        <Title sub="A few things worth knowing before you come.">What to Expect</Title>
        <div className="expect-grid">
          {EXPECT.map(([ic, t, d]) => (
            <article className="expect-card rv" key={t}>
              <span><Ico n={ic} s={19} /></span>
              <div><h3>{t}</h3><p>{d}</p></div>
            </article>
          ))}
        </div>
      </section>

      {past.length > 0 && (
        <section className="events" id="past">
          <Title sub="Thank you to everyone who turned up.">Past Events</Title>
          <div className="events-grid past">
            {past.map(ev => <EventCard key={ev.title} event={ev} blurb action={null} />)}
          </div>
        </section>
      )}

      <Cta />
    </main>
    <Footer />
    <ToTop show={up} />
  </>);
}
const host = document.getElementById('root');
(host._root ||= createRoot(host)).render(<App />);
