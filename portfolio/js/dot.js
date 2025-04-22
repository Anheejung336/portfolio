$(function () {

  gsap.registerPlugin(MotionPathPlugin);

  $(window).on("load", function () {
    $("html, body").scrollTop(0);
  });

  if ("scrollRestoration" in history) {
    history.scrollRestoration = "manual";
  }

  const bar = document.getElementById("bar");
  const ball = document.getElementById("ball");
  const intro = document.querySelector(".intro");
  const colors = [
    "#7973F3", "#7973F3", "#7973F3", "#7973F3", "#7973F3", "#7973F3",
    "var(--main-color)", "var(--main-color)", "var(--main-color)", "var(--main-color)",
    "#99D0EF", "#99D0EF", "#99D0EF", "#99D0EF",
    "#C2E4F6", "#C2E4F6", "#C2E4F6"
  ];

  for (let i = 0; i < 17; i++) {
    const span = document.createElement("span");
    bar.appendChild(span);
  }

  const texts = document.querySelectorAll(".text span");
  const spans = document.querySelectorAll(".progress-bar span");

  let bounceCount = 0;
  let textIndex = 0;
  let barIndex = 0;

  function playBounce() {
    bounceCount++;
    ball.classList.remove('bounce-default', 'bounce-final');
    void ball.offsetWidth;

    if (bounceCount < 5) {
      ball.classList.add('bounce-default');
      setTimeout(playBounce, 1300);
    } else {
      ball.classList.add('bounce-final');
    }
  }

  playBounce();

  const textInterval = setInterval(() => {
    texts.forEach(el => el.classList.remove("active"));
    if (texts[textIndex]) {
      texts[textIndex].classList.add("active");
      textIndex++;
    } else {
      clearInterval(textInterval);
    }
  }, 1300);

  const barInterval = setInterval(() => {
    if (spans[barIndex]) {
      spans[barIndex].style.background = colors[barIndex];
      barIndex++;
    } else {
      clearInterval(barInterval);
      clearInterval(textInterval);
      setTimeout(() => {
        document.querySelector('.progress-bar').style.display = "none";
        document.querySelector('.text').style.display = "none";
        spreadDotsFromCenter();
      }, 1300);
    }
  }, 300);

  function spreadDotsFromCenter() {
    const container = document.getElementById("dots-container");
    const totalDots = 8;
    const radius = 340;

    for (let i = 0; i < totalDots; i++) {
      const angle = (2 * Math.PI / totalDots) * i;
      const x = Math.cos(angle) * radius;
      const y = Math.sin(angle) * radius;

      let dot;
      const isCenterDot = i === 0;

      if (isCenterDot) {
        dot = document.getElementById("ball");
      } else {
        dot = document.createElement("div");
        dot.classList.add("dot");
        container.appendChild(dot);
      }

      dot.style.setProperty("--x", `${x}px`);
      dot.style.setProperty("--y", `${y}px`);

      setTimeout(() => {
        dot.classList.add("expand", "to-white");
      }, 3);
    }

    setTimeout(() => {
      intro.classList.add("bg-spread");
      setTimeout(() => {
        container.classList.add("rotate360");
      }, 50);
      setTimeout(() => {
        intro.classList.add("show-text");
        setTimeout(() => {
          intro.classList.add("show-gnb");
          setTimeout(() => {
            intro.classList.add("show-scroll");
          }, 400);
        }, 500);
      }, 600);
    }, 100);

    setTimeout(() => {
      $('.center-text').css({
        opacity: 0,
        transition: 'opacity 0.5s ease'
      });

      setTimeout(() => {
        $('.dot').each(function () {
          $(this).css({
            transition: 'transform 1.2s ease',
            transform: 'translate(-50%, -50%) scale(1)'
          });
          this.style.setProperty("--x", `0px`);
          this.style.setProperty("--y", `0px`);
        });
        $('.intro').addClass('show-next');
      }, 500);
    }, 2000);

    setTimeout(() => {
      const $dotsWrapper = $('.bouncing-dots');
      const $small = $('.dot-small');
      const $large = $('.dot-large');

      $dotsWrapper.css('opacity', 1);
      $small.removeClass('animate-small');
      $large.removeClass('animate-large');
      void $small[0].offsetWidth;
      void $large[0].offsetWidth;
      $small.addClass('animate-small');
      $large.addClass('animate-large');
    }, 3000);

    function startScrollTriggeredMotion() {
      $(".intro").addClass("shrink-text");

      // ✅ 기존 점 중 ball은 위치만 이동 (사라지지 않음)
      gsap.to("#ball", {
        transform: "translate(-50%, -550%)",
        duration: 1.2,
        ease: "power2.out"
      });

      // ✅ 기존 작은 점들과 큰 점은 사라지게 처리

      gsap.to([".dot-small", ".dot-large"], {
        opacity: 0,
        duration: 0.1,
        ease: "power1.out",
        onComplete: () => {
          $(".dot-small, .dot-large").css("visibility", "hidden");
        }
      });

      // ✅ 새 점 초기화
      gsap.set(".dot1, .dot3", {
        opacity: 0,
        x: 0,
        y: 0,
        scale: 1
      });

      // ✅ 좌우로 새 점 두 개 등장
      gsap.to(".dot1", {
        opacity: 1,
        x: -300,
        y: -150,
        width: 53,
        height: 53,
        duration: 1.2,
        ease: "power2.out"
      });

      gsap.to(".dot3", {
        opacity: 1,
        x: 230,
        y: -130,
        width: 20,
        height: 20,
        duration: 1.2,
        ease: "power2.out"
      });
      // ✅ 여기에 자동 텍스트 등장 추가
      gsap.to('#section2 .about-heading', {
        opacity: 1,
        y: 0,
        delay: 0.1,
        duration: 0.1,
        ease: "power2.out"
      });

      gsap.fromTo("#section2 .about-heading", {
        opacity: 0,
        y: 100
      }, {
        opacity: 1,
        y: 0,
        delay: 1.4,
        duration: 1.2,
        ease: "power2.out",
        onComplete: gatherAndRiseMotion // 💥 여기서 트리거
      });

    }

    function gatherAndRiseMotion() {
      // 기존 점들 서서히 사라짐
      gsap.to("#ball, .dot, .dot1, .dot3", {
        opacity: 0,
        duration: 0.3,
        ease: "power2.inOut",
        onComplete: () => {
          $("#ball, .dot, .dot1, .dot3").remove();

          // 새 점 생성
          const $newDot = $('<div class="final-dot"></div>');
          $(".new-dots").append($newDot);

          // 새 점 초기 스타일
          gsap.set(".final-dot", {
            xPercent: 48,
            yPercent: 50,
            left: "48%",
            top: "50%",
            transform: 'translate(-50%, -50%)',
            width: 30,
            height: 30,
            background: "white",
            borderRadius: "50%",
            position: "absolute",
            opacity: 0,
            scale: 0.6,
            zIndex: 20
          });

          // 타임라인: 동시에 위로 → 멈춤 → 옆으로
          const tl = gsap.timeline();

          // 1. 등장
          tl.to(".final-dot", {
            opacity: 1,
            scale: 1,
            duration: 0.05,
            ease: "power2.out"
          });

          // 2. 함께 위로
          tl.to([".final-dot", "#section2 .about-heading"], {
            y: "-=300",
            duration: .8,
            ease: "power2.inOut"
          }, ">");

          // 3. 함께 왼쪽으로 (0.3초 쉬고 나서)
          tl.to([".final-dot", "#section2 .about-heading"], {
            x: "-=500",
            duration: 0.8,
            ease: "power2.inOut"
          }, "+=1");

          // ✅ 왼쪽 이동 후 1초 멈춤
          tl.to({}, { duration: 1 });

          // 점프 1
          tl.to(".final-dot", {
            x: "+=295", y: "-=100", duration: 0.3, ease: "power1.out"
          });
          tl.to(".final-dot", {
            y: "+=100", duration: 0.3, ease: "power1.in",
            onComplete: () => {
              $(".img1").css({
                left: "calc(48% + 295px)",
                opacity: 1
              });
            }
          });

          // 점프 2
          tl.to(".final-dot", {
            x: "+=445", y: "-=100", duration: 0.3, ease: "power1.out"
          });
          tl.to(".final-dot", {
            y: "+=100", duration: 0.3, ease: "power1.in",
            onComplete: () => {
              $(".img2").css({
                left: "calc(48% + 740px)",
                opacity: 1
              });
            }
          });

          // 점프 3
          tl.to(".final-dot", {
            x: "+=362", y: "-=100", duration: 0.3, ease: "power1.out"
          });
          tl.to(".final-dot", {
            y: "+=100", duration: 0.3, ease: "power1.in",
            onComplete: () => {
              $(".img3").css({
                left: "calc(48% + 1102px)",
                opacity: 1
              });
            }
          });


        }
      });
    }




    function resetScrollTriggeredMotion() {
      $(".intro").removeClass("shrink-text");

      gsap.to("#ball", {
        y: 0,
        duration: 1.2,
        ease: "power2.inOut"
      });

      gsap.to([".dot-small", ".dot-large"], {
        opacity: 1,
        duration: 0.6,
        ease: "power2.inOut"
      });

      gsap.to(".dot1, .dot3", {
        opacity: 0,
        x: 0,
        y: 0,
        duration: 0.6,
        ease: "power2.inOut"
      });


    }

    // ✅ Scroll 트리거 연결
    setTimeout(() => {
      $('.intro').addClass('show-next');

      let motionStarted = false;

      window.addEventListener("scroll", function () {
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;

        if (scrollTop > 30) {
          if (!motionStarted) {
            motionStarted = true;
            startScrollTriggeredMotion();
          }
        } else {
          motionStarted = false;
          resetScrollTriggeredMotion();
        }
      });
    }, 3000);



  }
});