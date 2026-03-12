"use client";
import { useState } from "react";
import { useMutation } from "convex/react";
import { api } from "@/convex/_generated/api";
import { Button } from "@/components/ui/button";
import { Spinner } from "./ui/spinner";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

export function SubmitButton() {
  const router = useRouter();
  const createBlog = useMutation(api.blog.createBlog);
  const generateUploadUrl = useMutation(api.blog.generateImageUploadUrl);
  const [loading, setLoading] = useState(false);

  return (
    <Button
      type="submit"
      disabled={loading}
      onClick={async (e) => {
        e.preventDefault();
        const form = e.currentTarget.closest("form") as HTMLFormElement;
        const formData = new FormData(form);
        const title = (formData.get("title") as string).trim();
        const content = (formData.get("content") as string).trim();
        const imageFile = formData.get("image") as File;

        if (!title || !content || !imageFile || imageFile.size === 0) {
          toast.warning("All fields are required", {
            style: {
              border: "1px spolid red",
              color: "#EF4444",
            },
          });
          return;
        }

        try {
          setLoading(true);

          const uploadUrl = await generateUploadUrl({});

          const uploadResult = await fetch(uploadUrl, {
            method: "POST",
            headers: { "Content-Type": imageFile.type },
            body: imageFile,
          });

          if (!uploadResult.ok) throw new Error("Failed to upload image");

          const { storageId } = await uploadResult.json();

          await createBlog({ title, content, imageStorageId: storageId });

          form.reset();
          toast.success("Post created!", {
            style: {
              border: "1px solid green",

              color: "#22C55E",
            },
          });
          router.push("/blog");
        } catch (err) {
          console.error(err);
          toast.error("Failed to create post");
        } finally {
          setLoading(false);
        }
      }}
    >
      {loading ? (
        <p className="flex items-center gap-2">
          Creating Post <Spinner />
        </p>
      ) : (
        "Create Post"
      )}
    </Button>
  );
}
