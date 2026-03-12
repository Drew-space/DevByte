// import { handleSubmission } from "@/app/action";
// import { SubmitButton } from "@/components/Submitbutton";

// import {
//   Card,
//   CardContent,
//   CardDescription,
//   CardHeader,
//   CardTitle,
// } from "@/components/ui/card";
// import { Input } from "@/components/ui/input";
// import { Label } from "@/components/ui/label";
// import { Textarea } from "@/components/ui/textarea";

// export default function CreateBlogroute() {
//   return (
//     <div className="flex min-h-screen items-center justify-center">
//       <Card className=" max-w-lg w-full  ">
//         <CardHeader>
//           <CardTitle>Create Post</CardTitle>
//           <CardDescription>
//             Create a new post to share with the world
//           </CardDescription>
//         </CardHeader>
//         <CardContent>
//           <form className="flex flex-col gap-4" action={handleSubmission}>
//             <div className="flex flex-col gap-2">
//               <Label>Title</Label>
//               <Input name="title" required type="text" placeholder="Title" />
//             </div>
//             <div className="flex flex-col gap-2">
//               <Label>Content</Label>
//               <Textarea name="content" required placeholder="Content" />
//             </div>

//             <div className="flex flex-col gap-2">
//               <Label>Image URL</Label>
//               <Input name="url" required type="url" placeholder="Image url" />
//             </div>

//             <SubmitButton />
//           </form>
//         </CardContent>
//       </Card>
//     </div>
//   );
// }"use client";

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

export default function CreateBlogRoute() {
  const [preview, setPreview] = useState<string | null>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selected = e.target.files?.[0];
    if (selected) {
      setPreview(URL.createObjectURL(selected));
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center">
      <Card className="max-w-lg w-full">
        <CardHeader>
          <CardTitle>Create Post</CardTitle>
          <CardDescription>
            Create a new post to share with the world
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
              <Textarea required name="content" placeholder="Content" />
            </div>

            <div className="flex flex-col gap-2">
              <Label>Image</Label>
              <Input
                required
                type="file"
                name="image"
                accept="image/*"
                capture="environment"
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
  );
}
