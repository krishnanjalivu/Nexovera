import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { HeroBackground } from './components/HeroBackground';
import { Logo } from './components/Logo';
import { SectionNeuralBg } from './components/SectionNeuralBg';
import { SectionTransition } from './components/SectionTransition';
import './App.css';

gsap.registerPlugin(ScrollTrigger);

function App() {
  const heroHeadlineRef = useRef<HTMLHeadingElement>(null);
  const heroSubheadlineRef = useRef<HTMLParagraphElement>(null);
  const heroCtaRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: 'power3.out' } });
      tl.fromTo(
        heroHeadlineRef.current,
        { opacity: 0, y: 80 },
        { opacity: 1, y: 0, duration: 1.2 }
      )
        .fromTo(
          heroSubheadlineRef.current,
          { opacity: 0, y: 50 },
          { opacity: 1, y: 0, duration: 1 },
          '-=0.6'
        )
        .fromTo(
          heroCtaRef.current,
          { opacity: 0, y: 30 },
          { opacity: 1, y: 0, duration: 0.9 },
          '-=0.5'
        );
    });

    return () => ctx.revert();
  }, []);

  useEffect(() => {
    const sections = document.querySelectorAll('.section, .waitlist-cta');
    const ctx = gsap.context(() => {
      sections.forEach((section) => {
        const content =
          section.querySelector('.section-content, .section-body') ||
          section.querySelector('.features-grid') ||
          section.querySelector('.waitlist-form');
        const headline = section.querySelector('.section-headline');

        if (headline) {
          gsap.fromTo(
            headline,
            { opacity: 0, y: 50 },
            {
              opacity: 1,
              y: 0,
              duration: 0.9,
              ease: 'power3.out',
              scrollTrigger: {
                trigger: section,
                start: 'top 80%',
                toggleActions: 'play none none reverse',
              },
            }
          );
        }

        if (content) {
          gsap.fromTo(
            content,
            { opacity: 0, y: 60 },
            {
              opacity: 1,
              y: 0,
              duration: 1,
              ease: 'power3.out',
              delay: 0.15,
              scrollTrigger: {
                trigger: section,
                start: 'top 80%',
                toggleActions: 'play none none reverse',
              },
            }
          );
        }

        const cards = section.querySelectorAll('.feature-card');
        if (cards.length) {
          gsap.fromTo(
            cards,
            { opacity: 0, y: 50, scale: 0.96 },
            {
              opacity: 1,
              y: 0,
              scale: 1,
              duration: 0.85,
              ease: 'power3.out',
              stagger: 0.2,
              delay: 0.25,
              scrollTrigger: {
                trigger: section,
                start: 'top 75%',
                toggleActions: 'play none none reverse',
              },
            }
          );
        }

        const aboutParagraphs = section.querySelectorAll('.about .section-body');
        if (aboutParagraphs.length) {
          gsap.fromTo(
            aboutParagraphs,
            { opacity: 0, y: 36 },
            {
              opacity: 1,
              y: 0,
              duration: 0.8,
              ease: 'power3.out',
              stagger: 0.2,
              delay: 0.2,
              scrollTrigger: {
                trigger: section,
                start: 'top 78%',
                toggleActions: 'play none none reverse',
              },
            }
          );
        }

        const missionParagraphs = section.querySelectorAll('.mission .section-body');
        if (missionParagraphs.length) {
          gsap.fromTo(
            missionParagraphs,
            { opacity: 0, y: 36 },
            {
              opacity: 1,
              y: 0,
              duration: 0.8,
              ease: 'power3.out',
              stagger: 0.2,
              delay: 0.2,
              scrollTrigger: {
                trigger: section,
                start: 'top 78%',
                toggleActions: 'play none none reverse',
              },
            }
          );
        }

        const productBody = section.querySelector('.product-section .section-body');
        if (productBody) {
          gsap.fromTo(
            productBody,
            { opacity: 0, y: 30 },
            {
              opacity: 1,
              y: 0,
              duration: 0.9,
              ease: 'power3.out',
              delay: 0.15,
              scrollTrigger: {
                trigger: section,
                start: 'top 78%',
                toggleActions: 'play none none reverse',
              },
            }
          );
        }
      });
    });

    return () => ctx.revert();
  }, []);

  useEffect(() => {
    const nav = document.querySelector('.nav');
    if (!nav) return;
    const onScroll = () => nav.classList.toggle('scrolled', window.scrollY > 50);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <>
      <nav className="nav">
        <a href="#" className="nav-logo">
          <Logo className="nav-logo-img" height={32} />
          <span>Nexovera</span>
        </a>
        <div className="nav-links">
          <a href="#about">About</a>
          <a href="#product">Product</a>
          <a href="#mission">Mission</a>
          <a href="#waitlist" className="btn btn-primary" style={{ padding: '10px 24px', fontSize: '14px' }}>
            Join Waitlist
          </a>
        </div>
      </nav>
      <header className="hero">
        <HeroBackground />
        <div className="hero-content">
          <h1 ref={heroHeadlineRef} className="hero-headline">
            The Intelligence Behind Your Health
          </h1>
          <p ref={heroSubheadlineRef} className="hero-subheadline">
            Nexovera uses AI-driven biomarker monitoring to provide real-time cognitive and
            physical health insights, helping you predict risks early and take proactive
            control of your wellbeing.
          </p>
          <div ref={heroCtaRef} className="hero-cta">
            <a href="#waitlist" className="btn btn-primary">
              Join the Waitlist
            </a>
            <a href="#about" className="btn btn-secondary">
              Learn More
            </a>
          </div>
        </div>
      </header>

      <SectionTransition />
      <section id="about" className="section section-with-bg about">
        <SectionNeuralBg id="about" />
        <div className="section-content">
          <h2 className="section-headline">Smart Health Monitoring, Simplified</h2>
          <p className="section-body">
            Nexovera is a next-generation platform that continuously monitors biomarkers
            to provide actionable insights for both cognitive and physical health. Using
            advanced AI and wearable technology, Nexovera transforms complex biological
            data into easy-to-understand recommendations so you can make proactive
            decisions about your wellbeing.
          </p>
          <p className="section-body">
            We believe health should be preventive, not reactive, and everyone deserves
            insight into how their mind and body are performing — in real time.
          </p>
        </div>
      </section>

      <SectionTransition />
      <section id="product" className="section section-with-bg product-section">
        <SectionNeuralBg id="product" />
        <h2 className="section-headline">A Holistic View of Your Health</h2>
        <p className="section-body">
          Nexovera collects data from wearable sensors and other biomarker sources,
          analyzes it with AI, and delivers personalized, predictive insights. Whether
          it's subtle changes in cognitive performance or physical markers, our platform
          helps you stay ahead of health issues before they become problems.
        </p>
        <div className="features-grid">
          <div className="feature-card">
            <div className="feature-number">01</div>
            <h3 className="feature-title">Passive Monitoring</h3>
            <p className="feature-desc">
              Continuously tracks your cognitive and physical biomarkers.
            </p>
          </div>
          <div className="feature-card">
            <div className="feature-number">02</div>
            <h3 className="feature-title">AI-Powered Insights</h3>
            <p className="feature-desc">
              Detects patterns, trends, and early warning signals.
            </p>
          </div>
          <div className="feature-card">
            <div className="feature-number">03</div>
            <h3 className="feature-title">Actionable Alerts</h3>
            <p className="feature-desc">
              Gives recommendations for proactive health management.
            </p>
          </div>
        </div>
      </section>

      <section id="mission" className="section section-with-bg mission">
        <SectionNeuralBg id="mission" />
        <div className="section-content">
          <h2 className="section-headline">
            Empowering People to Take Control of Their Health
          </h2>
          <p className="section-body">
            Our mission is simple: to give everyone the tools to understand their body
            and mind in real time. We aim to bridge the gap between data and actionable
            health insights, creating a future where people can optimize their cognitive
            and physical wellbeing proactively.
          </p>
          <p className="section-body">
            In the future, Nexovera will expand to integrate research-backed insights,
            personalized coaching, and predictive analytics — helping individuals make
            smarter decisions about their health every day.
          </p>
        </div>
      </section>

      <SectionTransition />
      <section id="insights" className="section section-with-bg insights">
        <SectionNeuralBg id="insights" />
        <div className="section-content">
          <h2 className="section-headline">Insights & Research</h2>
          <p className="section-body">
            Our team is passionate about advancing knowledge in cognitive and physical
            health. Here, we'll share research updates, scientific findings, and
            actionable health insights that inform our product development and help the
            community stay informed about the latest innovations in biomarker monitoring
            and AI-driven health intelligence.
          </p>
          <div className="insights-placeholder">
            <p>
              Coming soon: Blog posts, educational articles, and research summaries.
            </p>
          </div>
        </div>
      </section>

      <section id="team" className="section section-with-bg team">
        <SectionNeuralBg id="team" />
        <div className="section-content">
          <h2 className="section-headline">The Minds Behind Nexovera</h2>
          <p className="section-body">
            Our team combines expertise in engineering, neuroscience, AI, and healthcare
            technology. Together, we're building tools that give people real-time
            insight into their health.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto mt-12">
            <div className="team-member p-8 md:p-10 rounded-2xl">
              <div className="team-member-photo">UR</div>
              <h3 className="team-member-name">Umme Romana</h3>
              <p className="team-member-role">Founder & CEO</p>
              <p className="team-member-desc">
                Engineer + Neuroscience Post-Baccalaureate | Driving the vision for
                proactive, AI-driven health intelligence.
              </p>
            </div>
            <div className="team-member p-8 md:p-10 rounded-2xl">
              <div className="team-member-photo">KR</div>
              <h3 className="team-member-name">Krishnanjali</h3>
              <p className="team-member-role">Founder & CTO</p>
              <p className="team-member-desc">
                Engineer + Computer Science Major.
              </p>
            </div>
          </div>
        </div>
      </section>

      <SectionTransition />
      <section id="waitlist" className="waitlist-cta section-with-bg">
        <SectionNeuralBg id="waitlist" />
        <h2 className="section-headline">Take Control of Your Health Today</h2>
        <p className="section-body">
          Sign up to stay updated on Nexovera's launch and be among the first to
          experience predictive, AI-driven health monitoring.
        </p>
        <form className="waitlist-form" onSubmit={(e) => e.preventDefault()}>
          <input type="text" name="first_name" placeholder="First Name" required />
          <input type="email" name="email" placeholder="Email" required />
          <button type="submit" className="btn btn-primary">
            Join the Waitlist
          </button>
        </form>
      </section>

      <footer className="footer">
        <div className="footer-content">
          <span className="footer-contact">
            Contact:{' '}
            <a href="mailto:info@nexovera.ai">info@nexovera.ai</a>
          </span>
          <div className="footer-links">
            <a href="#about">About Nexovera</a>
            <a href="#">Privacy Policy</a>
          </div>
          <div className="footer-social">
            <a href="#" aria-label="Instagram">Instagram</a>
            <a href="#" aria-label="LinkedIn">LinkedIn</a>
            <a href="#" aria-label="X">X</a>
          </div>
        </div>
      </footer>
    </>
  );
}

export default App;
