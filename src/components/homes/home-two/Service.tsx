import InjectableSvg from "@/components/common/InjectableSvg"
import service_data from "@/data/ServiceData"
import Link from "next/link"

const Service = () => {
   return (
      <section className="services__area-two grey-bg section-pt-120 section-pb-90">
         <div className="container">
            <div className="row align-items-center">
               <div className="col-lg-7">
                  <div className="section__title mb-60 mb-md-30">
                     <span className="sub-title">OUR BEST SERVICES</span>
                     <h2 className="title">Managing Logistics For World’s Multinational Companies</h2>
                  </div>
               </div>
               <div className="col-lg-5">
                  <div className="section__content mb-50">
                     <p>Adipiscing elit. Aliquam vulputate, tortor nec comviverra uspen disse faucibus sed dolor eget Sed id urna.</p>
                  </div>
               </div>
            </div>
         </div>
         <div className="container custom-container">
            <div className="row gutter-60 justify-content-center">
               {service_data.filter((items) => items.page === "home_2").map((item) => (
                  <div key={item.id} className="col-xl-3 col-lg-4 col-md-6">
                     <div className="services__item-two">
                        <div className="services__item-top">
                           <div className="services__icon-two">
                              <i className={item.icon}></i>
                           </div>
                           <h2 className="title"><Link href="/services-details">{item.title}</Link></h2>
                        </div>
                        <div className="services__content-two">
                           <p>{item.desc}</p>
                           <ul className="services__item-list list-wrap">
                              {item.list?.map((list, i) => (
                                 <li key={i}><i className="flaticon-check"></i>{list}</li>
                              ))}                                </ul>
                           <Link href="/services-details" className="btn border-btn-two">Read More <InjectableSvg src="/assets/img/icon/right_arrow.svg" alt="" className="injectable" /></Link>
                        </div>
                     </div>
                  </div>
               ))}
            </div>
         </div>
      </section>
   )
}

export default Service
