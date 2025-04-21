import team_data from '@/data/TeamData'
import Image from 'next/image'
import Link from 'next/link'

import shape1 from "@/assets/img/team/h3_team_shape.svg"
import shape2 from "@/assets/img/team/team_shape.svg"

interface PropsType {
   style?: boolean;
}

const Team = ({ style }: PropsType) => {
   return (
      <section className="team__area fix section-pt-130 ">
         <div className={`team__bg ${style ? "team__bg-two" : ""}`} style={{ backgroundImage: `url(${style ? "/assets/img/bg/vector_bg04.svg" : "/assets/img/bg/team_bg.jpg"})` }}></div>
         <div className="container">
            <div className="row">
               <div className="col-lg-12">
                  <div className="section__title white-title text-center mb-45">
                     <span className="sub-title">Our Team Member</span>
                     <h2 className="title">Meet Our Executive People</h2>
                  </div>
               </div>
            </div>
            <div className="row gutter-24">
               {team_data.filter((items) => items.page === "home_3").map((item) => (
                  <div key={item.id} className="col-lg-3 col-sm-6" data-aos="fade-up" data-aos-delay={item.data_aos_delay}>
                     <div className="team__item">
                        <div className="team__thumb">
                           <Image src={item.img} alt="img" />
                        </div>
                        <div className="team__content">
                           <h2 className="title"><Link href="/team-details">{item.title}</Link></h2>
                           <span>{item.designation}</span>
                           <ul className="list-wrap team__social">
                              <li><Link href="https://www.facebook.com/" target="_blank"><i className="fab fa-facebook-f"></i></Link></li>
                              <li><Link href="https://twitter.com/home" target="_blank"><i className="fab fa-twitter"></i></Link></li>
                              <li><Link href="https://www.instagram.com/" target="_blank"><i className="fab fa-instagram"></i></Link></li>
                              <li><Link href="https://www.pinterest.com/" target="_blank"><i className="fab fa-pinterest-p"></i></Link></li>
                           </ul>
                        </div>
                     </div>
                  </div>
               ))}
            </div>
         </div>
         <div className="team__shape">
            <Image src={style ? shape1 : shape2} alt="shape" data-aos="fade-down" data-aos-delay="600" />
         </div>
      </section>
   )
}

export default Team
