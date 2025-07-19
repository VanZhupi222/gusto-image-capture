import Spinner from '../spinner';

interface LoadingProps {
  message?: string;
  size?: 'sm' | 'md' | 'lg';
  color?: 'white' | 'primary' | 'accent';
}

export default function Loading({ 
  message = 'Loading...', 
  size = 'md',
  color = 'primary'
}: LoadingProps) {
  return (
    <div className="flex items-center space-x-3">
      <Spinner size={size} color={color} />
      {message && <span className="text-sm font-medium">{message}</span>}
    </div>
  );
} 