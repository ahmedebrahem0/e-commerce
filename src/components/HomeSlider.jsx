import React from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import img1 from "../../src/assets/images/blog-img-1.jpeg";
import img2 from "../../src/assets/images/blog-img-2.jpeg";
import img3 from "../../src/assets/images/slider-image-1.jpeg";
import img4 from "../../src/assets/images/slider-image-2.jpeg";
import img5 from "../../src/assets/images/slider-image-3.jpeg";
import img6 from "../../src/assets/images/slider-2.jpeg";
// import "./styles.css"; // استيراد ملف الـ CSS

export default function HomeSlider() {
  var settings = {
    dots: true, // عرض نقاط الترقيم
    infinite: true, // تكرار الشرائح بشكل لا نهائي
    speed: 500, // سرعة الانتقال بين الشرائح (بالمللي ثانية)
    slidesToShow: 1, // عدد الشرائح المعروضة في نفس الوقت
    slidesToScroll: 1, // عدد الشرائح التي يتم التمرير إليها
    arrows: false, // إخفاء أسهم التنقل
    autoplay: true, // تفعيل التشغيل التلقائي
    autoplaySpeed: 3000, // الفترة الزمنية بين الشرائح (بالمللي ثانية)
    fade: false, // تعطيل تأثير التلاشي
    cssEase: "cubic-bezier(0.4, 0, 0.2, 1)", // تحسين الانتقال
  };

  return (
    <div className="slider-container">
      <Slider {...settings}>
        <div>
          <img src={img5} className="h-80 w-full rounded-md" alt="" />
        </div>
        <div>
          <img src={img1} className="h-80 w-full rounded-md" alt="" />
        </div>
        <div>
          <img src={img3} className="h-80 w-full rounded-md" alt="" />
        </div>
        <div>
          <img src={img4} className="h-80 w-full rounded-md" alt="" />
        </div>
        <div>
          <img src={img2} className="h-80 w-full rounded-md" alt="" />
        </div>
        <div>
          <img src={img6} className="h-80 w-full rounded-md" alt="" />
        </div>
      </Slider>
    </div>
  );
}
