import Image from "next/image"
import Link from "next/link"

import sevice_details1 from "@/assets/img/logo/logo02.svg"
import InjectableSvg from "@/components/common/InjectableSvg"

const ServiceSidebar = () => {
   return (
      <div className="col-30">
         <aside className="services__sidebar">
            <div className="services__widget">
               <div className="services__cat-list">
                  <ul className="list-wrap">
                     <li>
                        <Link href="/services-details">
                           <span><i className="flaticon-ship"></i>Ocean Freight</span> <i className="flaticon-right-arrow"></i>
                        </Link>
                     </li>
                     <li>
                        <Link href="/services-details">
                           <span><i className="flaticon-air-freight"></i>Air Freight</span> <i className="flaticon-right-arrow"></i>
                        </Link>
                     </li>
                     <li>
                        <Link href="/services-details">
                           <span><i className="flaticon-train"></i>Rail Freight</span> <i className="flaticon-right-arrow"></i>
                        </Link>
                     </li>
                     <li>
                        <Link href="/services-details">
                           <span><i className="flaticon-truck"></i>Road Freight</span> <i className="flaticon-right-arrow"></i>
                        </Link>
                     </li>
                     <li>
                        <Link href="/services-details">
                           <span><i className="flaticon-warehouse-1"></i>Warehouse</span> <i className="flaticon-right-arrow"></i>
                        </Link>
                     </li>
                     <li>
                        <Link href="/services-details">
                           <span><i className="flaticon-delivery-cart"></i>Cargo Freight</span> <i className="flaticon-right-arrow"></i>
                        </Link>
                     </li>
                  </ul>
               </div>
            </div>
            <div className="services__widget services__widget-two">
               <div className="sidebar__logo">
                  <Link href="/"><Image src={sevice_details1} alt="logo" /></Link>
               </div>
               <div className="sidebar__contact">
                  <h2 className="title">Logistics & Cargo <br /> for Business</h2>
                  <Link href="tle:0123456789" className="sidebar__phone"><i className="flaticon-telephone"></i>(123) 565-8901</Link>
                  <Link href="/contact" className="btn">Contact With us <InjectableSvg src="/assets/img/icon/right_arrow.svg" alt="" className="injectable" /></Link>
               </div>
               <div className="sidebar__shape" style={{ backgroundImage: `url(/assets/img/services/services_sidebar_shape.png)` }}></div>
            </div>
            <div className="services__widget services__widget-three">
               <h4 className="sidebar__widget-title">Brochure</h4>
               <div className="sidebar__brochure">
                  <p>when an unknown printer took ga lley offer typey anddey.</p>
                  <Link href="/assets/img/services/services_img01.jpg" target="_blank" download="">
                     <InjectableSvg src="/assets/img/icon/pdf.svg" alt="" className="injectable" />
                     PDF. Download
                  </Link>
                  <Link href="/assets/img/services/services_img01.jpg" target="_blank" download="">
                     <InjectableSvg src="/assets/img/icon/doc.svg" alt="" className="injectable" />
                     DOC. Download
                  </Link>
               </div>
            </div>
         </aside>
      </div>
   )
}

export default ServiceSidebar
