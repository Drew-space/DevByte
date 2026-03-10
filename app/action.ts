"use server";

import { api } from "@/convex/_generated/api";
import { auth } from "@clerk/nextjs/server";
import { fetchMutation } from "convex/nextjs";

export async function handleSubmission(formData: FormData) {
  const { getToken } = auth();

  const token = await getToken({ template: "convex" });

  const title = formData.get("title") as string;
  const content = formData.get("content") as string;
  const imageUrl = formData.get("url") as string;

  await fetchMutation(
    api.blog.createBlog,
    {
      title,
      content,
      imageUrl,
    },
    { token },
  );
}
