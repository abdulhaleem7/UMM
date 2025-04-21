import Image from "next/image"
import Link from "next/link"

import logo from "@/assets/img/logo/w_logo.svg"
import shape_1 from "@/assets/img/images/h3_footer_shape01.svg"
import shape_2 from "@/assets/img/images/h3_footer_shape02.svg"

const FooterThree = () => {
   return (
      <footer className="footer__area footer__area-four fix">
         <div className="container">
            <div className="footer__top footer__top-two">
               <div className="row">
                  <div className="col-xl-4 col-lg-5 col-md-6">
                     <div className="footer__widget">
                        <div className="footer__logo">
                           <Link href="/"><Image src={logo} alt="logo" /></Link>
                        </div>
                        <div className="footer__content footer__content-three">
                           <p>Lorem ipsum dolor sit amet, consect etur adi pisicing elit sed do eiusmod tempor incidunt ut labore et</p>
                        </div>
                        <div className="footer__social footer__social-three">
                           <ul className="list-wrap">
                              <li><Link href="https://www.facebook.com/" target="_blank"><i className="fab fa-facebook-f"></i></Link></li>
                              <li><Link href="https://twitter.com" target="_blank"><i className="fab fa-twitter"></i></Link></li>
                              <li><Link href="https://www.whatsapp.com/" target="_blank"><i className="fab fa-whatsapp"></i></Link></li>
                              <li><Link href="https://www.instagram.com/" target="_blank"><i className="fab fa-instagram"></i></Link></li>
                              <li><Link href="https://www.youtube.com/" target="_blank"><i className="fab fa-youtube"></i></Link></li>
                           </ul>
                        </div>
                        <div className="copyright-text copyright-text-three">
                           <p>Copyright <a href="index.html">©logistex</a> | All Right Reserved</p>
                        </div>
                     </div>
                  </div>
                  <div className="col-xl-2 col-lg-4 col-md-6 col-sm-6">
                     <div className="footer__widget">
                        <h4 className="footer__widget-title footer__widget-title-two">Our Services</h4>
                        <div className="footer__link footer__link-three">
                           <ul className="list-wrap">
                              <li><a href="services-details.html">Air Freight</a></li>
                              <li><a href="services-details.html">Smart Warehousing</a></li>
                              <li><a href="services-details.html">Train Freight</a></li>
                              <li><a href="services-details.html">Ocean Fright</a></li>
                              <li><a href="services-details.html">Road Freight</a></li>
                              <li><a href="services-details.html">Supply Chain</a></li>
                           </ul>
                        </div>
                     </div>
                  </div>
                  <div className="col-xl-3 col-lg-3 col-md-6 col-sm-6">
                     <div className="footer__widget">
                        <h4 className="footer__widget-title footer__widget-title-two">Quick Links</h4>
                        <div className="footer__link footer__link-three">
                           <ul className="list-wrap">
                              <li><a href="how-it-work.html">How it’s Work</a></li>
                              <li><a href="client.html">Partners</a></li>
                              <li><a href="testimonial.html">Testimonials</a></li>
                              <li><a href="project.html">Case Studies</a></li>
                              <li><a href="pricing.html">Pricing</a></li>
                           </ul>
                        </div>
                     </div>
                  </div>
                  <div className="col-xl-3 col-lg-4 col-md-6">
                     <div className="footer__widget">
                        <h4 className="footer__widget-title footer__widget-title-two">Information</h4>
                        <div className="footer__info-wrap footer__info-wrap-three">
                           <ul className="list-wrap">
                              <li>
                                 <i className="flaticon-location-1"></i>
                                 <p>58 Street Commercial Road <br /> Fratton, Australia</p>
                              </li>
                              <li>
                                 <i className="flaticon-telephone"></i>
                                 <a href="tel:0123456789">+123 888 9999</a>
                              </li>
                              <li>
                                 <i className="flaticon-time"></i>
                                 <p>Mon – Sat: 8 am – 5 pm, <br /> Sunday: <span>CLOSED</span></p>
                              </li>
                           </ul>
                        </div>
                     </div>
                  </div>
               </div>
            </div>
         </div>
         <div className="footer__shape footer__shape-two footer__shape-three">
            <Image src={shape_1} alt="shape" />
            <Image src={shape_2} alt="shape" data-aos="fade-left" data-aos-delay="400" />
         </div>
      </footer>
   )
}

export default FooterThree
