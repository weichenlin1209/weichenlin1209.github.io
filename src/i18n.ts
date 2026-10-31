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
  homeTitle: string;
  homeName: string;
  homeNameAlt: string;
  homeIntro: string;
  homeIntroLine1: string;
  homeIntroLine2: string;
  homeIntroLine3: string;
  homeLatest: string;
  homeViewAll: string;
  homeOverview: string;
  homePinned: string;
  homeActivity: string;
  homeRepositories: string;
  homeReadme: string;
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
    homeTitle: 'Hi, this is 威忌',
    homeName: '威忌',
    homeNameAlt: 'Windson',
    homeIntro:
      '應用數學系學生',
    homeIntroLine1: '中興大學應用數學系學生，喜歡彈吉他和拍照。',
    homeIntroLine2: '這裡記錄我的生活以及一些技術筆記。',
    homeIntroLine3: '偶爾也會分享我正在研究的東西。',
    homeLatest: '最新文章',
    homeViewAll: '查看全部',
    homeOverview: '總覽',
    homePinned: '置頂文章',
    homeActivity: '文章活動',
    homeRepositories: '篇文章',
    homeReadme: '關於我',

    blogEyebrow: 'BLOG / 文章',
    blogTitle: '文章列表',
    noPosts: '還沒有文章。',
    archiveEyebrow: 'TIMELINE / 時間軸',
    archiveTitle: '歸檔',
    searchPlaceholder: '🔍 搜尋文章標題或標籤…',
    noResults: '沒有找到相關文章。',
    photoEyebrow: 'ALBUM / 相簿',
    photoTitle: '相簿',
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
    homeTitle: 'Hi, this is Windson',
    homeName: 'Windson',
    homeNameAlt: 'Weiji',
    homeIntro:
      'Applied Mathematics student at NCHU.', 
    homeIntroLine1: 'I am an Applied Mathematics student at NCHU who enjoys playing guitar and taking photos.',
    homeIntroLine2: 'This blog is where I keep my notes and stories.',
    homeIntroLine3: 'I also write about things I am currently exploring.',
    homeLatest: 'Latest Posts',
    homeViewAll: 'View all',
    homeOverview: 'Overview',
    homePinned: 'Pinned posts',
    homeActivity: 'Post activity',
    homeRepositories: 'posts',
    homeReadme: 'About me',
    blogEyebrow: 'BLOG',
    blogTitle: 'Posts',
    noPosts: 'No posts yet.',
    archiveEyebrow: 'TIMELINE',
    archiveTitle: 'Archive',
    searchPlaceholder: '🔍 Search titles or tags…',
    noResults: 'Nothing found.',
    photoEyebrow: 'ALBUMS',
    photoTitle: 'Albums',
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
