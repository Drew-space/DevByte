"use client";

import Image from "next/image";
import Link from "next/link";

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
    // <div className="bg-white border rounded-xl shadow-sm overflow-hidden hover:shadow-md transition">
    //   {/* Post Image */}
    //   <Image
    //     src={imageUrl}
    //     alt={title}
    //     width={600}
    //     height={400}
    //     className="w-full h-52 object-cover"
    //   />

    //   <div className="p-4 space-y-3">
    //     {/* Title */}
    //     <h2 className="text-lg font-semibold line-clamp-2">{title}</h2>

    //     {/* Content Preview */}
    //     <p className="text-sm text-gray-600 line-clamp-3">{content}</p>

    //     {/* Author */}
    //     <div className="flex items-center gap-2 pt-2">
    //       <Image
    //         src={authorImage}
    //         alt={authorName}
    //         width={32}
    //         height={32}
    //         className="rounded-full"
    //       />

    //       <div className="flex flex-col">
    //         <span className="text-sm font-medium">{authorName}</span>
    //         <span className="text-xs text-gray-500">
    //           {new Intl.DateTimeFormat("en-US", {
    //             year: "numeric",
    //             month: "short",
    //             day: "numeric",
    //           }).format(createdAt)}
    //         </span>
    //       </div>
    //     </div>
    //   </div>
    // </div>

    <div className="group relative overflow-hidden rounded-lg border border-gray-200 bg-white shadow-md transition-all hover:shadow-lg">
      <Link href={`/blog/${id}`} className="block w-full h-full">
        <div className="relative h-48 w-full overflow-hidden">
          <Image
            src={imageUrl}
            alt="Image for blog"
            fill
            className="object-cover transition-transform duration-300 group-hover:scale-105"
          />
        </div>

        <div className="p-4">
          <h3 className="mb-2 text-lg font-semibold text-gray-900">{title}</h3>

          <p className="mb-4 text-sm text-gray-600 line-clamp-2">{content}</p>

          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <div className="relative size-8 overflow-hidden rounded-full">
                <Image
                  src={authorImage}
                  alt={authorName}
                  fill
                  className="object-cover"
                />
              </div>
              <p className="text-sm font-medium text-gray-700">{authorName}</p>
            </div>

            <time className="text-xs text-gray-500">
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
