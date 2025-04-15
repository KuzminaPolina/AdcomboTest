import { start_timer } from '../../public/timer.js';
import '../../public/timer.js';
import {Swiper} from "swiper/bundle";
import "swiper/css/bundle";

start_timer("simple_timer");

const initMobileOnlySlider = () => {
  let mobileSlider;
  if (window.matchMedia('(max-width: 767px)').matches) {
    mobileSlider = new Swiper (".swiper", {
      slidesPerView: 1,
      loop: true,
      autoplay: {
        delay: 5000,
      },
      pagination: {
        el: ".swiper-pagination"
      }
    })
  }
  return mobileSlider;
}

initMobileOnlySlider();