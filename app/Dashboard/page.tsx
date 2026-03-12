"use client";

import PostCardSkeleton from "@/components/loading";
import PostCard from "@/components/PostCard";
import { buttonVariants } from "@/components/ui/button";
import { api } from "@/convex/_generated/api";
import { useUser } from "@clerk/nextjs";
import { useQuery } from "convex/react";
import { FileText } from "lucide-react";

import Link from "next/link";

export default function DashboardPage() {
  const { isLoaded, isSignedIn } = useUser();
  const userPost = useQuery(api.blog.getUserPosts, isSignedIn ? {} : "skip");

  // if (!isSignedIn) {
  //   return <p>Please sign in</p>;
  // }

  if (!userPost || !isLoaded) {
    return (
      <div className="py-6">
        <h1 className="text-3xl font-bold tracking-tight mb-8">Latest Blog</h1>

        <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {Array.from({ length: 6 }).map((_, i) => (
            <PostCardSkeleton key={i} />
          ))}
        </div>
      </div>
    );
  }

  if (userPost.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-20 text-center">
        <div className="flex items-center justify-center size-16 rounded-full bg-muted mb-4">
          <FileText className="size-8 text-muted-foreground" />
        </div>

        <h2 className="text-lg font-semibold text-gray-900">No blog yet</h2>

        <p className="text-sm text-muted-foreground mt-1 max-w-sm">
          You haven’t written any blog posts yet. Start sharing your ideas with
          the world.
        </p>
      </div>
    );
  }
  return (
    <div className="container mx-auto ">
      <div className="flex items-center justify-between mb-4 ">
        <h2 className="text-xl font-medium">Your Blog Articles</h2>

        <Link className={buttonVariants()} href="/Dashboard/create">
          Create Blog
        </Link>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-4">
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
