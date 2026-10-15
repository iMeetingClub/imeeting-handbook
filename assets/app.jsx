/* ===== iMeeting 说明书站 · 路由入口 ===== */
(function () {
  const ROUTES = {
    '/': { page: () => <HomePage />, title: 'iMeeting · 用规则，改变开会的文化' },
    '/time': { page: () => <TimePage />, title: '之一 · 时间 — 会议为什么越开越长 · iMeeting' },
    '/order': { page: () => <OrderPage />, title: '之二 · 秩序 — 谁先说、谁说了算 · iMeeting' },
    '/continuity': { page: () => <ContinuityPage />, title: '之三 · 连续 — 散会之后 · iMeeting' },
    '/guide': { page: () => <GuidePage />, title: '参会引导 · iMeeting 说明书' },
    '/organizer': { page: () => <OrganizerPage />, title: '组织者手册 · iMeeting 说明书' }
  };

  /* 每一页、每一屏的背景配色：[地平线, 浪, 浪尖]
     青花系 / 灰蓝系交替，让翻屏时背景跟着换气 */
  const QH = ['#a8c8d0', '#1f4e79', '#dff0f5'];   /* 青花系 · 偏蓝 */
  const HB = ['#a9b8c6', '#4a6076', '#e6edf2'];   /* 灰蓝系 · 偏灰 */
  const DQ = ['#8fb6c8', '#12395f', '#cfe6ef'];   /* 深青花 · 更沉 */
  const YB = ['#dfeaef', '#6f93ab', '#f4f9fb'];   /* 月白 · 最浅 */
  const PALETTES = {
    '/': [QH, HB, QH, DQ, QH, HB, HB, YB],
    '/time': [QH, HB, DQ, QH, YB],
    '/order': [QH, DQ, HB, YB],
    '/continuity': [HB, QH, DQ, HB, YB],
    '/guide': [QH, HB, DQ, QH, YB],
    '/organizer': [HB, QH, HB, DQ, YB]
  };

  function getRoute() {
    const h = window.location.hash.replace(/^#/, '') || '/';
    return ROUTES[h] ? h : '/';
  }

  function App() {
    const [route, setRoute] = useState(getRoute());
    const [loaded, setLoaded] = useState(false);
    useEffect(() => {
      const onHash = () => {
        const r = getRoute();
        setRoute(r);
        document.title = ROUTES[r].title;
        window.scrollTo(0, 0);
      };
      window.addEventListener('hashchange', onHash);
      document.title = ROUTES[route].title;
      document.body.classList.add('snap');
      return () => window.removeEventListener('hashchange', onHash);
    }, []);
    return (
      <React.Fragment>
        <GradientWavesBg
          horizonColor="#7fb3c8"
          waveColor="#3d6b82"
          crestColor="#FFFFFF"
          speed={0.4}
          amplitude={2.5}
          waveScale={0.6}
          waveRatio={0.9}
          swell={35}
          turbulence={20}
          tilt={1.11}
          zoom={1.0}
          height={5.5}
          fogDepth={55}
          brightness={1.0}
          opacity={1.0}
          mouseInteraction
          parallaxStrength={0.5}
          grain
          grainIntensity={0.04}
        />
        {!loaded && route === '/' ? <LoadingScreen onComplete={() => setLoaded(true)} /> : null}
        {ROUTES[route].page()}
        <FullPager key={route} palettes={PALETTES[route]} />
      </React.Fragment>
    );
  }

  ReactDOM.createRoot(document.getElementById('root')).render(<App />);
})();
