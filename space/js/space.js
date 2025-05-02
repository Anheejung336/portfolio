$(function () {

  // dots-wrapper 처음 스케일 세팅
  gsap.set(".dots-wrapper", { scale: 0 });

  // 하얀색 원 채워지기
  gsap.to(".white-fill", {
    scale: 300,  // 💥 scale 100까지 커짐 (화면 전체 덮을 정도)
    duration: 25,
    ease: "power3.out"
  });

  // 점 두개 퍼지면서 회전
  gsap.to(".dots-wrapper", {
    rotation: 1440,  // 회전
    scale: 3.5,       // 반지름 확장
    duration: 2,
    ease: "power3.out"
  });

  // 텍스트 등장 (기본 opacity 1로 설정해주면 텍스트가 처음부터 보임)
  gsap.to(".text-wrapper", {
    opacity: 1,
    delay: 1,  // 하얀 원 채우고 텍스트 등장 타이밍 설정
    duration: 1,
    ease: "power2.out"
  });

  // 점1 (왼쪽에 있던 점)이 오른쪽으로 이동
  gsap.to(".dot1", {
    left: "50%",
    x: "-50%",    // 정확히 중앙에 오게
    delay: 2,
    duration: 1,
    ease: "power2.inOut"
  });

  // 점2 (오른쪽에 있던 점)이 왼쪽으로 이동
  gsap.to(".dot2", {
    left: "50%",
    x: "-50%",
    delay: 2,
    duration: 1,
    ease: "power2.inOut"
  });
  // 두 mask-wrapper가 점과 함께 나타나면서 텍스트를 지우듯 사라지게
  gsap.to(".mask-wrapper.left", {
    opacity: 1,
    delay: 2, // 점들이 거의 중앙에 왔을 때
    duration: 1,
    ease: "power2.inOut"
  });

  gsap.to(".mask-wrapper.right", {
    opacity: 1,
    delay: 2,
    duration: 1,
    ease: "power2.inOut"
  });

  // 텍스트를 양쪽에서 좁히면서 가리기 (점들이 지나가면서)
  gsap.to(".text-wrapper", {
    clipPath: "inset(0% 50% 0% 50%)",  // 양옆에서부터 가려지며 사라짐
    delay: 2,  // 점 모이는 타이밍에 맞춰
    duration: 1,
    ease: "power2.inOut"
  });

  // 두 점이 점점 작아지면서 사라지게
  gsap.to(".dot1, .dot2", {
    scale: 0,    // 점 크기 0으로 줄어들게
    opacity: 0,  // 점이 사라지게
    delay: 3,  // 점들이 중앙에 오고 텍스트가 사라진 후
    duration: 1.5,
    ease: "power2.out"
  });

  // **보라색 라인 원이 커지는 애니메이션** (배경색은 변경하지 않음)
  gsap.to(".new-fill", {
    scale: 300,  // 💥 scale 100까지 커짐 (화면 전체 덮을 정도)
    duration: 100,  // 시간 설정
    ease: "power2.out",
    delay: 3.5
  });

  // 텍스트 등장 애니메이션 (보라색 라인 원이 커지는 중간에 텍스트가 등장하도록 설정)
  gsap.to(".next-wrapper", {
    opacity: 1,
    delay: 3.7,  // 텍스트가 등장하는 딜레이를 설정 (new-fill이 커지는 중간에 텍스트 등장)
    duration: 1,
    ease: "power2.out"
  });


  // 보라색 화면으로 전환
  gsap.to(".background2", {
    opacity: 1,
    duration: 0.5,
    ease: "power2.out",
    delay: 4.8  // new-fill 애니메이션이 끝난 후 바로 진행
  });

  // .next-wrapper 사라짐
  gsap.to(".next-wrapper", {
    opacity: 0,
    delay: 5, // 화면을 보라색으로 채운 후
    ease: "power2.out"
  });

gsap.registerPlugin(MotionPathPlugin);

const squareTL = gsap.timeline({ delay: 5.3 });  // 💜 background2 끝난 직후

document.querySelectorAll(".square-wrapper").forEach((wrapper, index) => {
  const path = wrapper.querySelector("path");
  const dot = wrapper.querySelector(".dot-mover");

  squareTL.to(dot, {
    opacity: 1,
    duration: 0.3,
    ease: "power1.inOut"
  }, 0);

  squareTL.to(path, {
    strokeDashoffset: 0,
    duration: 3.5,
    ease: "power2.inOut"
  }, 0);

  gsap.set(dot, {
    motionPath: {
      path: path,
      align: path,
      alignOrigin: [0.5, 0.5]
    }
  });

  squareTL.to(dot, {
    motionPath: {
      path: path,
      align: path,
      autoRotate: false,
      alignOrigin: [0.5, 0.5]
    },
    duration: 3.5,
    ease: "power2.inOut"
  }, 0);

  squareTL.to(dot, {
    opacity: 0,
    duration: 0.5,
    ease: "power1.out"
  }, ">0.2");

  const box = document.querySelectorAll(".box")[index];
  const waveWrapper = box.querySelector(".wave-wrapper");
  const water = box.querySelector(".water");
  
  if (waveWrapper && water) {
    // 초기 세팅
    gsap.set(waveWrapper, { y: "100%" }); // 아래에 숨겨둠
    gsap.set(water, { height: "0%" });    // 물도 처음엔 없음
  
    // 타이밍 맞춰 동시에 올라오지만, 위치는 wave가 항상 위에 있음
    squareTL.to(waveWrapper, {
      y: "-1180%",       // 박스 바깥으로 wave 사라지는 위치
      duration: 6,
      ease: "power2.out"
    }, `>0.3+${index * 0.3}`);
  
    squareTL.to(water, {
      height: "100%",
      duration: 6,
      ease: "power2.out"
    }, "<");  // 동시에 시작
  }
  
  

  
});












});