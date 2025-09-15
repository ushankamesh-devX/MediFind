import React from 'react';

const Card = ({
  children,
  className = '',
  shadow = 'card',
  padding = 'medium',
  ...props
}) => {
  const baseClasses = 'bg-background-primary border border-border-primary rounded-xl';

  const shadowClasses = {
    none: '',
    card: 'shadow-card',
    medical: 'shadow-medical',
    pharmacy: 'shadow-pharmacy',
    prescription: 'shadow-prescription',
  };

  const paddingClasses = {
    none: '',
    small: 'p-4',
    medium: 'p-6',
    large: 'p-8',
  };

  return (
    <div
      className={`${baseClasses} ${shadowClasses[shadow]} ${paddingClasses[padding]} ${className}`}
      {...props}
    >
      {children}
    </div>
  );
};

const CardHeader = ({ children, className = '', ...props }) => (
  <div className={`mb-4 ${className}`} {...props}>
    {children}
  </div>
);

const CardTitle = ({ children, className = '', ...props }) => (
  <h3 className={`text-xl font-semibold text-text-primary ${className}`} {...props}>
    {children}
  </h3>
);

const CardDescription = ({ children, className = '', ...props }) => (
  <p className={`text-text-secondary ${className}`} {...props}>
    {children}
  </p>
);

const CardContent = ({ children, className = '', ...props }) => (
  <div className={className} {...props}>
    {children}
  </div>
);

const CardFooter = ({ children, className = '', ...props }) => (
  <div className={`mt-4 pt-4 border-t border-border-primary ${className}`} {...props}>
    {children}
  </div>
);

// Attach sub-components to Card
Card.Header = CardHeader;
Card.Title = CardTitle;
Card.Description = CardDescription;
Card.Content = CardContent;
Card.Footer = CardFooter;

export default Card;