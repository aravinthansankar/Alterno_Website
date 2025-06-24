import { Suspense } from "react";
import TwoStepOnboarding from "@/components/onboarding/TwoStepOnboarding";
import OnboardingLoading from "@/components/onboarding/loading";

export default function OnboardingPage() {
  return (
    <Suspense fallback={<OnboardingLoading />}>
      <TwoStepOnboarding />
    </Suspense>
  );
} 