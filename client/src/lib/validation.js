export function validateStep(step, data) {
  const errors = {};

  if (step === 1) {
    if (!data.personal?.fullName || !data.personal.fullName.trim()) {
      errors.fullName = "Full name is required";
    }

    if (!data.personal?.email || !data.personal.email.trim()) {
      errors.email = "Email address is required";
    } else {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(data.personal.email.trim())) {
        errors.email = "Please enter a valid email address";
      }
    }

    if (!data.personal?.phone || !data.personal.phone.trim()) {
      errors.phone = "Phone number is required";
    }

    if (!data.personal?.location || !data.personal.location.trim()) {
      errors.location = "Location is required";
    }
  }

  if (step === 2) {
    if (!data.targetJob?.targetRole || !data.targetJob.targetRole.trim()) {
      errors.targetRole = "Target job role is required";
    }
  }

  if (step === 3) {
    if (data.experience && data.experience.length > 0) {
      data.experience.forEach((exp, idx) => {
        if (exp.company && !exp.company.trim()) {
          errors[`exp_${idx}_company`] = "Company name is required if filled";
        }
      });
    }
  }

  if (step === 4) {
    if (!data.education || data.education.length === 0) {
      errors.education = "At least one education entry is required";
    } else {
      data.education.forEach((edu, idx) => {
        if (!edu.institution || !edu.institution.trim()) {
          errors[`edu_${idx}_institution`] = "Institution name is required";
        }
        if (!edu.degree || !edu.degree.trim()) {
          errors[`edu_${idx}_degree`] = "Degree is required";
        }
      });
    }
  }

  if (step === 5) {
    if (!data.skills?.technical || data.skills.technical.length === 0) {
      errors.technical = "Add at least one technical skill tag";
    }
  }

  return {
    isValid: Object.keys(errors).length === 0,
    errors,
  };
}

export function getResumeCompletionStatus(data) {
  const missingFields = [];

  if (!data?.personal?.fullName?.trim()) missingFields.push("Full Name");
  if (!data?.personal?.email?.trim()) missingFields.push("Email");
  if (!data?.personal?.phone?.trim()) missingFields.push("Phone");
  if (!data?.personal?.location?.trim()) missingFields.push("Location");
  if (!data?.targetJob?.targetRole?.trim()) missingFields.push("Target Job Role");
  if (!data?.education || data.education.length === 0 || !data.education[0]?.institution?.trim()) {
    missingFields.push("Education Entry");
  }
  if (!data?.skills?.technical || data.skills.technical.length === 0) {
    missingFields.push("Technical Skills Tag");
  }

  const totalChecks = 7;
  const completedChecks = totalChecks - missingFields.length;
  const percentage = Math.round((completedChecks / totalChecks) * 100);

  return {
    isComplete: missingFields.length === 0,
    percentage,
    missingFields,
  };
}
