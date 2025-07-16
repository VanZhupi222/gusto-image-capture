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
  const baseClasses = "bg-white rounded-lg transition-all";

  const variantClasses = {
    default: "shadow-md border border-gray-100",
    outlined: "border-2 border-gray-200 hover:border-gray-300",
    elevated: "shadow-lg hover:shadow-xl"
  };

  const paddingClasses = {
    none: "",
    sm: "p-4",
    md: "p-6", 
    lg: "p-8",
    xl: "p-10"
  };

  // 组合所有className
  const allClasses = `${baseClasses} ${variantClasses[variant]} ${paddingClasses[padding]} ${className}`;

  return (
    <div className={allClasses}>
      {children}
    </div>
  );
} 