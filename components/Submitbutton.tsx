"use client";

import { useState } from "react";
import { useMutation } from "convex/react";
import { api } from "@/convex/_generated/api";
import { Button } from "@/components/ui/button";
import { Spinner } from "./ui/spinner";
import { toast } from "sonner";
import { redirect } from "next/navigation";

export function SubmitButton() {
  const createBlog = useMutation(api.blog.createBlog);
  const [loading, setLoading] = useState(false);

  return (
    // <Button
    //   type="submit"
    //   disabled={loading}
    //   onClick={async (e) => {
    //     e.preventDefault();

    //     const form = e.currentTarget.closest("form") as HTMLFormElement;
    //     const formData = new FormData(form);

    //     const title = (formData.get("title") as string).trim();
    //     const content = (formData.get("content") as string).trim();
    //     const imageUrl = (formData.get("url") as string).trim();

    //     if (!title || !content || !imageUrl) {
    //       toast.warning("All fields are required", {
    //         style: {
    //           border: "1px solid red",
    //           color: "red",
    //         },
    //       });
    //       return;
    //     }

    //     try {
    //       setLoading(true);

    //       await createBlog({
    //         title,
    //         content,
    //         imageUrl,
    //       });

    //       form.reset();
    //       toast.success("Post created!", {
    //         style: {
    //           border: "1px solid green",
    //           color: "green",
    //         },
    //       });
    //     } finally {
    //       setLoading(false);
    //     }
    //   }}
    // >
    //   {loading ? (
    //     <p className="flex items-center">
    //       Creating Post
    //       <Spinner />
    //     </p>
    //   ) : (
    //     "Create Post"
    //   )}
    // </Button>
    <Button
      type="submit"
      disabled={loading}
      onClick={async (e) => {
        e.preventDefault();

        const form = e.currentTarget.closest("form") as HTMLFormElement;
        const formData = new FormData(form);

        const title = (formData.get("title") as string).trim();
        const content = (formData.get("content") as string).trim();
        const imageUrl = (formData.get("url") as string).trim();

        // ✅ validation
        if (!title || !content || !imageUrl) {
          toast.warning("All fields are required", {
            style: {
              border: "1px solid red",
              color: "red",
            },
          });
          return; // stop submission
        }

        try {
          setLoading(true);

          await createBlog({
            title,
            content,
            imageUrl,
          });

          form.reset();
          toast.success("Post created!", {
            style: {
              border: "1px solid green",
              color: "green",
            },
          });
          return redirect("/");
        } catch (err) {
          console.log(err);
        } finally {
          setLoading(false);
        }
      }}
    >
      {loading ? (
        <p className="flex items-center">
          Creating Post
          <Spinner />
        </p>
      ) : (
        "Create Post"
      )}
    </Button>
  );
}
// make sure you have react-hot-toast installed
