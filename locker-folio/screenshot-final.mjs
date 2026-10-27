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

async function clickNav(label) {
  await page.goto('http://localhost:4178/')
  await page.waitForSelector('nav', { timeout: 10000 })
  await setTimeout(3000)
  await page.click(`nav >> text=${label}`)
  await setTimeout(2000)
}

// Home with about open
await clickNav('ABOUT')
await page.screenshot({ path: `${outDir}/home.png`, fullPage: false })
console.log('Screenshot: home.png')

// Skills
await clickNav('SKILLS')
await page.screenshot({ path: `${outDir}/skills.png`, fullPage: false })
console.log('Screenshot: skills.png')

// Work folders
await clickNav('SELECTED WORK')
await page.screenshot({ path: `${outDir}/work_folders.png`, fullPage: false })
console.log('Screenshot: work_folders.png')

// Video
await page.click('button.fold:has-text("VIDEO")')
await setTimeout(2000)
await page.screenshot({ path: `${outDir}/video.png`, fullPage: false })
console.log('Screenshot: video.png')

// Design
await clickNav('SELECTED WORK')
await page.click('button.fold:has-text("DESIGN")')
await setTimeout(2000)
await page.screenshot({ path: `${outDir}/design.png`, fullPage: false })
console.log('Screenshot: design.png')

// Game Cases (photo)
await clickNav('SELECTED WORK')
await page.click('button.fold:has-text("GAME")')
await setTimeout(2000)
await page.screenshot({ path: `${outDir}/photo.png`, fullPage: false })
console.log('Screenshot: photo.png')

// Publish Case (website)
await clickNav('SELECTED WORK')
await page.click('button.fold:has-text("PUBLISH")')
await setTimeout(2000)
await page.screenshot({ path: `${outDir}/website.png`, fullPage: false })
console.log('Screenshot: website.png')

// Contact
await clickNav('CONTACT')
await page.screenshot({ path: `${outDir}/contact.png`, fullPage: false })
console.log('Screenshot: contact.png')

await browser.close()
server.kill('SIGTERM')
await setTimeout(500)
if (!server.killed) server.kill('SIGKILL')
console.log('Done')
