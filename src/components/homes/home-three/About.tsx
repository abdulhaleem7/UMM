import Image from "next/image"

import about_img1 from "@/assets/img/images/h3_about_img01.jpg"
import about_img2 from "@/assets/img/images/h3_about_img02.jpg"
import about_img3 from "@/assets/img/images/h3_about_img03.jpg"
import signature from "@/assets/img/images/signature.png"
import author from "@/assets/img/images/about_author.png"
import shape from "@/assets/img/images/h3_about_shape.svg"

const About = () => {
   return (
      <section className="about__area-four section-py-140">
         <div className="container">
            <div className="row align-items-center justify-content-center">
               <div className="col-lg-6 col-md-10">
                  <div className="about__img-four">
                     <Image src={about_img1} alt="img" data-aos="fade-right" data-aos-delay="200" />
                     <Image src={about_img2} alt="img" data-aos="fade-left" data-aos-delay="400" />
                     <Image src={about_img3} alt="img" data-aos="fade-up" data-aos-delay="600" />
                  </div>
               </div>
               <div className="col-lg-6">
                  <div className="about__content-four">
                     <div className="section__title mb-20">
                        <span className="sub-title">About Logistics Company</span>
                        <h2 className="title">We Have Strong Global Logistics Solution Provider</h2>
                     </div>
                     <p>Adipiscing elit. Aliquam vulputate, tortor nec com ultri viverra Suspen disse faucibus sed dolor eget Sed id urna. hiftler Group irepresentatilve loisticsti operator providings.</p>
                     <div className="about__list-wrap">
                        <div className="about__list-item">
                           <div className="icon">
                              <i className="flaticon-warehouse-1"></i>
                           </div>
                           <div className="content">
                              <h2 className="title">Warehouse Storage</h2>
                              <p>Adipiscing eliiq vulputate tortocom ueltri</p>
                           </div>
                        </div>
                        <div className="about__list-item">
                           <div className="icon">
                              <i className="flaticon-ship"></i>
                           </div>
                           <div className="content">
                              <h2 className="title">Product Caring</h2>
                              <p>Adipiscing eliiq vulputate tortocom ueltri</p>
                           </div>
                        </div>
                     </div>
                     <div className="about__list-box about__list-box-four">
                        <ul className="list-wrap">
                           <li><i className="flaticon-check"></i>Quality Control System</li>
                           <li><i className="flaticon-check"></i>100% Satisfaction Guarantee</li>
                           <li><i className="flaticon-check"></i>Professional and Qualified</li>
                           <li><i className="flaticon-check"></i>Safe, Reliable And Express</li>
                        </ul>
                     </div>
                     <div className="about__content-bottom">
                        <div className="about__author">
                           <Image src={author} alt="img" />
                           <div className="content">
                              <h4 className="name">Mark Stranger</h4>
                              <span>CEO, logistex LTD.</span>
                           </div>
                        </div>
                        <div className="about__author-signature">
                           <Image src={signature} alt="signature" />
                        </div>
                     </div>
                  </div>
               </div>
            </div>
         </div>
         <div className="about__shape">
            <Image src={shape} alt="shape" data-aos="fade-left" data-aos-delay="400" />
         </div>
      </section>
   )
}

export default About
