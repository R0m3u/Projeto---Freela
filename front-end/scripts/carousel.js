$('.cards').owlCarousel({
  stagePadding: 60,
  loop:false,
  margin: 0,
  dots: false,
  navText: ["<img src='./assets/imgs/preview.png'>", "<img src='./assets/imgs/next.png'>"],
  responsive:{
      0:{
          items:1,
          margin: 100,
          nav: false
      },
      600:{
          items:1,
          nav: false
      },
      1000:{
          items:3,
          dots: false,
          margin: 100,
          nav:true,
      }
  }
});

$('.events').owlCarousel({
    stagePadding: 60,
    loop:false,
    margin: 30,
    navText: ["<img src='/assets/imgs/preview.png'>", "<img src='/assets/imgs/next.png'>"],
    items: 1,
    dots: false,
    responsive: {
        0: {
            nav: false,
            margin: 60

        },

        920: {
            nav: true,
        }
    }
    
  });