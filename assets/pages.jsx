/* ===== iMeeting 说明书站 · 页面（上） ===== */

/* ================= 首页 ================= */
function HomePage() {
  return (
    <div className="page">
      <Topbar active="home" />

      {/* S1 · 首屏：大字标题 */}
      <section className="screen hero-screen">
        <Eyebrow>PARLIAMENTARY PROCEDURE · WEB MEETING</Eyebrow>
        <MaskedTitle text="iMeeting" textScale={0.17} />
        <Reveal d={1}><h2 className="hero-sub">用规则，改变开会的<em>文化</em>。</h2></Reveal>
        <Reveal d={2}><p className="lead">一款<RoleCycle />的会议产品：议程不跑题，发言有秩序，表决有记录，决定能执行。</p></Reveal>
        <Reveal d={3} className="cta-row">
          <GlassButton primary width={210} href="https://imeeting.co/" target="_blank">进入 iMeeting ↗</GlassButton>
          <GlassButton width={190} href="#compare" onClick={(e) => { e.preventDefault(); window.__pagerNext ? window.__pagerNext() : null; }}>它怎么做到 ↓</GlassButton>
        </Reveal>
        <ScrollIndicator />
      </section>

      {/* S2 · 对比 */}
      <section className="screen" id="compare">
        <Eyebrow>§01 · 对比 THE CONTRAST</Eyebrow>
        <Reveal d={1}><h2>同样一小时，两种去向</h2></Reveal>
        <Bars rows={[
          { label: '没有结构的会议', meta: '60 MIN', segs: [
            { cls: 's-push', w: 32, text: '推进 32' },
            { cls: 's-waste', w: 27, text: '重复 27' },
            { cls: 's-waste', w: 21, text: '跑题 21' },
            { cls: 's-waste', w: 20, text: '空转 20' }
          ]},
          { label: '用 iMeeting 的会议', meta: '60 MIN', segs: [
            { cls: 's-push', w: 78, text: '推进议题 78' },
            { cls: 's-proc', w: 16, text: '程序开销 16' },
            { cls: 's-waste', w: 6, text: '空转 6' }
          ]}
        ]} />
        <ChaosOrderDiagram />
      </section>

      {/* S3 · 效果 */}
      <section className="screen split flip" id="effects">
        <div className="sp-text">
          <Eyebrow>§02 · 效果 WHAT YOU GET</Eyebrow>
          <Reveal d={1}><h2>每场会，<br/>都有这四样东西</h2></Reveal>
          <Reveal d={2}><p className="lead" style={{ fontSize: '15px' }}>它们绕着同一件事旋转：<br/>让会议按程序往前走。</p></Reveal>
        </div>
        <div className="sp-visual"><PorcelainOrbit /></div>
      </section>

      {/* S4 · 文件夹互动 */}
      <section className="screen folder-screen">
        <div className="fb-side">
          <Eyebrow>TRY IT · 试一试</Eyebrow>
          <Reveal d={1}><h2>一个想法，<br/>四条出路。</h2></Reveal>
          <Reveal d={2}><p className="lead" style={{ fontSize: '15px' }}>滚动到这里，文件夹自己打开。<br/>每个想法都有正式通道，不需要抢话。</p></Reveal>
        </div>
        <div className="fb-stage">
          {window.FolderFloat ? (
            <window.FolderFloat
              items={['改成它 · 修正案', '顺序不对 · 秩序问题', '以后再说 · 推迟动议', '我要发言 · 申请发言']}
              label="我的主张"
              sublabel="4 条出路"
              trigger="view"
              closeOnSelect
              physics
              drift={0.5}
              folderColor="#1a7773"
              frontColor="#37afa9"
              paperColor="#fbfaf7"
              itemColor="#ffffff"
              itemTextColor="#17211f"
              labelColor="#fbfaf7"
              width={420}
              height={311}
              radius={24}
              spread={340}
              lift={48}
              tilt={10}
              flapAngle={38}
              restAngle={16}
              openDuration={560}
              stagger={50}
              bounce={0.3}
            />
          ) : null}
        </div>
      </section>

      {/* S5 · 脉络 */}
      <section className="screen" id="lifecycle">
        <Eyebrow>§03 · 脉络 THE LIFECYCLE</Eyebrow>
        <Reveal d={1}>
          {window.DepthText ? (
            <window.DepthText
              text="一场会的完整生命"
              layers={18}
              depth={1.5}
              faceColor="#2f5d8a"
              depthColor="#bcd8e2"
              tilt={6}
              pointerTracking
              smoothing={0.14}
              perspective={900}
              autoOrbit
              orbitSpeed={0.3}
              fontSize="clamp(2rem, 4.6vw, 3.4rem)"
              fontWeight={620}
              shadow
            />
          ) : <h2>一场会的完整生命</h2>}
        </Reveal>
        <Reveal d={2}><AutoSteps /></Reveal>
        <Reveal d={2}><p className="life-lead">会前通知与议程 · 会中动议六部曲 · 会后决议带着凭据，回到下一次会议。</p></Reveal>
      </section>

      {/* S6 · 会后 */}
      <section className="screen split" id="after">
        <div className="sp-text">
          <Eyebrow>§04 · 生效 THE MOMENT IT COUNTS</Eyebrow>
          <Reveal d={1}><h2>表决通过的那一刻，<br/>决定就<em>生效</em>了</h2></Reveal>
          <Reveal d={2}><p className="lead" style={{ fontSize: '15px' }}>每一个结果都记录在案：票数、依据、承诺，会后可查。</p></Reveal>
          <Reveal d={2} style={{ marginTop: '28px', borderTop: '2px solid var(--ink)', paddingTop: '18px', maxWidth: '420px' }}>
            <div style={{ fontFamily: 'var(--mono)', fontSize: '12px', color: 'var(--teal-dark)', letterSpacing: '.14em', marginBottom: '8px' }}>MEETINGS BECOME MEMORY</div>
            <div style={{ fontFamily: 'var(--serif)', fontSize: 'clamp(17px,2vw,21px)', lineHeight: 1.4 }}>每一次会议，都成为组织的记忆。</div>
          </Reveal>
        </div>
        <div className="sp-visual">
          <Reveal d={2} className="fx-grid three upright">
            <div className="fx"><span className="no">01</span><span className="t">决议记录在案</span><span className="d">票数与依据，会后可查</span></div>
            <div className="fx"><span className="no">02</span><span className="t">决议连接承诺</span><span className="d">可整理为合同，生成公开链接</span></div>
            <div className="fx"><span className="no">03</span><span className="t">下次接着上次</span><span className="d">未完事务自动进入下次议程</span></div>
          </Reveal>
        </div>
      </section>

      {/* S7 · 开始 */}
      <section className="screen" id="start">
        <Eyebrow>§05 · 开始 GET STARTED</Eyebrow>
        <Reveal d={1}><h2>从任何一个位置开始</h2></Reveal>
        <Paths items={[
          { href: '#/guide', k: '参会者', t: '我被邀请开一场会', d: '五分钟看懂：你会看到什么、为什么轮流发言、你可以按什么。', go: '进入参会引导 →' },
          { href: '#/organizer', k: '组织者', t: '我要组织一场会', d: '会议类型怎么选、议程怎么排、机制参数怎么设。', go: '进入组织者手册 →' },
          { href: '#/time', k: '想深究的人', t: '为什么这样设计', d: '三个问题，层层深入：时间去哪了、谁说了算、散会之后。', go: '进入之一·时间 →' }
        ]} />
      </section>

      {/* S8 · 尾声 */}
      <section className="screen finale-screen">
        <Turn
          eyebrow="EPILOGUE · 尾声"
          title={<span>iMeeting 给组织的，<br/>是一套<em>让规则长出规则</em>的土壤。</span>}
          lead="从一场会开始，到一个组织自己的议事传统。"
        />
        <Footer>
          原型 V3.0 · 2026-10-15 · 数据与场景均为机制推演示意<br/>
          视觉语义色继承 iMeeting VI：青 = 规则与思辨 · 橘 = 关键行动 · 草色 = 平等与成长
        </Footer>
      </section>
    </div>
  );
}

/* ================= 之一 · 时间 ================= */
function TimePage() {
  return (
    <div className="page">
      <Topbar active="time" />

      {/* S1 · 开篇 */}
      <section className="screen split chapter">
        <Chapter
          k="之一 · 时间 — WHERE THE TIME GOES"
          h1
          title={<React.Fragment>会议越开越长，<br/>时间从三个缺口<em>漏走</em>。</React.Fragment>}
          lead="一小时里真正推进议题的只有一小段。其余的被重复、跑题和等待吃掉——这三件事，都可以被程序接住。"
        />
        <div className="sp-visual"><TimeLeak /></div>
      </section>

      {/* S2 · 一个缺口，一个机制 */}
      <section className="screen split flip chapter">
        <div className="sp-visual"><MotionStackViz /></div>
        <Chapter
          k="§01 · 一个缺口 THE FIRST LEAK"
          title={<React.Fragment>聊完的又绕回来，<br/>新的又插进来</React.Fragment>}
          lead="正在审议的事情永远只有一件：新话题作为动议进入队列，等待自己的顺序。"
          tags={['一次只有一个待决动议', '新话题不消失、不插队']}
        />
      </section>

      {/* S3 · 22 分钟回放 */}
      <section className="screen">
        <Eyebrow>§02 · 回放 THE REPLAY</Eyebrow>
        <Reveal d={1}><h2>22 分钟里，机制在哪些时刻介入</h2></Reveal>
        <Reveal d={2}><SpeechTrack /></Reveal>
      </section>

      {/* S4 · 机制手册 */}
      <section className="screen">
        <Eyebrow>§03 · 机制手册 THE MECHANISMS</Eyebrow>
        <Reveal d={1}><h2>四个机制，点开查看</h2></Reveal>
        <MechGrid items={[
          { no: '§1.1 · MOTION STACK', title: '动议栈：一次只有一个待决动议', what: '话题不插队、不绕回。新想法进入队列，等待自己的位置。', when: '有人提出新话题，或想回到已结束的议题（重议也是正式动议）。', adj: '动议授权范围：谁能提动议、能提哪几类，由组织规则决定。' },
          { no: '§1.2 · SPEECH TIMER', title: '发言计时：时间被同等尊重', what: '个别人占用过多时长，其他人被挤出讨论。', when: '每次发言自动计时，临近结束先提醒，超时交还队列。', adj: '单人时长由组织设定（如 1–5 分钟）；主持人可依规临时延长。' },
          { no: '§1.3 · DEBATE LIMITS', title: '辩论限制：时长是集体决定的对象', what: '议题反复、悬而不决，会议被单一议题吞掉。', when: '辩论到达预设上限；或多数成员认为该表决了——「结束辩论」本身就是可表决的动议。', adj: '辩论总时长、「结束辩论」所需票数比例，均由组织设定。' },
          { no: '§1.4 · RECORD & SUMMARY', title: '发言记录：说过的话留得下来', what: '重复陈述。所有发言归档可查，智能秘书实时总结。', when: '全程自动，无需任何人做笔记。', adj: '发言总结模式可选；记录可一键导出为纪要与发言记录。' }
        ]} />
      </section>

      {/* S5 · 幕间 */}
      <section className="screen finale-screen">
        <Turn
          eyebrow="幕间 · INTERLUDE"
          title={<span>效率不是让每个人说得更快，<br/>是让<em>没有一句话白说</em>。</span>}
          lead="时间被尊重，只是第一层。下一层更难：谁的声音，算数？"
          next={{ href: '#/order', title: '之二 · 秩序', label: '谁先说、谁说了算 →' }}
        />
        <Footer>之一 · 时间 · 原型 V4.0 · 会议切片为改写示意素材，尚未引用真实会议档案</Footer>
      </section>
    </div>
  );
}

/* ================= 之二 · 秩序 ================= */
function OrderPage() {
  return (
    <div className="page">
      <Topbar active="order" />

      {/* S1 · 开篇 */}
      <section className="screen">
        <Eyebrow>之二 · 秩序 — WHO SPEAKS, WHO DECIDES</Eyebrow>
        <Reveal d={1}><h1 className="ch-title">谁先说、谁说了算，交给<em>程序</em>，不交给音量。</h1></Reveal>
        <Reveal d={2}><p className="ch-lead">职位、关系和嗓门都不在计算之内。四个声音同时出现时，每个都有一条自己的通道。</p></Reveal>
        <Reveal d={3}><VoiceRoutingDiagram /></Reveal>
      </section>

      {/* S2 · 表决三环节 */}
      <section className="screen">
        <Eyebrow>§01 · 表决 THE VOTE</Eyebrow>
        <Reveal d={1}><h2>表决不是「看着差不多就过了」</h2></Reveal>
        <Reveal d={2}><VoteStage /></Reveal>
      </section>

      {/* S3 · 机制手册 */}
      <section className="screen">
        <Eyebrow>§02 · 机制手册 THE MECHANISMS</Eyebrow>
        <Reveal d={1}><h2>四种委屈，四个机制</h2></Reveal>
        <MechGrid items={[
          { no: '§2.1 · SPEECH QUEUE', title: '发言队列：机会按顺序分配', what: '谁声音大谁先说、新人没有开口空间。', when: '任何成员随时可申请发言，进入队列，由主持逐一许可。发言中受保护，唯一合法的打断是秩序问题。', adj: '发言时长、队列规则、是否开放自由发言段，由组织规则设定。' },
          { no: '§2.2 · SECOND & AMEND', title: '附议与修正案：反对有正式出口', what: '强行拍板：动议必须有人附议才能进入讨论；对内容有异议，用修正案独立表决。', when: '任何动议提出后；任何成员对动议内容有修改主张时。', adj: '动议授权范围：谁能提动议、能提哪几类，由组织决定。' },
          { no: '§2.3 · POINT & APPEAL', title: '秩序问题与申诉：程序可以被挑战', what: '程序异议被当成刁难。秩序问题随时可提，全场暂停，主席必须即时裁定。', when: '任何阶段，无需排队。不服主席裁定可申诉，触发全体投票。', adj: '秩序问题累计成立 N 次自动启动点名与处罚，门槛由组织设定。' },
          { no: '§2.4 · QUORUM & ROLL CALL', title: '法定人数与记名表决', what: '没人认同的方案照样通过。出席实时追踪，人数不足则表决无效。', when: '每次正式表决前自动核算；记名模式下每票留痕。', adj: '法定人数门槛（人数 / 表决权数双重校验）、记名与无记名模式，由组织设定。' }
        ]} />
      </section>

      {/* S4 · 幕间 */}
      <section className="screen finale-screen">
        <Turn
          eyebrow="幕间 · INTERLUDE"
          title={<span>规则保护程序内的你：<br/>说得出来，也<em>输得明白</em>。</span>}
          lead="可是会开完了，决定做出了——然后呢？第三层问题才刚刚开始。"
          next={{ href: '#/continuity', title: '之三 · 连续', label: '散会之后，决定去了哪里 →' }}
        />
        <Footer>之二 · 秩序 · 原型 V4.0 · 会议切片为改写示意素材，尚未引用真实会议档案</Footer>
      </section>
    </div>
  );
}
