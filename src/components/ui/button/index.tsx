interface ButtonProps {
  children: React.ReactNode;
  disabled?: boolean;
  onClick?: () => void;
  type?: 'button' | 'submit' | 'reset';
  variant?: 'primary' | 'secondary' | 'success';
  className?: string;
}

export default function Button({ 
  children, 
  disabled = false, 
  onClick, 
  type = 'button',
  variant = 'primary',
  className = ''
}: ButtonProps) {
  const baseClasses = "text-white font-semibold py-3 px-8 rounded-lg text-lg transition-colors hover:cursor-pointer disabled:bg-muted disabled:cursor-not-allowed";

  const variantClasses = {
    primary: "bg-accent hover:bg-accent-hover",
    secondary: "bg-accent-secondary hover:bg-accent-secondary-hover", 
    success: "bg-success-text hover:bg-success-text-secondary"
  };
  
  const allClasses = `${baseClasses} ${variantClasses[variant]} ${className}`;
  
  return (
    <button
      type={type}
      disabled={disabled}
      onClick={onClick}
      className={allClasses}
    >
      {children}
    </button>
  );
} 