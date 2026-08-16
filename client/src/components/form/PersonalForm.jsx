import React from "react";
import { User, Mail, Phone, MapPin, Linkedin, Github, Globe, FileText } from "lucide-react";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export function PersonalForm({ data, onChange, errors = {} }) {
  const handleChange = (field, value) => {
    onChange({
      ...data,
      [field]: value,
    });
  };

  return (
    <Card className="shadow-sm">
      <CardHeader className="pb-4">
        <CardTitle>
          <User className="w-5 h-5 text-blue-600 dark:text-blue-400" />
          Personal & Contact Information
        </CardTitle>
        <CardDescription>
          Provide your basic contact details for recruiters to reach you.
        </CardDescription>
      </CardHeader>

      <CardContent className="space-y-6 pt-2">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <Label className="mb-1 block">
              Full Name <span className="text-red-500">*</span>
            </Label>
            <div className="relative">
              <User className="w-4 h-4 text-gray-400 absolute left-3 top-2.5 z-10" />
              <Input
                type="text"
                value={data.fullName}
                onChange={(e) => handleChange("fullName", e.target.value)}
                placeholder="e.g. Alex Morgan"
                className={`pl-9 ${errors.fullName ? "border-red-500 focus-visible:ring-red-500" : ""}`}
              />
            </div>
            {errors.fullName && (
              <p className="text-xs text-red-500 mt-1">{errors.fullName}</p>
            )}
          </div>

          <div>
            <Label className="mb-1 block">
              Email Address <span className="text-red-500">*</span>
            </Label>
            <div className="relative">
              <Mail className="w-4 h-4 text-gray-400 absolute left-3 top-2.5 z-10" />
              <Input
                type="email"
                value={data.email}
                onChange={(e) => handleChange("email", e.target.value)}
                placeholder="e.g. alex@example.com"
                className={`pl-9 ${errors.email ? "border-red-500 focus-visible:ring-red-500" : ""}`}
              />
            </div>
            {errors.email && (
              <p className="text-xs text-red-500 mt-1">{errors.email}</p>
            )}
          </div>

          <div>
            <Label className="mb-1 block">Phone Number</Label>
            <div className="relative">
              <Phone className="w-4 h-4 text-gray-400 absolute left-3 top-2.5 z-10" />
              <Input
                type="tel"
                value={data.phone}
                onChange={(e) => handleChange("phone", e.target.value)}
                placeholder="e.g. +1 (555) 234-5678"
                className="pl-9"
              />
            </div>
          </div>

          <div>
            <Label className="mb-1 block">Location (City, State / Country)</Label>
            <div className="relative">
              <MapPin className="w-4 h-4 text-gray-400 absolute left-3 top-2.5 z-10" />
              <Input
                type="text"
                value={data.location}
                onChange={(e) => handleChange("location", e.target.value)}
                placeholder="e.g. San Francisco, CA"
                className="pl-9"
              />
            </div>
          </div>

          <div>
            <Label className="mb-1 block">LinkedIn Profile URL</Label>
            <div className="relative">
              <Linkedin className="w-4 h-4 text-gray-400 absolute left-3 top-2.5 z-10" />
              <Input
                type="text"
                value={data.linkedIn}
                onChange={(e) => handleChange("linkedIn", e.target.value)}
                placeholder="linkedin.com/in/alexmorgan"
                className="pl-9"
              />
            </div>
          </div>

          <div>
            <Label className="mb-1 block">GitHub Profile URL</Label>
            <div className="relative">
              <Github className="w-4 h-4 text-gray-400 absolute left-3 top-2.5 z-10" />
              <Input
                type="text"
                value={data.gitHub}
                onChange={(e) => handleChange("gitHub", e.target.value)}
                placeholder="github.com/alexmorgan"
                className="pl-9"
              />
            </div>
          </div>
        </div>

        <div>
          <Label className="mb-1 block">Portfolio / Personal Website</Label>
          <div className="relative">
            <Globe className="w-4 h-4 text-gray-400 absolute left-3 top-2.5 z-10" />
            <Input
              type="text"
              value={data.website}
              onChange={(e) => handleChange("website", e.target.value)}
              placeholder="alexmorgan.dev"
              className="pl-9"
            />
          </div>
        </div>

        <div>
          <div className="flex items-center justify-between mb-1">
            <Label className="block">Professional Summary (2-3 lines)</Label>
            <span className="text-[11px] text-gray-400">Can be generated with AI</span>
          </div>
          <div className="relative">
            <FileText className="w-4 h-4 text-gray-400 absolute left-3 top-3 z-10" />
            <textarea
              rows={3}
              value={data.summary}
              onChange={(e) => handleChange("summary", e.target.value)}
              placeholder="Write a short summary or click 'Optimize with AI' to generate a role-tailored summary automatically."
              className="w-full pl-9 pr-3 py-2 text-sm bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-700 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none transition-colors dark:text-white"
            />
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
