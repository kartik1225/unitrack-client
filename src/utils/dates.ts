import { format, formatDistance, isBefore, isAfter, addDays } from 'date-fns';

export const formatDate = (date: Date): string => {
    return format(date, 'MMM dd, yyyy');
};

export const formatDateTime = (date: Date): string => {
    return format(date, 'MMM dd, yyyy HH:mm');
};

export const getRelativeTime = (date: Date): string => {
    return formatDistance(date, new Date(), { addSuffix: true });
};

export const isDeadlineApproaching = (deadline: Date, warningDays: number = 14): boolean => {
    const warningDate = addDays(new Date(), warningDays);
    return isBefore(deadline, warningDate) && isAfter(deadline, new Date());
};

export const getDeadlineStatus = (deadline: Date): 'upcoming' | 'approaching' | 'overdue' => {
    if (isBefore(deadline, new Date())) {
        return 'overdue';
    }
    if (isDeadlineApproaching(deadline)) {
        return 'approaching';
    }
    return 'upcoming';
};

export const sortByDate = <T extends { deadline: Date }>(
    items: T[],
    order: 'asc' | 'desc' = 'asc'
): T[] => {
    return [...items].sort((a, b) => {
        const comparison = a.deadline.getTime() - b.deadline.getTime();
        return order === 'asc' ? comparison : -comparison;
    });
};
