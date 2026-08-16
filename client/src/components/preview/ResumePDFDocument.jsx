import React from "react";
import { Document, Page, Text, View, StyleSheet, Link } from "@react-pdf/renderer";

const styles = StyleSheet.create({
  page: {
    paddingTop: 42,
    paddingBottom: 42,
    paddingHorizontal: 44,
    fontFamily: "Times-Roman",
    fontSize: 10,
    lineHeight: 1.45,
    color: "#111827",
  },
  header: {
    textAlign: "center",
    marginBottom: 16,
  },
  name: {
    fontSize: 30,
    fontFamily: "Times-Roman",
    textTransform: "uppercase",
    letterSpacing: 3,
    marginBottom: 8,
    color: "#111827",
  },
  contactRow: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "center",
    alignItems: "center",
    fontSize: 9.5,
    fontFamily: "Helvetica",
    color: "#374151",
  },
  pipe: {
    color: "#9CA3AF",
    marginHorizontal: 5,
    fontSize: 9.5,
  },

  // --- Section heading: big first letter + small caps rest, underlined ---
  sectionHeadingRow: {
    flexDirection: "row",
    alignItems: "baseline",
    width: "100%",
    borderBottomWidth: 0.9,
    borderBottomColor: "#111827",
    paddingBottom: 2.5,
    marginBottom: 7,
  },
  sectionHeadingFirst: {
    fontSize: 13,
    fontFamily: "Times-Bold",
    color: "#111827",
  },
  sectionHeadingRest: {
    fontSize: 10,
    fontFamily: "Times-Bold",
    letterSpacing: 0.5,
    color: "#111827",
  },

  section: {
    marginBottom: 14,
  },
  summaryText: {
    fontSize: 9.8,
    color: "#374151",
    lineHeight: 1.45,
  },

  // --- Skills ---
  skillLine: {
    fontSize: 9.5,
    color: "#374151",
    marginBottom: 3,
    lineHeight: 1.4,
  },
  boldLabel: {
    fontFamily: "Times-Bold",
    color: "#111827",
  },

  // --- Education: left block (institution/degree/gpa) + right block (location/dates) ---
  eduRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 8,
  },
  eduLeft: {
    flexShrink: 1,
    paddingRight: 12,
  },
  eduRight: {
    alignItems: "flex-end",
    justifyContent: "center",
  },
  eduInstitution: {
    fontSize: 10.5,
    fontFamily: "Times-Bold",
    color: "#111827",
  },
  eduDegree: {
    fontSize: 9.8,
    fontFamily: "Times-Roman",
    color: "#374151",
    marginTop: 1,
  },
  eduGpa: {
    fontSize: 9.5,
    fontFamily: "Times-Bold",
    color: "#111827",
    marginTop: 2,
  },
  eduLocation: {
    fontSize: 9,
    fontFamily: "Helvetica",
    color: "#4B5563",
  },
  eduDates: {
    fontSize: 9,
    fontFamily: "Helvetica",
    color: "#4B5563",
    marginTop: 2,
  },

  // --- Work Experience ---
  itemHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "baseline",
    marginBottom: 2,
  },
  itemTitle: {
    fontSize: 10,
    fontFamily: "Times-Bold",
    color: "#111827",
  },
  itemSubtitle: {
    fontSize: 9.6,
    fontFamily: "Times-Roman",
    color: "#4B5563",
  },
  itemDate: {
    fontSize: 8.8,
    fontFamily: "Helvetica",
    color: "#6B7280",
  },
  bulletList: {
    marginTop: 2,
    paddingLeft: 8,
  },
  bulletItem: {
    fontSize: 9.2,
    color: "#374151",
    marginBottom: 2.5,
    lineHeight: 1.4,
  },

  // --- Projects ---
  projectBlock: {
    marginBottom: 9,
  },
  projectTitle: {
    fontSize: 10.2,
    fontFamily: "Times-Bold",
    color: "#111827",
  },
  projectLinks: {
    flexDirection: "row",
    gap: 5,
    alignItems: "center",
  },
  projectLink: {
    fontSize: 8.8,
    fontFamily: "Helvetica",
    textTransform: "uppercase",
    letterSpacing: 0.4,
    color: "#1D4ED8",
    textDecoration: "underline",
  },
  linkDivider: {
    fontSize: 8,
    color: "#9CA3AF",
  },
  techStack: {
    fontSize: 8.6,
    fontFamily: "Helvetica-Oblique",
    color: "#6B7280",
    marginTop: 1.5,
    marginBottom: 2,
  },

  // --- Certifications / Achievements ---
  achievementItem: {
    fontSize: 9.2,
    color: "#374151",
    marginBottom: 3,
    lineHeight: 1.4,
  },
});

function SectionHeading({ children }) {
  const label = String(children);
  const first = label.charAt(0).toUpperCase();
  const rest = label.slice(1).toUpperCase();
  return (
    <View style={styles.sectionHeadingRow}>
      <Text style={styles.sectionHeadingFirst}>{first}</Text>
      <Text style={styles.sectionHeadingRest}>{rest}</Text>
    </View>
  );
}

function toUrl(value) {
  if (!value) return null;
  return value.startsWith("http") ? value : `https://${value}`;
}

export function ResumePDFDocument({ data }) {
  const {
    personal = {},
    experience = [],
    education = [],
    skills = { languages: [], dsa: [], frontend: [], backend: [], tools: [] },
    projects = [],
    certifications = [],
    achievements = [],
  } = data;

  const hasSkills =
    (skills.languages || []).length > 0 ||
    (skills.dsa || []).length > 0 ||
    (skills.frontend || []).length > 0 ||
    (skills.backend || []).length > 0 ||
    (skills.tools || []).length > 0;

  return (
    <Document title={`${personal.fullName || "Resume"}.pdf`}>
      <Page size="A4" style={styles.page} wrap>
        {/* Header */}
        <View style={styles.header}>
          <Text style={styles.name}>{personal.fullName || "Your Full Name"}</Text>
          <View style={styles.contactRow}>
            {personal.linkedIn && (
              <Link src={toUrl(personal.linkedIn)} style={{ color: "#1D4ED8", fontSize: 9.5, fontFamily: "Helvetica" }}>
                LinkedIn
              </Link>
            )}
            {personal.linkedIn && (personal.gitHub || personal.website || personal.email || personal.phone) && (
              <Text style={styles.pipe}>|</Text>
            )}

            {personal.gitHub && (
              <Link src={toUrl(personal.gitHub)} style={{ color: "#1D4ED8", fontSize: 9.5, fontFamily: "Helvetica" }}>
                GitHub
              </Link>
            )}
            {personal.gitHub && (personal.website || personal.email || personal.phone) && (
              <Text style={styles.pipe}>|</Text>
            )}

            {personal.website && (
              <Link src={toUrl(personal.website)} style={{ color: "#1D4ED8", fontSize: 9.5, fontFamily: "Helvetica" }}>
                Portfolio
              </Link>
            )}
            {personal.website && (personal.email || personal.phone) && <Text style={styles.pipe}>|</Text>}

            {personal.email && (
              <Link src={`mailto:${personal.email}`} style={{ color: "#1D4ED8", fontSize: 9.5, fontFamily: "Helvetica" }}>
                {personal.email}
              </Link>
            )}
            {personal.email && personal.phone && <Text style={styles.pipe}>|</Text>}

            {personal.phone && <Text style={{ fontSize: 9.5, color: "#374151" }}>{personal.phone}</Text>}
          </View>
        </View>

        {/* Professional Summary */}
        {personal.summary && (
          <View style={styles.section}>
            <SectionHeading>Professional Summary</SectionHeading>
            <Text style={styles.summaryText}>{personal.summary}</Text>
          </View>
        )}

        {/* Skills */}
        {hasSkills && (
          <View style={styles.section}>
            <SectionHeading>Skills</SectionHeading>
            {(skills.languages || []).length > 0 && (
              <Text style={styles.skillLine}>
                <Text style={styles.boldLabel}>Languages: </Text>
                {skills.languages.join(", ")}
              </Text>
            )}
            {(skills.dsa || []).length > 0 && (
              <Text style={styles.skillLine}>
                <Text style={styles.boldLabel}>Data Structures & Algorithms: </Text>
                {skills.dsa.join(", ")}
              </Text>
            )}
            {(skills.frontend || []).length > 0 && (
              <Text style={styles.skillLine}>
                <Text style={styles.boldLabel}>Frontend: </Text>
                {skills.frontend.join(", ")}
              </Text>
            )}
            {(skills.backend || []).length > 0 && (
              <Text style={styles.skillLine}>
                <Text style={styles.boldLabel}>Backend: </Text>
                {skills.backend.join(", ")}
              </Text>
            )}
            {(skills.tools || []).length > 0 && (
              <Text style={styles.skillLine}>
                <Text style={styles.boldLabel}>Tools: </Text>
                {skills.tools.join(", ")}
              </Text>
            )}
          </View>
        )}

        {/* Education */}
        {education.length > 0 && (
          <View style={styles.section}>
            <SectionHeading>Education</SectionHeading>
            {education.map((edu) => (
              <View key={edu.id} style={styles.eduRow}>
                <View style={styles.eduLeft}>
                  <Text style={styles.eduInstitution}>{edu.institution}</Text>
                  <Text style={styles.eduDegree}>
                    {edu.degree}
                    {edu.fieldOfStudy ? ` in ${edu.fieldOfStudy}` : ""}
                  </Text>
                  {edu.gpa ? <Text style={styles.eduGpa}>{edu.gpa}</Text> : null}
                </View>
                <View style={styles.eduRight}>
                  {edu.location ? <Text style={styles.eduLocation}>{edu.location}</Text> : null}
                  <Text style={styles.eduDates}>
                    {edu.startDate} - {edu.endDate}
                  </Text>
                </View>
              </View>
            ))}
          </View>
        )}

        {/* Projects */}
        {projects.length > 0 && (
          <View style={styles.section}>
            <SectionHeading>Projects</SectionHeading>
            {projects.map((proj) => {
              const githubUrl =
                proj.githubLink || proj.gitHub || (proj.link && proj.link.toLowerCase().includes("github") ? proj.link : null);
              const liveUrl =
                proj.liveLink || proj.url || proj.website || (proj.link && !proj.link.toLowerCase().includes("github") ? proj.link : null);

              return (
                <View key={proj.id} style={styles.projectBlock}>
                  <View style={styles.itemHeader}>
                    <Text style={styles.projectTitle}>{proj.name}</Text>
                    <View style={styles.projectLinks}>
                      {githubUrl && <Link src={toUrl(githubUrl)} style={styles.projectLink}>GitHub</Link>}
                      {githubUrl && liveUrl && <Text style={styles.linkDivider}>|</Text>}
                      {liveUrl && <Link src={toUrl(liveUrl)} style={styles.projectLink}>Live</Link>}
                    </View>
                  </View>

                  {(proj.technologies || []).length > 0 && (
                    <Text style={styles.techStack}>{proj.technologies.join(" · ")}</Text>
                  )}

                  {((proj.bullets && proj.bullets.length > 0) || proj.description) && (
                    <View style={styles.bulletList}>
                      {(proj.bullets && proj.bullets.length > 0 ? proj.bullets : [proj.description]).map(
                        (b, bIdx) =>
                          b ? (
                            <Text key={bIdx} style={styles.bulletItem}>
                              • {b}
                            </Text>
                          ) : null
                      )}
                    </View>
                  )}
                </View>
              );
            })}
          </View>
        )}

        {/* Work Experience */}
        {experience.length > 0 && (
          <View style={styles.section}>
            <SectionHeading>Work Experience</SectionHeading>
            {experience.map((exp) => (
              <View key={exp.id} style={{ marginBottom: 10 }}>
                <View style={styles.itemHeader}>
                  <Text style={styles.itemTitle}>
                    {exp.position} <Text style={styles.itemSubtitle}>| {exp.company}</Text>
                  </Text>
                  <Text style={styles.itemDate}>
                    {exp.startDate} - {exp.isCurrent ? "Present" : exp.endDate || "Present"}
                    {exp.location ? ` • ${exp.location}` : ""}
                  </Text>
                </View>
                {(exp.bullets || []).length > 0 && (
                  <View style={styles.bulletList}>
                    {exp.bullets.map((b, idx) => (
                      <Text key={idx} style={styles.bulletItem}>
                        • {b}
                      </Text>
                    ))}
                  </View>
                )}
              </View>
            ))}
          </View>
        )}

        {/* Certifications */}
        {certifications.length > 0 && (
          <View style={styles.section}>
            <SectionHeading>Certifications</SectionHeading>
            {certifications.map((cert) => (
              <View key={cert.id} style={styles.itemHeader}>
                <Text style={styles.itemTitle}>
                  {cert.name} <Text style={styles.itemSubtitle}>- {cert.issuer}</Text>
                </Text>
                <Text style={styles.itemDate}>{cert.date}</Text>
              </View>
            ))}
          </View>
        )}

        {/* Achievements */}
        {achievements.length > 0 && (
          <View style={styles.section}>
            <SectionHeading>Achievements</SectionHeading>
            <View style={styles.bulletList}>
              {achievements.map((ach) => (
                <Text key={ach.id} style={styles.achievementItem}>
                  • {ach.title}
                </Text>
              ))}
            </View>
          </View>
        )}
      </Page>
    </Document>
  );
}