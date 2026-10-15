function Reveal(props) {
  const ref = useRef(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver((es) => {
      for (const en of es) if (en.isIntersecting) {
        el.classList.add("on");
        io.disconnect();
      }
    }, { threshold: 0.16, rootMargin: "0px 0px -6% 0px" });
    io.observe(el);
    return () => io.disconnect();
  }, []);
  const cls = "reveal" + (props.d ? " d" + props.d : "") + (props.className ? " " + props.className : "");
  return /* @__PURE__ */ React.createElement("div", { ref, className: cls, style: props.style }, props.children);
}
function Topbar(props) {
  const a = props.active;
  const link = (href, key, label) => /* @__PURE__ */ React.createElement("a", { key, href, className: a === key ? "on" : "" }, label);
  return /* @__PURE__ */ React.createElement("header", { className: "topbar" }, /* @__PURE__ */ React.createElement("a", { className: "brand", href: "#/" }, /* @__PURE__ */ React.createElement("span", { className: "brand-dot" }), /* @__PURE__ */ React.createElement("span", { className: "brand-dot" }), "iMeeting \xB7 \u841D\u535C\u5F00\u4F1A"), /* @__PURE__ */ React.createElement("nav", { className: "nav" }, link("#/time", "time", "\u4E4B\u4E00\xB7\u65F6\u95F4"), link("#/order", "order", "\u4E4B\u4E8C\xB7\u79E9\u5E8F"), link("#/continuity", "continuity", "\u4E4B\u4E09\xB7\u8FDE\u7EED"), /* @__PURE__ */ React.createElement("span", { className: "nav-sep" }, "|"), link("#/guide", "guide", "\u53C2\u4F1A\u5F15\u5BFC"), link("#/organizer", "organizer", "\u7EC4\u7EC7\u8005\u624B\u518C"), /* @__PURE__ */ React.createElement("a", { className: "go", href: "https://imeeting.co/", target: "_blank", rel: "noopener" }, "\u8FDB\u5165 iMeeting \u2197")));
}
function Footer(props) {
  return /* @__PURE__ */ React.createElement("footer", null, /* @__PURE__ */ React.createElement("div", { className: "sig" }, "iMeeting \xB7 \u841D\u535C\u5F00\u4F1A \u2014 Meetings become memory."), props.children);
}
function Eyebrow(props) {
  return /* @__PURE__ */ React.createElement(Reveal, null, /* @__PURE__ */ React.createElement("div", { className: "eyebrow" }, props.children));
}
function Bars(props) {
  const ref = useRef(null);
  useEffect(() => {
    const el = ref.current;
    const io = new IntersectionObserver((es) => {
      for (const en of es) if (en.isIntersecting) {
        el.classList.add("on");
        io.disconnect();
      }
    }, { threshold: 0.3 });
    io.observe(el);
    return () => io.disconnect();
  }, []);
  return /* @__PURE__ */ React.createElement("div", { className: "bars", ref }, props.rows.map((r, i) => /* @__PURE__ */ React.createElement("div", { className: "bar-row", key: i }, /* @__PURE__ */ React.createElement("div", { className: "bar-label" }, /* @__PURE__ */ React.createElement("b", null, r.label), /* @__PURE__ */ React.createElement("span", null, r.meta)), /* @__PURE__ */ React.createElement("div", { className: "track" }, r.segs.map((s, j) => /* @__PURE__ */ React.createElement("div", { className: "seg " + s.cls + (s.w < 12 ? " narrow" : ""), style: { "--w": s.w + "%", transitionDelay: j * 0.13 + "s" }, key: j }, /* @__PURE__ */ React.createElement("small", null, s.text)))))));
}
function AnswerGrid(props) {
  return /* @__PURE__ */ React.createElement(Reveal, { d: props.d || 3, className: "answer-grid" }, props.cells.map((c, i) => /* @__PURE__ */ React.createElement("div", { className: "answer-cell", key: i }, /* @__PURE__ */ React.createElement("div", { className: "k" }, c.k), /* @__PURE__ */ React.createElement("div", { className: "v" }, c.v))));
}
function Rows(props) {
  return /* @__PURE__ */ React.createElement("div", { className: "rows" }, props.items.map((it, i) => /* @__PURE__ */ React.createElement(Reveal, { key: i, className: "row", d: 0 }, /* @__PURE__ */ React.createElement("span", { className: "no" }, it.no), /* @__PURE__ */ React.createElement("span", { className: "t" }, it.t), /* @__PURE__ */ React.createElement("span", { className: "d" }, it.d))));
}
function MechGrid(props) {
  return /* @__PURE__ */ React.createElement("div", { className: "mech-grid" }, props.items.map((m, i) => /* @__PURE__ */ React.createElement(Reveal, { key: i, className: "mech-acc", d: i % 4 }, /* @__PURE__ */ React.createElement("details", null, /* @__PURE__ */ React.createElement("summary", null, /* @__PURE__ */ React.createElement("span", { className: "m-no" }, m.no), /* @__PURE__ */ React.createElement("span", { className: "m-title" }, m.title), /* @__PURE__ */ React.createElement("span", { className: "m-plus", "aria-hidden": "true" })), /* @__PURE__ */ React.createElement("div", { className: "m-body" }, /* @__PURE__ */ React.createElement("dl", null, /* @__PURE__ */ React.createElement("dt", null, "\u7BA1\u4EC0\u4E48"), /* @__PURE__ */ React.createElement("dd", null, m.what), /* @__PURE__ */ React.createElement("dt", null, "\u4F55\u65F6\u89E6\u53D1"), /* @__PURE__ */ React.createElement("dd", null, m.when)), /* @__PURE__ */ React.createElement("div", { className: "adj" }, /* @__PURE__ */ React.createElement("b", null, "\u7EC4\u7EC7\u53EF\u600E\u4E48\u8C03"), /* @__PURE__ */ React.createElement("span", null, m.adj)))))));
}
function Slice(props) {
  const wrapRef = useRef(null);
  const clockRef = useRef(null);
  useEffect(() => {
    const wrap = wrapRef.current;
    if (!wrap || !clockRef.current) return;
    const io = new IntersectionObserver((es) => {
      for (const en of es) {
        if (en.isIntersecting && en.target.dataset.left) clockRef.current.textContent = en.target.dataset.left;
      }
    }, { threshold: 0.6 });
    wrap.querySelectorAll("[data-left]").forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, []);
  return /* @__PURE__ */ React.createElement(Reveal, { d: 2, className: "slice-wrap" }, /* @__PURE__ */ React.createElement("div", { ref: wrapRef, style: { display: "contents" } }, /* @__PURE__ */ React.createElement("div", { className: "slice-sticky" }, /* @__PURE__ */ React.createElement("span", { className: "tag" }, props.tag), /* @__PURE__ */ React.createElement("span", null, props.title), /* @__PURE__ */ React.createElement("span", { className: "dim" }, props.dim, props.clock ? /* @__PURE__ */ React.createElement("span", null, " \xB7 ", /* @__PURE__ */ React.createElement("span", { className: "clock", ref: clockRef }, props.clockStart)) : null)), /* @__PURE__ */ React.createElement("div", { className: "slice-body" }, props.children)));
}
function E(props) {
  return /* @__PURE__ */ React.createElement(Reveal, { className: "e" + (props.host ? " host" : "") }, /* @__PURE__ */ React.createElement("div", { className: "e-time" }, props.time), /* @__PURE__ */ React.createElement("div", { "data-left": props.left || void 0 }, /* @__PURE__ */ React.createElement("div", { className: "e-who" }, /* @__PURE__ */ React.createElement("b", null, props.who), props.role ? " \xB7 " + props.role : ""), props.children));
}
function Note(props) {
  return /* @__PURE__ */ React.createElement("div", { className: "e-note" }, /* @__PURE__ */ React.createElement("span", { className: "chip" + (props.orange ? " orange" : "") }, props.chip), props.why ? /* @__PURE__ */ React.createElement("span", { className: "why" }, props.why) : null);
}
const FLAP_CHARS = "\u52A8\u8BAE\u9644\u8BAE\u8FA9\u8BBA\u8868\u51B3\u5BA3\u5E03\u8BB0\u5F55\u4E3B\u6301\u79E9\u5E8F0123456789\u8D5E\u6210\u53CD\u5BF9\u5F03\u6743";
function Flap(props) {
  const ref = useRef(null);
  const [text, setText] = useState("\xA0");
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const final = props.text;
    const io = new IntersectionObserver((es) => {
      for (const en of es) {
        if (!en.isIntersecting) continue;
        io.disconnect();
        const chars = [...final];
        let settled = 0, tick = 0;
        const timer = setInterval(() => {
          tick++;
          let line = "";
          for (let i = 0; i < chars.length; i++) {
            if (i < settled) {
              line += chars[i];
              continue;
            }
            if (chars[i] === " ") {
              line += " ";
              continue;
            }
            line += FLAP_CHARS[Math.floor(Math.random() * FLAP_CHARS.length)];
          }
          setText(line);
          if (tick % 2 === 0 && settled < chars.length) settled += Math.max(1, Math.round(chars.length / 26));
          if (settled >= chars.length) {
            setText(final);
            clearInterval(timer);
          }
        }, 46);
      }
    }, { threshold: 0.5 });
    io.observe(el);
    return () => io.disconnect();
  }, []);
  return /* @__PURE__ */ React.createElement("div", { className: "flap", ref }, text);
}
function VoteMeter(props) {
  const total = props.items.reduce((s, it) => s + it.n, 0);
  return /* @__PURE__ */ React.createElement("div", { className: "vote-meter" }, props.items.map((it, i) => /* @__PURE__ */ React.createElement("div", { className: "vm-row", key: i }, /* @__PURE__ */ React.createElement("span", { className: "vm-label" }, it.label), /* @__PURE__ */ React.createElement("meter", { min: 0, max: total, value: it.n, className: "vm-" + it.cls }, it.n), /* @__PURE__ */ React.createElement("span", { className: "vm-n" }, it.n, " \u7968"))), /* @__PURE__ */ React.createElement("div", { className: "vm-caption" }, "\u5171 ", total, " \u7968 \xB7 \u8BB0\u540D\u8868\u51B3 \xB7 \u6BCF\u7968\u7559\u75D5"));
}
function RangeDemo(props) {
  const [v, setV] = useState(props.value || 2);
  return /* @__PURE__ */ React.createElement("div", { className: "range-demo" }, /* @__PURE__ */ React.createElement("div", { className: "rd-head" }, /* @__PURE__ */ React.createElement("span", { className: "rd-label" }, props.label), /* @__PURE__ */ React.createElement("span", { className: "rd-value" }, v, " ", props.unit)), /* @__PURE__ */ React.createElement(
    "input",
    {
      type: "range",
      min: props.min,
      max: props.max,
      step: props.step || 1,
      value: v,
      onChange: (e) => setV(e.target.value),
      "aria-label": props.label
    }
  ), /* @__PURE__ */ React.createElement("div", { className: "rd-caption" }, props.caption));
}
const CHAOS_PATHS = [
  "M10 30 C 90 96, 150 16, 230 84",
  "M10 66 C 70 16, 170 112, 230 44",
  "M10 104 C 100 132, 140 34, 230 112",
  "M10 142 C 60 64, 160 152, 230 132",
  "M10 50 C 110 152, 130 64, 230 24",
  "M10 128 C 90 34, 170 94, 230 148"
];
const ORDER_LANES = [
  { y: 50, t: "\u4FEE\u6B63\u6848" },
  { y: 90, t: "\u79E9\u5E8F\u95EE\u9898" },
  { y: 130, t: "\u63A8\u8FDF\u52A8\u8BAE" },
  { y: 170, t: "\u62C6\u5206\u5904\u7406" }
];
function ChaosOrderDiagram() {
  const ref = useOnView(0.3);
  return /* @__PURE__ */ React.createElement("div", { className: "diagram chaos-dia", ref }, /* @__PURE__ */ React.createElement("svg", { viewBox: "0 0 1000 220", className: "svg-wide", role: "img", "aria-label": "\u6CA1\u6709\u7ED3\u6784\u4E0E\u6709\u7A0B\u5E8F\u7684\u5BF9\u7167\u56FE" }, /* @__PURE__ */ React.createElement("text", { x: "16", y: "24", className: "svg-cap" }, "\u6CA1\u6709\u7ED3\u6784 \xB7 \u8C01\u62A2\u5230\u8C01\u5148\u8BF4"), /* @__PURE__ */ React.createElement("g", { className: "chaos" }, CHAOS_PATHS.map((d, i) => /* @__PURE__ */ React.createElement("g", { key: i }, /* @__PURE__ */ React.createElement("path", { d, className: "chaos-base", fill: "none" }), /* @__PURE__ */ React.createElement("path", { d, className: "chaos-flow", fill: "none", style: { animationDelay: i * -0.7 + "s" } }))), /* @__PURE__ */ React.createElement("circle", { cx: "122", cy: "84", r: "7", className: "chaos-dot" }), /* @__PURE__ */ React.createElement("circle", { cx: "188", cy: "58", r: "5.5", className: "chaos-dot" })), /* @__PURE__ */ React.createElement("text", { x: "268", y: "118", className: "svg-vs" }, "\u2192"), /* @__PURE__ */ React.createElement("g", { transform: "translate(340,0)" }, /* @__PURE__ */ React.createElement("text", { x: "16", y: "24", className: "svg-cap" }, "\u6709\u7A0B\u5E8F \xB7 \u5404\u81EA\u8FDB\u5165\u901A\u9053"), ORDER_LANES.map((l, i) => /* @__PURE__ */ React.createElement("g", { key: i }, /* @__PURE__ */ React.createElement("path", { d: "M10 " + l.y + " H 456", className: "lane-line", fill: "none" }), /* @__PURE__ */ React.createElement("circle", { cx: "10", cy: l.y, r: "7", className: "lane-start" }), /* @__PURE__ */ React.createElement("rect", { x: "486", y: l.y - 19, width: "152", height: "38", rx: "19", className: "lane-pill" }), /* @__PURE__ */ React.createElement("text", { x: "562", y: l.y + 5, textAnchor: "middle", className: "lane-label" }, l.t), /* @__PURE__ */ React.createElement("circle", { r: "4.5", className: "lane-dot" }, /* @__PURE__ */ React.createElement("animateMotion", { dur: 3.4 + i * 0.3 + "s", repeatCount: "indefinite", path: "M10 " + l.y + " H 456" })))))));
}
function MeetingLoopDiagram() {
  const ref = useRef(null);
  useEffect(() => {
    const el = ref.current;
    const io = new IntersectionObserver((es) => {
      for (const en of es) if (en.isIntersecting) {
        el.classList.add("on");
        io.disconnect();
      }
    }, { threshold: 0.35 });
    io.observe(el);
    return () => io.disconnect();
  }, []);
  const steps = ["\u52A8\u8BAE", "\u9644\u8BAE", "\u5BA3\u5E03\u8BAE\u9898", "\u8FA9\u8BBA", "\u8868\u51B3", "\u5BA3\u5E03\u7ED3\u679C"];
  return /* @__PURE__ */ React.createElement("div", { className: "diagram", ref }, /* @__PURE__ */ React.createElement("svg", { viewBox: "0 0 1000 300", className: "svg-wide", role: "img", "aria-label": "\u4F1A\u8BAE\u751F\u547D\u5468\u671F\u56FE" }, /* @__PURE__ */ React.createElement("g", { className: "loop-steps" }, steps.map((s, i) => /* @__PURE__ */ React.createElement("g", { key: i, transform: "translate(" + (60 + i * 150) + ",70)" }, /* @__PURE__ */ React.createElement("rect", { x: "-52", y: "-24", width: "104", height: "48", rx: "4", className: "node-box" }), /* @__PURE__ */ React.createElement("text", { textAnchor: "middle", y: "-2", className: "node-no" }, "0" + (i + 1)), /* @__PURE__ */ React.createElement("text", { textAnchor: "middle", y: "16", className: "node-t" }, s), i < steps.length - 1 ? /* @__PURE__ */ React.createElement("path", { d: "M 56 0 H 92", className: "flow-arrow" }) : null))), /* @__PURE__ */ React.createElement("path", { d: "M 912 70 C 960 140, 900 200, 760 210 H 240 C 120 210, 40 150, 58 84", fill: "none", className: "loop-back" }), /* @__PURE__ */ React.createElement("g", { transform: "translate(500,186)" }, /* @__PURE__ */ React.createElement("rect", { x: "-170", y: "-26", width: "340", height: "52", rx: "4", className: "node-box accent" }), /* @__PURE__ */ React.createElement("text", { textAnchor: "middle", y: "-3", className: "node-t2" }, "\u51B3\u8BAE \u2192 \u5951\u7EA6 \xB7 \u4F1A\u8BAE\u7EAA\u8981 \xB7 \u672A\u5B8C\u4E8B\u52A1"), /* @__PURE__ */ React.createElement("text", { textAnchor: "middle", y: "17", className: "node-sub" }, "\u51B3\u5B9A\u88AB\u8BB0\u5F55\uFF0C\u5E76\u81EA\u52A8\u56DE\u5230\u4E0B\u4E00\u6B21\u4F1A\u8BAE")), /* @__PURE__ */ React.createElement("text", { x: "60", y: "278", className: "svg-cap" }, "\u4F1A\u524D\uFF1A\u901A\u77E5\u4E0E\u8BAE\u7A0B \u2192 \u4F1A\u4E2D\uFF1A\u52A8\u8BAE\u516D\u90E8\u66F2 \u2192 \u4F1A\u540E\uFF1A\u51B3\u8BAE\u6709\u751F\u547D \u2192 \u4E0B\u4E00\u6B21\u4F1A\u8BAE\uFF0C\u63A5\u7740\u4E0A\u6B21\u7EE7\u7EED")));
}
function VoiceRoutingDiagram() {
  const ref = useRef(null);
  useEffect(() => {
    const el = ref.current;
    const io = new IntersectionObserver((es) => {
      for (const en of es) if (en.isIntersecting) {
        el.classList.add("on");
        io.disconnect();
      }
    }, { threshold: 0.35 });
    io.observe(el);
    return () => io.disconnect();
  }, []);
  const voices = [
    { who: "\u7532", say: "\u8BE5\u6539\u6210\u65C5\u6E38", out: "\u4FEE\u6B63\u6848", color: "c-teal" },
    { who: "\u4E59", say: "\u8FDE\u5047 + \u52A0\u57F9\u8BAD", out: "\u62C6\u6210\u4E24\u4EF6\u4E8B", color: "c-grass" },
    { who: "\u4E19", say: "\u8BA8\u8BBA\u987A\u5E8F\u9519\u4E86", out: "\u79E9\u5E8F\u95EE\u9898", color: "c-orange" },
    { who: "\u4E01", say: "\u73B0\u5728\u4E0D\u8BE5\u8BA8\u8BBA", out: "\u63A8\u8FDF\u52A8\u8BAE", color: "c-ink" }
  ];
  return /* @__PURE__ */ React.createElement("div", { className: "diagram", ref }, /* @__PURE__ */ React.createElement("svg", { viewBox: "0 0 1000 260", className: "svg-wide", role: "img", "aria-label": "\u56DB\u4E2A\u58F0\u97F3\u5404\u81EA\u8FDB\u5165\u5BF9\u5E94\u901A\u9053" }, voices.map((v, i) => {
    const y = 45 + i * 60;
    return /* @__PURE__ */ React.createElement("g", { key: i, className: "route " + v.color }, /* @__PURE__ */ React.createElement("circle", { cx: "60", cy: y, r: "18", className: "route-who" }), /* @__PURE__ */ React.createElement("text", { x: "60", y: y + 5, textAnchor: "middle", className: "route-who-t" }, v.who), /* @__PURE__ */ React.createElement("text", { x: "95", y: y + 5, className: "route-say" }, v.say), /* @__PURE__ */ React.createElement("path", { d: "M 300 " + y + " H 640", className: "route-line", fill: "none" }), /* @__PURE__ */ React.createElement("rect", { x: "650", y: y - 20, width: "150", height: "40", rx: "4", className: "route-out" }), /* @__PURE__ */ React.createElement("text", { x: "725", y: y + 5, textAnchor: "middle", className: "route-out-t" }, v.out));
  }), /* @__PURE__ */ React.createElement("text", { x: "300", y: "245", className: "svg-cap" }, "\u56DB\u79CD\u5F02\u8BAE\uFF0C\u56DB\u6761\u901A\u9053\uFF0C\u4E92\u4E0D\u6DF9\u6CA1\u2014\u2014\u987A\u5E8F\u7531\u89C4\u5219\u51B3\u5B9A")));
}
function MeetingTimelineDiagram() {
  const ref = useRef(null);
  useEffect(() => {
    const el = ref.current;
    const io = new IntersectionObserver((es) => {
      for (const en of es) if (en.isIntersecting) {
        el.classList.add("on");
        io.disconnect();
      }
    }, { threshold: 0.35 });
    io.observe(el);
    return () => io.disconnect();
  }, []);
  return /* @__PURE__ */ React.createElement("div", { className: "diagram", ref }, /* @__PURE__ */ React.createElement("svg", { viewBox: "0 0 1000 240", className: "svg-wide", role: "img", "aria-label": "\u4F1A\u8BAE\u4E4B\u95F4\u901A\u8FC7\u672A\u5B8C\u4E8B\u52A1\u4E0E\u5951\u7EA6\u76F8\u8FDE" }, /* @__PURE__ */ React.createElement("path", { d: "M 40 120 H 960", className: "tl-axis" }), [
    { x: 160, name: "\u7B2C 11 \u6B21\u4F8B\u4F1A", note: "\u51B3\u8BAE 4 \u9879 \xB7 \u5951\u7EA6 1 \u4EFD" },
    { x: 500, name: "\u7B2C 12 \u6B21\u4F8B\u4F1A", note: "\u5BA3\u8BFB\u8BB0\u5F55 \u2192 \u672A\u5B8C\u4E8B\u52A1\u7EE7\u7EED" },
    { x: 840, name: "\u7B2C 13 \u6B21\u4F8B\u4F1A", note: "\u81EA\u52A8\u6392\u5165\u65E5\u5386" }
  ].map((m, i) => /* @__PURE__ */ React.createElement("g", { key: i, transform: "translate(" + m.x + ",120)" }, /* @__PURE__ */ React.createElement("circle", { r: "10", className: "tl-node" }), /* @__PURE__ */ React.createElement("text", { y: "-22", textAnchor: "middle", className: "tl-name" }, m.name), /* @__PURE__ */ React.createElement("text", { y: "34", textAnchor: "middle", className: "tl-note" }, m.note))), /* @__PURE__ */ React.createElement("path", { d: "M 160 108 C 240 40, 420 40, 500 108", fill: "none", className: "tl-arc" }), /* @__PURE__ */ React.createElement("text", { x: "330", y: "52", textAnchor: "middle", className: "tl-arc-t" }, "\u672A\u5B8C\u4E8B\u52A1\u81EA\u52A8\u8FDB\u5165\u4E0B\u6B21\u8BAE\u7A0B"), /* @__PURE__ */ React.createElement("path", { d: "M 500 132 C 580 200, 760 200, 840 132", fill: "none", className: "tl-arc accent" }), /* @__PURE__ */ React.createElement("text", { x: "670", y: "196", textAnchor: "middle", className: "tl-arc-t" }, "\u51B3\u8BAE \u2192 \u5951\u7EA6\u94FE\u63A5 \xB7 \u51ED\u636E\u516C\u5F00")));
}
function Paths(props) {
  return /* @__PURE__ */ React.createElement("div", { className: "paths" }, props.items.map((p, i) => /* @__PURE__ */ React.createElement(Reveal, { key: i, className: "path", d: i }, /* @__PURE__ */ React.createElement("a", { href: p.href, style: { textDecoration: "none", color: "inherit", display: "contents" } }, /* @__PURE__ */ React.createElement("span", { className: "p-k" }, p.k), /* @__PURE__ */ React.createElement("span", { className: "p-t" }, p.t), /* @__PURE__ */ React.createElement("span", { className: "p-d" }, p.d), /* @__PURE__ */ React.createElement("span", { className: "p-go" }, p.go)))));
}
function Turn(props) {
  return /* @__PURE__ */ React.createElement("section", { className: "turn" }, /* @__PURE__ */ React.createElement(Eyebrow, null, props.eyebrow), /* @__PURE__ */ React.createElement(Reveal, { d: 1 }, /* @__PURE__ */ React.createElement("h2", null, props.title)), /* @__PURE__ */ React.createElement(Reveal, { d: 2 }, /* @__PURE__ */ React.createElement("p", { className: "lead" }, props.lead)), props.next ? /* @__PURE__ */ React.createElement(Reveal, { d: 3 }, /* @__PURE__ */ React.createElement("a", { className: "next-act", href: props.next.href }, /* @__PURE__ */ React.createElement("span", null, "NEXT"), /* @__PURE__ */ React.createElement("b", null, props.next.title), /* @__PURE__ */ React.createElement("span", null, props.next.label))) : null);
}
function Toc(props) {
  return /* @__PURE__ */ React.createElement(Reveal, { d: 3, className: "toc" }, props.items.map((it, i) => /* @__PURE__ */ React.createElement("a", { key: i, href: it.href }, it.label)));
}
function SpecTable(props) {
  return /* @__PURE__ */ React.createElement(Reveal, { d: 1 }, /* @__PURE__ */ React.createElement("table", { className: "spec" }, /* @__PURE__ */ React.createElement("thead", null, /* @__PURE__ */ React.createElement("tr", null, props.head.map((h, i) => /* @__PURE__ */ React.createElement("th", { key: i }, h)))), /* @__PURE__ */ React.createElement("tbody", null, props.rows.map((r, i) => /* @__PURE__ */ React.createElement("tr", { key: i }, r.map((cell, j) => /* @__PURE__ */ React.createElement("td", { key: j }, cell)))))));
}
function DocNote(props) {
  return /* @__PURE__ */ React.createElement(Reveal, { d: props.d || 2, className: "doc-note" + (props.orange ? " orange" : "") }, props.children);
}
function Steps(props) {
  return /* @__PURE__ */ React.createElement(Reveal, { d: 1, className: "steps", style: props.cols ? { gridTemplateColumns: "repeat(" + props.cols + ",1fr)" } : void 0 }, props.items.map((s, i) => /* @__PURE__ */ React.createElement("div", { className: "step", key: i }, /* @__PURE__ */ React.createElement("div", { className: "s-no" }, s.no), /* @__PURE__ */ React.createElement("div", { className: "s-t" }, s.t), /* @__PURE__ */ React.createElement("div", { className: "s-d" }, s.d))));
}
function GradientWavesBg(props) {
  const ref = useRef(null);
  useEffect(() => {
    if (!ref.current || !window.GradientWavesInit) return;
    window.__gw = window.GradientWavesInit(ref.current, props) || null;
  }, []);
  return /* @__PURE__ */ React.createElement("div", { className: "global-aurora", ref, "aria-hidden": "true" });
}
function drawHeadingGradient() {
  const c = document.createElement("canvas");
  c.width = 1400;
  c.height = 420;
  const x = c.getContext("2d");
  const g = x.createLinearGradient(0, 0, 1400, 420);
  g.addColorStop(0, "#1f4e79");
  g.addColorStop(0.45, "#3d6b82");
  g.addColorStop(0.75, "#7fb3c8");
  g.addColorStop(1, "#b8d4de");
  x.fillStyle = g;
  x.fillRect(0, 0, 1400, 420);
  const spots = [[300, 120, 180, "rgba(255,255,255,.55)"], [900, 300, 220, "rgba(255,255,255,.4)"], [1150, 100, 140, "rgba(220,232,236,.5)"]];
  for (const [sx, sy, r, col] of spots) {
    const rg = x.createRadialGradient(sx, sy, 0, sx, sy, r);
    rg.addColorStop(0, col);
    rg.addColorStop(1, "rgba(255,255,255,0)");
    x.fillStyle = rg;
    x.fillRect(0, 0, 1400, 420);
  }
  return c.toDataURL("image/png");
}
function MaskedTitle(props) {
  const srcRef = useRef(null);
  if (!srcRef.current) srcRef.current = drawHeadingGradient();
  if (!window.MaskedHeading) return /* @__PURE__ */ React.createElement("h1", null, props.text);
  return /* @__PURE__ */ React.createElement(
    window.MaskedHeading,
    {
      text: props.text,
      src: srcRef.current,
      fillScale: 1.2,
      parallax: 20,
      reveal: "rise",
      trigger: "view",
      drift: 16,
      brightness: 1,
      saturation: 1,
      duration: 1.1,
      stagger: 0.08,
      align: "center",
      weight: 800,
      tracking: -0.02,
      lineHeight: 1.05,
      textScale: props.textScale || 0.17
    }
  );
}
const SCREEN_PALETTES = [
  ["#7fb3c8", "#3d6b82", "#ffffff"],
  // S1 首屏 · 青花系
  ["#8fa8bd", "#4a6b8a", "#ffffff"],
  // S2 对比 · 灰蓝系
  ["#a4c8d8", "#2f5d8a", "#ffffff"],
  // S3 效果 · 青花系
  ["#6ba3bd", "#1f4e79", "#ffffff"],
  // S4 文件夹 · 深青花
  ["#7fb3c8", "#3d6b82", "#ffffff"],
  // S5 脉络 · 青花系
  ["#9db4c6", "#527a8a", "#ffffff"],
  // S6 会后 · 灰蓝系
  ["#8aa5bb", "#40607a", "#ffffff"],
  // S7 开始 · 灰蓝系
  ["#cfdde4", "#2f5d8a", "#f4f8f9"]
  // S8 尾声 · 月白
];
let pagerGo = null;
function FullPager(props) {
  useEffect(() => {
    const PALETTES = props.palettes || SCREEN_PALETTES;
    const screens = Array.from(document.querySelectorAll(".screen"));
    if (!screens.length) return void 0;
    let idx = 0, anim = false;
    const apply = (i) => {
      const p = PALETTES[i % PALETTES.length];
      if (window.__gw && window.__gw.setColors) window.__gw.setColors(p[0], p[1], p[2]);
    };
    const go = (i, relative) => {
      if (relative) i = idx + i;
      i = Math.max(0, Math.min(screens.length - 1, i));
      if (anim) return;
      idx = i;
      anim = true;
      apply(i);
      window.scrollTo({ top: screens[i].offsetTop, behavior: "smooth" });
      setTimeout(() => {
        anim = false;
      }, 950);
    };
    const io = new IntersectionObserver((entries) => {
      for (const en of entries) {
        if (!en.isIntersecting || en.intersectionRatio < 0.55) continue;
        const i = screens.indexOf(en.target);
        if (i >= 0 && i !== idx) {
          idx = i;
          apply(i);
        }
      }
    }, { threshold: [0.55] });
    screens.forEach((s) => io.observe(s));
    const onWheel = (e) => {
      e.preventDefault();
      if (anim || Math.abs(e.deltaY) < 18) return;
      go(idx + (e.deltaY > 0 ? 1 : -1));
    };
    const onKey = (e) => {
      if (e.key === "ArrowDown" || e.key === "PageDown" || e.key === " ") {
        e.preventDefault();
        go(idx + 1);
      } else if (e.key === "ArrowUp" || e.key === "PageUp") {
        e.preventDefault();
        go(idx - 1);
      } else if (e.key === "Home") {
        e.preventDefault();
        go(0);
      } else if (e.key === "End") {
        e.preventDefault();
        go(screens.length - 1);
      }
    };
    let ty = 0;
    const onTS = (e) => {
      ty = e.touches[0].clientY;
    };
    const onTE = (e) => {
      const d = ty - e.changedTouches[0].clientY;
      if (Math.abs(d) > 48) go(idx + (d > 0 ? 1 : -1));
    };
    window.addEventListener("wheel", onWheel, { passive: false });
    window.addEventListener("keydown", onKey);
    window.addEventListener("touchstart", onTS, { passive: true });
    window.addEventListener("touchend", onTE, { passive: true });
    apply(0);
    pagerGo = go;
    return () => {
      pagerGo = null;
      io.disconnect();
      window.removeEventListener("wheel", onWheel);
      window.removeEventListener("keydown", onKey);
      window.removeEventListener("touchstart", onTS);
      window.removeEventListener("touchend", onTE);
    };
  }, []);
  return /* @__PURE__ */ React.createElement("div", { className: "pager-nav" }, /* @__PURE__ */ React.createElement("button", { className: "pager-btn", "aria-label": "\u4E0A\u4E00\u5C4F", onClick: () => pagerGo && pagerGo(-1, true) }, /* @__PURE__ */ React.createElement("svg", { viewBox: "0 0 16 16", width: "16", height: "16" }, /* @__PURE__ */ React.createElement("path", { d: "M3 10 L8 5 L13 10", fill: "none", stroke: "currentColor", strokeWidth: "1.8", strokeLinecap: "round", strokeLinejoin: "round" }))), /* @__PURE__ */ React.createElement("button", { className: "pager-btn", "aria-label": "\u4E0B\u4E00\u5C4F", onClick: () => pagerGo && pagerGo(1, true) }, /* @__PURE__ */ React.createElement("svg", { viewBox: "0 0 16 16", width: "16", height: "16" }, /* @__PURE__ */ React.createElement("path", { d: "M3 6 L8 11 L13 6", fill: "none", stroke: "currentColor", strokeWidth: "1.8", strokeLinecap: "round", strokeLinejoin: "round" }))));
}
const ORBIT_ITEMS = [
  { ch: "\u8BAE\u7A0B", t: "\u4E0D\u8DD1\u9898" },
  { ch: "\u8BA1\u65F6", t: "\u5927\u5BB6\u7EA6\u5B9A" },
  { ch: "\u51FA\u53E3", t: "\u90FD\u6709\u4F4D\u7F6E" },
  { ch: "\u4F11\u4F1A", t: "\u4E5F\u662F\u6743\u5229" }
];
function PorcelainOrbit() {
  const stageRef = useRef(null);
  const itemRefs = useRef([]);
  useEffect(() => {
    const stage = stageRef.current;
    if (!stage) return;
    const reduce = window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    let raf = 0, angle = 0, last = 0, visible = true;
    const RX = 340, RY = 120, TILT = -8 * Math.PI / 180;
    const cos = Math.cos(TILT), sin = Math.sin(TILT);
    function place() {
      for (let i = 0; i < ORBIT_ITEMS.length; i++) {
        const a = angle + i * Math.PI * 2 / ORBIT_ITEMS.length;
        const x0 = Math.cos(a) * RX, y0 = Math.sin(a) * RY;
        const x = x0 * cos - y0 * sin, y = x0 * sin + y0 * cos;
        const depth = (Math.sin(a) + 1) / 2;
        const el = itemRefs.current[i];
        if (!el) continue;
        el.style.transform = "translate(-50%,-50%) translate(" + x.toFixed(1) + "px," + y.toFixed(1) + "px) scale(" + (0.82 + depth * 0.28).toFixed(3) + ")";
        el.style.zIndex = depth > 0.5 ? 3 : 1;
        el.style.opacity = (0.55 + depth * 0.45).toFixed(2);
      }
    }
    function frame(t) {
      raf = requestAnimationFrame(frame);
      if (!visible || document.hidden) {
        last = t;
        return;
      }
      const dt = last ? Math.min(0.05, (t - last) / 1e3) : 0.016;
      last = t;
      if (!reduce) angle += dt * (Math.PI * 2 / 36);
      place();
    }
    const io = new IntersectionObserver((es) => {
      visible = es.some((e) => e.isIntersecting);
    });
    io.observe(stage);
    place();
    raf = requestAnimationFrame(frame);
    return () => {
      cancelAnimationFrame(raf);
      io.disconnect();
    };
  }, []);
  return /* @__PURE__ */ React.createElement("div", { className: "porcelain-orbit", ref: stageRef }, /* @__PURE__ */ React.createElement("svg", { className: "po-path", viewBox: "-420 -200 840 400", "aria-hidden": "true" }, /* @__PURE__ */ React.createElement("ellipse", { cx: "0", cy: "0", rx: "340", ry: "120", transform: "rotate(-8)" })), /* @__PURE__ */ React.createElement("div", { className: "po-center" }, /* @__PURE__ */ React.createElement("span", { className: "po-center-k" }, "\u6BCF\u573A\u4F1A\u90FD\u6709"), /* @__PURE__ */ React.createElement("span", { className: "po-center-t" }, "\u56DB\u6837\u4E1C\u897F")), ORBIT_ITEMS.map((it, i) => /* @__PURE__ */ React.createElement("div", { className: "po-item", key: i, ref: (el) => itemRefs.current[i] = el }, /* @__PURE__ */ React.createElement("span", { className: "po-ch" }, it.ch), /* @__PURE__ */ React.createElement("span", { className: "po-t" }, it.t))));
}
const LOOP_STEPS = [
  { t: "\u52A8\u8BAE", d: "\u4E3B\u5F20\u88AB\u6B63\u5F0F\u63D0\u51FA\uFF0C\u800C\u4E0D\u662F\u968F\u53E3\u4E00\u8BF4" },
  { t: "\u9644\u8BAE", d: "\u6709\u4EBA\u652F\u6301\uFF0C\u8BAE\u9898\u624D\u8FDB\u5165\u8BA8\u8BBA" },
  { t: "\u5BA3\u5E03\u8BAE\u9898", d: "\u5168\u573A\u786E\u8BA4\uFF1A\u6B63\u5728\u51B3\u5B9A\u7684\u662F\u8FD9\u4EF6\u4E8B" },
  { t: "\u8FA9\u8BBA", d: "\u7406\u7531\u5F53\u9762\u8BF4\u6E05\uFF0C\u8BB0\u5F55\u5728\u6848" },
  { t: "\u8868\u51B3", d: "\u65F6\u673A\u3001\u65B9\u5F0F\u3001\u6CD5\u5B9A\u4EBA\u6570\uFF0C\u4F9D\u6B21\u786E\u8BA4" },
  { t: "\u5BA3\u5E03\u7ED3\u679C", d: "\u7ED3\u679C\u5F53\u573A\u5BA3\u5E03\uFF0C\u5373\u523B\u751F\u6548" }
];
function AutoSteps() {
  const [step, setStep] = useState(1);
  useEffect(() => {
    const timer = setInterval(() => setStep((s) => s % LOOP_STEPS.length + 1), 2400);
    return () => clearInterval(timer);
  }, []);
  if (!window.Stepper) return null;
  return /* @__PURE__ */ React.createElement("div", { className: "auto-steps" }, /* @__PURE__ */ React.createElement(window.Stepper, { step, theme: "light", indicator: "numbers", orientation: "horizontal", transition: "slide", linear: false, showFooter: false, width: "100%" }, LOOP_STEPS.map((s, i) => /* @__PURE__ */ React.createElement(window.StepperStep, { key: i, title: s.t }, /* @__PURE__ */ React.createElement("div", { className: "asb" }, /* @__PURE__ */ React.createElement("span", { className: "asb-no" }, "0" + (i + 1)), /* @__PURE__ */ React.createElement("span", { className: "asb-t" }, s.t), /* @__PURE__ */ React.createElement("span", { className: "asb-d" }, s.d))))));
}
function GlassButton(props) {
  const inner = /* @__PURE__ */ React.createElement("span", { className: "glass-btn-label" + (props.primary ? " primary" : "") }, props.children);
  if (!window.GlassSurface) {
    return /* @__PURE__ */ React.createElement("a", { className: "btn" + (props.primary ? " primary" : ""), href: props.href, target: props.target, rel: "noopener", onClick: props.onClick }, inner);
  }
  return /* @__PURE__ */ React.createElement("a", { className: "glass-btn" + (props.primary ? " primary" : ""), href: props.href, target: props.target, rel: "noopener", onClick: props.onClick, style: { textDecoration: "none", display: "inline-block" } }, /* @__PURE__ */ React.createElement(
    window.GlassSurface,
    {
      width: props.width || 200,
      height: 54,
      borderRadius: 27,
      distortionScale: -160,
      displace: 0.5,
      backgroundOpacity: props.primary ? 0.3 : 0.1
    },
    inner
  ));
}
const LOAD_WORDS = ["\u8BAE\u7A0B", "\u52A8\u8BAE", "\u8FA9\u8BBA", "\u8868\u51B3", "\u8BB0\u5F55"];
function LoadingScreen(props) {
  const [count, setCount] = useState(0);
  const [wordIdx, setWordIdx] = useState(0);
  const [leaving, setLeaving] = useState(false);
  useEffect(() => {
    const t0 = performance.now();
    let raf = 0;
    const DUR = 2200;
    function tick(t) {
      const p = Math.min(1, (t - t0) / DUR);
      setCount(Math.round(p * 100));
      if (p < 1) raf = requestAnimationFrame(tick);
      else setTimeout(() => {
        setLeaving(true);
        setTimeout(props.onComplete, 450);
      }, 300);
    }
    raf = requestAnimationFrame(tick);
    const w = setInterval(() => setWordIdx((i) => (i + 1) % LOAD_WORDS.length), 900);
    return () => {
      cancelAnimationFrame(raf);
      clearInterval(w);
    };
  }, []);
  return /* @__PURE__ */ React.createElement("div", { className: "loading-screen" + (leaving ? " leaving" : "") }, /* @__PURE__ */ React.createElement("div", { className: "ls-label" }, "iMeeting \xB7 \u8BF4\u660E\u4E66"), /* @__PURE__ */ React.createElement("div", { className: "ls-word", key: wordIdx }, LOAD_WORDS[wordIdx]), /* @__PURE__ */ React.createElement("div", { className: "ls-count" }, String(count).padStart(3, "0")), /* @__PURE__ */ React.createElement("div", { className: "ls-bar" }, /* @__PURE__ */ React.createElement("div", { className: "ls-bar-inner", style: { transform: "scaleX(" + count / 100 + ")" } })));
}
const ROLE_WORDS = ["\u5E26\u8BAE\u4E8B\u7A0B\u5E8F", "\u8BA9\u51B3\u5B9A\u751F\u6548", "\u628A\u627F\u8BFA\u5199\u8FDB\u8BB0\u5F55", "\u8BA9\u89C4\u5219\u957F\u51FA\u89C4\u5219"];
function RoleCycle() {
  const [i, setI] = useState(0);
  useEffect(() => {
    const t = setInterval(() => setI((v) => (v + 1) % ROLE_WORDS.length), 2e3);
    return () => clearInterval(t);
  }, []);
  return /* @__PURE__ */ React.createElement("span", { className: "role-cycle", key: i }, ROLE_WORDS[i]);
}
function useOnView(threshold) {
  const ref = useRef(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return void 0;
    const io = new IntersectionObserver((es) => {
      for (const en of es) if (en.isIntersecting) {
        el.classList.add("on");
        io.disconnect();
      }
    }, { threshold: threshold || 0.25 });
    io.observe(el);
    return () => io.disconnect();
  }, []);
  return ref;
}
const LEAK_SINKS = [
  { x: 90, label: "\u91CD\u590D\u9648\u8FF0", cls: "k1" },
  { x: 210, label: "\u8DD1\u9898\u7ED5\u56DE", cls: "k2" },
  { x: 330, label: "\u7A7A\u8F6C\u7B49\u5F85", cls: "k3" },
  { x: 450, label: "\u63A8\u8FDB\u8BAE\u9898", cls: "k4" }
];
function TimeLeak() {
  const ref = useOnView(0.22);
  return /* @__PURE__ */ React.createElement("div", { className: "diagram leak-dia", ref }, /* @__PURE__ */ React.createElement("svg", { viewBox: "0 0 540 380", className: "svg-wide", role: "img", "aria-label": "\u4E00\u5C0F\u65F6\u4ECE\u4E09\u4E2A\u7F3A\u53E3\u6F0F\u8D70" }, /* @__PURE__ */ React.createElement("rect", { x: "130", y: "14", width: "280", height: "48", rx: "12", className: "leak-src" }), /* @__PURE__ */ React.createElement("text", { x: "270", y: "44", textAnchor: "middle", className: "leak-src-t" }, "60 \u5206\u949F"), LEAK_SINKS.map((s, i) => /* @__PURE__ */ React.createElement("g", { key: i }, /* @__PURE__ */ React.createElement(
    "path",
    {
      d: "M 270 62 C 270 150, " + s.x + " 160, " + s.x + " 258",
      className: "leak-line " + s.cls,
      fill: "none"
    }
  ), /* @__PURE__ */ React.createElement("circle", { cx: s.x, cy: "262", r: "6", className: "leak-dot" }), /* @__PURE__ */ React.createElement("text", { x: s.x, y: "296", textAnchor: "middle", className: "leak-lb" }, s.label))), /* @__PURE__ */ React.createElement("text", { x: "270", y: "352", textAnchor: "middle", className: "leak-cap" }, "\u65F6\u95F4\u4ECE\u4E09\u4E2A\u7F3A\u53E3\u6F0F\u8D70\u3002\u7A0B\u5E8F\u628A\u7F3A\u53E3\u5835\u4E0A\u3002")));
}
const TRACK_SPAN = 22;
const TRACK_LANES = ["\u4E3B\u6301", "\u7532", "\u4E59", "\u4E19", "\u4E01"];
const TRACK_EVENTS = [
  { m: 0, len: 1.2, lane: 0, label: "\u5BA3\u5E03\u8BAE\u9898 \xB7 \u5F00\u59CB\u8FA9\u8BBA", chip: "\u8FA9\u8BBA\u5F00\u59CB\uFF0C\u5269\u4F59 12:00", kind: "host" },
  { m: 1, len: 2, lane: 1, label: "\u8D5E\u6210\uFF1A\u6539\u6210\u4E24\u65E5\u4E00\u591C\u65C5\u6E38", chip: "\u53D1\u8A00\u8BA1\u65F6 00:38 / 02:00" },
  { m: 3, len: 2, lane: 2, label: "\u590D\u8FF0 19:48 \u5DF2\u5F52\u6863\u7684\u89C2\u70B9", chip: "\u53D1\u8A00\u8BB0\u5F55\uFF1A\u8BF4\u8FC7\u5373\u5F52\u6863\uFF0C\u4E0D\u5FC5\u518D\u8BF4\u4E00\u904D", kind: "stop" },
  { m: 5, len: 2.4, lane: 3, label: "\u4ECE\u6210\u672C\u8BB2\u5230\u53BB\u5E74\u4F9B\u5E94\u5546\u62A5\u4EF7", chip: "\u8BA1\u65F6\u5230\u70B9\uFF0C\u53D1\u8A00\u6743\u4EA4\u8FD8\u961F\u5217", kind: "stop" },
  { m: 8, len: 2.4, lane: 4, label: "\u60F3\u63D2\u4E00\u53E5\u300C\u805A\u9910\u53BB\u54EA\u5403\u300D", chip: "\u65B0\u8BDD\u9898\u8FDB\u5165\u52A8\u8BAE\u961F\u5217\uFF0C\u4E0D\u63D2\u961F\u3001\u4E0D\u6D88\u5931", kind: "stop" },
  { m: 11, len: 2.6, lane: 0, label: "\u63D0\u9192\uFF1A\u5269\u4F59 2 \u5206\u949F", chip: "\u8FA9\u8BBA\u9650\u5236\u7531\u96C6\u4F53\u8BBE\u5B9A\uFF0C\u4E5F\u53EF\u52A8\u8BAE\u5EF6\u957F", kind: "host" },
  { m: 21, len: 1, lane: 0, label: "\u8FA9\u8BBA\u65F6\u95F4\u7ED3\u675F", chip: "\u8FDB\u5165\u8868\u51B3", kind: "host" }
];
const TRACK_TICKS = [{ m: 0, t: "20:04" }, { m: 5, t: "20:09" }, { m: 11, t: "20:15" }, { m: 22, t: "20:26" }];
function SpeechTrack() {
  const ref = useOnView(0.2);
  const [p, setP] = useState(0);
  useEffect(() => {
    const el = ref.current;
    if (!el) return void 0;
    let raf = 0, t0 = 0, run = false;
    const reduce = window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce) {
      setP(1);
      return void 0;
    }
    const io = new IntersectionObserver((es) => {
      const seen = es.some((e) => e.isIntersecting);
      if (seen && !run) {
        run = true;
        t0 = performance.now();
        raf = requestAnimationFrame(loop);
      }
    }, { threshold: 0.25 });
    const loop = (t) => {
      const e = (t - t0) / 17e3;
      if (e >= 1.35) {
        t0 = t;
      }
      setP(Math.min(1, (t - t0) / 17e3));
      raf = requestAnimationFrame(loop);
    };
    io.observe(el);
    return () => {
      cancelAnimationFrame(raf);
      io.disconnect();
    };
  }, []);
  const now = p * TRACK_SPAN;
  const active = TRACK_EVENTS.findIndex((e) => now >= e.m && now < e.m + e.len);
  const left = Math.max(0, 12 - Math.min(12, now * (12 / 22)));
  const mm = String(Math.floor(left)).padStart(2, "0");
  const ss = String(Math.round(left % 1 * 60)).padStart(2, "0");
  return /* @__PURE__ */ React.createElement("div", { className: "stk", ref }, /* @__PURE__ */ React.createElement("div", { className: "stk-top" }, /* @__PURE__ */ React.createElement("span", { className: "stk-badge" }, "\u5F85\u51B3\u52A8\u8BAE \xB7 \u4FEE\u6B63\u6848\uFF1A\u56E2\u5EFA\u6539\u4E3A\u4E24\u65E5\u4E00\u591C\u96C6\u4F53\u65C5\u6E38"), /* @__PURE__ */ React.createElement("span", { className: "stk-clock" }, /* @__PURE__ */ React.createElement("b", null, mm, ":", ss), /* @__PURE__ */ React.createElement("i", null, "\u8FA9\u8BBA\u5269\u4F59"))), /* @__PURE__ */ React.createElement("div", { className: "stk-ruler" }, TRACK_TICKS.map((t, i) => /* @__PURE__ */ React.createElement("span", { key: i, style: { left: t.m / TRACK_SPAN * 100 + "%" } }, t.t))), /* @__PURE__ */ React.createElement("div", { className: "stk-body", style: { "--p": p } }, /* @__PURE__ */ React.createElement("div", { className: "stk-grid", "aria-hidden": "true" }, TRACK_TICKS.map((t, i) => /* @__PURE__ */ React.createElement("i", { key: i, style: { left: t.m / TRACK_SPAN * 100 + "%" } }))), TRACK_LANES.map((ln, i) => /* @__PURE__ */ React.createElement("div", { className: "stk-lane", key: i }, /* @__PURE__ */ React.createElement("span", { className: "stk-who" }, ln), /* @__PURE__ */ React.createElement("div", { className: "stk-row" }, TRACK_EVENTS.filter((e) => e.lane === i).map((e, j) => {
    const on = active >= 0 && TRACK_EVENTS[active] === e;
    const after = e.m < 12;
    const sp = e.m / TRACK_SPAN * 100;
    const ep = (e.m + e.len) / TRACK_SPAN * 100;
    return /* @__PURE__ */ React.createElement(React.Fragment, { key: j }, /* @__PURE__ */ React.createElement(
      "div",
      {
        className: "stk-bar " + (e.kind || "") + (on ? " on" : ""),
        style: { left: sp + "%", width: Math.max(0.8, ep - sp) + "%" }
      }
    ), /* @__PURE__ */ React.createElement(
      "span",
      {
        className: "stk-lb " + (after ? "after" : "before") + (on ? " on" : ""),
        style: after ? { left: ep + "%", paddingLeft: "10px" } : { right: 100 - sp + "%", paddingRight: "10px" }
      },
      e.label
    ));
  })))), /* @__PURE__ */ React.createElement("div", { className: "stk-head" })), /* @__PURE__ */ React.createElement("div", { className: "stk-cap" }, active >= 0 ? /* @__PURE__ */ React.createElement(React.Fragment, null, /* @__PURE__ */ React.createElement("b", null, TRACK_EVENTS[active].chip)) : /* @__PURE__ */ React.createElement("b", null, "\u56DE\u653E\u7ED3\u675F")), /* @__PURE__ */ React.createElement("div", { className: "stk-tip" }, "\u4E00\u6BB5\u6539\u5199\u7D20\u6750\uFF1A\u4E03\u4E2A\u65F6\u523B\uFF0C\u56DB\u6B21\u673A\u5236\u4ECB\u5165\u3002"));
}
function MotionStackViz() {
  const ref = useOnView(0.25);
  const [q, setQ] = useState(1);
  useEffect(() => {
    const t = setInterval(() => setQ((v) => v % 3 + 1), 2600);
    return () => clearInterval(t);
  }, []);
  const queue = ["\u300C\u7ED3\u675F\u8FA9\u8BBA\u300D\u6709\u5F85\u8868\u51B3", "\u300C\u8C03\u6574\u53D1\u8A00\u65F6\u95F4\u300D\u6709\u5F85\u8868\u51B3", "\u300C\u91CD\u8BAE\u4E0A\u4E00\u9879\u51B3\u8BAE\u300D\u6709\u5F85\u8868\u51B3"];
  return /* @__PURE__ */ React.createElement("div", { className: "mstk", ref }, /* @__PURE__ */ React.createElement("div", { className: "mstk-top" }, /* @__PURE__ */ React.createElement("span", { className: "mstk-k" }, "\u6B63\u5728\u5BA1\u8BAE \xB7 \u4E00\u6B21\u53EA\u6709\u4E00\u4E2A"), /* @__PURE__ */ React.createElement("div", { className: "mstk-card now" }, /* @__PURE__ */ React.createElement("b", null, "\u4FEE\u6B63\u6848\uFF1A\u56E2\u5EFA\u6539\u4E3A\u4E24\u65E5\u4E00\u591C\u65C5\u6E38"), /* @__PURE__ */ React.createElement("span", null, "\u8FA9\u8BBA\u4E2D \xB7 \u5269\u4F59 12:00"))), /* @__PURE__ */ React.createElement("div", { className: "mstk-arrow" }), /* @__PURE__ */ React.createElement("div", { className: "mstk-q" }, /* @__PURE__ */ React.createElement("span", { className: "mstk-k" }, "\u961F\u5217 \xB7 \u63D0\u51FA\u5373\u6392\u4F4D"), queue.slice(0, q).map((s, i) => /* @__PURE__ */ React.createElement("div", { className: "mstk-card", key: i }, s)), /* @__PURE__ */ React.createElement("div", { className: "mstk-card ghost" }, "\u65B0\u8BDD\u9898 \xB7 \u63D0\u51FA\u540E\u81EA\u52A8\u6392\u5230\u8FD9\u91CC")));
}
const VOTE_STAGES = [
  { n: "01", t: "\u53D1\u8D77\u8868\u51B3\u7684\u65F6\u673A", d: "\u8FA9\u8BBA\u8D70\u5B8C\u3001\u961F\u5217\u6E05\u7A7A" },
  { n: "02", t: "\u8868\u51B3\u7684\u65B9\u5F0F", d: "\u8BB0\u540D \xB7 \u6CD5\u5B9A\u4EBA\u6570\u5148\u6838\u7B97" },
  { n: "03", t: "\u5BA3\u5E03\u8868\u51B3\u7ED3\u679C", d: "\u5F53\u573A\u5BA3\u5E03\uFF0C\u8BB0\u5F55\u5728\u6848" }
];
function VoteDonut() {
  const r = 52, c = 2 * Math.PI * r;
  const parts = [{ n: 7, cls: "yes" }, { n: 3, cls: "no" }, { n: 1, cls: "abs" }];
  let off = 0;
  const total = 11;
  return /* @__PURE__ */ React.createElement("svg", { viewBox: "0 0 140 140", className: "vst-donut", role: "img", "aria-label": "\u8D5E\u6210 7 \u53CD\u5BF9 3 \u5F03\u6743 1" }, /* @__PURE__ */ React.createElement("circle", { cx: "70", cy: "70", r, className: "vst-track" }), parts.map((p, i) => {
    const len = p.n / total * c;
    const el = /* @__PURE__ */ React.createElement(
      "circle",
      {
        key: i,
        cx: "70",
        cy: "70",
        r,
        className: "vst-seg " + p.cls,
        strokeDasharray: len + " " + (c - len),
        strokeDashoffset: -off
      }
    );
    off += len;
    return el;
  }), /* @__PURE__ */ React.createElement("text", { x: "70", y: "64", textAnchor: "middle", className: "vst-n" }, "7"), /* @__PURE__ */ React.createElement("text", { x: "70", y: "84", textAnchor: "middle", className: "vst-lb" }, "\u5171 11 \u7968"));
}
function VoteStage() {
  const ref = useRef(null);
  const [step, setStep] = useState(0);
  const [live, setLive] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return void 0;
    const io = new IntersectionObserver((es) => {
      if (es.some((e) => e.isIntersecting)) {
        setLive(true);
        io.disconnect();
      }
    }, { threshold: 0.3 });
    io.observe(el);
    return () => io.disconnect();
  }, []);
  useEffect(() => {
    if (!live || step >= 3) return void 0;
    const t = setTimeout(() => setStep((v) => v + 1), 1500);
    return () => clearTimeout(t);
  }, [live, step]);
  const done = step >= 3;
  return /* @__PURE__ */ React.createElement("div", { className: "vst", ref }, /* @__PURE__ */ React.createElement("div", { className: "vst-stages" }, VOTE_STAGES.map((s, i) => /* @__PURE__ */ React.createElement("div", { className: "vst-tile" + (step === i ? " on" : "") + (done || step > i ? " done" : ""), key: i }, /* @__PURE__ */ React.createElement("span", { className: "vst-no" }, s.n), /* @__PURE__ */ React.createElement("span", { className: "vst-t" }, s.t), /* @__PURE__ */ React.createElement("span", { className: "vst-d" }, s.d)))), /* @__PURE__ */ React.createElement("div", { className: "vst-result" + (done ? " on" : "") }, /* @__PURE__ */ React.createElement(VoteDonut, null), /* @__PURE__ */ React.createElement("div", { className: "vst-right" }, /* @__PURE__ */ React.createElement(window.Flap, { text: "\u4FEE\u6B63\u6848\u901A\u8FC7 \xB7 \u8BB0\u5F55\u5728\u6848" }), /* @__PURE__ */ React.createElement("div", { className: "vst-legend" }, /* @__PURE__ */ React.createElement("span", null, /* @__PURE__ */ React.createElement("i", { className: "dot yes" }), "\u8D5E\u6210 7"), /* @__PURE__ */ React.createElement("span", null, /* @__PURE__ */ React.createElement("i", { className: "dot no" }), "\u53CD\u5BF9 3"), /* @__PURE__ */ React.createElement("span", null, /* @__PURE__ */ React.createElement("i", { className: "dot abs" }), "\u5F03\u6743 1")), /* @__PURE__ */ React.createElement("p", { className: "vst-note" }, "\u53CD\u5BF9\u7968\u4E0E\u5F03\u6743\u7968\u540C\u6837\u7559\u75D5\u3002\u6C89\u9ED8\u4E0D\u7B49\u4E8E\u540C\u610F\u3002"))));
}
const MONEY_BAD = ["\u6536\u5230\u6350\u8D60", "\u76F4\u63A5\u5165\u5E93", "\u7528\u9014\u6CA1\u4EBA\u8BF4\u5F97\u6E05", "\u79C1\u4E0B\u4E89\u6267 \u2192 \u5BF9\u7ACB"];
const MONEY_GOOD = ["\u52A8\u8BAE\uFF1A\u662F\u5426\u63A5\u53D7\u6350\u8D60", "\u9644\u8BAE\u6210\u7ACB", "\u96C6\u4E2D\u63D0\u95EE\uFF1A\u6307\u5B9A\u7528\u9014\uFF1F", "\u8BB0\u540D\u8868\u51B3", "\u51B3\u8BAE + \u5951\u7EA6\u94FE\u63A5", "\u5217\u5165\u672A\u5B8C\u4E8B\u52A1"];
function MoneyFlow() {
  const ref = useOnView(0.2);
  return /* @__PURE__ */ React.createElement("div", { className: "mfl", ref }, /* @__PURE__ */ React.createElement("div", { className: "mfl-row bad" }, /* @__PURE__ */ React.createElement("span", { className: "mfl-k" }, "\u6CA1\u6709\u7A0B\u5E8F\u7684\u4E00\u573A\u6350\u8D60"), /* @__PURE__ */ React.createElement("div", { className: "mfl-chain" }, MONEY_BAD.map((s, i) => /* @__PURE__ */ React.createElement(React.Fragment, { key: i }, /* @__PURE__ */ React.createElement("span", { className: "mfl-node", style: { transitionDelay: i * 0.12 + "s" } }, s), i < MONEY_BAD.length - 1 ? /* @__PURE__ */ React.createElement("span", { className: "mfl-link", style: { transitionDelay: i * 0.12 + 0.06 + "s" } }) : null)))), /* @__PURE__ */ React.createElement("div", { className: "mfl-row good" }, /* @__PURE__ */ React.createElement("span", { className: "mfl-k" }, "\u540C\u4E00\u7B14\u6350\u8D60\uFF0C\u5728 iMeeting \u91CC"), /* @__PURE__ */ React.createElement("div", { className: "mfl-chain" }, MONEY_GOOD.map((s, i) => /* @__PURE__ */ React.createElement(React.Fragment, { key: i }, /* @__PURE__ */ React.createElement("span", { className: "mfl-node", style: { transitionDelay: 0.2 + i * 0.14 + "s" } }, s), i < MONEY_GOOD.length - 1 ? /* @__PURE__ */ React.createElement("span", { className: "mfl-link", style: { transitionDelay: 0.26 + i * 0.14 + "s" } }) : null)))), /* @__PURE__ */ React.createElement("p", { className: "mfl-cap" }, "\u4EFB\u4F55\u6539\u53D8\u516C\u5E93\u73B0\u72B6\u7684\u52A8\u4F5C\uFF0C\u90FD\u662F\u4E00\u4E2A\u52A8\u8BAE\u3002"));
}
function ResolutionCard() {
  const ref = useOnView(0.25);
  return /* @__PURE__ */ React.createElement("div", { className: "res-card", ref }, /* @__PURE__ */ React.createElement("div", { className: "res-head" }, /* @__PURE__ */ React.createElement("span", { className: "res-no" }, "\u51B3\u8BAE \xB7 \u7B2C 12 \u6B21\u4F8B\u4F1A"), /* @__PURE__ */ React.createElement("span", { className: "res-stamp" }, "\u5DF2\u901A\u8FC7")), /* @__PURE__ */ React.createElement("div", { className: "res-body" }, "\u63A5\u53D7\u67D0\u8D44\u52A9\u65B9\u6350\u8D60\uFF0C\u524D\u63D0\uFF1A\u4F18\u5148\u8865\u53D1\u6B20\u85AA\u3002"), /* @__PURE__ */ React.createElement("div", { className: "res-grid" }, /* @__PURE__ */ React.createElement("div", null, /* @__PURE__ */ React.createElement("span", null, "\u8D5E\u6210"), /* @__PURE__ */ React.createElement("b", null, "7")), /* @__PURE__ */ React.createElement("div", null, /* @__PURE__ */ React.createElement("span", null, "\u53CD\u5BF9"), /* @__PURE__ */ React.createElement("b", null, "3")), /* @__PURE__ */ React.createElement("div", null, /* @__PURE__ */ React.createElement("span", null, "\u5F03\u6743"), /* @__PURE__ */ React.createElement("b", null, "1")), /* @__PURE__ */ React.createElement("div", null, /* @__PURE__ */ React.createElement("span", null, "\u6CD5\u5B9A\u4EBA\u6570"), /* @__PURE__ */ React.createElement("b", null, "\u6EE1\u8DB3"))), /* @__PURE__ */ React.createElement("div", { className: "res-foot" }, /* @__PURE__ */ React.createElement("span", { className: "res-link" }, "\u5951\u7EA6\u94FE\u63A5 \xB7 imeeting.club/C05-xxx"), /* @__PURE__ */ React.createElement("span", { className: "res-next" }, "\u672A\u5B8C\u4E8B\u52A1 \u2192 \u4E0B\u6B21\u4F8B\u4F1A")));
}
function VIcon(props) {
  const n = props.name;
  const P = {
    speak: /* @__PURE__ */ React.createElement("path", { d: "M4 5h12v8H8l-4 3V5z" }),
    ask: /* @__PURE__ */ React.createElement(React.Fragment, null, /* @__PURE__ */ React.createElement("circle", { cx: "10", cy: "10", r: "7" }), /* @__PURE__ */ React.createElement("path", { d: "M8 8.2c0-1.2.9-2 2-2s2 .7 2 1.8c0 1.4-2 1.5-2 3" }), /* @__PURE__ */ React.createElement("path", { d: "M10 14h.01" })),
    motion: /* @__PURE__ */ React.createElement(React.Fragment, null, /* @__PURE__ */ React.createElement("path", { d: "M5 2.5h7l3 3V17a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1V3.5a1 1 0 0 1 1-1z" }), /* @__PURE__ */ React.createElement("path", { d: "M11.5 2.5V6H15" }), /* @__PURE__ */ React.createElement("path", { d: "M9.8 9.4v4M7.8 11.4h4" })),
    order: /* @__PURE__ */ React.createElement(React.Fragment, null, /* @__PURE__ */ React.createElement("path", { d: "M10 2.5l6 2.2v5c0 3.4-2.4 6.3-6 7.8-3.6-1.5-6-4.4-6-7.8v-5l6-2.2z" }), /* @__PURE__ */ React.createElement("path", { d: "M10 7v4" }), /* @__PURE__ */ React.createElement("path", { d: "M10 13.4h.01" })),
    vote: /* @__PURE__ */ React.createElement(React.Fragment, null, /* @__PURE__ */ React.createElement("rect", { x: "3", y: "8.5", width: "14", height: "8.5", rx: "1.6" }), /* @__PURE__ */ React.createElement("path", { d: "M6.5 8.5V6a3.5 3.5 0 0 1 7 0" }), /* @__PURE__ */ React.createElement("path", { d: "M7.4 12.6l1.8 1.8 3.4-3.4" })),
    room: /* @__PURE__ */ React.createElement(React.Fragment, null, /* @__PURE__ */ React.createElement("rect", { x: "2.5", y: "3.5", width: "15", height: "9", rx: "1.5" }), /* @__PURE__ */ React.createElement("path", { d: "M6.5 16.5h7" }), /* @__PURE__ */ React.createElement("path", { d: "M10 12.5v4" })),
    clock: /* @__PURE__ */ React.createElement(React.Fragment, null, /* @__PURE__ */ React.createElement("circle", { cx: "10", cy: "10", r: "7.2" }), /* @__PURE__ */ React.createElement("path", { d: "M10 6v4.3l2.7 1.7" })),
    coin: /* @__PURE__ */ React.createElement(React.Fragment, null, /* @__PURE__ */ React.createElement("ellipse", { cx: "10", cy: "6", rx: "6", ry: "2.6" }), /* @__PURE__ */ React.createElement("path", { d: "M4 6v8c0 1.4 2.7 2.6 6 2.6s6-1.2 6-2.6V6" }), /* @__PURE__ */ React.createElement("path", { d: "M4 10c0 1.4 2.7 2.6 6 2.6s6-1.2 6-2.6" })),
    doc: /* @__PURE__ */ React.createElement(React.Fragment, null, /* @__PURE__ */ React.createElement("path", { d: "M5 2.5h7l3 3V17a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1V3.5a1 1 0 0 1 1-1z" }), /* @__PURE__ */ React.createElement("path", { d: "M11.5 2.5V6H15" }), /* @__PURE__ */ React.createElement("path", { d: "M6.6 9h6.8M6.6 12h6.8M6.6 15h4" })),
    rail: /* @__PURE__ */ React.createElement(React.Fragment, null, /* @__PURE__ */ React.createElement("path", { d: "M4 4h12M4 10h12M4 16h12" }), /* @__PURE__ */ React.createElement("circle", { cx: "7", cy: "4", r: "1.8" }), /* @__PURE__ */ React.createElement("circle", { cx: "12", cy: "10", r: "1.8" }), /* @__PURE__ */ React.createElement("circle", { cx: "8", cy: "16", r: "1.8" })),
    dial: /* @__PURE__ */ React.createElement(React.Fragment, null, /* @__PURE__ */ React.createElement("circle", { cx: "10", cy: "10", r: "7" }), /* @__PURE__ */ React.createElement("path", { d: "M10 10l3-3" }), /* @__PURE__ */ React.createElement("path", { d: "M10 3v1.5M17 10h-1.5M10 17v-1.5M3 10h1.5" }))
  };
  return /* @__PURE__ */ React.createElement("svg", { className: "v-ico", viewBox: "0 0 20 20", "aria-hidden": "true" }, P[n] || P.doc);
}
const ROOM_ZONES = [
  { k: "A", n: "room", t: "\u4E3B\u6301\u8BCD", d: "AI \u4E3B\u6301\u4EBA\u7684\u5F15\u5BFC\u4E0E\u88C1\u5B9A\uFF0C\u8BED\u97F3\u64AD\u62A5" },
  { k: "B", n: "motion", t: "\u52A8\u8BAE\u6808", d: "\u6B63\u5728\u5BA1\u8BAE\u7684\u4E8B\uFF0C\u6C38\u8FDC\u53EA\u6709\u4E00\u4EF6" },
  { k: "C", n: "speak", t: "\u53D1\u8A00\u961F\u5217", d: "\u8C01\u5728\u8BF4\u3001\u8C01\u5728\u7B49\uFF0C\u4F4D\u7F6E\u4E0D\u88AB\u63D2\u961F" },
  { k: "D", n: "vote", t: "\u64CD\u4F5C\u533A", d: "\u7533\u8BF7\u53D1\u8A00\u3001\u63D0\u95EE\u3001\u63D0\u52A8\u8BAE\u3001\u6295\u7968" }
];
function RoomMap() {
  const ref = useOnView(0.25);
  const [i, setI] = useState(0);
  useEffect(() => {
    const t = setInterval(() => setI((v) => (v + 1) % 4), 2600);
    return () => clearInterval(t);
  }, []);
  return /* @__PURE__ */ React.createElement("div", { className: "rmp", ref }, /* @__PURE__ */ React.createElement("div", { className: "rmp-stage" }, /* @__PURE__ */ React.createElement("div", { className: "rmp-zone z-a" + (i === 0 ? " on" : "") }, /* @__PURE__ */ React.createElement("b", null, "\u4E3B\u6301\u8BCD"), /* @__PURE__ */ React.createElement("span", null, "\u8FA9\u8BBA\u5269\u4F59 02:00\uFF0C\u961F\u5217\u5C1A\u6709 2 \u4F4D")), /* @__PURE__ */ React.createElement("div", { className: "rmp-zone z-b" + (i === 1 ? " on" : "") }, /* @__PURE__ */ React.createElement("b", null, "\u52A8\u8BAE\u6808"), /* @__PURE__ */ React.createElement("span", null, "\u5F85\u51B3 \xB7 \u4FEE\u6B63\u6848"), /* @__PURE__ */ React.createElement("span", null, "\u961F\u5217 \xB7 2 \u9879")), /* @__PURE__ */ React.createElement("div", { className: "rmp-zone z-c" + (i === 2 ? " on" : "") }, /* @__PURE__ */ React.createElement("b", null, "\u53D1\u8A00\u961F\u5217"), /* @__PURE__ */ React.createElement("span", null, "\u7532 \xB7 \u53D1\u8A00\u4E2D"), /* @__PURE__ */ React.createElement("span", null, "\u4E59 \xB7 \u7B49\u5F85")), /* @__PURE__ */ React.createElement("div", { className: "rmp-zone z-d" + (i === 3 ? " on" : "") }, /* @__PURE__ */ React.createElement("b", null, "\u64CD\u4F5C\u533A"), /* @__PURE__ */ React.createElement("span", null, "\u7533\u8BF7\u53D1\u8A00 / \u63D0\u95EE / \u52A8\u8BAE / \u6295\u7968"))), /* @__PURE__ */ React.createElement("p", { className: "rmp-cap" }, /* @__PURE__ */ React.createElement("b", null, ROOM_ZONES[i].k), ROOM_ZONES[i].t, " \u2014 ", ROOM_ZONES[i].d));
}
const ACTIONS = [
  { n: "speak", t: "\u7533\u8BF7\u53D1\u8A00", d: "\u8FDB\u5165\u961F\u5217\uFF0C\u8F6E\u5230\u4F60\u65F6\u83B7\u5F97\u53D1\u8A00\u6743\uFF0C\u6709\u8BA1\u65F6" },
  { n: "ask", t: "\u63D0\u95EE", d: "\u9488\u5BF9\u5F53\u524D\u52A8\u8BAE\u5411\u63D0\u6848\u4EBA\u8BF7\u6559\u7EC6\u8282" },
  { n: "motion", t: "\u63D0\u51FA\u52A8\u8BAE", d: "\u4FEE\u6539\u5B83\u3001\u63A8\u8FDF\u5B83\u3001\u6401\u7F6E\u5B83\u3001\u7ED3\u675F\u8BA8\u8BBA\u5B83" },
  { n: "order", t: "\u79E9\u5E8F\u95EE\u9898", d: "\u8BA4\u4E3A\u7A0B\u5E8F\u88AB\u8FDD\u53CD\uFF0C\u968F\u65F6\u53EF\u63D0\uFF0C\u65E0\u9700\u6392\u961F" },
  { n: "vote", t: "\u6295\u7968", d: "\u8D5E\u6210\u3001\u53CD\u5BF9\u6216\u5F03\u6743\uFF0C\u6BCF\u4E00\u7968\u90FD\u88AB\u8BB0\u5F55" }
];
function ActionGrid() {
  const [i, setI] = useState(0);
  return /* @__PURE__ */ React.createElement("div", { className: "act" }, /* @__PURE__ */ React.createElement("div", { className: "act-grid" }, ACTIONS.map((a, k) => /* @__PURE__ */ React.createElement("button", { className: "act-tile" + (i === k ? " on" : ""), key: k, onClick: () => setI(k), type: "button" }, /* @__PURE__ */ React.createElement(VIcon, { name: a.n }), /* @__PURE__ */ React.createElement("span", null, a.t)))), /* @__PURE__ */ React.createElement("p", { className: "act-cap" }, ACTIONS[i].d));
}
const SITUATIONS = [
  { s: "\u6211\u53CD\u5BF9\u8FD9\u4E2A\u65B9\u6848", o: "\u53D1\u8868\u53CD\u5BF9\u89C2\u70B9", r: "\u53CD\u5BF9\u7406\u7531\u5F52\u6863\uFF1B\u4E5F\u53EF\u7528\u4FEE\u6B63\u6848\u72EC\u7ACB\u8FA9\u8BBA" },
  { s: "\u6211\u89C9\u5F97\u73B0\u5728\u4E0D\u8BE5\u8BA8\u8BBA", o: "\u63A8\u8FDF\u52A8\u8BAE", r: "\u8868\u51B3\u540E\u79FB\u5230\u6307\u5B9A\u65E5\u671F\uFF0C\u8BAE\u9898\u4E0D\u6D88\u5931" },
  { s: "\u6211\u89C9\u5F97\u7A0B\u5E8F\u8D70\u9519\u4E86", o: "\u79E9\u5E8F\u95EE\u9898", r: "\u5168\u573A\u6682\u505C\uFF0C\u4E3B\u5E2D\u5373\u65F6\u88C1\u5B9A\uFF1B\u4E0D\u670D\u53EF\u7533\u8BC9" },
  { s: "\u6211\u89C9\u5F97\u804A\u5F97\u591F\u4E45\u4E86", o: "\u7ED3\u675F\u8FA9\u8BBA", r: "\u591A\u6570\u540C\u610F\u5373\u63D0\u524D\u8FDB\u5165\u8868\u51B3" },
  { s: "\u6211\u9700\u8981\u4F11\u606F\u4E00\u4E0B", o: "\u4F11\u4F1A\u52A8\u8BAE", r: "\u300C\u5148\u4E0D\u804A\u4E86\u300D\u662F\u6B63\u5F0F\u6743\u5229\uFF0C\u7531\u5927\u5BB6\u8868\u51B3" },
  { s: "\u6211\u60F3\u56DE\u5230\u4E4B\u524D\u7684\u8BDD\u9898", o: "\u91CD\u8BAE\u52A8\u8BAE", r: "\u7B26\u5408\u6761\u4EF6\u5373\u53EF\u91CD\u65B0\u5BA1\u8BAE\uFF0C\u4E0D\u5FC5\u53E6\u8D77\u7089\u7076" }
];
function SituationMap() {
  const [i, setI] = useState(0);
  useEffect(() => {
    const t = setInterval(() => setI((v) => (v + 1) % SITUATIONS.length), 2800);
    return () => clearInterval(t);
  }, []);
  return /* @__PURE__ */ React.createElement("div", { className: "sit" }, SITUATIONS.map((it, k) => /* @__PURE__ */ React.createElement("button", { className: "sit-row" + (i === k ? " on" : ""), key: k, type: "button", onClick: () => setI(k) }, /* @__PURE__ */ React.createElement("span", { className: "sit-s" }, it.s), /* @__PURE__ */ React.createElement("span", { className: "sit-line" }), /* @__PURE__ */ React.createElement("span", { className: "sit-o" }, it.o))), /* @__PURE__ */ React.createElement("p", { className: "sit-cap" }, SITUATIONS[i].r));
}
const MTYPES = [
  { t: "\u516C\u5F00\u4F1A\u8BAE", by: "\u4EFB\u4F55\u4E2A\u4EBA\u76F4\u63A5\u53D1\u8D77", power: 0, acct: "\u4E2A\u4EBA" },
  { t: "\u7814\u8BA8\u4F1A\u8BAE", by: "\u8D1F\u8D23\u4EBA / \u7BA1\u7406\u5458\u53D1\u8D77", power: 1, acct: "\u7EC4\u7EC7" },
  { t: "\u4F8B\u884C\u4F1A\u8BAE", by: "\u7CFB\u7EDF\u6309\u7EC4\u7EC7\u89C4\u5219\u81EA\u52A8\u521B\u5EFA", power: 1, acct: "\u7EC4\u7EC7" },
  { t: "\u4E34\u65F6\u4F1A\u8BAE", by: "\u7BA1\u7406\u5458\u53D1\u8D77\uFF0C\u6216\u6210\u5458\u8054\u7F72\u8FBE\u6807", power: 1, acct: "\u7EC4\u7EC7" },
  { t: "\u81EA\u53D1\u4F1A\u8BAE", by: "\u4EE5\u7EC4\u7EC7\u540D\u4E49\u3001\u4E2A\u4EBA\u53D1\u8D77", power: 0, acct: "\u7EC4\u7EC7" }
];
function TypeCards() {
  const ref = useOnView(0.2);
  return /* @__PURE__ */ React.createElement("div", { className: "typ", ref }, MTYPES.map((m, i) => /* @__PURE__ */ React.createElement("div", { className: "typ-card", key: i, style: { transitionDelay: i * 0.08 + "s" } }, /* @__PURE__ */ React.createElement("div", { className: "typ-top" }, /* @__PURE__ */ React.createElement("b", null, m.t), /* @__PURE__ */ React.createElement("span", { className: "typ-badge" + (m.power ? " full" : "") }, m.power ? "\u6709\u7EC4\u7EC7\u6548\u529B" : "\u65E0\u7EC4\u7EC7\u6548\u529B")), /* @__PURE__ */ React.createElement("div", { className: "typ-by" }, m.by), /* @__PURE__ */ React.createElement("div", { className: "typ-foot" }, /* @__PURE__ */ React.createElement("span", null, "\u8D26\u6237"), /* @__PURE__ */ React.createElement("b", null, m.acct)))));
}
const AGENDA_BLOCKS = [
  { t: "\u5F00\u4F1A", items: ["\u70B9\u540D\u4E0E\u6CD5\u5B9A\u4EBA\u6570", "\u901A\u8FC7\u8BAE\u7A0B"] },
  { t: "\u5BA3\u8BFB\u4E0E\u6279\u51C6\u4F1A\u8BAE\u8BB0\u5F55", items: ["\u4E0A\u6B21\u7EAA\u8981", "\u672A\u5B8C\u4E8B\u52A1"], hook: true },
  { t: "\u4E00\u822C\u8BAE\u7A0B", items: ["\u8BA8\u8BBA\u9879", "\u62A5\u544A\u9879", "\u51B3\u7B56\u9879"] },
  { t: "\u4F11\u4F1A", items: ["\u4E0B\u6B21\u4F1A\u8BAE\u6392\u5B9A"], hook: true }
];
function AgendaRail() {
  const ref = useOnView(0.25);
  return /* @__PURE__ */ React.createElement("div", { className: "agr", ref }, AGENDA_BLOCKS.map((b, i) => /* @__PURE__ */ React.createElement("div", { className: "agr-block" + (b.hook ? " hook" : ""), key: i }, /* @__PURE__ */ React.createElement("span", { className: "agr-no" }, "0" + (i + 1)), /* @__PURE__ */ React.createElement("span", { className: "agr-t" }, b.t), /* @__PURE__ */ React.createElement("div", { className: "agr-items" }, b.items.map((it, j) => /* @__PURE__ */ React.createElement("span", { className: "agr-item", key: j }, it))))), /* @__PURE__ */ React.createElement("p", { className: "agr-cap" }, "\u5E26\u70B9\u7684\u4E24\u9879\uFF0C\u662F\u628A\u4E0A\u4E00\u6B21\u4F1A\u8BAE\u63A5\u8FDB\u8FD9\u4E00\u6B21\u4F1A\u8BAE\u7684\u63A5\u53E3\u3002"));
}
const PARAMS = [
  { n: "dial", t: "\u53D1\u8A00\u65F6\u95F4\u9650\u5236", v: "1\u20135 \u5206\u949F" },
  { n: "clock", t: "\u8FA9\u8BBA\u9650\u5236", v: "\u7531\u7EC4\u7EC7\u8BBE\u5B9A" },
  { n: "motion", t: "\u52A8\u8BAE\u6388\u6743\u8303\u56F4", v: "\u8C01\u80FD\u63D0\u3001\u63D0\u54EA\u51E0\u7C7B" },
  { n: "vote", t: "\u8868\u51B3\u8BB0\u540D\u6A21\u5F0F", v: "\u8BB0\u540D / \u65E0\u8BB0\u540D" },
  { n: "order", t: "\u6CD5\u5B9A\u4EBA\u6570", v: "\u4EBA\u6570 / \u8868\u51B3\u6743\u6570" },
  { n: "order", t: "\u79E9\u5E8F\u95EE\u9898\u70B9\u540D\u95E8\u69DB", v: "\u7D2F\u8BA1 N \u6B21\u89E6\u53D1" },
  { n: "rail", t: "\u8054\u7F72\u53D1\u8D77\u95E8\u69DB", v: "N \u4EBA\u6216 N%" },
  { n: "room", t: "\u4E3B\u6301\u6A21\u5F0F", v: "AI \u4E3B\u6301 / \u771F\u4EBA\u4E3B\u6301" }
];
function ParamCards() {
  const ref = useOnView(0.2);
  return /* @__PURE__ */ React.createElement("div", { className: "par", ref }, PARAMS.map((p, i) => /* @__PURE__ */ React.createElement("div", { className: "par-card", key: i, style: { transitionDelay: i * 0.05 + "s" } }, /* @__PURE__ */ React.createElement(VIcon, { name: p.n }), /* @__PURE__ */ React.createElement("span", { className: "par-t" }, p.t), /* @__PURE__ */ React.createElement("span", { className: "par-v" }, p.v))));
}
function LedgerFlow() {
  const ref = useOnView(0.2);
  return /* @__PURE__ */ React.createElement("div", { className: "led", ref }, /* @__PURE__ */ React.createElement("div", { className: "led-chain" }, /* @__PURE__ */ React.createElement("span", { className: "led-node per" }, "\u4E2A\u4EBA\u841D\u535C\u4E01"), /* @__PURE__ */ React.createElement("span", { className: "led-arrow" }, /* @__PURE__ */ React.createElement("i", null, "\u81EA\u613F\u5212\u62E8 \xB7 \u4EE5\u52A8\u8BAE\u63D0\u51FA")), /* @__PURE__ */ React.createElement("span", { className: "led-node mid" }, "\u7EC4\u7EC7\u5BA1\u8BAE\uFF1A\u63A5\u53D7 / \u4E0D\u63A5\u53D7"), /* @__PURE__ */ React.createElement("span", { className: "led-arrow" }, /* @__PURE__ */ React.createElement("i", null, "\u5199\u51FA\u4F7F\u7528\u524D\u63D0")), /* @__PURE__ */ React.createElement("span", { className: "led-node org" }, "\u7EC4\u7EC7\u516C\u5E93")), /* @__PURE__ */ React.createElement("div", { className: "led-split" }, /* @__PURE__ */ React.createElement("span", null, "\u6307\u5B9A\u7528\u9014\uFF1F"), /* @__PURE__ */ React.createElement("span", null, "\u975E\u5B9A\u5411\uFF1F"), /* @__PURE__ */ React.createElement("span", null, "\u6709\u6CA1\u6709\u4F7F\u7528\u7EA6\u5B9A\uFF1F")), /* @__PURE__ */ React.createElement("div", { className: "led-meet" }, /* @__PURE__ */ React.createElement(VIcon, { name: "coin" }), /* @__PURE__ */ React.createElement("span", null, "\u521B\u5EFA\u4F1A\u8BAE\u65F6\u51BB\u7ED3 \xB7 \u4F1A\u8BAE\u7ED3\u675F\u540E\u6B63\u5F0F\u6263\u9664")));
}
const DELIVERABLES = [
  { n: "doc", t: "\u4F1A\u8BAE\u7EAA\u8981\u4E0E\u53D1\u8A00\u8BB0\u5F55", d: "\u51B3\u8BAE\u3001\u7968\u6570\u3001\u53D1\u8A00\u5168\u6587\uFF0C\u53EF\u5BFC\u51FA Word / Markdown" },
  { n: "motion", t: "\u5951\u7EA6\u94FE\u63A5", d: "\u4F1A\u8BAE\u7ED3\u679C\u6574\u7406\u4E3A\u7EA6\u5B9A\uFF0C\u751F\u6210\u516C\u5F00\u51ED\u636E" },
  { n: "clock", t: "\u4E0B\u4E00\u6B21\u4F1A\u8BAE\u7684\u6295\u5F71", d: "\u672A\u5B8C\u4E8B\u52A1\u81EA\u52A8\u8FDB\u5165\u4E0B\u6B21\u8BAE\u7A0B" }
];
function Deliverables() {
  const ref = useOnView(0.25);
  return /* @__PURE__ */ React.createElement("div", { className: "dlv", ref }, DELIVERABLES.map((d, i) => /* @__PURE__ */ React.createElement("div", { className: "dlv-card", key: i, style: { transitionDelay: i * 0.1 + "s" } }, /* @__PURE__ */ React.createElement(VIcon, { name: d.n }), /* @__PURE__ */ React.createElement("b", null, d.t), /* @__PURE__ */ React.createElement("span", null, d.d))));
}
function Chapter(props) {
  return /* @__PURE__ */ React.createElement("div", { className: "sp-text" }, /* @__PURE__ */ React.createElement(Eyebrow, null, props.k), /* @__PURE__ */ React.createElement(Reveal, { d: 1 }, props.h1 ? /* @__PURE__ */ React.createElement("h1", { className: "ch-title" }, props.title) : /* @__PURE__ */ React.createElement("h2", null, props.title)), props.lead ? /* @__PURE__ */ React.createElement(Reveal, { d: 2 }, /* @__PURE__ */ React.createElement("p", { className: props.h1 ? "ch-lead" : "sp-note" }, props.lead)) : null, props.tags ? /* @__PURE__ */ React.createElement(Reveal, { d: 3 }, /* @__PURE__ */ React.createElement("div", { className: "sp-tags" }, props.tags.map(function(t, i) {
    return /* @__PURE__ */ React.createElement("span", { key: i }, t);
  }))) : null);
}
function ScrollIndicator() {
  return /* @__PURE__ */ React.createElement("div", { className: "scroll-ind", "aria-hidden": "true" }, /* @__PURE__ */ React.createElement("span", null, "SCROLL"), /* @__PURE__ */ React.createElement("div", { className: "si-line" }, /* @__PURE__ */ React.createElement("div", { className: "si-hl" })));
}
