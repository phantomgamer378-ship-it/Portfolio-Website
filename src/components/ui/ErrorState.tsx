import { AlertTriangle, RefreshCcw } from 'lucide-react';
import { Button, ButtonLink } from './Button';

interface ErrorStateProps {
  message: string;
  onRetry?: () => void;
  profileUrl?: string;
  platformName?: string;
}

export const ErrorState = ({ message, onRetry, profileUrl, platformName }: ErrorStateProps) => {
  return (
    <div className="flex flex-col items-center justify-center p-8 border border-border/50 rounded-sm bg-card/30 text-center">
      <div className="w-12 h-12 rounded-full bg-accent/10 flex items-center justify-center mb-4">
        <AlertTriangle className="w-6 h-6 text-accent" />
      </div>
      <h3 className="text-lg font-sans font-medium text-foreground mb-2">
        {platformName ? `${platformName} activity is temporarily unavailable.` : 'Data is temporarily unavailable.'}
      </h3>
      <p className="text-sm font-mono text-muted max-w-md mb-6 text-balance">
        {message}
      </p>
      
      <div className="flex items-center gap-4">
        {onRetry && (
          <Button variant="primary" size="sm" onClick={onRetry}>
            <RefreshCcw className="w-4 h-4 mr-2" />
            Retry
          </Button>
        )}
        {profileUrl && (
          <ButtonLink href={profileUrl} target="_blank" variant="outline" size="sm">View Profile</ButtonLink>
        )}
      </div>
    </div>
  );
};
