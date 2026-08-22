"use client";

import { useEffect, type ReactNode } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/lib/auth-context";
import { AuthLoading } from "@/components/auth/auth-loading";

export function GuestOnly({ children }: { children: ReactNode }) {
  const router = useRouter();
  const { isReady, user } = useAuth();

  useEffect(() => {
    if (isReady && user) {
      router.replace("/dashboard");
    }
  }, [isReady, user, router]);

  if (!isReady) {
    return <AuthLoading />;
  }

  if (user) {
    return <AuthLoading label="Redirecting..." />;
  }

  return <>{children}</>;
}
