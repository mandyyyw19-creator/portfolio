/**
 * 站点资源根路径。
 *
 * Vite 的 `base` 只改写打包期能静态识别的引用（import、HTML 里的 href/src），
 * 但代码里手写的 `'/assets/...'` 字符串在运行时是原样发出的 —— 部署到
 * 子路径（如 GitHub Pages 的 /portfolio/）时这些请求会全部 404，
 * 首屏纹理加载不到，Loader 就永远卡在加载页。
 *
 * 所有运行时拼出来的资源路径都必须经过这里，用 `import.meta.env.BASE_URL`
 * 取 Vite 在构建期注入的 base（根路径部署时是 '/'，子路径部署时是 '/portfolio/'）。
 * BASE_URL 末尾始终带斜杠，所以直接拼接 'assets/...' 即可。
 */
export const BASE = import.meta.env.BASE_URL

/** 拼接一个站点内资源路径：assetUrl('/assets/obj/posterwall.webp') */
export function assetUrl(path: string): string {
  return `${BASE}${path.replace(/^\//, '')}`
}

/**
 * 去掉 base 前缀，得到站点内的**逻辑路径**。
 *
 * 清单里登记的路径、以及和清单做一致性比对的正则，用的都应该是不含 base 的
 * 逻辑路径（'/assets/photo/case_club.webp'）；只有真正发出去的请求才带 base。
 * 根路径部署时 BASE === '/'，原样返回。
 */
export function stripBase(url: string): string {
  if (BASE === '/') return url
  const head = BASE.endsWith('/') ? BASE.slice(0, -1) : BASE
  return url.startsWith(`${head}/`) ? url.slice(head.length) : url
}
