// Cloudflare D1 Schema (للاستخدام المستقبلي)
// عند التبديل إلى Cloudflare D1، استخدم هذا النمط:

/*
import {
  sqliteTable,
  integer,
  text,
  real,
} from "drizzle-orm/sqlite-core";

export const newsletter = sqliteTable("newsletter", {
  id: integer("id").primaryKey(),
  email: text("email").notNull().unique(),
  createdAt: text("created_at"),
});

export const orders = sqliteTable("orders", {
  id: integer("id").primaryKey(),
  customerName: text("customer_name").notNull(),
  customerEmail: text("customer_email").notNull(),
  items: text("items"),
  subtotal: real("subtotal").notNull(),
  shipping: real("shipping"),
  total: real("total").notNull(),
  shippingAddress: text("shipping_address"),
  paymentMethod: text("payment_method"),
  status: text("status"),
  createdAt: text("created_at"),
});
*/

// Placeholder export
export const DATABASE_SCHEMA = { configured: false };
