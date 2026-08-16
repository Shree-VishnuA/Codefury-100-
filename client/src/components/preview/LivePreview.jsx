import React from "react";
import { Mail, Phone, MapPin, Linkedin, Github, Globe } from "lucide-react";

export function LivePreview({ data }) {
  const { personal = {}, experience = [], education = [], skills = { technical: [], soft: [], tools: [] }, projects = [], certifications = [], achievements = [] } = data;

  const hasSkills =
    (skills.technical || []).length > 0 || (skills.soft || []).length > 0 || (skills.tools || []).length > 0;

  return (
    <div className="w-full bg-white text-gray-900 shadow-xl rounded-xl border border-gray-200 p-8 sm:p-10 font-sans print:shadow-none print:border-none print:p-0 transition-all text-[13px] leading-normal">
      <div className="text-center border-b border-gray-300 pb-4 mb-5">
        <h1 className="text-2xl font-bold uppercase tracking-wide text-gray-900 mb-1">
          {personal.fullName || "Your Full Name"}
        </h1>

        <div className="flex flex-wrap justify-center items-center gap-x-4 gap-y-1 text-xs text-gray-600 font-medium">
          {personal.email && (
            <span className="flex items-center gap-1">
              <Mail className="w-3 h-3 text-gray-500" />
              {personal.email}
            </span>
          )}
          {personal.phone && (
            <span className="flex items-center gap-1">
              <Phone className="w-3 h-3 text-gray-500" />
              {personal.phone}
            </span>
          )}
          {personal.location && (
            <span className="flex items-center gap-1">
              <MapPin className="w-3 h-3 text-gray-500" />
              {personal.location}
            </span>
          )}
          {personal.linkedIn && (
            <span className="flex items-center gap-1">
              <Linkedin className="w-3 h-3 text-gray-500" />
              {personal.linkedIn}
            </span>
          )}
          {personal.gitHub && (
            <span className="flex items-center gap-1">
              <Github className="w-3 h-3 text-gray-500" />
              {personal.gitHub}
            </span>
          )}
          {personal.website && (
            <span className="flex items-center gap-1">
              <Globe className="w-3 h-3 text-gray-500" />
              {personal.website}
            </span>
          )}
        </div>
      </div>

      {personal.summary && (
        <div className="mb-5">
          <h2 className="text-sm font-bold uppercase tracking-wider text-gray-800 border-b border-gray-200 pb-1 mb-2">
            Professional Summary
          </h2>
          <p className="text-gray-700 leading-relaxed text-[12.5px]">{personal.summary}</p>
        </div>
      )}

      {experience.length > 0 && (
        <div className="mb-5">
          <h2 className="text-sm font-bold uppercase tracking-wider text-gray-800 border-b border-gray-200 pb-1 mb-3">
            Work Experience
          </h2>
          <div className="space-y-4">
            {experience.map((exp) => (
              <div key={exp.id}>
                <div className="flex justify-between items-baseline mb-0.5">
                  <span className="font-bold text-gray-900 text-[13px]">
                    {exp.position}{" "}
                    <span className="font-normal text-gray-600">| {exp.company}</span>
                  </span>
                  <span className="text-xs text-gray-500 font-medium">
                    {exp.startDate} – {exp.isCurrent ? "Present" : exp.endDate || "Present"}
                    {exp.location ? ` • ${exp.location}` : ""}
                  </span>
                </div>
                {(exp.bullets || []).length > 0 && (
                  <ul className="list-disc list-outside pl-4 space-y-1 text-gray-700 text-[12px]">
                    {exp.bullets.map((bullet, idx) => (
                      <li key={idx}>{bullet}</li>
                    ))}
                  </ul>
                )}
              </div>
            ))}
          </div>
        </div>
      )}

      {education.length > 0 && (
        <div className="mb-5">
          <h2 className="text-sm font-bold uppercase tracking-wider text-gray-800 border-b border-gray-200 pb-1 mb-3">
            Education
          </h2>
          <div className="space-y-3">
            {education.map((edu) => (
              <div key={edu.id} className="flex justify-between items-baseline">
                <div>
                  <span className="font-bold text-gray-900 text-[13px]">
                    {edu.degree} {edu.fieldOfStudy ? `in ${edu.fieldOfStudy}` : ""}
                  </span>
                  <div className="text-xs text-gray-600">{edu.institution}</div>
                </div>
                <div className="text-right">
                  <span className="text-xs text-gray-500 font-medium">
                    {edu.startDate} – {edu.endDate}
                  </span>
                  {edu.gpa && (
                    <div className="text-[11px] text-gray-500 font-medium">GPA: {edu.gpa}</div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {hasSkills && (
        <div className="mb-5">
          <h2 className="text-sm font-bold uppercase tracking-wider text-gray-800 border-b border-gray-200 pb-1 mb-2">
            Skills & Competencies
          </h2>
          <div className="space-y-1.5 text-xs text-gray-700">
            {(skills.technical || []).length > 0 && (
              <div>
                <span className="font-bold text-gray-900">Technical Skills: </span>
                <span>{skills.technical.join(", ")}</span>
              </div>
            )}
            {(skills.tools || []).length > 0 && (
              <div>
                <span className="font-bold text-gray-900">Tools & Platforms: </span>
                <span>{skills.tools.join(", ")}</span>
              </div>
            )}
            {(skills.soft || []).length > 0 && (
              <div>
                <span className="font-bold text-gray-900">Soft Skills: </span>
                <span>{skills.soft.join(", ")}</span>
              </div>
            )}
          </div>
        </div>
      )}

      {projects.length > 0 && (
        <div className="mb-5">
          <h2 className="text-sm font-bold uppercase tracking-wider text-gray-800 border-b border-gray-200 pb-1 mb-3">
            Key Projects
          </h2>
          <div className="space-y-3">
            {projects.map((proj) => (
              <div key={proj.id}>
                <div className="flex justify-between items-baseline">
                  <span className="font-bold text-gray-900 text-[13px]">{proj.name}</span>
                  {proj.link && (
                    <span className="text-xs text-blue-600 font-medium">{proj.link}</span>
                  )}
                </div>
                {(proj.technologies || []).length > 0 && (
                  <div className="text-[11px] text-gray-500 font-medium mb-1">
                    Tech Stack: {proj.technologies.join(", ")}
                  </div>
                )}
                {proj.description && (
                  <p className="text-gray-700 text-[12px]">{proj.description}</p>
                )}
              </div>
            ))}
          </div>
        </div>
      )}

      {certifications.length > 0 && (
        <div className="mb-5">
          <h2 className="text-sm font-bold uppercase tracking-wider text-gray-800 border-b border-gray-200 pb-1 mb-2">
            Certifications
          </h2>
          <div className="space-y-1.5">
            {certifications.map((cert) => (
              <div key={cert.id} className="flex justify-between text-xs text-gray-700">
                <span className="font-bold text-gray-900">
                  {cert.name} <span className="font-normal text-gray-600">— {cert.issuer}</span>
                </span>
                <span className="text-gray-500 font-medium">{cert.date}</span>
              </div>
            ))}
          </div>
        </div>
      )}

      {achievements.length > 0 && (
        <div>
          <h2 className="text-sm font-bold uppercase tracking-wider text-gray-800 border-b border-gray-200 pb-1 mb-2">
            Honors & Achievements
          </h2>
          <div className="space-y-2">
            {achievements.map((ach) => (
              <div key={ach.id} className="text-xs text-gray-700">
                <span className="font-bold text-gray-900">{ach.title}: </span>
                <span>{ach.description}</span>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
