export default function OnboardingLoading() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-900">
      <div className="text-center">
        <div className="w-8 h-8 border-4 border-amber-500 border-t-transparent rounded-full animate-spin"></div>
        <p className="text-slate-400 mt-4">Loading onboarding...</p>
      </div>
    </div>
  );
} 