"use client";
 
import { ConvexAuthNextjsProvider } from "@convex-dev/auth/nextjs";
import { ConvexReactClient, ConvexProvider } from "convex/react";
import { ReactNode } from "react";
import { env } from "~/env";
 
const convex = new ConvexReactClient(env.NEXT_PUBLIC_CONVEX_URL!);
 
export function ConvexClientProvider({ children }: { children: ReactNode }) {
  return (
    <ConvexProvider client={convex}>
      {children}
    </ConvexProvider>
  );
}