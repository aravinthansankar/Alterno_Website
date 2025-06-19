"use client";

import { useFormContext } from "react-hook-form";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

export default function StoreInfoStep() {
  const { register, formState: { errors } } = useFormContext();

  return (
    <div className="space-y-6">
      <div className="text-center">
        <h3 className="text-lg font-semibold text-white mb-2">
          Tell us about your business
        </h3>
        <p className="text-slate-400">
          Provide your business details to help us customize your experience
        </p>
      </div>

      <div className="space-y-4">
        <div>
          <Label htmlFor="storeName" className="text-white">
            Store/Business Name *
          </Label>
          <Input
            id="storeName"
            {...register("storeName")}
            placeholder="Enter your business name"
            className="bg-slate-700 border-slate-600 text-white placeholder:text-slate-400"
          />
          {errors.storeName && (
            <p className="text-red-400 text-sm mt-1">
              {errors.storeName.message}
            </p>
          )}
        </div>

        <div>
          <Label htmlFor="address" className="text-white">
            Business Address *
          </Label>
          <Input
            id="address"
            {...register("address")}
            placeholder="Enter your business address"
            className="bg-slate-700 border-slate-600 text-white placeholder:text-slate-400"
          />
          {errors.address && (
            <p className="text-red-400 text-sm mt-1">
              {errors.address.message}
            </p>
          )}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <Label htmlFor="phone" className="text-white">
              Phone Number *
            </Label>
            <Input
              id="phone"
              {...register("phone")}
              placeholder="Enter your phone number"
              className="bg-slate-700 border-slate-600 text-white placeholder:text-slate-400"
            />
            {errors.phone && (
              <p className="text-red-400 text-sm mt-1">
                {errors.phone.message}
              </p>
            )}
          </div>

          <div>
            <Label htmlFor="email" className="text-white">
              Business Email *
            </Label>
            <Input
              id="email"
              type="email"
              {...register("email")}
              placeholder="Enter your business email"
              className="bg-slate-700 border-slate-600 text-white placeholder:text-slate-400"
            />
            {errors.email && (
              <p className="text-red-400 text-sm mt-1">
                {errors.email.message}
              </p>
            )}
          </div>
        </div>

        <div>
          <Label htmlFor="website" className="text-white">
            Website (Optional)
          </Label>
          <Input
            id="website"
            {...register("website")}
            placeholder="https://your-website.com"
            className="bg-slate-700 border-slate-600 text-white placeholder:text-slate-400"
          />
          {errors.website && (
            <p className="text-red-400 text-sm mt-1">
              {errors.website.message}
            </p>
          )}
        </div>

        <div>
          <Label htmlFor="description" className="text-white">
            Business Description *
          </Label>
          <Textarea
            id="description"
            {...register("description")}
            placeholder="Describe your business and the services you offer..."
            rows={4}
            className="bg-slate-700 border-slate-600 text-white placeholder:text-slate-400 resize-none"
          />
          {errors.description && (
            <p className="text-red-400 text-sm mt-1">
              {errors.description.message}
            </p>
          )}
        </div>
      </div>
    </div>
  );
} 