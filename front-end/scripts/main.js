(function() {
  // MENU
  const menuBtn = document.querySelector('.hamburguer');
  const menu = document.querySelector('.menu');
  const menuItems = document.querySelector('.menu > ul');
  const overlay = document.querySelector('.overlay');

  menuBtn.addEventListener('click', (e) => {
    menuBtn.classList.toggle('close');

    if (menuBtn.classList.contains('close') === true) {
      menu.classList.remove('menuClose');
      menuItems.classList.add('block');
      menuItems.classList.remove('none');
      overlay.classList.add('openOverlay');
    } else if (menuBtn.classList.contains('close') === false) {
      menu.classList.add('menuClose');
      overlay.classList.remove('openOverlay');
      setTimeout(() => {
        menuItems.classList.remove('block');
        menuItems.classList.add('none');
      }, 400);
    };
  });

  // MUDA CONTEUDO
  const buttons = document.querySelectorAll('.btn-container > button');
  const btnSelected = document.querySelector('.btn-selected');
  const lessons = document.querySelector('.free-lesson');
  const tools = document.querySelector('.tools-for-service');

  window.addEventListener('resize', () => {
    console.log(navigator.userAgent, window.screen.width);
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
        btnSelected.style.left = '60px';
        btnSelected.style.transition = 'all 1s ease';
        lessons.style.display = 'block';
        tools.style.display = 'none';
        buttons[0].classList.add('active');
        buttons[1].classList.remove('active');
      } else if (i === 1) {
        btnSelected.style.left = '510px';
        btnSelected.style.transition = 'all 1s ease';
        tools.style.display = 'block';
        lessons.style.display = 'none';
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
        buttons[0].classList.add('active');
        buttons[1].classList.remove('active');
      } else if (i === 1) {
        tools.style.display = 'block';
        lessons.style.display = 'none';
        buttons[0].classList.remove('active');
        buttons[1].classList.add('active');
      }
    });
  });
})();

/*
ver depois mais obre o eslint
*/
