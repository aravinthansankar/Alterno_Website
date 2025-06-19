"use client";

import { useState } from "react";
import { useForm, FormProvider } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { OnboardingSchema, OnboardingData } from "@/lib/types/onboarding";
import { useAppSelector } from "@/lib/store/hooks";
import { useCreateStoreMutation } from "@/lib/store/services/onboardingApi";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight } from "lucide-react";

// Import step components
import BusinessTypeStep from "./steps/BusinessTypeStep";
import StoreInfoStep from "./steps/StoreInfoStep";
import ServiceSelectionStep from "./steps/ServiceSelectionStep";
import ReviewStep from "./steps/ReviewStep";

const steps = [
  { id: 1, title: "Business Type", component: BusinessTypeStep },
  { id: 2, title: "Store Information", component: StoreInfoStep },
  { id: 3, title: "Service Selection", component: ServiceSelectionStep },
  { id: 4, title: "Review & Complete", component: ReviewStep },
];

export default function OnboardingForm() {
  const [currentStep, setCurrentStep] = useState(1);
  const { user } = useAppSelector((state) => state.auth);
  const [createStore, { isLoading }] = useCreateStoreMutation();
  const router = useRouter();

  const methods = useForm<OnboardingData>({
    resolver: zodResolver(OnboardingSchema),
    defaultValues: {
      storeName: "",
      businessType: undefined,
      address: "",
      phone: "",
      email: user?.email || "",
      website: "",
      description: "",
      selectedServices: [],
      squareIntegration: false,
      marketingFrequency: "weekly",
    },
  });

  const { handleSubmit, trigger, getValues, formState: { errors } } = methods;

  const nextStep = async () => {
    let isValid = false;
    
    // Validate only the fields for the current step
    switch (currentStep) {
      case 1:
        // Business Type step - only validate businessType
        const businessType = getValues("businessType");
        if (!businessType) {
          toast.error("Please select a business type");
          return;
        }
        isValid = true;
        break;
      case 2:
        // Store Info step - validate store information fields
        isValid = await trigger(["storeName", "address", "phone", "email", "description"]);
        break;
      case 3:
        // Service Selection step - validate selectedServices
        const selectedServices = getValues("selectedServices");
        if (!selectedServices || selectedServices.length === 0) {
          toast.error("Please select at least one service");
          return;
        }
        isValid = true;
        break;
      case 4:
        // Review step - no validation needed
        isValid = true;
        break;
      default:
        isValid = false;
    }

    if (isValid && currentStep < steps.length) {
      setCurrentStep(currentStep + 1);
    }
  };

  const prevStep = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const onSubmit = async (data: OnboardingData) => {
    console.log("Form submitted with data:", data);
    console.log("User ID:", user?.uid);
    console.log("Form is valid:", methods.formState.isValid);
    
    if (!user?.uid) {
      toast.error("User not authenticated");
      return;
    }

    // Ensure all required fields are present
    if (!data.businessType) {
      toast.error("Business type is required");
      return;
    }

    if (!data.selectedServices || data.selectedServices.length === 0) {
      toast.error("Please select at least one service");
      return;
    }

    // Log the complete data structure
    const completeData = {
      ...data,
      userId: user.uid,
    };
    console.log("Complete data to be saved:", completeData);

    try {
      console.log("Creating store with userId:", user.uid);
      console.log("Store data:", data);
      
      const result = await createStore({
        userId: user.uid,
        storeData: data,
      }).unwrap();

      console.log("Store created successfully:", result);
      toast.success("Store setup completed successfully!");
      router.push("/dashboard");
    } catch (error: any) {
      console.error("Error creating store:", error);
      toast.error(error.error || "Failed to create store");
    }
  };

  const handleCompleteSetup = async () => {
    console.log("Complete Setup button clicked");
    const formData = getValues();
    console.log("Current form data:", formData);
    
    if (!user?.uid) {
      toast.error("User not authenticated");
      return;
    }

    // Test Firebase connection
    try {
      console.log("Testing Firebase connection...");
      const { db } = await import('@/lib/firebase');
      console.log("Firebase db imported successfully:", db);
    } catch (error) {
      console.error("Firebase import error:", error);
      toast.error("Firebase connection error");
      return;
    }

    // Test createStore mutation
    console.log("createStore mutation:", createStore);
    console.log("createStore type:", typeof createStore);

    // Ensure all required fields are present
    if (!formData.businessType) {
      toast.error("Business type is required");
      return;
    }

    if (!formData.selectedServices || formData.selectedServices.length === 0) {
      toast.error("Please select at least one service");
      return;
    }

    try {
      console.log("About to call createStore mutation");
      console.log("User ID:", user.uid);
      console.log("Store data:", formData);
      
      const result = await createStore({
        userId: user.uid,
        storeData: formData,
      }).unwrap();

      console.log("Store created successfully:", result);
      toast.success("Store setup completed successfully!");
      router.push("/dashboard");
    } catch (error: any) {
      console.error("Error creating store:", error);
      toast.error(error.error || "Failed to create store");
    }
  };

  const CurrentStepComponent = steps[currentStep - 1].component;

  return (
    <div className="min-h-screen bg-slate-900 flex items-center justify-center p-4">
      <div className="max-w-2xl w-full">
        {/* Progress Bar */}
        <div className="mb-8">
          <div className="flex justify-between items-center mb-4">
            {steps.map((step, index) => (
              <div
                key={step.id}
                className={`flex items-center ${
                  index < steps.length - 1 ? "flex-1" : ""
                }`}
              >
                <div
                  className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium ${
                    currentStep >= step.id
                      ? "bg-purple-500 text-white"
                      : "bg-slate-700 text-slate-400"
                  }`}
                >
                  {step.id}
                </div>
                {index < steps.length - 1 && (
                  <div
                    className={`flex-1 h-1 mx-2 ${
                      currentStep > step.id ? "bg-purple-500" : "bg-slate-700"
                    }`}
                  />
                )}
              </div>
            ))}
          </div>
          <h2 className="text-xl font-semibold text-white text-center">
            {steps[currentStep - 1].title}
          </h2>
        </div>

        {/* Form */}
        <div className="bg-slate-800 rounded-xl p-8 border border-slate-700">
          <FormProvider {...methods}>
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
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
                  <ChevronLeft className="w-4 h-4 mr-2" />
                  Previous
                </Button>

                {currentStep < steps.length ? (
                  <Button
                    type="button"
                    onClick={nextStep}
                    className="bg-gradient-to-r from-purple-500 to-cyan-500 hover:from-purple-600 hover:to-cyan-600 text-white"
                  >
                    Next
                    <ChevronRight className="w-4 h-4 ml-2" />
                  </Button>
                ) : (
                  <Button
                    type="button"
                    onClick={handleCompleteSetup}
                    disabled={isLoading}
                    className="bg-gradient-to-r from-purple-500 to-cyan-500 hover:from-purple-600 hover:to-cyan-600 text-white"
                  >
                    {isLoading ? "Creating Store..." : "Complete Setup"}
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