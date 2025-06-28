"use client";

import { useState, useEffect } from "react";
import { useForm, FormProvider } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight } from "lucide-react";
import ServiceConnectStep from "./steps/ServiceConnectStep";
import SquareLoginStep from "./steps/SquareLoginStep";
import { useSearchParams } from "next/navigation";

// Minimal schema for two-step flow
const Onboarding2Schema = z.object({
  selectedService: z.enum(["square", "shopify", "lightspeed", "cliniko", "other"]),
  squareIntegration: z.boolean().optional(),
});

type Onboarding2Data = z.infer<typeof Onboarding2Schema>;

const steps = [
  { id: 1, title: "Select Service", component: ServiceConnectStep },
  { id: 2, title: "Connect Square", component: SquareLoginStep },
];

export default function TwoStepOnboarding() {
  const [currentStep, setCurrentStep] = useState(1);
  const params = useSearchParams();

  // Sync step from query param (e.g., after OAuth callback)
  useEffect(() => {
    const stepParam = params.get("step");
    if (stepParam) {
      const num = Number(stepParam);
      if (!isNaN(num) && num !== currentStep) {
        setCurrentStep(num);
      }
    }
  }, [params, currentStep]);

  const methods = useForm<Onboarding2Data>({
    resolver: zodResolver(Onboarding2Schema),
    defaultValues: {
      selectedService: "square",
      squareIntegration: false,
    },
  });

  const { getValues, watch } = methods;

  const nextStep = () => {
    if (currentStep === 1) {
      const { selectedService } = getValues();
      if (selectedService !== "square") return; // only allow Square for now
    }
    if (currentStep < steps.length) {
      setCurrentStep(currentStep + 1);
    }
  };

  const prevStep = () => {
    if (currentStep > 1) setCurrentStep(currentStep - 1);
  };

  const CurrentStepComponent = steps[currentStep - 1].component;

  // Determine if we should disable the Next button on step 1
  const selectedService = watch("selectedService");
  const nextDisabled = currentStep === 1 && selectedService !== "square";

  return (
    <div className="min-h-screen bg-slate-900 flex items-center justify-center p-4">
      <div className="max-w-2xl w-full">
        {/* Progress Bar */}
        <div className="mb-8">
          <div className="flex justify-between items-center mb-4">
            {steps.map((step, index) => (
              <div
                key={step.id}
                className={`flex items-center ${index < steps.length - 1 ? "flex-1" : ""}`}
              >
                <div
                  className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium ${
                    currentStep >= step.id ? "bg-amber-500 text-white" : "bg-slate-700 text-slate-400"
                  }`}
                >
                  {step.id}
                </div>
                {index < steps.length - 1 && (
                  <div
                    className={`flex-1 h-1 mx-2 ${currentStep > step.id ? "bg-amber-500" : "bg-slate-700"}`}
                  />
                )}
              </div>
            ))}
          </div>
          <h2 className="text-xl font-semibold text-white text-center">{steps[currentStep - 1].title}</h2>
        </div>

        <div className="bg-slate-800 rounded-xl p-8 border border-slate-700">
          <FormProvider {...methods}>
            <form className="space-y-6">
              <CurrentStepComponent />

              {/* Navigation Buttons */}
              <div className="flex justify-between pt-6">
                <Button
                  type="button"
                  variant="outline"
                  onClick={prevStep}
                  disabled={currentStep === 1}
                  className="border-slate-600 text-white hover:bg-slate-700"
                >
                  <ChevronLeft className="w-4 h-4 mr-2" /> Previous
                </Button>

                {currentStep < steps.length && (
                  <Button
                    type="button"
                    onClick={nextStep}
                    disabled={nextDisabled}
                    className="bg-gradient-to-r from-amber-600 to-orange-600 hover:from-amber-700 hover:to-orange-700 text-white"
                  >
                    Next <ChevronRight className="w-4 h-4 ml-2" />
                  </Button>
                )}
              </div>
            </form>
          </FormProvider>
        </div>
      </div>
    </div>
  );
} 