// ملف مؤقت - سيتم استخدامه مع Cloudflare D1
// عند الانتقال إلى D1، يمكنك استخدام drizzle-orm/d1

/*
import {
  sqliteTable,
  integer,
  text,
  real,
  uniqueIndex,
  primaryKey,
} from "drizzle-orm/sqlite-core";

export const categories = sqliteTable(
  "categories",
  {
    id: integer("id").primaryKey(),
    name: text("name").notNull(),
    slug: text("slug").notNull().unique(),
    image: text("image"),
    description: text("description"),
    createdAt: text("created_at").default(new Date().toISOString()),
  }
);

export const orders = sqliteTable(
  "orders",
  {
    id: integer("id").primaryKey(),
    customerName: text("customer_name").notNull(),
    customerEmail: text("customer_email").notNull(),
    status: text("status").default("pending"),
    items: text("items"), // JSON string
    subtotal: real("subtotal").notNull(),
    shipping: real("shipping").default(0),
    total: real("total").notNull(),
    shippingAddress: text("shipping_address"), // JSON string
    paymentMethod: text("payment_method"),
    createdAt: text("created_at").default(new Date().toISOString()),
    updatedAt: text("updated_at").default(new Date().toISOString()),
  }
);

export const newsletter = sqliteTable(
  "newsletter",
  {
    id: integer("id").primaryKey(),
    email: text("email").notNull().unique(),
    createdAt: text("created_at").default(new Date().toISOString()),
  }
);
*/

// Placeholder for future Cloudflare D1 integration
export const DATABASE_SCHEMA = {
  description: "Database schema for Cloudflare D1",
  tables: [
    "categories",
    "products",
    "reviews",
    "orders",
    "wishlist_items",
    "cart_items",
    "newsletter",
  ],
};
