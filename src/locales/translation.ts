import type I18nKeys from "./keys";
import { en } from "./languages/en";
import { zh_TW } from "./languages/zh_tw.ts";

export type Translation = {
  [K in I18nKeys]: string;
};

const map: { [key: string]: Translation } = {
  en: en,
  zh: zh_TW,
  "zh-tw": zh_TW,
};

export function getTranslation(lang: string): Translation {
  return map[lang.toLowerCase()] || en;
}

export function i18n(key: I18nKeys, lang: string = "zh", ...interpolations: string[]): string {
  let translation = getTranslation(lang)[key];
  interpolations.forEach((interpolation) => {
    translation = translation.replace("{{}}", interpolation);
  });
  return translation;
}

export function getLocaleName(lang: string): string {
  const names: Record<string, string> = {
    en: "English",
    "zh-tw": "中文",
  };
  return names[lang.toLowerCase()] || names.en;
}
