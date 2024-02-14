$(window).on('load', function(){
    $('.slick-carousel').slick({
        arrows: true,
        dots: true,
        infinite: false,
        centerMode: true,
        fade: true,
        nextArrow: '<button type="button" class="slick-next"> &gt; </button>',
        prevArrow: '<button type="button" class="slick-prev">&lt;</button>',
      });
})