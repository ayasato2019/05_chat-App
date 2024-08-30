"use strict";

export default function fadein() {
  window.addEventListener('scroll', function(){
    const scroll = window.scrollY;
    const windowHeight = window.innerHeight;
    const boxes = document.querySelectorAll('.fade-in');
  
    boxes.forEach(function(box) {
      const distanceToBox = box.offsetTop;
      if(scroll + windowHeight > distanceToBox) {
        box.classList.add('fade-active');
      }
    });
  });
}
