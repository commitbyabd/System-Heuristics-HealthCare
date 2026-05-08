import { Cpu, FileText, Monitor, Users } from "lucide-react";

export const ourSolutionsContent = {
  chipText: "Our Services",
  title: "Our Healthcare Solutions",
  highlightWord: 2,
  subtitle:
    "Explore our key solutions designed to enhance patient care, streamline operations, and drive smarter healthcare decisions through technology.",
  learnMoreText: "Learn More",
  learnMoreHref: "/",
};

export const ourSolutionsSteps = [
  {
    id: "ehr",
    Icon: FileText,
    title: "Comprehensive EHR Management System",
    description:
      "Efficiently manage electronic health records across clinics and hospitals.",
    image: "/images/home/solution-card.avif",
  },
  {
    id: "operations",
    Icon: Cpu,
    title: "Operational Intelligence Layer",
    description:
      "Unify day-to-day healthcare operations with dashboards, automation, and real-time reporting for every team.",
    image: "/images/home/solution-card.avif",
  },
  {
    id: "patient",
    Icon: Users,
    title: "Patient Experience Optimization Suite",
    description:
      "Streamline onboarding, scheduling, and patient communications with systems designed for modern care journeys.",
    image: "/images/home/patient-experience.avif",
  },
  {
    id: "compliance",
    Icon: Monitor,
    title: "Compliance And Risk Command Center",
    description:
      "Surface compliance blind spots early and give teams the visibility they need to act before issues escalate.",
    image: "/images/home/solution-card.avif",
  },
];
