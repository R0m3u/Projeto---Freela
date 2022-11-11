!function() {
  const e=document.querySelector('.hamburguer'); const s=document.querySelector('.menu'); const l=document.querySelector('.menu > ul'); const c=document.querySelector('.overlay'); e.addEventListener('click', (o)=>{
    e.classList.toggle('close'), !0===e.classList.contains('close')?(s.classList.remove('menuClose'), l.classList.add('block'), l.classList.remove('none'), c.classList.add('openOverlay')):!1===e.classList.contains('close')&&(s.classList.add('menuClose'), c.classList.remove('openOverlay'), setTimeout(()=>{
      l.classList.remove('block'), l.classList.add('none');
    }, 400));
  });
}();
