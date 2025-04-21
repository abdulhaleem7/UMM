"use client"
import InjectableSvg from "@/components/common/InjectableSvg"
import Image from "next/image"
import Link from "next/link"

import shape_1 from "@/assets/img/images/cta_shape.png"
import shape_2 from "@/assets/img/images/footer_shape01.png"
import shape_3 from "@/assets/img/images/footer_shape02.png"
import logo from "@/assets/img/logo/w_logo.svg"

const FooterOne = () => {
   return (
      <footer className="footer__area fix">
         <div className="container">
            <div className="cta__wrap fix">
               <div className="row align-items-center">
                  <div className="col-lg-7">
                     <div className="cta__content">
                        <h3 className="title">Fastest & secure way to transport <br /> anything anytime</h3>
                     </div>
                  </div>
                  <div className="col-lg-5">
                     <div className="cta__btn text-end">
                        <Link href="/services" className="btn btn-two">Request a Quote <InjectableSvg src="assets/img/icon/right_arrow.svg" alt="" className="injectable" /></Link>
                     </div>
                  </div>
               </div>
               <div className="cta__shape">
                  <Image src={shape_1} alt="img" data-aos="fade-up-right" data-aos-delay="400" />
               </div>
            </div>
            <div className="footer__top">
               <div className="row">
                  <div className="col-xl-4 col-lg-5 col-md-6">
                     <div className="footer__widget">
                        <div className="footer__logo">
                           <Link href="/"><Image src={logo} alt="logo" /></Link>
                        </div>
                        <div className="footer__content">
                           <p>Lorem ipsum dolor sit amet, consect etur adi pisicing elit sed do eiusmod tempor incidunt ut labore et</p>
                        </div>
                        <form onSubmit={(e) => (e.preventDefault())} className="footer__newsletter">
                           <div className="form-grp">
                              <input type="email" placeholder="enter your e-mail" />
                              <button type="submit">Subscribe</button>
                           </div>
                           <span>We don’t send you any spam</span>
                        </form>
                     </div>
                  </div>
                  <div className="col-xl-2 col-lg-4 col-md-6 col-sm-6">
                     <div className="footer__widget">
                        <h4 className="footer__widget-title">Our Services</h4>
                        <div className="footer__link">
                           <ul className="list-wrap">
                              <li><Link href="/services-details">Air Freight</Link></li>
                              <li><Link href="/services-details">Smart Warehousing</Link></li>
                              <li><Link href="/services-details">Train Freight</Link></li>
                              <li><Link href="/services-details">Ocean Fright</Link></li>
                              <li><Link href="/services-details">Road Freight</Link></li>
                              <li><Link href="/services-details">Supply Chain</Link></li>
                           </ul>
                        </div>
                     </div>
                  </div>
                  <div className="col-xl-3 col-lg-3 col-md-6 col-sm-6">
                     <div className="footer__widget">
                        <h4 className="footer__widget-title">Quick Links</h4>
                        <div className="footer__link">
                           <ul className="list-wrap">
                              <li><Link href="/how-it-work">How it’s Work</Link></li>
                              <li><Link href="/client">Partners</Link></li>
                              <li><Link href="/testimonial">Testimonials</Link></li>
                              <li><Link href="/project">Case Studies</Link></li>
                              <li><Link href="/pricing">Pricing</Link></li>
                           </ul>
                        </div>
                     </div>
                  </div>
                  <div className="col-xl-3 col-lg-4 col-md-6">
                     <div className="footer__widget">
                        <h4 className="footer__widget-title">Information</h4>
                        <div className="footer__info-wrap">
                           <ul className="list-wrap">
                              <li>
                                 <i className="flaticon-location-1"></i>
                                 <p>58 Street Commercial Road <br /> Fratton, Australia</p>
                              </li>
                              <li>
                                 <i className="flaticon-telephone"></i>
                                 <Link href="tel:0123456789">+123 888 9999</Link>
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
            <div className="footer__bottom">
               <div className="row align-items-center">
                  <div className="col-md-7">
                     <div className="copyright-text">
                        <p>Copyright <Link href="/">©logistex</Link> | All Right Reserved</p>
                     </div>
                  </div>
                  <div className="col-md-5">
                     <div className="footer__social">
                        <ul className="list-wrap">
                           <li><Link href="https://www.facebook.com/" target="_blank"><i className="fab fa-facebook-f"></i></Link></li>
                           <li><Link href="https://twitter.com" target="_blank"><i className="fab fa-twitter"></i></Link></li>
                           <li><Link href="https://www.whatsapp.com/" target="_blank"><i className="fab fa-whatsapp"></i></Link></li>
                           <li><Link href="https://www.instagram.com/" target="_blank"><i className="fab fa-instagram"></i></Link></li>
                           <li><Link href="https://www.youtube.com/" target="_blank"><i className="fab fa-youtube"></i></Link></li>
                        </ul>
                     </div>
                  </div>
               </div>
            </div>
         </div>
         <div className="footer__shape">
            <Image src={shape_2} alt="shape" data-aos="fade-down" data-aos-delay="400" />
            <Image src={shape_3} alt="shape" data-aos="fade-left" data-aos-delay="400" />
         </div>
      </footer>
   )
}

export default FooterOne
