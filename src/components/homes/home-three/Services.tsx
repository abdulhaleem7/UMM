"use client"
import { useState } from "react";
import Image, { StaticImageData } from "next/image";
import Link from "next/link";

import service_img1 from "@/assets/img/services/services_img06.jpg"
import service_img2 from "@/assets/img/services/services_img01.jpg"
import service_img3 from "@/assets/img/services/services_img04.jpg"
import service_img4 from "@/assets/img/services/services_img02.jpg"
import service_img5 from "@/assets/img/services/services_img07.jpg"

const tab_img: StaticImageData[] = [service_img1, service_img2, service_img3, service_img4, service_img5]

interface DataType {
   id: number;
   title: string;
   icon: string;
}

const tab_title: DataType[] = [
   {
      id: 1,
      title: "Freight Transport",
      icon: "flaticon-air-freight",
   },
   {
      id: 2,
      title: "Ocean Freight",
      icon: "flaticon-ship",
   },
   {
      id: 3,
      title: "Rail Freight",
      icon: "flaticon-train",
   },
   {
      id: 4,
      title: "Land Freight",
      icon: "flaticon-truck",
   },
   {
      id: 5,
      title: "Warehouse",
      icon: "flaticon-delivery-cart",
   },
];


const Services = () => {

   const [activeTab, setActiveTab] = useState(0);

   const handleTabClick = (index: number) => {
      setActiveTab(index);
   };

   return (
      <section className="services__area-three section-py-140">
         <div className="container">
            <div className="row align-items-center">
               <div className="col-lg-7">
                  <div className="section__title white-title mb-40">
                     <span className="sub-title">OUR BEST SERVICES</span>
                     <h2 className="title">Best Transport services <br /> for our client’s</h2>
                  </div>
               </div>
               <div className="col-lg-5">
                  <div className="section__content white-content mb-40">
                     <p>Adipiscing elit. Aliquam vulputate, tortor nec comviverra uspen disse faucibus sed dolor eget Sed id urna.</p>
                  </div>
               </div>
            </div>
            <div className="row">
               <div className="col-lg-5">
                  <div className="services__nav-wrap">
                     <ul className="nav nav-tabs" id="myTab" role="tablist">
                        {tab_title.map((tab, index) => (
                           <li key={index} onClick={() => handleTabClick(index)} className="nav-item" role="presentation">
                              <button className={`nav-link ${activeTab === index ? "active" : ""}`} id="freight-tab">
                                 <span className="left-content">
                                    <i className={tab.icon}></i>
                                    <span>{tab.title}</span>
                                 </span>
                                 <span className="arrow"><i className="flaticon-right-up"></i></span>
                              </button>
                           </li>
                        ))}
                     </ul>
                  </div>
               </div>
               <div className="col-lg-7">
                  <div className="services__tab-img">
                     <div className="tab-content" id="myTabContent">
                        {tab_img.map((img, index) => (
                           <div key={index} className={`tab-pane fade ${activeTab === index ? 'show active' : ''}`} id="freight-tab-pane" >
                              <div className="services__thumb-two">
                                 <Link href="/services-details"><Image src={img} alt="img" /></Link>
                              </div>
                           </div>
                        ))}
                     </div>
                  </div>
               </div>
            </div>
         </div>
      </section>
   )
}

export default Services
