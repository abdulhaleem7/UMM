import Image from "next/image"
import InjectableSvg from "@/components/common/InjectableSvg"
import Link from "next/link"

import about_img1 from "@/assets/img/images/h2_choose_img.jpg"
import about_img2 from "@/assets/img/images/choose_logo.svg"
import shape from "@/assets/img/images/choose_shape.svg"

const ChooseArea = () => {
   return (
      <section className="choose__area-two section-py-120">
         <div className="container">
            <div className="row align-items-center justify-content-center">
               <div className="col-lg-5 col-md-8">
                  <div className="choose__img-two">
                     <div className="main-img wow img-custom-anim-left animated" data-wow-duration="1.5s" data-wow-delay="0.2s">
                        <Image src={about_img1} alt="img" />
                     </div>
                     <Image src={about_img2} alt="shape" className="shape" />
                  </div>
               </div>
               <div className="col-lg-7">
                  <div className="choose__content-two">
                     <div className="section__title mb-15">
                        <span className="sub-title">Why Choose Us</span>
                        <h2 className="title">Delivering the best global logistics solutions.</h2>
                     </div>
                     <p>There are many variations of passages of Lorem Ipsum available, but the majority have suffered.There are many variations of passages of Lorem psum available, but the majThere variations of passages of Lorem Ipsum available.</p>
                     <div className="choose__list-wrap">
                        <div className="row gutter-20">
                           <div className="col-md-6">
                              <div className="choose__list-item">
                                 <div className="icon">
                                    <i className="flaticon-air-freight"></i>
                                 </div>
                                 <div className="content">
                                    <h5 className="title">Worldwide services</h5>
                                    <p>Finance helps you convert into a strategi dear</p>
                                 </div>
                              </div>
                           </div>
                           <div className="col-md-6">
                              <div className="choose__list-item">
                                 <div className="icon">
                                    <i className="flaticon-truck"></i>
                                 </div>
                                 <div className="content">
                                    <h5 className="title">Delivered Safely</h5>
                                    <p>Finance helps you to into a strategic asset get.</p>
                                 </div>
                              </div>
                           </div>
                        </div>
                     </div>
                     <div className="choose__content-inner">
                        <div className="about__list-box about__list-box-three">
                           <ul className="list-wrap">
                              <li><i className="flaticon-check"></i>Quality Control System</li>
                              <li><i className="flaticon-check"></i>Modern Technology</li>
                              <li><i className="flaticon-check"></i>100% True Result Provide</li>
                           </ul>
                        </div>
                        <p>There are many variations of passages of Lorem Ipsum available, but the majority have suffered.There are many variations</p>
                     </div>
                     <Link href="/contact" className="btn">Request a Quote <InjectableSvg src="/assets/img/icon/right_arrow.svg" alt="" className="injectable" /></Link>
                  </div>
               </div>
            </div>
         </div>
         <div className="choose__shape">
            <Image src={shape} alt="shape" data-aos="fade-left" data-aos-delay="400" />
         </div>
      </section>
   )
}

export default ChooseArea
