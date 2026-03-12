import { v } from "convex/values";
import { mutation, query } from "./_generated/server";

export const createBlog = mutation({
  args: {
    title: v.string(),
    content: v.string(),
    // imageUrl: v.string(),
    imageStorageId: v.id("_storage"),
  },

  handler: async (ctx, args) => {
    const identity = await ctx.auth.getUserIdentity();
    const imageUrl = await ctx.storage.getUrl(args.imageStorageId);
    if (!imageUrl) throw new Error("Image not found");

    if (!identity) {
      throw new Error("User not authenticated");
    }

    // looking for the user inside the database using clerkId
    const user = await ctx.db
      .query("users")
      .withIndex("by_clerkId", (q) => q.eq("clerkId", identity.subject))
      .unique();

    if (!user) {
      throw new Error("User not found");
    }

    return await ctx.db.insert("blogPosts", {
      title: args.title,
      content: args.content,
      imageUrl: imageUrl,
      imageStorageId: args.imageStorageId,
      authorId: user._id,
      authorName: user.name,
      authorImage: user.imageUrl,

      updatedAt: Date.now(),
    });
  },
});

export const getBlogPosts = query({
  args: {},
  handler: async (ctx) => {
    const posts = await ctx.db.query("blogPosts").collect();

    return posts;
  },
});

export const getUserPosts = query({
  args: {},

  handler: async (ctx) => {
    const identity = await ctx.auth.getUserIdentity();

    if (!identity) {
      throw new Error("User not authenticated");
    }

    const user = await ctx.db
      .query("users")
      .withIndex("by_clerkId", (q) => q.eq("clerkId", identity.subject))
      .unique();

    if (!user) {
      throw new Error("User not found");
    }

    const posts = await ctx.db
      .query("blogPosts")
      .withIndex("by_author", (q) => q.eq("authorId", user._id))
      .order("desc")
      .collect();

    return posts;
  },
});

export const getPostById = query({
  args: { id: v.id("blogPosts") },
  handler: async (ctx, { id }) => {
    const post = await ctx.db.get(id);
    if (!post) return null;

    return {
      id: post._id,
      title: post.title,
      content: post.content,
      imageUrl: post.imageUrl,
      authorId: post.authorId,
      authorName: post.authorName,
      authorImage: post.authorImage,
      createdAt: post._creationTime,
      updatedAt: post.updatedAt,
    };
  },
});

export const generateImageUploadUrl = mutation(async (ctx) => {
  return await ctx.storage.generateUploadUrl();
});
