import {
  BarChart3,
  Brain,
  Building2,
  FileText,
  Globe,
  Lock,
} from "lucide-react";

export const domainsContent = {
  title: "Connected Healthcare Domains",
  description:
    "Clinical, operational, and compliance systems unified for modern care delivery.",
};

export const domainCards = [
  {
    id: "clinical",
    title: "Clinical Intelligence Systems",
    description: "AI-driven diagnostics, report analysis, and decision support",
    Icon: Brain,
    posClass: "cardTopLeft",
    anchor: "topLeft",
    entryRotate: -7,
  },
  {
    id: "documentation",
    title: "Medical Documentation",
    description: "AI scribes, structured notes, and record systems",
    Icon: FileText,
    posClass: "cardTopCenter",
    anchor: "topCenter",
    entryRotate: -2,
  },
  {
    id: "security",
    title: "Compliance & Data Security",
    description: "HIPAA-ready systems and audit-ready infrastructure",
    Icon: Lock,
    posClass: "cardTopRight",
    anchor: "topRight",
    entryRotate: 7,
  },
  {
    id: "operations",
    title: "Hospital & Clinic Operations",
    description: "Workflow automation, scheduling, and patient management",
    Icon: Building2,
    posClass: "cardBottomLeft",
    anchor: "bottomLeft",
    entryRotate: 7,
  },
  {
    id: "remote-care",
    title: "Telemedicine & Remote Care",
    description: "Digital consultation platforms and monitoring systems",
    Icon: Globe,
    posClass: "cardBottomCenter",
    anchor: "bottomCenter",
    entryRotate: 2,
  },
  {
    id: "analytics",
    title: "Healthcare Analytics",
    description:
      "Data-driven insights for better clinical and operational decisions",
    Icon: BarChart3,
    posClass: "cardBottomRight",
    anchor: "bottomRight",
    entryRotate: -7,
  },
];
