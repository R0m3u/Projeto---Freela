const days = ['domingo', 'segunda', 'terça',
  'quarta', 'quinta', 'sexta', 'sábado'];
const months = ['janeiro', 'fevereiro', 'março', 'abril', 'maio', 'junho',
  'julho', 'agosto', 'setembro', 'outrubro', 'novembro', 'dezembro'];
const day = document.querySelectorAll('.week-days > span');
const daysContainer = document.querySelector('.days');

// const date = new Date();
// const month = date.getMonth();
// const year = date.getFullYear();
// const daysInMonth = new Date(year, month, 0).getDate();

const getMonthDays = (year, month) => {
  return new Date(year, month, 0 ).getDate();
};

console.log(getMonthDays(2022, 10));

const isLeapYear = (year) => {
  return (year % 4 === 0 && year % 100 !== 0 && year % 400 !== 0) ||
          (year % 100 === 0 && year % 400 ===0);
};

const getFebDays = (year) => {
  return isLeapYear(year) ? 29 : 28;
};

// for (let i = 1; i <= getMonthDays(2022, 1); i++) {
//   daysContainer.innerHTML += `<p>${i}</p>`;
// }

// vai para o proximo mes
// function nextDate () {
//     month += 1;
//     if(month > 11) {
//         month = 0;
//     }

//     console.log(months[month]);
// }
// vai para o proximo mes


// temp
day.forEach((d) => {
  d.addEventListener('click', (e) => {
    day.forEach((d) => {
      d.classList.remove('selected');
      e.target.classList.add('selected');
    });
  });
});
// temp
