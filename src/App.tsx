import { useState, useEffect, useRef, useCallback } from "react"
import CaseStudyPage from "./CaseStudyPage"
import avatarImg from './imports/_____20260731132757_27_188.jpg';
import avatarImg2 from  './imports/_____20260731132852_29_188.jpg';
import avatarImg3 from  './imports/1.png';
import avatarImg4 from  './imports/zuosanguan.jpg';
import avatarImg5 from  './imports/wei_xin.png';
import avatarImg6 from  './imports/fengmangbang.png';
import avatarImg7 from  './imports/bu_biao_zhun.jpg';
import avatarImg8 from  './imports/20260809-230206.jpeg';
import avatarImg9 from  './imports/cjnr.jpg';
import avatarImg10 from  './imports/wang.jpeg';
import avatarImg11 from  './imports/xuhao.jpg';
import avatarImg12 from  './imports/xu.jpg';
import avatarImg13 from  './imports/zeng.jpeg';
import avatarImg14 from  './imports/dai.jpg';
import avatarImg15 from  './imports/zhong.png';
import avatarImg16 from './imports/cjnrphoto.png';

// ─── Types ──────────────────────────────────────────────────────────────────
interface Particle {
  x: number
  y: number
  vx: number
  vy: number
  size: number
  alpha: number
}

// ─── Constants ───────────────────────────────────────────────────────────────
const GREEN = "#A2FF27"
const NAV_SECTIONS = [
  { label: "关于我们", href: "about" },
  { label: "节目矩阵", href: "matrix" },
  { label: "标杆案例", href: "case-study" },
  { label: "品牌全案营销", href: "marketing" },
  { label: "公司价值观", href: "values" },
  { label: "联系我们", href: "contact" },
]

const FOUNDERS = [
  {
    name: "夏翰杰",
    title: "创始人",
    quote:
      '"在内容过剩的时代，稀缺的是如何发挥内容能力的系统性策略，这就是内容力。"',
    bio: "本科北京电影学院、研究生北京大学汇丰商学院；原中国500强公司品牌副总、倍轻松品牌顾问、城市集团（阿布扎比财团）顾问；为倍轻松、海尔等上市公司制定年/季度营销及品牌战略；16年创立全网流量前十MCN，累计3轮融资（含阿里众海），操盘流量超20亿，孵化新消费品牌（myomy、牛毛黑黑、探乐派等）GMV破亿；著有内容营销方法论《内容力》。",
    book: "《内容力》",
    bookLink: "https://weread.qq.com",
    img: avatarImg,
  },
  {
    name: "周龙",
    title: "联合创始人",
    quote:
      '"销售只是一个结果，4P 中 Promote 的意思从来不是打折促销，而是如何用品牌内容促进销售。"',
    bio: "前美特斯邦威CMO，中国营销20人，中国广告年度CMO，金狮奖/金投赏广告评委；操盘ME&CITY品牌运营，推动美特斯邦威销售额从3亿升至100亿，策划周杰伦代言、《变形金刚》联合营销；AKCLUB品牌董事CEO（销售额6000万提至3亿）；UOOYAA女装董事CEO（销售额2亿提至4亿）。",
    book: "《促销胜经》",
    bookLink: "https://weread.qq.com",
    img: avatarImg2,
  },
  {
    name: "朱元冰",
    title: "合伙人",
    quote: '"好的内容，需要真实的人，用真实的态度去做。"',
    bio: "拥有327.1万高活跃粉丝，中国内地偶像及制片人；第23届东方风云榜音乐盛典最佳新人奖，第五届《综艺》年度潜力主持人；原天天向上主持人、原湖南卫视少年进化论主持人；代表作《端脑》《15年等待候鸟》《流水迢迢》《从前有座灵剑山》等。",
    book: null,
    bookLink: null,
    img: avatarImg3,
  },
]

const BUSINESSES = [
  {
    name: "超级内容营销",
    desc: "以播客为核心容器，整合TVC、种草、SEO、电商的全案商业逻辑",
  },
  {
    name: "超级内容出品",
    desc: "自营研策+联合出品多元节目矩阵，打造现象级内容IP",
  },
  {
    name: "超级全案营销",
    desc: "从战略洞察到全域操盘，以内容资产沉淀长效品牌心智，撬动品效合一的商业增量",
  },
  {
    name: "超级精准触达",
    desc: "内容驱动的电商转化体系——从A3人群沉淀到搜索归因，让每次内容曝光精准转化为商业增长",
  },
]

const SHOWS_OWN = [
  {
    title: "坐三观五六",
    season: "第一季",
    platform: "腾讯视频",
    type: "自营出品",
    mc: "朱元冰",
    tag: "票房分账",
    img: avatarImg4,
    link: "https://v.qq.com",
  },
  {
    title: "每周聊夏",
    season: "营销人必听",
    platform: "全平台",
    type: "自营出品",
    mc: "夏翰杰",
    tag: "11次新星榜",
    img: "https://images.unsplash.com/photo-1598488035139-bdbb2231ce04?w=480&h=640&fit=crop&auto=format",
    link: "https://www.xiaoyuzhoufm.com",
  },
  {
    title: "听见北大汇丰",
    season: "知识播客",
    platform: "全平台",
    type: "联合出品",
    mc: "北大汇丰",
    tag: "锋芒榜2次",
    img: avatarImg8,
    link: "https://www.xiaoyuzhoufm.com",
  },
  {
    title: "不标准女生·野生女足",
    season: "第一季",
    platform: "腾讯视频",
    type: "联合出品",
    mc: "多位嘉宾",
    tag: "标杆案例",
    img: avatarImg7,
    link: "#marketing",
    isCaseStudy: true,
  },
  {
    title: "不标准女生",
    season: "第二季",
    platform: "即将上线",
    type: "联合出品",
    mc: "TBA",
    tag: "即将上线",
    img: "https://images.unsplash.com/photo-1594744803329-e58b31de8bf5?w=480&h=640&fit=crop&auto=format",
    link: null,
    comingSoon: true,
  },
]

const GUESTS = [
  {
    name: "王天辰",
    tag: "演员",
    img: avatarImg10,
  },
  {
    name: "许魏洲",
    tag: "歌手/演员",
    img: avatarImg11,
  },
  {
    name: "徐浩",
    tag: "歌手/演员/主持人",
    img: avatarImg12,
  },
  {
    name: "曾柯琅",
    tag: "演员",
    img: avatarImg13,
  },
  {
    name: "戴燕妮",
    tag: "歌手/演员",
    img: avatarImg14,
  },
  {
    name: "钟正",
    tag: "演员",
    img: avatarImg15,
  },
]

const STEPS = [
  {
    n: 1,
    label: "需求咨询",
    desc: "确定合作意向后，开展 2 小时线下深度访谈，系统梳理品牌痛点与增长瓶颈，明确核心营销目标。",
  },
  {
    n: 2,
    label: "数据模型",
    desc: "分析目标人群场景气泡图，结合 TGI 数据洞察核心话题与内容切口，建立数据驱动的内容策略基础。",
  },
  {
    n: 3,
    label: "心智口号",
    desc: '提炼品牌核心广告语并转化为节目名（如"你只管出发"），占领小红书/抖音高搜索量 SEO 关键词。',
  },
  {
    n: 4,
    label: "行为地图",
    desc: "分析消费者行为节点，将品牌触达工具对应填入（如线下爆发铺垫进店率提升），构建全链路行动地图。",
  },
  {
    n: 5,
    label: "嘉宾确定",
    desc: '主持人符合品牌表达调性，嘉宾矩阵兼顾专业深度与流量热度，执行"专业前置+流量穿插"出牌策略。',
  },
  {
    n: 6,
    label: "内容执行",
    desc: "专业制片人统筹排期拍摄，同步对接腾讯视频/小红书/播客平台资源位，确保内容发行效率最大化。",
  },
  {
    n: 7,
    label: "营销跟进",
    desc: "TVC 预热引流、短视频切片多平台导流、KOC 精准投放、KOL 权益协同与业内 PR 矩阵覆盖。",
  },
  {
    n: 8,
    label: "结案报告",
    desc: "本季 Campaign 全维度数据复盘，包含传播数据、转化漏斗、ROI 分析与下一季度策略建议交付。",
  },
]

const COMPARE_ROWS = [
  { item: "品牌形象片（TVC）", trad: "¥30万+", super: "✓ 含" },
  { item: "内容营销策划（月）", trad: "¥10万 × 12", super: "✓ 含" },
  { item: "头部嘉宾资源对接", trad: "¥20-50万/次", super: "✓ 含" },
  { item: "视频播客制作（季）", trad: "¥80万+", super: "✓ 含" },
  { item: "平台资源位投放", trad: "¥30万+", super: "✓ 含" },
  { item: "KOL/KOC 传播矩阵", trad: "¥50万+", super: "✓ 含" },
  { item: "结案数据分析报告", trad: "¥5万+", super: "✓ 含" },
  { item: "合计", trad: "¥330万+", super: "¥120万起" },
]

const VALUES_LIST = [
  {
    title: "只找同路人",
    detail:
      "世界没有对错，只找价值观一致的同路人。我们不追求规模的膨胀，而是追求与志同道合者一起做真正有意义的事。超级内容的每一段合作，都是一次价值观的双向筛选。",
  },
  {
    title: "回到自己",
    detail:
      '让超级内容回归"人感"。在算法和数据主导的内容时代，我们坚持相信人的感受、人的温度、人的真实表达才是内容最不可替代的核心。',
  },
  {
    title: "做难而正确的事，哪怕被人嘲笑",
    detail:
      "播客不是流量洼地，内容全案不是市场主流，但我们相信它是对的。被误解是前行者的宿命，我们选择继续向前。",
  },
  {
    title: "少即是多，舍即是得",
    detail:
      "我们不做大而全的平台，不追求品类的横向扩张。专注播客内容与品牌全案，用减法换取深度，用克制换取精准。",
  },
  {
    title: "做时间的朋友",
    detail:
      "好内容需要时间积累，好品牌需要时间沉淀。我们拒绝短视的ROI焦虑，陪伴品牌做有耐心的长期主义营销。",
  },
  {
    title: "让好内容无须自证就能赚到钱",
    detail:
      "我们相信内容本身就是最好的商业模型。不靠补贴，不靠流量买量，靠内容本身的质量和口碑驱动增长。",
  },
  {
    title: "因为相信所以看见",
    detail:
      "超级内容的存在本身就是一种信念——相信内容的力量，相信真实表达的价值，相信用户会为真正好的内容付费。",
  },
  {
    title: "每天为明年种下一棵树",
    detail:
      "我们今天做的每一期节目、每一次深度合作、每一篇方法论输出，都是在为明年乃至更长远的未来播种。",
  },
  {
    title: "做一个聪明而又笨拙的人",
    detail:
      "聪明在于看清方向，笨拙在于不走捷径。我们不追风口，不蹭热点，一步一个脚印做真正有积累价值的内容。",
  },
  {
    title: "只赚增量的钱",
    detail:
      "而不是把别人口袋里的钱掏过来。我们服务的每一个品牌，都应该因为与我们的合作而获得真实的增量价值，而不是零和博弈。",
  },
  {
    title: '做小而"美"，不是大而全',
    detail:
      "美是极致，全是平庸。超级内容宁愿做一件事到极致，也不做十件事流于平常。我们的竞争力来自专注，而非规模。",
  },
]

const MEDIA_CARDS = [
  {
    tag: "融资新闻",
    title: "超级内容宣布完成300万天使轮融资",
    desc: "成为近年来唯一获得资本青睐的播客公司，千将资本独家投资。",
    link: "#",
  },
  {
    tag: "行业洞察",
    title: "品牌客户高复购：超级内容续约背后的营销逻辑",
    desc: "客户为何连续续约？我们深入拆解超级内容服务的核心竞争力。",
    link: "#",
  },
  {
    tag: "模式解析",
    title: "为什么说超级内容重新定义了品牌播客？",
    desc: "从单一制作到全案营销，超级内容如何让播客成为增长引擎？",
    link: "#",
  },
]

// ─── Canvas Particle Hero ────────────────────────────────────────────────────
function ParticleCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const mouse = useRef({ x: -9999, y: -9999 })
  const particles = useRef<Particle[]>([])
  const rafRef = useRef<number>(0)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext("2d")!
    const resize = () => {
      canvas.width = canvas.offsetWidth
      canvas.height = canvas.offsetHeight
    }
    resize()
    window.addEventListener("resize", resize)

    const count = Math.floor((canvas.width * canvas.height) / 8000)
    particles.current = Array.from({ length: count }, () => ({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      vx: (Math.random() - 0.5) * 0.4,
      vy: (Math.random() - 0.5) * 0.4,
      size: Math.random() * 1.5 + 0.5,
      alpha: Math.random() * 0.4 + 0.1,
    }))

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)
      const mx = mouse.current.x
      const my = mouse.current.y

      particles.current.forEach((p) => {
        const dx = mx - p.x
        const dy = my - p.y
        const dist = Math.sqrt(dx * dx + dy * dy)
        if (dist < 120) {
          const force = (120 - dist) / 120
          p.vx -= (dx / dist) * force * 0.8
          p.vy -= (dy / dist) * force * 0.8
        }
        p.vx *= 0.98
        p.vy *= 0.98
        p.x += p.vx
        p.y += p.vy
        if (p.x < 0) p.x = canvas.width
        if (p.x > canvas.width) p.x = 0
        if (p.y < 0) p.y = canvas.height
        if (p.y > canvas.height) p.y = 0

        ctx.beginPath()
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2)
        ctx.fillStyle = `rgba(162,255,39,${p.alpha})`
        ctx.fill()
      })

      // draw connecting lines
      particles.current.forEach((a, i) => {
        particles.current.slice(i + 1, i + 5).forEach((b) => {
          const dx = a.x - b.x
          const dy = a.y - b.y
          const dist = Math.sqrt(dx * dx + dy * dy)
          if (dist < 100) {
            ctx.beginPath()
            ctx.moveTo(a.x, a.y)
            ctx.lineTo(b.x, b.y)
            ctx.strokeStyle = `rgba(162,255,39,${0.08 * (1 - dist / 100)})`
            ctx.lineWidth = 0.5
            ctx.stroke()
          }
        })
      })

      rafRef.current = requestAnimationFrame(draw)
    }
    draw()

    const onMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect()
      mouse.current = { x: e.clientX - rect.left, y: e.clientY - rect.top }
    }
    const onLeave = () => {
      mouse.current = { x: -9999, y: -9999 }
    }
    canvas.addEventListener("mousemove", onMove)
    canvas.addEventListener("mouseleave", onLeave)

    return () => {
      window.removeEventListener("resize", resize)
      canvas.removeEventListener("mousemove", onMove)
      canvas.removeEventListener("mouseleave", onLeave)
      cancelAnimationFrame(rafRef.current)
    }
  }, [])

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: "absolute",
        inset: 0,
        width: "100%",
        height: "100%",
      }}
    />
  )
}

// ─── Toast ───────────────────────────────────────────────────────────────────
function Toast({ msg, visible }: { msg: string; visible: boolean }) {
  return (
    <div
      style={{
        position: "fixed",
        bottom: "32px",
        left: "50%",
        transform: `translateX(-50%) translateY(${visible ? "0" : "20px"})`,
        opacity: visible ? 1 : 0,
        transition: "all 0.3s cubic-bezier(0.34,1.56,0.64,1)",
        background: GREEN,
        color: "#050505",
        fontWeight: 700,
        fontSize: "14px",
        letterSpacing: "0.04em",
        padding: "14px 28px",
        borderRadius: "8px",
        boxShadow: `0 0 30px rgba(162,255,39,0.5)`,
        zIndex: 9999,
        pointerEvents: "none",
      }}
    >
      {msg}
    </div>
  )
}

// ─── Main App ────────────────────────────────────────────────────────────────
export default function App() {
  const [scrolled, setScrolled] = useState(false)
  const [activeSection, setActiveSection] = useState("about")
  const [activeStep, setActiveStep] = useState(0)
  const [page, setPage] = useState<"main" | "case-study">("main")
  const [openValue, setOpenValue] = useState<number | null>(null)
  const [showSwiper, setShowSwiper] = useState(0)
  const [toast, setToast] = useState(false)
  const [formLoading, setFormLoading] = useState(false)
  const [formSuccess, setFormSuccess] = useState(false)
  const [hoveredGuest, setHoveredGuest] = useState<number | null>(null)
  const [hoveredFounder, setHoveredFounder] = useState<number | null>(null)
  const nameInputRef = useRef<HTMLInputElement>(null)
  const contactRef = useRef<HTMLElement>(null)

  // Scroll effects
  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 100)
      const sections = NAV_SECTIONS.map((s) => document.getElementById(s.href))
      let current = "about"
      sections.forEach((el) => {
        if (el && window.scrollY >= el.offsetTop - 120) current = el.id
      })
      setActiveSection(current)
    }
    window.addEventListener("scroll", onScroll, { passive: true })
    return () => window.removeEventListener("scroll", onScroll)
  }, [])

  const scrollTo = useCallback((id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" })
  }, [])

  const handleCTA = () => {
    contactRef.current?.scrollIntoView({ behavior: "smooth" })
    setTimeout(() => nameInputRef.current?.focus(), 800)
  }

  const copyEmail = async () => {
    await navigator.clipboard.writeText("Bd@superaha.com")
    setToast(true)
    setTimeout(() => setToast(false), 2500)
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setFormLoading(true)
    setTimeout(() => {
      setFormLoading(false)
      setFormSuccess(true)
    }, 1800)
  }

  const goToCaseStudy = useCallback(() => {
    setPage("case-study")
    window.scrollTo({ top: 0, behavior: "smooth" })
  }, [])

  const backToMain = useCallback(() => {
    setPage("main")
    window.scrollTo({ top: 0, behavior: "instant" })
  }, [])

  const swiperPrev = () =>
    setShowSwiper((i) => (i - 1 + SHOWS_OWN.length) % SHOWS_OWN.length)
  const swiperNext = () => setShowSwiper((i) => (i + 1) % SHOWS_OWN.length)

  // Shared styles
  const S = {
    section: {
      maxWidth: 1200,
      margin: "0 auto",
      padding: "120px 40px",
    } as React.CSSProperties,
    sectionLabel: {
      fontSize: 11,
      letterSpacing: "0.3em",
      color: GREEN,
      fontWeight: 600,
      marginBottom: 16,
      display: "block",
    } as React.CSSProperties,
    h2: {
      fontFamily: "'Outfit', sans-serif",
      fontWeight: 800,
      fontSize: "clamp(36px,5vw,60px)",
      lineHeight: 1.1,
      marginBottom: 24,
    } as React.CSSProperties,
    card: {
      background: "#1F1F1F",
      border: "1px solid rgba(255,255,255,0.06)",
      borderRadius: 12,
    } as React.CSSProperties,
    greenText: { color: GREEN } as React.CSSProperties,
  }

  if (page === "case-study") {
    return <CaseStudyPage onBack={backToMain} />
  }

  return (
    <div style={{ background: "#050505", color: "#fff", minHeight: "100vh" }}>
      <Toast msg="邮箱已复制到剪贴板！" visible={toast} />

      {/* ── NAV ──────────────────────────────────────────────────────────────── */}
      <nav
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          right: 0,
          zIndex: 200,
          height: 64,
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          padding: "0 40px",
          background: scrolled ? "rgba(5,5,5,0.85)" : "transparent",
          backdropFilter: scrolled ? "blur(12px)" : "none",
          borderBottom: scrolled
            ? "1px solid rgba(162,255,39,0.1)"
            : "1px solid transparent",
          transition: "all 0.4s ease",
        }}
      >
        {/* Logo */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 10,
            cursor: "pointer",
          }}
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
        >
          <div
            style={{
              width: 28,
              height: 28,
              background: GREEN,
              borderRadius: 6,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: 13,
              fontWeight: 900,
              color: "#050505",
              animation: "glow-pulse 2.5s ease-in-out infinite",
            }}
          >
            S
          </div>
          <span
            style={{ fontWeight: 800, fontSize: 16, letterSpacing: "0.02em" }}
          >
            Superaha <span style={{ color: GREEN }}>超级内容</span>
          </span>
        </div>

        {/* Nav links */}
        <div style={{ display: "flex", gap: 32, alignItems: "center" }}>
          {NAV_SECTIONS.map((s) => (
            <button
              key={s.href}
              onClick={() => s.href === "case-study" ? goToCaseStudy() : scrollTo(s.href)}
              style={{
                background: "none",
                border: "none",
                cursor: "pointer",
                fontSize: 14,
                fontWeight: 500,
                letterSpacing: "0.04em",
                color: activeSection === s.href ? GREEN : "#8C8C8C",
                borderBottom:
                  activeSection === s.href
                    ? `2px solid ${GREEN}`
                    : "2px solid transparent",
                paddingBottom: 2,
                transition: "all 0.2s",
              }}
              onMouseEnter={(e) => {
                if (activeSection !== s.href)
                  e.currentTarget.style.color = "#fff"
              }}
              onMouseLeave={(e) => {
                if (activeSection !== s.href)
                  e.currentTarget.style.color = "#8C8C8C"
              }}
            >
              {s.label}
            </button>
          ))}
        </div>

        {/* CTA */}
        <button
          onClick={handleCTA}
          style={{
            background: GREEN,
            color: "#050505",
            border: "none",
            borderRadius: 8,
            padding: "10px 20px",
            fontWeight: 700,
            fontSize: 13,
            letterSpacing: "0.04em",
            cursor: "pointer",
            boxShadow: `0 0 12px rgba(162,255,39,0.3)`,
            transition: "all 0.2s",
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.boxShadow = "0 0 24px rgba(162,255,39,0.6)"
            e.currentTarget.style.transform = "scale(1.04)"
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.boxShadow = "0 0 12px rgba(162,255,39,0.3)"
            e.currentTarget.style.transform = "scale(1)"
          }}
        >
          预约 2H 需求访谈
        </button>
      </nav>

      {/* ── HERO ─────────────────────────────────────────────────────────────── */}
      <section
        style={{
          position: "relative",
          minHeight: "100vh",
          display: "flex",
          alignItems: "center",
          overflow: "hidden",
          background: "#050505",
        }}
      >
        <ParticleCanvas />
        <div
          style={{
            position: "relative",
            zIndex: 1,
            ...S.section,
            paddingTop: 140,
          }}
        >
          <div style={{ maxWidth: 820 }}>
            <span style={S.sectionLabel}>SUPERAHA · 超级内容 · Est.2025</span>
            <h1
              style={{
                fontWeight: 800,
                fontFamily: "'Orelega One', serif",
                fontSize: "clamp(40px,6.5vw,84px)",
                lineHeight: 1.05,
                fontStyle: "normal",
                marginTop: 0,
                marginRight: -102,
                marginBottom: 7,
                marginLeft: 0,
                letterSpacing: "-0.01em",
              }}
            >
              超级内容，
              <br />
              <span style={{ color: GREEN }}>不止</span>是一家播客公司。
            </h1>

            {/* Description badge card */}
            <div
              style={{
                background: "rgba(31,31,31,0.9)",
                border: `1px solid rgba(162,255,39,0.2)`,
                borderRadius: 12,
                padding: "28px 32px",
                marginBottom: 40,
                maxWidth: 640,
                backdropFilter: "blur(8px)",
              }}
            >
              <p
                style={{
                  fontSize: 15,
                  lineHeight: 1.8,
                  color: "#c0c0c0",
                  marginBottom: 20,
                }}
              >
                我们是一家以"<strong style={{ color: "#fff" }}>真实</strong>
                "为灵魂、以"<strong style={{ color: "#fff" }}>增长策略</strong>
                "为交付的内容整合营销机构。旗下拥有《坐三观五六》《不标准女生》《每周聊夏》等多元自营与联合出品矩阵。我们打破传统品牌播客的单一制作模式，用全案商业逻辑将视频播客打造为集
                TVC、种草、SEO、线下与电商于一体的超级营销矩阵。
              </p>
              <button
                onClick={() => scrollTo("about")}
                style={{
                  background: "none",
                  border: `1px solid ${GREEN}`,
                  color: GREEN,
                  borderRadius: 6,
                  padding: "8px 18px",
                  fontSize: 13,
                  fontWeight: 600,
                  cursor: "pointer",
                  transition: "all 0.2s",
                  letterSpacing: "0.04em",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.background = GREEN
                  e.currentTarget.style.color = "#050505"
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.background = "none"
                  e.currentTarget.style.color = GREEN
                }}
              >
                了解详细 →
              </button>
            </div>

            {/* Button group */}
            <div style={{ display: "flex", gap: 16, flexWrap: "wrap" }}>
              <button
                onClick={() => scrollTo("marketing")}
                style={{
                  background: GREEN,
                  color: "#050505",
                  border: `2px solid ${GREEN}`,
                  borderRadius: 8,
                  padding: "16px 32px",
                  fontWeight: 800,
                  fontSize: 15,
                  cursor: "pointer",
                  transition: "all 0.2s",
                  letterSpacing: "0.02em",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.boxShadow =
                    "0 0 24px rgba(162,255,39,0.5)"
                  e.currentTarget.style.transform = "translateY(-2px)"
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.boxShadow = "none"
                  e.currentTarget.style.transform = "none"
                }}
              >
                探索全案营销逻辑 ↓
              </button>
              <button
                onClick={() => scrollTo("about")}
                style={{
                  background: "transparent",
                  color: "#fff",
                  border: "2px solid rgba(255,255,255,0.3)",
                  borderRadius: 8,
                  padding: "16px 32px",
                  fontWeight: 600,
                  fontSize: 15,
                  cursor: "pointer",
                  transition: "all 0.2s",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.background = "#fff"
                  e.currentTarget.style.color = "#050505"
                  e.currentTarget.style.borderColor = "#fff"
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.background = "transparent"
                  e.currentTarget.style.color = "#fff"
                  e.currentTarget.style.borderColor = "rgba(255,255,255,0.3)"
                }}
              >
                了解详细
              </button>
            </div>
          </div>

          {/* Data stats */}
          <div
            style={{
              display: "flex",
              gap: 48,
              marginTop: 80,
              flexWrap: "wrap",
              borderRadius: 0,
              border: "none",
              opacity: 1,
            }}
          >
            {[
              { n: "300万", label: "天使轮融资", sub: "千将资本" },
              { n: "11次", label: "新星榜上榜", sub: "《每周聊夏》" },
              { n: "327万+", label: "粉丝矩阵", sub: "合伙人朱元冰" },
              { n: "120万起", label: "全案营销预算", sub: "交钥匙方案" },
            ].map((d) => (
              <div key={d.label}>
                <div
                  style={{
                    fontWeight: 900,
                    fontSize: "clamp(24px,3vw,36px)",
                    color: GREEN,
                    lineHeight: 1,
                  }}
                >
                  {d.n}
                </div>
                <div
                  style={{
                    fontSize: 13,
                    color: "#fff",
                    fontWeight: 600,
                    marginTop: 6,
                  }}
                >
                  {d.label}
                </div>
                <div
                  style={{
                    fontSize: 11,
                    color: "#8C8C8C",
                    marginTop: 3,
                    fontFamily: "'DM Mono', monospace",
                  }}
                >
                  {d.sub}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── ABOUT ────────────────────────────────────────────────────────────── */}
      <section id="about" style={{ background: "#0a0a0a", padding: "120px 0" }}>
        <div style={S.section}>
          <span style={S.sectionLabel}>ABOUT US</span>
          <h2 style={S.h2}>关于我们</h2>

          {/* Investment card */}
          <div
            style={{
              background: "linear-gradient(135deg, #0f1a00, #1a2d00)",
              border: `1px solid ${GREEN}`,
              borderRadius: 16,
              padding: "32px 40px",
              marginBottom: 64,
              boxShadow: `0 0 40px rgba(162,255,39,0.15)`,
              display: "flex",
              alignItems: "center",
              gap: 32,
              flexWrap: "wrap",
            }}
          >
            <div
              style={{
                background: GREEN,
                color: "#050505",
                fontWeight: 900,
                fontSize: 13,
                letterSpacing: "0.12em",
                padding: "8px 16px",
                borderRadius: 6,
                flexShrink: 0,
              }}
            >
              超级内容
            </div>
            <div>
              <div style={{ fontWeight: 800, fontSize: 22, marginBottom: 8 }}>
                <span style={{ color: GREEN }}>300万 天使轮融资</span>
              </div>
              <div style={{ fontSize: 14, color: "#c0c0c0", lineHeight: 1.7 }}>
                2025 年 12 月，超级内容宣布获得
                <strong style={{ color: "#fff" }}>千将资本</strong> 300
                万元天使轮融资， 成为近年来
                <strong style={{ color: GREEN }}>
                  唯一获得资本青睐的播客公司
                </strong>
                。
              </div>
            </div>
          </div>


          {/* Brand story */}
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "1fr 1fr",
              gap: 64,
              marginBottom: 80,
              alignItems: "center",
            }}
          >
            <div>
              <h3 style={{ fontWeight: 700, fontSize: 28, marginBottom: 20 }}>
                品牌故事
              </h3>
              <p style={{ fontSize: 15, lineHeight: 1.9, color: "#c0c0c0" }}>
                超级内容成立于 <strong style={{ color: GREEN }}>2025 年</strong>
                ，总部位于上海北外滩。由业内知名内容营销策略专家、前上市公司营销顾问
                <strong style={{ color: "#fff" }}>夏翰杰</strong>，前美特斯邦威
                CMO、中国营销 20 人
                <strong style={{ color: "#fff" }}>周龙</strong>
                ，以及中国内地演员、偶像歌手
                <strong style={{ color: "#fff" }}>朱元冰</strong>联合创立。
              </p>
              <p
                style={{
                  fontSize: 15,
                  lineHeight: 1.9,
                  color: "#c0c0c0",
                  marginTop: 16,
                }}
              >
                公司着力以播客赛道为根基，衍生布局超级内容营销、超级内容出品、超级内容出海、超级内容电商四大核心板块，用商业全案逻辑重新定义"品牌播客"这一内容容器。
              </p>
            </div>
            <div style={{ position: "relative" }}>
              <img
                src={avatarImg9}
                alt="团队"
                style={{
                  width: "100%",
                  borderRadius: 12,
                  objectFit: "cover",
                  height: 320,
                }}
              />
              <div
                style={{
                  position: "absolute",
                  bottom: -20,
                  right: -20,
                  background: "#1F1F1F",
                  border: `1px solid rgba(162,255,39,0.3)`,
                  borderRadius: 10,
                  padding: "16px 20px",
                }}
              >
                <div
                  style={{
                    fontFamily: "'DM Mono', monospace",
                    fontSize: 10,
                    color: "#8C8C8C",
                    letterSpacing: "0.1em",
                    marginBottom: 4,
                  }}
                >
                  HEADQUARTERED
                </div>
                <div style={{ fontWeight: 700, fontSize: 15 }}>上海·北外滩</div>
              </div>
            </div>
          </div>

          {/* Founders */}
          <h3 style={{ fontWeight: 700, fontSize: 28, marginBottom: 32 }}>
            创始人智囊阵营
          </h3>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(3,1fr)",
              gap: 24,
              marginBottom: 80,
            }}
          >
            {FOUNDERS.map((f, i) => (
              <div
                key={i}
                style={{
                  ...S.card,
                  padding: 32,
                  position: "relative",
                  transition: "all 0.3s",
                  border:
                    hoveredFounder === i
                      ? `1px solid ${GREEN}`
                      : "1px solid rgba(255,255,255,0.06)",
                  transform: hoveredFounder === i ? "translateY(-6px)" : "none",
                }}
                onMouseEnter={() => setHoveredFounder(i)}
                onMouseLeave={() => setHoveredFounder(null)}
              >
                <img
                  src={f.img}
                  alt={f.name}
                  style={{
                    width: 72,
                    height: 72,
                    objectFit: "cover",
                    borderRadius: "50%",
                    border: `2px solid rgba(162,255,39,0.3)`,
                    marginBottom: 16,
                  }}
                />
                <div style={{ fontWeight: 800, fontSize: 20, marginBottom: 4 }}>
                  {f.name}
                </div>
                <div
                  style={{
                    fontSize: 12,
                    color: GREEN,
                    letterSpacing: "0.08em",
                    fontWeight: 600,
                    marginBottom: 16,
                  }}
                >
                  {f.title}
                </div>
                <p
                  style={{
                    fontSize: 13,
                    color: "#A2FF27",
                    fontStyle: "italic",
                    lineHeight: 1.7,
                    marginBottom: 16,
                    borderLeft: `2px solid ${GREEN}`,
                    paddingLeft: 12,
                  }}
                >
                  {f.quote}
                </p>
                <p
                  style={{
                    fontSize: 13,
                    color: "#8C8C8C",
                    lineHeight: 1.7,
                    marginBottom: f.book ? 20 : 0,
                  }}
                >
                  {f.bio}
                </p>
                {f.book && (
                  <a
                    href={f.bookLink!}
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{
                      display: "inline-flex",
                      alignItems: "center",
                      gap: 6,
                      background: "rgba(162,255,39,0.1)",
                      border: `1px solid rgba(162,255,39,0.3)`,
                      borderRadius: 6,
                      padding: "8px 14px",
                      color: GREEN,
                      fontSize: 12,
                      fontWeight: 600,
                      textDecoration: "none",
                      transition: "all 0.2s",
                      marginTop: 4,
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.background = GREEN
                      e.currentTarget.style.color = "#050505"
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.background = "rgba(162,255,39,0.1)"
                      e.currentTarget.style.color = GREEN
                    }}
                  >
                    📚 微信读书 · {f.book} ↗
                  </a>
                )}
              </div>
            ))}
          </div>

          {/* 4 Business pillars */}
          <h3 style={{ fontWeight: 700, fontSize: 28, marginBottom: 32 }}>
            四大业务布局
          </h3>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(2,1fr)",
              gap: 2,
            }}
          >
            {BUSINESSES.map((b, i) => (
              <div
                key={i}
                onClick={i === 2 ? goToCaseStudy : undefined}
                style={{
                  background: i % 2 === 0 ? "#111" : "#0f0f0f",
                  border: "1px solid rgba(255,255,255,0.04)",
                  padding: "36px 40px",
                  cursor: i === 2 ? "pointer" : "default",
                  transition: "all 0.3s",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.borderColor = GREEN
                  e.currentTarget.style.transform = "translateY(-5px)"
                  e.currentTarget.style.background = "#161a0d"
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.borderColor = "rgba(255,255,255,0.04)"
                  e.currentTarget.style.transform = "none"
                  e.currentTarget.style.background =
                    i % 2 === 0 ? "#111" : "#0f0f0f"
                }}
              >
                <div style={{ fontSize: 32, marginBottom: 16 }}>{b.icon}</div>
                <div
                  style={{
                    fontWeight: 800,
                    fontSize: 20,
                    marginBottom: 10,
                    color: "#fff",
                  }}
                >
                  {b.name}
                </div>
                <div
                  style={{ fontSize: 14, color: "#8C8C8C", lineHeight: 1.7 }}
                >
                  {b.desc}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── SHOW MATRIX ──────────────────────────────────────────────────────── */}
      <section id="matrix" style={{ padding: "120px 0" }}>
        <div style={S.section}>
          <span style={S.sectionLabel}>SHOW MATRIX</span>
          <h2 style={S.h2}>超级节目矩阵</h2>

          {/* Featured show */}
          {(() => {
            const show = SHOWS_OWN[showSwiper]
            return (
              <div style={{ borderRadius: 16, overflow: "hidden", position: "relative", marginBottom: 16, height: 460 }}>
                {/* Poster */}
                <img
                  src={show.img}
                  alt={show.title}
                  style={{ width: "100%", height: "100%", objectFit: "cover", display: "block", transition: "transform 0.5s ease" }}
                />
                {/* Bottom gradient for text legibility */}
                <div style={{
                  position: "absolute", inset: 0,
                  background: "linear-gradient(to top, rgba(5,5,5,0.92) 0%, rgba(5,5,5,0.5) 45%, transparent 100%)",
                }} />
                {/* Text content */}
                <div style={{
                  position: "absolute", bottom: 0, left: 0, right: 0,
                  padding: "40px 48px",
                }}>
                  <div style={{ display: "flex", gap: 8, marginBottom: 14, flexWrap: "wrap" }}>
                    <span style={{
                      background: show.comingSoon ? "#333" : GREEN,
                      color: show.comingSoon ? "#8C8C8C" : "#050505",
                      fontSize: 11, fontWeight: 700, padding: "4px 10px", borderRadius: 4, letterSpacing: "0.08em",
                    }}>{show.tag}</span>
                    <span style={{ background: "rgba(255,255,255,0.15)", color: "#e0e0e0", fontSize: 11, padding: "4px 10px", borderRadius: 4 }}>
                      {show.type}
                    </span>
                  </div>
                  <h3 style={{ fontWeight: 900, fontSize: "clamp(26px,3.5vw,44px)", lineHeight: 1.1, marginBottom: 10 }}>
                    《{show.title}》
                  </h3>
                  <div style={{ fontSize: 14, color: "#c0c0c0", marginBottom: 0, fontFamily: "'DM Mono', monospace" }}>
                    {show.season} · 平台：{show.platform} · MC：{show.mc}
                  </div>
                  {!show.comingSoon && show.link && (
                    <a
                      href={show.isCaseStudy ? "#" : show.link}
                      onClick={show.isCaseStudy ? (e) => { e.preventDefault(); goToCaseStudy() } : undefined}
                      target={show.isCaseStudy ? undefined : "_blank"}
                      rel="noopener noreferrer"
                      style={{
                        display: "inline-flex", alignItems: "center", gap: 6,
                        color: GREEN, fontSize: 14, fontWeight: 700, textDecoration: "none",
                        marginTop: 14, borderBottom: `1px solid ${GREEN}`, paddingBottom: 2, width: "fit-content",
                      }}
                    >{show.isCaseStudy ? "了解详细 →" : "立即收听 →"}</a>
                  )}
                  {show.comingSoon && (
                    <div style={{ color: "#8C8C8C", fontSize: 14, marginTop: 14 }}>敬请期待...</div>
                  )}
                </div>
              </div>
            )
          })()}

          {/* Thumbnail strip — all 5 shows visible */}
          <div style={{ display: "grid", gridTemplateColumns: "repeat(5, 1fr)", gap: 10, marginBottom: 64 }}>
            {SHOWS_OWN.map((show, i) => (
              <div
                key={i}
                onClick={() => setShowSwiper(i)}
                style={{
                  position: "relative", borderRadius: 10, overflow: "hidden",
                  cursor: "pointer", height: 130,
                  border: i === showSwiper ? `2px solid ${GREEN}` : "2px solid transparent",
                  transition: "border-color 0.2s, transform 0.2s",
                  transform: i === showSwiper ? "translateY(-3px)" : "none",
                }}
                onMouseEnter={(e) => { if (i !== showSwiper) e.currentTarget.style.borderColor = "rgba(162,255,39,0.4)" }}
                onMouseLeave={(e) => { if (i !== showSwiper) e.currentTarget.style.borderColor = "transparent" }}
              >
                <img src={show.img} alt={show.title} style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }} />
                <div style={{
                  position: "absolute", inset: 0,
                  background: "linear-gradient(to top, rgba(5,5,5,0.85) 0%, transparent 60%)",
                }} />
                <div style={{ position: "absolute", bottom: 0, left: 0, right: 0, padding: "10px 12px" }}>
                  {show.comingSoon && (
                    <span style={{ fontSize: 9, background: "#333", color: "#8C8C8C", padding: "2px 6px", borderRadius: 3, fontWeight: 700, letterSpacing: "0.06em", display: "block", marginBottom: 4 }}>
                      即将上线
                    </span>
                  )}
                  <div style={{ fontSize: 12, fontWeight: 700, lineHeight: 1.3, color: "#fff" }}>《{show.title}》</div>
                  <div style={{ fontSize: 10, color: i === showSwiper ? GREEN : "#8C8C8C", marginTop: 2 }}>{show.season}</div>
                </div>
              </div>
            ))}
          </div>

          {/* Badges */}
          <div
            style={{
              display: "flex",
              gap: 16,
              flexWrap: "wrap",
              marginBottom: 80,
            }}
          >
            {[
              "11次 新星榜",
              "2次 锋芒榜",
              "腾讯视频官方推荐",
              "播客寻宝推荐",
              "微信公众号推荐",
            ].map((b) => (
              <div
                key={b}
                style={{
                  background: "rgba(162,255,39,0.08)",
                  border: `1px solid rgba(162,255,39,0.3)`,
                  borderRadius: 8,
                  padding: "10px 20px",
                  color: GREEN,
                  fontSize: 13,
                  fontWeight: 700,
                  letterSpacing: "0.04em",
                }}
              >
                {b}
              </div>
            ))}
          </div>

          {/* Guest photo wall */}
          <h3 style={{ fontWeight: 700, fontSize: 28, marginBottom: 12 }}>
            明星与流量嘉宾池
          </h3>
          <p style={{ fontSize: 14, color: "#8C8C8C", marginBottom: 32 }}>
            出牌策略：专业嘉宾前置做深度内容，流量嘉宾穿插带起长尾流量
          </p>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(6,1fr)",
              gap: 12,
            }}
          >
            {GUESTS.map((g, i) => (
              <div
                key={i}
                style={{
                  position: "relative",
                  overflow: "hidden",
                  borderRadius: 10,
                  cursor: "pointer",
                  aspectRatio: "3/4",
                }}
                onMouseEnter={() => setHoveredGuest(i)}
                onMouseLeave={() => setHoveredGuest(null)}
              >
                <img
                  src={g.img}
                  alt={g.name}
                  style={{
                    width: "100%",
                    height: "100%",
                    objectFit: "cover",
                    filter: hoveredGuest === i ? "none" : "grayscale(100%)",
                    transition: "filter 0.4s ease, transform 0.4s ease",
                    transform: hoveredGuest === i ? "scale(1.08)" : "scale(1)",
                  }}
                />
                <div
                  style={{
                    position: "absolute",
                    inset: 0,
                    background:
                      "linear-gradient(to top, rgba(5,5,5,0.9) 0%, transparent 60%)",
                    opacity: hoveredGuest === i ? 1 : 0.5,
                    transition: "opacity 0.3s",
                  }}
                />
                <div
                  style={{
                    position: "absolute",
                    bottom: 0,
                    left: 0,
                    right: 0,
                    padding: "12px",
                    transform:
                      hoveredGuest === i ? "translateY(0)" : "translateY(8px)",
                    opacity: hoveredGuest === i ? 1 : 0.6,
                    transition: "all 0.3s",
                  }}
                >
                  <div style={{ fontWeight: 700, fontSize: 14 }}>{g.name}</div>
                  <div style={{ fontSize: 11, color: GREEN, fontWeight: 600 }}>
                    {g.tag}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CASE STUDY ───────────────────────────────────────────────────────── */}
      <section style={{ background: "#080808", padding: "80px 0" }}>
        <div style={S.section}>
          <span style={S.sectionLabel}>全案营销标案案例</span>
          <h3 style={{ fontWeight: 700, fontSize: 28, marginBottom: 32 }}>
            标杆结案案例
          </h3>
          <div
            style={{
              background: "#111",
              border: `1px solid rgba(162,255,39,0.2)`,
              borderRadius: 16,
              overflow: "hidden",
              display: "grid",
              gridTemplateColumns: "1fr 1fr",
            }}
          >
            <img
              src={avatarImg7}
              alt="野生女足案例"
              style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }}
            />
            <div
              style={{
                padding: "0 31px",
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
              }}
            >
              <div
                onClick={goToCaseStudy}
                style={{
                  background: GREEN,
                  color: "#050505",
                  fontSize: 11,
                  fontWeight: 700,
                  letterSpacing: "0.12em",
                  padding: "6px 14px",
                  borderRadius: 4,
                  display: "inline-flex",
                  alignItems: "center",
                  gap: 6,
                  marginBottom: 20,
                  width: "fit-content",
                  cursor: "pointer",
                  paddingTop: 6,
                  paddingBottom: 6,
                  transition: "box-shadow 0.2s",
                }}
                onMouseEnter={(e) => { e.currentTarget.style.boxShadow = `0 0 16px rgba(162,255,39,0.5)` }}
                onMouseLeave={(e) => { e.currentTarget.style.boxShadow = "none" }}
              >
                📊 结案报告 →
              </div>
              <h4
                style={{
                  fontWeight: 900, fontSize: 28, marginBottom: 7,
                  marginTop: 0, marginRight: -102, marginLeft: 0,
                  fontStyle: "normal",
                }}
              >
                《不标准女生》
              </h4>
              <div
                style={{
                  fontSize: 13,
                  color: "#8C8C8C",
                  marginBottom: 24,
                  fontFamily: "'DM Mono', monospace",
                  paddingTop: 0,
                  paddingBottom: 0,
                }}
              >
                妖精的口袋 × 不标准女生 × 超级内容
              </div>
              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: "1fr 1fr",
                  gap: 20,
                  marginBottom: 24,
                  paddingTop: 0,
                  paddingRight: 24,
                  paddingBottom: 0,
                  paddingLeft: 0,
                }}
              >
                {[
                  { n: "2000万+", l: "话题曝光量" },
                  { n: "腾讯视频", l: "官方推荐" },
                  { n: "4000+", l: "精准3A增长" },
                  { n: "高复购率", l: "品牌客户续约" },
                ].map((d) => (
                  <div key={d.l} style={{ paddingTop: 0, paddingRight: 12, paddingBottom: 42, paddingLeft: 46 }}>
                    <div style={{ fontWeight: 800, fontSize: 20, color: GREEN }}>{d.n}</div>
                    <div style={{ fontSize: 12, color: "#8C8C8C", marginTop: 4 }}>{d.l}</div>
                  </div>
                ))}
              </div>
              <p style={{ fontSize: 14, color: "#8C8C8C", lineHeight: 1.7 }}>
                为《妖精的口袋》品牌策划以女足为核心叙事，联合腾讯视频与不标准女生打造现象级内容营销案例，实现内容破圈与电商转化的双赢闭环。
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ── MARKETING ────────────────────────────────────────────────────────── */}
      <section
        id="marketing"
        style={{ background: "#080808", padding: "120px 0" }}
      >
        <div style={S.section}>
          <span style={S.sectionLabel}>FULL-FUNNEL MARKETING</span>
          <h2 style={S.h2}>品牌全案营销</h2>

          {/* Zhou Long quote */}
          <div
            style={{
              borderLeft: `4px solid ${GREEN}`,
              paddingLeft: 28,
              marginBottom: 64,
              maxWidth: 720,
            }}
          >
            <p
              style={{
                fontSize: "clamp(16px,2vw,22px)",
                lineHeight: 1.7,
                fontWeight: 600,
                fontStyle: "italic",
                color: "#e0e0e0",
              }}
            >
              "用商业全案的逻辑，重新定义'品牌播客'这一容器。体力可以被 AI
              取代，但是脑力和整合策略不会。"
            </p>
            <div
              style={{
                fontSize: 12,
                color: "#8C8C8C",
                marginTop: 12,
                fontFamily: "'DM Mono', monospace",
              }}
            >
              — 周龙，联合创始人
            </div>
          </div>

          {/* 8-step process */}
          <h3 style={{ fontWeight: 700, fontSize: 28, marginBottom: 12 }}>
            8 步合作流程
          </h3>
          <p style={{ fontSize: 14, color: "#8C8C8C", marginBottom: 36 }}>
            点击任意步骤节点查看详细作业描述
          </p>

          {/* Step tabs */}
          <div
            style={{
              display: "flex",
              gap: 0,
              overflowX: "auto",
              marginBottom: 32,
              borderBottom: "1px solid rgba(255,255,255,0.08)",
            }}
          >
            {STEPS.map((s, i) => (
              <button
                key={i}
                onClick={() => setActiveStep(i)}
                style={{
                  background: "none",
                  border: "none",
                  cursor: "pointer",
                  padding: "14px 20px",
                  fontWeight: 700,
                  fontSize: 13,
                  color: activeStep === i ? GREEN : "#8C8C8C",
                  borderBottom:
                    activeStep === i
                      ? `2px solid ${GREEN}`
                      : "2px solid transparent",
                  transition: "all 0.2s",
                  whiteSpace: "nowrap",
                  letterSpacing: "0.04em",
                  marginBottom: -1,
                }}
              >
                <span
                  style={{
                    fontFamily: "'DM Mono', monospace",
                    fontSize: 11,
                    marginRight: 8,
                    opacity: 0.6,
                  }}
                >
                  {String(s.n).padStart(2, "0")}
                </span>
                {s.label}
              </button>
            ))}
          </div>

          {/* Step detail */}
          <div
            style={{
              background: "#111",
              border: `1px solid rgba(162,255,39,0.2)`,
              borderRadius: 12,
              padding: "32px 40px",
              marginBottom: 80,
              minHeight: 120,
            }}
          >
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: 16,
                marginBottom: 16,
              }}
            >
              <span
                style={{
                  background: GREEN,
                  color: "#050505",
                  fontWeight: 900,
                  fontSize: 14,
                  width: 36,
                  height: 36,
                  borderRadius: "50%",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  flexShrink: 0,
                }}
              >
                {STEPS[activeStep].n}
              </span>
              <span style={{ fontWeight: 800, fontSize: 22 }}>
                {STEPS[activeStep].label}
              </span>
            </div>
            <p
              style={{
                fontSize: 15,
                lineHeight: 1.8,
                color: "#c0c0c0",
                maxWidth: 720,
              }}
            >
              {STEPS[activeStep].desc}
            </p>
            {activeStep === 0 && (
              <p
                style={{
                  fontSize: 12,
                  color: "#8C8C8C",
                  marginTop: 16,
                  fontFamily: "'DM Mono', monospace",
                }}
              >
                附注 1：版权归双方及平台共有 ｜ 附注 2：切片内容多阵地布局
              </p>
            )}
          </div>

          {/* Comparison table */}
          <h3 style={{ fontWeight: 700, fontSize: 28, marginBottom: 12 }}>
            降维打击：价值算术题
          </h3>
          <div style={{ marginBottom: 24 }}>
            <p style={{ fontSize: 14, color: "#8C8C8C", marginBottom: 16 }}>
              预算：<strong style={{ color: GREEN }}>¥120万起</strong>
            </p>
            <div
              style={{
                borderLeft: `3px solid ${GREEN}`,
                paddingLeft: 20,
                background: "rgba(162,255,39,0.04)",
                padding: "20px 24px",
                borderRadius: 8,
                maxWidth: 680,
                marginBottom: 36,
              }}
            >
              <p
                style={{
                  fontSize: 15,
                  fontStyle: "italic",
                  color: "#e0e0e0",
                  lineHeight: 1.7,
                }}
              >
                "在 AI 盛行的当下，与其每个月花 10
                万不痛不痒，不如攒一年不痛不痒的钱做一次有用的营销。"
              </p>
              <div
                style={{
                  fontSize: 12,
                  color: "#8C8C8C",
                  marginTop: 10,
                  fontFamily: "'DM Mono', monospace",
                }}
              >
                — 夏翰杰，创始人
              </div>
            </div>
          </div>

          <div
            style={{ overflowX: "auto", borderRadius: 12, overflow: "hidden" }}
          >
            <table
              style={{
                width: "100%",
                borderCollapse: "collapse",
                minWidth: 600,
              }}
            >
              <thead>
                <tr>
                  <th
                    style={{
                      padding: "16px 24px",
                      textAlign: "left",
                      background: "#111",
                      fontSize: 12,
                      color: "#8C8C8C",
                      letterSpacing: "0.1em",
                      fontWeight: 600,
                    }}
                  >
                    采购项目
                  </th>
                  <th
                    style={{
                      padding: "16px 24px",
                      textAlign: "center",
                      background: "#111",
                      fontSize: 12,
                      color: "#8C8C8C",
                      letterSpacing: "0.1em",
                      fontWeight: 600,
                    }}
                  >
                    传统单项采购
                  </th>
                  <th
                    style={{
                      padding: "16px 24px",
                      textAlign: "center",
                      background: "rgba(162,255,39,0.08)",
                      fontSize: 12,
                      color: GREEN,
                      letterSpacing: "0.1em",
                      fontWeight: 700,
                      borderLeft: `2px solid ${GREEN}`,
                      borderTop: `2px solid ${GREEN}`,
                      borderRight: `2px solid ${GREEN}`,
                    }}
                  >
                    超级内容全案（交钥匙）
                  </th>
                </tr>
              </thead>
              <tbody>
                {COMPARE_ROWS.map((r, i) => {
                  const isLast = i === COMPARE_ROWS.length - 1
                  return (
                    <tr
                      key={i}
                      style={{
                        borderBottom: "1px solid rgba(255,255,255,0.04)",
                      }}
                    >
                      <td
                        style={{
                          padding: "14px 24px",
                          fontSize: 14,
                          color: isLast ? "#fff" : "#c0c0c0",
                          fontWeight: isLast ? 700 : 400,
                        }}
                      >
                        {r.item}
                      </td>
                      <td
                        style={{
                          padding: "14px 24px",
                          textAlign: "center",
                          fontSize: 14,
                          color: isLast ? "#ff6b6b" : "#8C8C8C",
                          fontWeight: isLast ? 800 : 400,
                          background: "#0a0a0a",
                        }}
                      >
                        {r.trad}
                      </td>
                      <td
                        style={{
                          padding: "14px 24px",
                          textAlign: "center",
                          fontSize: 14,
                          color: isLast ? "#050505" : GREEN,
                          fontWeight: isLast ? 900 : 600,
                          background: isLast ? GREEN : "rgba(162,255,39,0.06)",
                          borderLeft: `2px solid ${GREEN}`,
                          borderRight: `2px solid ${GREEN}`,
                          borderBottom: isLast ? `2px solid ${GREEN}` : "none",
                          boxShadow: isLast
                            ? `0 0 20px rgba(162,255,39,0.3)`
                            : "none",
                        }}
                      >
                        {r.super}
                      </td>
                    </tr>
                  )
                })}
              </tbody>
            </table>
          </div>

        </div>
      </section>

      {/* ── VALUES ───────────────────────────────────────────────────────────── */}
      <section id="values" style={{ padding: "120px 0" }}>
        <div style={S.section}>
          <span style={S.sectionLabel}>OUR VALUES</span>
          <h2 style={S.h2}>公司价值观</h2>

          {/* Three pillars */}
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(3,1fr)",
              gap: 24,
              marginBottom: 72,
            }}
          >
            {[
              {
                icon: "🤖",
                title: "AI 时代的人类表达",
                desc: "当机器学会了写作、剪辑与策划，人的情感、直觉与价值判断才是真正不可替代的核心。",
              },
              {
                icon: "🥤",
                title: "内容领域的可口可乐",
                desc: "我们的目标不是最大，而是成为某一领域中最被人记住、最不可替代的存在，如同可口可乐之于饮料。",
              },
              {
                icon: "❤️",
                title: "一切关于人类",
                desc: "所有伟大的内容，最终都指向人——人的困惑、渴望、喜悦与连接。技术是手段，人性是目的。",
              },
            ].map((p, i) => (
              <div
                key={i}
                style={{
                  ...S.card,
                  padding: "36px 32px",
                  transition: "all 0.3s",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.borderColor = GREEN
                  e.currentTarget.style.transform = "translateY(-5px)"
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.borderColor = "rgba(255,255,255,0.06)"
                  e.currentTarget.style.transform = "none"
                }}
              >
                <div style={{ fontSize: 36, marginBottom: 16 }}>{p.icon}</div>
                <div
                  style={{ fontWeight: 800, fontSize: 18, marginBottom: 12 }}
                >
                  {p.title}
                </div>
                <div
                  style={{ fontSize: 14, color: "#8C8C8C", lineHeight: 1.7 }}
                >
                  {p.desc}
                </div>
              </div>
            ))}
          </div>

          {/* 11 Accordion values */}
          <h3 style={{ fontWeight: 700, fontSize: 28, marginBottom: 8 }}>
            11 条超级内容价值观
          </h3>
          <p style={{ fontSize: 14, color: "#8C8C8C", marginBottom: 36 }}>
            点击展开查看完整阐释
          </p>
          <div
            style={{
              border: "1px solid rgba(255,255,255,0.06)",
              borderRadius: 12,
              overflow: "hidden",
            }}
          >
            {VALUES_LIST.map((v, i) => (
              <div
                key={i}
                style={{
                  borderBottom:
                    i < VALUES_LIST.length - 1
                      ? "1px solid rgba(255,255,255,0.06)"
                      : "none",
                }}
              >
                <button
                  onClick={() => setOpenValue(openValue === i ? null : i)}
                  style={{
                    width: "100%",
                    background:
                      openValue === i ? "rgba(162,255,39,0.05)" : "#111",
                    border: "none",
                    cursor: "pointer",
                    padding: "20px 28px",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    textAlign: "left",
                    transition: "background 0.2s",
                    borderLeft:
                      openValue === i
                        ? `3px solid ${GREEN}`
                        : "3px solid transparent",
                  }}
                >
                  <div
                    style={{ display: "flex", alignItems: "center", gap: 16 }}
                  >
                    <span
                      style={{
                        fontFamily: "'DM Mono', monospace",
                        fontSize: 11,
                        color: GREEN,
                        fontWeight: 600,
                        minWidth: 24,
                      }}
                    >
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <span
                      style={{ fontWeight: 700, fontSize: 15, color: "#fff" }}
                    >
                      {v.title}
                    </span>
                  </div>
                  <span
                    style={{
                      color: GREEN,
                      fontSize: 18,
                      transition: "transform 0.3s",
                      transform:
                        openValue === i ? "rotate(45deg)" : "rotate(0)",
                      flexShrink: 0,
                    }}
                  >
                    +
                  </span>
                </button>
                <div
                  style={{
                    maxHeight: openValue === i ? 200 : 0,
                    overflow: "hidden",
                    transition: "max-height 0.35s ease",
                  }}
                >
                  <div
                    style={{
                      padding: "16px 28px 24px 68px",
                      fontSize: 14,
                      color: "#8C8C8C",
                      lineHeight: 1.8,
                      background: "rgba(162,255,39,0.03)",
                    }}
                  >
                    {v.detail}
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Media cards */}
          <h3
            style={{
              fontWeight: 700,
              fontSize: 28,
              marginBottom: 32,
              marginTop: 80,
            }}
          >
            媒体眼中的超级内容
          </h3>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(3,1fr)",
              gap: 20,
            }}
          >
            {MEDIA_CARDS.map((m, i) => (
              <a
                key={i}
                href={m.link}
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  ...S.card,
                  padding: "28px 28px",
                  textDecoration: "none",
                  display: "block",
                  transition: "all 0.3s",
                  cursor: "pointer",
                  position: "relative",
                  overflow: "hidden",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.borderColor = GREEN
                  e.currentTarget.style.transform = "translateY(-5px)"
                  const arrow = e.currentTarget.querySelector(
                    ".arrow",
                  ) as HTMLElement
                  if (arrow) {
                    arrow.style.transform = "translate(4px,-4px)"
                    arrow.style.color = GREEN
                  }
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.borderColor = "rgba(255,255,255,0.06)"
                  e.currentTarget.style.transform = "none"
                  const arrow = e.currentTarget.querySelector(
                    ".arrow",
                  ) as HTMLElement
                  if (arrow) {
                    arrow.style.transform = "none"
                    arrow.style.color = "#8C8C8C"
                  }
                }}
              >
                <span
                  style={{
                    fontSize: 11,
                    fontWeight: 600,
                    color: GREEN,
                    letterSpacing: "0.1em",
                    display: "block",
                    marginBottom: 12,
                  }}
                >
                  {m.tag}
                </span>
                <div
                  style={{
                    fontWeight: 700,
                    fontSize: 16,
                    color: "#fff",
                    lineHeight: 1.5,
                    marginBottom: 12,
                  }}
                >
                  {m.title}
                </div>
                <div
                  style={{
                    fontSize: 13,
                    color: "#8C8C8C",
                    lineHeight: 1.6,
                    marginBottom: 20,
                  }}
                >
                  {m.desc}
                </div>
                <span
                  className="arrow"
                  style={{
                    fontSize: 20,
                    color: "#8C8C8C",
                    transition: "all 0.2s",
                    display: "block",
                  }}
                >
                  ↗
                </span>
              </a>
            ))}
          </div>

          {/* Team photo */}
          <div
            style={{
              marginTop: 80,
              borderRadius: 16,
              overflow: "hidden",
              position: "relative",
            }}
          >
            <img
              src={avatarImg16}
              alt="超级内容上海北外滩全员合影"
              style={{
                width: "100%",
                height: 360,
                objectFit: "cover",
                display: "block",
              }}
            />
            <div
              style={{
                position: "absolute",
                inset: 0,
                background:
                  "linear-gradient(to top, rgba(5,5,5,0.8) 0%, transparent 60%)",
              }}
            />
            <div style={{ position: "absolute", bottom: 32, left: 40 }}>
              <div style={{ fontWeight: 800, fontSize: 20, marginBottom: 6 }}>
                超级内容 · 上海北外滩
              </div>
              <div style={{ fontSize: 13, color: "#8C8C8C" }}>
                1 周年 · 全员合影 · 向下一年出发
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── CONTACT ──────────────────────────────────────────────────────────── */}
      <section
        id="contact"
        ref={contactRef as React.RefObject<HTMLElement>}
        style={{ background: "#060606", padding: "120px 0" }}
      >
        <div style={S.section}>
          <span style={S.sectionLabel}>CONTACT</span>
          <h2 style={S.h2}>
            准备好用商业全案逻辑
            <br />
            <span style={{ color: GREEN }}>重构您的品牌</span>了吗？
          </h2>

          <div
            style={{
              display: "grid",
              gridTemplateColumns: "1fr 1.4fr",
              gap: 80,
              alignItems: "start",
            }}
          >
            {/* Left: contact info */}
            <div>
              <div style={{ marginBottom: 48 }}>
                <div
                  style={{
                    fontSize: 13,
                    color: "#8C8C8C",
                    marginBottom: 16,
                    letterSpacing: "0.06em",
                  }}
                >
                  商务合作邮箱
                </div>
                <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
                  <span style={{ fontWeight: 700, fontSize: 18, color: GREEN }}>
                    Bd@superaha.com
                  </span>
                  <button
                    onClick={copyEmail}
                    style={{
                      background: "rgba(162,255,39,0.1)",
                      border: `1px solid rgba(162,255,39,0.3)`,
                      borderRadius: 6,
                      padding: "8px 14px",
                      color: GREEN,
                      fontSize: 12,
                      fontWeight: 600,
                      cursor: "pointer",
                      transition: "all 0.2s",
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.background = GREEN
                      e.currentTarget.style.color = "#050505"
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.background = "rgba(162,255,39,0.1)"
                      e.currentTarget.style.color = GREEN
                    }}
                  >
                    复制 📋
                  </button>
                </div>

                {/* WeChat QR code */}
                <img
                  src={avatarImg5}
                  alt="微信二维码"
                  style={{
                    display: "block",
                    width: "100%",
                    maxWidth: 240,
                    height: "auto",
                    marginTop: 24,
                    borderRadius: 8,
                    border: "1px solid rgba(162,255,39,0.15)",
                  }}
                />
              </div>

              <div style={{ marginBottom: 48 }}>
                <div
                  style={{
                    fontSize: 13,
                    color: "#8C8C8C",
                    marginBottom: 16,
                    letterSpacing: "0.06em",
                  }}
                >
                  获取营销干货
                </div>
                <p
                  style={{
                    fontSize: 14,
                    color: "#c0c0c0",
                    lineHeight: 1.7,
                    marginBottom: 16,
                  }}
                >
                  关注播客节目，每周获取最新内容营销方法论与行业洞察：
                </p>
                <a
                  href="https://www.xiaoyuzhoufm.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{
                    display: "inline-flex",
                    alignItems: "center",
                    gap: 8,
                    background: "rgba(162,255,39,0.08)",
                    border: `1px solid rgba(162,255,39,0.25)`,
                    borderRadius: 8,
                    padding: "12px 20px",
                    color: GREEN,
                    fontSize: 14,
                    fontWeight: 700,
                    textDecoration: "none",
                    transition: "all 0.2s",
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.background = "rgba(162,255,39,0.15)"
                    e.currentTarget.style.boxShadow =
                      "0 0 16px rgba(162,255,39,0.2)"
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.background = "rgba(162,255,39,0.08)"
                    e.currentTarget.style.boxShadow = "none"
                  }}
                >
                  🎙️ 《每周聊夏》 ↗
                </a>
              </div>

              <div style={{ ...S.card, padding: "24px 28px" }}>
                <div
                  style={{
                    fontSize: 11,
                    color: "#8C8C8C",
                    letterSpacing: "0.1em",
                    fontFamily: "'DM Mono', monospace",
                    marginBottom: 12,
                  }}
                >
                  OFFICE
                </div>
                <div style={{ fontWeight: 700, fontSize: 16, marginBottom: 8 }}>
                  中国 · 上海市虹口区北外滩
                </div>
                <div style={{ fontSize: 13, color: "#8C8C8C" }}>
                  2025 年成立 · 专注内容整合营销
                </div>
              </div>
            </div>

            {/* Right: booking form */}
            <div>
              <h3 style={{ fontWeight: 800, fontSize: 22, marginBottom: 8 }}>
                预约 2 小时线下需求访谈
              </h3>
              <p style={{ fontSize: 14, color: "#8C8C8C", marginBottom: 32 }}>
                填写信息后，我们的产品经理将在 24 小时内与您确认访谈时间。
              </p>

              {formSuccess ? (
                <div
                  style={{
                    background: "rgba(162,255,39,0.08)",
                    border: `1px solid ${GREEN}`,
                    borderRadius: 16,
                    padding: "60px 40px",
                    textAlign: "center",
                    boxShadow: `0 0 40px rgba(162,255,39,0.1)`,
                  }}
                >
                  <div style={{ fontSize: 64, marginBottom: 20 }}>✅</div>
                  <div
                    style={{
                      fontWeight: 800,
                      fontSize: 22,
                      color: GREEN,
                      marginBottom: 12,
                    }}
                  >
                    预约提交成功！
                  </div>
                  <div
                    style={{ fontSize: 15, color: "#c0c0c0", lineHeight: 1.7 }}
                  >
                    产品经理将在{" "}
                    <strong style={{ color: "#fff" }}>24 小时内</strong>
                    与您联系，
                    <br />
                    确认 2 小时需求访谈的具体时间。
                  </div>
                </div>
              ) : (
                <form
                  onSubmit={handleSubmit}
                  style={{ display: "flex", flexDirection: "column", gap: 20 }}
                >
                  {[
                    {
                      label: "姓名 / 职务",
                      placeholder: "请输入您的姓名与职务",
                      type: "text",
                      ref: nameInputRef,
                    },
                    {
                      label: "品牌 / 公司名称",
                      placeholder: "请输入您的公司或品牌名",
                      type: "text",
                    },
                    {
                      label: "联系邮箱",
                      placeholder: "your@company.com",
                      type: "email",
                    },
                  ].map((f) => (
                    <div key={f.label}>
                      <label
                        style={{
                          display: "block",
                          fontSize: 12,
                          fontWeight: 600,
                          letterSpacing: "0.06em",
                          color: "#8C8C8C",
                          marginBottom: 8,
                        }}
                      >
                        {f.label}
                      </label>
                      <input
                        ref={f.ref as React.RefObject<HTMLInputElement>}
                        type={f.type}
                        placeholder={f.placeholder}
                        required
                        style={{
                          width: "100%",
                          background: "#111",
                          border: "1px solid rgba(255,255,255,0.08)",
                          borderRadius: 8,
                          padding: "14px 16px",
                          color: "#fff",
                          fontSize: 14,
                          outline: "none",
                          transition: "border-color 0.2s",
                        }}
                        onFocus={(e) => {
                          e.currentTarget.style.borderColor = GREEN
                        }}
                        onBlur={(e) => {
                          e.currentTarget.style.borderColor =
                            "rgba(255,255,255,0.08)"
                        }}
                      />
                    </div>
                  ))}

                  <div>
                    <label
                      style={{
                        display: "block",
                        fontSize: 12,
                        fontWeight: 600,
                        letterSpacing: "0.06em",
                        color: "#8C8C8C",
                        marginBottom: 8,
                      }}
                    >
                      预估年度营销预算
                    </label>
                    <select
                      required
                      style={{
                        width: "100%",
                        background: "#111",
                        border: "1px solid rgba(255,255,255,0.08)",
                        borderRadius: 8,
                        padding: "14px 16px",
                        color: "#fff",
                        fontSize: 14,
                        outline: "none",
                        cursor: "pointer",
                      }}
                      onFocus={(e) => {
                        e.currentTarget.style.borderColor = GREEN
                      }}
                      onBlur={(e) => {
                        e.currentTarget.style.borderColor =
                          "rgba(255,255,255,0.08)"
                      }}
                    >
                      <option value="" style={{ background: "#111" }}>
                        请选择预算范围
                      </option>
                      <option value="120-200" style={{ background: "#111" }}>
                        120万 - 200万
                      </option>
                      <option value="200-500" style={{ background: "#111" }}>
                        200万 - 500万
                      </option>
                      <option value="500+" style={{ background: "#111" }}>
                        500万+
                      </option>
                    </select>
                  </div>

                  <div>
                    <label
                      style={{
                        display: "block",
                        fontSize: 12,
                        fontWeight: 600,
                        letterSpacing: "0.06em",
                        color: "#8C8C8C",
                        marginBottom: 8,
                      }}
                    >
                      核心营销痛点
                    </label>
                    <textarea
                      rows={4}
                      placeholder="请描述您当前面临的核心营销挑战或增长瓶颈…"
                      required
                      style={{
                        width: "100%",
                        background: "#111",
                        border: "1px solid rgba(255,255,255,0.08)",
                        borderRadius: 8,
                        padding: "14px 16px",
                        color: "#fff",
                        fontSize: 14,
                        outline: "none",
                        resize: "none",
                        transition: "border-color 0.2s",
                      }}
                      onFocus={(e) => {
                        e.currentTarget.style.borderColor = GREEN
                      }}
                      onBlur={(e) => {
                        e.currentTarget.style.borderColor =
                          "rgba(255,255,255,0.08)"
                      }}
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={formLoading}
                    style={{
                      background: formLoading ? "rgba(162,255,39,0.5)" : GREEN,
                      color: "#050505",
                      border: "none",
                      borderRadius: 10,
                      padding: "18px",
                      fontWeight: 800,
                      fontSize: 15,
                      letterSpacing: "0.04em",
                      cursor: formLoading ? "not-allowed" : "pointer",
                      transition: "all 0.2s",
                      boxShadow: formLoading
                        ? "none"
                        : "0 0 20px rgba(162,255,39,0.3)",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      gap: 10,
                    }}
                    onMouseEnter={(e) => {
                      if (!formLoading)
                        e.currentTarget.style.boxShadow =
                          "0 0 40px rgba(162,255,39,0.5)"
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.boxShadow = formLoading
                        ? "none"
                        : "0 0 20px rgba(162,255,39,0.3)"
                    }}
                  >
                    {formLoading ? (
                      <>
                        <svg
                          width="18"
                          height="18"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="3"
                          style={{ animation: "spin 0.8s linear infinite" }}
                        >
                          <path d="M12 2v4M12 18v4M4.93 4.93l2.83 2.83M16.24 16.24l2.83 2.83M2 12h4M18 12h4M4.93 19.07l2.83-2.83M16.24 7.76l2.83-2.83" />
                        </svg>
                        提交中…
                      </>
                    ) : (
                      "提交预约申请 →"
                    )}
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* ── FOOTER ───────────────────────────────────────────────────────────── */}
      <footer
        style={{
          borderTop: "1px solid rgba(255,255,255,0.06)",
          padding: "40px",
          maxWidth: 1200,
          margin: "0 auto",
        }}
      >
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            flexWrap: "wrap",
            gap: 20,
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
            <div
              style={{
                width: 22,
                height: 22,
                background: GREEN,
                borderRadius: 4,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontSize: 10,
                fontWeight: 900,
                color: "#050505",
              }}
            >
              S
            </div>
            <span style={{ fontWeight: 700, fontSize: 14 }}>
              Superaha 超级内容
            </span>
            <span style={{ color: "#8C8C8C", fontSize: 13 }}>
              ｜ 中国 · 上海市虹口区北外滩
            </span>
          </div>
          <div
            style={{
              fontSize: 12,
              color: "#8C8C8C",
              fontFamily: "'DM Mono', monospace",
            }}
          >
            © 2025-2026 SUPER CONTENT. All Rights Reserved.
          </div>
        </div>
      </footer>

      <style>{`
        @keyframes spin {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
      `}</style>
    </div>
  )
}
