import React from 'react';
import { createRoot } from 'react-dom/client';
import { A, Ico, Title, Header, Footer, Cta, PageHead, usePageChrome, ToTop } from './shared.jsx';

const VALUES = [
  ['Dignity first', 'Nobody should have to trade their self-respect for help. We ask for what we need to act, and no more.'],
  ['Open about our work', 'What we raise, where it goes and what it changed, reported plainly to donors and communities alike.'],
  ['Led by the community', 'The people closest to a problem understand it best. We plan with them, not for them.'],
  ['Built to last', 'Relief matters in a crisis, but our aim is the skills, access and networks that outlive our involvement.'],
];

const STEPS = [
  ['You reach out', 'Someone contacts us: the person themselves, a family member, a neighbour or a local volunteer.'],
  ['We listen and assess', 'We talk it through to understand the situation, what is most urgent, and what would genuinely help.'],
  ['We connect the support', 'We match the need to the right programme, donor, partner organisation or volunteer team.'],
  ['We stay in touch', 'We follow up after the immediate need is met, because most situations take more than one visit.'],
];

const FOCUS = [
  ['book', 'Education', 'Learning materials, school costs and safer places to study.'],
  ['cross', 'Health', 'Medical camps, treatment support and health awareness.'],
  ['woman', 'Women’s livelihoods', 'Skills training and support for women building an income.'],
  ['heart', 'Food and essentials', 'Nutritious meals and essential supplies for families under strain.'],
  ['home', 'Disaster relief', 'Immediate help when floods and other emergencies hit.'],
  ['leaf', 'Community development', 'Longer-term work on the shared things a village depends on.'],
];

const Story = () => (
  <section className="wrap section split" id="story">
    <div className="prose">
      <h2>Who we are</h2>
      <p>I&amp;H Foundation is a nonprofit working in Tamil Nadu. We exist for a simple reason:
         plenty of people want to help, plenty of people need help, and the two rarely find
         each other at the moment it matters.</p>
      <p>We sit in that gap. We take requests directly from families and communities, work out
         what would genuinely make a difference, and connect that need to the donors, volunteers
         and partner organisations who can meet it.</p>
      <p>Our work spans education, health, women&rsquo;s livelihoods, food support, disaster
         relief and community development. Not because we set out to cover six areas, but
         because those are what people keep asking us for.</p>
    </div>
    <div className="photo-pair">
      <img src={A + 'about-classroom.webp'} alt="Children raising their hands in a classroom"
           width="800" height="600" loading="lazy" />
      <img src={A + 'program-food.webp'} alt="Volunteers serving a meal to a child"
           width="800" height="600" loading="lazy" />
    </div>
  </section>
);

const MissionVision = () => (
  <section className="band" id="mission">
    <div className="wrap">
      <Title>Mission and vision</Title>
      <div className="mv">
        <div>
          <h3>Our mission</h3>
          <p>To help people who are genuinely in need, and connect them with people who are
             willing and able to help.</p>
        </div>
        <div>
          <h3>Our vision</h3>
          <p>A compassionate society where people facing difficult circumstances can find
             support, opportunity and hope, and where individuals and organisations come
             together to make a real difference.</p>
        </div>
      </div>
    </div>
  </section>
);

const Values = () => (
  <section className="wrap section">
    <Title sub="Four things we hold to, including when they are inconvenient.">What we believe</Title>
    <ul className="rules two">
      {VALUES.map(([t, d]) => <li key={t}><h3>{t}</h3><p>{d}</p></li>)}
    </ul>
  </section>
);

const HowWeWork = () => (
  <section className="band">
    <div className="wrap">
      <Title sub="From the first message to the follow-up months later.">How we work</Title>
      <ol className="steps">
        {STEPS.map(([t, d], i) => (
          <li key={t}><b aria-hidden="true">{i + 1}</b><h3>{t}</h3><p>{d}</p></li>
        ))}
      </ol>
    </div>
  </section>
);

const Focus = () => (
  <section className="wrap section">
    <Title sub="The six areas people most often come to us about."
           action={<a className="link" href="/#work">See our work</a>}>
      Where we focus
    </Title>
    <ul className="rules three">
      {FOCUS.map(([ic, t, d]) => (
        <li key={t}><h3><Ico n={ic} s={20} />{t}</h3><p>{d}</p></li>
      ))}
    </ul>
  </section>
);

function App() {
  const up = usePageChrome();
  return (<>
    <Header current="/about.html" />
    <main id="main">
      <PageHead crumb="About us" title="About I&H Foundation">
        We connect people facing difficult circumstances with the people, organisations and
        resources willing to help, and we stay involved until something actually changes.
      </PageHead>
      <Story /><MissionVision /><Values /><HowWeWork /><Focus /><Cta />
    </main>
    <Footer />
    <ToTop show={up} />
  </>);
}
const host = document.getElementById('root');
(host._root ||= createRoot(host)).render(<App />);
