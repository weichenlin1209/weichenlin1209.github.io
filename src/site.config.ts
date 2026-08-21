// ── 全局站点配置（多语言版）──
export type Lang = 'zh' | 'en';

export const langs: Lang[] = ['zh', 'en'];

export const site = {
  // 网站名称（导航栏 logo、页脚、页面标题后缀、SEO）
  name: "Windson's Blog",

  // 站点域名（必须带 https://，SEO/canonical/sitemap 依赖它）
  url: 'https://www.windson.cc/',

  // 社交分享预览图（public/ 下）
  ogImage: '/default-og-img.webp',
  ogSiteName: "Windson's Blog",

  // 背景图片：图片放 public/ 后填路径；light/dark 可各设一张，留空则用纯色背景
  // 例：background: { light: '/images/bg-light.jpg', dark: '/images/bg-dark.jpg' },
  background: {
    light: '/images/bg-light.png',
    dark: '/images/bg-dark.png',
  },

  // 首页右侧图片（public/ 下路径；文件不存在时自动隐藏）
  homeImage: '/images/home.jpg',
  author: {
    name: 'Windson',
    github: 'weichenlin1209',
    email: 'info@windson.cc',
    location: 'My bed',
  },

  // 页脚文字链接
  socials: [
    { label: 'GitHub', href: 'https://github.com/weichenlin1209' },
    { label: 'Email', href: 'mailto:info@windson.cc' },
    { label: 'RSS', href: '/zh/rss.xml' },
    { label: 'Study', href: 'https://study.windson.cc' },
  ],

  // 默认语言（根路径重定向目标）
  defaultLang: 'zh' as Lang,

  // 各语言的站点文案与导航
  locales: {
    zh: {
      htmlLang: 'zh-TW',
      defaultTitle: 'Windson',
      description:
        "Here is Windson's personal blog, a junior in National Chung Hsing University, majoring in Applied Mathematics.",
      nav: [
        { href: '/zh/posts', label: '文章' },
        { href: '/zh/archive', label: '歸檔' },
        { href: '/zh/blogroll', label: '部落滾' },
        { href: '/zh/photo', label: '照片' },
        { href: '/zh/now', label: '近況' },
        { href: '/zh/game', label: '遊戲' },
        { href: '/zh/about', label: '關於我' },
      ],
    },
    en: {
      htmlLang: 'en',
      defaultTitle: 'Windson',
      description:
        "Here is Windson's personal blog, a junior in National Chung Hsing University, majoring in Applied Mathematics.",
      nav: [
        { href: '/en/posts', label: 'Blog' },
        { href: '/en/archive', label: 'Archive' },
        { href: '/en/photo', label: 'Photos' },
        { href: '/en/now', label: 'Now' },
        { href: '/en/blogroll', label: 'Blogroll' },
        { href: '/en/game', label: 'Games' },
        { href: '/en/about', label: 'About' },
      ],
    },
  },
};
