"use client";

import { buttonVariants } from "@/components/ui/button";
import Link from "next/link";

export default function DashboardPage() {
  return (
    <div className="container mx-auto ">
      <div className="flex items-center justify-between mb-4 ">
        <h2 className="text-xl font-medium">Your Blog Articles</h2>

        <Link className={buttonVariants()} href="/Dashboard/create">
          Create Post
        </Link>
      </div>
    </div>
  );
}
