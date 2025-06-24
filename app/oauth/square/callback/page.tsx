"use client";

import { useEffect, useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { CheckCircle, XCircle, Loader2 } from 'lucide-react';
import { useAppSelector } from '@/lib/store/hooks';
import { ClientSessionManager } from '@/lib/square/clientSessionManager';
import { Suspense } from "react";
import SquareOAuthCallbackContent from "@/components/oauth/square/SquareOAuthCallbackContent";
import OAuthLoading from "@/components/oauth/loading";

export default function SquareOAuthCallback() {
  return (
    <Suspense fallback={<OAuthLoading />}>
      <SquareOAuthCallbackContent />
    </Suspense>
  );
} 