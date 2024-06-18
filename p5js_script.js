  let windows;
  let currentIndex = 0;
  let startX;
  let endX;
  let offsetX = 0;
  let targetOffsetX = 0;
  let lerpSpeed = 0.1;
  
  function setup() {
    noCanvas();
    windows = document.querySelectorAll('.window');
    updateCarousel();
  }
  
  function draw() {
    // 부드러운 전환을 위한 위치 보정
    offsetX = lerp(offsetX, targetOffsetX, lerpSpeed);
    updateCarousel();
  }
  
  function touchStarted() {
    startX = mouseX;
    return false;
  }
  
  function touchEnded() {
    endX = mouseX;
    let swipeDistance = endX - startX;
  
    if (swipeDistance > 50) {
      // 오른쪽으로 스와이프
      currentIndex = max(0, currentIndex - 1);
    } else if (swipeDistance < -50) {
      // 왼쪽으로 스와이프
      currentIndex = min(windows.length - 1, currentIndex + 1);
    }
  
    targetOffsetX = currentIndex * windowWidth;
    updateIndicators();
    return false;
  }
  
  function updateCarousel() {
    windows.forEach((window, index) => {
      let offset = index * windowWidth - offsetX;
      window.style.transform = `translateX(${offset}px)`;
    });
  }
  
  function updateIndicators() {
    const dots = document.querySelectorAll('.dot');
    dots.forEach((dot, index) => {
      if (index === currentIndex) {
        dot.classList.add('active');
      } else {
        dot.classList.remove('active');
      }
    });
  }
  
  document.addEventListener('DOMContentLoaded', () => {
    setup();
    window.addEventListener('touchstart', touchStarted);
    window.addEventListener('touchend', touchEnded);
  });