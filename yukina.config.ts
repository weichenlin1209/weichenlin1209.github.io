import I18nKeys from "./src/locales/keys";
import type { Configuration } from "./src/types/config";

const YukinaConfig: Configuration = {
  title: "Windson",
  subTitle: "",
  brandTitle: "Windson's Blog",

  description: "Here is the Social media of Windson, a somophore in National Chung Hsing University, majoring in Applied Mathematics.",

  site: "https://www.windson.cc/", // Your site URL

  locale: "zh-tw", // set for website language and date format

  navigators: [
    {
      nameKey: I18nKeys.nav_bar_home,
      href: "",
    },
    {
      nameKey: I18nKeys.nav_bar_archive,
      href: "/archive",
    },
    {
      nameKey: I18nKeys.nav_bar_blogroll,
      href: "/blogroll",
    },
    {
      nameKey: I18nKeys.nav_bar_about,
      href: "/about",
    },
  ],

  username: "Windson",
  sign: "Hello World!",
  avatarUrl: "https://gravatar.com/avatar/932e22160c9aeb41469a8c0ece40b38b0a62bd10598009d35a94e30dcb48b64d?v=1764580811000&size=512&d=initials",//"https://s2.loli.net/2025/01/25/FPpTrQSezM8ivbl.webp",
  socialLinks: [
    {
      icon: "line-md:github-loop",
      link: "https://github.com/weichenlin1209",
    },
    {
      icon: "line-md:email",
      link: "mailto:info@windson.cc",
    },
    {
      icon: "line-md:rss",
      link: "/rss.xml",
    },
    {
      icon: "line-md:text-box-multiple",
      link: "https://study.windson.cc"
    },
  ],
  maxSidebarCategoryChip: 6, // It is recommended to set it to a common multiple of 2 and 3
  maxSidebarTagChip: 12,
  maxFooterCategoryChip: 6,
  maxFooterTagChip: 24,

  banners: [
    "https://img.windson.cc/images/banner/6bKcwHZigzlM4mJ.webp",
    "https://img.windson.cc/images/banner/PBvHFjr5yDu6t4a.webp",
    "https://img.windson.cc/images/banner/H9WgEK6qNTcpFiS.webp",
    "https://img.windson.cc/images/banner/njNVtuUMzxs81RI.webp",
    "https://img.windson.cc/images/banner/tozsJ8QHAjFN3Mm.webp",
    "https://img.windson.cc/images/banner/Pm89OveZq7NWUxF.webp",
    "https://img.windson.cc/images/banner/UCYKvc1ZhgPHB9m.webp",
    "https://img.windson.cc/images/banner/JjpLOW8VSmufzlA.webp",
  ],

  slugMode: "RAW", // 'RAW' | 'HASH'

  license: {
    name: "CC BY-SA 4.0",
    url: "https://creativecommons.org/licenses/by-sa/4.0/",
  },

  // WIP functions
  bannerStyle: "LOOP", // 'loop' | 'static' | 'hidden'
};

export default YukinaConfig;
