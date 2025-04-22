import InjectableSvg from "@/components/common/InjectableSvg"
import service_data from "@/data/ServiceData"
import Image from "next/image"
import Link from "next/link"

import shape_1 from "@/assets/img/services/h4_services_shape01.svg"
import shape_2 from "@/assets/img/services/h4_services_shape02.svg"
import shape_3 from "@/assets/img/services/h4_services_shape03.svg"

const Service = () => {
   return (
      <section className="services__area-four grey-bg section-pt-140 section-pb-110">
         <div className="container">
            <div className="row align-items-center">
               <div className="col-xl-5 col-lg-6 col-md-8">
                  <div className="section__title mb-50 mb-md-30">
                     <span className="sub-title">OUR BEST SERVICES</span>
                     <h2 className="title">Covering All Logistics Solutions For you</h2>
                  </div>
               </div>
               <div className="col-xl-7 col-lg-6 col-md-4">
                  <div className="view-all-btn-two view-all-btn-three text-end mb-40">
                     <Link href="/services" className="btn border-btn">All Services <InjectableSvg src="/assets/img/icon/right_arrow.svg" alt="" className="injectable" /></Link>
                  </div>
               </div>
            </div>
            <div className="row gutter-24 justify-content-center">
               {service_data.filter((items) => items.page === "home_4").map((item) => (
                  <div key={item.id} className="col-lg-4 col-md-6">
                     <div className="services__item-three">
                        <div className="services__thumb-three">
                           <Link href="/services-details">
                              <Image src={item.img ? item.img : ""} alt="img" />
                           </Link>
                           {/* <Link href="/services-details" className="btn border-btn">Read More <InjectableSvg src="/assets/img/icon/right_arrow.svg" alt="" className="injectable" /></Link> */}
                        </div>
                        <div className="services__content-three">
                           <div className="services__icon-three">
                              <i className={item.icon}></i>
                           </div>
                           <h4 className="title"><Link href="/services-details">{item.title}</Link></h4>
                           <p>{item.desc}</p>
                        </div>
                     </div>
                  </div>
               ))}
            </div>
         </div>
         <div className="services__shape-wrap-two">
            <Image src={shape_1} alt="shape" data-aos="fade-right" data-aos-delay="400" />
            <Image src={shape_2} alt="shape" className="rotateme" />
            <Image src={shape_3} alt="shape" />
         </div>
      </section>
   )
}

export default Service
