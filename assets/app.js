(function() {
  const ROUTES = {
    "/": { page: () => /* @__PURE__ */ React.createElement(HomePage, null), title: "iMeeting \xB7 \u7528\u89C4\u5219\uFF0C\u6539\u53D8\u5F00\u4F1A\u7684\u6587\u5316" },
    "/time": { page: () => /* @__PURE__ */ React.createElement(TimePage, null), title: "\u4E4B\u4E00 \xB7 \u65F6\u95F4 \u2014 \u4F1A\u8BAE\u4E3A\u4EC0\u4E48\u8D8A\u5F00\u8D8A\u957F \xB7 iMeeting" },
    "/order": { page: () => /* @__PURE__ */ React.createElement(OrderPage, null), title: "\u4E4B\u4E8C \xB7 \u79E9\u5E8F \u2014 \u8C01\u5148\u8BF4\u3001\u8C01\u8BF4\u4E86\u7B97 \xB7 iMeeting" },
    "/continuity": { page: () => /* @__PURE__ */ React.createElement(ContinuityPage, null), title: "\u4E4B\u4E09 \xB7 \u8FDE\u7EED \u2014 \u6563\u4F1A\u4E4B\u540E \xB7 iMeeting" },
    "/guide": { page: () => /* @__PURE__ */ React.createElement(GuidePage, null), title: "\u53C2\u4F1A\u5F15\u5BFC \xB7 iMeeting \u8BF4\u660E\u4E66" },
    "/organizer": { page: () => /* @__PURE__ */ React.createElement(OrganizerPage, null), title: "\u7EC4\u7EC7\u8005\u624B\u518C \xB7 iMeeting \u8BF4\u660E\u4E66" }
  };
  const QH = ["#a8c8d0", "#1f4e79", "#dff0f5"];
  const HB = ["#a9b8c6", "#4a6076", "#e6edf2"];
  const DQ = ["#8fb6c8", "#12395f", "#cfe6ef"];
  const YB = ["#dfeaef", "#6f93ab", "#f4f9fb"];
  const PALETTES = {
    "/": [QH, HB, QH, DQ, QH, HB, HB, YB],
    "/time": [QH, HB, DQ, QH, YB],
    "/order": [QH, DQ, HB, YB],
    "/continuity": [HB, QH, DQ, HB, YB],
    "/guide": [QH, HB, DQ, QH, YB],
    "/organizer": [HB, QH, HB, DQ, YB]
  };
  function getRoute() {
    const h = window.location.hash.replace(/^#/, "") || "/";
    return ROUTES[h] ? h : "/";
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
      window.addEventListener("hashchange", onHash);
      document.title = ROUTES[route].title;
      document.body.classList.add("snap");
      return () => window.removeEventListener("hashchange", onHash);
    }, []);
    return /* @__PURE__ */ React.createElement(React.Fragment, null, /* @__PURE__ */ React.createElement(
      GradientWavesBg,
      {
        horizonColor: "#7fb3c8",
        waveColor: "#3d6b82",
        crestColor: "#FFFFFF",
        speed: 0.4,
        amplitude: 2.5,
        waveScale: 0.6,
        waveRatio: 0.9,
        swell: 35,
        turbulence: 20,
        tilt: 1.11,
        zoom: 1,
        height: 5.5,
        fogDepth: 55,
        brightness: 1,
        opacity: 1,
        mouseInteraction: true,
        parallaxStrength: 0.5,
        grain: true,
        grainIntensity: 0.04
      }
    ), !loaded && route === "/" ? /* @__PURE__ */ React.createElement(LoadingScreen, { onComplete: () => setLoaded(true) }) : null, ROUTES[route].page(), /* @__PURE__ */ React.createElement(FullPager, { key: route, palettes: PALETTES[route] }));
  }
  ReactDOM.createRoot(document.getElementById("root")).render(/* @__PURE__ */ React.createElement(App, null));
})();
