import InformationPage from "../../components/InformationPage";
import { sdk } from "../../utils/sdk";

const TermsOfService = () => {
  const title = "Terms of Service";

  const sections = [
    {
      header: "Introduction",
      content:
        "Welcome to our platform. By using our services, you agree to comply with and be bound by these Terms of Service. Please read them carefully before accessing or using our website.",
    },
    {
      header: "Eligibility",
      content:
        "To use our services, you must be at least 18 years old or have parental consent. By using our services, you represent that you meet these eligibility requirements.",
    },
    {
      header: "Account Registration",
      content:
        "To access certain features, you may need to create an account. You agree to provide accurate information and keep your credentials secure. You are responsible for all activities under your account.",
    },
    {
      header: "User Responsibilities",
      content:
        "By using our services, you agree not to:",
      list: [
        "Engage in illegal or unauthorized activities.",
        "Post harmful, offensive, or misleading content.",
        "Attempt to gain unauthorized access to our systems.",
        "Violate any applicable laws or regulations.",
      ],
    },
    {
      header: "Service Availability",
      content:
        "We strive to keep our services available at all times, but we do not guarantee uninterrupted access. We may temporarily suspend services for maintenance or other reasons.",
    },
    {
      header: "Intellectual Property",
      content:
        "All content, trademarks, and intellectual property on our platform are owned by us or licensed to us. You may not copy, distribute, or modify our content without permission.",
    },
    {
      header: "Termination of Services",
      content:
        "We reserve the right to suspend or terminate your access to our services if you violate these terms. You may also terminate your account at any time.",
    },
    {
      header: "Third-Party Links and Services",
      content:
        "Our platform may contain links to third-party websites. We are not responsible for their content, privacy policies, or practices.",
      links: [
        { text: "Example Third-Party Service", href: "https://paystack.com", external: true },
      ],
    },
    {
      header: "Limitation of Liability",
      content:
        "We are not liable for any damages arising from your use of our services. Our platform is provided 'as is' without warranties of any kind.",
    },
    {
      header: "Governing Law",
      content:
        "These Terms of Service are governed by and construed in accordance with the laws of [Your Country/State]. Any disputes will be handled in accordance with these laws.",
    },
    {
      header: "Modifications to Terms",
      content:
        "We may update these Terms of Service at any time. Continued use of our services after changes are posted constitutes acceptance of the new terms.",
    },
    {
      header: "Contact Information",
      content:
        "If you have any questions about these Terms of Service, please contact us.",
      links:[
        {text:"Contact Us page",href:sdk.contactUsPage}
      ]
    },
  ];

  return <InformationPage title={title} sections={sections} />;
};

export default TermsOfService;
