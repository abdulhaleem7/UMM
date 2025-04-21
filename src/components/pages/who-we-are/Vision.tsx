"use client"
import { useInView } from "react-intersection-observer";
import Image from "next/image"
import vission_thumb from "@/assets/img/images/vision_img.jpg"

const Vision = () => {

   const [ref, inView] = useInView({
      triggerOnce: true,
      threshold: 0.75,
   });

   return (
      <section className="vision__area section-pb-120">
         <div className="container">
            <div className="row">
               <div className="col-lg-12">
                  <div className="vision__inner-wrap">
                     <div className="vision__img wow img-custom-anim-left animated" data-wow-duration="1.5s" data-wow-delay="0.1s">
                        <Image src={vission_thumb} alt="img" />
                     </div>
                     <div className="vision__content">
                        <div className="section__title section__title-two mb-25">
                           <span className="sub-title">Company Vision</span>
                           <h2 className="title">Our Next Level Logistics Around the World</h2>
                        </div>
                        <p>With over four decades experience providing solutions large scale enterprises throughout the globe we offer endend logistics tailored for specific markets.</p>
                        <div className="progress__wrap progress__wrap-three" ref={ref}>
                           <div className="progress__item progress__item-three">
                              <div className="progress__item-top">
                                 <h3 className="progress__title">Successful Delivery</h3>
                                 <div className="progress-value"><span className="counter-number">82</span>%</div>
                              </div>
                              <div className="progress">
                                 <div className="progress-bar"
                                    style={{
                                       width: "82%",
                                       animation: inView ? "animate-positive 1.8s" : "none",
                                       opacity: inView ? "1" : "0",
                                    }}></div>
                              </div>
                           </div>
                           <div className="progress__item progress__item-three">
                              <div className="progress__item-top">
                                 <h3 className="progress__title">Happy Customers</h3>
                                 <div className="progress-value"><span className="counter-number">90</span>%</div>
                              </div>
                              <div className="progress">
                                 <div className="progress-bar"
                                    style={{
                                       width: "90%",
                                       animation: inView ? "animate-positive 1.8s" : "none",
                                       opacity: inView ? "1" : "0",
                                    }}></div>
                              </div>
                           </div>
                        </div>
                     </div>
                  </div>
               </div>
            </div>
         </div>
      </section>
   )
}

export default Vision
