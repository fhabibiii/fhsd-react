
import React from 'react';
import { ChevronRight, Home } from 'lucide-react';

interface BreadcrumbItem {
  label: string;
  href: string;
  active?: boolean;
}

interface BreadcrumbProps {
  items: BreadcrumbItem[];
  className?: string;
}

const Breadcrumb: React.FC<BreadcrumbProps> = ({ items, className = '' }) => {
  const scrollToSection = (href: string) => {
    if (href.startsWith('#')) {
      const element = document.querySelector(href);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };

  return (
    <nav 
      className={`flex items-center space-x-1 text-sm text-gray-600 dark:text-gray-400 ${className}`}
      aria-label="Breadcrumb"
    >
      <ol className="flex items-center space-x-1" itemScope itemType="https://schema.org/BreadcrumbList">
        {items.map((item, index) => (
          <li 
            key={index} 
            className="flex items-center"
            itemProp="itemListElement" 
            itemScope 
            itemType="https://schema.org/ListItem"
          >
            {index > 0 && (
              <ChevronRight className="w-4 h-4 mx-1 text-gray-400" aria-hidden="true" />
            )}
            
            {item.active ? (
              <span 
                className="font-medium text-gray-900 dark:text-white"
                itemProp="name"
                aria-current="page"
              >
                {item.label}
              </span>
            ) : (
              <button
                onClick={() => scrollToSection(item.href)}
                className="hover:text-primary transition-colors duration-200 flex items-center gap-1"
                itemProp="item"
              >
                {index === 0 && <Home className="w-4 h-4" aria-hidden="true" />}
                <span itemProp="name">{item.label}</span>
              </button>
            )}
            
            <meta itemProp="position" content={String(index + 1)} />
          </li>
        ))}
      </ol>
    </nav>
  );
};

export default Breadcrumb;
