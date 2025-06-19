"use client";

import { useFormContext } from "react-hook-form";
import { ServiceConfig, BusinessTypeConfig } from "@/lib/types/onboarding";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";

export default function ServiceSelectionStep() {
  const { watch, setValue, register } = useFormContext();
  const businessType = watch("businessType");
  const selectedServices = watch("selectedServices") || [];
  const marketingFrequency = watch("marketingFrequency");

  const availableServices = businessType 
    ? BusinessTypeConfig[businessType as keyof typeof BusinessTypeConfig]?.availableServices || []
    : [];

  const handleServiceToggle = (service: string) => {
    const newServices = selectedServices.includes(service)
      ? selectedServices.filter((s: string) => s !== service)
      : [...selectedServices, service];
    setValue("selectedServices", newServices);
  };

  // Check if any selected service requires Square
  const requiresSquare = selectedServices.some((service: string) => {
    const serviceConfig = ServiceConfig[service as keyof typeof ServiceConfig];
    return serviceConfig?.requiresSquare;
  });

  const squareRequiredServices = selectedServices.filter((service: string) => {
    const serviceConfig = ServiceConfig[service as keyof typeof ServiceConfig];
    return serviceConfig?.requiresSquare;
  });

  return (
    <div className="space-y-6">
      <div className="text-center">
        <h3 className="text-lg font-semibold text-white mb-2">
          Choose your services
        </h3>
        <p className="text-slate-400">
          Select the services you'd like to enable for your business
        </p>
      </div>

      <div className="space-y-4">
        {availableServices.map((serviceKey) => {
          const service = ServiceConfig[serviceKey as keyof typeof ServiceConfig];
          const isSelected = selectedServices.includes(serviceKey);

          return (
            <div
              key={serviceKey}
              className={`p-4 rounded-lg border-2 transition-all ${
                isSelected
                  ? "border-purple-500 bg-purple-500/10"
                  : "border-slate-600 hover:border-slate-500"
              }`}
            >
              <div className="flex items-start space-x-3">
                <Checkbox
                  id={serviceKey}
                  checked={isSelected}
                  onCheckedChange={() => handleServiceToggle(serviceKey)}
                  className="mt-1"
                />
                <div className="flex-1">
                  <Label
                    htmlFor={serviceKey}
                    className="text-white font-medium cursor-pointer"
                  >
                    <span className="text-2xl mr-2">{service.icon}</span>
                    {service.label}
                  </Label>
                  <p className="text-sm text-slate-400 mt-1">
                    {service.description}
                  </p>
                  {service.requiresSquare && (
                    <p className="text-xs text-purple-400 mt-2">
                      Requires Square Point of Sale integration
                    </p>
                  )}
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {requiresSquare && (
        <div className="bg-blue-500/10 border border-blue-500/20 rounded-lg p-4">
          <div className="flex items-start space-x-3">
            <input
              type="checkbox"
              id="squareIntegration"
              {...register("squareIntegration")}
              className="mt-1"
            />
            <div>
              <Label htmlFor="squareIntegration" className="text-blue-400 font-medium">
                I have a Square Point of Sale system
              </Label>
              <p className="text-sm text-blue-300 mt-1">
                Required for: {squareRequiredServices.map((service: string) => {
                  const serviceConfig = ServiceConfig[service as keyof typeof ServiceConfig];
                  return serviceConfig?.label;
                }).join(", ")}
              </p>
              <p className="text-xs text-blue-300 mt-2">
                If you don't have Square, we can help you set it up or suggest alternatives.
              </p>
            </div>
          </div>
        </div>
      )}

      {selectedServices.includes("social_media_marketing") && (
        <div className="space-y-3">
          <Label className="text-white font-medium">
            Marketing Content Frequency
          </Label>
          <RadioGroup
            value={marketingFrequency}
            onValueChange={(value) => setValue("marketingFrequency", value)}
            className="space-y-2"
          >
            {[
              { value: "weekly", label: "Weekly content" },
              { value: "biweekly", label: "Every 2 weeks" },
              { value: "monthly", label: "Monthly content" },
            ].map((option) => (
              <div key={option.value} className="flex items-center space-x-2">
                <RadioGroupItem
                  value={option.value}
                  id={option.value}
                  className="border-slate-600"
                />
                <Label htmlFor={option.value} className="text-white cursor-pointer">
                  {option.label}
                </Label>
              </div>
            ))}
          </RadioGroup>
        </div>
      )}

      {availableServices.length === 0 && (
        <div className="bg-yellow-500/10 border border-yellow-500/20 rounded-lg p-4">
          <p className="text-yellow-400 text-sm">
            No services available for your business type. Please contact us for custom setup.
          </p>
        </div>
      )}
    </div>
  );
} 