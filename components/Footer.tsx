"use client";

import Link from "next/link";
import { Separator } from "@/components/ui/separator";

export default function Footer() {
  return (
    <footer className="mt-12">
      <Separator className="mb-4" />
      <p className="text-center py-4">
        &copy; Copy {new Date().getFullYear()} made by{" "}
        <Link
          href={"https://github.com/Drew-space"}
          className="underline font-semibold"
        >
          Drew
        </Link>
        ❤️ AllRights reserved{" "}
      </p>
    </footer>
  );
}
