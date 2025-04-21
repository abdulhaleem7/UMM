import Image from "next/image";
import Link from "next/link";
import InjectableSvg from "@/components/common/InjectableSvg";
import service_data from "@/data/ServiceData";

import shape_1 from "@/assets/img/services/services_shape01.png"
import shape_2 from "@/assets/img/services/services_shape02.png"


const Service = () => {
   return (
      <section className="services__area fix">
         <div className="container">
            <div className="row align-items-center">
               <div className="col-md-8">
                  <div className="section__title mb-40">
                     <span className="sub-title">OUR BEST SERVICES</span>
                     <h2 className="title">Covering All Logistics <br /> Solutions Fro you</h2>
                  </div>
               </div>
               <div className="col-md-4">
                  <div className="view-all-btn text-end mb-40">
                     <Link href="/services" className="btn btn-two">All Services <InjectableSvg src="/assets/img/icon/right_arrow.svg" alt="" className="injectable" /></Link>
                  </div>
               </div>
            </div>
            <div className="row gutter-24 justify-content-center">
               {service_data.filter((items) => items.page === "home_1").map((item) => (
                  <div key={item.id} className="col-xl-3 col-lg-4 col-sm-6">
                     <div className="services__item">
                        <div className="services__thumb-wrap">
                           <div className="services__thumb">
                              <Image src={item.img ? item.img : ""} alt="img" />
                              <Link href="/services-details" className="btn btn-two border-btn">Read More <InjectableSvg src="/assets/img/icon/right_arrow.svg" alt="" className="injectable" /></Link>
                           </div>
                           <div className="services__icon">
                              <i className={item.icon}></i>
                           </div>
                        </div>
                        <div className="services__content">
                           <h3 className="title"><Link href="/services-details">{item.title}</Link></h3>
                           <p>{item.desc}</p>
                        </div>
                     </div>
                  </div>
               ))}
            </div>
         </div>
         <div className="services__shape-wrap">
            <Image src={shape_1} alt="shape" className="rotateme" />
            <Image src={shape_2} alt="shape" data-aos="fade-right" data-aos-delay="400" />
         </div>
      </section>
   )
}

export default Service
