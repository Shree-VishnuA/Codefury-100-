import React from "react";
import { Document, Page, Text, View, StyleSheet, Link } from "@react-pdf/renderer";

const styles = StyleSheet.create({
  page: {
    paddingTop: 32,
    paddingBottom: 32,
    paddingHorizontal: 36,
    fontFamily: "Times-Roman",
    fontSize: 9.5,
    lineHeight: 1.35,
    color: "#111827",
  },
  header: {
    textAlign: "center",
    marginBottom: 10,
  },
  name: {
    fontSize: 28,
    fontFamily: "Times-Roman",
    textTransform: "uppercase",
    letterSpacing: 2,
    marginBottom: 10,
    color: "#111827",
  },
  contactRow: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "center",
    alignItems: "center",
    fontSize: 9,
    fontFamily: "Helvetica",
    color: "#374151",
  },
  pipe: {
    color: "#9CA3AF",
    marginHorizontal: 4,
    fontSize: 9,
  },
  section: {
    marginBottom: 9,
  },
  sectionTitle: {
    fontSize: 10.5,
    fontFamily: "Times-Bold",
    textTransform: "uppercase",
    borderBottomWidth: 0.8,
    borderBottomColor: "#111827",
    paddingBottom: 1.5,
    marginBottom: 4,
    color: "#111827",
  },
  summaryText: {
    fontSize: 9,
    color: "#374151",
    lineHeight: 1.35,
  },
  itemHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "baseline",
    marginBottom: 1.5,
  },
  itemTitle: {
    fontSize: 9.5,
    fontFamily: "Times-Bold",
    color: "#111827",
  },
  itemSubtitle: {
    fontSize: 9,
    fontFamily: "Times-Roman",
    color: "#4B5563",
  },
  itemDate: {
    fontSize: 8.5,
    fontFamily: "Helvetica",
    color: "#6B7280",
  },
  bulletList: {
    marginTop: 1,
    paddingLeft: 6,
  },
  bulletItem: {
    fontSize: 8.5,
    color: "#374151",
    marginBottom: 1.5,
    lineHeight: 1.35,
  },
  skillRow: {
    fontSize: 8.5,
    marginBottom: 2,
  },
  boldLabel: {
    fontFamily: "Times-Bold",
    color: "#111827",
  },
  link: {
    color: "#1D4ED8",
    textDecoration: "none",
    fontSize: 8.5,
    fontFamily: "Helvetica",
  },
  contactLink: {
    color: "#1D4ED8",
    textDecoration: "none",
    fontSize: 9,
    fontFamily: "Helvetica",
  },
});

export function ResumePDFDocument({ data }) {
  const { personal = {}, experience = [], education = [], skills = { technical: [], soft: [], tools: [] }, projects = [], certifications = [], achievements = [] } = data;
  const hasSkills =
    (skills.languages || []).length > 0 || (skills.dsa || []).length > 0 || (skills.frontend || []).length > 0 || (skills.backend || []).length > 0 || (skills.tools || []).length > 0;

  return (
    <Document title={`${personal.fullName || "Resume"} - Legible.pdf`}>
      <Page size="A4" style={styles.page}>
        <View style={styles.header}>
          <Text style={styles.name}>{personal.fullName || "Your Full Name"}</Text>
          <View style={styles.contactRow}>
            {personal.linkedIn ? (
              <Link src={personal.linkedIn.startsWith('http') ? personal.linkedIn : `https://${personal.linkedIn}`} style={styles.contactLink}>LinkedIn</Link>
            ) : null}
            {personal.linkedIn && (personal.gitHub || personal.website || personal.email || personal.phone) ? <Text style={styles.pipe}>|</Text> : null}

            {personal.gitHub ? (
              <Link src={personal.gitHub.startsWith('http') ? personal.gitHub : `https://${personal.gitHub}`} style={styles.contactLink}>GitHub</Link>
            ) : null}
            {personal.gitHub && (personal.website || personal.email || personal.phone) ? <Text style={styles.pipe}>|</Text> : null}

            {personal.website ? (
              <Link src={personal.website.startsWith('http') ? personal.website : `https://${personal.website}`} style={styles.contactLink}>Portfolio</Link>
            ) : null}
            {personal.website && (personal.email || personal.phone) ? <Text style={styles.pipe}>|</Text> : null}

            {personal.email ? (
              <Link src={`mailto:${personal.email}`} style={styles.contactLink}>{personal.email}</Link>
            ) : null}
            {personal.email && personal.phone ? <Text style={styles.pipe}>|</Text> : null}

            {personal.phone ? <Text style={{ fontSize: 9, color: "#374151" }}>{personal.phone}</Text> : null}
          </View>
        </View>

        {personal.summary ? (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Professional Summary</Text>
            <Text style={styles.summaryText}>{personal.summary}</Text>
          </View>
        ) : null}

        {hasSkills ? (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Skills</Text>
            <View style={styles.bulletList}>
              {(skills.languages || []).length > 0 ? (
                <Text style={styles.bulletItem}>
                  • <Text style={styles.boldLabel}>Languages: </Text>{skills.languages.join(", ")}
                </Text>
              ) : null}
              {(skills.dsa || []).length > 0 ? (
                <Text style={styles.bulletItem}>
                  • <Text style={styles.boldLabel}>Data Structures & Algorithms: </Text>{skills.dsa.join(", ")}
                </Text>
              ) : null}
              {(skills.frontend || []).length > 0 ? (
                <Text style={styles.bulletItem}>
                  • <Text style={styles.boldLabel}>Frontend: </Text>{skills.frontend.join(", ")}
                </Text>
              ) : null}
              {(skills.backend || []).length > 0 ? (
                <Text style={styles.bulletItem}>
                  • <Text style={styles.boldLabel}>Backend: </Text>{skills.backend.join(", ")}
                </Text>
              ) : null}
              {(skills.tools || []).length > 0 ? (
                <Text style={styles.bulletItem}>
                  • <Text style={styles.boldLabel}>Tools: </Text>{skills.tools.join(", ")}
                </Text>
              ) : null}
            </View>
          </View>
        ) : null}

        {education.length > 0 ? (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Education</Text>
            {education.map((edu) => (
              <View key={edu.id} style={styles.itemHeader}>
                <View>
                  <Text style={styles.itemTitle}>
                    {edu.degree} {edu.fieldOfStudy ? `in ${edu.fieldOfStudy}` : ""}
                  </Text>
                  <Text style={styles.itemSubtitle}>{edu.institution}</Text>
                </View>
                <View style={{ alignItems: "flex-end" }}>
                  <Text style={styles.itemDate}>
                    {edu.startDate} - {edu.endDate}
                  </Text>
                  {edu.gpa ? <Text style={styles.itemDate}>GPA: {edu.gpa}</Text> : null}
                </View>
              </View>
            ))}
          </View>
        ) : null}

        {experience.length > 0 ? (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Work Experience</Text>
            {experience.map((exp) => (
              <View key={exp.id} style={{ marginBottom: 8 }}>
                <View style={styles.itemHeader}>
                  <Text style={styles.itemTitle}>
                    {exp.position} <Text style={styles.itemSubtitle}>| {exp.company}</Text>
                  </Text>
                  <Text style={styles.itemDate}>
                    {exp.startDate} - {exp.isCurrent ? "Present" : exp.endDate || "Present"}
                    {exp.location ? ` • ${exp.location}` : ""}
                  </Text>
                </View>
                {(exp.bullets || []).length > 0 ? (
                  <View style={styles.bulletList}>
                    {exp.bullets.map((b, idx) => (
                      <Text key={idx} style={styles.bulletItem}>
                        • {b}
                      </Text>
                    ))}
                  </View>
                ) : null}
              </View>
            ))}
          </View>
        ) : null}

        {projects.length > 0 ? (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Projects</Text>
            {projects.map((proj) => {
              const githubUrl = proj.githubLink || proj.gitHub || (proj.link && proj.link.toLowerCase().includes("github") ? proj.link : null);
              const liveUrl = proj.liveLink || proj.url || proj.website || (proj.link && !proj.link.toLowerCase().includes("github") ? proj.link : null);

              return (
                <View key={proj.id} style={{ marginBottom: 6 }}>
                  <View style={styles.itemHeader}>
                    <Text style={styles.itemTitle}>{proj.name}</Text>
                    <View style={{ flexDirection: "row", gap: 4, alignItems: "center" }}>
                      {githubUrl ? (
                        <Link src={githubUrl.startsWith('http') ? githubUrl : `https://${githubUrl}`} style={styles.link}>GitHub</Link>
                      ) : null}
                      {githubUrl && liveUrl ? <Text style={{ fontSize: 8, color: "#9CA3AF" }}>|</Text> : null}
                      {liveUrl ? (
                        <Link src={liveUrl.startsWith('http') ? liveUrl : `https://${liveUrl}`} style={styles.link}>Live</Link>
                      ) : null}
                    </View>
                  </View>
                {(proj.technologies || []).length > 0 ? (
                  <Text style={{ fontSize: 9, color: "#111827", marginBottom: 2 }}>
                    <Text style={styles.boldLabel}>Tech Stack: </Text>{proj.technologies.join(", ")}
                  </Text>
                ) : null}
                {((proj.bullets && proj.bullets.length > 0) || proj.description) ? (
                  <View style={styles.bulletList}>
                    {(proj.bullets && proj.bullets.length > 0
                      ? proj.bullets
                      : [proj.description]
                    ).map((b, bIdx) => (
                      b ? (
                        <Text key={bIdx} style={styles.bulletItem}>
                          • {b}
                        </Text>
                      ) : null
                    ))}
                  </View>
                ) : null}
              </View>
            );
          })}
          </View>
        ) : null}

        {certifications.length > 0 ? (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Certifications</Text>
            {certifications.map((cert) => (
              <View key={cert.id} style={styles.itemHeader}>
                <Text style={styles.itemTitle}>
                  {cert.name} <Text style={styles.itemSubtitle}>- {cert.issuer}</Text>
                </Text>
                <Text style={styles.itemDate}>{cert.date}</Text>
              </View>
            ))}
          </View>
        ) : null}

        {achievements.length > 0 ? (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Achievements</Text>
            <View style={styles.bulletList}>
              {achievements.map((ach) => (
                <Text key={ach.id} style={styles.bulletItem}>
                  • {ach.title}
                </Text>
              ))}
            </View>
          </View>
        ) : null}
      </Page>
    </Document>
  );
}
