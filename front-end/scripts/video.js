const video=document.querySelectorAll('video'); const control=document.querySelectorAll('.control'); const progress=document.querySelectorAll('.progress-bar'); const purpleBar=document.querySelectorAll('.purple-bar'); const volumeBox=document.querySelectorAll('.volume-box'); const volume=document.querySelectorAll('.volume'); const mute=document.querySelectorAll('.mute'); const expand=document.querySelectorAll('.full_screen'); const play=(e, o)=>{
  e[o].play().then((()=>{
    console.log('deu certo');
  })).catch(((e)=>console.log(e)));
}; control.forEach(((e, o)=>{
  e.addEventListener('click', (()=>{
video[o].paused?(e.src='/assets/imgs/pause.png', play(video, o), video[o].addEventListener('mouseout', (()=>{
  e.style.display='none';
})), video[o].addEventListener('mouseover', (()=>{
  e.style.display='block';
})), e.addEventListener('mouseover', (()=>{
  e.style.display='block';
}))):(e.src='/assets/imgs/play.png', video[o].pause(), video[o].addEventListener('mouseout', (()=>{
  e.style.display='block';
})), e.style.display='block');
  }));
})), video.forEach(((e, o)=>{
  e.addEventListener('click', (()=>{
e.paused?(play(video, o), control[o].src='/assets/imgs/pause.png', e.addEventListener('mouseout', (()=>{
  control[o].style.display='none';
})), e.addEventListener('mouseover', (()=>{
  control[o].style.display='block';
})), control[o].addEventListener('mouseover', (()=>{
  control[o].style.display='block';
}))):(e.pause(), control[o].src='/assets/imgs/play.png', e.addEventListener('mouseout', (()=>{
  control[o].style.display='block';
})));
  })), e.addEventListener('timeupdate', ((t)=>{
    const s=e.currentTime/e.duration; purpleBar[o].style.width=100*s+'%';
  }));
})), progress.forEach(((e, o)=>{
  e.addEventListener('click', ((t)=>{
    t=t.offsetX/e.offsetWidth*video[o].duration, video[o].currentTime=t;
  }));
})), volume.forEach(((e, o)=>{
  e.value=100, e.addEventListener('mousemove', ((e)=>{
    e=e.target.value/100, (video[o].volume=e)<=0?mute[o].src='/assets/imgs/volume-mute.png':0<e&&(mute[o].src='/assets/imgs/aumentar-o-volume.png');
  }));
})); const rangeInputs=document.querySelectorAll('input[type="range"]'); const handleInputChange=(e)=>{
  const o=e.target; const t=o.min; const s=o.max; e=o.value; o.style.backgroundSize=100*(e-t)/(s-t)+'% 100%';
}; rangeInputs.forEach(((e)=>{
  e.addEventListener('input', handleInputChange);
})), mute.forEach(((e, o)=>{
  e.addEventListener('click', ((t)=>{
0!==video[o].volume?(video[o].volume=0, volume[o].value=0, e.src='/assets/imgs/volume-mute.png', rangeInputs[o].style.backgroundSize='0%'):(video[o].volume=1, volume[o].value=100, e.src='/assets/imgs/aumentar-o-volume.png', rangeInputs[o].style.backgroundSize='100%');
  }));
})), volumeBox.forEach(((e, o)=>{
  e.addEventListener('mouseover', ((e)=>{
    volume[o].style.left='25px', volume[o].style.transition='all ease .3s';
  })), e.addEventListener('mouseout', (()=>{
    volume[o].style.left='-110px', volume[o].style.transition='all ease .3s';
  }));
})), expand.forEach(((e, o)=>{
  e.addEventListener('click', (()=>{
    console.log('expanded'), video[o].requestFullscreen();
  }));
}));
