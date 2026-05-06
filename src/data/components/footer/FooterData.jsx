import Facebook from "../../../components/ui/icons/Facebook";
import LinkedIn from "../../../components/ui/icons/LinkedIn";
import Instagram from "../../../components/ui/icons/Instagram";
import { Phone, Mail, MapPin } from "lucide-react";

const linkList = [
  { name: "Home", href: "/" },
  { name: "About", href: "/about" },
  { name: "Security", href: "/security" },
  { name: "Solutions", href: "/solutions" },
  { name: "Contact Us", href: "/contact" },
  { name: "FAQ", href: "/faq" },
  { name: "Resources", href: "/resources" },
  { name: "AI", href: "/ai" },
];

export const FooterData = {
  tagline:
    "Our mission is to leverage technical expertise and industry insight to craft custom software solutions that help clients thrive in a complex digital landscape.",

  usefulLinks: linkList,
  servicesLinks: linkList,

  contactLinks: [
    { icon: Phone, text: "+92 334 9989995" },
    { icon: Mail, text: "info@systemheuristics.com" },
    { icon: MapPin, text: "6K - Valencia Town, 54000, Lahore." },
  ],

  socialLinks: [
    { Icon: Phone, href: "tel:+923349989995" },
    { Icon: LinkedIn, href: "https://www.linkedin.com" },
    { Icon: Facebook, href: "https://www.facebook.com" },
    { Icon: Instagram, href: "https://www.instagram.com" },
  ],

  bottomLinks: [],
};
