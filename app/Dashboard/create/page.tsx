"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { SubmitButton } from "@/components/Submitbutton";
import Link from "next/link";
import { buttonVariants } from "@/components/ui/button";

export default function CreateBlogRoute() {
  const [preview, setPreview] = useState<string | null>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selected = e.target.files?.[0];
    if (selected) {
      setPreview(URL.createObjectURL(selected));
    }
  };

  return (
    <div className="container mx-auto">
      <Link className={buttonVariants()} href="/Dashboard">
        Go Back
      </Link>
      <div className="flex min-h-screen items-center justify-center">
        <Card className="max-w-lg w-full">
          <CardHeader>
            <CardTitle>Create Post</CardTitle>
            <CardDescription>
              Create a new blog to share with the world
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form className="flex flex-col gap-4">
              <div className="flex flex-col gap-2">
                <Label>Title</Label>
                <Input required type="text" name="title" placeholder="Title" />
              </div>

              <div className="flex flex-col gap-2">
                <Label>Content</Label>
                <Textarea
                  required
                  name="content"
                  placeholder="Content"
                  className="min-h-30 max-h-75 overflow-y-auto resize-none"
                />
              </div>

              <div className="flex flex-col gap-2">
                <Label>Image</Label>
                <Input
                  required
                  type="file"
                  name="image"
                  accept="image/*"
                  onChange={handleFileChange}
                />
                {preview && (
                  <img
                    src={preview}
                    alt="Preview"
                    className="w-full h-48 object-cover rounded-lg mt-2"
                  />
                )}
              </div>

              <SubmitButton />
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
