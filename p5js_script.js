let sketch = function(p) {
  let windows;
  let currentIndex = 0;
  let startX;
  let endX;
  let offsetX = 0;
  let targetOffsetX = 0;
  let lerpSpeed = 0.05; // 더 부드러운 애니메이션을 위해 속도 조정
  let cardWidth;
  let totalWidth;
  let cloneFirst, cloneLast;
  let isTransitioning = false;

  p.setup = function() {
    p.noCanvas();
    windows = document.querySelectorAll('.window');
    if (windows.length > 0) {
      cardWidth = windows[0].offsetWidth;
      totalWidth = cardWidth * (windows.length + 2); // Adjusted for clones

      // 클론을 만들어서 양쪽에 붙임
      cloneFirst = windows[0].cloneNode(true);
      cloneLast = windows[windows.length - 1].cloneNode(true);
      cloneFirst.classList.add('clone');
      cloneLast.classList.add('clone');
      windows[0].parentNode.appendChild(cloneFirst);
      windows[0].parentNode.insertBefore(cloneLast, windows[0]);

      windows = document.querySelectorAll('.window'); // Update the windows list to include clones
      currentIndex = 1; // Adjust starting index for the clone
      offsetX = targetOffsetX = currentIndex * cardWidth;
    }
    updateCarousel();
  }

  p.draw = function() {
    offsetX = p.lerp(offsetX, targetOffsetX, lerpSpeed);
    updateCarousel();
    console.log("Current Index: " + currentIndex);
  }

  p.touchStarted = function() {
    if (p.touches.length > 0) {
      startX = p.touches[0].x;
    } else {
      startX = p.mouseX;
    }
    return false;
  }

  p.touchEnded = function() {
    if (p.touches.length > 0) {
      endX = p.touches[0].x;
    } else {
      endX = p.mouseX;
    }
    let swipeDistance = endX - startX;

    if (swipeDistance > 50) {
      // 오른쪽으로 스와이프
      currentIndex = currentIndex - 1;
    } else if (swipeDistance < -50) {
      // 왼쪽으로 스와이프
      currentIndex = currentIndex + 1;
    }

    targetOffsetX = currentIndex * cardWidth;
    updateIndicators();
    checkInfiniteScroll();
    return false;
  }

  function updateCarousel() {
    windows.forEach((window, index) => {
      let offset = index * cardWidth - offsetX;
      window.style.transform = `translateX(${offset}px)`;
    });
  }

  function updateIndicators() {
    const dots = document.querySelectorAll('.dot');
    dots.forEach((dot, index) => {
      if (index === (currentIndex - 1 + windows.length - 2) % (windows.length - 2)) {
        dot.classList.add('active');
      } else {
        dot.classList.remove('active');
      }
    });
  }

  function checkInfiniteScroll() {
    if (currentIndex === 0) {
      isTransitioning = true;
      currentIndex = windows.length - 2;
      targetOffsetX = currentIndex * cardWidth;
      setTimeout(() => {
        offsetX = targetOffsetX = currentIndex * cardWidth;
        isTransitioning = false;
      }, 600); // 600ms로 수정
    } else if (currentIndex === windows.length - 1) {
      isTransitioning = true;
      currentIndex = 1;
      targetOffsetX = currentIndex * cardWidth;
      setTimeout(() => {
        offsetX = targetOffsetX = currentIndex * cardWidth;
        isTransitioning = false;
      }, 400); // 600ms로 수정
    }
  }

  p.windowResized = function() {
    if (windows.length > 0) {
      cardWidth = windows[0].offsetWidth;
      totalWidth = cardWidth * windows.length;
      targetOffsetX = currentIndex * cardWidth;
    }
  }

  p.lerp = function(start, end, amt) {
    return (1 - amt) * start + amt * end;
  }
}

new p5(sketch, 'sketch');
