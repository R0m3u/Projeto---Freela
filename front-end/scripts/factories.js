import {
  reactive
} from 'https://unpkg.com/petite-vue?module'

export function Form() {
  const data = {
    name: '',
    cell: '',
    info: '',
    consultType: 'online',
    firstConsult: 'yes',
    email: '',
    date: '',
    time: '',
  };
  return {
    data: {
      ...data,
    },
    submit() {
      console.log(JSON.stringify(this.data));
      alert('Seus dados foram enviados, lhe aguardo para nossa consulta!');
      this.reset();
    },
    reset() {
      this.data = {
        ...data,
      };
    },
  };
}

export const form = reactive(Form());

export function Calendar() {
  const today = dayjs();
  return {
    // data
    today,
    selected: today,
    dateContext: dayjs(),
    days: ['Dom', 'Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sab'],

    // computed
    get year() {
      return this.dateContext.format('YYYY');
    },
    get month() {
      return this.dateContext.format('M');
    },
    get currentMonth() {
      return this.dateContext.format('MMMM');
    },
    get daysInMonth() {
      return this.dateContext.daysInMonth();
    },
    get currentDate() {
      return this.dateContext.get('date');
    },
    get firstDayOfMonth() {
      const t = this;
      const firstDay = dayjs(t.dateContext).subtract(
          t?.currentDate - 1,
          'days',
      );
      return firstDay.day();
    },
    get initialDate() {
      return this.today.get('date');
    },
    get initialMonth() {
      return this.today.format('MMMM');
    },
    get initialYear() {
      return this.today.format('YYYY');
    },

    // methods
    addMonth() {
      const t = this;
      t.dateContext = dayjs(t.dateContext).add(1, 'month');
    },
    subtractMonth() {
      const t = this;
      t.dateContext = dayjs(t.dateContext).subtract(1, 'month');
    },
    isToday(day) {
      const {currentMonth, year, initialDate, initialMonth, initialYear} =
        this;
      return (
        day == initialDate &&
        currentMonth == initialMonth &&
        year == initialYear
      );
    },
    isSelected(day) {
      const {selected, month, year} = this;
      const toString = (date) => date.format('DD-MM-YYYY');
      const date = dayjs(`${month}-${day}-${year}`);
      return toString(selected) === toString(date);
    },
    canSelectDate(day) {
      const t = this;
      const {month, year, isToday} = t;
      const date = dayjs(`${month}-${day}-${year}`);
      return date.isAfter(t.today) || isToday(day);
    },
    selectDate(day) {
      const t = this;
      if (!t.canSelectDate(day)) return;
      const {month, year} = t;
      // complete date
      const selected = dayjs(`${month}-${day}-${year}`);
      console.log(JSON.stringify(selected.toString()));
      // complete date | linha que vai colocar dados na instacia
      form.data.date = selected.format('DD / MM / YY');
      t.selected = selected;
      
      
   
    },
  };
}
