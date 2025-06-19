"use client";

import { useFormContext } from "react-hook-form";
import { BusinessTypeConfig, ServiceConfig } from "@/lib/types/onboarding";
import { Check } from "lucide-react";

export default function ReviewStep() {
  const { watch } = useFormContext();
  const formData = watch();

  const businessTypeConfig = formData.businessType 
    ? BusinessTypeConfig[formData.businessType as keyof typeof BusinessTypeConfig]
    : null;

  const selectedServicesConfig = formData.selectedServices?.map(
    (service: string) => ServiceConfig[service as keyof typeof ServiceConfig]
  ) || [];

  return (
    <div className="space-y-6">
      <div className="text-center">
        <h3 className="text-lg font-semibold text-white mb-2">
          Review Your Setup
        </h3>
        <p className="text-slate-400">
          Please review your information before completing the setup
        </p>
      </div>

      <div className="space-y-6">
        {/* Business Information */}
        <div className="bg-slate-700 rounded-lg p-4">
          <h4 className="font-semibold text-white mb-3">Business Information</h4>
          <div className="space-y-2 text-sm">
            <div className="flex justify-between">
              <span className="text-slate-400">Business Name:</span>
              <span className="text-white">{formData.storeName}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-slate-400">Business Type:</span>
              <span className="text-white">{businessTypeConfig?.label}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-slate-400">Address:</span>
              <span className="text-white">{formData.address}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-slate-400">Phone:</span>
              <span className="text-white">{formData.phone}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-slate-400">Email:</span>
              <span className="text-white">{formData.email}</span>
            </div>
            {formData.website && (
              <div className="flex justify-between">
                <span className="text-slate-400">Website:</span>
                <span className="text-white">{formData.website}</span>
              </div>
            )}
          </div>
        </div>

        {/* Selected Services */}
        <div className="bg-slate-700 rounded-lg p-4">
          <h4 className="font-semibold text-white mb-3">Selected Services</h4>
          {selectedServicesConfig.length > 0 ? (
            <div className="space-y-2">
              {selectedServicesConfig.map((service, index) => (
                <div key={index} className="flex items-center space-x-2">
                  <Check className="w-4 h-4 text-green-400" />
                  <span className="text-white text-sm">
                    {service.icon} {service.label}
                  </span>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-slate-400 text-sm">No services selected</p>
          )}
        </div>

        {/* Additional Options */}
        {(formData.squareIntegration || formData.marketingFrequency) && (
          <div className="bg-slate-700 rounded-lg p-4">
            <h4 className="font-semibold text-white mb-3">Additional Options</h4>
            <div className="space-y-2 text-sm">
              {formData.squareIntegration && (
                <div className="flex items-center space-x-2">
                  <Check className="w-4 h-4 text-green-400" />
                  <span className="text-white">Square Point of Sale integration</span>
                </div>
              )}
              {formData.marketingFrequency && (
                <div className="flex justify-between">
                  <span className="text-slate-400">Marketing Frequency:</span>
                  <span className="text-white capitalize">
                    {formData.marketingFrequency.replace("_", " ")}
                  </span>
                </div>
              )}
            </div>
          </div>
        )}

        {/* Next Steps */}
        <div className="bg-blue-500/10 border border-blue-500/20 rounded-lg p-4">
          <h4 className="font-semibold text-blue-400 mb-2">What happens next?</h4>
          <ul className="text-sm text-blue-300 space-y-1">
            <li>• Your store will be created in our system</li>
            <li>• We'll set up your selected services</li>
            <li>• You'll receive setup instructions via email</li>
            <li>• Our team will contact you within 24 hours</li>
          </ul>
        </div>
      </div>
    </div>
  );
} 