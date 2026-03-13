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
import { Button, buttonVariants } from "@/components/ui/button";
import { auth } from "@clerk/nextjs/server";
import { useAuth } from "@clerk/nextjs";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { AlertCircleIcon } from "lucide-react";

export default function CreateBlogRoute() {
  const [preview, setPreview] = useState<string | null>(null);
  const { has } = useAuth();
  const hasPaidPlan = has({ plan: "pro" });

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

      {hasPaidPlan && (
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
                  <Input
                    required
                    type="text"
                    name="title"
                    placeholder="Title"
                  />
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
      )}

      {!hasPaidPlan && (
        <div className="flex items-center justify-center min-h-screen px-4">
          <Alert className="max-w-lg w-full text-center">
            <AlertCircleIcon className="mx-auto mb-2" />

            <AlertTitle className="text-lg font-semibold">
              Post Creation Locked — Upgrade Required
            </AlertTitle>

            <AlertDescription className="mt-2 text-sm">
              Your current plan does not allow you to create blog posts. Upgrade
              your account to start sharing your ideas with the world.
              <div className="mt-4">
                <Link className={buttonVariants()} href="/pricing">
                  {" "}
                  <p className="underline-none"> Upgrade your plan</p>
                </Link>
              </div>
              <span className="sr-only">
                Upgrade your plan to unlock blog publishing.
              </span>
            </AlertDescription>
          </Alert>
        </div>
      )}
    </div>
  );
}

// "use client";

// import { useState } from "react";
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
// import { SubmitButton } from "@/components/Submitbutton";
// import Link from "next/link";
// import { buttonVariants } from "@/components/ui/button";
// import { useAuth } from "@clerk/nextjs";
// import { Loader2 } from "lucide-react";
// import { useRouter } from "next/navigation";
// import { useEffect } from "react";

// export default function CreateBlogRoute() {
//   const [preview, setPreview] = useState<string | null>(null);
//   const { has, isLoaded } = useAuth();
//   const router = useRouter();

//   const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//     const selected = e.target.files?.[0];
//     if (selected) {
//       setPreview(URL.createObjectURL(selected));
//     }
//   };

//   useEffect(() => {
//     if (!isLoaded) return;
//     const hasPaidPlan = has({ plan: "pro" }); // exact slug from Clerk dashboard
//     if (!hasPaidPlan) {
//       router.push("/pricing");
//     }
//   }, [isLoaded]);

//   if (!isLoaded) {
//     return (
//       <div className="flex min-h-screen items-center justify-center">
//         <Loader2 className="animate-spin w-6 h-6 text-muted-foreground" />
//       </div>
//     );
//   }

//   return (
//     <div className="container mx-auto">
//       <Link className={buttonVariants()} href="/Dashboard">
//         Go Back
//       </Link>
//       <div className="flex min-h-screen items-center justify-center">
//         <Card className="max-w-lg w-full">
//           <CardHeader>
//             <CardTitle>Create Post</CardTitle>
//             <CardDescription>
//               Create a new blog to share with the world
//             </CardDescription>
//           </CardHeader>
//           <CardContent>
//             <form className="flex flex-col gap-4">
//               <div className="flex flex-col gap-2">
//                 <Label>Title</Label>
//                 <Input required type="text" name="title" placeholder="Title" />
//               </div>

//               <div className="flex flex-col gap-2">
//                 <Label>Content</Label>
//                 <Textarea
//                   required
//                   name="content"
//                   placeholder="Content"
//                   className="min-h-30 max-h-75 overflow-y-auto resize-none"
//                 />
//               </div>

//               <div className="flex flex-col gap-2">
//                 <Label>Image</Label>
//                 <Input
//                   required
//                   type="file"
//                   name="image"
//                   accept="image/*"
//                   onChange={handleFileChange}
//                 />
//                 {preview && (
//                   <img
//                     src={preview}
//                     alt="Preview"
//                     className="w-full h-48 object-cover rounded-lg mt-2"
//                   />
//                 )}
//               </div>

//               <SubmitButton />
//             </form>
//           </CardContent>
//         </Card>
//       </div>
//     </div>
//   );
// }
