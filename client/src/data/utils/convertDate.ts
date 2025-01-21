import { parseISO, formatISO, format, formatDistance } from 'date-fns';
import { formatInTimeZone } from 'date-fns-tz';
import { ptBR } from 'date-fns/locale';

export function convertDate(date: string) {
    const brazilTimeZone = 'America/Sao_Paulo';
    const zonedDate = formatInTimeZone(date, brazilTimeZone, 'yyyy-MM-dd\'T\'HH:mm:ss.SSSXXX');
    return format(new Date(zonedDate), 'd MMM yyyy', { locale: ptBR });
}

export function convertInputDate(date: string, time: string) {
    const newDate = parseISO( `${date}T${time}`);
    return formatISO(newDate);
}

export function dateTimezone( ) {
    const brazilTime = formatInTimeZone(Date.now(), 'America/Sao_Paulo', 'yyyy-MM-dd HH:mm:ssXXX')
    return brazilTime;
}

export function dateDistance (first: string | number, second: string | number) {
    const distance = formatDistance(first, second, {addSuffix: true, locale: ptBR});
    return distance;
}

export function dateHour (date: string | number) {
    const brazilTimeZone = 'America/Sao_Paulo';
    const zonedDate = formatInTimeZone(date, brazilTimeZone, 'yyyy-MM-dd\'T\'HH:mm:ss.SSSXXX');
    return format(new Date(zonedDate), 'HH:mm', { locale: ptBR });
} 