import team_data from '@/data/TeamData'
import Image from 'next/image'
import Link from 'next/link'

const TeamArea = () => {
   return (
      <section className="team__area-three fix section-pt-130 section-pb-100">
         <div className="container">
            <div className="row gutter-24">
               {team_data.filter((items) => items.page === "inner_page").map((item) => (
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
      </section>
   )
}

export default TeamArea
