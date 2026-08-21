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

  author: {
    name: 'Windson',
    github: 'weichenlin1209',
    email: 'info@windson.cc',
    location: 'Taiwan',
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
        { href: '/zh/blog', label: '文章' },
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
        { href: '/en/blog', label: 'Blog' },
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
