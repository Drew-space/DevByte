"use client";

import { use } from "react";
import { useQuery } from "convex/react";
import { api } from "@/convex/_generated/api";
import { Id } from "@/convex/_generated/dataModel";
import Link from "next/link";
import { buttonVariants } from "@/components/ui/button";
import Image from "next/image";
import { Card, CardContent } from "@/components/ui/card";

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

  // Skeleton function
  function renderSkeleton() {
    return (
      <div className="max-w-3xl mx-auto py-8 px-4 animate-pulse space-y-6">
        {/* Back button skeleton */}
        <div className="h-10 w-32 rounded bg-gray-300" />

        {/* Title skeleton */}
        <div className="space-y-4 mt-6">
          <div className="h-8 w-3/4 rounded bg-gray-300" />

          {/* Author info skeleton */}
          <div className="flex items-center space-x-4">
            <div className="h-10 w-10 rounded-full bg-gray-300" />
            <div className="h-4 w-32 rounded bg-gray-300" />
          </div>
        </div>

        {/* Image skeleton */}
        <div className="h-64 w-full rounded-lg bg-gray-300" />

        {/* Content skeleton */}
        <Card>
          <CardContent className="pt-6 space-y-4">
            <div className="h-4 w-full rounded bg-gray-300" />
            <div className="h-4 w-full rounded bg-gray-300" />
            <div className="h-4 w-5/6 rounded bg-gray-300" />
            <div className="h-4 w-4/6 rounded bg-gray-300" />
          </CardContent>
        </Card>
      </div>
    );
  }

  // Render skeleton if loading
  if (post === undefined) return renderSkeleton();
  if (post === null) return <div>Post not found.</div>;

  return (
    <div className="max-w-3xl mx-auto py-8 px-4">
      <Link href={"/"} className={buttonVariants({ variant: "secondary" })}>
        Back to blogs
      </Link>

      <div className="mb-8 mt-6">
        <h1 className="text-md md:text-3xl font-bold tracking-tight mb-4">
          {post.title}
        </h1>
        <div className=" max-sm:justify-between flex items-center space-x-4">
          <div className="flex items-center space-x-2">
            <div className="relative size-10 overflow-hidden rounded-full">
              <Image
                src={post.authorImage}
                alt="image"
                fill
                className="object-cover"
              />
            </div>
            <p>{post.authorName}</p>
          </div>
          <p className="text-sm text-gray-500">
            {new Intl.DateTimeFormat("en-US", {
              year: "numeric",
              month: "long",
              day: "numeric",
            }).format(post.createdAt)}
          </p>
        </div>
      </div>

      <div className="relative w-full mb-8 overflow-hidden rounded-lg h-64 sm:h-80 md:h-96 lg:h-[400px]">
        <Image
          src={post.imageUrl}
          alt={post.title}
          fill
          className="object-cover object-center transition-transform duration-500 hover:scale-105"
          priority
        />
      </div>

      <Card>
        <CardContent className="pt-6">
          <article className="prose prose-lg max-w-none">
            {post.content.split("\n\n").map((paragraph, i) => (
              <p key={i}>{paragraph}</p>
            ))}
          </article>
        </CardContent>
      </Card>
    </div>
  );
}
