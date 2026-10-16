import Head from 'next/head';
import Header from '../components/Header';
import Footer from '../components/Footer';
import LegalNotice from '../components/LegalNotice';
import HeroCard from '../components/HeroCard';
import FeatureGrid from '../components/FeatureGrid';

export default function Home(){
  return (
    <>
      <Head>
        <title>Apex Capital | Discipline. Clarity. Stewardship.</title>
        <meta name="description" content="Disciplined capital strategy, risk awareness, and transparent decision-making." />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>
      <Header />
      <main id="top">
        <section className="hero">
          <div className="wrap">
            <div className="eyebrow">Independent thinking · Long-term perspective</div>
            <h1>Capital deserves<br/><em>clear thinking.</em></h1>
            <p>A disciplined approach to capital strategy, grounded in thoughtful analysis and risk awareness.</p>
            <div style={{marginTop:24,display:'grid',gridTemplateColumns:'1fr 1fr',gap:16}}>
              <HeroCard title="Our Philosophy">We prioritize process over prediction, risk awareness over overconfidence.</HeroCard>
              <HeroCard title="Get Started">Open an account, or explore our research and strategy notes.</HeroCard>
            </div>
          </div>
        </section>
        <section style={{padding:'3rem 0'}}>
          <div className="wrap">
            <h2 id="philosophy">Our Approach</h2>
            <p>We combine systematic research, strict risk controls, and operational discipline to steward capital responsibly.</p>
            <div style={{marginTop:16}}><FeatureGrid /></div>
          </div>
        </section>
      </main>
      <LegalNotice />
      <Footer />
    </>
  )
}
