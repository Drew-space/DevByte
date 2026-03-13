import { v } from "convex/values";
import { mutation, query } from "./_generated/server";

export const createUser = mutation({
  args: {
    email: v.string(),
    name: v.string(),
    clerkId: v.string(),
    imageUrl: v.string(),
  },
  handler: async (ctx, args) => {
    const existingUser = await ctx.db
      .query("users")
      .withIndex("by_clerkId", (q) => q.eq("clerkId", args.clerkId))
      .unique();

    if (existingUser) {
      console.log("User already exists");
      return existingUser._id;
    }

    const userId = await ctx.db.insert("users", {
      email: args.email,
      name: args.name,
      clerkId: args.clerkId,
      imageUrl: args.imageUrl,
      updatedAt: Date.now(),
    });
    return userId;
  },
});

export const deleteUserAndPosts = mutation({
  args: { clerkId: v.string() },
  handler: async (ctx, args) => {
    // Find the user
    const user = await ctx.db
      .query("users")
      .withIndex("by_clerkId", (q) => q.eq("clerkId", args.clerkId))
      .unique();

    if (!user) return;

    // Delete all their blog posts + images from storage
    const posts = await ctx.db
      .query("blogPosts")
      .withIndex("by_author", (q) => q.eq("authorId", user._id))
      .collect();

    await Promise.all(
      posts.map(async (post) => {
        // Delete image from Convex storage if it exists
        if (post.imageStorageId) {
          await ctx.storage.delete(post.imageStorageId);
        }
        // Delete the post
        await ctx.db.delete(post._id);
      }),
    );

    // Delete the user
    await ctx.db.delete(user._id);
  },
});
