/* ===== iMeeting 说明书站 · 页面（下）：之三·连续 / 参会引导 / 组织者手册 ===== */

/* ================= 之三 · 连续 ================= */
function ContinuityPage() {
  return (
    <div className="page">
      <Topbar active="continuity" />

      {/* S1 · 开篇 */}
      <section className="screen split chapter">
        <Chapter
          k="之三 · 连续 — AFTER THE MEETING"
          h1
          title={<React.Fragment>散会之后，<br/><em>决定</em>去了哪里？</React.Fragment>}
          lead="开会最怕的不是吵，是散会之后一切归零。决议要有凭据，没议完的事要自己走回下一次议程。"
        />
        <div className="sp-visual"><ResolutionCard /></div>
      </section>

      {/* S2 · 一个真实案例 */}
      <section className="screen split flip chapter">
        <div className="sp-visual"><MoneyFlow /></div>
        <Chapter
          k="§01 · 一个真实案例 A REAL CASE"
          title={<React.Fragment>一笔捐赠，<br/>差点拆了一个基金会</React.Fragment>}
          lead="钱到账了，用途没被讨论过。一线与后台各有一肚子理由，却没有一个地方让主张被正式表达。矛盾的根源不在钱，在入库与出库都未经共同决策。"
        />
      </section>

      {/* S3 · 脉络 */}
      <section className="screen">
        <Eyebrow>§02 · 脉络 THE TIMELINE</Eyebrow>
        <Reveal d={1}><h2>会议与会议，是这样接上的</h2></Reveal>
        <Reveal d={2}><MeetingTimelineDiagram /></Reveal>
      </section>

      {/* S4 · 机制手册 */}
      <section className="screen">
        <Eyebrow>§03 · 机制手册 THE MECHANISMS</Eyebrow>
        <Reveal d={1}><h2>三个断点，四个机制</h2></Reveal>
        <MechGrid items={[
          { no: '§3.1 · RESOLUTION & CONTRACT', title: '决议与契约：决定有凭据', what: '决议躺在聊天记录里，没人认账。', when: '每次表决通过即记录；会议结果可整理为约定，生成公开链接。', adj: '契约的公开范围与命名规则，由组织管理。' },
          { no: '§3.2 · MINUTES & UNFINISHED', title: '宣读记录与未完事务：会与会相连', what: '两次会议互不相干，上次待办无人跟进。', when: '标准议程自带「宣读与批准会议记录」「未完事务与一般议程」，自动接续。', adj: '议程模板可选：无层级 / 标准层级 / 简化层级 / 临时会议议程。' },
          { no: '§3.3 · RECURRING & PROJECTION', title: '例行会议与后续投影：主线在线', what: '开完一次就断，下次开会靠人记。', when: '例会由系统按组织规则自动创建；「指定后续会议时间」动议通过，日历随之排定。', adj: '例会周期、议程架构、通知提前天数，由组织规则设定。' },
          { no: '§3.4 · ARCHIVE', title: '组织档案库：记忆可查阅', what: '决策历史散落各处，新成员无从了解来龙去脉。', when: '每场会的纪要与发言记录自动归档，支持导出。', adj: '档案可见范围：公开 / 闭门不保密 / 闭门保密，按会议设定。' }
        ]} />
      </section>

      {/* S5 · 终章 */}
      <section className="screen finale-screen">
        <Turn
          eyebrow="终章 · FINALE"
          title={<span>开好一场会，是起点。<br/>让一个组织<em>记得自己的决定</em>，是 iMeeting 想去的地方。</span>}
          lead="三个问题讲完了。接下来去说明书里看看怎么上手——或者直接开一场会试试。"
          next={{ href: '#/guide', title: '参会引导', label: '五分钟看懂你的第一场 iMeeting →' }}
        />
        <Footer>之三 · 连续 · 原型 V4.0 · 案例改写自真实访谈，细节已脱敏；切片为改写示意素材</Footer>
      </section>
    </div>
  );
}

/* ================= 参会引导 ================= */
function GuidePage() {
  return (
    <div className="page">
      <Topbar active="guide" />

      {/* S1 · 会场四要素 */}
      <section className="screen split chapter">
        <Chapter
          k="参会引导 · FIELD GUIDE FOR PARTICIPANTS"
          h1
          title={<React.Fragment>五分钟，看懂你的<br/>第一场 <em>iMeeting</em>。</React.Fragment>}
          lead="你被邀请参加一场用 iMeeting 开的会。会场里常驻四样东西，先认识它们。"
        />
        <div className="sp-visual"><RoomMap /></div>
      </section>

      {/* S2 · 五个动作 */}
      <section className="screen">
        <Eyebrow>01 · 你可以按什么 YOUR BUTTONS</Eyebrow>
        <Reveal d={1}><h2>五个常用动作，点一下看看</h2></Reveal>
        <Reveal d={2}><ActionGrid /></Reveal>
        <Reveal d={3}>
          <p className="sp-note">别人发言时你的麦是关的。这不是不让你说，是保证轮到你说时也没人打断你。</p>
        </Reveal>
      </section>

      {/* S3 · 处境 → 出口 */}
      <section className="screen">
        <Eyebrow>02 · 处境 → 出口 QUICK MAP</Eyebrow>
        <Reveal d={1}><h2>你想说的话，都有对应的口</h2></Reveal>
        <Reveal d={2}><SituationMap /></Reveal>
      </section>

      {/* S4 · 表决三环节 */}
      <section className="screen">
        <Eyebrow>03 · 表决的三个环节 THE VOTE</Eyebrow>
        <Reveal d={1}><h2>表决之前，你会听到三次确认</h2></Reveal>
        <Reveal d={2}>
          <div className="vst-stages">
            <div className="vst-tile"><span className="vst-no">STEP 1</span><span className="vst-t">发起表决的时机</span><span className="vst-d">辩论完成、队列清空，主持才宣布进入表决</span></div>
            <div className="vst-tile"><span className="vst-no">STEP 2</span><span className="vst-t">表决的方式</span><span className="vst-d">记名或无记名、所需比例按组织规则；法定人数先核算</span></div>
            <div className="vst-tile"><span className="vst-no">STEP 3</span><span className="vst-t">宣布表决结果</span><span className="vst-d">当场宣布并记录：赞成、反对、弃权，每一票都在</span></div>
          </div>
        </Reveal>
      </section>

      {/* S5 · 会后 */}
      <section className="screen finale-screen">
        <Eyebrow>04 · 散会之后 AFTER</Eyebrow>
        <Reveal d={1}><h2>你的参与，都被留了下来</h2></Reveal>
        <Reveal d={2}><Deliverables /></Reveal>
        <Reveal d={3} className="cta-row">
          <GlassButton primary width={210} href="https://imeeting.co/" target="_blank">进入 iMeeting ↗</GlassButton>
          <GlassButton width={230} href="#/time">先看看为什么这样设计 →</GlassButton>
        </Reveal>
        <Footer>参会引导 · 原型 V4.0 · 界面描述基于 iMeeting 公开资料整理</Footer>
      </section>
    </div>
  );
}

/* ================= 组织者手册 ================= */
function OrganizerPage() {
  return (
    <div className="page">
      <Topbar active="organizer" />

      {/* S1 · 议程轨道 */}
      <section className="screen split chapter">
        <Chapter
          k="组织者手册 · ORGANIZER HANDBOOK"
          h1
          title={<React.Fragment>从创建组织，<br/>到开出有<em>效力</em>的会。</React.Fragment>}
          lead="议程是会议的轨道，类型决定决定的效力，参数决定机制的松紧——组织者的选择题都在这里。"
        />
        <div className="sp-visual"><AgendaRail /></div>
      </section>

      {/* S2 · 会议类型 */}
      <section className="screen">
        <Eyebrow>01 · 会议类型 MEETING TYPES</Eyebrow>
        <Reveal d={1}><h2>先想清楚：这场会的决定，算不算数？</h2></Reveal>
        <Reveal d={2}><TypeCards /></Reveal>
        <Reveal d={3}>
          <p className="sp-note">临时会议的通知必须写清拟审议的主题与范围——未列入通知的事务不得处理。程序合法性由系统强制校验。</p>
        </Reveal>
      </section>

      {/* S3 · 机制参数 */}
      <section className="screen">
        <Eyebrow>02 · 机制参数 PARAMETERS</Eyebrow>
        <Reveal d={1}><h2>机制的松紧，由组织自己定</h2></Reveal>
        <Reveal d={2}><ParamCards /></Reveal>
        <Reveal d={3} style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '18px', marginTop: '4px' }}>
          <RangeDemo label="发言时间限制" min={1} max={5} value={2} unit="分钟" caption="单人发言时长，组织规则自定（1–5 分钟）。" />
          <RangeDemo label="联署发起门槛" min={10} max={50} step={5} value={20} unit="%" caption="临时会议联署所需的有表决权成员比例。" />
        </Reveal>
      </section>

      {/* S4 · 萝卜丁 */}
      <section className="screen split flip chapter">
        <div className="sp-visual"><LedgerFlow /></div>
        <Chapter
          k="03 · 萝卜丁与治理费用 CREDITS & GOVERNANCE"
          title={<React.Fragment>组织的公库，<br/>也走程序</React.Fragment>}
          lead="个人萝卜丁用于公众会议，组织萝卜丁用于组织会议。成员自愿划拨给组织时，接受与否由组织审议——指定用途还是非定向，都可以在审议中写明。"
          tags={['任何改变公库现状的动作都是动议', '会议结束正式扣除']}
        />
      </section>

      {/* S5 · 会后产出 */}
      <section className="screen finale-screen">
        <Eyebrow>04 · 会后的产出 DELIVERABLES</Eyebrow>
        <Reveal d={1}><h2>一场会结束，留下三样东西</h2></Reveal>
        <Reveal d={2}><Deliverables /></Reveal>
        <Reveal d={3} className="cta-row">
          <GlassButton primary width={230} href="https://imeeting.co/" target="_blank">创建你的第一场会 ↗</GlassButton>
          <GlassButton width={250} href="#/guide">把参会引导发给与会者 →</GlassButton>
        </Reveal>
        <Footer>组织者手册 · 原型 V4.0 · 内容基于 iMeeting 公开资料整理，部分规划能力以官方说明为准</Footer>
      </section>
    </div>
  );
}
