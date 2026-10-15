/* ===== iMeeting 说明书站 · 共享组件（React） ===== */

/* ---------- 滚动进场 ---------- */
function Reveal(props) {
  const ref = useRef(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver((es) => {
      for (const en of es) if (en.isIntersecting) { el.classList.add('on'); io.disconnect(); }
    }, { threshold: 0.16, rootMargin: '0px 0px -6% 0px' });
    io.observe(el);
    return () => io.disconnect();
  }, []);
  const cls = 'reveal' + (props.d ? ' d' + props.d : '') + (props.className ? ' ' + props.className : '');
  return <div ref={ref} className={cls} style={props.style}>{props.children}</div>;
}

/* ---------- 顶栏 / 页脚 / 眉标 ---------- */
function Topbar(props) {
  const a = props.active;
  const link = (href, key, label) => <a key={key} href={href} className={a === key ? 'on' : ''}>{label}</a>;
  return (
    <header className="topbar">
      <a className="brand" href="#/"><span className="brand-dot"></span><span className="brand-dot"></span>iMeeting · 萝卜开会</a>
      <nav className="nav">
        {link('#/time', 'time', '之一·时间')}
        {link('#/order', 'order', '之二·秩序')}
        {link('#/continuity', 'continuity', '之三·连续')}
        <span className="nav-sep">|</span>
        {link('#/guide', 'guide', '参会引导')}
        {link('#/organizer', 'organizer', '组织者手册')}
        <a className="go" href="https://imeeting.co/" target="_blank" rel="noopener">进入 iMeeting ↗</a>
      </nav>
    </header>
  );
}

function Footer(props) {
  return (
    <footer>
      <div className="sig">iMeeting · 萝卜开会 — Meetings become memory.</div>
      {props.children}
    </footer>
  );
}

function Eyebrow(props) {
  return <Reveal><div className="eyebrow">{props.children}</div></Reveal>;
}

/* ---------- 对比条 ---------- */
function Bars(props) {
  const ref = useRef(null);
  useEffect(() => {
    const el = ref.current;
    const io = new IntersectionObserver((es) => {
      for (const en of es) if (en.isIntersecting) { el.classList.add('on'); io.disconnect(); }
    }, { threshold: 0.3 });
    io.observe(el);
    return () => io.disconnect();
  }, []);
  return (
    <div className="bars" ref={ref}>
      {props.rows.map((r, i) => (
        <div className="bar-row" key={i}>
          <div className="bar-label"><b>{r.label}</b><span>{r.meta}</span></div>
          <div className="track">
            {r.segs.map((s, j) => (
              <div className={'seg ' + s.cls + (s.w < 12 ? ' narrow' : '')} style={{ '--w': s.w + '%', transitionDelay: (j * 0.13) + 's' }} key={j}><small>{s.text}</small></div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}

/* ---------- 缺口三格 ---------- */
function AnswerGrid(props) {
  return (
    <Reveal d={props.d || 3} className="answer-grid">
      {props.cells.map((c, i) => (
        <div className="answer-cell" key={i}>
          <div className="k">{c.k}</div>
          <div className="v">{c.v}</div>
        </div>
      ))}
    </Reveal>
  );
}

/* ---------- 大排行 ---------- */
function Rows(props) {
  return (
    <div className="rows">
      {props.items.map((it, i) => (
        <Reveal key={i} className="row" d={0}>
          <span className="no">{it.no}</span>
          <span className="t">{it.t}</span>
          <span className="d">{it.d}</span>
        </Reveal>
      ))}
    </div>
  );
}

/* ---------- 机制卡片：原生 details 手风琴（默认收起，只露标题） ---------- */
function MechGrid(props) {
  return (
    <div className="mech-grid">
      {props.items.map((m, i) => (
        <Reveal key={i} className="mech-acc" d={i % 4}>
          <details>
            <summary>
              <span className="m-no">{m.no}</span>
              <span className="m-title">{m.title}</span>
              <span className="m-plus" aria-hidden="true"></span>
            </summary>
            <div className="m-body">
              <dl>
                <dt>管什么</dt><dd>{m.what}</dd>
                <dt>何时触发</dt><dd>{m.when}</dd>
              </dl>
              <div className="adj"><b>组织可怎么调</b><span>{m.adj}</span></div>
            </div>
          </details>
        </Reveal>
      ))}
    </div>
  );
}

/* ---------- 切片回放 ---------- */
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
    wrap.querySelectorAll('[data-left]').forEach(el => io.observe(el));
    return () => io.disconnect();
  }, []);
  return (
    <Reveal d={2} className="slice-wrap">
      <div ref={wrapRef} style={{ display: 'contents' }}>
        <div className="slice-sticky">
          <span className="tag">{props.tag}</span>
          <span>{props.title}</span>
          <span className="dim">{props.dim}{props.clock ? <span> · <span className="clock" ref={clockRef}>{props.clockStart}</span></span> : null}</span>
        </div>
        <div className="slice-body">{props.children}</div>
      </div>
    </Reveal>
  );
}

function E(props) {
  return (
    <Reveal className={'e' + (props.host ? ' host' : '')}>
      <div className="e-time">{props.time}</div>
      <div data-left={props.left || undefined}>
        <div className="e-who"><b>{props.who}</b>{props.role ? ' · ' + props.role : ''}</div>
        {props.children}
      </div>
    </Reveal>
  );
}

function Note(props) {
  return (
    <div className="e-note">
      <span className={'chip' + (props.orange ? ' orange' : '')}>{props.chip}</span>
      {props.why ? <span className="why">{props.why}</span> : null}
    </div>
  );
}

/* ---------- 翻牌字 ---------- */
const FLAP_CHARS = '动议附议辩论表决宣布记录主持秩序0123456789赞成反对弃权';
function Flap(props) {
  const ref = useRef(null);
  const [text, setText] = useState('\u00a0');
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
          let line = '';
          for (let i = 0; i < chars.length; i++) {
            if (i < settled) { line += chars[i]; continue; }
            if (chars[i] === ' ') { line += ' '; continue; }
            line += FLAP_CHARS[Math.floor(Math.random() * FLAP_CHARS.length)];
          }
          setText(line);
          if (tick % 2 === 0 && settled < chars.length) settled += Math.max(1, Math.round(chars.length / 26));
          if (settled >= chars.length) { setText(final); clearInterval(timer); }
        }, 46);
      }
    }, { threshold: 0.5 });
    io.observe(el);
    return () => io.disconnect();
  }, []);
  return <div className="flap" ref={ref}>{text}</div>;
}

/* ---------- 原生 meter：表决结果 ---------- */
function VoteMeter(props) {
  const total = props.items.reduce((s, it) => s + it.n, 0);
  return (
    <div className="vote-meter">
      {props.items.map((it, i) => (
        <div className="vm-row" key={i}>
          <span className="vm-label">{it.label}</span>
          <meter min={0} max={total} value={it.n} className={'vm-' + it.cls}>{it.n}</meter>
          <span className="vm-n">{it.n} 票</span>
        </div>
      ))}
      <div className="vm-caption">共 {total} 票 · 记名表决 · 每票留痕</div>
    </div>
  );
}

/* ---------- 原生 range：参数滑杆演示 ---------- */
function RangeDemo(props) {
  const [v, setV] = useState(props.value || 2);
  return (
    <div className="range-demo">
      <div className="rd-head">
        <span className="rd-label">{props.label}</span>
        <span className="rd-value">{v} {props.unit}</span>
      </div>
      <input
        type="range"
        min={props.min} max={props.max} step={props.step || 1}
        value={v}
        onChange={(e) => setV(e.target.value)}
        aria-label={props.label}
      />
      <div className="rd-caption">{props.caption}</div>
    </div>
  );
}

/* ================= 图形化叙事（SVG） ================= */

/* ---------- 图 1：混乱 vs 有序（圆角 + 流动） ---------- */
const CHAOS_PATHS = [
  'M10 30 C 90 96, 150 16, 230 84',
  'M10 66 C 70 16, 170 112, 230 44',
  'M10 104 C 100 132, 140 34, 230 112',
  'M10 142 C 60 64, 160 152, 230 132',
  'M10 50 C 110 152, 130 64, 230 24',
  'M10 128 C 90 34, 170 94, 230 148'
];
const ORDER_LANES = [
  { y: 50, t: '修正案' },
  { y: 90, t: '秩序问题' },
  { y: 130, t: '推迟动议' },
  { y: 170, t: '拆分处理' }
];
function ChaosOrderDiagram() {
  const ref = useOnView(0.3);
  return (
    <div className="diagram chaos-dia" ref={ref}>
      <svg viewBox="0 0 1000 220" className="svg-wide" role="img" aria-label="没有结构与有程序的对照图">
        <text x="16" y="24" className="svg-cap">没有结构 · 谁抢到谁先说</text>
        <g className="chaos">
          {CHAOS_PATHS.map((d, i) => (
            <g key={i}>
              <path d={d} className="chaos-base" fill="none" />
              <path d={d} className="chaos-flow" fill="none" style={{ animationDelay: (i * -0.7) + 's' }} />
            </g>
          ))}
          <circle cx="122" cy="84" r="7" className="chaos-dot" />
          <circle cx="188" cy="58" r="5.5" className="chaos-dot" />
        </g>
        <text x="268" y="118" className="svg-vs">→</text>
        <g transform="translate(340,0)">
          <text x="16" y="24" className="svg-cap">有程序 · 各自进入通道</text>
          {ORDER_LANES.map((l, i) => (
            <g key={i}>
              <path d={'M10 ' + l.y + ' H 456'} className="lane-line" fill="none" />
              <circle cx="10" cy={l.y} r="7" className="lane-start" />
              <rect x="486" y={l.y - 19} width="152" height="38" rx="19" className="lane-pill" />
              <text x="562" y={l.y + 5} textAnchor="middle" className="lane-label">{l.t}</text>
              <circle r="4.5" className="lane-dot">
                <animateMotion dur={(3.4 + i * 0.3) + 's'} repeatCount="indefinite" path={'M10 ' + l.y + ' H 456'} />
              </circle>
            </g>
          ))}
        </g>
      </svg>
    </div>
  );
}

/* ---------- 图 2：一场会的完整生命（循环） ---------- */
function MeetingLoopDiagram() {
  const ref = useRef(null);
  useEffect(() => {
    const el = ref.current;
    const io = new IntersectionObserver((es) => {
      for (const en of es) if (en.isIntersecting) { el.classList.add('on'); io.disconnect(); }
    }, { threshold: 0.35 });
    io.observe(el);
    return () => io.disconnect();
  }, []);
  const steps = ['动议', '附议', '宣布议题', '辩论', '表决', '宣布结果'];
  return (
    <div className="diagram" ref={ref}>
      <svg viewBox="0 0 1000 300" className="svg-wide" role="img" aria-label="会议生命周期图">
        <g className="loop-steps">
          {steps.map((s, i) => (
            <g key={i} transform={'translate(' + (60 + i * 150) + ',70)'}>
              <rect x="-52" y="-24" width="104" height="48" rx="4" className="node-box" />
              <text textAnchor="middle" y="-2" className="node-no">{'0' + (i + 1)}</text>
              <text textAnchor="middle" y="16" className="node-t">{s}</text>
              {i < steps.length - 1 ? <path d={'M 56 0 H 92'} className="flow-arrow" /> : null}
            </g>
          ))}
        </g>
        <path d="M 912 70 C 960 140, 900 200, 760 210 H 240 C 120 210, 40 150, 58 84" fill="none" className="loop-back" />
        <g transform="translate(500,186)">
          <rect x="-170" y="-26" width="340" height="52" rx="4" className="node-box accent" />
          <text textAnchor="middle" y="-3" className="node-t2">决议 → 契约 · 会议纪要 · 未完事务</text>
          <text textAnchor="middle" y="17" className="node-sub">决定被记录，并自动回到下一次会议</text>
        </g>
        <text x="60" y="278" className="svg-cap">会前：通知与议程 → 会中：动议六部曲 → 会后：决议有生命 → 下一次会议，接着上次继续</text>
      </svg>
    </div>
  );
}

/* ---------- 图 3：四个声音的路由 ---------- */
function VoiceRoutingDiagram() {
  const ref = useRef(null);
  useEffect(() => {
    const el = ref.current;
    const io = new IntersectionObserver((es) => {
      for (const en of es) if (en.isIntersecting) { el.classList.add('on'); io.disconnect(); }
    }, { threshold: 0.35 });
    io.observe(el);
    return () => io.disconnect();
  }, []);
  const voices = [
    { who: '甲', say: '该改成旅游', out: '修正案', color: 'c-teal' },
    { who: '乙', say: '连假 + 加培训', out: '拆成两件事', color: 'c-grass' },
    { who: '丙', say: '讨论顺序错了', out: '秩序问题', color: 'c-orange' },
    { who: '丁', say: '现在不该讨论', out: '推迟动议', color: 'c-ink' }
  ];
  return (
    <div className="diagram" ref={ref}>
      <svg viewBox="0 0 1000 260" className="svg-wide" role="img" aria-label="四个声音各自进入对应通道">
        {voices.map((v, i) => {
          const y = 45 + i * 60;
          return (
            <g key={i} className={'route ' + v.color}>
              <circle cx="60" cy={y} r="18" className="route-who" />
              <text x="60" y={y + 5} textAnchor="middle" className="route-who-t">{v.who}</text>
              <text x="95" y={y + 5} className="route-say">{v.say}</text>
              <path d={'M 300 ' + y + ' H 640'} className="route-line" fill="none" />
              <rect x="650" y={y - 20} width="150" height="40" rx="4" className="route-out" />
              <text x="725" y={y + 5} textAnchor="middle" className="route-out-t">{v.out}</text>
            </g>
          );
        })}
        <text x="300" y="245" className="svg-cap">四种异议，四条通道，互不淹没——顺序由规则决定</text>
      </svg>
    </div>
  );
}

/* ---------- 图 4：会议时间线（会与会相连） ---------- */
function MeetingTimelineDiagram() {
  const ref = useRef(null);
  useEffect(() => {
    const el = ref.current;
    const io = new IntersectionObserver((es) => {
      for (const en of es) if (en.isIntersecting) { el.classList.add('on'); io.disconnect(); }
    }, { threshold: 0.35 });
    io.observe(el);
    return () => io.disconnect();
  }, []);
  return (
    <div className="diagram" ref={ref}>
      <svg viewBox="0 0 1000 240" className="svg-wide" role="img" aria-label="会议之间通过未完事务与契约相连">
        <path d="M 40 120 H 960" className="tl-axis" />
        {[
          { x: 160, name: '第 11 次例会', note: '决议 4 项 · 契约 1 份' },
          { x: 500, name: '第 12 次例会', note: '宣读记录 → 未完事务继续' },
          { x: 840, name: '第 13 次例会', note: '自动排入日历' }
        ].map((m, i) => (
          <g key={i} transform={'translate(' + m.x + ',120)'}>
            <circle r="10" className="tl-node" />
            <text y="-22" textAnchor="middle" className="tl-name">{m.name}</text>
            <text y="34" textAnchor="middle" className="tl-note">{m.note}</text>
          </g>
        ))}
        <path d="M 160 108 C 240 40, 420 40, 500 108" fill="none" className="tl-arc" />
        <text x="330" y="52" textAnchor="middle" className="tl-arc-t">未完事务自动进入下次议程</text>
        <path d="M 500 132 C 580 200, 760 200, 840 132" fill="none" className="tl-arc accent" />
        <text x="670" y="196" textAnchor="middle" className="tl-arc-t">决议 → 契约链接 · 凭据公开</text>
      </svg>
    </div>
  );
}

/* ---------- 路径卡片 / 幕间 / 手册工具 ---------- */
function Paths(props) {
  return (
    <div className="paths">
      {props.items.map((p, i) => (
        <Reveal key={i} className="path" d={i}>
          <a href={p.href} style={{ textDecoration: 'none', color: 'inherit', display: 'contents' }}>
            <span className="p-k">{p.k}</span>
            <span className="p-t">{p.t}</span>
            <span className="p-d">{p.d}</span>
            <span className="p-go">{p.go}</span>
          </a>
        </Reveal>
      ))}
    </div>
  );
}

function Turn(props) {
  return (
    <section className="turn">
      <Eyebrow>{props.eyebrow}</Eyebrow>
      <Reveal d={1}><h2>{props.title}</h2></Reveal>
      <Reveal d={2}><p className="lead">{props.lead}</p></Reveal>
      {props.next ? (
        <Reveal d={3}>
          <a className="next-act" href={props.next.href}>
            <span>NEXT</span><b>{props.next.title}</b><span>{props.next.label}</span>
          </a>
        </Reveal>
      ) : null}
    </section>
  );
}

function Toc(props) {
  return (
    <Reveal d={3} className="toc">
      {props.items.map((it, i) => <a key={i} href={it.href}>{it.label}</a>)}
    </Reveal>
  );
}

function SpecTable(props) {
  return (
    <Reveal d={1}>
      <table className="spec">
        <thead><tr>{props.head.map((h, i) => <th key={i}>{h}</th>)}</tr></thead>
        <tbody>
          {props.rows.map((r, i) => (
            <tr key={i}>{r.map((cell, j) => <td key={j}>{cell}</td>)}</tr>
          ))}
        </tbody>
      </table>
    </Reveal>
  );
}

function DocNote(props) {
  return <Reveal d={props.d || 2} className={'doc-note' + (props.orange ? ' orange' : '')}>{props.children}</Reveal>;
}

function Steps(props) {
  return (
    <Reveal d={1} className="steps" style={props.cols ? { gridTemplateColumns: 'repeat(' + props.cols + ',1fr)' } : undefined}>
      {props.items.map((s, i) => (
        <div className="step" key={i}>
          <div className="s-no">{s.no}</div>
          <div className="s-t">{s.t}</div>
          <div className="s-d">{s.d}</div>
        </div>
      ))}
    </Reveal>
  );
}



/* ---------- GradientWaves 全屏背景 ---------- */
function GradientWavesBg(props) {
  const ref = useRef(null);
  useEffect(() => {
    if (!ref.current || !window.GradientWavesInit) return;
    window.__gw = window.GradientWavesInit(ref.current, props) || null;
  }, []);
  return <div className="global-aurora" ref={ref} aria-hidden="true"></div>;
}

/* ---------- MaskedHeading 大字标题（程序生成渐变填充） ---------- */
function drawHeadingGradient() {
  const c = document.createElement('canvas');
  c.width = 1400; c.height = 420;
  const x = c.getContext('2d');
  const g = x.createLinearGradient(0, 0, 1400, 420);
  g.addColorStop(0, '#1f4e79');
  g.addColorStop(0.45, '#3d6b82');
  g.addColorStop(0.75, '#7fb3c8');
  g.addColorStop(1, '#b8d4de');
  x.fillStyle = g;
  x.fillRect(0, 0, 1400, 420);
  // 柔光斑点
  const spots = [[300, 120, 180, 'rgba(255,255,255,.55)'], [900, 300, 220, 'rgba(255,255,255,.4)'], [1150, 100, 140, 'rgba(220,232,236,.5)']];
  for (const [sx, sy, r, col] of spots) {
    const rg = x.createRadialGradient(sx, sy, 0, sx, sy, r);
    rg.addColorStop(0, col);
    rg.addColorStop(1, 'rgba(255,255,255,0)');
    x.fillStyle = rg;
    x.fillRect(0, 0, 1400, 420);
  }
  return c.toDataURL('image/png');
}

function MaskedTitle(props) {
  const srcRef = useRef(null);
  if (!srcRef.current) srcRef.current = drawHeadingGradient();
  if (!window.MaskedHeading) return <h1>{props.text}</h1>;
  return (
    <window.MaskedHeading
      text={props.text}
      src={srcRef.current}
      fillScale={1.2}
      parallax={20}
      reveal="rise"
      trigger="view"
      drift={16}
      brightness={1}
      saturation={1}
      duration={1.1}
      stagger={0.08}
      align="center"
      weight={800}
      tracking={-0.02}
      lineHeight={1.05}
      textScale={props.textScale || 0.17}
    />
  );
}


/* ---------- 整页翻屏控制（滚轮/触摸/键盘，滚一次翻一屏） ---------- */
const SCREEN_PALETTES = [
  ['#7fb3c8', '#3d6b82', '#ffffff'],  // S1 首屏 · 青花系
  ['#8fa8bd', '#4a6b8a', '#ffffff'],  // S2 对比 · 灰蓝系
  ['#a4c8d8', '#2f5d8a', '#ffffff'],  // S3 效果 · 青花系
  ['#6ba3bd', '#1f4e79', '#ffffff'],  // S4 文件夹 · 深青花
  ['#7fb3c8', '#3d6b82', '#ffffff'],  // S5 脉络 · 青花系
  ['#9db4c6', '#527a8a', '#ffffff'],  // S6 会后 · 灰蓝系
  ['#8aa5bb', '#40607a', '#ffffff'],  // S7 开始 · 灰蓝系
  ['#cfdde4', '#2f5d8a', '#f4f8f9']   // S8 尾声 · 月白
];
let pagerGo = null;
function FullPager(props) {
  useEffect(() => {
    const PALETTES = props.palettes || SCREEN_PALETTES;
    const screens = Array.from(document.querySelectorAll('.screen'));
    if (!screens.length) return undefined;
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
      window.scrollTo({ top: screens[i].offsetTop, behavior: 'smooth' });
      setTimeout(() => { anim = false; }, 950);
    };
    /* 让配色跟随「当前可见的那一屏」——不管用户是滚轮、拖滚动条还是点导航过来的 */
    const io = new IntersectionObserver((entries) => {
      for (const en of entries) {
        if (!en.isIntersecting || en.intersectionRatio < 0.55) continue;
        const i = screens.indexOf(en.target);
        if (i >= 0 && i !== idx) { idx = i; apply(i); }
      }
    }, { threshold: [0.55] });
    screens.forEach((s) => io.observe(s));
    const onWheel = (e) => {
      e.preventDefault();
      if (anim || Math.abs(e.deltaY) < 18) return;
      go(idx + (e.deltaY > 0 ? 1 : -1));
    };
    const onKey = (e) => {
      if (e.key === 'ArrowDown' || e.key === 'PageDown' || e.key === ' ') { e.preventDefault(); go(idx + 1); }
      else if (e.key === 'ArrowUp' || e.key === 'PageUp') { e.preventDefault(); go(idx - 1); }
      else if (e.key === 'Home') { e.preventDefault(); go(0); }
      else if (e.key === 'End') { e.preventDefault(); go(screens.length - 1); }
    };
    let ty = 0;
    const onTS = (e) => { ty = e.touches[0].clientY; };
    const onTE = (e) => {
      const d = ty - e.changedTouches[0].clientY;
      if (Math.abs(d) > 48) go(idx + (d > 0 ? 1 : -1));
    };
    window.addEventListener('wheel', onWheel, { passive: false });
    window.addEventListener('keydown', onKey);
    window.addEventListener('touchstart', onTS, { passive: true });
    window.addEventListener('touchend', onTE, { passive: true });
    apply(0);
    pagerGo = go;
    return () => {
      pagerGo = null;
      io.disconnect();
      window.removeEventListener('wheel', onWheel);
      window.removeEventListener('keydown', onKey);
      window.removeEventListener('touchstart', onTS);
      window.removeEventListener('touchend', onTE);
    };
  }, []);
  return (
    <div className="pager-nav">
      <button className="pager-btn" aria-label="上一屏" onClick={() => pagerGo && pagerGo(-1, true)}>
        <svg viewBox="0 0 16 16" width="16" height="16"><path d="M3 10 L8 5 L13 10" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/></svg>
      </button>
      <button className="pager-btn" aria-label="下一屏" onClick={() => pagerGo && pagerGo(1, true)}>
        <svg viewBox="0 0 16 16" width="16" height="16"><path d="M3 6 L8 11 L13 6" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/></svg>
      </button>
    </div>
  );
}


/* ---------- 青瓷轨道：四样东西绕心旋转 ---------- */
const ORBIT_ITEMS = [
  { ch: '议程', t: '不跑题' },
  { ch: '计时', t: '大家约定' },
  { ch: '出口', t: '都有位置' },
  { ch: '休会', t: '也是权利' }
];
function PorcelainOrbit() {
  const stageRef = useRef(null);
  const itemRefs = useRef([]);
  useEffect(() => {
    const stage = stageRef.current;
    if (!stage) return;
    const reduce = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    let raf = 0, angle = 0, last = 0, visible = true;
    const RX = 340, RY = 120, TILT = -8 * Math.PI / 180;
    const cos = Math.cos(TILT), sin = Math.sin(TILT);
    function place() {
      for (let i = 0; i < ORBIT_ITEMS.length; i++) {
        const a = angle + (i * Math.PI * 2) / ORBIT_ITEMS.length;
        const x0 = Math.cos(a) * RX, y0 = Math.sin(a) * RY;
        const x = x0 * cos - y0 * sin, y = x0 * sin + y0 * cos;
        const depth = (Math.sin(a) + 1) / 2; // 0 远 1 近
        const el = itemRefs.current[i];
        if (!el) continue;
        el.style.transform = 'translate(-50%,-50%) translate(' + x.toFixed(1) + 'px,' + y.toFixed(1) + 'px) scale(' + (0.82 + depth * 0.28).toFixed(3) + ')';
        el.style.zIndex = depth > 0.5 ? 3 : 1;
        el.style.opacity = (0.55 + depth * 0.45).toFixed(2);
      }
    }
    function frame(t) {
      raf = requestAnimationFrame(frame);
      if (!visible || document.hidden) { last = t; return; }
      const dt = last ? Math.min(0.05, (t - last) / 1000) : 0.016;
      last = t;
      if (!reduce) angle += dt * (Math.PI * 2 / 36); // 36 秒一圈
      place();
    }
    const io = new IntersectionObserver((es) => { visible = es.some(e => e.isIntersecting); });
    io.observe(stage);
    place();
    raf = requestAnimationFrame(frame);
    return () => { cancelAnimationFrame(raf); io.disconnect(); };
  }, []);
  return (
    <div className="porcelain-orbit" ref={stageRef}>
      <svg className="po-path" viewBox="-420 -200 840 400" aria-hidden="true">
        <ellipse cx="0" cy="0" rx="340" ry="120" transform="rotate(-8)" />
      </svg>
      <div className="po-center">
        <span className="po-center-k">每场会都有</span>
        <span className="po-center-t">四样东西</span>
      </div>
      {ORBIT_ITEMS.map((it, i) => (
        <div className="po-item" key={i} ref={(el) => (itemRefs.current[i] = el)}>
          <span className="po-ch">{it.ch}</span>
          <span className="po-t">{it.t}</span>
        </div>
      ))}
    </div>
  );
}


/* ---------- 自动步进：动议六部曲 ---------- */
const LOOP_STEPS = [
  { t: '动议', d: '主张被正式提出，而不是随口一说' },
  { t: '附议', d: '有人支持，议题才进入讨论' },
  { t: '宣布议题', d: '全场确认：正在决定的是这件事' },
  { t: '辩论', d: '理由当面说清，记录在案' },
  { t: '表决', d: '时机、方式、法定人数，依次确认' },
  { t: '宣布结果', d: '结果当场宣布，即刻生效' }
];
function AutoSteps() {
  const [step, setStep] = useState(1);
  useEffect(() => {
    const timer = setInterval(() => setStep(s => (s % LOOP_STEPS.length) + 1), 2400);
    return () => clearInterval(timer);
  }, []);
  if (!window.Stepper) return null;
  return (
    <div className="auto-steps">
      <window.Stepper step={step} theme="light" indicator="numbers" orientation="horizontal" transition="slide" linear={false} showFooter={false} width="100%">
        {LOOP_STEPS.map((s, i) => (
          <window.StepperStep key={i} title={s.t}>
            <div className="asb">
              <span className="asb-no">{'0' + (i + 1)}</span>
              <span className="asb-t">{s.t}</span>
              <span className="asb-d">{s.d}</span>
            </div>
          </window.StepperStep>
        ))}
      </window.Stepper>
    </div>
  );
}

/* ---------- 毛玻璃按钮（GlassSurface 原生组件） ---------- */
function GlassButton(props) {
  const inner = (
    <span className={'glass-btn-label' + (props.primary ? ' primary' : '')}>{props.children}</span>
  );
  if (!window.GlassSurface) {
    return <a className={'btn' + (props.primary ? ' primary' : '')} href={props.href} target={props.target} rel="noopener" onClick={props.onClick}>{inner}</a>;
  }
  /* primary：玻璃之下一层青花底，保证白字读得出来 */
  return (
    <a className={'glass-btn' + (props.primary ? ' primary' : '')} href={props.href} target={props.target} rel="noopener" onClick={props.onClick} style={{ textDecoration: 'none', display: 'inline-block' }}>
      <window.GlassSurface
        width={props.width || 200}
        height={54}
        borderRadius={27}
        distortionScale={-160}
        displace={0.5}
        backgroundOpacity={props.primary ? 0.3 : 0.1}
      >
        {inner}
      </window.GlassSurface>
    </a>
  );
}


/* ---------- 加载屏（计数 + 词轮换 + 渐变进度条） ---------- */
const LOAD_WORDS = ['议程', '动议', '辩论', '表决', '记录'];
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
      else setTimeout(() => { setLeaving(true); setTimeout(props.onComplete, 450); }, 300);
    }
    raf = requestAnimationFrame(tick);
    const w = setInterval(() => setWordIdx(i => (i + 1) % LOAD_WORDS.length), 900);
    return () => { cancelAnimationFrame(raf); clearInterval(w); };
  }, []);
  return (
    <div className={'loading-screen' + (leaving ? ' leaving' : '')}>
      <div className="ls-label">iMeeting · 说明书</div>
      <div className="ls-word" key={wordIdx}>{LOAD_WORDS[wordIdx]}</div>
      <div className="ls-count">{String(count).padStart(3, '0')}</div>
      <div className="ls-bar"><div className="ls-bar-inner" style={{ transform: 'scaleX(' + count / 100 + ')' }}></div></div>
    </div>
  );
}

/* ---------- 角色词轮换 ---------- */
const ROLE_WORDS = ['带议事程序', '让决定生效', '把承诺写进记录', '让规则长出规则'];
function RoleCycle() {
  const [i, setI] = useState(0);
  useEffect(() => {
    const t = setInterval(() => setI(v => (v + 1) % ROLE_WORDS.length), 2000);
    return () => clearInterval(t);
  }, []);
  return <span className="role-cycle" key={i}>{ROLE_WORDS[i]}</span>;
}

/* ================= V4 · 内页图形组件 ================= */

/* 统一的"进入视区即触发"观察器 */
function useOnView(threshold) {
  const ref = useRef(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return undefined;
    const io = new IntersectionObserver((es) => {
      for (const en of es) if (en.isIntersecting) { el.classList.add('on'); io.disconnect(); }
    }, { threshold: threshold || 0.25 });
    io.observe(el);
    return () => io.disconnect();
  }, []);
  return ref;
}

/* ---------- 图：一小时的分流（三股漏掉的时间） ---------- */
const LEAK_SINKS = [
  { x: 90, label: '重复陈述', cls: 'k1' },
  { x: 210, label: '跑题绕回', cls: 'k2' },
  { x: 330, label: '空转等待', cls: 'k3' },
  { x: 450, label: '推进议题', cls: 'k4' }
];
function TimeLeak() {
  const ref = useOnView(0.22);
  return (
    <div className="diagram leak-dia" ref={ref}>
      <svg viewBox="0 0 540 380" className="svg-wide" role="img" aria-label="一小时从三个缺口漏走">
        <rect x="130" y="14" width="280" height="48" rx="12" className="leak-src" />
        <text x="270" y="44" textAnchor="middle" className="leak-src-t">60 分钟</text>
        {LEAK_SINKS.map((s, i) => (
          <g key={i}>
            <path
              d={'M 270 62 C 270 150, ' + s.x + ' 160, ' + s.x + ' 258'}
              className={'leak-line ' + s.cls}
              fill="none"
            />
            <circle cx={s.x} cy="262" r="6" className="leak-dot" />
            <text x={s.x} y="296" textAnchor="middle" className="leak-lb">{s.label}</text>
          </g>
        ))}
        <text x="270" y="352" textAnchor="middle" className="leak-cap">时间从三个缺口漏走。程序把缺口堵上。</text>
      </svg>
    </div>
  );
}

/* ---------- 图：发言轨道（22 分钟，机制在哪里介入） ---------- */
const TRACK_SPAN = 22; /* 20:04 → 20:26 */
const TRACK_LANES = ['主持', '甲', '乙', '丙', '丁'];
const TRACK_EVENTS = [
  { m: 0, len: 1.2, lane: 0, label: '宣布议题 · 开始辩论', chip: '辩论开始，剩余 12:00', kind: 'host' },
  { m: 1, len: 2, lane: 1, label: '赞成：改成两日一夜旅游', chip: '发言计时 00:38 / 02:00' },
  { m: 3, len: 2, lane: 2, label: '复述 19:48 已归档的观点', chip: '发言记录：说过即归档，不必再说一遍', kind: 'stop' },
  { m: 5, len: 2.4, lane: 3, label: '从成本讲到去年供应商报价', chip: '计时到点，发言权交还队列', kind: 'stop' },
  { m: 8, len: 2.4, lane: 4, label: '想插一句「聚餐去哪吃」', chip: '新话题进入动议队列，不插队、不消失', kind: 'stop' },
  { m: 11, len: 2.6, lane: 0, label: '提醒：剩余 2 分钟', chip: '辩论限制由集体设定，也可动议延长', kind: 'host' },
  { m: 21, len: 1, lane: 0, label: '辩论时间结束', chip: '进入表决', kind: 'host' }
];
const TRACK_TICKS = [{ m: 0, t: '20:04' }, { m: 5, t: '20:09' }, { m: 11, t: '20:15' }, { m: 22, t: '20:26' }];

function SpeechTrack() {
  const ref = useOnView(0.2);
  const [p, setP] = useState(0);
  useEffect(() => {
    const el = ref.current;
    if (!el) return undefined;
    let raf = 0, t0 = 0, run = false;
    const reduce = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (reduce) { setP(1); return undefined; }
    const io = new IntersectionObserver((es) => {
      const seen = es.some((e) => e.isIntersecting);
      if (seen && !run) { run = true; t0 = performance.now(); raf = requestAnimationFrame(loop); }
    }, { threshold: 0.25 });
    const loop = (t) => {
      const e = (t - t0) / 17000;
      if (e >= 1.35) { t0 = t; }
      setP(Math.min(1, (t - t0) / 17000));
      raf = requestAnimationFrame(loop);
    };
    io.observe(el);
    return () => { cancelAnimationFrame(raf); io.disconnect(); };
  }, []);
  const now = p * TRACK_SPAN;
  const active = TRACK_EVENTS.findIndex((e) => now >= e.m && now < e.m + e.len);
  const left = Math.max(0, 12 - Math.min(12, now * (12 / 22)));
  const mm = String(Math.floor(left)).padStart(2, '0');
  const ss = String(Math.round((left % 1) * 60)).padStart(2, '0');
  return (
    <div className="stk" ref={ref}>
      <div className="stk-top">
        <span className="stk-badge">待决动议 · 修正案：团建改为两日一夜集体旅游</span>
        <span className="stk-clock"><b>{mm}:{ss}</b><i>辩论剩余</i></span>
      </div>
      <div className="stk-ruler">
        {TRACK_TICKS.map((t, i) => <span key={i} style={{ left: (t.m / TRACK_SPAN * 100) + '%' }}>{t.t}</span>)}
      </div>
      <div className="stk-body" style={{ '--p': p }}>
        <div className="stk-grid" aria-hidden="true">
          {TRACK_TICKS.map((t, i) => <i key={i} style={{ left: (t.m / TRACK_SPAN * 100) + '%' }}></i>)}
        </div>
        {TRACK_LANES.map((ln, i) => (
          <div className="stk-lane" key={i}>
            <span className="stk-who">{ln}</span>
            <div className="stk-row">
              {TRACK_EVENTS.filter((e) => e.lane === i).map((e, j) => {
                const on = active >= 0 && TRACK_EVENTS[active] === e;
                const after = e.m < 12;
                const sp = (e.m / TRACK_SPAN * 100);
                const ep = ((e.m + e.len) / TRACK_SPAN * 100);
                return (
                  <React.Fragment key={j}>
                    <div className={'stk-bar ' + (e.kind || '') + (on ? ' on' : '')}
                      style={{ left: sp + '%', width: Math.max(0.8, ep - sp) + '%' }}></div>
                    <span className={'stk-lb ' + (after ? 'after' : 'before') + (on ? ' on' : '')}
                      style={after ? { left: ep + '%', paddingLeft: '10px' } : { right: (100 - sp) + '%', paddingRight: '10px' }}>
                      {e.label}
                    </span>
                  </React.Fragment>
                );
              })}
            </div>
          </div>
        ))}
        <div className="stk-head"></div>
      </div>
      <div className="stk-cap">
        {active >= 0 ? <React.Fragment><b>{TRACK_EVENTS[active].chip}</b></React.Fragment> : <b>回放结束</b>}
      </div>
      <div className="stk-tip">一段改写素材：七个时刻，四次机制介入。</div>
    </div>
  );
}

/* ---------- 图：动议栈（一次只有一个待决动议） ---------- */
function MotionStackViz() {
  const ref = useOnView(0.25);
  const [q, setQ] = useState(1);
  useEffect(() => {
    const t = setInterval(() => setQ((v) => (v % 3) + 1), 2600);
    return () => clearInterval(t);
  }, []);
  const queue = ['「结束辩论」有待表决', '「调整发言时间」有待表决', '「重议上一项决议」有待表决'];
  return (
    <div className="mstk" ref={ref}>
      <div className="mstk-top">
        <span className="mstk-k">正在审议 · 一次只有一个</span>
        <div className="mstk-card now">
          <b>修正案：团建改为两日一夜旅游</b>
          <span>辩论中 · 剩余 12:00</span>
        </div>
      </div>
      <div className="mstk-arrow"></div>
      <div className="mstk-q">
        <span className="mstk-k">队列 · 提出即排位</span>
        {queue.slice(0, q).map((s, i) => (
          <div className="mstk-card" key={i}>{s}</div>
        ))}
        <div className="mstk-card ghost">新话题 · 提出后自动排到这里</div>
      </div>
    </div>
  );
}

/* ---------- 图：表决的三环节 + 结果 ---------- */
const VOTE_STAGES = [
  { n: '01', t: '发起表决的时机', d: '辩论走完、队列清空' },
  { n: '02', t: '表决的方式', d: '记名 · 法定人数先核算' },
  { n: '03', t: '宣布表决结果', d: '当场宣布，记录在案' }
];
function VoteDonut() {
  const r = 52, c = 2 * Math.PI * r;
  const parts = [{ n: 7, cls: 'yes' }, { n: 3, cls: 'no' }, { n: 1, cls: 'abs' }];
  let off = 0;
  const total = 11;
  return (
    <svg viewBox="0 0 140 140" className="vst-donut" role="img" aria-label="赞成 7 反对 3 弃权 1">
      <circle cx="70" cy="70" r={r} className="vst-track" />
      {parts.map((p, i) => {
        const len = (p.n / total) * c;
        const el = (
          <circle key={i} cx="70" cy="70" r={r} className={'vst-seg ' + p.cls}
            strokeDasharray={len + ' ' + (c - len)} strokeDashoffset={-off} />
        );
        off += len;
        return el;
      })}
      <text x="70" y="64" textAnchor="middle" className="vst-n">7</text>
      <text x="70" y="84" textAnchor="middle" className="vst-lb">共 11 票</text>
    </svg>
  );
}
function VoteStage() {
  const ref = useRef(null);
  const [step, setStep] = useState(0);
  const [live, setLive] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return undefined;
    const io = new IntersectionObserver((es) => {
      if (es.some((e) => e.isIntersecting)) { setLive(true); io.disconnect(); }
    }, { threshold: 0.3 });
    io.observe(el);
    return () => io.disconnect();
  }, []);
  useEffect(() => {
    if (!live || step >= 3) return undefined;
    const t = setTimeout(() => setStep((v) => v + 1), 1500);
    return () => clearTimeout(t);
  }, [live, step]);
  const done = step >= 3;
  return (
    <div className="vst" ref={ref}>
      <div className="vst-stages">
        {VOTE_STAGES.map((s, i) => (
          <div className={'vst-tile' + (step === i ? ' on' : '') + (done || step > i ? ' done' : '')} key={i}>
            <span className="vst-no">{s.n}</span>
            <span className="vst-t">{s.t}</span>
            <span className="vst-d">{s.d}</span>
          </div>
        ))}
      </div>
      <div className={'vst-result' + (done ? ' on' : '')}>
        <VoteDonut />
        <div className="vst-right">
          <window.Flap text="修正案通过 · 记录在案" />
          <div className="vst-legend">
            <span><i className="dot yes"></i>赞成 7</span>
            <span><i className="dot no"></i>反对 3</span>
            <span><i className="dot abs"></i>弃权 1</span>
          </div>
          <p className="vst-note">反对票与弃权票同样留痕。沉默不等于同意。</p>
        </div>
      </div>
    </div>
  );
}

/* ---------- 图：一笔捐赠的两条走法 ---------- */
const MONEY_BAD = ['收到捐赠', '直接入库', '用途没人说得清', '私下争执 → 对立'];
const MONEY_GOOD = ['动议：是否接受捐赠', '附议成立', '集中提问：指定用途？', '记名表决', '决议 + 契约链接', '列入未完事务'];
function MoneyFlow() {
  const ref = useOnView(0.2);
  return (
    <div className="mfl" ref={ref}>
      <div className="mfl-row bad">
        <span className="mfl-k">没有程序的一场捐赠</span>
        <div className="mfl-chain">
          {MONEY_BAD.map((s, i) => (
            <React.Fragment key={i}>
              <span className="mfl-node" style={{ transitionDelay: (i * 0.12) + 's' }}>{s}</span>
              {i < MONEY_BAD.length - 1 ? <span className="mfl-link" style={{ transitionDelay: (i * 0.12 + 0.06) + 's' }}></span> : null}
            </React.Fragment>
          ))}
        </div>
      </div>
      <div className="mfl-row good">
        <span className="mfl-k">同一笔捐赠，在 iMeeting 里</span>
        <div className="mfl-chain">
          {MONEY_GOOD.map((s, i) => (
            <React.Fragment key={i}>
              <span className="mfl-node" style={{ transitionDelay: (0.2 + i * 0.14) + 's' }}>{s}</span>
              {i < MONEY_GOOD.length - 1 ? <span className="mfl-link" style={{ transitionDelay: (0.26 + i * 0.14) + 's' }}></span> : null}
            </React.Fragment>
          ))}
        </div>
      </div>
      <p className="mfl-cap">任何改变公库现状的动作，都是一个动议。</p>
    </div>
  );
}

/* ---------- 图：决议卡片（记录在案） ---------- */
function ResolutionCard() {
  const ref = useOnView(0.25);
  return (
    <div className="res-card" ref={ref}>
      <div className="res-head">
        <span className="res-no">决议 · 第 12 次例会</span>
        <span className="res-stamp">已通过</span>
      </div>
      <div className="res-body">接受某资助方捐赠，前提：优先补发欠薪。</div>
      <div className="res-grid">
        <div><span>赞成</span><b>7</b></div>
        <div><span>反对</span><b>3</b></div>
        <div><span>弃权</span><b>1</b></div>
        <div><span>法定人数</span><b>满足</b></div>
      </div>
      <div className="res-foot">
        <span className="res-link">契约链接 · imeeting.club/C05-xxx</span>
        <span className="res-next">未完事务 → 下次例会</span>
      </div>
    </div>
  );
}

/* ---------- 图标（细线，随字色） ---------- */
function VIcon(props) {
  const n = props.name;
  const P = {
    speak: <path d="M4 5h12v8H8l-4 3V5z" />,
    ask: <React.Fragment><circle cx="10" cy="10" r="7" /><path d="M8 8.2c0-1.2.9-2 2-2s2 .7 2 1.8c0 1.4-2 1.5-2 3" /><path d="M10 14h.01" /></React.Fragment>,
    motion: <React.Fragment><path d="M5 2.5h7l3 3V17a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1V3.5a1 1 0 0 1 1-1z" /><path d="M11.5 2.5V6H15" /><path d="M9.8 9.4v4M7.8 11.4h4" /></React.Fragment>,
    order: <React.Fragment><path d="M10 2.5l6 2.2v5c0 3.4-2.4 6.3-6 7.8-3.6-1.5-6-4.4-6-7.8v-5l6-2.2z" /><path d="M10 7v4" /><path d="M10 13.4h.01" /></React.Fragment>,
    vote: <React.Fragment><rect x="3" y="8.5" width="14" height="8.5" rx="1.6" /><path d="M6.5 8.5V6a3.5 3.5 0 0 1 7 0" /><path d="M7.4 12.6l1.8 1.8 3.4-3.4" /></React.Fragment>,
    room: <React.Fragment><rect x="2.5" y="3.5" width="15" height="9" rx="1.5" /><path d="M6.5 16.5h7" /><path d="M10 12.5v4" /></React.Fragment>,
    clock: <React.Fragment><circle cx="10" cy="10" r="7.2" /><path d="M10 6v4.3l2.7 1.7" /></React.Fragment>,
    coin: <React.Fragment><ellipse cx="10" cy="6" rx="6" ry="2.6" /><path d="M4 6v8c0 1.4 2.7 2.6 6 2.6s6-1.2 6-2.6V6" /><path d="M4 10c0 1.4 2.7 2.6 6 2.6s6-1.2 6-2.6" /></React.Fragment>,
    doc: <React.Fragment><path d="M5 2.5h7l3 3V17a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1V3.5a1 1 0 0 1 1-1z" /><path d="M11.5 2.5V6H15" /><path d="M6.6 9h6.8M6.6 12h6.8M6.6 15h4" /></React.Fragment>,
    rail: <React.Fragment><path d="M4 4h12M4 10h12M4 16h12" /><circle cx="7" cy="4" r="1.8" /><circle cx="12" cy="10" r="1.8" /><circle cx="8" cy="16" r="1.8" /></React.Fragment>,
    dial: <React.Fragment><circle cx="10" cy="10" r="7" /><path d="M10 10l3-3" /><path d="M10 3v1.5M17 10h-1.5M10 17v-1.5M3 10h1.5" /></React.Fragment>
  };
  return <svg className="v-ico" viewBox="0 0 20 20" aria-hidden="true">{P[n] || P.doc}</svg>;
}

/* ---------- 图：会场里常驻的四样东西 ---------- */
const ROOM_ZONES = [
  { k: 'A', n: 'room', t: '主持词', d: 'AI 主持人的引导与裁定，语音播报' },
  { k: 'B', n: 'motion', t: '动议栈', d: '正在审议的事，永远只有一件' },
  { k: 'C', n: 'speak', t: '发言队列', d: '谁在说、谁在等，位置不被插队' },
  { k: 'D', n: 'vote', t: '操作区', d: '申请发言、提问、提动议、投票' }
];
function RoomMap() {
  const ref = useOnView(0.25);
  const [i, setI] = useState(0);
  useEffect(() => {
    const t = setInterval(() => setI((v) => (v + 1) % 4), 2600);
    return () => clearInterval(t);
  }, []);
  return (
    <div className="rmp" ref={ref}>
      <div className="rmp-stage">
        <div className={'rmp-zone z-a' + (i === 0 ? ' on' : '')}>
          <b>主持词</b><span>辩论剩余 02:00，队列尚有 2 位</span>
        </div>
        <div className={'rmp-zone z-b' + (i === 1 ? ' on' : '')}>
          <b>动议栈</b><span>待决 · 修正案</span><span>队列 · 2 项</span>
        </div>
        <div className={'rmp-zone z-c' + (i === 2 ? ' on' : '')}>
          <b>发言队列</b><span>甲 · 发言中</span><span>乙 · 等待</span>
        </div>
        <div className={'rmp-zone z-d' + (i === 3 ? ' on' : '')}>
          <b>操作区</b><span>申请发言 / 提问 / 动议 / 投票</span>
        </div>
      </div>
      <p className="rmp-cap"><b>{ROOM_ZONES[i].k}</b>{ROOM_ZONES[i].t} — {ROOM_ZONES[i].d}</p>
    </div>
  );
}

/* ---------- 图：五个常用动作 ---------- */
const ACTIONS = [
  { n: 'speak', t: '申请发言', d: '进入队列，轮到你时获得发言权，有计时' },
  { n: 'ask', t: '提问', d: '针对当前动议向提案人请教细节' },
  { n: 'motion', t: '提出动议', d: '修改它、推迟它、搁置它、结束讨论它' },
  { n: 'order', t: '秩序问题', d: '认为程序被违反，随时可提，无需排队' },
  { n: 'vote', t: '投票', d: '赞成、反对或弃权，每一票都被记录' }
];
function ActionGrid() {
  const [i, setI] = useState(0);
  return (
    <div className="act">
      <div className="act-grid">
        {ACTIONS.map((a, k) => (
          <button className={'act-tile' + (i === k ? ' on' : '')} key={k} onClick={() => setI(k)} type="button">
            <VIcon name={a.n} />
            <span>{a.t}</span>
          </button>
        ))}
      </div>
      <p className="act-cap">{ACTIONS[i].d}</p>
    </div>
  );
}

/* ---------- 图：处境 → 出口 ---------- */
const SITUATIONS = [
  { s: '我反对这个方案', o: '发表反对观点', r: '反对理由归档；也可用修正案独立辩论' },
  { s: '我觉得现在不该讨论', o: '推迟动议', r: '表决后移到指定日期，议题不消失' },
  { s: '我觉得程序走错了', o: '秩序问题', r: '全场暂停，主席即时裁定；不服可申诉' },
  { s: '我觉得聊得够久了', o: '结束辩论', r: '多数同意即提前进入表决' },
  { s: '我需要休息一下', o: '休会动议', r: '「先不聊了」是正式权利，由大家表决' },
  { s: '我想回到之前的话题', o: '重议动议', r: '符合条件即可重新审议，不必另起炉灶' }
];
function SituationMap() {
  const [i, setI] = useState(0);
  useEffect(() => {
    const t = setInterval(() => setI((v) => (v + 1) % SITUATIONS.length), 2800);
    return () => clearInterval(t);
  }, []);
  return (
    <div className="sit">
      {SITUATIONS.map((it, k) => (
        <button className={'sit-row' + (i === k ? ' on' : '')} key={k} type="button" onClick={() => setI(k)}>
          <span className="sit-s">{it.s}</span>
          <span className="sit-line"></span>
          <span className="sit-o">{it.o}</span>
        </button>
      ))}
      <p className="sit-cap">{SITUATIONS[i].r}</p>
    </div>
  );
}

/* ---------- 图：会议类型（效力与账户） ---------- */
const MTYPES = [
  { t: '公开会议', by: '任何个人直接发起', power: 0, acct: '个人' },
  { t: '研讨会议', by: '负责人 / 管理员发起', power: 1, acct: '组织' },
  { t: '例行会议', by: '系统按组织规则自动创建', power: 1, acct: '组织' },
  { t: '临时会议', by: '管理员发起，或成员联署达标', power: 1, acct: '组织' },
  { t: '自发会议', by: '以组织名义、个人发起', power: 0, acct: '组织' }
];
function TypeCards() {
  const ref = useOnView(0.2);
  return (
    <div className="typ" ref={ref}>
      {MTYPES.map((m, i) => (
        <div className="typ-card" key={i} style={{ transitionDelay: (i * 0.08) + 's' }}>
          <div className="typ-top">
            <b>{m.t}</b>
            <span className={'typ-badge' + (m.power ? ' full' : '')}>{m.power ? '有组织效力' : '无组织效力'}</span>
          </div>
          <div className="typ-by">{m.by}</div>
          <div className="typ-foot"><span>账户</span><b>{m.acct}</b></div>
        </div>
      ))}
    </div>
  );
}

/* ---------- 图：议程轨道 ---------- */
const AGENDA_BLOCKS = [
  { t: '开会', items: ['点名与法定人数', '通过议程'] },
  { t: '宣读与批准会议记录', items: ['上次纪要', '未完事务'], hook: true },
  { t: '一般议程', items: ['讨论项', '报告项', '决策项'] },
  { t: '休会', items: ['下次会议排定'], hook: true }
];
function AgendaRail() {
  const ref = useOnView(0.25);
  return (
    <div className="agr" ref={ref}>
      {AGENDA_BLOCKS.map((b, i) => (
        <div className={'agr-block' + (b.hook ? ' hook' : '')} key={i}>
          <span className="agr-no">{'0' + (i + 1)}</span>
          <span className="agr-t">{b.t}</span>
          <div className="agr-items">
            {b.items.map((it, j) => <span className="agr-item" key={j}>{it}</span>)}
          </div>
        </div>
      ))}
      <p className="agr-cap">带点的两项，是把上一次会议接进这一次会议的接口。</p>
    </div>
  );
}

/* ---------- 图：机制参数 ---------- */
const PARAMS = [
  { n: 'dial', t: '发言时间限制', v: '1–5 分钟' },
  { n: 'clock', t: '辩论限制', v: '由组织设定' },
  { n: 'motion', t: '动议授权范围', v: '谁能提、提哪几类' },
  { n: 'vote', t: '表决记名模式', v: '记名 / 无记名' },
  { n: 'order', t: '法定人数', v: '人数 / 表决权数' },
  { n: 'order', t: '秩序问题点名门槛', v: '累计 N 次触发' },
  { n: 'rail', t: '联署发起门槛', v: 'N 人或 N%' },
  { n: 'room', t: '主持模式', v: 'AI 主持 / 真人主持' }
];
function ParamCards() {
  const ref = useOnView(0.2);
  return (
    <div className="par" ref={ref}>
      {PARAMS.map((p, i) => (
        <div className="par-card" key={i} style={{ transitionDelay: (i * 0.05) + 's' }}>
          <VIcon name={p.n} />
          <span className="par-t">{p.t}</span>
          <span className="par-v">{p.v}</span>
        </div>
      ))}
    </div>
  );
}

/* ---------- 图：萝卜丁的流动 ---------- */
function LedgerFlow() {
  const ref = useOnView(0.2);
  return (
    <div className="led" ref={ref}>
      <div className="led-chain">
        <span className="led-node per">个人萝卜丁</span>
        <span className="led-arrow"><i>自愿划拨 · 以动议提出</i></span>
        <span className="led-node mid">组织审议：接受 / 不接受</span>
        <span className="led-arrow"><i>写出使用前提</i></span>
        <span className="led-node org">组织公库</span>
      </div>
      <div className="led-split">
        <span>指定用途？</span><span>非定向？</span><span>有没有使用约定？</span>
      </div>
      <div className="led-meet">
        <VIcon name="coin" />
        <span>创建会议时冻结 · 会议结束后正式扣除</span>
      </div>
    </div>
  );
}

/* ---------- 图：会后留下的三样东西 ---------- */
const DELIVERABLES = [
  { n: 'doc', t: '会议纪要与发言记录', d: '决议、票数、发言全文，可导出 Word / Markdown' },
  { n: 'motion', t: '契约链接', d: '会议结果整理为约定，生成公开凭据' },
  { n: 'clock', t: '下一次会议的投影', d: '未完事务自动进入下次议程' }
];
function Deliverables() {
  const ref = useOnView(0.25);
  return (
    <div className="dlv" ref={ref}>
      {DELIVERABLES.map((d, i) => (
        <div className="dlv-card" key={i} style={{ transitionDelay: (i * 0.1) + 's' }}>
          <VIcon name={d.n} />
          <b>{d.t}</b>
          <span>{d.d}</span>
        </div>
      ))}
    </div>
  );
}

/* ---------- 章节头（分屏文本列 / 整屏标题） ---------- */
function Chapter(props) {
  return (
    <div className="sp-text">
      <Eyebrow>{props.k}</Eyebrow>
      <Reveal d={1}>
        {props.h1 ? <h1 className="ch-title">{props.title}</h1> : <h2>{props.title}</h2>}
      </Reveal>
      {props.lead ? (
        <Reveal d={2}><p className={props.h1 ? 'ch-lead' : 'sp-note'}>{props.lead}</p></Reveal>
      ) : null}
      {props.tags ? (
        <Reveal d={3}>
          <div className="sp-tags">{props.tags.map(function (t, i) { return <span key={i}>{t}</span>; })}</div>
        </Reveal>
      ) : null}
    </div>
  );
}

/* ---------- 滚动指示器 ---------- */
function ScrollIndicator() {
  return (
    <div className="scroll-ind" aria-hidden="true">
      <span>SCROLL</span>
      <div className="si-line"><div className="si-hl"></div></div>
    </div>
  );
}
