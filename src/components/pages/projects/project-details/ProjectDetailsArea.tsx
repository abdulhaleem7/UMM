import Image from "next/image"
import ProjectDetailsSidebar from "./ProjectDetailsSidebar"

import project_details1 from "@/assets/img/project/project_img01.jpg"

const ProjectDetailsArea = () => {
   return (
      <section className="project__details-area section-py-130">
         <div className="project__details-inner">
            <div className="container">
               <div className="row">
                  <div className="col-70">
                     <div className="project__details-thumb">
                        <Image src={project_details1} alt="" />
                     </div>
                     <div className="project__details-content">
                        <h2 className="title">Modern Logistics Provider</h2>
                        <p>Shipping freight refers to the transportation of large quantities of goods or cargo by sea, air, or land. Freight can be shipped in various types of containers such as boxes, crates, barrels, or pallets. The transportation of goods by freight is typically arranged through a shipping company or freight forwarder, which handles the logistics of the shipment, including the booking of cargo space, transportation, customs clearance, and delivery.</p>
                        <div className="project__details-challenge">
                           <h3 className="title-two">Project challenges</h3>
                           <p>With over four decades experience providing solutions largee enterprises throughout the globe we offer endend istics tailored for specific markets.when an unknown printer took a galley of type and scrambled it to make a type specimen bookhas survived not only five centuries, but also the.</p>
                           <div className="about__list-box about__list-box-two about__list-box-four">
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
                        </div>
                        <p>when an unknown printer took a galley of type and scrambled it to make a type specimen bookhas survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchan galley of type and scrambled it to make a type specimen book.</p>
                        <div className="project__details-features">
                           <div className="row">
                              <div className="col-md-6">
                                 <div className="features__item">
                                    <div className="features__icon">
                                       <i className="flaticon-warehouse-1"></i>
                                    </div>
                                    <div className="features__content">
                                       <h2 className="title">Warehouse</h2>
                                       <p>When an unknown printer took a galley typeat better future.</p>
                                    </div>
                                 </div>
                              </div>
                              <div className="col-md-6">
                                 <div className="features__item">
                                    <div className="features__icon">
                                       <i className="flaticon-air-freight"></i>
                                    </div>
                                    <div className="features__content">
                                       <h2 className="title">Air Freight</h2>
                                       <p>When an unknown printer took a galley typeat better future.</p>
                                    </div>
                                 </div>
                              </div>
                           </div>
                        </div>
                        <div className="project__details-services">
                           <h3 className="title-two">Best services for business</h3>
                           <p>With over four decades experience providing solutions largee enterprises throughout the globe we offer endend istics tailored for specific markets.when an unknown printer took a galley of type and scrambled it to make a type specimen bookhas survived not only five centuries, but also the.</p>
                        </div>
                     </div>
                  </div>
                  <ProjectDetailsSidebar />
               </div>
            </div>
         </div>
      </section>
   )
}

export default ProjectDetailsArea
