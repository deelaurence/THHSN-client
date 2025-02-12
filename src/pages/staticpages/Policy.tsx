import InformationPage from "../../components/InformationPage";
import { sdk } from "../../utils/sdk";

const PrivacyPolicy = () => {
  const title = "Privacy Policy";

  const sections = [
    {
      header: "Introduction",
      content:
        "Your privacy is of utmost importance to us. This Privacy Policy outlines the types of personal information we collect, how we use it, and the measures we take to ensure its security. By accessing our services, you agree to the practices described in this policy.",
    },
    {
      header: "Information We Collect",
      content:
        "We collect different types of information for various purposes to improve our service to you.",
      list: [
        "Personal Data: Includes name, email, phone number, billing details.",
        "Usage Data: Tracks interactions, page views, and session duration.",
        "Cookies and Tracking Technologies: Used to improve user experience and analyze traffic.",
      ],
    },
    {
      header: "How We Use Your Information",
      content:
        "We use the collected information for several reasons, including but not limited to:",
      list: [
        "Providing and maintaining our services.",
        "Improving website functionality and user experience.",
        "Processing transactions and sending related notifications.",
        "Responding to customer inquiries and offering support.",
        "Ensuring compliance with legal obligations.",
      ],
    },
    {
      header: "Data Retention",
      content:
        "We retain your personal data only for as long as necessary to fulfill the purposes outlined in this policy, or as required by applicable laws.",
    },
    {
      header: "Sharing Your Data",
      content:
        "We do not sell your personal data. However, we may share information with trusted third parties, including:",
      list: [
        "Service providers assisting with payment processing, data analytics, and hosting.",
        "Legal authorities when required to comply with the law.",
        "Business partners in case of a merger, acquisition, or asset sale.",
      ],
    },
    {
      header: "Security Measures",
      content:
        "We implement a variety of security measures to maintain the safety of your personal data. These include encryption, secure servers, and access control mechanisms. However, no method of transmission over the internet is 100% secure.",
    },
    {
      header: "Cookies and Tracking Technologies",
      content:
        "Cookies help us personalize content, analyze traffic, and improve our services. You may disable cookies through your browser settings, though some features of our site may not function properly without them.",
      links: [
        { text: "Learn more about cookies", href: "/cookies-policy" },
      ],
    },
    {
      header: "Your Rights and Choices",
      content:
        "Depending on your location, you may have rights regarding your personal data, including:",
      list: [
        "The right to access, correct, or delete your data.",
        "The right to restrict or object to processing.",
        "The right to data portability.",
        "The right to withdraw consent for marketing emails.",
      ],
    },
    {
      header: "Third-Party Links",
      content:
        "Our website may contain links to third-party sites. We are not responsible for their privacy policies and encourage you to review them.",
      links: [
        { text: "Example Third-Party Site", href: "https://paystack.com", external: true },
      ],
    },
    {
      header: "Children's Privacy",
      content:
        "Our services are not intended for individuals under the age of 13. We do not knowingly collect personal data from children.",
    },
    {
      header: "Changes to This Privacy Policy",
      content:
        "We may update this Privacy Policy from time to time. Changes will be effective when posted on this page.",
    },
    {
      header: "Contact Us",
      content:
        "If you have any questions about this Privacy Policy, please contact us.",
      links:[
              {text:"Contact Us page",href:sdk.contactUsPage}
      ]
    },
  ];

  return <InformationPage title={title} sections={sections} />;
};

export default PrivacyPolicy;
