export const sampleResumeData = {
  personal: {
    fullName: "Sarah Jenkins",
    email: "sarah.jenkins@example.com",
    phone: "+1 (555) 234-5678",
    location: "San Francisco, CA",
    linkedIn: "linkedin.com/in/sarah-jenkins-dev",
    gitHub: "github.com/sarahjenkins-dev",
    website: "sarahjenkins.dev",
    summary:
      "Results-driven Senior Full-Stack Engineer with over 5 years of experience architecting high-scale web applications, microservices, and AI-assisted cloud platforms. Skilled in React, Next.js, JavaScript, Python, and AWS.",
  },
  targetJob: {
    targetRole: "Senior Full Stack AI Engineer",
    industry: "Software Engineering & Artificial Intelligence",
    jobDescription:
      "We are looking for a Senior Full Stack AI Engineer to design and scale next-generation LLM interfaces and backend microservices. Key requirements: expertise in React, Next.js, Node.js, JavaScript, Python, PostgreSQL, Docker, and REST/GraphQL APIs. Experience integrating Google Gemini or OpenAI APIs and optimizing front-end performance for latency and accessibility is highly desirable.",
  },
  experience: [
    {
      id: "exp-1",
      company: "CloudScale Tech Solutions",
      position: "Senior Full-Stack Developer",
      location: "San Francisco, CA",
      startDate: "2022-03",
      endDate: "Present",
      isCurrent: true,
      bullets: [
        "Architected scalable Next.js frontend applications processing high-throughput API responses.",
        "Built serverless backend REST APIs using Node.js, JavaScript, and AWS Lambda.",
        "Engineered real-time collaboration tools with WebSockets reducing user latency.",
        "Mentored junior developers and led weekly code reviews to maintain high quality standards.",
      ],
    },
    {
      id: "exp-2",
      company: "Vanguard Software Inc",
      position: "Software Engineer",
      location: "Austin, TX",
      startDate: "2019-06",
      endDate: "2022-02",
      isCurrent: false,
      bullets: [
        "Developed responsive Web applications using React, Redux, and Tailwind CSS.",
        "Integrated PostgreSQL databases and optimized complex SQL queries for faster page loads.",
        "Implemented automated CI/CD pipelines using GitHub Actions and Docker containers.",
        "Collaborated with UX design team to execute accessible UI components.",
      ],
    },
  ],
  education: [
    {
      id: "edu-1",
      institution: "University of California, Berkeley",
      degree: "Bachelor of Science",
      fieldOfStudy: "Computer Science",
      startDate: "2015-08",
      endDate: "2019-05",
      gpa: "3.85 / 4.0",
    },
  ],
  skills: {
    languages: ["JavaScript", "Python", "SQL"],
    dsa: ["Arrays", "Trees", "Graphs", "Dynamic Programming"],
    frontend: ["React", "Next.js", "Tailwind CSS", "GraphQL"],
    backend: ["Node.js", "REST APIs", "PostgreSQL", "AWS Lambda"],
    tools: ["Git", "Docker", "AWS", "Jest", "Vercel"],
  },
  projects: [
    {
      id: "proj-1",
      name: "Legible AI Resume Builder",
      bullets: [
        "Full-stack AI powered web application generating ATS-optimized resumes from raw user experiences using Next.js and Gemini API.",
        "Built client-side PDF export with zero server dependencies.",
        "Designed real-time ATS keyword analysis scoring algorithm.",
      ],
      technologies: ["Next.js", "JavaScript", "Tailwind CSS", "Gemini API", "React-PDF"],
      githubLink: "https://github.com/user/legible",
      liveLink: "https://legible.app",
    },
  ],
  certifications: [
    {
      id: "cert-1",
      name: "AWS Certified Solutions Architect - Associate",
      issuer: "Amazon Web Services",
      date: "2023-04",
      url: "https://aws.amazon.com/verification",
    },
  ],
  achievements: [
    {
      id: "ach-1",
      title: "1st Place - SF Tech Hackathon 2024 (Generative AI Track)",
    },
    {
      id: "ach-2",
      title: "Top 5% - LeetCode (Global ranking, 1800+ problems solved)",
    },
    {
      id: "ach-3",
      title: "AWS Certified Solutions Architect - Associate (Score: 920/1000)",
    },
    {
      id: "ach-4",
      title: "Open Source Contributor - 200+ GitHub stars on personal CLI tooling project",
    },
    {
      id: "ach-5",
      title: "Dean's List - University of California, Berkeley (2017, 2018, 2019)",
    },
  ],
};
