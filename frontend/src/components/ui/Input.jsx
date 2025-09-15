import React from 'react';

const Input = ({
  type = 'text',
  placeholder,
  value,
  onChange,
  name,
  id,
  required = false,
  disabled = false,
  className = '',
  label,
  error,
  ...props
}) => {
  const baseClasses = 'w-full px-4 py-3 border border-border-primary rounded-lg focus:outline-none focus:ring-2 focus:ring-theme-primary focus:border-transparent transition-all duration-200 bg-background-primary text-text-primary placeholder-text-muted';
  const errorClasses = error ? 'border-theme-error focus:ring-theme-error' : '';
  const disabledClasses = disabled ? 'bg-background-secondary cursor-not-allowed opacity-60' : '';

  return (
    <div className="w-full">
      {label && (
        <label htmlFor={id || name} className="block text-sm font-medium text-text-primary mb-2">
          {label}
          {required && <span className="text-theme-error ml-1">*</span>}
        </label>
      )}
      <input
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        name={name}
        id={id || name}
        required={required}
        disabled={disabled}
        className={`${baseClasses} ${errorClasses} ${disabledClasses} ${className}`}
        {...props}
      />
      {error && (
        <p className="mt-1 text-sm text-theme-error">{error}</p>
      )}
    </div>
  );
};

export default Input;