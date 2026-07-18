// ملف مؤقت - استخدم Cloudflare D1 أو KV عند الحاجة لقاعدة بيانات

export interface Database {
  // placeholder for future database integration
}

// عند إضافة قاعدة بيانات D1 في Cloudflare، استخدم هذا النمط:
/*
import { drizzle } from "drizzle-orm/d1";

export const db = drizzle(env.DB);
*/

// أو استخدم KV Store:
/*
import { KVNamespace } from "@cloudflare/workers-types";

export const kv: KVNamespace = env.NEWSLETTER_KV;
*/
