// ── 各语言 UI 字符串 ──
import type { Lang } from './site.config';

export interface UiStrings {
  welcomeEyebrow: string;
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
    blogEyebrow: 'BLOG / 文章',
    blogTitle: '文章列表',
    noPosts: '還沒有文章。',
    archiveEyebrow: 'TIMELINE / 時光軸',
    archiveTitle: '歸檔',
    searchPlaceholder: '🔍 搜尋文章標題或標籤…',
    noResults: '沒有找到相關文章。',
    photoEyebrow: 'PHOTO / 相簿',
    photoTitle: '照片',
    backToPhoto: '← 返回照片',
    photosCount: (n) => `${n} 張照片`,
    viewPhoto: (n) => `查看第 ${n} 張照片`,
    aboutEyebrow: 'ABOUT / 關於我',
    aboutTitle: '關於我',
    nowEyebrow: 'NOW / 近況',
    nowTitle: '近況',
    blogrollEyebrow: 'BLOGROLL / 部落滾',
    blogrollTitle: '部落滾',
    gameEyebrow: 'GAMES / 遊戲',
    gameTitle: '我玩的遊戲',
    tocLabel: '目錄',
    monthDay: (m, d) => `${m}月${d}日`,
    openMenu: '打開選單',
    notFoundTitle: '迷路了',
    notFoundText: '這個頁面不存在，正在帶你回首頁……',
    backHome: '返回首頁',
  },
  en: {
    welcomeEyebrow: 'WELCOME',
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
