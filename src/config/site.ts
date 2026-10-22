/**
 * Central Site Configuration
 * All owner details and portfolio metadata are maintained here for easy editing.
 */

export interface SiteConfig {
  ownerName: string;
  ownerRole: string;
  ownerBio: string;
  creatorTagline: string;
  contactEmail: string;
  githubUrl: string;
  linkedinUrl: string;
  resumePath?: string;
  siteTitle: string;
  siteDescription: string;
  basePath: string;
  firebaseEnabled: boolean;
  education: {
    degree: string;
    institution: string;
    period: string;
    focus: string;
  }[];
  interests: string[];
}

export const siteConfig: SiteConfig = {
  ownerName: "Senithu Sethmin Warnakulasooriya",
  ownerRole: "Electrical and Electronic Engineering Undergraduate",
  ownerBio:
    "I'm an Electrical and Electronic Engineering undergraduate interested in turning ideas into practical engineering solutions. This portfolio documents my projects, technical experiments, learning experiences, and progress as I explore electronics, embedded systems, automation, and emerging technologies.",
  creatorTagline: "Turning circuits, code, and curiosity into tangible engineering solutions.",
  contactEmail: "wom.ssw@gmail.com",
  githubUrl: "https://github.com/senithu-sethmin",
  linkedinUrl: "https://linkedin.com/in/senithu-sethmin",
  resumePath: "", // Set path to '/resume.pdf' when uploaded
  siteTitle: "Gizmo — Engineering Project Showcase",
  siteDescription:
    "Engineering project showcase and technical portfolio for Senithu Sethmin Warnakulasooriya, guided by Gizmo the Workshop Wizard.",
  basePath: (typeof import.meta !== 'undefined' && import.meta.env?.VITE_BASE_PATH) || "/",
  firebaseEnabled: Boolean(
    typeof import.meta !== 'undefined' &&
    import.meta.env?.VITE_FIREBASE_API_KEY &&
    import.meta.env?.VITE_FIREBASE_PROJECT_ID
  ),
  education: [
    {
      degree: "B.Sc. (Hons) in Electrical and Electronic Engineering",
      institution: "Faculty of Engineering",
      period: "Undergraduate (Present)",
      focus: "Embedded Systems, Power Electronics, Control Engineering & IoT",
    },
  ],
  interests: [
    "Embedded Systems & Microcontrollers",
    "Analog & Digital Circuit Design",
    "Power Electronics & Smart Energy Systems",
    "Robotics & Kinematics Control",
    "PCB Design & Rapid Prototyping",
    "Industrial Automation & Firmware Development",
  ],
};
