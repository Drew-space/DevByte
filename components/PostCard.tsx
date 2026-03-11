"use client";

import Image from "next/image";
import Link from "next/link";
import { Skeleton } from "./ui/skeleton";

type PostCardProps = {
  id: string;
  title: string;
  content: string;
  imageUrl: string;
  authorName: string;
  authorImage: string;
  createdAt: number;
};

export default function PostCard({
  id,
  title,
  content,
  imageUrl,
  authorName,
  authorImage,
  createdAt,
}: PostCardProps) {
  return (
    <div className="group relative overflow-hidden rounded-lg border border-gray-200 bg-white shadow-md transition-all hover:shadow-lg">
      <Link href={`/blog/${id}`} className="block w-full h-full">
        {/* Image */}
        <div className="relative h-36 sm:h-48 w-full overflow-hidden">
          <Image
            src={imageUrl}
            alt="Image for blog"
            fill
            className="object-cover transition-transform duration-300 group-hover:scale-105"
          />
        </div>

        <div className="p-3 sm:p-4">
          {/* Title */}
          <h3 className="mb-1 sm:mb-2 text-sm sm:text-lg font-semibold text-gray-900 line-clamp-1">
            {title}
          </h3>

          {/* Content */}
          <p className="mb-3 sm:mb-4 text-xs sm:text-sm text-gray-600 line-clamp-2">
            {content}
          </p>

          {/* Author + Date */}
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-1 sm:space-x-2">
              {/* Clerk avatar */}
              <div className="relative size-6 sm:size-8 overflow-hidden rounded-full">
                <Image
                  src={authorImage}
                  alt={authorName}
                  fill
                  className="object-cover"
                />
              </div>

              {/* Author name */}
              <p className="text-xs sm:text-sm font-medium text-gray-700 truncate max-w-17.5 sm:max-w-none">
                {authorName}
              </p>
            </div>

            {/* Date */}
            <time className="text-[10px] truncate max-w-17.5 sm:max-w-none sm:text-xs text-gray-500">
              {new Intl.DateTimeFormat("en-US", {
                year: "numeric",
                month: "short",
                day: "numeric",
              }).format(createdAt)}
            </time>
          </div>
        </div>
      </Link>
    </div>
  );
}
