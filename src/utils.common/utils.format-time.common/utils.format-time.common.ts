import * as moment from 'moment';

export class UtilsDate {
  constructor() {}

  static formatDateTimeVNToString(date: Date): string {
    return moment(date).format('DD/MM/YYYY h:mm');
  }

  static formatDateVNToString(date: Date): string {
    return moment(date).format('DD/MM/YYYY');
  }

  static formatDateInsertDatabase(date: string): string {
    return moment(date, 'DD/MM/YYYY').format('YYYY-MM-DD');
  }

  static formatStringDateToDate(date: string): Date {
    return new Date(this.formatDateInsertDatabase(date));
  }
}
