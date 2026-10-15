/* ===== GradientWaves · 原生移植（源自 React Bits） =====
   window.GradientWavesInit(container, opts) → true/false */
window.GradientWavesInit = function (container, opts) {
  opts = opts || {};
  function hexToRgb(hex) {
    const m = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    if (!m) return [1, 1, 1];
    return [parseInt(m[1], 16) / 255, parseInt(m[2], 16) / 255, parseInt(m[3], 16) / 255];
  }
  const o = {
    horizonColor: hexToRgb(opts.horizonColor || '#5227FF'),
    waveColor: hexToRgb(opts.waveColor || '#FF9FFC'),
    crestColor: hexToRgb(opts.crestColor || '#FFFFFF'),
    speed: opts.speed != null ? opts.speed : 0.4,
    amplitude: opts.amplitude != null ? opts.amplitude : 2.5,
    waveScale: opts.waveScale != null ? opts.waveScale : 0.6,
    waveRatio: opts.waveRatio != null ? opts.waveRatio : 0.9,
    swell: opts.swell != null ? opts.swell : 35,
    turbulence: opts.turbulence != null ? opts.turbulence : 20,
    tilt: opts.tilt != null ? opts.tilt : 1.11,
    zoom: opts.zoom != null ? opts.zoom : 1.0,
    height: opts.height != null ? opts.height : 5.5,
    fogDepth: opts.fogDepth != null ? opts.fogDepth : 15,
    steps: opts.detail === 'low' ? 40.0 : opts.detail === 'high' ? 110.0 : 70.0,
    brightness: opts.brightness != null ? opts.brightness : 1.0,
    opacity: opts.opacity != null ? opts.opacity : 1.0,
    mouseInteraction: opts.mouseInteraction !== false,
    parallaxStrength: opts.parallaxStrength != null ? opts.parallaxStrength : 0.5,
    grain: opts.grain !== false,
    grainIntensity: opts.grainIntensity != null ? opts.grainIntensity : 0.05
  };
  const VERT = "#version 300 es\nin vec2 position;\nvoid main() {\n  gl_Position = vec4(position, 0.0, 1.0);\n}\n";
  const FRAG = "#version 300 es\nprecision highp float;\nuniform vec2 iResolution;\nuniform float iTime;\nuniform float uSpeed;\nuniform float uAmplitude;\nuniform float uWaveScale;\nuniform float uWaveRatio;\nuniform float uSwell;\nuniform float uTurbulence;\nuniform float uTilt;\nuniform float uZoom;\nuniform float uHeight;\nuniform float uFogDepth;\nuniform float uSteps;\nuniform float uBrightness;\nuniform float uOpacity;\nuniform float uGrain;\nuniform float uGrainIntensity;\nuniform vec2 uMouse;\nuniform float uParallax;\nuniform bool uEnableMouse;\nuniform vec3 uHorizonColor;\nuniform vec3 uWaveColor;\nuniform vec3 uCrestColor;\nout vec4 fragColor;\n\nconst float MAX_DIST = 20000.0;\n\nfloat hash21(vec2 p) {\n  vec3 p3 = fract(vec3(p.xyx) * 0.1031);\n  p3 += dot(p3, p3.yzx + 33.33);\n  return fract((p3.x + p3.y) * p3.z);\n}\n\nfloat plasma(vec3 r, vec2 freq, vec4 tc) {\n  float mx = r.x + tc.x;\n  mx += uSwell * sin((r.y + mx) / 20.0 + tc.y);\n  float my = r.y - tc.z;\n  my += uTurbulence * cos(r.x / 23.0 + tc.w);\n  return r.z - (sin(mx * freq.x) * uAmplitude + sin(my * freq.y) * uAmplitude + uHeight);\n}\n\nfloat raymarch(vec3 pos, vec3 dir, vec2 freq, vec4 tc) {\n  float dist = 0.0;\n  for (int i = 0; i < 128; i++) {\n    if (float(i) >= uSteps) break;\n    float dscene = plasma(pos + dist * dir, freq, tc);\n    if (abs(dscene) < 0.1) break;\n    dist += 0.9 * dscene;\n    if (!(abs(dist) < MAX_DIST)) return MAX_DIST;\n  }\n  return dist;\n}\n\nvoid main() {\n  float T = iTime * uSpeed;\n  vec2 freq = vec2(uWaveScale / 7.0, (uWaveScale * uWaveRatio) / 3.0);\n  vec4 tc = vec4(T / 0.130, T / 0.810, T / 0.200, T / 0.710);\n  float c, s;\n  float vfov = (3.14159 / 2.3) / max(uZoom, 0.05);\n  vec3 cam = vec3(0.0, 0.0, 30.0);\n  vec2 uv = (gl_FragCoord.xy / iResolution.xy) - 0.5;\n  uv.x *= iResolution.x / iResolution.y;\n  uv.y *= -1.0;\n\n  vec3 dir = vec3(0.0, 0.0, -1.0);\n  float ulen = length(uv);\n  float xrot = vfov * ulen;\n  c = cos(xrot); s = sin(xrot);\n  dir = mat3(1.0, 0.0, 0.0, 0.0, c, -s, 0.0, s, c) * dir;\n  vec2 nuv = ulen > 1e-5 ? uv / ulen : vec2(1.0, 0.0);\n  c = nuv.x; s = nuv.y;\n  dir = mat3(c, -s, 0.0, s, c, 0.0, 0.0, 0.0, 1.0) * dir;\n  c = cos(uTilt); s = sin(uTilt);\n  dir = mat3(c, 0.0, s, 0.0, 1.0, 0.0, -s, 0.0, c) * dir;\n\n  if (uEnableMouse) {\n    float yaw = (uMouse.x - 0.5) * uParallax * 0.4;\n    float pitch = (uMouse.y - 0.5) * uParallax * 0.4;\n    c = cos(yaw); s = sin(yaw);\n    dir = mat3(c, 0.0, s, 0.0, 1.0, 0.0, -s, 0.0, c) * dir;\n    c = cos(pitch); s = sin(pitch);\n    dir = mat3(1.0, 0.0, 0.0, 0.0, c, -s, 0.0, s, c) * dir;\n  }\n\n  float dist = raymarch(cam, dir, freq, tc);\n  vec3 pos = cam + dist * dir;\n\n  float t = clamp(uFogDepth / max(dist, 0.001), 0.0, 1.0);\n  vec3 body = mix(uWaveColor, uCrestColor, clamp(pos.z * 0.08 + 0.5, 0.0, 1.0));\n  vec3 col = mix(uHorizonColor, body, t);\n  col *= uBrightness;\n  col = clamp(col, 0.0, 1.0);\n\n  float alpha = clamp(t, 0.0, 1.0) * uOpacity;\n  if (uGrain > 0.5) {\n    float g = hash21(gl_FragCoord.xy + mod(iTime, 64.0) * 11.0);\n    alpha += (g - 0.5) * uGrainIntensity;\n  }\n  alpha = clamp(alpha, 0.0, 1.0);\n  fragColor = vec4(col * alpha, alpha);\n}\n";
  const canvas = document.createElement('canvas');
  canvas.style.cssText = 'position:absolute;inset:0;width:100%;height:100%;display:block;';
  if (getComputedStyle(container).position === 'static') container.style.position = 'relative';
  container.appendChild(canvas);
  const gl = canvas.getContext('webgl2', { alpha: true, premultipliedAlpha: true, antialias: false });
  if (!gl) { container.removeChild(canvas); return false; }
  gl.clearColor(0, 0, 0, 0);
  function compile(type, source) {
    const sh = gl.createShader(type);
    gl.shaderSource(sh, source);
    gl.compileShader(sh);
    if (gl.getShaderParameter(sh, gl.COMPILE_STATUS)) return sh;
    console.error('GradientWaves shader:', gl.getShaderInfoLog(sh));
    gl.deleteShader(sh);
    return null;
  }
  const vs = compile(gl.VERTEX_SHADER, VERT);
  const fs2 = compile(gl.FRAGMENT_SHADER, FRAG);
  const program = gl.createProgram();
  if (!vs || !fs2 || !program) { container.removeChild(canvas); return false; }
  gl.attachShader(program, vs);
  gl.attachShader(program, fs2);
  gl.bindAttribLocation(program, 0, 'position');
  gl.linkProgram(program);
  gl.deleteShader(vs); gl.deleteShader(fs2);
  if (!gl.getProgramParameter(program, gl.LINK_STATUS)) { container.removeChild(canvas); return false; }
  const buf = gl.createBuffer();
  gl.bindBuffer(gl.ARRAY_BUFFER, buf);
  gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1, -1, 3, -1, -1, 3]), gl.STATIC_DRAW);
  gl.enableVertexAttribArray(0);
  gl.vertexAttribPointer(0, 2, gl.FLOAT, false, 0, 0);
  const U = {};
  ['iTime','iResolution','uSpeed','uAmplitude','uWaveScale','uWaveRatio','uSwell','uTurbulence','uTilt','uZoom','uHeight','uFogDepth','uSteps','uBrightness','uOpacity','uGrain','uGrainIntensity','uMouse','uParallax','uEnableMouse','uHorizonColor','uWaveColor','uCrestColor'].forEach(n => { U[n] = gl.getUniformLocation(program, n); });
  gl.useProgram(program);
  gl.uniform1f(U.uSpeed, o.speed);
  gl.uniform1f(U.uAmplitude, o.amplitude);
  gl.uniform1f(U.uWaveScale, o.waveScale);
  gl.uniform1f(U.uWaveRatio, o.waveRatio);
  gl.uniform1f(U.uSwell, o.swell);
  gl.uniform1f(U.uTurbulence, o.turbulence);
  gl.uniform1f(U.uTilt, o.tilt);
  gl.uniform1f(U.uZoom, o.zoom);
  gl.uniform1f(U.uHeight, o.height);
  gl.uniform1f(U.uFogDepth, o.fogDepth);
  gl.uniform1f(U.uSteps, o.steps);
  gl.uniform1f(U.uBrightness, o.brightness);
  gl.uniform1f(U.uOpacity, o.opacity);
  gl.uniform1f(U.uGrain, o.grain ? 1 : 0);
  gl.uniform1f(U.uGrainIntensity, o.grainIntensity);
  gl.uniform1f(U.uParallax, o.parallaxStrength);
  gl.uniform1i(U.uEnableMouse, o.mouseInteraction ? 1 : 0);
  gl.uniform3fv(U.uHorizonColor, o.horizonColor);
  gl.uniform3fv(U.uWaveColor, o.waveColor);
  gl.uniform3fv(U.uCrestColor, o.crestColor);
  const mouse = [0.5, 0.5], target = [0.5, 0.5];
  let raf = 0, visible = true;
  const t0 = performance.now();
  function resize() {
    const rect = container.getBoundingClientRect();
    const ratio = Math.min(window.devicePixelRatio || 1, 2);
    canvas.width = Math.max(1, Math.floor(rect.width * ratio));
    canvas.height = Math.max(1, Math.floor(rect.height * ratio));
    gl.viewport(0, 0, canvas.width, canvas.height);
    gl.uniform2f(U.iResolution, canvas.width, canvas.height);
  }
  var frame = function (t) {
    raf = requestAnimationFrame(frame);
    if (!visible || document.hidden) return;
    gl.uniform1f(U.iTime, (t - t0) * 0.001);
    const tx = o.mouseInteraction ? target[0] : 0.5;
    const ty = o.mouseInteraction ? target[1] : 0.5;
    mouse[0] += 0.05 * (tx - mouse[0]);
    mouse[1] += 0.05 * (ty - mouse[1]);
    gl.uniform2f(U.uMouse, mouse[0], mouse[1]);
    gl.drawArrays(gl.TRIANGLES, 0, 3);
  }
  if (o.mouseInteraction) {
    window.addEventListener('pointermove', (e) => {
      const r = canvas.getBoundingClientRect();
      if (r.width < 2 || r.height < 2) return;
      target[0] = (e.clientX - r.left) / r.width;
      target[1] = 1.0 - (e.clientY - r.top) / r.height;
    }, { passive: true });
    document.documentElement.addEventListener('pointerleave', () => { target[0] = 0.5; target[1] = 0.5; });
  }
  new ResizeObserver(resize).observe(container);
  new IntersectionObserver((es) => { visible = es.some(e => e.isIntersecting); }).observe(container);
  // 调色：lerp 过渡到目标色
  const cur = { h: o.horizonColor.slice(), w: o.waveColor.slice(), c: o.crestColor.slice() };
  const tgt = { h: cur.h.slice(), w: cur.w.slice(), c: cur.c.slice() };
  function tickColors() {
    let moved = false;
    for (const k of ['h', 'w', 'c']) {
      for (let i = 0; i < 3; i++) {
        const d = tgt[k][i] - cur[k][i];
        if (Math.abs(d) > 0.001) { cur[k][i] += d * 0.06; moved = true; }
      }
    }
    gl.uniform3fv(U.uHorizonColor, cur.h);
    gl.uniform3fv(U.uWaveColor, cur.w);
    gl.uniform3fv(U.uCrestColor, cur.c);
    return moved;
  }
  const __origFrame = frame;
  frame = function (t) { tickColors(); __origFrame(t); };
  resize();
  raf = requestAnimationFrame(frame);
  return {
    setColors: function (horizon, wave, crest) {
      function h2r(hex) {
        const m = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
        return m ? [parseInt(m[1], 16) / 255, parseInt(m[2], 16) / 255, parseInt(m[3], 16) / 255] : null;
      }
      const H = h2r(horizon), W = h2r(wave), C = h2r(crest);
      if (H) tgt.h = H;
      if (W) tgt.w = W;
      if (C) tgt.c = C;
    }
  };
};
