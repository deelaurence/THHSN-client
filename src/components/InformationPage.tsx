import React from "react";
import { Link } from "react-router-dom";

interface Section {
  header?: string;
  content: string;
  links?: { text: string; href: string; external?: boolean }[];
  list?: string[];
}

interface InformationPageProps {
  title?: string;
  sections: Section[];
}

const InformationPage: React.FC<InformationPageProps> = ({ title, sections }) => {
  return (
    <div className="max-w-3xl mx-auto my-16 p-6">
      {/* Page Title */}
      {title && <h1 className="text-4xl font-queens font-bold mb-10">{title}</h1>}

      {/* Sections */}
      {sections.map((section, index) => (
        <div key={index} className="mb-6">
          {section.header && <h2 className="text-lg font-semibold mb-2">{section.header}</h2>}
          <p className="opacity-60 mb-2">{section.content}</p>

          {/* Links */}
          {section.links && (
            <div className="mb-2 flex flex-col">
              {section.links.map((link, linkIndex) =>
                link.external ? (
                  <a
                    key={linkIndex}
                    href={link.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="underline"
                  >
                    {link.text}
                  </a>
                ) : (
                  <Link key={linkIndex} to={link.href} className="underline">
                    {link.text}
                  </Link>
                )
              )}
            </div>
          )}

          {/* Unordered List */}
          {section.list && (
            <ul className="list-disc pl-5">
              {section.list.map((item, itemIndex) => (
                <li key={itemIndex} className="opacity-60">
                  {item}
                </li>
              ))}
            </ul>
          )}
        </div>
      ))}
    </div>
  );
};

export default InformationPage;
