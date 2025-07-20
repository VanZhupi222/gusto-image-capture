interface StatusMessageProps {
  type: 'success' | 'warning' | 'error';
  title: string;
  description: string;
}

export default function StatusMessage({ type, title, description }: StatusMessageProps) {
  const styles = {
    success: 'bg-success-bg border-success-border text-success-text',
    warning: 'bg-warning-bg border-warning-border text-warning-text', 
    error: 'bg-error-bg border-error-border text-error-text'
  };

  const descriptionStyles = {
    success: 'text-success-text-secondary',
    warning: 'text-warning-text-secondary',
    error: 'text-error-text-secondary'
  };

  return (
    <div className={`${styles[type]} border rounded-lg p-4`}>
      <p className="font-medium">
        {title}
      </p>
      <p className={`${descriptionStyles[type]} text-sm mt-1`}>
        {description}
      </p>
    </div>
  );
} 