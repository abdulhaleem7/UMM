"use client"
import Image from "next/image";
import { useState } from "react";

import request_shape from "@/assets/img/images/request_shape.svg"

const tab_title: string[] = ["Request a Quote"];

interface PropsType {
   style?: boolean;
}

const RequestArea = ({ style }: PropsType) => {

   const [activeTab, setActiveTab] = useState(0);

   const handleTabClick = (index: number) => {
      setActiveTab(index);
   };

   return (
      <div className={style ? "request__area-two" : "request__area"}>
         <div className="container">
            <div className="row">
               <div className="col-lg-12">
                  <div className="request__wrap">
                     <div className="request__nav">
                        <ul className={`nav nav-tabs ${style ? "request__nav-two" : ""}`} id="myTab">
                           {tab_title.map((tab, index) => (
                              <li key={index} onClick={() => handleTabClick(index)} className="nav-item" role="presentation">
                                 <button className={`nav-link ${activeTab === index ? "active" : ""}`}>{tab}</button>
                              </li>
                           ))}
                        </ul>
                     </div>
                     <div className="request__tab-wrap">
                        <div className="tab-content" id="myTabContent">
                           <div className={`tab-pane fade ${activeTab === 0 ? 'show active' : ''}`} id="request-tab-pane">
                              <form onSubmit={(e) => e.preventDefault()} className="request__form">
                                 <span className="title">Personal Data</span>
                                 <div className="row gutter-20">
                                    <div className="col-lg-4">
                                       <div className="form-grp">
                                          <input type="text" placeholder="Name*" />
                                       </div>
                                    </div>
                                    <div className="col-lg-4">
                                       <div className="form-grp">
                                          <input type="email" placeholder="Mail*" />
                                       </div>
                                    </div>
                                    <div className="col-lg-4">
                                       <div className="form-grp">
                                          <input type="text" placeholder="Phone*" />
                                       </div>
                                    </div>
                                 </div>
                                 <span className="title">Shipment Data</span>
                                 <div className="row gutter-20">
                                    <div className="col-lg-4">
                                       <div className="form-grp">
                                          <div className="form-grp select-grp">
                                             <select name="interest" className="orderby">
                                                <option value="Freight Type">Freight Type</option>
                                                <option value="Freight Type">Freight Type</option>
                                                <option value="Freight Type">Freight Type</option>
                                             </select>
                                          </div>
                                       </div>
                                    </div>
                                    <div className="col-lg-4">
                                       <div className="form-grp">
                                          <input type="text" placeholder="City Of Departure" />
                                       </div>
                                    </div>
                                    <div className="col-lg-4">
                                       <div className="form-grp">
                                          <input type="text" placeholder="Delivery City" />
                                       </div>
                                    </div>
                                    <div className="col-lg-4">
                                       <div className="form-grp select-grp">
                                          <select name="interest" className="orderby">
                                             <option value="Incoterms">Incoterms</option>
                                             <option value="Incoterms">Incoterms</option>
                                             <option value="Incoterms">Incoterms</option>
                                          </select>
                                       </div>
                                    </div>
                                    <div className="col-lg-4">
                                       <div className="form-grp-wrap">
                                          <div className="form-grp">
                                             <input type="text" placeholder="Weight" />
                                          </div>
                                          <div className="form-grp">
                                             <input type="text" placeholder="Height" />
                                          </div>
                                       </div>
                                    </div>
                                    <div className="col-lg-4">
                                       <div className="form-grp-wrap">
                                          <div className="form-grp">
                                             <input type="text" placeholder="Weight" />
                                          </div>
                                          <div className="form-grp">
                                             <input type="text" placeholder="Length" />
                                          </div>
                                       </div>
                                    </div>
                                 </div>
                                 <div className={`request__radio-wrap ${style ? "request__radio-wrap-two" : ""}`}>
                                    <div className="form-check">
                                       <input className="form-check-input" type="radio" name="flexRadioDefault" id="flexRadioDefault1" defaultChecked />
                                       <label className="form-check-label" htmlFor="flexRadioDefault1">
                                          Fragile
                                       </label>
                                    </div>
                                    <div className="form-check">
                                       <input className="form-check-input" type="radio" name="flexRadioDefault" id="flexRadioDefault2" />
                                       <label className="form-check-label" htmlFor="flexRadioDefault2">
                                          Express Delivery
                                       </label>
                                    </div>
                                    <div className="form-check">
                                       <input className="form-check-input" type="radio" name="flexRadioDefault" id="flexRadioDefault3" />
                                       <label className="form-check-label" htmlFor="flexRadioDefault3">
                                          Insurance
                                       </label>
                                    </div>
                                    <div className="form-check">
                                       <input className="form-check-input" type="radio" name="flexRadioDefault" id="flexRadioDefault4" />
                                       <label className="form-check-label" htmlFor="flexRadioDefault4">
                                          Packaging
                                       </label>
                                    </div>
                                 </div>
                                 <button type="submit" className="btn">Request a Quote</button>
                              </form>
                           </div>
                           {/* <div className={`tab-pane fade ${activeTab === 1 ? 'show active' : ''}`} id="track-tab-pane">
                              <form onSubmit={(e) => e.preventDefault()} className="request__form">
                                 <span className="title">Shipment Type</span>
                                 <div className="form-grp select-grp">
                                    <select name="interest" className="orderby">
                                       <option value="Incoterms">Incoterms</option>
                                       <option value="Incoterms">Incoterms</option>
                                       <option value="Incoterms">Incoterms</option>
                                    </select>
                                 </div>
                                 <span className="title">Tracking Number</span>
                                 <div className="form-grp">
                                    <textarea name="comment" placeholder="You can enter up to a maximum of 10 airway bill numbers for tracking"></textarea>
                                 </div>
                                 <div className={`request__radio-wrap ${style ? "request__radio-wrap-two" : ""}`}>
                                    <div className="form-check">
                                       <input className="form-check-input" type="radio" name="flexRadioDefault" id="flexRadioDefault5" defaultChecked />
                                       <label className="form-check-label" htmlFor="flexRadioDefault5">
                                          Air Freight
                                       </label>
                                    </div>
                                    <div className="form-check">
                                       <input className="form-check-input" type="radio" name="flexRadioDefault" id="flexRadioDefault6" />
                                       <label className="form-check-label" htmlFor="flexRadioDefault6">
                                          Ocean Freight
                                       </label>
                                    </div>
                                    <div className="form-check">
                                       <input className="form-check-input" type="radio" name="flexRadioDefault" id="flexRadioDefault7" />
                                       <label className="form-check-label" htmlFor="flexRadioDefault7">
                                          Road Freight
                                       </label>
                                    </div>
                                    <div className="form-check">
                                       <input className="form-check-input" type="radio" name="flexRadioDefault" id="flexRadioDefault8" />
                                       <label className="form-check-label" htmlFor="flexRadioDefault8">
                                          Express Delivery
                                       </label>
                                    </div>
                                 </div>
                                 <button type="submit" className="btn">Track & Trace</button>
                              </form>
                           </div> */}
                        </div>
                     </div>
                  </div>
               </div>
            </div>
         </div>
         {style && <div className="request__shape">
            <Image src={request_shape} alt="shape" data-aos="fade-down" data-aos-delay="400" />
         </div>}
      </div>
   )
}

export default RequestArea
