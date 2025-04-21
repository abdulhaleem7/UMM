import Image from "next/image"

import mission_thumb from "@/assets/img/images/mission_img.jpg"
import shape from "@/assets/img/images/mission_shape.svg"

const Mission = () => {
   return (
      <section className="mission__area section-py-120">
         <div className="container">
            <div className="row">
               <div className="col-12">
                  <div className="mission__inner-wrap">
                     <div className="mission__img wow img-custom-anim-right animated" data-wow-duration="1.5s" data-wow-delay="0.1s">
                        <Image src={mission_thumb} alt="img" />
                     </div>
                     <div className="mission__content">
                        <div className="section__title section__title-two mb-20">
                           <span className="sub-title">Company Mission</span>
                           <h2 className="title">Delivering Monster for indutry leaders</h2>
                        </div>
                        <p>With over four decades experience providing solutions large scale enterprises throughout the globe we offer endend logistics tailored for specific markets.</p>
                        <div className="about__list-box about__list-box-two about__list-box-three">
                           <ul className="list-wrap">
                              <li><i className="flaticon-check"></i>Quality Control System</li>
                              <li><i className="flaticon-check"></i>100% Satisfaction Guarantee</li>
                              <li><i className="flaticon-check"></i>Professional and Qualified</li>
                              <li><i className="flaticon-check"></i>Safe, Reliable And Express</li>
                           </ul>
                        </div>
                        <div className="shape">
                           <Image src={shape} alt="shape" />
                        </div>
                     </div>
                  </div>
               </div>
            </div>
         </div>
      </section>
   )
}

export default Mission
