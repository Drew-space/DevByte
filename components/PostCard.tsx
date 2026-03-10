"use client";

import Image from "next/image";

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
  title,
  content,
  imageUrl,
  authorName,
  authorImage,
  createdAt,
}: PostCardProps) {
  return (
    <div className="bg-white border rounded-xl shadow-sm overflow-hidden hover:shadow-md transition">
      {/* Post Image */}
      <Image
        src={imageUrl}
        alt={title}
        width={600}
        height={400}
        className="w-full h-52 object-cover"
      />

      <div className="p-4 space-y-3">
        {/* Title */}
        <h2 className="text-lg font-semibold line-clamp-2">{title}</h2>

        {/* Content Preview */}
        <p className="text-sm text-gray-600 line-clamp-3">{content}</p>

        {/* Author */}
        <div className="flex items-center gap-2 pt-2">
          <Image
            src={authorImage}
            alt={authorName}
            width={32}
            height={32}
            className="rounded-full"
          />

          <div className="flex flex-col">
            <span className="text-sm font-medium">{authorName}</span>
            <span className="text-xs text-gray-500">
              {new Date(createdAt).toLocaleDateString()}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
