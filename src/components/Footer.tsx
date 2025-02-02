import { useLocation } from 'react-router-dom';
import { sdk } from '../utils/sdk';

const Footer = () => {
  const location = useLocation();


  const exemptedRoutes = [sdk.checkoutRoute,sdk.adminDashboardRoute,sdk.adminLoginRoute]
  if (exemptedRoutes.includes(location.pathname)||location.pathname.includes('admin')) {
    return null;
  }

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
        { name: "Tiktok", url: "https://www.tiktok.com/@thehumanhairshop.ng?_t=ZM-8sFxXXeiRWP&_r=1" },
        { name: "Instagram", url: "https://www.instagram.com/thehumanhairshopng?igsh=MXVwcW81NDFpYjNubw==" }
      ] },
  ];

  return (
    <footer
      className={`bg-primary mt-2 px-6 tablet:px-16 sm:px-20 pt-16 text-secondary transition-opacity duration-1000 `}
    >
      <h3 className="dark:pt-16 overflow-visible pt-12 font-bold font-queens adelia gap-1 pb-12 leading-0 dark:border-t border-neutral-700 h-fit flex-col items-baseline text-2xl">
        The Human Hair Shop.
      </h3>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
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
