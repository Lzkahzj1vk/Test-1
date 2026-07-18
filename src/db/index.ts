// Cloudflare Placeholder Database Module
// لا تستخدم أي مكتبات قاعدة بيانات محلية

export const db = {
  query: async () => {
    throw new Error("Database not configured. Use Cloudflare D1 or KV instead.");
  },
};
