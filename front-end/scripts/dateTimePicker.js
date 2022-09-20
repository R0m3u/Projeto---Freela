const days = ["domingo", "segunda", "terça", "quarta", "quinta", "sexta", "sábado"];
const months = ["janeiro", "fevereiro", "março", "abril", "maio", "junho", "julho", "agosto", "setembro", "outrubro", "novembro", "dezembro"];
const day = document.querySelectorAll(".week-days > span");
let days_container = document.querySelector(".days");


let total = (year, month) => {
    return new Date(year, month, 0).getDate();
}

for(let i = 1; i <= 30; i++) {
    days_container.innerHTML += `<p>${i}</p>`;
}

//vai para o proximo mes
// function nextDate () {
//     month += 1;
//     if(month > 11) {
//         month = 0;
//     }

//     console.log(months[month]);
// }
//vai para o proximo mes



// temp
day.forEach(d => {
    d.addEventListener("click", e => {
        day.forEach(d => {
            d.classList.remove("selected");
            e.target.classList.add("selected");
        })
    });
});
//temp
