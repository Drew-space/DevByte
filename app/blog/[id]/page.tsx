"use client";
import { use } from "react";
import { useQuery } from "convex/react";
import { api } from "@/convex/_generated/api";
import { Id } from "@/convex/_generated/dataModel";

export default function BlogPostPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = use(params);

  const post = useQuery(
    api.blog.getPostById,
    id ? { id: id as Id<"blogPosts"> } : "skip",
  );

  if (post === undefined) return <div>Loading...</div>;
  if (post === null) return <div>Post not found.</div>;

  return (
    <div className="max-w-3xl mx-auto py-8 px-4">
      <h1 className="text-4xl font-bold mb-4">{post.title}</h1>
      <img
        src={post.imageUrl}
        alt={post.title}
        className="w-full rounded-xl mb-6"
      />
      <p className="text-sm text-muted-foreground mb-4">By {post.authorName}</p>
      <div className="text-lg leading-relaxed">{post.content}</div>
    </div>
  );
}
