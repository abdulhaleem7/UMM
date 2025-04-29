import Image from 'next/image'
import about_img from "@/assets/img/images/h4_about_img2.jpg"
import about_shape from "@/assets/img/images/choose_logo.svg"
import Count from '../common/Count'

const AboutArea = () => {
   return (
      <section className="about__area-two section-py-120">
         <div className="container">
            <div className="row align-items-center justify-content-center gutter-24">
               <div className="col-lg-6 col-md-9">
                  <div className="about__img-five">
                     <Image src={about_img} alt="img" data-aos="fade-left" data-aos-delay="200" />
                     <Image src={about_shape} alt="shape" className="shape" />
                     <div className="about__clients-box about__clients-box-two" data-aos="fade-right" data-aos-delay="200">
                        <span className="title">Flexible, Improved & Accelerated Solutions!</span>
                        <div className="counter__item">
                           <div className="counter__icon">
                              <i className="flaticon-planet-earth"></i>
                           </div>
                           <div className="counter__content">
                              <h2 className="count"><span className="counter-number"><Count number={15.9} /></span>M</h2>
                              <p>Clients Worldwide</p>
                           </div>
                        </div>
                        <div className="counter__item">
                           <div className="counter__icon">
                              <i className="flaticon-package"></i>
                           </div>
                           <div className="counter__content">
                              <h2 className="count"><span className="counter-number"><Count number={9.5} /></span>M</h2>
                              <p>Delivered Goods</p>
                           </div>
                        </div>
                     </div>
                  </div>
               </div>
               <div className="col-lg-6">
                  <div className="about__content-five">
                     <div className="section__title mb-20">
                        <span className="sub-title">About Unified Moving Master</span>
                        <h2 className="title">We Have Strong Reliable Logistic & Solutions Your Time!</h2>
                     </div>
                     <p>At Unified Moving Master we don’t just move packages — we move businesses
                     forward.</p>
                     <div className="about__content-inner-three">
                        <div className="about__list-box about__list-box-five">
                           <ul className="list-wrap">
                              <li><i className="flaticon-check"></i>Quality Control System</li>
                              <li><i className="flaticon-check"></i>100% Satisfaction Guarantee</li>
                              <li><i className="flaticon-check"></i>Professional and Qualified</li>
                              <li><i className="flaticon-check"></i>Safe, Reliable And Express</li>
                              <li><i className="flaticon-check"></i>Honesty, Integrity and Transparency</li>
                           </ul>
                        </div>
                        <div className="about__list-wrap-two">
                           <div className="about__list-item-two">
                              <div className="icon">
                                 <i className="flaticon-delivery-cart"></i>
                              </div>
                              <div className="content">
                                 <h4 className="title">Reliable Delivery</h4>
                                 <p>On-time performance is our promise</p>
                              </div>
                           </div>
                           <div className="about__list-item-two">
                              <div className="icon">
                                 <i className="flaticon-warehouse-1"></i>
                              </div>
                              <div className="content">
                                 <h4 className="title">Trusted Professionals </h4>
                                 <p>Trained drivers and a responsive team</p>
                              </div>
                           </div>
                        </div>
                     </div>
                     <div className="about__content-bottom-two">
                        
                        <div className="about__contact">
                           <div className="icon">
                              <i className="flaticon-envelope"></i>
                           </div>
                           <div className="content">
                              <span>Email Address</span>
                              <a href="mailto:admin@unifiedmovingmaster.ca">admin@unifiedmovingmaster.ca</a>
                           </div>
                        </div>
                        <div className="about__contact">
                           <div className="icon">
                              <i className="flaticon-telephone"></i>
                           </div>
                           <div className="content">
                              <span>Hot Line Number</span>
                              <a href="tel:+1(365-356-3255)">+1(365-356-3255)</a>
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

export default AboutArea
