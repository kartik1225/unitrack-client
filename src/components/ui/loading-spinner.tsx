import { cn } from "@/lib/utils";

interface LoadingSpinnerProps {
    size?: 'sm' | 'md' | 'lg';
    className?: string;
}

export const LoadingSpinner: React.FC<LoadingSpinnerProps> = ({
                                                                  size = 'md',
                                                                  className
                                                              }) => {
    const sizeClasses = {
        sm: 'h-4 w-4',
        md: 'h-8 w-8',
        lg: 'h-12 w-12'
    };

    return (
        <div className="flex items-center justify-center w-full h-full min-h-[200px]">
            <div
                className={cn(
                    "animate-spin rounded-full border-4 border-primary border-t-transparent",
                    sizeClasses[size],
                    className
                )}
            />
        </div>
    );
};