$(function () {

    //클래스 스와이퍼
    let classslide = new Swiper('.cl_slide_wrap', {
        loop: true,
        autoplay: {
            delay: 3000, // 자동 재생 (3초)
            disableOnInteraction: false,
        },
        pagination: {
            el: '.cl_slide_wrap .swiper-pagination',
            clickable: true,
        },
    });

    //키트 스와이퍼

    let kitslide = new Swiper('.kit_slide_wrap', {
        loop: true,
        autoplay: {
            delay: 3000, // 자동 재생 (3초)
            disableOnInteraction: false,
        },
        pagination: {
            el: '.kit_slide_wrap .swiper-pagination',
            clickable: true,
        },
    });

    //NEW 연속 스와이퍼

    const sliderTrack = document.querySelector(".slider-track");

    sliderTrack.addEventListener("mouseenter", () => {
        sliderTrack.style.animationPlayState = "paused";
    });

    sliderTrack.addEventListener("mouseleave", () => {
        sliderTrack.style.animationPlayState = "running";
    });

    //리뷰 스와이퍼

    let reslide = new Swiper('.re_slide_wrap', {
        loop: true,
        autoplay: {
            delay: 3000, // 자동 재생 (3초)
            disableOnInteraction: false,
        },
        pagination: {
            el: '.re_slide_wrap .swiper-pagination',
            clickable: true,
        },
    });

    //nav 스크롤에 따른 변화

    window.addEventListener("scroll", function () {
        const header = document.querySelector(".bar");
        if (window.scrollY > 1650) { // 스크롤이 00px 이상 내려가면
            header.classList.add("scrolled");
        } else {
            header.classList.remove("scrolled");
        }
    });

    //nav_bg 업다운

    $('header nav ul.gnb>li,header nav .nav_bg').hover(function () {
        $('header nav .nav_bg,header nav ul.gnb>li>ul.sub').stop().slideDown();
    }, function () {
        $('header nav .nav_bg,header nav ul.gnb>li>ul.sub').stop().slideUp();
    });

    //서치바 스크롤 조절

    window.addEventListener("scroll", function () {
        const search = document.querySelector(".animated-text");
        if (window.scrollY > 1650) { // 스크롤이 00px 이상 내려가면
            search.classList.add("scrolled");
        } else {
            search.classList.remove("scrolled");
        }
    });

});//ready