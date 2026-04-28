export const ContactPageData = {
  contactSection: {
    intro: {
      chip: "Get in Touch",
      title: "Let's talk about your healthcare project",
      highlightWord: 4,
      subtitle:
        "Reach out to discuss how AI-powered solutions can transform your workflows, scale your platform, or modernize your patient experience.",
    },

    interests: [
      "AI Diagnostics",
      "EHR Integration",
      "Telehealth",
      "Compliance",
      "Custom Build",
    ],

    contactInfo: [
      {
        type: "email",
        title: "Email",
        subtitle: "Our friendly team is here to help",
        value: "info@systemheuristics.com",
      },
      {
        type: "office",
        title: "Office",
        subtitle: "Come say hello to our office HQ.",
        value: "6K - Valencia Town, 54000, Lahore.",
      },
      {
        type: "phone",
        title: "Phone",
        subtitle: "Mon-Fri from 9am to 6pm.",
        value: "+92 344 9989995",
      },
    ],
  },

  contactForm: {
    title: "Start the Conversation",
    highlightWord: 3,
    description:
      "Tell us about your organization and goals — we'll get back to you with the right solution.",
    fields: [
      {
        name: "fullName",
        label: "Full Name:",
        type: "text",
        placeholder: "Enter Your Name:",
      },
      {
        name: "email",
        label: "Email:",
        type: "email",
        placeholder: "Test@gmail.com",
      },
      {
        name: "organizationType",
        label: "Organization Type:",
        type: "select",
        placeholder: "whats your organization type?",
        options: [
          "Hospital",
          "Clinic",
          "Health-Tech Startup",
          "Insurance",
          "Other",
        ],
      },
      {
        name: "interest",
        label: "What are you looking for?",
        type: "select",
        placeholder: "what services are you looking for?",
        options: [
          "AI Diagnostics",
          "EHR Integration",
          "Telehealth",
          "Compliance",
          "Custom Build",
        ],
      },
      {
        name: "message",
        label: "Message:",
        type: "textarea",
        placeholder: "send us a message :)",
      },
    ],
    submitText: "Send Message",
  },
};
