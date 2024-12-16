
const Footer = () => {
  const links = [
    { category: "Say Hello", items: [
        { name: "About Us", url: "/about" },
        { name: "Careers", url: "/careers" },
        { name: "Contact", url: "/contact" }
      ] },
    { category: "Support", items: [
        { name: "Help Center", url: "/help" },
        { name: "FAQs", url: "/faqs" },
        { name: "Terms of Service", url: "/terms" }
      ] },
    { category: "Social Media", items: [
        { name: "Facebook", url: "https://facebook.com" },
        { name: "Twitter", url: "https://twitter.com" },
        { name: "Instagram", url: "https://instagram.com" }
      ] },
  ];

  return (
    <footer className="bg-primary mt-2 pt-16 text-secondary ">
      
        <h3 className="text-6xl gap-1 px-6 sm:px-20 pb-12 leading-0 dark:border-t border-neutral-700 h-fit font-bold font-queens flex items-baseline">THE HUMAN HAIR SHOP NG<span className="text-8xl"></span></h3>
        <div className="max-w-6xl mx-auto px-6 sm:px-20 grid grid-cols-1 md:grid-cols-3 gap-8">
        {links.map((linkGroup, index) => (
          <div key={index}>
            <h4 className="text-lg font-semibold font-queens mb-4">{linkGroup.category}</h4>
            <ul className="space-y-2">
              {linkGroup.items.map((item, itemIndex) => (
                <li key={itemIndex}>
                  <a
                    href={item.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:text-gray-300 text-xs transition-colors"
                  >
                    {item.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
      <div className="text-center mt-8 border-t border-gray-700 pt-4">
        <p className="text-sm">&copy; {new Date().getFullYear()} Your Company. All rights reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;
