interface CalendarEvent {
    title: string;
    description?: string;
    startDate: Date;
    endDate: Date;
    location?: string;
}

export const generateICSFile = (event: CalendarEvent): string => {
    const formatDate = (date: Date): string => {
        return date.toISOString().replace(/[-:]/g, '').split('.')[0] + 'Z';
    };

    const icsContent = [
        'BEGIN:VCALENDAR',
        'VERSION:2.0',
        'CALSCALE:GREGORIAN',
        'METHOD:PUBLISH',
        'BEGIN:VEVENT',
        `DTSTART:${formatDate(event.startDate)}`,
        `DTEND:${formatDate(event.endDate)}`,
        `SUMMARY:${event.title}`,
        event.description ? `DESCRIPTION:${event.description}` : '',
        event.location ? `LOCATION:${event.location}` : '',
        `UID:${new Date().getTime()}@unitrack.com`,
        'END:VEVENT',
        'END:VCALENDAR'
    ].filter(Boolean).join('\r\n');

    return icsContent;
};

export const downloadCalendarEvent = (event: CalendarEvent): void => {
    const icsContent = generateICSFile(event);
    const blob = new Blob([icsContent], { type: 'text/calendar;charset=utf-8' });
    const link = document.createElement('a');
    link.href = window.URL.createObjectURL(blob);
    link.setAttribute('download', `${event.title.replace(/\s+/g, '_')}.ics`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
};

export const createDeadlineEvent = (
    university: string,
    program: string,
    deadline: Date,
    type: string
): CalendarEvent => {
    const reminderDate = new Date(deadline);
    reminderDate.setDate(reminderDate.getDate() - 14); // 2 weeks before

    return {
        title: `${type} Deadline - ${university}`,
        description: `Deadline for ${program} program at ${university}`,
        startDate: reminderDate,
        endDate: deadline,
        location: university
    };
};
