import Image from 'next/image'
import about_1 from "@/assets/img/images/inner_about_img01.jpg"
import about_2 from "@/assets/img/images/inner_about_img02.jpg"

const AboutArea = () => {
   return (
      <section className="about__area-two section-py-120">
         <div className="container">
            <div className="row align-items-center justify-content-center gutter-24">
               <div className="col-lg-6 col-md-9">
                  <div className="about__img-two">
                     <Image src={about_1} alt="img" data-aos="fade-right" data-aos-delay="400" />
                     <Image src={about_2} alt="img" data-aos="fade-up" data-aos-delay="600" />
                  </div>
               </div>
               <div className="col-lg-6">
                  <div className="about__content-two">
                     <div className="section__title section__title-two mb-20">
                        <span className="sub-title">About Logistics Company</span>
                        <h2 className="title">Reliable Logistic & Transport Solutions Saves Your Time!</h2>
                     </div>
                     <div className="about__content-inner">
                        <div className="about__list-box about__list-box-two">
                           <ul className="list-wrap">
                              <li><i className="flaticon-check"></i>Quality Control System</li>
                              <li><i className="flaticon-check"></i>100% Satisfaction Guarantee</li>
                              <li><i className="flaticon-check"></i>Professional and Qualified</li>
                              <li><i className="flaticon-check"></i>Safe, Reliable And Express</li>
                           </ul>
                        </div>
                        <div className="about__clients-box">
                           <span>Flexible, Improved & Accelerated Solutions!</span>
                           <div className="counter__item">
                              <div className="counter__icon">
                                 <i className="flaticon-planet-earth"></i>
                              </div>
                              <div className="counter__content">
                                 <h2 className="count"><span className="counter-number">15.9</span>M</h2>
                                 <p>Clients Worldwide</p>
                              </div>
                           </div>
                        </div>
                     </div>
                     <p>We are a trusted logistics partner offering efficient and dependable transport solutions tailored to your needs. From freight shipping to final-mile delivery, we ensure every package arrives safely and on time.</p>
                  </div>
               </div>
            </div>
         </div>
      </section>
   )
}

export default AboutArea
