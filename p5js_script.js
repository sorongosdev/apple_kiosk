let windows;
let currentIndex = 0;
let startX;
let endX;
let offsetX = 0;
let targetOffsetX = 0;
let lerpSpeed = 0.1;
let cardWidth;
let totalWidth;

function setup() {
  createCanvas(400, 400);  // p5.js canvas 생성
  windows = document.querySelectorAll('.window');
  if (windows.length > 0) {
    cardWidth = windows[0].offsetWidth; // 첫 번째 카드의 너비를 가져옴
    totalWidth = cardWidth * windows.length;
  }
  updateCarousel();
}

function draw() {
  offsetX = lerp(offsetX, targetOffsetX, lerpSpeed);
  updateCarousel();
}

function touchStarted() {
  startX = mouseX; // 터치 시작 위치를 mouseX로 대체
  return false;
}

function touchEnded() {
  endX = mouseX; // 터치 종료 위치를 mouseX로 대체
  let swipeDistance = endX - startX;

  if (swipeDistance > 50) {
    // 오른쪽으로 스와이프
    currentIndex = (currentIndex - 1 + windows.length) % windows.length;
  } else if (swipeDistance < -50) {
    // 왼쪽으로 스와이프
    currentIndex = (currentIndex + 1) % windows.length;
  }

  targetOffsetX = currentIndex * cardWidth; // 카드의 너비만큼 이동
  updateIndicators();
  return false;
}

function updateCarousel() {
  windows.forEach((window, index) => {
    let realIndex = (index - currentIndex + windows.length) % windows.length;
    let offset = (realIndex - currentIndex) * cardWidth - offsetX;
    
    if (offset > totalWidth / 2) {
      offset -= totalWidth;
    } else if (offset < -totalWidth / 2) {
      offset += totalWidth;
    }
    
    window.style.position = 'absolute';
    window.style.left = `${offset}px`;
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

function lerp(start, end, amt) {
  return (1 - amt) * start + amt * end;
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
  if (windows.length > 0) {
    cardWidth = windows[0].offsetWidth;
    totalWidth = cardWidth * windows.length;
  }
  targetOffsetX = currentIndex * cardWidth; // 창 크기 변경 시 목표 위치 갱신
}
