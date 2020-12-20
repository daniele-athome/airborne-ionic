import * as dayjs from 'dayjs';

export function parseDateISO(date: string): dayjs.Dayjs {
    return dayjs(date);
}

export function formatDateISO(date: Date): string {
    return formatDateCustom(date, 'YYYY-MM-DD');
}

export function formatDateTimeISO(date: Date, time: string): string {
    return joinDateTime(date, time).format('YYYY-MM-DD[T]HH:mm:ssZ');
}

export function formatDateCustom(date: Date, format: string): string {
    return dayjs(date).format(format);
}

// FIXME not really dynamic
export function formatDateGoogleItalian(date: Date): string {
    return dayjs(date).format('DD/MM/YYYY');
}

// FIXME not really dynamic
export function formatDateTimeGoogleItalian(date: Date): string {
    return dayjs(date).format('DD/MM/YYYY HH.mm.ss');
}

export function joinDateTime(date: Date, time: string): dayjs.Dayjs {
    return dayjs(formatDateCustom(date, 'YYYY-MM-DD') + time, 'YYYY-MM-DDHH:mm').local();
}

/** @see https://stackoverflow.com/a/57184486/1045199 */
export function xlSerialToDate(serialDate) {
    return new Date(-2209075200000 + (serialDate - (serialDate < 61 ? 0 : 1)) * 86400000);
}
