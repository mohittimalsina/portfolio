/* global React */
const { useState, useEffect, useRef } = React;

/* ----------------------------------------------------------------- NAV */
const SECTIONS = [
["top", "Home"],
["about", "About"],
["projects", "Projects"],
["experiences", "Honors experience"],
["reflections", "Gateway reflection"],
["year", "Year In Review"],
["involvements", "Involvements"]];


function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [active, setActive] = useState("");
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll, { passive: true });
    const obs = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {if (e.isIntersecting) setActive(e.target.id);});
      },
      { rootMargin: "-45% 0px -50% 0px" }
    );
    SECTIONS.forEach(([id]) => {const el = document.getElementById(id);if (el) obs.observe(el);});
    return () => {window.removeEventListener("scroll", onScroll);obs.disconnect();};
  }, []);
  return (
    <nav className={"nav" + (scrolled ? " scrolled" : "")}>
      <a className="brand" href="#top">MT<span className="dot">.</span></a>
      <div className="nav-links">
        {SECTIONS.map(([id, label]) =>
        <a key={id} href={"#" + id} className={active === id ? "active" : ""}>{label}</a>
        )}
      </div>
    </nav>);

}

/* ---------------------------------------------------------------- HERO */
function Hero() {
  const ref = useRef(null);
  useEffect(() => {
    const t = setTimeout(() => ref.current && ref.current.classList.add("in"), 180);
    return () => clearTimeout(t);
  }, []);
  return (
    <header className="hero" id="top" ref={ref}>
      <div className="hero-top">
        <span className="kicker">University Honors Program · 2025—26</span>
        <div className="hero-meta">
          University of Cincinnati<br />
          Global Citizen Scholar
        </div>
      </div>
      <h1>
        <span className="line l1"><span>Mohit</span></span>
        <span className="line l2"><span>Timalsina<span className="ital">,</span></span></span>
        <span className="line l3"><span className="ital">honors portfolio</span></span>
      </h1>
      <div className="hero-sub">
        <p>
          Mechanical Engineering student and R&amp;D researcher at UC's Metasonics
          Lab — engineering new gateways for data through solid metal, 7,700 miles
          from home in Kathmandu.
        </p>
        <div className="scroll-cue">Scroll<span className="arrow"></span></div>
      </div>
    </header>);

}

function Marquee() {
  const items = ["Global Citizen Scholar", "Mechanical Engineering", "UHP Discover", "R&D Co-op", "Through-Metal Data", "Innovation Scholars", "Cross-Laminated Timber"];
  const run = (key) => items.map((it, i) =>
  <span key={key + i}>{it}<span className="star">✦</span></span>
  );
  return (
    <div className="marquee" aria-hidden="true">
      <div className="marquee-track">{run("a")}{run("b")}</div>
    </div>);

}

/* --------------------------------------------------------------- ABOUT */
function About() {
  return (
    <section className="section" id="about">
      <div className="wrap">
        <span className="kicker reveal">01 / Who I Am</span>
        <div className="about-grid">
          <div>
            <p className="about-lead reveal">
              I grew up in <em>Kathmandu</em>, surrounded by mountains, lively
              streets, and the love of my family. Leaving home was one of the
              hardest decisions I've ever made.
            </p>
            <div className="about-body">
              <p className="reveal d1">
                Family has always been my biggest inspiration. I still remember the
                nights my dad would help me with school projects, or how my mom's
                laughter could brighten my day. Their encouragement gave me the
                courage to leave my comfort zone and chase my dreams.
              </p>
              <p className="reveal d1">
                I've always been drawn to creativity. As a kid I'd spend hours
                building Lego sets, dreaming of making something meaningful.
                Now, as an engineering student, I get to channel that same
                imagination into <strong>solving real-world problems.</strong>
              </p>
              <p className="reveal d2">
                Fitness has also become a big part of my life — five days a week
                at the gym, where I find clarity and calm. Even when progress
                feels slow, I've learned to enjoy the journey. For me, college
                isn't just about academics; it's about discovering who I am.
              </p>
            </div>
            <dl className="facts reveal d1">
              <div className="fact-row"><dt>Hometown</dt><dd>Kathmandu, Nepal</dd></div>
              <div className="fact-row"><dt>Major</dt><dd>Mechanical Engineering</dd></div>
              <div className="fact-row"><dt>Class of</dt><dd>2029 · Honors</dd></div>
              <div className="fact-row"><dt>Research</dt><dd>Metasonics Lab · UC CEAS</dd></div>
              <div className="fact-row"><dt>Drawn to</dt><dd>Building · Design · Fitness</dd></div>
            </dl>
          </div>
          <div className="about-portrait reveal d2" style={{ height: "500px" }}>
            <image-slot id="portrait" shape="rounded" radius="2" placeholder="Drop a portrait of yourself"></image-slot>
            <div className="portrait-cap"><span>Mohit Timalsina</span><span>Cincinnati, OH</span></div>
          </div>
        </div>

        <div className="stats">
          <div className="stat reveal"><div className="n">02</div><div className="l">Research Labs</div></div>
          <div className="stat reveal d1"><div className="n">03</div><div className="l">Honors Experiences</div></div>
          <div className="stat reveal d2"><div className="n">01</div><div className="l">Through-Metal Gateway</div></div>
          <div className="stat reveal d3"><div className="n">7,700<span className="unit">mi</span></div><div className="l">Kathmandu → Cincinnati</div></div>
        </div>
      </div>
    </section>);

}

/* --------------------------------------------------------- EXPERIENCES */
function Experiences() {
  return (
    <section className="section" id="experiences">
      <div className="wrap">
        <div className="sec-head reveal">
          <h2>Honors<br />Experiences</h2>
          <div className="meta">University Honors Program<br />Curated Reflections<br />2025—2026</div>
        </div>

        {/* UHP DISCOVER */}
        <article className="exp" id="exp-discover">
          <div className="exp-head">
            <div className="exp-num reveal">02</div>
            <div className="exp-title reveal d1">
              <h3>UHP Discover</h3>
              <div className="sub">Hybrid CLT Prototype &amp; the Cairn Installation</div>
            </div>
            <div className="exp-tag reveal d2">Global Citizen Scholar</div>
          </div>
          <div className="exp-body">
            <div className="col reveal d1">
              <p>
                During my UHP Discover experience I focused on developing a Hybrid
                CLT (Cross-Laminated Timber) prototype, while contributing to the
                design and construction of a Cairn installation. These projects let
                me engage with material innovation and community-centered design —
                bridging research with hands-on making.
              </p>
              <p>
                The prototype involved testing new ways of combining timber with
                other materials to improve structural performance and
                sustainability. Through it I gained experience in prototyping,
                documentation, and iterative design, while learning to approach
                research with curiosity and adaptability.
              </p>
              <p>
                The Cairn installation offered a complementary perspective —
                showing how design can extend beyond technical problem-solving to
                create spaces that invite reflection and connection.
              </p>
              <p className="pull">
                Research isn't only about pushing material boundaries — it's about
                considering the broader social and environmental contexts those
                materials live in.
              </p>
            </div>
            <div className="col reveal d2">
              <figure className="exp-single" style={{ height: "50px" }}>
                <image-slot id="clt-main" shape="rounded" radius="2" src="images/clt-woodshop.png" placeholder="Drop the Hybrid CLT prototype photo" style={{ width: "100%" }}></image-slot>
                <div className="gcap">Building the Hybrid CLT prototype — UC woodshop</div>
              </figure>
            </div>
          </div>
        </article>

        {/* INNOVATION SCHOLARS */}
        <article className="exp" id="exp-innovation">
          <div className="exp-head">
            <div className="exp-num reveal">03</div>
            <div className="exp-title reveal d1">
              <h3>Innovation<br />Scholars</h3>
              <div className="sub">Design thinking meets the Innovation Challenge</div>
            </div>
            <div className="exp-tag reveal d2">Leadership &amp; Community</div>
          </div>
          <div className="exp-body">
            <div className="col reveal d1">
              <p>
                As part of the University Honors Program I joined the Innovation
                Scholars Program, collaborating with peers and industry partners to
                explore how design thinking and entrepreneurial strategy apply to
                real-world challenges.
              </p>
              <p>
                Through workshops, projects, and mentorship I learned to approach
                problems from multiple perspectives, identify user needs, and
                generate creative solutions — strengthening my ability to work
                across interdisciplinary teams that blend technical skill with
                business, communication, and leadership.
              </p>
              <p>
                Most of all, it reframed what innovation means to me: not just new
                ideas, but sustainable, impactful solutions that address real human
                and community needs.
              </p>
              <p className="pull">
                Innovation isn't only about new ideas — it's about creating impact
                that lasts.
              </p>
            </div>
            <div className="col reveal d2">
              <div className="exp-gallery">
                <div>
                  <image-slot id="innov-main" shape="rounded" radius="2" placeholder="Drop a photo from Innovation Scholars" style={{ width: "100%", aspectRatio: "4/3" }}></image-slot>
                  <div className="gcap">Fig. 05 — Collaborating with peers &amp; industry partners</div>
                </div>
                <ul className="skill-list">
                  <li><span>Design Thinking</span><em>User-centered problem framing</em></li>
                  <li><span>Interdisciplinary Teamwork</span><em>Engineering · business · communication</em></li>
                  <li><span>Entrepreneurial Strategy</span><em>From idea to sustainable impact</em></li>
                </ul>
              </div>
            </div>
          </div>
        </article>

        {/* R&D CO-OP — FEATURED */}
        <article className="exp exp-featured" id="exp-coop">
          <div className="exp-head">
            <div className="exp-num reveal">01</div>
            <div className="exp-title reveal d1">
              <h3>R&amp;D Co-op</h3>
              <div className="sub">Metasonics Lab — a new gateway for data through solid metal</div>
            </div>
            <div className="exp-tag reveal d2">Featured · Research &amp; Development</div>
          </div>
          <div className="exp-body">
            <div className="col reveal d1">
              <p>
                At the University of Cincinnati's Metasonics Lab, my honors co-op
                sits at the edge of acoustics and data — engineering a new kind of
                gateway that carries information straight through solid metal using
                ultrasonic OFDM signals.
              </p>
              <p>
                I build axisymmetric COMSOL Multiphysics models with stochastic
                interfacial roughness, validating their transmission coefficients
                against experimental data to guide transducer design for reliable
                through-metal throughput.
              </p>
              <p>
                I also evaluate high-acoustic-impedance materials for ceramic-to-
                metal bonding — characterizing cure behavior and bond uniformity —
                and have begun fabricating an impedance-gradient bonding layer to
                minimize reflection and improve power-transfer efficiency.
              </p>
              <p className="pull">
                Some gateways aren't built from timber or stone — this one moves
                data clean through a wall of solid metal.
              </p>
            </div>
            <div className="col reveal d2">
              <div className="exp-gallery">
                <div>
                  <image-slot id="coop-main" shape="rounded" radius="2" placeholder="Drop a photo from the Metasonics Lab" style={{ width: "100%", aspectRatio: "4/3" }}></image-slot>
                  <div className="gcap">Fig. 01 — Metasonics Lab, UC CEAS</div>
                </div>
                <ul className="skill-list">
                  <li><span>COMSOL Multiphysics</span><em>Axisymmetric acoustic modeling</em></li>
                  <li><span>Ceramic-to-Metal Bonding</span><em>Impedance-gradient layers</em></li>
                  <li><span>Ultrasonic OFDM</span><em>Through-metal data transmission</em></li>
                </ul>
              </div>
            </div>
          </div>
        </article>
      </div>
    </section>);

}

/* --------------------------------------------------------- REFLECTIONS */
function Reflections() {
  return (
    <section className="section reflect" id="reflections">
      <div className="wrap">
        <span className="kicker reveal">02 / Gateway Reflection</span>
        <div className="reflect-feature">
          <figure className="reflect-photo reveal d1">
            <image-slot id="gateway-photo" shape="rounded" radius="2" src="images/kathmandu-childhood.png" placeholder="Drop a personal photo" style={{ width: "100%", aspectRatio: "369/253" }}></image-slot>
            <figcaption>Kathmandu — the home I left on August 19, 2024.</figcaption>
          </figure>
          <div>
            <blockquote className="reflect-quote reveal d1">
              <span className="mark">“</span>I didn't leave to be independent; I left to <em>find independence.</em>
            </blockquote>
            <div className="reflect-author reveal d2">— On leaving Kathmandu for Cincinnati</div>
          </div>
        </div>

        <div className="reflect-essay reveal d1">
          <p className="rlead">On August 19, 2024, I moved countries.</p>
          <p>I left the place I had lived for nearly 18 years to study in a foreign land — uncertain of what I needed to do, where I was going, who I would meet, and how I would survive. Back in Nepal I had a lifeline: my parents would be there whenever I needed them, and I could eat, sleep, and complain in the comfort of home. Everyone — my parents and my sister — supported me leaving to study, explore, and grow; my father always encouraged me to seek new experiences. But I felt a strange, unsettling sense of what it would mean to be truly on my own.</p>
          <p>It was a mix of excitement, anxiety, and nervousness unlike anything before — the feeling of passing a point of no return, a phrase that kept echoing in my mind like an alert. I was terrified after my parents left me at the airport. Right before boarding, I thought I had misplaced my passport. For a moment I felt a reflexive reassurance — it might be with my dad — but as I turned my head, I realized my parents were no longer there to pick up after me.</p>
          <p className="pull">“The strongest steels are forged in the hottest of fires.” — my father's voice, cutting through the silence.</p>
          <p>Some days I feel exhausted and want to leave it all behind — to go home, sit down, and just breathe. But in those moments that distant voice grounds me. I have lived in a bubble my whole life; I have only known comfort, never adversity. I get through adversity and change to improve.</p>
          <p>Like Monk Ghiatzo said, “Don't concern yourself with what was; concern yourself with what is.” Now I keep looking forward — holding my memories close and focusing on the future: new experiences, new people, and a new version of myself I am determined to discover.</p>
        </div>
      </div>
    </section>);

}

/* ---------------------------------------------------------------- YEAR */
function YearOne() {
  const highlights = [
  ["Research", "Metasonics & Applied Acoustics Lab", "Mentored by Dr. Ahmed Allam"],
  ["IEEE Int'l Ultrasonics Symposium", "Abstract submitted — lead author", "Presenting this fall, if accepted"],
  ["UC Drone Club", "Co-founder", "Getting it off the ground"],
  ["Resident Advisor", "Starting this fall", ""],
  ["Innovation Challenge", "Reached the interview round", "Trying again next time"]];

  return (
    <section className="section" id="year">
      <div className="wrap">
        <div className="sec-head reveal">
          <h2>Year In<br />Review</h2>
          <div className="meta">A season of spreading roots<br />Sophomore year<br />2025—2026</div>
        </div>

        <p className="about-lead year-lead reveal">
          A <em>season of spreading roots</em> — learning how to grow, and then
          actually growing into what it means to be a researcher and an adult.
        </p>

        <div className="year-essay">
          <div className="year-col reveal d1">
            <p>This was my last year as an underclassman, and it turned out to be the one where everything I'd been building toward started to take shape. I spent it bouncing between a research lab, a startup idea, and a club I'm trying to get off the ground — and I learned more from the messy parts than the wins.</p>
            <p>The biggest piece was my research at the <strong>Metasonics &amp; Applied Acoustics Lab</strong>, where I've been mentored by Dr. Ahmed Allam. I've been developing piezoelectric transducers that send power and data through solid metal — work that runs from COMSOL simulations to mixing epoxy and bonding parts by hand. I wrote the conference abstract entirely on my own, and if it's accepted I'll present at the <strong>IEEE International Ultrasonics Symposium</strong> this fall as a lead author. That sentence still feels strange to write as a sophomore.</p>
            <p className="pull">I'd rather make the thing than wait to be picked for it.</p>
            <p>Not everything went smoothly — and that's the part worth keeping. I landed a co-op at GE Appliances and then had the offer revoked because I'm an international student. It stung, but it pushed me to stop waiting for the right door to open and start building my own. That's part of why I'm co-founding the <strong>UC Drone Club</strong> and chasing a startup idea around maintenance bots.</p>
            <p>I went through the Innovation Challenge and made it to the interview round for the Innovation Scholar program. I didn't get in this time, but I'll be trying again. I'll also be a <strong>Resident Advisor</strong> this fall. What tied all of it together wasn't any single project — it was the people. The conversations with teammates, advisors, and mentors like Dr. Allam taught me as much as any lab did.</p>
            <p>I also learned things they don't put in a syllabus — like the fact that the government quietly takes its cut from every paycheck before I ever see it. Becoming a researcher and becoming an adult turned out to be the same lesson learned twice.</p>
          </div>
          <aside className="year-side reveal d2">
            <div className="year-side-label">This year, in brief</div>
            <ul className="hl-list">
              {highlights.map(([t, s, n], i) =>
              <li key={i}>
                  <span className="hl-t">{t}</span>
                  <span className="hl-s">{s}</span>
                  {n ? <span className="hl-n">{n}</span> : null}
                </li>
              )}
            </ul>
          </aside>
        </div>

        <blockquote className="year-close reveal">
          Last year taught me that growth comes from stepping outside my comfort
          zone; this year taught me what to do when the plan falls apart anyway —
          <em> keep moving, keep building, and let the setbacks point you somewhere better.</em>
        </blockquote>
      </div>
    </section>);

}

/* ------------------------------------------------------------- CONTACT */
function Contact() {
  return (
    <section className="section contact" id="contact">
      <div className="wrap">
        <span className="kicker reveal">03 / Let's Connect</span>
        <h2 className="reveal d1">Let's<br />build<br />something.</h2>
        <a className="contact-email reveal d2" href="mailto:timalsmt@mail.uc.edu">
          timalsmt@mail.uc.edu <span className="ar">→</span>
        </a>
        <div className="foot">
          <span>© 2026 Mohit Timalsina</span>
          <span>University Honors Program · University of Cincinnati</span>
          <a href="mailto:timalsmt@mail.uc.edu">Email ↗</a>
        </div>
      </div>
    </section>);

}

/* ------------------------------------------------------------- PROJECTS */
function Projects() {
  const items = [
  ["P-01", "proj-clt", "Hybrid CLT Prototype", "Cross-Laminated Timber · Material Research", "Testing new ways to combine timber with other materials for stronger, more sustainable structural assemblies — prototyped, documented, and iterated.", "4/3"],
  ["P-02", "proj-cairn", "Cairn Installation", "Design · Community · Fabrication", "A built installation that turns design into a shared space — one that invites reflection and connection beyond pure problem-solving.", "4/3"],
  ["P-03", "proj-open", "Your next build", "Add a project", "Drop in a photo and a few lines about another project — a class build, a personal Lego-engineering experiment, anything you're proud of.", "4/3"]];

  return (
    <section className="section" id="projects">
      <div className="wrap">
        <div className="sec-head reveal">
          <h2>Projects</h2>
          <div className="meta">Things I've made<br />Hands-on &amp; iterative<br />2025—2026</div>
        </div>
        <div className="proj-grid">
          {items.map(([idx, slot, title, cat, desc, ar], i) =>
          <article className={"proj-card reveal d" + (i % 3 + 1)} key={slot}>
              <div className="proj-media">
                <image-slot id={slot} shape="rounded" radius="2" placeholder={"Drop a photo · " + title} style={{ width: "100%", aspectRatio: ar }}></image-slot>
                <span className="proj-idx">{idx}</span>
              </div>
              <h3>{title}</h3>
              <div className="proj-cat">{cat}</div>
              <p className="proj-desc">{desc}</p>
            </article>
          )}
        </div>
      </div>
    </section>);

}

/* --------------------------------------------------------- INVOLVEMENTS */
function Involvements() {
  const rows = [
  ["CEAS Ambassador", "Tour Guide", "2025 — Present", "Selective College of Engineering organization — leading campus tours for prospective students and families."],
  ["SRS Leader · Calculus I & II", "Peer Tutor", "2025", "Tutored students one-on-one in limits, derivatives, and integrals, building tailored study plans alongside faculty."],
  ["Honors Ambassador", "Representative", "2024 — 25", "Tabling, one-on-one sessions, and presentations sharing the University Honors Program across campus."],
  ["Blemish Stickers", "Founder & Operator", "2018 — 22", "Designed and sold custom stickers to brands and teens in Kathmandu — my first taste of building a product."]];

  return (
    <section className="section involve" id="involvements">
      <div className="wrap">
        <div className="sec-head reveal">
          <h2>Involve&shy;ments</h2>
          <div className="meta">Programs &amp; communities<br />On &amp; beyond campus<br />University of Cincinnati</div>
        </div>
        <div className="involve-list">
          {rows.map(([org, role, period, desc], i) =>
          <div className="involve-row reveal" key={i}>
              <div className="involve-org"><h4>{org}</h4><p>{desc}</p></div>
              <div className="involve-role">{role}</div>
              <div className="involve-period">{period}</div>
            </div>
          )}
        </div>
      </div>
    </section>);

}

Object.assign(window, { Nav, Hero, Marquee, About, Projects, Experiences, Reflections, YearOne, Involvements, Contact });