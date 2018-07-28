/* common functions
************************************************************/

function getRandom(lower, upper) {
  return Math.random() * (upper - lower) + lower;
}


/* page object
************************************************************/

class Index {

  constructor() {
    this.homeElement = {
      $star: $('.star'),
      $circle: $('.circle'),
      $square: $('.square'),
      $home: $('.home')
    };
    this.q1Element = {
      $q1: $('.q1'),
      $textBlock: $('.q1 .text-block'),
      // bla bla bla...
    };
    this.q2Element = {};
    this.calculatingElement = {};
    this.resultElement = {};
  }

  home() {
    TweenLite.to(this.homeElement.$star, 5, {rotation: 360, ease: Power2.easeOut});
    TweenLite.to(this.homeElement.$circle, 5, {rotation: 360, ease: Power2.easeOut});
    TweenLite.to(this.homeElement.$square, 5, {rotation: -360, ease: Power2.easeOut});

    TweenLite.to(this.homeElement.$circle, 5 / 2, {css: {scale: 1.1}});
    TweenLite.to(this.homeElement.$circle, 5 / 2, {css: {scale: 1}, delay: 5 / 2});

    TweenLite.to(this.homeElement.$square, 1.6, {css: {scale: 7}, ease: Power2.easeOut, delay: 5 - 1});
    TweenLite.to(this.homeElement.$circle, 1.6, {css: {scale: 7}, ease: Power2.easeOut, delay: 5 - 0.7});

    const _this = this;
    TweenLite.to(this.homeElement.$star, 0.6, {
      css: {scale: 7}, ease: Power2.easeOut, delay: 5 - 0.4, onComplete: function () {
        _this.homeElement.$home.remove();
        _this.q1Start();
      }
    });
  }

  q1Start() {
    this.q1Element.$q1.css('background', '#1469FF');
    this.q1Element.$textBlock.animate({opacity: 0}, 500, function () {
      $('.q1 .q-section').animate({opacity: 1}, 500);
    });

    const _this = this;
    $('.q1 .q-section-options').click(function (e) {
      const value = $(e.target).attr('data-value');
      if (!value) return;

      $square.remove();
      $triangle.remove();
      $circle.remove();

      TweenLite.to('.q1 .animate-section', 0.5, {
        css: {left: '0%'}, onComplete: function () {
          $('.q1').remove();
          _this.q2Start();
        }
      });

    });

    const $square = $('.q1 .animate-section-square'); // top: 100
    const $triangle = $('.q1 .animate-section-triangle'); // top: 300
    const $circle = $('.q1 .animate-section-circle'); // bottom: -100

    TweenLite.to('.q1 .animate-section', 1, {css: {left: '60%'}, delay: 1});
    TweenLite.to($square, 2, {css: {top: '100px'}, ease: Power3.easeOut, delay: 2});
    TweenLite.to($triangle, 2, {css: {top: '300px'}, ease: Power2.easeOut, delay: 2});
    TweenLite.to($circle, 2, {css: {bottom: '-100px'}, ease: Power2.easeOut, delay: 2});

    TweenLite.to($square, 4, {rotation: 360, ease: Power3.easeOut, delay: 4});
    TweenLite.to($triangle, 4, {rotation: -360, ease: Power2.easeOut, delay: 4});
    TweenLite.to($circle, 4, {css: {x: '+=20', y: '+=30'}, ease: Power2.easeOut, delay: 4});
  }

  q2Start() {
    $('.q2 .animate-section').css('right', '100%');
    $('.q2 .q-section').animate({opacity: 1}, 500);

    const _this = this;
    $('.q2 .q-section-options').click(function (e) {
      const value = $(e.target).attr('data-value');
      if (!value) return;

      $square.remove();
      $triangle.remove();
      $circle.remove();

      TweenLite.to('.q2 .animate-section', 0.5, {
        css: {right: '0%'}, onComplete: function () {
          $('.q2').remove();
          _this.calculatingStart();
        }
      });
    });

    const $square = $('.q2 .animate-section-square'); // top: 100
    const $triangle = $('.q2 .animate-section-triangle'); // top: 300
    const $circle = $('.q2 .animate-section-circle'); // bottom: -100

    TweenLite.to('.q2 .animate-section', 1, {css: {right: '60%'}, delay: 0.5});
    TweenLite.to($square, 2, {css: {bottom: '200px'}, ease: Power3.easeOut, delay: 2});
    TweenLite.to($triangle, 2, {css: {top: '-50px'}, ease: Power2.easeOut, delay: 2});
    TweenLite.to($circle, 2, {css: {bottom: '200px'}, ease: Power2.easeOut, delay: 2});

    TweenLite.to($square, 4, {rotation: '+=360', ease: Power3.easeOut, delay: 4});
    TweenLite.to($triangle, 4, {rotation: '-=360', ease: Power2.easeOut, delay: 4});
    TweenLite.to($circle, 4, {css: {x: '+=20', y: '+=30'}, ease: Power2.easeOut, delay: 4});
  }

  calculatingStart() {
    $('.calculating').removeClass('hide');
    $('body').css('overflow', 'auto');

    const controller = new ScrollMagic.Controller();

    const total = 50;
    const colors = ['white', 'black', '#0027C8'];
    for (let i = 0; i < total; i++) {
      let size = Math.floor(getRandom(100, 300));
      let color = colors[i % 3];
      $('.calculating').append(`<div class="small-circle small-circle${i}" style="background: ${color}; position: fixed; bottom: -300px; width: ${size}px; height: ${size}px;"></div>`)
    }

    for (let i = 0; i < total; i++) {
      let topP = getRandom(300, 500);
      let leftP = getRandom(1000, 3000);
      new ScrollMagic.Scene({triggerElement: '.trigger' + ((i % 4) + 1), duration: getRandom(500, 2500)})
        .setTween(TweenLite.to($('.small-circle' + i), 10, {css: {top: `-${topP}px`, left: `${leftP}px`}}))
        .addTo(controller);
    }

    const _this = this;
    $(window).scroll(function () {
      if ($(window).scrollTop() >= ($(document).height() - $(window).height())) { // 是否滑到底
        $('.calculating').remove();
        $('.result').removeClass('hide');
        TweenLite.to($('.result'), 1, {
          css: {width: '100vw'}, ease: Power2.easeOut, onComplete: function () {
            _this.resultStart();
          }
        });
      }
    })

  }

  resultStart() {
    const phase1Duration = 2;

    TweenLite.to($('.triangle1'), phase1Duration, {css: {top: '50%'}, ease: Power2.easeOut});
    TweenLite.to($('.triangle2'), phase1Duration, {css: {top: '0'}, ease: Power3.easeOut});
    TweenLite.to($('.triangle3'), phase1Duration, {css: {top: '60%'}, ease: Power1.easeOut});
    TweenLite.to($('.triangle4'), phase1Duration, {css: {top: '20%'}, ease: Power3.easeOut});
    TweenLite.to($('.triangle5'), phase1Duration, {css: {top: '10%'}, ease: Power2.easeOut});
    TweenLite.to($('.triangle6'), phase1Duration, {css: {top: '60%'}, ease: Power1.easeOut});
    TweenLite.to($('.triangle7'), phase1Duration, {css: {top: '45%'}, ease: Power3.easeOut});

    TweenLite.to($('.result-text'), phase1Duration, {css: {opacity: '1'}});
    TweenLite.to($('.result-ans'), phase1Duration, {css: {opacity: '1'}});

    TweenLite.to($('.triangle-blue'), phase1Duration, {css: {bottom: '0'}, ease: Power2.easeOut});
    TweenLite.to($('.triangle-white'), phase1Duration, {css: {bottom: '0'}, ease: Power1.easeOut});
    TweenLite.to($('.triangle-black'), phase1Duration, {css: {bottom: '0'}, ease: Power3.easeOut});

    const phase2Delay = phase1Duration + 0.5;

    // phase2
    TweenLite.to($('.triangle3'), 2, {css: {top: '312px', left: '814px'}, ease: Power3.easeOut, delay: phase2Delay});
    TweenLite.to($('.triangle5'), 2, {css: {top: '230px', left: '814px'}, ease: Power3.easeOut, delay: phase2Delay});
    TweenLite.to($('.triangle7'), 2, {css: {top: '395px', left: '814px'}, ease: Power3.easeOut, delay: phase2Delay});

    TweenLite.to($('.triangle1'), 2, {css: {top: '-200px'}, ease: Power3.easeOut, delay: phase2Delay});
    TweenLite.to($('.triangle2'), 2, {css: {top: '-200px'}, ease: Power3.easeOut, delay: phase2Delay});
    TweenLite.to($('.triangle4'), 2, {css: {top: '-200px'}, ease: Power3.easeOut, delay: phase2Delay});
    TweenLite.to($('.triangle6'), 2, {css: {top: '-200px'}, ease: Power3.easeOut, delay: phase2Delay});

    TweenLite.to($('.triangle-blue'), 2, {css: {bottom: '200px', left: '300px'}, ease: Power3.easeOut, delay: phase2Delay});
    TweenLite.to($('.triangle-white'), 2, {css: {bottom: '360px', left: '326px', rotation: '60deg'}, ease: Power3.easeOut, delay: phase2Delay});
    TweenLite.to($('.triangle-black'), 2, {css: {bottom: '338px', left: '426px', rotation: '30deg'}, ease: Power3.easeOut, delay: phase2Delay});

    TweenLite.to($('.result-text'), 2, {css: {top: '110px', left: '894px'}, ease: Power3.easeOut, delay: phase2Delay});
    TweenLite.to($('.result-ans'), 2, {css: {top: '169', left: '945px'}, ease: Power3.easeOut, delay: phase2Delay});
    TweenLite.to($('.result-result'), 2, {css: {opacity: 1}, ease: Power3.easeOut, delay: phase2Delay})

    TweenLite.to($('.triangle-white'), 4, {css: {rotation: '+=120deg'}, delay: phase2Delay + 1});
    TweenLite.to($('.triangle-black'), 4, {css: {rotation: '-=180deg'}, delay: phase2Delay + 1});
    TweenLite.to($('.triangle-blue'), 4, {css: {x: '+=30', y: '-=20'}, delay: phase2Delay + 1});
  }

}

const index = new Index();
index.home();