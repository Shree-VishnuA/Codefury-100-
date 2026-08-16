import React from "react";
import { Document, Page, Text, View, StyleSheet } from "@react-pdf/renderer";

const styles = StyleSheet.create({
  page: {
    padding: 36,
    fontFamily: "Helvetica",
    fontSize: 10,
    lineHeight: 1.4,
    color: "#111827",
  },
  header: {
    textAlign: "center",
    borderBottomWidth: 1,
    borderBottomColor: "#D1D5DB",
    paddingBottom: 8,
    marginBottom: 12,
  },
  name: {
    fontSize: 18,
    fontFamily: "Helvetica-Bold",
    textTransform: "uppercase",
    marginBottom: 4,
    color: "#111827",
  },
  contactRow: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "center",
    gap: 8,
    fontSize: 8.5,
    color: "#4B5563",
  },
  section: {
    marginBottom: 12,
  },
  sectionTitle: {
    fontSize: 11,
    fontFamily: "Helvetica-Bold",
    textTransform: "uppercase",
    borderBottomWidth: 1,
    borderBottomColor: "#E5E7EB",
    paddingBottom: 2,
    marginBottom: 6,
    color: "#1F2937",
  },
  summaryText: {
    fontSize: 9.5,
    color: "#374151",
    lineHeight: 1.4,
  },
  itemHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "baseline",
    marginBottom: 2,
  },
  itemTitle: {
    fontSize: 10,
    fontFamily: "Helvetica-Bold",
    color: "#111827",
  },
  itemSubtitle: {
    fontSize: 9.5,
    fontFamily: "Helvetica",
    color: "#4B5563",
  },
  itemDate: {
    fontSize: 8.5,
    color: "#6B7280",
  },
  bulletList: {
    marginTop: 2,
    paddingLeft: 8,
  },
  bulletItem: {
    fontSize: 9,
    color: "#374151",
    marginBottom: 2,
  },
  skillRow: {
    fontSize: 9,
    marginBottom: 3,
  },
  boldLabel: {
    fontFamily: "Helvetica-Bold",
    color: "#111827",
  },
});

export function ResumePDFDocument({ data }) {
  const { personal = {}, experience = [], education = [], skills = { technical: [], soft: [], tools: [] }, projects = [], certifications = [], achievements = [] } = data;
  const hasSkills =
    (skills.technical || []).length > 0 || (skills.soft || []).length > 0 || (skills.tools || []).length > 0;

  return (
    <Document title={`${personal.fullName || "Resume"} - GenForge.pdf`}>
      <Page size="A4" style={styles.page}>
        <View style={styles.header}>
          <Text style={styles.name}>{personal.fullName || "Your Full Name"}</Text>
          <View style={styles.contactRow}>
            {personal.email ? <Text>{personal.email}</Text> : null}
            {personal.phone ? <Text>• {personal.phone}</Text> : null}
            {personal.location ? <Text>• {personal.location}</Text> : null}
            {personal.linkedIn ? <Text>• {personal.linkedIn}</Text> : null}
            {personal.gitHub ? <Text>• {personal.gitHub}</Text> : null}
            {personal.website ? <Text>• {personal.website}</Text> : null}
          </View>
        </View>

        {personal.summary ? (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Professional Summary</Text>
            <Text style={styles.summaryText}>{personal.summary}</Text>
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
                    {exp.startDate} – {exp.isCurrent ? "Present" : exp.endDate || "Present"}
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
                    {edu.startDate} – {edu.endDate}
                  </Text>
                  {edu.gpa ? <Text style={styles.itemDate}>GPA: {edu.gpa}</Text> : null}
                </View>
              </View>
            ))}
          </View>
        ) : null}

        {hasSkills ? (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Skills & Competencies</Text>
            {(skills.technical || []).length > 0 ? (
              <Text style={styles.skillRow}>
                <Text style={styles.boldLabel}>Technical Skills: </Text>
                {skills.technical.join(", ")}
              </Text>
            ) : null}
            {(skills.tools || []).length > 0 ? (
              <Text style={styles.skillRow}>
                <Text style={styles.boldLabel}>Tools & Platforms: </Text>
                {skills.tools.join(", ")}
              </Text>
            ) : null}
            {(skills.soft || []).length > 0 ? (
              <Text style={styles.skillRow}>
                <Text style={styles.boldLabel}>Soft Skills: </Text>
                {skills.soft.join(", ")}
              </Text>
            ) : null}
          </View>
        ) : null}

        {projects.length > 0 ? (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Key Projects</Text>
            {projects.map((proj) => (
              <View key={proj.id} style={{ marginBottom: 6 }}>
                <View style={styles.itemHeader}>
                  <Text style={styles.itemTitle}>{proj.name}</Text>
                  {proj.link ? <Text style={styles.itemDate}>{proj.link}</Text> : null}
                </View>
                {(proj.technologies || []).length > 0 ? (
                  <Text style={{ fontSize: 8.5, color: "#6B7280", marginBottom: 2 }}>
                    Tech: {proj.technologies.join(", ")}
                  </Text>
                ) : null}
                {proj.description ? (
                  <Text style={styles.summaryText}>{proj.description}</Text>
                ) : null}
              </View>
            ))}
          </View>
        ) : null}

        {certifications.length > 0 ? (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Certifications</Text>
            {certifications.map((cert) => (
              <View key={cert.id} style={styles.itemHeader}>
                <Text style={styles.itemTitle}>
                  {cert.name} <Text style={styles.itemSubtitle}>— {cert.issuer}</Text>
                </Text>
                <Text style={styles.itemDate}>{cert.date}</Text>
              </View>
            ))}
          </View>
        ) : null}

        {achievements.length > 0 ? (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Achievements & Honors</Text>
            {achievements.map((ach) => (
              <Text key={ach.id} style={{ fontSize: 9, marginBottom: 2 }}>
                <Text style={styles.boldLabel}>{ach.title}: </Text>
                {ach.description}
              </Text>
            ))}
          </View>
        ) : null}
      </Page>
    </Document>
  );
}
