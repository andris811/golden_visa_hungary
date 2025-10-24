/**
 * Base path utilities for GitHub Pages deployment
 * Ensures all URLs are properly prefixed with the base path
 */

const RAW_BASE = import.meta.env.BASE_URL ?? '/';

/**
 * Normalized base path with guaranteed trailing slash
 * e.g., '/golden_visa_hungary/' in production, '/' in development
 */
export const BASE = RAW_BASE.endsWith('/') ? RAW_BASE : RAW_BASE + '/';

/**
 * Link helper that creates base-aware URLs
 * @param path - Path without leading slash (e.g., 'zh/contact/')
 * @returns Full path with base prefix
 * @example L('zh/contact/') => '/golden_visa_hungary/zh/contact/'
 */
export const L = (path: string): string => BASE + path.replace(/^\/+/, '');
