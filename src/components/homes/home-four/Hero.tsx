"use client";
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, EffectFade } from 'swiper/modules';
import InjectableSvg from "@/components/common/InjectableSvg";
import Link from "next/link";

interface DataType {
   id: number;
   img: string;
   sub_title: string;
   title: string;
   desc: JSX.Element;
}

const hero_data: DataType[] = [
   {
      id: 1,
      img: "/assets/img/slider/h4_slider_bg01.jpg",
      sub_title: "Fastest & Secure Logistics",
      title: "Unified in Motion, Delivering with Precision",
      desc: (<>Whether it is large-scale freight or last-mile drop-offs, Unified Moving Master ensures dependable service, professional handling, and cohesive logistics throughout the journey.</>),
   },
   {
      id: 2,
      img: "/assets/img/slider/h4_slider_bg02.jpg",
      sub_title: "Fastest & Secure Logistics",
      title: "Ontario’s Trusted Logistics Partner",
      desc: (<>From freight solutions to final-mile delivery, Unified Moving Master brings reliability,
expertise, and unity to every shipment.</>),
   },
];

const Hero = () => {
   return (
      <section className="slider__area">
         <Swiper
            spaceBetween={0}
            loop={true}
            autoplay={{ delay: 10000 }}
            modules={[EffectFade, Autoplay]}
            className="swiper-container slider__active-two"
            effect="fade"   >
            {hero_data.map((item) => (
               <SwiperSlide key={item.id} className="slider__single-two">
                  <div className="slider__bg-two" style={{ backgroundImage: `url(${item.img})` }}></div>
                  <div className="container">
                     <div className="row">
                        <div className="col-lg-6">
                           <div className="slider__content-two">
                              <span className="sub-title">{item.sub_title}</span>
                              <h2 className="title">{item.title}</h2>
                              <p>{item.desc}</p>
                              <div className="slider__btn-wrap">
                                 <Link href="/contact" className="btn">Contact Us <InjectableSvg src="/assets/img/icon/right_arrow.svg" alt="" className="injectable" /></Link>
                                 <Link href="/services" className="btn border-btn">Our Dedicated Services <InjectableSvg src="/assets/img/icon/right_arrow.svg" alt="" className="injectable" /></Link>
                              </div>
                           </div>
                        </div>
                     </div>
                  </div>
               </SwiperSlide>
            ))}
         </Swiper>
      </section>
   )
}

export default Hero
