#!/usr/bin/env bun
/**
 * 把门 4 的磁吸照片换成使用者本人的真实活动照片。
 *
 * ── 为什么必须换 ───────────────────────────────────────────────
 * 上游模板的 polaroids.webp 里是**模板作者本人的卡通角色**
 * （两个女孩、沙滩女孩、拿相机的女孩）。门 4 在场景里是
 * 「个人技能 / 记忆」那一侧的视觉落点，访客第一眼扫到的就是这三张，
 * 印着别人的角色等于作品集里挂着别人的署名。
 *
 * ── 换法：只换画面，不换形体 ──────────────────────────────────
 * 原图的**相框、白边、投影、旋转角度**全是模板作者的手绘质感，
 * 重新画一张相框出来不现实（风格必然漂移）。
 * 所以做法是：保留原图作为底，只把三个照片窗
 * （POLAROID_CROPS 圈定的那三块）里的像素换成真实照片。
 *
 *   src/scene/PhysicalProps.tsx 的 POLAROID_CROPS 圈的是**照片内部**，
 *   刻意避开了相框白边和接触阴影 —— 所以替换区域与裁切区域严格一致，
 *   3D 里的裁切行为完全不变，只换像素内容。
 *
 * ── 照片来源 ───────────────────────────────────────────────────
 * scripts/assets/masters/ 下的 PDF 渲染图（page19「活动策划」），
 * 裁出三张真实活动现场照：舞台演出、社团合影、校园活动。
 *
 *   bun run scripts/assets/build-polaroids.mjs
 */
import { join } from 'node:path'
import { fileURLToPath } from 'node:url'
import sharp from 'sharp'

sharp.cache(false)

/**
 * 用 fileURLToPath 而不是 new URL().pathname —— 后者会把路径里的中文
 * 留在百分号编码状态（%E7%A7%8B…），sharp 读不到文件。
 */
const ROOT = fileURLToPath(new URL('../..', import.meta.url)).replace(/\/$/, '')
const SRC = join(ROOT, 'public/assets/obj2/polaroids.webp')
const PDF_PAGE = join(ROOT, '_dev/pdf-extracted/page19.png')
const OUT = SRC

/**
 * 与 PhysicalProps.tsx 的 POLAROID_CROPS 严格一致：
 *   friends { x:290, y:70,  width:240, height:190 }
 *   beach   { x:65,  y:325, width:225, height:185 }
 *   camera  { x:465, y:350, width:205, height:190 }
 */
const WINDOWS = [
  { id: 'friends', x: 290, y: 70, w: 240, h: 190 },
  { id: 'beach', x: 65, y: 325, w: 225, h: 185 },
  { id: 'camera', x: 465, y: 350, w: 205, h: 190 },
]

/**
 * 源照片在 page19（2880×1620）里的裁切矩形。
 *
 * page19 是「活动策划」页，版式是 3+2 的圆角照片网格。
 * 下面三块是其中最有信息量的：社团活动现场人群、舞台「从新出发」演出、
 * 社团合影 + 手办展位。
 *
 * 坐标用像素扫描量出来（背景是极浅色，扫「非背景」列/行的连续段）：
 *   上排三块照片共处 y ∈ [418, 884]，
 *   三块照片的 x 分别是 [248,1036] / [1114,1904] / [1980,2778]。
 * 四边各内缩 8px，避免把圆角处的背景也裁进来。
 */
const SOURCES = [
  { id: 'friends', box: [1122, 426, 1896, 876] }, // 中：舞台「从新出发」演出
  { id: 'beach', box: [256, 426, 1028, 876] }, // 左：社团活动现场人群
  { id: 'camera', box: [1988, 426, 2770, 876] }, // 右：社团合影 + 手办展位
]

const base = await sharp(SRC).ensureAlpha().raw().toBuffer({ resolveWithObject: true })
const { width: BW, height: BH } = base.info

const layers = []
for (const src of SOURCES) {
  const win = WINDOWS.find((w) => w.id === src.id)
  const [bx, by, bx1, by1] = src.box
  // 照片按窗口宽高比居中裁切（cover），不拉伸变形
  const photo = await sharp(PDF_PAGE)
    .extract({ left: bx, top: by, width: bx1 - bx, height: by1 - by })
    .resize(win.w, win.h, { fit: 'cover', position: 'attention', kernel: 'lanczos3' })
    .png()
    .toBuffer()
  layers.push({ input: photo, left: win.x, top: win.y })
}

await sharp(base.data, { raw: { width: BW, height: BH, channels: 4 } })
  .composite(layers)
  .webp({ quality: 92, alphaQuality: 100, effort: 6 })
  .toFile(OUT + '.tmp')

const { renameSync } = await import('node:fs')
renameSync(OUT + '.tmp', OUT)

console.log(`→ ${OUT.replace(ROOT + '/', '')}  ${BW}×${BH}（替换 ${layers.length} 个照片窗）`)
console.log('  记得跑 `bun run assets:bleed` 与 `bun run scripts/assets/sync-manifest.mjs`')
