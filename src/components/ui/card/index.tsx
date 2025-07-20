import { ReactNode } from 'react';

interface CardProps {
  children: ReactNode;
  variant?: 'default' | 'outlined' | 'elevated';
  padding?: 'none' | 'sm' | 'md' | 'lg' | 'xl';
  className?: string;
}

export default function Card({ 
  children, 
  variant = 'default',
  padding = 'lg',
  className = ''
}: CardProps) {
  const baseClasses = "bg-surface-primary rounded-lg transition-all";

  const variantClasses = {
    default: "shadow-md border border-surface-tertiary",
    outlined: "border-2 border-surface-tertiary hover:border-secondary",
    elevated: "shadow-lg hover:shadow-xl"
  };

  const paddingClasses = {
    none: "",
    sm: "p-4",
    md: "p-6", 
    lg: "p-8",
    xl: "p-10"
  };

  const allClasses = `${baseClasses} ${variantClasses[variant]} ${paddingClasses[padding]} ${className}`;

  return (
    <div className={allClasses}>
      {children}
    </div>
  );
} 