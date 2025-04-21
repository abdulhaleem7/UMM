"use client"
import { Swiper, SwiperSlide } from 'swiper/react';
import InjectableSvg from "@/components/common/InjectableSvg";
import Image, { StaticImageData } from "next/image";
import Link from "next/link";
import { Pagination } from 'swiper/modules';

import project_1 from "@/assets/img/project/project_img01.jpg"
import project_2 from "@/assets/img/project/project_img02.jpg"
import project_3 from "@/assets/img/project/project_img03.jpg"

interface DataType {
   id: number;
   img: StaticImageData;
   title: string;
   tag: string;
}

const project_data: DataType[] = [
   {
      id: 1,
      img: project_1,
      title: "Modern Warehouse",
      tag: "Logistics"
   },
   {
      id: 2,
      img: project_2,
      title: "Modern Warehouse",
      tag: "Logistics"
   },
   {
      id: 3,
      img: project_3,
      title: "Modern Warehouse",
      tag: "Logistics"
   },
   {
      id: 4,
      img: project_2,
      title: "Modern Warehouse",
      tag: "Logistics"
   },
];

// slider setting
const setting = {
   slidesPerView: 3,
   loop: true,
   spaceBetween: 24,
   observer: true,
   observeParents: true,
   autoplay: false,
   centeredSlides: true,
   breakpoints: {
      '1500': {
         slidesPerView: 3,
      },
      '1200': {
         slidesPerView: 3,
      },
      '992': {
         slidesPerView: 3,
      },
      '768': {
         slidesPerView: 3,
      },
      '576': {
         slidesPerView: 1.3,
      },
      '0': {
         slidesPerView: 1,
      },
   },
   pagination: {
      el: '.project__nav',
      clickable: true,
   },
};

const Project = () => {
   return (
      <section className="project__area project__bg" style={{ backgroundImage: `url(/assets/img/bg/vector_bg02.svg)` }}>
         <div className="container">
            <div className="row align-items-end">
               <div className="col-lg-7 col-md-9">
                  <div className="section__title mb-40">
                     <span className="sub-title">Featured Projects</span>
                     <h2 className="title">We Are Proud to Excellence Deliver Success</h2>
                  </div>
               </div>
               <div className="col-lg-5 col-md-3">
                  <div className="view-all-btn text-end mb-60">
                     <Link href="/services-details" className="btn">See All Projects <InjectableSvg src="/assets/img/icon/right_arrow.svg" alt="" className="injectable" /></Link>
                  </div>
               </div>
            </div>
         </div>
         <div className="container-fluid p-0 fix">
            <div className="project__item-wrap">
               <Swiper {...setting} modules={[Pagination]} className=" project-active">
                  {project_data.map((item) => (
                     <SwiperSlide key={item.id} className="swiper-slide">
                        <div className="project__item">
                           <div className="project__thumb">
                              <Link href="/project-details"><Image src={item.img} alt="img" /></Link>
                           </div>
                           <div className="project__content">
                              <div className="content">
                                 <h2 className="title"><Link href="/project-details">{item.title}</Link></h2>
                                 <span>{item.tag}</span>
                              </div>
                              <div className="right-arrow">
                                 <Link href="/project-details"><InjectableSvg src="/assets/img/icon/right_arrow.svg" alt="" className="injectable" /></Link>
                              </div>
                           </div>
                        </div>
                     </SwiperSlide>
                  ))}
                  <div className="project__nav"></div>
               </Swiper>
            </div>
         </div>
      </section>
   )
}

export default Project
