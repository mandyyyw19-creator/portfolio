/* 站点全部文案与作品数据 —— 与参考逐帧核对整理 */

export const SITE = {
  owner: '吴曼迪',
  tagline: "MANDI WU — PORTFOLIO '26",
  year: '2026',
}

/* ── 出处与源码 ───────────────────────────────────────
 * 本站是对小红书博主 momo 的 Locker 个人网站的复刻练习：视觉创意归原作者，
 * 这条出处要一直挂在页面上（左下角 Credit 组件），不是只写在 README 里。
 * repoUrl 是开源仓库地址，换仓库时只改这一处。 */
export const CREDIT = {
  author: 'momo',
  platform: '小红书',
  originUrl:
    'https://www.xiaohongshu.com/discovery/item/6a852ae7000000002500b24e?xsec_token=ABxWdb99F51QhPGOvNNuLGxYSbTeGIKFnMDujjIeP1Kr8=',
  repoUrl: 'https://github.com/qzz0518/locker-folio',
}

/* ── 顶部导航 ─────────────────────────────────────────── */
export const NAV = [
  { id: 'about', label: 'ABOUT' },
  { id: 'skills', label: 'SKILLS' },
  { id: 'work', label: 'SELECTED WORK' },
  { id: 'contact', label: 'CONTACT' },
] as const

/* ── ABOUT：工牌 ─────────────────────────────────────── */
export const ABOUT = {
  cardNo: 'NO. 0826',
  title: ['BASIC', 'INFORMATION'],
  titleCn: '个人简介',
  sub: 'PERSONAL PORTFOLIO ID CARD',
  fields: [
    { k: 'NAME / 姓名', v: '吴曼迪' },
    { k: 'BIRTH / 出生年月', v: '2004 年 8 月' },
    { k: 'MBTI / 性格', v: 'ENFP · 狮子座' },
    { k: 'TARGET / 求职方向', v: '游戏发行营销' },
    { k: 'EDUCATION / 学历', v: '香港中文大学（硕士，海外 QS18）' },
    { k: 'UNDERGRAD / 本科', v: '中南财经政法大学（本科，211）' },
  ],
  email: '18672721558@163.com',
  phone: '18672721558',
  stampTop: 'CERTIFIED',
  stampMid: 'MANDI',
  stampRing: 'PERSONAL PORTFOLIO · MANDI WU ·',
  footL: 'IN MY CREATIVE ERA',
  footR: 'PERSONAL DESIGN PORTFOLIO · 2026',
}

/* ── SKILLS：三张卡片 ─────────────────────────────────── */
export type SkillCard = {
  no: string
  kicker: string
  title: string
  desc: string
  rows: { k: string; v: string }[]
  bg: string
  fg: string
}

export const SKILLS: SkillCard[] = [
  {
    no: '01',
    kicker: '01 / GAME MARKETING',
    title: '游戏发行营销',
    desc: '深度操盘 ACG / 二次元 / 国漫头部 IP 联动，擅长从玩家语境与厨力生态中提炼爆款内容。',
    rows: [
      { k: 'IP 联动', v: '决战平安京 / 阴阳师 / 猫耳FM / 虹猫蓝兔' },
      { k: '社媒运营', v: '微博 / 小红书 / 公众号 / LOFTER / 抖音' },
      { k: '二创 UGC', v: '画师约稿 / KOC 建联 / 创作者社群运营' },
    ],
    bg: '#1b28d8',
    fg: '#ffffff',
  },
  {
    no: '02',
    kicker: '02 / CONTENT CREATION',
    title: '内容创作',
    desc: '从脑洞选题、Brief 输出到视觉落地，持续产出万赞级爆款与传播级事件。',
    rows: [
      { k: '视觉设计', v: 'PS / AI / Canva / 剪映专业版 / PR' },
      { k: '文案策划', v: '脑洞 + 梗文化 / 场景化爆款文案' },
      { k: '代表作品', v: '湖北省大广赛一等奖 / 过早纪录片二等奖' },
    ],
    bg: '#c8f322',
    fg: '#12140f',
  },
  {
    no: '03',
    kicker: '03 / DATA & OPERATION',
    title: '数据运营',
    desc: '用数据工具为内容复盘与发行决策建立清晰依据，兼顾平台热点与用户需求。',
    rows: [
      { k: '数据分析', v: 'SPSS / TF-IDF / 聚类分析 / ROST 情感分析' },
      { k: '平台运营', v: '多账号矩阵 / 数据监测 / 品牌资源置换' },
      { k: '活动策划', v: '10+ 线上线下活动 / 200+ 人参与规模' },
    ],
    bg: '#ffffff',
    fg: '#14161a',
  },
]

/* ── SELECTED WORK：四个文件夹 ───────────────────────── */
export const FOLDERS = [
  {
    id: 'video',
    en: ['VIDEO'],
    cn: '影像作品',
    bg: '#0b0b0d',
    fg: '#e0322a',
    cnFg: '#e0322a',
    x: -30,
    y: 12,
    rot: -6,
    z: 1,
  },
  {
    id: 'design',
    en: ['DESIGN'],
    cn: '视觉设计',
    bg: '#c8f322',
    fg: '#1b28d8',
    cnFg: '#1b28d8',
    x: 0,
    y: 0,
    rot: -7,
    z: 3,
  },
  {
    id: 'photograph',
    en: ['GAME', 'CASES'],
    cn: '游戏案例',
    bg: '#1b28d8',
    fg: '#c8f322',
    cnFg: '#ffffff',
    x: 30,
    y: -18,
    rot: 3,
    z: 2,
  },
  {
    id: 'website',
    en: ['PUBLISH', 'CASE'],
    cn: '发行全案',
    bg: '#f8f8f6',
    fg: '#14161a',
    cnFg: '#14161a',
    x: 22,
    y: 20,
    rot: 2,
    z: 2,
  },
] as const

/* ── DESIGN › 01 POSTERS ─────────────────────────────── */
export const POSTERS = [
  { src: 'poster1', title: 'HBN 海报设计 · 大广赛湖北省一等奖' },
]

/* ── DESIGN › 02 MAGAZINE ────────────────────────────── */
export const MAGAZINE_PAGES = ['mag1']

/* ── DESIGN › 03 IP DESIGN ───────────────────────────── */
export const IP_DESIGN = {
  kicker: '03 / 公众号排版',
  title: 'EDITORIAL',
  cn: '公众号长图文',
  desc: '擅长用秀米、Canva、135 编辑器与 SVG 工具，把复杂信息梳理成有节奏、可传播的公众号长图文。',
  swatches: [
    { name: 'MINT', hex: '#5fd3a6' },
    { name: 'SKY', hex: '#8ecae6' },
    { name: 'PAPER', hex: '#f8f7fa' },
    { name: 'INK', hex: '#2c2925' },
  ],
  specs: [
    { k: '工具', v: 'PS / 秀米 / Canva / 135 编辑器' },
    { k: '亮点', v: 'SVG 交互 / 信息可视化 / 排版节奏' },
    { k: '场景', v: '游戏官号 / 活动推文 / 品牌合作' },
  ],
}

/* ── PHOTOGRAPH ──────────────────────────────────────── */
export const PHOTOS = [
  'case_ip', 'case_fanart', 'case_ugc', 'case_xhs',
  'case_club', 'case_douyin', 'case_ip2', 'case_fanart2',
  'case_ugc2', 'case_xhs2', 'case_club2', 'case_douyin2',
  'case_ip3', 'case_fanart3', 'case_ugc3', 'case_xhs3',
]

/* ── VIDEO ───────────────────────────────────────────── */
export const VIDEOS = [
  {
    no: '01',
    en: '过早：江湖百味',
    cn: '城市人文纪录片',
    desc: '带领 5 人团队深度采访 30+ 武汉早餐从业者与食客，撰写 5 万字逐字稿、8 版策划案及 3 版分镜脚本，用专业剪辑凸显烟火人文特色。获湖北大学生新闻传播竞赛微视频类二等奖。',
    cover: 'video1',
    href: '#',
  },
]

/* ── WEBSITE & WRITING ───────────────────────────────── */
/* href 是占位：三个站点还没有可公开的正式地址，一律先指向 '#'，
   面板上的 OPEN PROJECT 同时带 aria-disabled。拿到真实链接后只改这三处。
   glow 是每张封面的主色，用来喂 .wsc__glow 的背景光晕 —— 原来那三个值
   （#f6e9c8 / #f7dcd8 / #dceccd）是掺了大量白的浅色，铺在 --paper #f8f7fa 上
   几乎没有色差，看不出光晕；这里往各自封面的主色方向加饱和度。 */
export const WEBSITES = [
  {
    no: '01',
    slug: '多品类发行全案',
    title: ['发行全案 /', '多品类'],
    kicker: 'GAME PUBLISHING · 游戏发行',
    desc: '针对《仗剑传说》《鹅鸭杀手游》《伊莫》等不同品类新游，从游戏调性、目标用户画像、社媒运营思路切入，深度拆解竞品宣发节奏、内容爆点与社区阵地布局。',
    cover: 'publish1',
    glow: '#f2d49a',
    href: '#',
  },
  {
    no: '02',
    slug: '新媒体平台运营',
    title: ['社媒运营 /', '贪吃蛇'],
    kicker: 'SOCIAL MEDIA · 官号运营',
    desc: '负责贪吃蛇大作战微博、小红书、公众号、LOFTER 官方账号运营，涵盖选题策划、文案撰写、视频脚本创作及内容发布全流程，累计产出千赞内容 30+ 条、万赞内容 20+ 条。',
    cover: 'social1',
    glow: '#f0bfa4',
    href: '#',
  },
  {
    no: '03',
    slug: '公众号长图文',
    title: ['公众号 /', '长图文'],
    kicker: 'EDITORIAL · 图文排版',
    desc: '熟练运用 PS、秀米编辑器、Canva、135 编辑器与 SVG 工具，打造可读性与传播性兼顾的长图文内容。',
    cover: 'wechat1',
    glow: '#d7e3a4',
    href: '#',
  },
]

/* ── CONTACT：软木板便签 ─────────────────────────────── */
export const NOTE_COLORS = ['#cfe0c3', '#f0e6a8', '#e8b7b7', '#a9c9dd', '#e5cfe0', '#d8cdb8']

export const SEED_NOTES = [
  { id: 's1', text: '游戏发行营销 · 二次元/国漫 IP 联动', color: '#cfe0c3', x: 14, y: 42, rot: -2 },
  { id: 's2', text: '联系方式：18672721558@163.com', color: '#f0e6a8', x: 70, y: 12, rot: 3 },
  { id: 's3', text: '坐标武汉/深圳，欢迎交流！', color: '#e8b7b7', x: 80, y: 33, rot: -3 },
]
