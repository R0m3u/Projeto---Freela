// MUDA CONTEUDO
const buttons = document.querySelectorAll('.btn-container > button');
const lessons = document.querySelector('.free-lesson');
const tools = document.querySelector('.tools-for-service');

window.addEventListener('load', () => {
  tools.style.display = 'none';
});

buttons.forEach((el, i) => {
  el.addEventListener('mouseover', (eMouse) => {
    const rect = el.getBoundingClientRect();
    const position = {
      top: rect.top,
      bottom: rect.left,
    };

    console.log(position.top, position.bottom);
    if (i === 0) {
      lessons.style.display = 'block';
      tools.style.display = 'none';
      lessons.classList.add('showBlock');
      tools.classList.remove('showBlock');
      buttons[0].classList.add('active');
      buttons[1].classList.remove('active');
    } else if (i === 1) {
      tools.style.display = 'block';
      lessons.style.display = 'none';
      lessons.classList.remove('showBlock');
      tools.classList.add('showBlock');
      buttons[1].classList.add('active');
      buttons[0].classList.remove('active');
    }
  });
});

buttons.forEach((el, i) => {
  el.addEventListener('click', () => {
    if (i === 0) {
      lessons.style.display = 'block';
      tools.style.display = 'none';
      lessons.classList.add('showBlock');
      tools.classList.remove('showBlock');
      buttons[0].classList.add('active');
      buttons[1].classList.remove('active');
    } else if (i === 1) {
      tools.style.display = 'block';
      lessons.style.display = 'none';
      lessons.classList.remove('showBlock');
      tools.classList.add('showBlock');
      buttons[0].classList.remove('active');
      buttons[1].classList.add('active');
    }
  });
});


