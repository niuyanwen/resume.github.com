var index = {
    init: function () {
        this.header();
        this.swiper.init();
        var w = document.documentElement.clientWidth;

        if (w > 900) {
            this.canvas();
        }
    },
    canvas: function () {
        var w = document.documentElement.clientWidth,
            h = document.documentElement.clientHeight,
            canvas = document.getElementById('ctx'),
            ctx = canvas.getContext('2d'),
            speed = w > 900 ? 6 : w > 700 ? 4 : 2,
            timer = null;

        canvas.width = w;
        canvas.height = h;

        setInterval(function () {
            if (timer == null) {
                demo();
            }
        }, 1000 / 60);

        var demo = function () {
            var num = 0;
            var X = Math.random() * w;
            ctx.beginPath();
            ctx.moveTo(X, 0);
            ctx.strokeStyle = '#369';
            timer = setInterval(function () {
                if (num > h || X + num > w) {
                    clearInterval(timer);
                    timer = null;
                }
                ctx.lineTo(X + 10 + num, num + 10);
                ctx.stroke();
                ctx.clearRect(0, 0, X + num, num);
                ctx.closePath();
                num += speed;
            }, 1000 / 60)
        };
    },
    headerActive: function (el) {
        $('header li').find('a').removeClass('active');
        $(el).find('a').addClass('active');
        $('header li').find('a i').removeClass('active');
        $(el).find('a i').addClass('active');
    },
    header: function () {
        $('header li').click(function () {
            index.headerActive($(this));
            index.swiper.mySwiper.slideTo($(this).index(), 500, true);
        });
    },
    title: function (el) {
        $(el).find('.title .border').css({transform: 'rotateY(0deg)'});
        setTimeout(function () {
            $(el).find('.title h4').fadeIn(300)
        }, 500);
    },
    swiper: {
        init: function () {
            this.demoTo();
            this.skillTo();
            this.mySwiper = new Swiper('#main', {
                wrapperClass: 'section-main',
                slideClass: 'section-slide',
                direction: 'vertical',
                mousewheelControl: true,
                keyboardControl: true,
                simulateTouch: false,
                onInit: function () {
                    var time = 0;
                    $('header').addClass('header-active');
                    $('.home-main p').each(function () {
                        time += 500;
                        var that = $(this);
                        setTimeout(function () {
                            that.fadeIn(500)
                        }, 2500 + time)
                    })
                },
                onSlideChangeEnd: function (swiper) {
                    if ((swiper.activeIndex == 0)) {
                        index.headerActive($('header li').eq(0));
                    } else if (swiper.activeIndex == 1) {
                        index.title('.skill-main');
                        index.headerActive($('header li').eq(1));
                        setTimeout(function () {
                            $('#skill').css({transform: 'scale(1)'})
                        }, 1600);
                        $('.skill-main').find('>p').addClass('active');

                    } else if (swiper.activeIndex == 2) {
                        index.title('.demo-main');
                        index.headerActive($('header li').eq(2));
                        setTimeout(function () {
                            $('.demo-main').find('#demo').css({transform: 'scale(1)'});
                        }, 800);
                    } else if (swiper.activeIndex == 3) {
                        index.title('.contact-main');
                        index.headerActive($('header li').eq(3));
                        $('.contact-main h3').addClass('active');
                        $('.contact-main h4').addClass('active');
                        $('.contact-main p').each(function () {
                            if ($(this).index() % 2 == 0) {
                                $(this).addClass('active-l');
                            } else {
                                $(this).addClass('active-r');
                            }
                        })
                    }
                }
            });
            this.skillSwiper = new Swiper('#skill', {
                effect: 'coverflow',
                slidesPerView: this.w > 768 ? 4 : 2,
                grabCursor: true,
                centeredSlides: true,
                spaceBetween: 30,
                slidesOffsetBefore: -100,
                coverflow: {
                    rotate: 15,
                    stretch: 10,
                    depth: 60,
                    modifier: 2,
                    slideShadows: true
                }
            });
            this.demoSwiper = new Swiper('#demo', {
                effect: 'coverflow',
                slidesPerView: this.w > 768 ? 4 : 2,
                centeredSlides: true,
                spaceBetween: 30,
                slidesOffsetBefore: -100,
                coverflow: {
                    rotate: 0,
                    stretch: 10,
                    depth: 60,
                    modifier: 2,
                    slideShadows: true
                },
                simulateTouch: false,
                prevButton: '.swiper-button-prev',
                nextButton: '.swiper-button-next'
            });
        },
        skillTo: function () {
            $('#skill .skill-slide').click(function () {
                index.swiper.skillSwiper.slideTo($(this).index(), 300, true);
            });
        },
        demoTo: function () {
            $('#demo .demo-slide').click(function () {
                index.swiper.demoSwiper.slideTo($(this).index(), 300, true);
            });
        },
        w: $(window).width()
    }
};
index.init();