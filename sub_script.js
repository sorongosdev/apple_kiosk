document.querySelector(".sub-3nm-btn").addEventListener("click", function () {
  // 텍스트 표시
  const sub_3nm_overlay_txt = this.querySelector(".sub-3nm-overlay-txt");
  sub_3nm_overlay_txt.classList.add("show");

  const sub_3nm_sub_txt = this.querySelector(".sub-3nm-sub-txt");
  const sub_3nm_main_txt = this.querySelector(".sub-3nm-main-txt");

  // 텍스트 숨기기
  sub_3nm_sub_txt.classList.add("hidden");
  sub_3nm_main_txt.classList.add("hidden");

  // 돋보기 숨기기
  const magnify_img = this.querySelector(".magnify-3nm");
  magnify_img.style.display = "none";

  // 배경을 어둡게 만들기
  this.classList.add("darkened");

  // 3초 후 원래 상태로 되돌리기
  setTimeout(() => {
    sub_3nm_overlay_txt.classList.remove("show");
    sub_3nm_sub_txt.classList.remove("hidden");
    sub_3nm_main_txt.classList.remove("hidden");
    magnify_img.style.display = "block";
    this.classList.remove("darkened");
  }, 3000); // 3000ms = 3초
});
