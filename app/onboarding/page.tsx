import withProtectedRoute from "@/lib/utils/withProtectedRoute";
import { Suspense } from "react";
import TwoStepOnboarding from "@/components/onboarding/TwoStepOnboarding";
import OnboardingLoading from "@/components/onboarding/loading";

function OnboardingPage() {
  return (
    <Suspense fallback={<OnboardingLoading />}>
      <TwoStepOnboarding />
    </Suspense>
  );
}

export default withProtectedRoute(OnboardingPage); 