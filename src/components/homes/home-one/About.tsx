import Image from "next/image"
import Link from "next/link"
import InjectableSvg from "@/components/common/InjectableSvg"

import about_img1 from "@/assets/img/images/about_img01.png"
import about_img2 from "@/assets/img/images/about_img02.png"
import about_img3 from "@/assets/img/images/about_img03.png"
import author1 from "@/assets/img/images/author01.png"
import author2 from "@/assets/img/images/author01.png"
import author3 from "@/assets/img/images/author01.png"
import author4 from "@/assets/img/images/author01.png"
import shape_1 from "@/assets/img/images/about_shape.png"

const About = () => {
   return (
      <section className="about__area pt-120 pb-120">
         <div className="container">
            <div className="row align-items-center justify-content-center">
               <div className="col-lg-6 col-md-8">
                  <div className="about__img">
                     <Image src={about_img1} alt="img" />
                     <Image src={about_img2} alt="img" data-aos="fade-right" data-aos-delay="200" />
                     <Image src={about_img3} alt="img" data-aos="fade-down" data-aos-delay="400" />
                  </div>
               </div>
               <div className="col-lg-6">
                  <div className="about__content">
                     <div className="section__title mb-15">
                        <span className="sub-title">Reliable Logistic & Transport Solutions</span>
                        <h2 className="title">Delivering the Full Range <br /> Of logistics solutions</h2>
                     </div>
                     <p>Adipiscing elit. Aliquam vulputate, tortor nec com ultri viverra Suspen disse faucibus sed dolor eget Sed id urna. Hiftler Group irepresentatilve in loisticsti for operator providings.</p>
                     <div className="about__content-bottom">
                        <div className="about__list-box-wrap">
                           <div className="about__list-box">
                              <ul className="list-wrap">
                                 <li><i className="flaticon-check"></i>Quality Control System</li>
                                 <li><i className="flaticon-check"></i>100% Satisfaction Guarantee</li>
                                 <li><i className="flaticon-check"></i>Professional and Qualified</li>
                                 <li><i className="flaticon-check"></i>Safe, Reliable And Express</li>
                              </ul>
                           </div>
                           <Link href="/services" className="btn">Get in Touch <InjectableSvg src="/assets/img/icon/right_arrow.svg" alt="" className="injectable" /></Link>
                        </div>
                        <div className="about__review-wrap">
                           <div className="about__review-box">
                              <div className="about__review-author">
                                 <Image src={author1} alt="img" />
                                 <Image src={author2} alt="img" />
                                 <Image src={author3} alt="img" />
                                 <Image src={author4} alt="img" />
                              </div>
                              <div className="review">
                                 <i className="fas fa-star"></i>
                                 <i className="fas fa-star"></i>
                                 <i className="fas fa-star"></i>
                                 <i className="fas fa-star"></i>
                                 <i className="fas fa-star"></i>
                              </div>
                              <span>Clients 4.7 (1,567 Reviews)</span>
                           </div>
                           <div className="experience__box">
                              <h4 className="title">25</h4>
                              <span>Years Of <br /> Experience</span>
                           </div>
                        </div>
                     </div>
                     <div className="shape">
                        <Image src={shape_1} alt="shape" data-aos="fade-left" data-aos-delay="1000" />
                     </div>
                  </div>
               </div>
            </div>
         </div>
      </section>
   )
}

export default About
