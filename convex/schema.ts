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

    updatedAt: v.number(),
  }).index("by_author", ["authorId"]), // get all posts by a user /
});

// https://images.unsplash.com/photo-1621615578530-cbf3c443165f?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D

// https://img.clerk.com/eyJ0eXBlIjoicHJveHkiLCJzcmMiOiJodHRwczovL2ltYWdlcy5jbGVyay5kZXYvb2F1dGhfZ29vZ2xlL2ltZ18zQWlEcW1scGVLQVE4eklZZWV0TVdxVk5heW0ifQ

// Enudeme Chukwuka
