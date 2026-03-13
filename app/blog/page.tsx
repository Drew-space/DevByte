"use client";

import PostCardSkeleton from "@/components/loading";
import PostCard from "@/components/PostCard";
import { buttonVariants } from "@/components/ui/button";
import { api } from "@/convex/_generated/api";
import { useQuery } from "convex/react";
import Link from "next/link";

export default function Home() {
  const posts = useQuery(api.blog.getBlogPosts);

  if (!posts) {
    return (
      <div className="py-6">
        <div className="flex justify-between">
          <h1 className="text-3xl font-bold tracking-tight ">Latest Blog</h1>
          <Link
            className={buttonVariants() + " hidden md:inline-flex"}
            href="/Dashboard/create"
          >
            Create Post
          </Link>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {Array.from({ length: 6 }).map((_, i) => (
            <PostCardSkeleton key={i} />
          ))}
        </div>
      </div>
    );
  }
  return (
    <div className="  py-6">
      <div className="flex justify-between  ">
        <h1 className="text-xl md:text-3xl font-bold tracking-tight mb-8 ">
          Latest Blog
        </h1>
        <Link
          className={buttonVariants() + " hidden md:inline-flex"}
          href="/Dashboard/create"
        >
          Create Blog
        </Link>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {posts.map((post) => (
          <PostCard
            key={post._id}
            id={post._id}
            title={post.title}
            content={post.content}
            imageUrl={post.imageUrl}
            authorName={post.authorName}
            authorImage={post.authorImage}
            createdAt={post._creationTime}
          />
        ))}
      </div>
    </div>
  );
}
