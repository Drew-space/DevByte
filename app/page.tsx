"use client";

import PostCard from "@/components/PostCard";
import { api } from "@/convex/_generated/api";
import { useQuery } from "convex/react";

export default function Home() {
  const posts = useQuery(api.blog.getBlogPosts);

  if (!posts) {
    return <div className="p-6">Loading posts...</div>;
  }

  return (
    <div className="  py-6">
      <h1 className="text-3xl font-bold tracking-tight mb-8">Latest Blog</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {posts.map((post) => (
          <PostCard
            key={post.id}
            id={post.id}
            title={post.title}
            content={post.content}
            imageUrl={post.imageUrl}
            authorName={post.authorName}
            authorImage={post.authorImage}
            createdAt={post.createdAt}
          />
        ))}
      </div>
    </div>
  );
}
