(function () {

    // MENU
    let menuBtn = document.querySelector(".hamburguer");
    let menu = document.querySelector(".menu");
    let menuItems = document.querySelector(".menu > ul");
    let overlay = document.querySelector(".overlay");


    menuBtn.addEventListener("click", e => {
        menuBtn.classList.toggle("close");

        if(menuBtn.classList.contains("close") === true) {
            console.log("fechado");
            menu.classList.remove("menuClose");
            menuItems.classList.add("block");
            menuItems.classList.remove("none");
            overlay.classList.add("openOverlay");
        }

        else if(menuBtn.classList.contains("close") === false) {
            console.log("aberto");
            menu.classList.add("menuClose");
            overlay.classList.remove("openOverlay");
            setTimeout(() => {
                menuItems.classList.remove("block");
                menuItems.classList.add("none");
            }, 400)
        };

        
    });

    //VIDEO PLAYER
    let video = document.querySelectorAll("video");
    let play_pause = document.querySelectorAll(".control");
    let pause = document.querySelectorAll(".pause");
    
    play_pause.forEach((el, key) => {
        el.addEventListener("click", () => {
           if(el.classList.contains("play")) {
                el.classList.remove("play");
                el.classList.add("pause");
                el.src = "/assets/imgs/pause.png";
                video[key].play();
                updateTime(video[key], key);
                
           }

           else {
                el.classList.remove("pause");
                el.classList.add("play");
                el.src = "/assets/imgs/play.png";
                video[key].pause();
           }
        });
    });  

    function updateTime(video, i) {
        video.addEventListener("timeupdate", () => {
            let progress = document.querySelectorAll(".purple-bar");
            let barPos = video.currentTime / video.duration;

            progress[i].style.width = barPos * 100 + "%";
       });
    }

    function expandvideo() {
        let expand = document.querySelectorAll(".full_screen");
        let popup = document.querySelector(".video-popup");
        let close = document.querySelector(".close-popup");
        expand.forEach((el) => {
            el.addEventListener("click", () => {
                popup.classList.add("block");
                popup.classList.remove("none");
                if(video.pause()) video.play();
            });
        })

        close.addEventListener("click", (event) => {
            popup.classList.add("none");
            popup.classList.remove("block");
            if(video.play()) video.pause();
        });
    }

    expandvideo();


})();

