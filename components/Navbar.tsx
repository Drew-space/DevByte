"use client";

import Link from "next/link";
import { Button } from "./ui/button";
import { LogInIcon } from "lucide-react";
import { SignInButton, SignOutButton, UserButton, Show } from "@clerk/nextjs";

const Navbar = () => {
  const navLink = [
    { name: "Home", hrefs: "/" },
    { name: "Dashboard", hrefs: "/Dashboard" },
  ];

  return (
    <nav className="py-5 flex items-center justify-between mt-2 px-6">
      {/* Logo and nav links */}
      <div className="flex items-center gap-6">
        <Link href="/">
          <h1 className="text-3xl font-semibold">
            Byte <span className="text-blue-500">Journals</span>
          </h1>
        </Link>

        <div className="hidden sm:flex items-center gap-6">
          {navLink.map((link) => (
            <Link
              key={link.name}
              href={link.hrefs}
              className="text-sm font-medium hover:text-blue-500 transition-colors"
            >
              {link.name}
            </Link>
          ))}
        </div>
      </div>

      {/* User auth buttons */}
      <div className="flex items-center gap-4">
        {/* Only visible when signed in */}
        <Show when="signed-in">
          <UserButton />
          <SignOutButton>
            <Button
              variant="outline"
              size="sm"
              className="hidden sm:flex items-center gap-2"
            >
              <LogInIcon className="h-4 w-4" />
              Logout
            </Button>
          </SignOutButton>
        </Show>

        {/* Only visible when signed out */}
        <Show when="signed-out">
          <SignInButton mode="modal">
            <Button size="sm" className="hidden sm:flex items-center gap-2">
              Login
            </Button>
          </SignInButton>
        </Show>
      </div>
    </nav>
  );
};

export default Navbar;
