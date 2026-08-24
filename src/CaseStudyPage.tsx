import React, { useEffect, useRef, useState } from "react"

const GREEN = "#A2FF27"
const DARK = "#050505"

interface Props {
  onBack: () => void
}

const STATS = [
  { num: "900W+", label: "全平台总曝光量" },
  { num: "300W+", label: "60天全平台播放量" },
  { num: "100W+", label: "最高单集播放量", gold: true },
  { num: "4倍", label: "热度达频道均值", gold: true },
]

const FLOW_STEPS = [
  { n: 1, title: "算法破圈", desc: "短视频切片触达公域自然流量，优质金句前置预埋，工业化内容生产" },
  { n: 2, title: "搜索聚合", desc: '平台SEO沉淀确定性流量，"不标准女生" = "妖精的口袋"搜索绑定' },
  { n: 3, title: "内容沉淀", desc: "腾讯视频完整版沉浸式长内容，建立用户粘性与心智，长效深度渗透" },
  { n: 4, title: "商业回馈", desc: "品牌进店转化，态度金句曝光带动自然引流，A3用户精准增长" },
]

const CLIP_MODELS = [
  {
    num: "MODEL 01",
    title: "情绪金句\n击穿女性社会议题",
    body: '紧扣女性核心议题，如"生育困境""白线之外的学历"，前置预埋反思性、对抗性情绪金句。精准踩中收藏量在小红书算法中的最高权重。以极健康的高赞藏比高频打入泛女性与职场人群推荐。',
    tags: ["迷茫", "独立", "内耗", "释怀", "主体性"],
  },
  {
    num: "MODEL 02",
    title: "创新签名球衣与先导\n反哺同款穿搭与品牌资产",
    body: "将品牌服装作为拍摄物料道具进行展示，叠加态度DIY手绘，告别传统生硬口播，巧妙化内容为服装种草与品牌价值。品牌产品一体化，实现极高效率的突围，以极小成本撬动百万级长视频深度心智留存。",
    tags: ["品牌服装种草", "态度DIY", "产品一体化"],
  },
  {
    num: "MODEL 03",
    title: "活人感漫谈\n打造真实生命力",
    body: "揭开原生家庭或低谷的真实创伤，将极其私密难以启齿的女性生理与心理困境摆上台面，为现代女性提供心理代偿与出逃宣泄口。极具活人感的内容卸下用户心防，评论区活跃度较同类文化播客断层式提升。",
    tags: ["真实创伤", "心理代偿", "高互动评论"],
  },
]

const SEO_SUGGESTIONS = [
  { rank: "1", text: ["妖精的口袋", "不标准女生"], badge: "品牌绑定" },
  { rank: "2", text: ["不标准女生 ", "赵丽娜", " 穿搭"], badge: "软代言" },
  { rank: "3", text: ["不标准女生 野生女足"], badge: null },
  { rank: "4", text: ["不标准也能上场 ", "妖精的口袋"], badge: "金句" },
]

const OFFICIAL_CARDS = [
  { icon: "🏆", title: "焦点图黄金转化位", desc: "腾讯视频焦点图黄金转化位持续推荐" },
  { icon: "⭐", title: "精选频道节目推荐位", desc: "播客频道精选推荐，占领内容高地" },
  { icon: "🌊", title: "全局算法精准瀑布流", desc: "算法精准推送，持续触达目标人群" },
  { icon: "📢", title: "官方公众号推荐", desc: "腾讯视频官方公众号权威背书推荐" },
]

// Simple animated number hook
function useCountUp(target: number, suffix: string, trigger: boolean) {
  const [display, setDisplay] = useState("0" + suffix)
  useEffect(() => {
    if (!trigger) return
    const duration = 1800
    const start = performance.now()
    const tick = (now: number) => {
      const t = Math.min((now - start) / duration, 1)
      const eased = 1 - Math.pow(1 - t, 3)
      setDisplay(Math.floor(eased * target).toLocaleString() + suffix)
      if (t < 1) requestAnimationFrame(tick)
    }
    requestAnimationFrame(tick)
  }, [trigger, target, suffix])
  return display
}

export default function CaseStudyPage({ onBack }: Props) {
  const heroRef = useRef<HTMLDivElement>(null)
  const [heroVisible, setHeroVisible] = useState(false)
  const [barVisible, setBarVisible] = useState(false)
  const barRef = useRef<HTMLDivElement>(null)
  const [isMobile, setIsMobile] = useState(() => window.innerWidth < 768)

  useEffect(() => {
    const onResize = () => setIsMobile(window.innerWidth < 768)
    window.addEventListener("resize", onResize)
    return () => window.removeEventListener("resize", onResize)
  }, [])

  const stat900 = useCountUp(900, "W+", heroVisible)
  const stat300 = useCountUp(300, "W+", heroVisible)
  const stat100 = useCountUp(100, "W+", heroVisible)

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "instant" })
  }, [])

  useEffect(() => {
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            if (e.target === heroRef.current) setHeroVisible(true)
            if (e.target === barRef.current) setBarVisible(true)
          }
        })
      },
      { threshold: 0.2 }
    )
    if (heroRef.current) io.observe(heroRef.current)
    if (barRef.current) io.observe(barRef.current)
    return () => io.disconnect()
  }, [])

  const S = {
    section: {
      maxWidth: 1200,
      margin: "0 auto",
      padding: isMobile ? "56px 20px" : "80px 40px",
    } as React.CSSProperties,
    label: {
      display: "block",
      fontSize: 11,
      letterSpacing: "0.3em",
      color: GREEN,
      fontWeight: 600,
      marginBottom: 12,
    } as React.CSSProperties,
    h2: {
      fontWeight: 800,
      fontSize: "clamp(28px,4vw,48px)",
      lineHeight: 1.15,
      marginBottom: 16,
    } as React.CSSProperties,
    desc: {
      fontSize: 15,
      color: "#8C8C8C",
      lineHeight: 1.8,
      maxWidth: 680,
      marginBottom: 48,
    } as React.CSSProperties,
  }

  const statNums = [stat900, stat300, stat100, "4倍"]

  return (
    <div style={{ background: DARK, color: "#fff", minHeight: "100vh", fontFamily: "'Outfit', sans-serif" }}>

      {/* Mobile back bar */}
      {isMobile && (
        <div style={{
          position: "fixed", top: 0, left: 0, right: 0, zIndex: 300,
          background: "rgba(5,5,5,0.92)", backdropFilter: "blur(12px)",
          borderBottom: "1px solid rgba(162,255,39,0.15)",
          padding: "12px 20px",
          display: "flex", alignItems: "center",
        }}>
          <button
            onClick={onBack}
            style={{
              background: "rgba(162,255,39,0.1)", border: `1px solid rgba(162,255,39,0.3)`,
              borderRadius: 8, color: GREEN, padding: "8px 16px",
              fontSize: 13, fontWeight: 600, cursor: "pointer",
            }}
          >
            ← 返回官网
          </button>
        </div>
      )}

      {/* ── HERO ─────────────────────────────────────────────────────────────── */}
      <section
        ref={heroRef}
        style={{
          minHeight: "100vh",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          position: "relative",
          overflow: "hidden",
          background: `radial-gradient(ellipse at 70% 20%, rgba(162,255,39,0.08) 0%, transparent 50%),
                       radial-gradient(ellipse at 20% 80%, rgba(162,255,39,0.05) 0%, transparent 50%),
                       #050505`,
          backgroundImage: `linear-gradient(rgba(255,255,255,0.012) 1px, transparent 1px),
                            linear-gradient(90deg, rgba(255,255,255,0.012) 1px, transparent 1px),
                            radial-gradient(ellipse at 70% 20%, rgba(162,255,39,0.08) 0%, transparent 50%),
                            radial-gradient(ellipse at 20% 80%, rgba(162,255,39,0.05) 0%, transparent 50%)`,
          backgroundSize: "60px 60px, 60px 60px, 100% 100%, 100% 100%",
        }}
      >
        <div style={{ textAlign: "center", maxWidth: 900, padding: isMobile ? "0 20px" : "0 32px", position: "relative", zIndex: 2, paddingTop: isMobile ? 100 : 80 }}>
          {/* Back button — desktop only */}
          <button
            onClick={onBack}
            style={{
              position: "absolute",
              top: -116,
              left: 0,
              display: isMobile ? "none" : undefined,
              background: "rgba(162,255,39,0.1)",
              border: `1px solid rgba(162,255,39,0.3)`,
              borderRadius: 8,
              color: GREEN,
              padding: "8px 16px",
              fontSize: 13,
              fontWeight: 600,
              cursor: "pointer",
              transition: "all 0.2s",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = GREEN
              e.currentTarget.style.color = DARK
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = "rgba(162,255,39,0.1)"
              e.currentTarget.style.color = GREEN
            }}
          >
            ← 返回官网
          </button>

          {/* Badge */}
          <div style={{
            display: "inline-flex", alignItems: "center", gap: 8,
            padding: "6px 16px", borderRadius: 30,
            background: "rgba(162,255,39,0.1)",
            border: `1px solid rgba(162,255,39,0.3)`,
            fontSize: 12, color: GREEN, fontWeight: 600, letterSpacing: "1px",
            marginBottom: 28,
          }}>
            <span style={{ width: 6, height: 6, borderRadius: "50%", background: GREEN, display: "inline-block", animation: "pulse 2s infinite" }} />
            品牌播客全案营销 · 标杆案例
          </div>

          <h1 style={{
            fontWeight: 900,
            fontSize: "clamp(36px,6vw,68px)",
            lineHeight: 1.05,
            letterSpacing: "-2px",
            marginBottom: 20,
          }}>
            <span style={{
              background: `linear-gradient(135deg, ${GREEN}, #7dcc00)`,
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text",
            }}>断层领跑</span>同行业<br />
            首季斩获腾讯<span style={{
              background: `linear-gradient(135deg, ${GREEN}, #c0ff60)`,
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text",
            }}>百万流量</span>
          </h1>

          <p style={{ fontSize: "clamp(14px,2vw,18px)", color: "#8C8C8C", maxWidth: 640, margin: "0 auto 40px", lineHeight: 1.7 }}>
            《不标准女生》第一季 · 野生女足视频播客<br />
            ELF SACK 妖精的口袋 × 超级内容 · 以播客为轴心的整合传播营销
          </p>

          {/* Stats */}
          <div style={{ display: "grid", gridTemplateColumns: isMobile ? "1fr 1fr" : "repeat(4,auto)", gap: 12, justifyContent: "center" }}>
            {STATS.map((s, i) => (
              <div key={i} style={{
                background: "rgba(255,255,255,0.04)",
                border: `1px solid rgba(162,255,39,0.2)`,
                borderRadius: 14,
                padding: "20px 28px",
                minWidth: 140,
                transition: "all 0.3s",
              }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.background = "rgba(162,255,39,0.06)"
                  e.currentTarget.style.transform = "translateY(-4px)"
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.background = "rgba(255,255,255,0.04)"
                  e.currentTarget.style.transform = "none"
                }}
              >
                <div style={{ fontSize: 30, fontWeight: 900, color: GREEN, lineHeight: 1 }}>
                  {statNums[i]}
                </div>
                <div style={{ fontSize: 12, color: "#8C8C8C", marginTop: 6 }}>{s.label}</div>
              </div>
            ))}
          </div>
        </div>
        {/* Scroll hint */}
        <div style={{
          position: "absolute", bottom: 32, left: "50%", transform: "translateX(-50%)",
          color: "#8C8C8C", fontSize: 12, display: "flex", flexDirection: "column", alignItems: "center", gap: 8,
        }}>
          <span>向下探索</span>
          <div style={{ width: 1, height: 30, background: `linear-gradient(${GREEN}, transparent)` }} />
        </div>
      </section>

      {/* ── BRAND BAR ────────────────────────────────────────────────────────── */}
      <section style={{ background: "#fff", color: "#1a1a1a", padding: "40px 0", borderTop: `3px solid ${GREEN}` }}>
        <div style={{ maxWidth: 1200, margin: "0 auto", padding: isMobile ? "0 20px" : "0 40px", display: "flex", alignItems: "center", justifyContent: "space-between", flexWrap: "wrap", gap: 24 }}>
          <div>
            <div style={{ fontSize: 11, color: "#888", fontWeight: 600, letterSpacing: "0.15em", marginBottom: 6 }}>CASE STUDY / 结案战报</div>
            <div style={{ fontSize: 22, fontWeight: 800, marginBottom: 4 }}>《不标准女生》第一季</div>
            <div style={{ fontSize: 13, color: "#666" }}>野生女足视频播客 · 全网全终端覆盖（手机端 / 电脑端 / 电视端）</div>
          </div>
          <div style={{ display: "flex", gap: 10, flexWrap: "wrap" }}>
            {[
              { label: "断层领先", highlight: true },
              { label: "视频播客" },
              { label: "短带长闭环" },
              { label: "品牌资产沉淀" },
              { label: "ROI效率之王" },
            ].map((t) => (
              <span key={t.label} style={{
                padding: "8px 16px", borderRadius: 8,
                background: t.highlight ? GREEN : "#fff",
                border: `1px solid ${t.highlight ? GREEN : "#e0e0e0"}`,
                fontSize: 13, fontWeight: 600,
                color: t.highlight ? DARK : "#555",
              }}>{t.label}</span>
            ))}
          </div>
        </div>
      </section>

      {/* ── STRATEGY ─────────────────────────────────────────────────────────── */}
      <section style={{ background: "#080808" }}>
        <div style={S.section}>
          <span style={S.label}>STRATEGIC BACKGROUND</span>
          <h2 style={S.h2}>战略背景与市场洞察</h2>
          <p style={S.desc}>拒绝陷入低价、同质化的信息流红海内卷，坚持以叙事营销沉淀长效品牌资产。</p>
          <div style={{ display: "grid", gridTemplateColumns: isMobile ? "1fr" : "1fr 1fr", gap: 32 }}>
            {[
              {
                icon: "⚡",
                title: "行业痛点",
                color: GREEN,
                text: "服装行业传统信息流红利见顶，面临高转化成本、低粉丝留存、频繁价格战等共通问题。常规达人种草往往「人红衣不红」，品牌花费高额预算却无法沉淀能与消费者产生共鸣的品牌资产。",
                bullets: ["流量成本内卷，传统信息流红利见顶", "KOC无效种草，人红衣不红", "无法沉淀共鸣型品牌资产", "频繁价格战，低粉丝留存"],
              },
              {
                icon: "🎯",
                title: "品牌诉求与核心借势",
                color: "#c0ff60",
                text: "妖精的口袋在26年春夏提出营销大盘计划，以世界杯热趋借势为营销目的，打破常规电商推流，通过视频播客为介质，以一种极具态度、能与年轻女性深度共振的姿态切入大盘流量。",
                bullets: ["借势26年世界杯体育热趋，切入泛女性大盘流量", "摒弃单一、同质化电商广告推流", "转向长效内容资产建设", "品牌用户97%-99%极端女性化，精致妈妈+小镇青年双引擎"],
              },
            ].map((card, i) => (
              <div key={i} style={{
                background: "#111",
                border: `1px solid rgba(162,255,39,0.12)`,
                borderRadius: 16,
                padding: "36px",
                position: "relative",
                overflow: "hidden",
                borderLeft: `4px solid ${card.color}`,
              }}>
                <div style={{ fontSize: 32, marginBottom: 16 }}>{card.icon}</div>
                <h3 style={{ fontSize: 20, fontWeight: 700, marginBottom: 12, color: "#fff" }}>{card.title}</h3>
                <p style={{ fontSize: 14, color: "#8C8C8C", lineHeight: 1.7, marginBottom: 16 }}>{card.text}</p>
                <ul style={{ listStyle: "none", padding: 0 }}>
                  {card.bullets.map((b, j) => (
                    <li key={j} style={{
                      fontSize: 13, color: "#8C8C8C", padding: "6px 0 6px 20px",
                      position: "relative",
                    }}>
                      <span style={{ position: "absolute", left: 0, top: 10, width: 8, height: 8, borderRadius: "50%", background: card.color, display: "inline-block" }} />
                      {b}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── FLOW ─────────────────────────────────────────────────────────────── */}
      <section style={{ background: "#0c0c0c", padding: "80px 0" }}>
        <div style={{ maxWidth: 1200, margin: "0 auto", padding: isMobile ? "0 20px" : "0 40px" }}>
          <div style={{ textAlign: "center", marginBottom: 48 }}>
            <span style={{ ...S.label, display: "block", textAlign: "center" }}>UNSTANDARD MANIFESTO</span>
            <h2 style={{ ...S.h2, textAlign: "center" }}>短带长 · 破圈闭环</h2>
            <p style={{ fontSize: 14, color: "#8C8C8C", maxWidth: 680, margin: "0 auto", lineHeight: 1.8 }}>
              传统的短视频带货是即时刺激-即时转化；我们的内容全案是情绪触发-搜索聚合-长尾沉淀-品牌认同的闭环链路。
            </p>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: isMobile ? "1fr 1fr" : "repeat(4,1fr)", gap: 12, alignItems: "stretch" }}>
            {FLOW_STEPS.map((s, i) => (
              <React.Fragment key={s.n}>
                <div style={{
                  flex: 1, minWidth: 180, maxWidth: 240,
                  background: "#141414",
                  border: `1px solid rgba(162,255,39,0.12)`,
                  borderRadius: 16, padding: "28px 20px", textAlign: "center",
                  transition: "all 0.3s",
                }}
                  onMouseEnter={(e) => { e.currentTarget.style.borderColor = GREEN; e.currentTarget.style.transform = "translateY(-6px)" }}
                  onMouseLeave={(e) => { e.currentTarget.style.borderColor = "rgba(162,255,39,0.12)"; e.currentTarget.style.transform = "none" }}
                >
                  <div style={{
                    width: 32, height: 32, borderRadius: "50%",
                    background: "rgba(162,255,39,0.15)", color: GREEN,
                    fontWeight: 700, fontSize: 14,
                    display: "flex", alignItems: "center", justifyContent: "center",
                    margin: "0 auto 16px",
                  }}>{s.n}</div>
                  <h4 style={{ fontSize: 16, fontWeight: 700, marginBottom: 8 }}>{s.title}</h4>
                  <p style={{ fontSize: 12, color: "#8C8C8C", lineHeight: 1.6 }}>{s.desc}</p>
                </div>
                {!isMobile && i < FLOW_STEPS.length - 1 && (
                  <div key={`arrow-${i}`} style={{ display: "flex", alignItems: "center", color: GREEN, fontSize: 24, padding: "0 8px" }}>→</div>
                )}
              </React.Fragment>
            ))}
          </div>
          <div style={{
            marginTop: 32, textAlign: "center", padding: "20px 40px",
            background: "rgba(162,255,39,0.06)",
            border: `1px solid rgba(162,255,39,0.2)`,
            borderRadius: 16, fontSize: 16, fontWeight: 700,
          }}>
            <span style={{ color: GREEN }}>「不标准，也能上场」</span> · 6大女性主义议题 × 野生女足场景 = 差异化心智占领
          </div>
        </div>
      </section>

      {/* ── HEAT INDEX ───────────────────────────────────────────────────────── */}
      <section style={{ background: "#080808" }}>
        <div ref={barRef} style={S.section}>
          <span style={S.label}>HEAT INDEX</span>
          <h2 style={S.h2}>热度值在视频播客频道领跑</h2>
          <p style={S.desc}>腾讯视频播客频道站内热度领先！达行业平均4倍！</p>
          <div style={{
            background: "#111",
            border: `1px solid rgba(162,255,39,0.15)`,
            borderRadius: 20, padding: "48px",
          }}>
            <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
              {[
                { label: "《不标准女生》", pct: "100%", value: "最高热度 6,975", highlight: true },
                { label: "行业平均", pct: "21.5%", value: "平均热度 1,500", highlight: false },
              ].map((bar) => (
                <div key={bar.label} style={{ display: "flex", alignItems: "center", gap: 20 }}>
                  <div style={{ width: 140, fontSize: 14, fontWeight: 600, textAlign: "right", flexShrink: 0, color: bar.highlight ? "#fff" : "#8C8C8C" }}>{bar.label}</div>
                  <div style={{ flex: 1, height: 40, background: "rgba(255,255,255,0.06)", borderRadius: 10, overflow: "hidden" }}>
                    <div style={{
                      height: "100%",
                      width: barVisible ? bar.pct : "0%",
                      borderRadius: 10,
                      background: bar.highlight
                        ? `linear-gradient(90deg, ${GREEN}, #7dcc00)`
                        : "rgba(255,255,255,0.12)",
                      display: "flex", alignItems: "center", justifyContent: "flex-end",
                      paddingRight: 16, fontSize: 14, fontWeight: 700,
                      color: bar.highlight ? DARK : "#8C8C8C",
                      transition: "width 1.5s cubic-bezier(0.4,0,0.2,1)",
                    }}>{bar.value}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── CLIP STRATEGY ────────────────────────────────────────────────────── */}
      <section style={{ background: "#0c0c0c" }}>
        <div style={S.section}>
          <span style={S.label}>CLIP STRATEGY</span>
          <h2 style={S.h2}>切片纯自然流 · 饱和式狙击</h2>
          <p style={S.desc}>
            自5月22日首期短视频平台同步启动，围绕核心关联词"妖精的口袋"与品牌态度"不标准女生"进行全网短视频包围。爆款切片的三大工业化内容模型：
          </p>
          <div style={{ display: "grid", gridTemplateColumns: isMobile ? "1fr" : "repeat(3,1fr)", gap: 24 }}>
            {CLIP_MODELS.map((c, i) => (
              <div key={i} style={{
                background: "#141414",
                border: `1px solid rgba(162,255,39,0.1)`,
                borderRadius: 16, overflow: "hidden",
                transition: "all 0.3s",
              }}
                onMouseEnter={(e) => { e.currentTarget.style.transform = "translateY(-6px)"; e.currentTarget.style.borderColor = "rgba(162,255,39,0.35)" }}
                onMouseLeave={(e) => { e.currentTarget.style.transform = "none"; e.currentTarget.style.borderColor = "rgba(162,255,39,0.1)" }}
              >
                <div style={{
                  padding: "24px 28px 16px",
                  background: "linear-gradient(135deg, rgba(162,255,39,0.07), transparent)",
                  borderBottom: `1px solid rgba(162,255,39,0.1)`,
                }}>
                  <div style={{ fontSize: 11, fontWeight: 700, color: GREEN, letterSpacing: "0.1em", marginBottom: 8 }}>{c.num}</div>
                  <div style={{ fontSize: 18, fontWeight: 700, lineHeight: 1.3, whiteSpace: "pre-line" }}>{c.title}</div>
                </div>
                <div style={{ padding: "24px 28px" }}>
                  <p style={{ fontSize: 13, color: "#8C8C8C", lineHeight: 1.7, marginBottom: 16 }}>{c.body}</p>
                  <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
                    {c.tags.map((t) => (
                      <span key={t} style={{
                        fontSize: 11, padding: "4px 10px", borderRadius: 6,
                        background: "rgba(162,255,39,0.1)", color: GREEN, fontWeight: 600,
                      }}>{t}</span>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── SEO BINDING ──────────────────────────────────────────────────────── */}
      <section style={{ background: "#080808" }}>
        <div style={S.section}>
          <span style={S.label}>SEO BINDING</span>
          <h2 style={S.h2}>话题绑定品牌 · 触发"大家都在搜"</h2>
          <p style={S.desc}>小红书算法已经将我们的内容打上了品牌标签，搜索"不标准女生"直接关联"妖精的口袋"。</p>
          <div style={{ display: "grid", gridTemplateColumns: isMobile ? "1fr" : "1fr 1fr", gap: isMobile ? 24 : 40, alignItems: "center" }}>
            {/* Simulated search */}
            <div style={{ background: "#111", border: `1px solid rgba(162,255,39,0.15)`, borderRadius: 16, padding: 32 }}>
              <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 20 }}>
                <div style={{
                  flex: 1, background: "#0a0a0a",
                  border: `1px solid rgba(162,255,39,0.2)`,
                  borderRadius: 10, padding: "14px 18px",
                  fontSize: 14, color: "#8C8C8C",
                  display: "flex", alignItems: "center", gap: 8,
                }}>
                  <span>🔍</span>
                  <span>不标准女生</span>
                  <span style={{ width: 2, height: 16, background: GREEN, animation: "blink 1s infinite", display: "inline-block" }} />
                </div>
              </div>
              <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
                {SEO_SUGGESTIONS.map((s, i) => (
                  <div key={i} style={{
                    background: "rgba(255,255,255,0.03)",
                    border: `1px solid rgba(255,255,255,0.06)`,
                    borderRadius: 10, padding: "12px 16px",
                    display: "flex", alignItems: "center", gap: 12,
                    fontSize: 13, transition: "all 0.2s",
                    cursor: "default",
                  }}
                    onMouseEnter={(e) => { e.currentTarget.style.borderColor = "rgba(162,255,39,0.25)" }}
                    onMouseLeave={(e) => { e.currentTarget.style.borderColor = "rgba(255,255,255,0.06)" }}
                  >
                    <span style={{ fontSize: 11, color: "#8C8C8C", fontWeight: 700, width: 20 }}>{s.rank}</span>
                    <span style={{ flex: 1 }}>
                      {s.text.map((t, j) => (
                        j % 2 === 0 && i < 2 ? <strong key={j} style={{ color: GREEN }}>{t}</strong> : <span key={j}>{t}</span>
                      ))}
                    </span>
                    {s.badge && (
                      <span style={{
                        fontSize: 10, padding: "2px 8px", borderRadius: 4,
                        background: "rgba(162,255,39,0.12)", color: GREEN, fontWeight: 600,
                      }}>{s.badge}</span>
                    )}
                  </div>
                ))}
              </div>
            </div>

            {/* Info */}
            <div>
              <h3 style={{ fontSize: 24, fontWeight: 800, marginBottom: 16, lineHeight: 1.3 }}>
                不标准女生 = 妖精的口袋
              </h3>
              <p style={{ fontSize: 14, color: "#8C8C8C", lineHeight: 1.8, marginBottom: 16 }}>
                小红书底层下拉推荐现象：搜索"不标准女生"，Top 1 核心推荐词直接关联<strong style={{ color: GREEN }}>【妖精的口袋不标准女生】</strong>。
              </p>
              <p style={{ fontSize: 14, color: "#8C8C8C", lineHeight: 1.8, marginBottom: 16 }}>
                对比其他播客IP：《言外之意》全盘被主理人本身或娱乐嘉宾占据；《自然光》充斥大量泛生活、日常高频词污染。
              </p>
              <p style={{ fontSize: 14, color: "#8C8C8C", lineHeight: 1.8, marginBottom: 20 }}>
                赵丽娜与节目深度绑定，搜索赵丽娜即触发"不标准女生穿搭"第一联想，为品牌软代言。
              </p>
              <div style={{
                background: "rgba(162,255,39,0.06)",
                border: `1px solid rgba(162,255,39,0.2)`,
                borderRadius: 12, padding: 20,
              }}>
                <p style={{ fontSize: 13, color: "#c0c0c0", lineHeight: 1.7, margin: 0 }}>
                  小红书官方智能推荐机制已将"看这个播客视频的人"与"对妖精的口袋感兴趣的人"在后台完成人群画像的类目合并。评论区顶部自动触发<strong style={{ color: GREEN }}>"大家都在搜：妖精的口袋"</strong>。
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── OFFICIAL RESOURCES ───────────────────────────────────────────────── */}
      <section style={{ background: "#0c0c0c" }}>
        <div style={S.section}>
          <span style={S.label}>OFFICIAL ENDORSEMENT</span>
          <h2 style={S.h2}>腾讯视频官方资源位权威推介</h2>
          <p style={S.desc}>首季播客以优质内容收获官方资源位持续曝光，占领腾讯播客频道页内容高地。</p>
          <div style={{ display: "grid", gridTemplateColumns: isMobile ? "1fr 1fr" : "repeat(4,1fr)", gap: 20 }}>
            {OFFICIAL_CARDS.map((c, i) => (
              <div key={i} style={{
                background: "#141414",
                border: `1px solid rgba(162,255,39,0.1)`,
                borderRadius: 14, padding: "28px 20px", textAlign: "center",
                transition: "all 0.3s",
              }}
                onMouseEnter={(e) => { e.currentTarget.style.borderColor = GREEN; e.currentTarget.style.transform = "translateY(-4px)" }}
                onMouseLeave={(e) => { e.currentTarget.style.borderColor = "rgba(162,255,39,0.1)"; e.currentTarget.style.transform = "none" }}
              >
                <div style={{
                  width: 48, height: 48, borderRadius: 12,
                  background: "rgba(162,255,39,0.12)",
                  display: "flex", alignItems: "center", justifyContent: "center",
                  margin: "0 auto 16px", fontSize: 22,
                }}>{c.icon}</div>
                <h4 style={{ fontSize: 15, fontWeight: 700, marginBottom: 8 }}>{c.title}</h4>
                <p style={{ fontSize: 12, color: "#8C8C8C", lineHeight: 1.6 }}>{c.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA ──────────────────────────────────────────────────────────────── */}
      <section style={{ background: "#050505", padding: "100px 32px", textAlign: "center", borderTop: `1px solid rgba(162,255,39,0.1)` }}>
        <div style={{ maxWidth: 800, margin: "0 auto" }}>
          <h2 style={{ fontSize: "clamp(28px,5vw,44px)", fontWeight: 800, lineHeight: 1.2, marginBottom: 20 }}>
            用最低试错成本<br />
            撬动<span style={{
              background: `linear-gradient(135deg, ${GREEN}, #c0ff60)`,
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text",
            }}>百万级品牌心智留存</span>
          </h2>
          <p style={{ fontSize: 16, color: "#8C8C8C", marginBottom: 40, lineHeight: 1.7 }}>
            以播客为轴心的整合传播营销 · 让品牌态度成为圈层社交货币
          </p>
          <div style={{ display: "flex", gap: 16, justifyContent: "center", flexWrap: "wrap" }}>
            <button
              onClick={onBack}
              style={{
                display: "inline-flex", alignItems: "center", gap: 8,
                padding: "16px 32px", borderRadius: 12, fontSize: 15, fontWeight: 700,
                background: GREEN, color: DARK, border: "none", cursor: "pointer",
                boxShadow: `0 8px 24px rgba(162,255,39,0.3)`,
                transition: "all 0.2s",
              }}
              onMouseEnter={(e) => { e.currentTarget.style.boxShadow = `0 12px 32px rgba(162,255,39,0.5)`; e.currentTarget.style.transform = "translateY(-2px)" }}
              onMouseLeave={(e) => { e.currentTarget.style.boxShadow = `0 8px 24px rgba(162,255,39,0.3)`; e.currentTarget.style.transform = "none" }}
            >
              📞 联系全案合作 →
            </button>
            <button
              onClick={onBack}
              style={{
                display: "inline-flex", alignItems: "center", gap: 8,
                padding: "16px 32px", borderRadius: 12, fontSize: 15, fontWeight: 700,
                background: "transparent", color: "#fff",
                border: `1px solid rgba(255,255,255,0.2)`, cursor: "pointer",
                transition: "all 0.2s",
              }}
              onMouseEnter={(e) => { e.currentTarget.style.background = "rgba(255,255,255,0.06)" }}
              onMouseLeave={(e) => { e.currentTarget.style.background = "transparent" }}
            >
              ← 返回官网
            </button>
          </div>
        </div>
      </section>

      {/* ── FOOTER ───────────────────────────────────────────────────────────── */}
      <footer style={{ background: "#030303", padding: isMobile ? "24px 20px" : "40px", borderTop: `1px solid rgba(255,255,255,0.06)` }}>
        <div style={{ maxWidth: 1200, margin: "0 auto", display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: 12 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
            <div style={{ width: 22, height: 22, background: GREEN, borderRadius: 4, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 10, fontWeight: 900, color: DARK }}>S</div>
            <span style={{ fontWeight: 700, fontSize: 14 }}>Superaha 超级内容</span>
            <span style={{ color: "#8C8C8C", fontSize: 13 }}>｜ ELF SACK × 超级内容 · 由超级内容研发策划出品</span>
          </div>
          <div style={{ fontSize: 12, color: "#555" }}>《不标准女生》第一季 · 野生女足视频播客项目结案战报</div>
        </div>
      </footer>

      <style>{`
        @keyframes pulse { 0%,100%{opacity:1} 50%{opacity:0.3} }
        @keyframes blink { 0%,100%{opacity:1} 50%{opacity:0} }
      `}</style>
    </div>
  )
}
