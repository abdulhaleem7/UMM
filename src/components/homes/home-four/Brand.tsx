"use client"
import Image, { StaticImageData } from "next/image"
import { Swiper, SwiperSlide } from 'swiper/react';

import brand_1 from "@/assets/img/brand/brand_img01.png"
import brand_2 from "@/assets/img/brand/brand_img02.png"
import brand_3 from "@/assets/img/brand/brand_img03.png"
import brand_4 from "@/assets/img/brand/brand_img04.png"
import brand_5 from "@/assets/img/brand/brand_img05.png"
import brand_6 from "@/assets/img/brand/brand_img06.png"

const brand_data: StaticImageData[] = [brand_1, brand_2, brand_3, brand_4, brand_5, brand_6, brand_4];

const setting = {
   slidesPerView: 6,
   spaceBetween: 30,
   observer: true,
   observeParents: true,
   loop: true,
   breakpoints: {
      '1200': {
         slidesPerView: 6,
      },
      '992': {
         slidesPerView: 5,
      },
      '768': {
         slidesPerView: 4,
      },
      '576': {
         slidesPerView: 3,
      },
      '0': {
         slidesPerView: 2,
      },
   },
}

interface PropsType {
   style?: boolean;
}

const Brand = ({ style }: PropsType) => {
   return (
      <div className={`${style ? "brand__area-two" : "brand__area"}`}>
         <div className="container">
            <Swiper {...setting} className="brand-active fix">
               {brand_data.map((brand, i) => (
                  <SwiperSlide key={i}>
                     <div className="brand__item">
                        <Image src={brand} alt="img" />
                     </div>
                  </SwiperSlide>
               ))}
            </Swiper>
         </div>
      </div>
   )
}

export default Brand
