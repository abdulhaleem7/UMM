import InjectableSvg from "@/components/common/InjectableSvg"
import Image from "next/image"
import Link from "next/link"
import Count from "@/components/common/Count"

import about_img1 from "@/assets/img/images/h2_about_img01.jpg"
import about_img2 from "@/assets/img/images/h2_about_img02.jpg"
import about_img3 from "@/assets/img/images/h2_about_img03.jpg"

const About = () => {
   return (
      <section className="about__area-three section-py-120">
         <div className="container">
            <div className="row align-items-center justify-content-center">
               <div className="col-lg-6 col-md-9">
                  <div className="about__img-three">
                     <Image src={about_img1} alt="img" data-aos="fade-right" data-aos-delay="200" />
                     <Image src={about_img2} alt="img" data-aos="fade-left" data-aos-delay="400" />
                     <Image src={about_img3} alt="img" data-aos="fade-up" data-aos-delay="600" />
                  </div>
               </div>
               <div className="col-lg-6">
                  <div className="about__content-three">
                     <div className="section__title mb-20">
                        <span className="sub-title">Reliable Logistic & Transport Solutions</span>
                        <h2 className="title">Reliable & Express Logistic & Transport Solutions That Saves Your Time!</h2>
                     </div>
                     <p>Adipiscing elit. Aliquam vulputate, tortor nec com ultri viverra Suspen disse faucibus sed dolor eget Sed id urna. hiftler Group irepresentatilve loisticsti operator providings.</p>
                     <div className="about__content-inner-two">
                        <div className="counter__wrap counter__wrap-two">
                           <div className="counter__item counter__item-three">
                              <div className="counter__icon counter__icon-three">
                                 <i className="flaticon-package"></i>
                              </div>
                              <div className="counter__content counter__content-three">
                                 <h2 className="count"><span className="counter-number"><Count number={9.5} /></span>M</h2>
                                 <p>Delivered Goods</p>
                              </div>
                           </div>
                           <div className="counter__item counter__item-three">
                              <div className="counter__icon counter__icon-three">
                                 <i className="flaticon-planet-earth"></i>
                              </div>
                              <div className="counter__content counter__content-three">
                                 <h2 className="count"><span className="counter-number"><Count number={15.9} /></span>M</h2>
                                 <p>Clients Worldwide</p>
                              </div>
                           </div>
                        </div>
                        <div className="about__list-box about__list-box-five">
                           <ul className="list-wrap">
                              <li><i className="flaticon-check"></i>Quality Control System</li>
                              <li><i className="flaticon-check"></i>100% Satisfaction Guarantee</li>
                              <li><i className="flaticon-check"></i>Professional and Qualified</li>
                              <li><i className="flaticon-check"></i>Safe, Reliable And Express</li>
                           </ul>
                        </div>
                     </div>
                     <Link href="/services" className="btn">Explore Our Services <InjectableSvg src="/assets/img/icon/right_arrow.svg" alt="" className="injectable" /></Link>
                  </div>
               </div>
            </div>
         </div>
      </section>
   )
}

export default About
