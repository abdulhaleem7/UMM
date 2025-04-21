"use client";
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, EffectFade } from 'swiper/modules';
import InjectableSvg from "@/components/common/InjectableSvg"
import Image from "next/image";
import Link from "next/link"

import shape from "@/assets/img/slider/slider_shape.svg"

interface DataType {
   id: number;
   img: string;
   title: string;
   desc: JSX.Element;
}

const hero_data: DataType[] = [
   {
      id: 1,
      img: "/assets/img/slider/slider_bg01.jpg",
      title: "Logistics & Cargo For Pro Business",
      desc: (<>when an unknown printer took a galley of type and company need scra make it better future to make attempt type specimen.</>)
   },
   {
      id: 2,
      img: "/assets/img/slider/slider_bg02.jpg",
      title: "We Deliver your Product Anywhere!",
      desc: (<>when an unknown printer took a galley of type and company need scra make it better future to make attempt type specimen.</>)
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
            className="slider__active"
            effect="fade"   >
            {hero_data.map((item) => (
               <SwiperSlide key={item.id} className=" slider__single">
                  <div className="slider__bg" style={{ backgroundImage: `url(${item.img})` }}></div>
                  <div className="container">
                     <div className="slider__content">
                        <div className="row">
                           <div className="col-lg-6">
                              <h2 className="title">Logistics & Cargo For Pro Business</h2>
                              <p>when an unknown printer took a galley of type and company need scra make it better future to make attempt type specimen.</p>
                              <Link href="/services" className="btn border-btn">Explore Our Services <InjectableSvg src="/assets/img/icon/right_arrow.svg" alt="" className="injectable" /></Link>
                           </div>
                        </div>
                     </div>
                  </div>
                  <Image src={shape} alt="shape" className="shape" />
               </SwiperSlide>
            ))}
         </Swiper>
      </section>
   )
}

export default Hero
