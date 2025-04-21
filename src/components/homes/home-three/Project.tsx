"use client"
import { Swiper, SwiperSlide } from 'swiper/react';
import InjectableSvg from "@/components/common/InjectableSvg"
import project_data from "@/data/ProjectData"
import Image from "next/image"
import Link from "next/link"

// slider setting
const setting = {
   slidesPerView: 4,
   loop: true,
   spaceBetween: 24,
   observer: true,
   observeParents: true,
   autoplay: false,
   centeredSlides: true,
   breakpoints: {
      '1500': {
         slidesPerView: 4,
      },
      '1200': {
         slidesPerView: 4,
      },
      '992': {
         slidesPerView: 3,
      },
      '768': {
         slidesPerView: 2,
      },
      '576': {
         slidesPerView: 1,
      },
      '0': {
         slidesPerView: 1,
      },
   },
};

const Project = () => {
   return (
      <section className="project__area-three section-pt-140 section-pb-110">
         <div className="container">
            <div className="row align-items-center">
               <div className="col-lg-6 col-md-8">
                  <div className="section__title mb-50 mb-md-30">
                     <span className="sub-title">Featured Projects</span>
                     <h2 className="title">We Are Proud to Excellence Deliver Success</h2>
                  </div>
               </div>
               <div className="col-lg-6 col-md-4">
                  <div className="view-all-btn-two text-end mb-40">
                     <Link href="/project" className="btn border-btn">See All Projects <InjectableSvg src="/assets/img/icon/right_arrow.svg" alt="" className="injectable" /></Link>
                  </div>
               </div>
            </div>
         </div>
         <div className="container custom-container-two">
            <Swiper {...setting} className="swiper-container project-active-three">
               {project_data.filter((items) => items.page === "home_2").map((item) => (
                  <SwiperSlide key={item.id}>
                     <div className="project__item-two">
                        <div className="project__thumb-two">
                           <Link href="/project-details"><Image src={item.img} alt="img" /></Link>
                        </div>
                        <div className="project__content-two">
                           <h2 className="title"><Link href="/project-details">{item.title}</Link></h2>
                           <span>{item.tag}</span>
                        </div>
                     </div>
                  </SwiperSlide>
               ))}
            </Swiper>
         </div>
      </section>
   )
}

export default Project
