"use client";

import { useFormContext } from "react-hook-form";
import { BusinessTypeConfig } from "@/lib/types/onboarding";
import { Button } from "@/components/ui/button";
import { Check } from "lucide-react";

export default function BusinessTypeStep() {
  const { register, watch, setValue } = useFormContext();
  const selectedBusinessType = watch("businessType");

  return (
    <div className="space-y-6">
      <div className="text-center">
        <h3 className="text-lg font-semibold text-white mb-2">
          What type of business do you have?
        </h3>
        <p className="text-slate-400">
          Select your business type to see available services
        </p>
      </div>

      <div className="grid gap-4">
        {Object.entries(BusinessTypeConfig).map(([key, config]) => (
          <div
            key={key}
            className={`p-4 rounded-lg border-2 cursor-pointer transition-all ${
              selectedBusinessType === key
                ? "border-purple-500 bg-purple-500/10"
                : "border-slate-600 hover:border-slate-500"
            }`}
            onClick={() => setValue("businessType", key)}
          >
            <div className="flex items-center justify-between">
              <div className="flex-1">
                <h4 className="font-semibold text-white">{config.label}</h4>
                <p className="text-sm text-slate-400 mt-1">
                  {config.description}
                </p>
                {config.availableServices.length > 0 && (
                  <p className="text-xs text-purple-400 mt-2">
                    Available services: {config.availableServices.length}
                  </p>
                )}
              </div>
              {selectedBusinessType === key && (
                <div className="w-6 h-6 rounded-full bg-purple-500 flex items-center justify-center">
                  <Check className="w-4 h-4 text-white" />
                </div>
              )}
            </div>
          </div>
        ))}
      </div>

      {selectedBusinessType === "other" && (
        <div className="bg-yellow-500/10 border border-yellow-500/20 rounded-lg p-4">
          <p className="text-yellow-400 text-sm">
            For custom business types, please contact us at{" "}
            <a
              href="mailto:support@voiceflow.com"
              className="underline hover:text-yellow-300"
            >
              support@voiceflow.com
            </a>{" "}
            for a custom setup.
          </p>
        </div>
      )}

      <input
        type="hidden"
        {...register("businessType")}
      />
    </div>
  );
} 