/* global React, ReactDOM, useTweaks, TweaksPanel, TweakSection, TweakColor, TweakToggle, TweakSelect */
const { useEffect, useRef } = React;

const TWEAK_DEFAULTS = /*EDITMODE-BEGIN*/{
  "theme": "Cream",
  "accent": "#E00122",
  "display": "Bricolage Grotesque",
  "grain": true
}/*EDITMODE-END*/;

/* full palette themes — [paper, ink] */
const THEMES = {
  "Cream":       ["#F4EEE2", "#1A1712"],
  "Snow":        ["#FBFAF7", "#101010"],
  "Sandstone":   ["#ECE2D0", "#2A2014"],
  "Blueprint":   ["#E7EDF2", "#16202B"],
  "Sage":        ["#E9EEE6", "#18231A"],
  "Midnight":    ["#15130E", "#F2ECDD"],
  "Charcoal":    ["#1A1A1C", "#ECE9E2"],
  "Slate Night": ["#12171D", "#E6ECF2"],
};

const DISPLAY_STACKS = {
  "Bricolage Grotesque": '"Bricolage Grotesque", "Archivo", sans-serif',
  "Archivo": '"Archivo", "Bricolage Grotesque", sans-serif',
  "Anton": '"Anton", "Archivo", sans-serif',
  "Fraunces": '"Fraunces", "Newsreader", serif',
};

function luminance(hex) {
  const h = hex.replace("#", "");
  const r = parseInt(h.slice(0, 2), 16) / 255;
  const g = parseInt(h.slice(2, 4), 16) / 255;
  const b = parseInt(h.slice(4, 6), 16) / 255;
  return 0.2126 * r + 0.7152 * g + 0.0722 * b;
}

function useReveal() {
  useEffect(() => {
    const obs = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) { e.target.classList.add("in"); obs.unobserve(e.target); }
        });
      },
      { threshold: 0.12, rootMargin: "0px 0px -8% 0px" }
    );
    const scan = () => document.querySelectorAll(".reveal:not(.in)").forEach((el) => obs.observe(el));
    scan();
    const t = setTimeout(scan, 400);
    return () => { clearTimeout(t); obs.disconnect(); };
  }, []);
}

function useProgress(ref) {
  useEffect(() => {
    const onScroll = () => {
      const h = document.documentElement;
      const max = h.scrollHeight - h.clientHeight;
      const pct = max > 0 ? (h.scrollTop / max) * 100 : 0;
      if (ref.current) ref.current.style.width = pct + "%";
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, [ref]);
}

function App() {
  const [t, setTweak] = useTweaks(TWEAK_DEFAULTS);
  const progressRef = useRef(null);
  useReveal();
  useProgress(progressRef);

  useEffect(() => {
    const [paper, ink] = THEMES[t.theme] || THEMES["Cream"];
    const r = document.documentElement;
    r.style.setProperty("--paper", paper);
    r.style.setProperty("--ink", ink);
    r.style.setProperty("--accent", t.accent);
    r.style.setProperty("--font-display", DISPLAY_STACKS[t.display] || DISPLAY_STACKS["Bricolage Grotesque"]);
    const dark = luminance(paper) < 0.42;
    r.style.setProperty("--grain-blend", dark ? "screen" : "multiply");
    r.style.setProperty("--grain-opacity", dark ? "0.05" : "0.04");
    document.body.style.setProperty("--grain-display", t.grain ? "block" : "none");
  }, [t.theme, t.accent, t.display, t.grain]);

  return (
    <React.Fragment>
      <div className="progress" ref={progressRef}></div>
      <Nav />
      <Hero />
      <Marquee />
      <About />
      <Projects />
      <Experiences />
      <Reflections />
      <YearOne />
      <Involvements />
      <Contact />

      <TweaksPanel>
        <TweakSection label="Theme" />
        <TweakSelect label="Palette" value={t.theme}
          options={Object.keys(THEMES)}
          onChange={(v) => setTweak("theme", v)} />
        <TweakColor label="Accent" value={t.accent}
          options={["#E00122", "#000000", "#C8102E", "#1B5FA8", "#2F6B47", "#B5532A", "#7A5AE0"]}
          onChange={(v) => setTweak("accent", v)} />
        <TweakToggle label="Paper grain" value={t.grain} onChange={(v) => setTweak("grain", v)} />
        <TweakSection label="Display type" />
        <TweakSelect label="Headline font" value={t.display}
          options={["Bricolage Grotesque", "Archivo", "Anton", "Fraunces"]}
          onChange={(v) => setTweak("display", v)} />
      </TweaksPanel>
    </React.Fragment>
  );
}

ReactDOM.createRoot(document.getElementById("root")).render(<App />);
