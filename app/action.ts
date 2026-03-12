"use server";

import { api } from "@/convex/_generated/api";
import { auth } from "@clerk/nextjs/server";
import { fetchMutation } from "convex/nextjs";

export async function handleSubmission(formData: FormData) {
  const { getToken } = auth();
  const token = await getToken({ template: "convex" });

  const title = formData.get("title") as string;
  const content = formData.get("content") as string;
  const file = formData.get("image") as File;

  // Step 1: get upload URL from Convex
  const uploadUrl = await fetchMutation(
    api.blog.generateImageUploadUrl,
    {},
    { token },
  );

  // Step 2: upload the image file to Convex storage
  const uploadResponse = await fetch(uploadUrl, {
    method: "POST",
    headers: { "Content-Type": file.type },
    body: file,
  });

  const { storageId } = await uploadResponse.json();

  // Step 3: create the blog post with the storageId
  await fetchMutation(
    api.blog.createBlog,
    {
      title,
      content,
      imageStorageId: storageId,
    },
    { token },
  );
}
