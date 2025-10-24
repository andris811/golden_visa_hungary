/**
 * Internationalization configuration
 * Centralized translations for the bilingual site (Chinese/English)
 */

export type Lang = 'zh' | 'en';

export const translations = {
  zh: {
    // Brand & Navigation
    brand: '匈牙利黄金签证',
    program: '项目介绍',
    investment: '投资选项',
    process: '办理流程',
    about: '关于我们',
    contact: '联系我们',
    switch: 'EN',

    // Footer
    qrAlt: '微信二维码',
    rights: '版权所有',
  },
  en: {
    // Brand & Navigation
    brand: 'Hungary Golden Visa',
    program: 'Program',
    investment: 'Investment',
    process: 'Process',
    about: 'About',
    contact: 'Contact',
    switch: '中文',

    // Footer
    qrAlt: 'WeChat QR',
    rights: 'All rights reserved.',
  }
} as const;

/**
 * Get translations for a specific language
 * @param lang - Language code ('zh' or 'en')
 * @returns Translation object for the specified language
 */
export const getTranslations = (lang: Lang) => translations[lang];

/**
 * Get the opposite language
 * @param lang - Current language
 * @returns The other language
 */
export const getOtherLang = (lang: Lang): Lang => lang === 'zh' ? 'en' : 'zh';
