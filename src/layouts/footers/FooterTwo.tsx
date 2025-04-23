import Image from "next/image"
import Link from "next/link"

// import logo from "@/assets/img/logo/w_logo.svg"
import shape_1 from "@/assets/img/images/inner_footer_shape01.svg"
import shape_2 from "@/assets/img/images/inner_footer_shape02.svg"
interface propsType {
   style?: boolean;
}
const FooterTwo = ({ style }: propsType) => {
   return (
      <footer className={`footer__area-two fix ${style ? "footer__area-three" : ""}`}>
         <div className="container">
            <div className="footer__top">
               <div className="row">
                  <div className="col-xl-4 col-lg-5 col-md-6">
                     <div className="footer__widget">
                        <div className="footer__logo">
                           <Link href="/"><h3 className="text-white">UnifiedMoving</h3></Link>
                        </div>
                        <div className="footer__content footer__content-two">
                           <p>Ontario’s Trusted Logistics Experts — Unified in Motion, Delivering with Precision</p>
                        </div>
                        <div className="footer__social footer__social-two">
                           <ul className="list-wrap">
                              <li><Link href="https://www.facebook.com/" target="_blank"><i className="fab fa-facebook-f"></i></Link></li>
                              <li><Link href="https://twitter.com" target="_blank"><i className="fab fa-twitter"></i></Link></li>
                              <li><Link href="https://www.whatsapp.com/" target="_blank"><i className="fab fa-whatsapp"></i></Link></li>
                              <li><Link href="https://www.instagram.com/" target="_blank"><i className="fab fa-instagram"></i></Link></li>
                              <li><Link href="https://www.youtube.com/" target="_blank"><i className="fab fa-youtube"></i></Link></li>
                           </ul>
                        </div>
                        <div className="copyright-text copyright-text-two">
                           <p>Copyright <Link href="/">UMM</Link> | All Right Reserved</p>
                        </div>
                     </div>
                  </div>
                  <div className="col-xl-2 col-lg-4 col-md-6 col-sm-6">
                     <div className="footer__widget">
                        <h4 className="footer__widget-title footer__widget-title-two">Our Services</h4>
                        <div className="footer__link footer__link-two">
                           <ul className="list-wrap">
                              <li><Link href="/">Moving and Hauling</Link></li>
                              <li><Link href="/">Courier & Local Delivery</Link></li>
                              <li><Link href="/">Freight Transport</Link></li>
                              <li><Link href="/">E-commerce Fulfillment & Delivery</Link></li>
                              <li><Link href="/">Custom Logistics</Link></li>
                           </ul>
                        </div>
                     </div>
                  </div>
                  <div className="col-xl-3 col-lg-3 col-md-6 col-sm-6">
                     <div className="footer__widget">
                        <h4 className="footer__widget-title footer__widget-title-two">Quick Links</h4>
                        <div className="footer__link footer__link-two">
                           <ul className="list-wrap">
                              <li><Link href="/">How it’s Work</Link></li>
                              <li><Link href="/">Partners</Link></li>
                              <li><Link href="/">Testimonials</Link></li>
                              <li><Link href="/">Case Studies</Link></li>
                              <li><Link href="/">Pricing</Link></li>
                           </ul>
                        </div>
                     </div>
                  </div>
                  <div className="col-xl-3 col-lg-4 col-md-6">
                     <div className="footer__widget">
                        <h4 className="footer__widget-title footer__widget-title-two">Information</h4>
                        <div className="footer__info-wrap footer__info-wrap-two">
                           <ul className="list-wrap">
                              <li>
                                 <i className="flaticon-location-1"></i>
                                 <p>Hamilton Ontario</p>
                              </li>
                              <li>
                                 <i className="flaticon-telephone"></i>
                                 <Link href="tel:+1(365-356-3255)">+1(365-356-3255)</Link>
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
         <div className="footer__shape footer__shape-two">
            <Image src={shape_1} alt="shape" data-aos="fade-down" data-aos-delay="400" />
            <Image src={shape_2} alt="shape" data-aos="fade-left" data-aos-delay="400" />
         </div>
      </footer>
   )
}

export default FooterTwo
