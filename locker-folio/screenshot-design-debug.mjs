import { chromium } from 'playwright'
import { spawn } from 'child_process'
import fs from 'fs'
import { setTimeout } from 'timers/promises'

const outDir = '/Users/wumandi/Desktop/秋招/简历作品集/locker-folio/screenshots-final'
fs.mkdirSync(outDir, { recursive: true })

const server = spawn('bun', ['run', 'preview', '--host', '0.0.0.0'], {
  cwd: '/Users/wumandi/Desktop/秋招/简历作品集/locker-folio',
  env: { ...process.env, BUN_INSTALL: process.env.HOME + '/.bun', PATH: process.env.HOME + '/.bun/bin:' + process.env.PATH },
  stdio: 'pipe'
})

let ready = false
server.stdout.on('data', (d) => { const s = d.toString(); process.stdout.write(s); if (s.includes('Local:')) ready = true })
server.stderr.on('data', (d) => { const s = d.toString(); process.stderr.write(s); if (s.includes('Local:')) ready = true })
for (let i = 0; i < 30; i++) { if (ready) break; await setTimeout(200) }
await setTimeout(2000)

const browser = await chromium.launch({ 
  headless: true,
  executablePath: '/Users/wumandi/Library/Caches/ms-playwright/chromium_headless_shell-1234/chrome-headless-shell-mac-arm64/chrome-headless-shell'
})
const page = await browser.newPage({ viewport: { width: 1440, height: 900 } })

page.on('console', msg => console.log('CONSOLE:', msg.type(), msg.text()))
page.on('pageerror', err => console.log('PAGE ERROR:', err.message))

await page.goto('http://localhost:4178/')
await page.waitForSelector('nav', { timeout: 10000 })
await setTimeout(3000)
await page.click('nav >> text=SELECTED WORK')
await setTimeout(2000)
await page.click('button.fold:has-text("DESIGN")')
console.log('Clicked DESIGN folder')

// Wait much longer for DesignView lazy load + WebGL init + GSAP intro
await setTimeout(8000)

// Take multiple screenshots during animation
await page.screenshot({ path: `${outDir}/design-t0.png`, fullPage: false })
console.log('Screenshot: design-t0.png')

await setTimeout(5000)
await page.screenshot({ path: `${outDir}/design-t5.png`, fullPage: false })
console.log('Screenshot: design-t5.png')

// Check if WebGL is working
const webglInfo = await page.evaluate(() => {
  const canvas = document.querySelector('canvas')
  if (!canvas) return 'no canvas'
  const gl = canvas.getContext('webgl2') || canvas.getContext('webgl')
  if (!gl) return 'no webgl context'
  return {
    width: canvas.width,
    height: canvas.height,
    clientWidth: canvas.clientWidth,
    clientHeight: canvas.clientHeight,
    renderer: gl.getParameter(gl.RENDERER),
    vendor: gl.getParameter(gl.VENDOR)
  }
})
console.log('WebGL info:', webglInfo)

// Check if dv elements exist
const dvInfo = await page.evaluate(() => {
  return {
    dv: !!document.querySelector('.dv'),
    pd: !!document.querySelector('.pd'),
    pdHead: !!document.querySelector('.pd__head'),
    staticFan: !!document.querySelector('.pd__staticFan'),
    canvas: !!document.querySelector('.pd__canvas canvas'),
    backToFolders: !!document.querySelector('.bf')
  }
})
console.log('DV elements:', dvInfo)

await browser.close()
server.kill('SIGTERM')
await setTimeout(500)
if (!server.killed) server.kill('SIGKILL')
console.log('Done')
