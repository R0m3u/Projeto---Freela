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
  // const btnSelected = document.querySelector('.btn-selected');
  // const EffectToRight = {left: '510px'};
  // const EffectToleft = {left: '60px'};
  // const EffectDuration = {duration: 1000, iteration: 2};


  const MouseOverIsTruted =
  buttons[0].addEventListener('mouseover', (event) => {
    if (event) return event;
    // else return event.;
  });

  console.log(MouseOverIsTruted);

  // buttons.forEach((el, i) => {
  //   el.addEventListener('mouseover', (eMouse) => {
  //     console.log(i);

  //     if (i === 0) {
  //       btnSelected.style.left = '60px';
  //       btnSelected.style.transition = 'all 1s ease';
  //     } else if (i === 1) {
  //       btnSelected.style.left = '510px';
  //       btnSelected.style.transition = 'all 1s ease';
  //     }
  //   });

  //   el.addEventListener('mouseout', (e) => {
  //     if (i === 1) {
  //       btnSelected.style.left = '60px';
  //       btnSelected.style.transition = 'all 1s ease';
  //     } else if (i === 0) {
  //       btnSelected.style.left = '510px';
  //       btnSelected.style.transition = 'all 1s ease';
  //     }
  //   });


  // el.addEventListener('mouseout', () => {
  //   btnSelected.style.left = '60px';
  //   btnSelected.style.transition = 'all 1s ease';
  // });
  // el.addEventListener('click', (eventClick) => {
  //   if (i === 0) {
  //     btnSelected.style.left = '60px';
  //     console.log(`selectd:${i}`);
  //   } else if (i === 1) {
  //     btnSelected.style.left = '510px';
  //     btnSelected.style.transition = 'all 1s ease';
  //     console.log(`selectd:${i}`);
  //   }


  //   el.addEventListener('mouseover', (eventMouse) => {
  //     if(eventMouse.isTrusted === true && eventClick.isTrusted === false)
  //   });
  // });
})();

/*
ver depois mais obre o eslint
*/
