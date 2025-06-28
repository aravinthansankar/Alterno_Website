"use client";

import { useFormContext } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { useEffect } from "react";
import { Mail } from "lucide-react";

interface ServiceOption {
  id: string;
  label: string;
  status: "active" | "coming_soon" | "other";
}

const services: ServiceOption[] = [
  { id: "square", label: "Square", status: "active" },
  { id: "shopify", label: "Shopify – coming soon", status: "coming_soon" },
  { id: "lightspeed", label: "LightSpeed – coming soon", status: "coming_soon" },
  { id: "cliniko", label: "Cliniko – coming soon", status: "coming_soon" },
  { id: "other", label: "Other", status: "other" },
];

export default function ServiceConnectStep() {
  const { watch, setValue } = useFormContext();
  const selectedService = watch("selectedService");

  // Ensure a default selection of Square so user can immediately proceed
  useEffect(() => {
    if (!selectedService) {
      setValue("selectedService", "square");
    }
  }, [selectedService, setValue]);

  const handleSelect = (serviceId: string) => {
    if (serviceId === "other") {
      window.location.href = "mailto:support@voice.ai?subject=Other%20Integration%20Request";
      return;
    }
    if (serviceId === "square") {
      setValue("selectedService", serviceId);
    }
  };

  return (
    <div className="space-y-6">
      <div className="text-center">
        <h3 className="text-lg font-semibold text-white mb-2">Choose a service to connect</h3>
        <p className="text-slate-400">We currently support Square. More services are coming soon!</p>
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        {services.map((service) => (
          <div
            key={service.id}
            className={`p-4 rounded-xl border-2 cursor-pointer transition-all ${
              selectedService === service.id
                ? "border-amber-500 bg-amber-500/10"
                : "border-slate-600 hover:border-amber-500"
            } ${service.status !== "active" && "opacity-60 cursor-not-allowed"}
            `}
            onClick={() => handleSelect(service.id)}
          >
            <span className="text-white text-base font-medium">
              {service.label}
            </span>
            {service.status === "other" && (
              <Button variant="link" size="sm" className="mt-2 p-0 text-purple-400">
                <Mail className="w-4 h-4 mr-1" /> Contact us
              </Button>
            )}
          </div>
        ))}
      </div>
    </div>
  );
} 