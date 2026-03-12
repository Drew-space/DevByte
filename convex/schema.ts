import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";
import { title } from "process";

export default defineSchema({
  users: defineTable({
    email: v.string(),
    name: v.string(),
    clerkId: v.string(),
    imageUrl: v.string(),
    updatedAt: v.number(),
  }).index("by_clerkId", ["clerkId"]),

  blogPosts: defineTable({
    title: v.string(),
    content: v.string(),
    imageUrl: v.string(),
    authorId: v.id("users"),
    authorName: v.string(),
    authorImage: v.string(),
    imageStorageId: v.optional(v.id("_storage")),

    updatedAt: v.number(),
  }).index("by_author", ["authorId"]),
  // get all posts by a user /
});
