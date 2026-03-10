import { v } from "convex/values";
import { mutation, query } from "./_generated/server";

export const createBlog = mutation({
  args: {
    title: v.string(),
    content: v.string(),
    imageUrl: v.string(),
  },

  handler: async (ctx, args) => {
    const identity = await ctx.auth.getUserIdentity();

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
      imageUrl: args.imageUrl,
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

    // Map to include _creationTime as createdAt
    return posts.map((post) => ({
      id: post._id,
      title: post.title,
      content: post.content,
      imageUrl: post.imageUrl,
      authorId: post.authorId,
      authorName: post.authorName,
      authorImage: post.authorImage,
      createdAt: post._creationTime, //time stamp from convex already built in
      updatedAt: post.updatedAt,
    }));
  },
});
