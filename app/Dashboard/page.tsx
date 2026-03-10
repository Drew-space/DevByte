"use client";

import PostCard from "@/components/PostCard";
import { buttonVariants } from "@/components/ui/button";
import { api } from "@/convex/_generated/api";
import { useUser } from "@clerk/nextjs";
import { useQuery } from "convex/react";

import Link from "next/link";

export default function DashboardPage() {
  const { isLoaded, isSignedIn } = useUser();
  const userPost = useQuery(api.blog.getUserPosts, isSignedIn ? {} : "skip");

  if (!isLoaded) {
    return <p>Loading...</p>;
  }

  if (!isSignedIn) {
    return <p>Please sign in</p>;
  }

  if (!userPost) {
    return <p>Loading posts...</p>;
  }

  if (userPost.length === 0) {
    return <p>You don&lsquo;t have any posts yet</p>;
  }
  return (
    <div className="container mx-auto ">
      <div className="flex items-center justify-between mb-4 ">
        <h2 className="text-xl font-medium">Your Blog Articles</h2>

        <Link className={buttonVariants()} href="/Dashboard/create">
          Create Post
        </Link>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {userPost?.map((post) => (
          <div key={post._id} className="">
            <PostCard
              id={post._id}
              title={post.title}
              content={post.content}
              imageUrl={post.imageUrl}
              authorName={post.authorName}
              authorImage={post.authorImage}
              createdAt={post._creationTime}
            />
          </div>
        ))}
      </div>
    </div>
  );
}
