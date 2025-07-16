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
  const baseClasses = "text-white font-semibold py-3 px-8 rounded-lg text-lg transition-colors hover:cursor-pointer disabled:bg-gray-300 disabled:cursor-not-allowed";

  const variantClasses = {
    primary: "bg-blue-500 hover:bg-blue-600",
    secondary: "bg-gray-500 hover:bg-gray-600", 
    success: "bg-green-500 hover:bg-green-600"
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