import React from 'react';
import { createRoot } from 'react-dom/client';
import { Title, Header, Footer, Cta, PageHead, usePageChrome, ToTop, EVENTS, EventRow } from './shared.jsx';
import { isUpcoming } from './when.js';

/* Registration happens on the home page form. The link carries the event name in
   the query string so the form can preselect it after the page change — component
   state cannot cross a page load. */
const registerHref = title => `/?event=${encodeURIComponent(title)}#help`;

const EXPECT = [
  ['Everyone is welcome', 'You do not need to be a member, a donor or a volunteer to come to one of our camps or drives.'],
  ['Nothing to pay', 'Our camps and community events are free. If a session has a materials cost, we tell you when you register.'],
  ['Come for part of it', 'Most events run for several hours. Come for the part you can manage; you do not have to stay all day.'],
  ['Bring your family', 'Children are welcome with a parent or guardian. Tell us how many are coming when you register.'],
];

function App() {
  const up = usePageChrome();
  const upcoming = EVENTS.filter(e => isUpcoming(e.at));
  // most recent first: the last thing that happened is the most relevant
  const past = EVENTS.filter(e => !isUpcoming(e.at)).reverse();
  return (<>
    <Header current="/events.html" />
    <main id="main">
      <PageHead crumb="Events" title="Events">
        Health camps, skills sessions and community drives. Come along, bring someone, or lend
        a few hours: every one of these runs on volunteers.
      </PageHead>

      <section className="wrap section" id="upcoming">
        <Title sub={upcoming.length ? 'Register and we will send joining details and directions.' : null}>
          Upcoming events
        </Title>
        {upcoming.length > 0 ? (
          <div className="events">
            {upcoming.map(ev => (
              <EventRow key={ev.title} event={ev} blurb
                action={<a className="btn navy sm" href={registerHref(ev.title)}>Register interest</a>} />
            ))}
          </div>
        ) : (
          <p className="empty">
            Nothing is scheduled right now. New camps and drives appear here as they are
            confirmed. <a href="/#newsletter">Join the newsletter</a> to hear first, or{' '}
            <a href="/contact.html">ask us what is coming up</a>.
          </p>
        )}
      </section>

      <section className="band">
        <div className="wrap">
          <Title sub="A few things worth knowing before you come.">What to expect</Title>
          <ul className="rules two">
            {EXPECT.map(([t, d]) => <li key={t}><h3>{t}</h3><p>{d}</p></li>)}
          </ul>
        </div>
      </section>

      {past.length > 0 && (
        <section className="wrap section" id="past">
          <Title sub="Thank you to everyone who came.">Past events</Title>
          <div className="events">
            {past.map(ev => <EventRow key={ev.title} event={ev} blurb action={null} />)}
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
