import React from "react";
import { Mail, Phone, MapPin, Linkedin, Github, Globe } from "lucide-react";

export function LivePreview({ data }) {
  const { personal = {}, experience = [], education = [], skills = { technical: [], soft: [], tools: [] }, projects = [], certifications = [], achievements = [] } = data;

  const hasSkills =
    (skills.languages || []).length > 0 || (skills.dsa || []).length > 0 || (skills.frontend || []).length > 0 || (skills.backend || []).length > 0 || (skills.tools || []).length > 0;

  return (
    <div className="w-full bg-white text-gray-900 shadow-2xl shadow-black/20 rounded-2xl p-8 sm:p-10 font-serif lining-nums print:shadow-none print:border-none print:p-0 transition-all text-[13px] leading-normal">
      <div className="text-center pb-4 mb-4">
        <h1 className="text-3xl font-normal uppercase tracking-widest text-gray-900 mb-2">
          {personal.fullName || "Your Full Name"}
        </h1>

        <div className="flex flex-wrap justify-center items-center gap-x-2 text-[13px] text-gray-800">
          {personal.linkedIn && (
            <>
              <a href={personal.linkedIn.startsWith('http') ? personal.linkedIn : `https://${personal.linkedIn}`} target="_blank" rel="noreferrer" className="text-blue-700 hover:underline">LinkedIn</a>
              <span className="text-gray-400">|</span>
            </>
          )}
          {personal.gitHub && (
            <>
              <a href={personal.gitHub.startsWith('http') ? personal.gitHub : `https://${personal.gitHub}`} target="_blank" rel="noreferrer" className="text-blue-700 hover:underline">GitHub</a>
              <span className="text-gray-400">|</span>
            </>
          )}
          {personal.website && (
            <>
              <a href={personal.website.startsWith('http') ? personal.website : `https://${personal.website}`} target="_blank" rel="noreferrer" className="text-blue-700 hover:underline">Portfolio</a>
              <span className="text-gray-400">|</span>
            </>
          )}
          {personal.email && (
            <>
              <a href={`mailto:${personal.email}`} className="text-blue-700 hover:underline">{personal.email}</a>
              {personal.phone && <span className="text-gray-400">|</span>}
            </>
          )}
          {personal.phone && (
            <span className="font-sans text-xs">{personal.phone}</span>
          )}
        </div>
      </div>

      {personal.summary && (
        <div className="mb-5">
          <h2 className="text-[13px] font-bold uppercase tracking-wider text-gray-900 border-b border-gray-800 pb-0.5 mb-2">
            Professional Summary
          </h2>
          <p className="text-gray-700 leading-relaxed text-[12.5px]">{personal.summary}</p>
        </div>
      )}

      {experience.length > 0 && (
        <div className="mb-5">
          <h2 className="text-[13px] font-bold uppercase tracking-wider text-gray-900 border-b border-gray-800 pb-0.5 mb-3">
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
                  <span className="text-xs text-gray-500 font-medium font-sans">
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
          <h2 className="text-[13px] font-bold uppercase tracking-wider text-gray-900 border-b border-gray-800 pb-0.5 mb-3">
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
                  <span className="text-xs text-gray-500 font-medium font-sans">
                    {edu.startDate} – {edu.endDate}
                  </span>
                  {edu.gpa && (
                    <div className="text-[11px] text-gray-500 font-medium font-sans">GPA: {edu.gpa}</div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {hasSkills && (
        <div className="mb-5">
          <h2 className="text-[13px] font-bold uppercase tracking-wider text-gray-900 border-b border-gray-800 pb-0.5 mb-2">
            Skills
          </h2>
          <div className="space-y-1 text-xs text-gray-900">
            <ul className="list-disc list-outside pl-4 space-y-1">
              {(skills.languages || []).length > 0 && (
                <li>
                  <span className="font-bold">Languages: </span>
                  <span>{skills.languages.join(", ")}</span>
                </li>
              )}
              {(skills.dsa || []).length > 0 && (
                <li>
                  <span className="font-bold">Data Structures & Algorithms: </span>
                  <span>{skills.dsa.join(", ")}</span>
                </li>
              )}
              {(skills.frontend || []).length > 0 && (
                <li>
                  <span className="font-bold">Frontend: </span>
                  <span>{skills.frontend.join(", ")}</span>
                </li>
              )}
              {(skills.backend || []).length > 0 && (
                <li>
                  <span className="font-bold">Backend: </span>
                  <span>{skills.backend.join(", ")}</span>
                </li>
              )}
              {(skills.tools || []).length > 0 && (
                <li>
                  <span className="font-bold">Tools: </span>
                  <span>{skills.tools.join(", ")}</span>
                </li>
              )}
            </ul>
          </div>
        </div>
      )}

      {projects.length > 0 && (
        <div className="mb-5">
          <h2 className="text-[13px] font-bold uppercase tracking-wider text-gray-900 border-b border-gray-800 pb-0.5 mb-3">
            Projects
          </h2>
          <div className="space-y-3">
            {projects.map((proj) => {
              const githubUrl = proj.githubLink || proj.gitHub || (proj.link && proj.link.toLowerCase().includes("github") ? proj.link : null);
              const liveUrl = proj.liveLink || proj.url || proj.website || (proj.link && !proj.link.toLowerCase().includes("github") ? proj.link : null);

              return (
                <div key={proj.id}>
                  <div className="flex justify-between items-baseline mb-0.5">
                    <span className="font-bold text-gray-900 text-[13px]">
                      {proj.name}
                    </span>
                    <div className="flex items-center gap-1.5 text-[11px] text-blue-700 font-sans shrink-0">
                      {githubUrl && (
                        <a
                          href={githubUrl.startsWith('http') ? githubUrl : `https://${githubUrl}`}
                          target="_blank"
                          rel="noreferrer"
                          className="hover:underline font-medium"
                        >
                          GitHub
                        </a>
                      )}
                      {githubUrl && liveUrl && <span className="text-gray-400 font-normal">|</span>}
                      {liveUrl && (
                        <a
                          href={liveUrl.startsWith('http') ? liveUrl : `https://${liveUrl}`}
                          target="_blank"
                          rel="noreferrer"
                          className="hover:underline font-medium"
                        >
                          Live
                        </a>
                      )}
                    </div>
                  </div>
                {(proj.technologies || []).length > 0 && (
                  <div className="text-[12px] text-gray-800 mb-0.5">
                    <span className="font-bold text-gray-900">Tech Stack:</span> {proj.technologies.join(", ")}
                  </div>
                )}
                {((proj.bullets && proj.bullets.length > 0) || proj.description) && (
                  <ul className="list-disc list-outside pl-4 space-y-0.5 text-gray-700 text-[12px]">
                    {(proj.bullets && proj.bullets.length > 0
                      ? proj.bullets
                      : [proj.description]
                    ).map((b, bIdx) => (
                      b ? <li key={bIdx}>{b}</li> : null
                    ))}
                  </ul>
                )}
              </div>
            ))}
          </div>
        </div>
      )}

      {certifications.length > 0 && (
        <div className="mb-5">
          <h2 className="text-[13px] font-bold uppercase tracking-wider text-gray-900 border-b border-gray-800 pb-0.5 mb-2">
            Certifications
          </h2>
          <div className="space-y-1.5">
            {certifications.map((cert) => (
              <div key={cert.id} className="flex justify-between text-xs text-gray-700">
                <span className="font-bold text-gray-900">
                  {cert.name} <span className="font-normal text-gray-600">— {cert.issuer}</span>
                </span>
                <span className="text-gray-500 font-medium font-sans">{cert.date}</span>
              </div>
            ))}
          </div>
        </div>
      )}

      {achievements.length > 0 && (
        <div>
          <h2 className="text-[13px] font-bold uppercase tracking-wider text-gray-900 border-b border-gray-800 pb-0.5 mb-2">
            Achievements
          </h2>
          <ul className="list-disc list-outside pl-4 space-y-1">
            {achievements.map((ach) => (
              <li key={ach.id} className="text-[12.5px] text-gray-900">
                {ach.title}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}
