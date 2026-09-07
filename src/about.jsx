import React from 'react';
import { createRoot } from 'react-dom/client';
import { A, Ico, Arrow, Title, Header, Footer, Cta, usePageChrome, ToTop } from './shared.jsx';

const VALUES = [
  ['scale', 'Dignity first', 'Nobody should have to trade their self-respect for help. We ask for what we need to act, and no more.'],
  ['eye', 'Open about our work', 'What we raise, where it goes and what it changed — reported plainly, to donors and communities alike.'],
  ['people', 'Led by the community', 'The people closest to a problem understand it best. We plan with them, not for them.'],
  ['leaf', 'Built to last', 'Relief matters in a crisis, but our aim is the skills, access and networks that outlive our involvement.'],
];

const STEPS = [
  ['You reach out', 'Someone contacts us — the person themselves, a family member, a neighbour or a local volunteer.'],
  ['We listen and assess', 'We talk it through to understand the situation, what is most urgent, and what would genuinely help.'],
  ['We connect the support', 'We match the need to the right programme, donor, partner organisation or volunteer team.'],
  ['We stay in touch', 'We follow up after the immediate need is met, because most situations take more than one intervention.'],
];

const FOCUS = [
  ['book', 'Education', 'Learning materials, school costs and safer places to study.'],
  ['cross', 'Health', 'Medical camps, treatment support and health awareness.'],
  ['woman', 'Women’s livelihoods', 'Skills training and support for women building an income.'],
  ['heart', 'Food & essentials', 'Nutritious meals and essential supplies for families under strain.'],
  ['home', 'Disaster relief', 'Immediate help when floods and other emergencies hit.'],
  ['leaf', 'Community development', 'Longer-term work on the shared things a village depends on.'],
];

const PageHead = () => (
  <section className="page-head">
    <div className="page-head-inner">
      <nav className="crumbs" aria-label="Breadcrumb">
        <a href="/#home">Home</a> <span aria-hidden="true">/</span> <span aria-current="page">About Us</span>
      </nav>
      <h1>About I&amp;H Foundation</h1>
      <p>We connect people facing difficult circumstances with the people, organisations
         and resources willing to help — and we stay involved until something actually changes.</p>
    </div>
  </section>
);

const Story = () => (
  <section className="about-story" id="story">
    <div className="about-story-copy rv">
      <h2>Who we are<i /></h2>
      <p>I&amp;H Foundation is a nonprofit working in Tamil Nadu. We exist for a simple reason:
         plenty of people want to help, plenty of people need help, and the two rarely find
         each other at the moment it matters.</p>
      <p>We sit in that gap. We take requests directly from families and communities, work out
         what would genuinely make a difference, and connect that need to the donors, volunteers
         and partner organisations who can meet it.</p>
      <p>Our work spans education, health, women&rsquo;s livelihoods, food support, disaster
         relief and community development — not because we set out to cover six areas, but
         because those are what people keep asking us for.</p>
      <strong>Every Helping Hand Can Create Hope.</strong>
    </div>
    <div className="about-story-photo rv">
      <img src={A + 'about-classroom.webp'} alt="Children raising their hands in a classroom"
           width="800" height="600" loading="lazy" />
      <img src={A + 'program-food.webp'} alt="Volunteers handing out supply kits"
           width="800" height="600" loading="lazy" />
    </div>
  </section>
);

const MissionVision = () => (
  <section className="about-mv" id="mission">
    <Title sub="What we are working towards, and why.">Mission &amp; Vision</Title>
    <div className="mv rv">
      <div className="mv-card navy">
        <span><Ico n="target" s={20} /></span>
        <h3>Our Mission</h3>
        <p className="lead">Helping People in Need.</p>
        <p>To help people who are genuinely in need and connect them with people who are
           willing and able to help.</p>
        <b>Connect. Support. Empower. Create Hope.</b>
      </div>
      <div className="mv-card red">
        <span><Ico n="eye" s={20} /></span>
        <h3>Our Vision</h3>
        <p>To build a compassionate society where people facing difficult circumstances can
           find support, opportunity and hope, and where individuals and organizations can
           come together to make a meaningful difference.</p>
      </div>
    </div>
  </section>
);

const Values = () => (
  <section className="values">
    <Title sub="Four things we hold to, including when they are inconvenient.">What We Believe</Title>
    <div className="values-grid">
      {VALUES.map(([ic, t, d]) => (
        <article className="value rv" key={t}>
          <span><Ico n={ic} s={22} /></span>
          <h3>{t}</h3><p>{d}</p>
        </article>
      ))}
    </div>
  </section>
);

const HowWeWork = () => (
  <section className="steps">
    <Title sub="From the first message to the follow-up months later.">How We Work</Title>
    <ol className="steps-grid">
      {STEPS.map(([t, d], i) => (
        <li className="step rv" key={t}>
          <b>{String(i + 1).padStart(2, '0')}</b>
          <h3>{t}</h3><p>{d}</p>
        </li>
      ))}
    </ol>
  </section>
);

const Focus = () => (
  <section className="focus">
    <Title sub="The six areas people most often come to us about.">Where We Focus</Title>
    <div className="focus-grid">
      {FOCUS.map(([ic, t, d]) => (
        <article className="focus-card rv" key={t}>
          <span><Ico n={ic} s={19} /></span>
          <div><h3>{t}</h3><p>{d}</p></div>
        </article>
      ))}
    </div>
    <div className="center"><a className="btn navy" href="/#work">See Our Work <Arrow /></a></div>
  </section>
);

function App() {
  const up = usePageChrome();
  return (<>
    <Header current="/about.html" />
    <main id="main">
      <PageHead /><Story /><MissionVision /><Values /><HowWeWork /><Focus /><Cta />
    </main>
    <Footer />
    <ToTop show={up} />
  </>);
}
const host = document.getElementById('root');
(host._root ||= createRoot(host)).render(<App />);
