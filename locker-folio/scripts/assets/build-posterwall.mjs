#!/usr/bin/env bun
/**
 * 门 1 的海报墙：换成使用者本人的海报作品。
 *
 * ── 为什么必须换 ───────────────────────────────────────────────
 * 上游模板的 posterwall.webp 是**模板作者自己的**画作 —— 一张二次元
 * 少女写真海报（画面里写着 "Style / dream / cute / besties"）。
 * 门 1 在场景里对应「作品展示 SELECTED WORK」那一扇，是访客
 * 点开作品前看到的第一幅画面。挂着别人的画等于作品集里塞了别人的作品，
 * 这一处必须换成使用者本人的东西。
 *
 * ── 换法：保留风格骨架，重排内容 ──────────────────────────────
 * 原图的风格骨架是这几件事：淡紫粉的低饱和底、满幅的手绘涂鸦
 * （星、蝴蝶结、爱心、星星字）、四角半透明胶带、整体柔和的印刷质感。
 * 这些**全部保留** —— 骨架一换，和柜门上其余素材的风格就断了。
 *
 * 画面内容换成 PDF 第 16 页「海报设计」里的三张 HBN 早C粉海报
 * （第十五届大学生广告艺术创意大赛湖北省一等奖），按原图的
 * 「一主两辅」布局重新排布：中间一张大图为主，左右各一张为辅。
 *
 * ── 尺寸与构图 ─────────────────────────────────────────────────
 * 原图 543×760（0.714 比例），3D 里贴在一张 0.575×0.805 的板子上。
 * 这里保持 543×760，构图按原图的分区：
 *   · 背景铺满整幅的淡紫粉
 *   · 三张海报分别贴在 x≈40 / x≈205 / x≈370，纵向居中
 *   · 四角胶带与涂鸦沿用原图的位置
 *
 *   bun run scripts/assets/build-posterwall.mjs
 */
import { join } from 'node:path'
import { fileURLToPath } from 'node:url'
import sharp from 'sharp'

sharp.cache(false)

const ROOT = fileURLToPath(new URL('../..', import.meta.url)).replace(/\/$/, '')
const SRC = join(ROOT, 'public/assets/obj/posterwall.webp')
const PDF_PAGE = join(ROOT, '_dev/pdf-extracted/page16.png')
const OUT = SRC

const W = 543
const H = 760

/** 底色：取自原图的淡紫粉，与柜门其余素材同一套低饱和粉彩 */
const BG = '#EDE7F6'
const BG2 = '#E2DAF2'

/**
 * 三张 HBN 海报在 PDF 第 16 页（2880×1620）里的裁切矩形。
 * 坐标用像素扫描量出：海报区 y ∈ [478, 1408]，
 * 三张的 x 分别是 [200,862] / [1076,1726] / [1942,2604]。
 */
const HBN = [
  { box: [200, 478, 862, 1408] },
  { box: [1076, 478, 1726, 1408] },
  { box: [1942, 478, 2604, 1408] },
]

/**
 * 三张海报在成品里的落位（543×760 坐标系）。
 * 原图是「中图大、两侧略小且上下错落」的经典拼贴，
 * 这里照搬这个节奏 —— 但原图里五个二次元人物是**从顶铺到脚**的，
 * 画面没有大片留白。
 *
 * 这张图在 3D 里只有约 200×280 屏幕像素，留白在远景会被读成空洞，
 * 所以三张海报要放大到近乎铺满纵向：y ∈ [78, 596]，
 * 底部留出标题区，纵向不留断层。
 */
const PLACEMENTS = [
  { x: 4, y: 176, w: 190, h: 268, rot: -3 },
  { x: 176, y: 78, w: 190, h: 268, rot: 1.5 },
  { x: 350, y: 176, w: 190, h: 268, rot: 4 },
]

/* ── 1. 底色：竖向渐变 + 纸纹噪点 ────────────────────────────── */
const bgSvg = `<svg xmlns="http://www.w3.org/2000/svg" width="${W}" height="${H}">
  <defs>
    <linearGradient id="g" x1="0.1" y1="0" x2="0.85" y2="1">
      <stop offset="0" stop-color="${BG}"/>
      <stop offset="1" stop-color="${BG2}"/>
    </linearGradient>
  </defs>
  <rect width="${W}" height="${H}" fill="url(#g)"/>
</svg>`

/* ── 2. 涂鸦层：星、蝴蝶结、爱心、星星字 ───────────────────────── */
/**
 * 装饰沿用原图的语言：淡粉/淡紫的描边涂鸦，线宽 2–3，
 * 不喧宾夺主 —— 底色不能太花，否则三张作品海报会被淹没。
 */
const doodles = [
  // 顶部蝴蝶结
  `<g transform="translate(272 62) rotate(-8)" opacity="0.85">
     <path d="M0 0 C -26 -26, -44 -6, -22 8 C -44 22, -26 40, 0 14 Z" fill="none" stroke="#D9A8D8" stroke-width="2.5"/>
     <path d="M0 0 C 26 -26, 44 -6, 22 8 C 44 22, 26 40, 0 14 Z" fill="none" stroke="#D9A8D8" stroke-width="2.5"/>
     <circle cx="0" cy="7" r="5" fill="none" stroke="#D9A8D8" stroke-width="2.5"/>
   </g>`,
  // 右上星星
  `<path d="M468 96 l7 17 l18 1 l-14 11 l5 18 l-16 -10 l-16 10 l5 -18 l-14 -11 l18 -1 Z"
        fill="none" stroke="#C7B3E4" stroke-width="2.5" opacity="0.8"/>`,
  // 左上爱心
  `<path d="M74 92 C 60 78, 44 90, 56 104 C 64 113, 74 122, 74 122 C 74 122, 84 113, 92 104 C 104 90, 88 78, 74 92 Z"
        fill="none" stroke="#E0A9B8" stroke-width="2.5" opacity="0.85"/>`,
  // 底部星星串：放在标题两侧的空白处
  `<path d="M56 690 l6 14 l15 1 l-11 9 l4 15 l-13 -8 l-13 8 l4 -15 l-11 -9 l15 -1 Z"
        fill="none" stroke="#C7B3E4" stroke-width="2.4" opacity="0.7"/>`,
  `<path d="M470 690 l6 14 l15 1 l-11 9 l4 15 l-13 -8 l-13 8 l4 -15 l-11 -9 l15 -1 Z"
        fill="none" stroke="#E0A9B8" stroke-width="2.4" opacity="0.7"/>`,
  // 中部小星
  `<path d="M182 108 l4 9 l10 1 l-8 6 l3 10 l-8 -5 l-8 5 l3 -10 l-8 -6 l10 -1 Z"
        fill="none" stroke="#C7B3E4" stroke-width="2" opacity="0.7"/>`,
  `<path d="M362 92 l4 9 l10 1 l-8 6 l3 10 l-8 -5 l-8 5 l3 -10 l-8 -6 l10 -1 Z"
        fill="none" stroke="#C7B3E4" stroke-width="2" opacity="0.7"/>`,
  // 底部作品标题：原图这里是手写体 "Style"，换成作品集的署名
  `<text x="272" y="622" text-anchor="middle" font-family="PingFang SC, Helvetica Neue, sans-serif"
        font-weight="700" font-size="34" letter-spacing="6" fill="#8A6FA8" opacity="0.92">作品展示</text>
   <text x="272" y="660" text-anchor="middle" font-family="Helvetica Neue, Helvetica, Arial, sans-serif"
        font-weight="700" font-size="18" letter-spacing="4" fill="#A98CC4" opacity="0.85">HBN 早C粉 · SELECTED WORK</text>`,
]

/* ── 3. 四角胶带 ────────────────────────────────────────────── */
/**
 * 胶带用半透明色块 + 轻微旋转，和原图一致。
 * 3D 的 PosterCardModel 之外还叠了四块实体胶带几何，
 * 所以这里的胶带只是印刷面的一部分，不能太显眼。
 */
const tapes = [
  { x: 8, y: 26, rot: -38, c: '#EBD3EC' },
  { x: 470, y: 14, rot: 32, c: '#D6E8DE' },
  { x: 10, y: 690, rot: 34, c: '#EBD3EC' },
  { x: 468, y: 696, rot: -34, c: '#D6E8DE' },
]

const overlaySvg = `<svg xmlns="http://www.w3.org/2000/svg" width="${W}" height="${H}">
  ${doodles.join('\n  ')}
  ${tapes
    .map(
      (t) => `<g transform="translate(${t.x} ${t.y}) rotate(${t.rot})">
        <rect x="0" y="0" width="76" height="30" rx="2" fill="${t.c}" opacity="0.72"/>
      </g>`,
    )
    .join('\n  ')}
</svg>`

/* ── 组装 ────────────────────────────────────────────────────── */

const layers = []

// 三张作品海报，各自带轻微旋转（先转成 PNG 再贴，旋转才不会带黑边）
for (let i = 0; i < HBN.length; i++) {
  const [x0, y0, x1, y1] = HBN[i].box
  const pl = PLACEMENTS[i]
  const card = await sharp(PDF_PAGE)
    .extract({ left: x0, top: y0, width: x1 - x0, height: y1 - y0 })
    .resize(pl.w, pl.h, { fit: 'fill', kernel: 'lanczos3' })
    .rotate(pl.rot, { background: { r: 0, g: 0, b: 0, alpha: 0 } })
    .png()
    .toBuffer()
  const meta = await sharp(card).metadata()
  // 旋转后画布变大，居中贴回去
  layers.push({
    input: card,
    left: Math.round(pl.x + (pl.w - meta.width) / 2),
    top: Math.round(pl.y + (pl.h - meta.height) / 2),
  })
}

// 涂鸦与胶带盖在海报之上
layers.push({ input: Buffer.from(overlaySvg), left: 0, top: 0 })

const bg = await sharp(Buffer.from(bgSvg)).png().toBuffer()

await sharp(bg)
  .composite(layers)
  .webp({ quality: 92, alphaQuality: 100, effort: 6 })
  .toFile(OUT + '.tmp')

const { renameSync } = await import('node:fs')
renameSync(OUT + '.tmp', OUT)

console.log(`→ ${OUT.replace(ROOT + '/', '')}  ${W}×${H}（替换为本人 HBN 海报作品）`)
console.log('  记得跑 `bun run assets:bleed` 与 `bun run scripts/assets/sync-manifest.mjs`')
