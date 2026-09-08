// ── 各语言 UI 字符串 ──
import type { Lang } from './site.config';

// 长日期格式：August 13, 2026
const months = [
  'January', 'February', 'March', 'April', 'May', 'June',
  'July', 'August', 'September', 'October', 'November', 'December',
];
export function formatLongDate(iso: string) {
  const [y, m, d] = iso.split('-').map(Number);
  return `${months[m - 1]} ${d}, ${y}`;
}

export function formatLongDateZh(iso: string) {
  const [y, m, d] = iso.split('-').map(Number);
  return `${y}年${m}月${d}日`;
}

export interface UiStrings {
  welcomeEyebrow: string;
  homeHello: string;
  homeIntro: string;
  homeLatest: string;
  homeViewAll: string;
  blogEyebrow: string;
  blogTitle: string;
  noPosts: string;
  archiveEyebrow: string;
  archiveTitle: string;
  searchPlaceholder: string;
  noResults: string;
  photoEyebrow: string;
  photoTitle: string;
  backToPhoto: string;
  photosCount: (n: number) => string;
  viewPhoto: (n: number) => string;
  aboutEyebrow: string;
  aboutTitle: string;
  nowEyebrow: string;
  nowTitle: string;
  blogrollEyebrow: string;
  blogrollTitle: string;
  gameEyebrow: string;
  gameTitle: string;
  tocLabel: string;
  monthDay: (m: number, d: number) => string;
  openMenu: string;
  notFoundTitle: string;
  notFoundText: string;
  backHome: string;
}

export const ui: Record<Lang, UiStrings> = {
  zh: {
    welcomeEyebrow: 'WELCOME / 歡迎',
    homeHello: 'Hi, 我是',
    homeIntro:
      '中興大學應用數學系學生。喜歡折騰 Linux、寫程式、彈吉他。這裡記錄我的生活與技術筆記。',
    homeLatest: '最新文章',
    homeViewAll: '查看全部',

    blogEyebrow: 'BLOG / 文章',
    blogTitle: '文章列表',
    noPosts: '還沒有文章。',
    archiveEyebrow: 'TIMELINE / 時光軸',
    archiveTitle: '歸檔',
    searchPlaceholder: '🔍 搜尋文章標題或標籤…',
    noResults: '沒有找到相關文章。',
    photoEyebrow: 'PHOTO / 相簿',
    photoTitle: 'Photos',
    backToPhoto: '← 返回照片',
    photosCount: (n) => `${n} 張照片`,
    viewPhoto: (n) => `查看第 ${n} 張照片`,
    aboutEyebrow: 'ABOUT / 關於',
    aboutTitle: '關於',
    nowEyebrow: 'NOW / 近況',
    nowTitle: '近況',
    blogrollEyebrow: 'BLOGROLL / 部落滾',
    blogrollTitle: '我推的部落格',
    gameEyebrow: 'GAMES / 遊戲',
    gameTitle: '我推的遊戲',
    tocLabel: '目錄',
    monthDay: (m, d) => `${m}月${d}日`,
    openMenu: '打開選單',
    notFoundTitle: '迷路了',
    notFoundText: '這個頁面不存在，正在帶你回首頁……',
    backHome: '返回首頁',
  },
  en: {
    welcomeEyebrow: 'WELCOME',
    homeHello: "Hi, I'm",
    homeIntro:
      'Applied Mathematics student at NCHU. I tinker with Linux, code, and playing guitar. This blog is where I keep my notes and stories.',
    homeLatest: 'Latest Posts',
    homeViewAll: 'View all',
    blogEyebrow: 'BLOG',
    blogTitle: 'Posts',
    noPosts: 'No posts yet.',
    archiveEyebrow: 'TIMELINE',
    archiveTitle: 'Archive',
    searchPlaceholder: '🔍 Search titles or tags…',
    noResults: 'Nothing found.',
    photoEyebrow: 'PHOTO',
    photoTitle: 'Photos',
    backToPhoto: '← Back to photos',
    photosCount: (n) => `${n} photos`,
    viewPhoto: (n) => `View photo ${n}`,
    aboutEyebrow: 'ABOUT',
    aboutTitle: 'About Me',
    nowEyebrow: 'NOW',
    nowTitle: 'Now',
    blogrollEyebrow: 'BLOGROLL',
    blogrollTitle: 'Blogroll',
    gameEyebrow: 'GAMES',
    gameTitle: 'Games I Play',
    tocLabel: 'Contents',
    monthDay: (m, d) => `${String(m).padStart(2, '0')}/${String(d).padStart(2, '0')}`,
    openMenu: 'Open menu',
    notFoundTitle: 'Lost',
    notFoundText: 'This page does not exist. Redirecting you home…',
    backHome: 'Back to home',
  },
};
