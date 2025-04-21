"use client"
import { useInView } from "react-intersection-observer";
import team_details1 from "@/assets/img/team/team_details_img.jpg"
import InjectableSvg from "@/components/common/InjectableSvg"
import Image from "next/image"
import Link from "next/link"
import TeamForm from "../../../form/TeamForm"

const TeamDetailsArea = () => {

   const [ref, inView] = useInView({
      triggerOnce: true,
      threshold: 0.75,
   });

   return (
      <section className="team__details-area section-py-130">
         <div className="container">
            <div className="team__details-inner">
               <div className="row justify-content-center">
                  <div className="col-36">
                     <div className="team__details-info-wrap">
                        <div className="team__details-thumb">
                           <Image src={team_details1} alt="img" />
                        </div>
                        <div className="team__details-info">
                           <ul className="list-wrap">
                              <li>
                                 <div className="icon">
                                    <i className="flaticon-envelope"></i>
                                 </div>
                                 <div className="content">
                                    <Link href="mailto:info@gmail.com">info@gmail.com</Link>
                                 </div>
                              </li>
                              <li>
                                 <div className="icon">
                                    <i className="flaticon-location-1"></i>
                                 </div>
                                 <div className="content">
                                    <p>256 Avenue, Mark Street, Newyork City</p>
                                 </div>
                              </li>
                              <li>
                                 <div className="icon">
                                    <InjectableSvg src="/assets/img/icon/share.svg" alt="" className="injectable" />
                                 </div>
                                 <ul className="list-wrap team__details-social">
                                    <li><Link href="https://www.facebook.com/" target="_blank"><i className="fab fa-facebook-f"></i></Link></li>
                                    <li><Link href="https://twitter.com" target="_blank"><i className="fab fa-twitter"></i></Link></li>
                                    <li><Link href="https://www.whatsapp.com/" target="_blank"><i className="fab fa-whatsapp"></i></Link></li>
                                    <li><Link href="https://www.instagram.com/" target="_blank"><i className="fab fa-instagram"></i></Link></li>
                                    <li><Link href="https://www.youtube.com/" target="_blank"><i className="fab fa-youtube"></i></Link></li>
                                 </ul>
                              </li>
                              <li>
                                 <div className="icon">
                                    <i className="flaticon-telephone"></i>
                                 </div>
                                 <div className="content">
                                    <a href="tel:0123456789">+123 8989 444</a>
                                 </div>
                              </li>
                           </ul>
                        </div>
                     </div>
                  </div>
                  <div className="col-64">
                     <div className="team__details-content">
                        <h2 className="title">Guy Hawkins</h2>
                        <span>Finance Advisor</span>
                        <p>Eed a little help from our friends from time to time. Although we offer the one-stop  convenience of annery integrated range of legal, financial services under one roof there are occasions when our clients areaneed specia.</p>
                        <div className="about__list-box about__list-box-two about__list-box-three about__list-box-four">
                           <ul className="list-wrap">
                              <li><i className="flaticon-check"></i>Quality Control System</li>
                              <li><i className="flaticon-check"></i>100% Satisfaction Guarantee</li>
                              <li><i className="flaticon-check"></i>Professional and Qualified</li>
                              <li><i className="flaticon-check"></i>Safe, Reliable And Express</li>
                              <li><i className="flaticon-check"></i>Quality Control System</li>
                              <li><i className="flaticon-check"></i>100% Satisfaction Guarantee</li>
                              <li><i className="flaticon-check"></i>Professional and Qualified</li>
                              <li><i className="flaticon-check"></i>Safe, Reliable And Express</li>
                           </ul>
                        </div>
                        <div className="team__details-skill">
                           <h3 className="title-two">Professional Skills</h3>
                           <p>Eed a little help from our friends from time to time. Although we offer the one-stop convenience of annery integrated range of lega.</p>
                           <div className="progress__wrap progress__wrap-three" ref={ref}>
                              <div className="progress__item progress__item-three">
                                 <div className="progress__item-top">
                                    <h3 className="progress__title">Leadership</h3>
                                    <div className="progress-value"><span className="counter-number">82</span>%</div>
                                 </div>
                                 <div className="progress">
                                    <div className="progress-bar" style={{
                                       width: "82%",
                                       animation: inView ? "animate-positive 1.8s" : "none",
                                       opacity: inView ? "1" : "0",
                                    }}></div>
                                 </div>
                              </div>
                              <div className="progress__item progress__item-three">
                                 <div className="progress__item-top">
                                    <h3 className="progress__title">Quality Control</h3>
                                    <div className="progress-value"><span className="counter-number">90</span>%</div>
                                 </div>
                                 <div className="progress">
                                    <div className="progress-bar"
                                       style={{
                                          width: "90%",
                                          animation: inView ? "animate-positive 1.8s" : "none",
                                          opacity: inView ? "1" : "0",
                                       }}></div>
                                 </div>
                              </div>
                           </div>
                        </div>
                        <div className="team__details-form-wrap">
                           <h3 className="title-three">Leave A Reply</h3>
                           <TeamForm />
                        </div>
                     </div>
                  </div>
               </div>
            </div>
         </div>
      </section>
   )
}

export default TeamDetailsArea
