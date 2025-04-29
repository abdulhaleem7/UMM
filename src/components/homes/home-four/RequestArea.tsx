"use client"
import Image from "next/image";
import { useState } from "react";
import { toast } from "react-toastify";

import request_shape from "@/assets/img/images/request_shape.svg"


interface PropsType {
   style?: boolean;
}

interface RequestData {
  fullName: string;
  email: string;
  phone: string;
  moveDate: string;
  currentAddress: string;
  newAddress: string;
  localMove: boolean;
  longDistanceMove: boolean;
  officeMove: boolean;
  homeMove: boolean;
  moveTypeOther: boolean;
  packingService: boolean;
  loadingService: boolean;
  furnitureService: boolean;
  storageService: boolean;
  junkService: boolean;
  specialtyService: boolean;
  serviceOther: boolean;
  specialRequests: string;
  contactPhone: boolean;
  contactEmail: boolean;
  contactText: boolean;
}

const RequestArea = ({ style }: PropsType) => {
   const [loading, setLoading] = useState(false);
   const [requestData, setRequestData] = useState<RequestData>({
     fullName: "",
     email: "",
     phone: "",
     moveDate: "",
     currentAddress: "",
     newAddress: "",
     localMove: false,
     longDistanceMove: false,
     officeMove: false,
     homeMove: false,
     moveTypeOther: false,
     packingService: false,
     loadingService: false,
     furnitureService: false,
     storageService: false,
     junkService: false,
     specialtyService: false,
     serviceOther: false,
     specialRequests: "",
     contactPhone: false,
     contactEmail: false,
     contactText: false,
   });


   const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
     const { id, value } = e.target;
     setRequestData(prev => ({
       ...prev,
       [id]: value
     }));
   };

   const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
     const { id, checked } = e.target;
     setRequestData(prev => ({
       ...prev,
       [id]: checked
     }));
   };

   // Helper functions for email template
   const getMoveTypes = () => {
     const moveTypes = [];
     if (requestData.localMove) moveTypes.push("Local Move");
     if (requestData.longDistanceMove) moveTypes.push("Long-Distance Move");
     if (requestData.officeMove) moveTypes.push("Office/Commercial Move");
     if (requestData.homeMove) moveTypes.push("Home Move");
     if (requestData.moveTypeOther) moveTypes.push("Other");
     
     return moveTypes.length > 0 ? moveTypes.join(", ") : "None specified";
   };

   const getServicesNeeded = () => {
     const services = [];
     if (requestData.packingService) services.push("Packing & Unpacking");
     if (requestData.loadingService) services.push("Loading & Unloading");
     if (requestData.furnitureService) services.push("Furniture Disassembly & Reassembly");
     if (requestData.storageService) services.push("Storage Services");
     if (requestData.junkService) services.push("Junk Removal/Dump Runs");
     if (requestData.specialtyService) services.push("Specialty Item Handling");
     if (requestData.serviceOther) services.push("Other");
     
     return services.length > 0 ? services.join(", ") : "None specified";
   };

   const getContactMethods = () => {
     const methods = [];
     if (requestData.contactPhone) methods.push("Phone Call");
     if (requestData.contactEmail) methods.push("Email");
     if (requestData.contactText) methods.push("Text Message");
     
     return methods.length > 0 ? methods.join(", ") : "None specified";
   };

   const getRequestQuoteEmailBody = () => {
     return `
       <div style="font-family: Arial, sans-serif; max-width: 600px; margin: auto; border: 1px solid #ddd; padding: 20px; border-radius: 8px;">
         <h2 style="color: #4169E1; text-align: center;">New Moving Quote Request</h2>
         <p style="font-size: 16px; color: #555;">Hello, you have received a new quote request from your website.</p>
         
         <div style="background-color: #f4f4f4; padding: 15px; border-radius: 5px; margin-bottom: 15px;">
           <h3 style="color: #4169E1; border-bottom: 1px solid #ddd; padding-bottom: 5px;">Contact Information</h3>
           <p><strong style="color: #4169E1;">Full Name:</strong> ${requestData.fullName}</p>
           <p><strong style="color: #4169E1;">Email Address:</strong> ${requestData.email}</p>
           <p><strong style="color: #4169E1;">Phone Number:</strong> ${requestData.phone}</p>
         </div>
         
         <div style="background-color: #f4f4f4; padding: 15px; border-radius: 5px; margin-bottom: 15px;">
           <h3 style="color: #4169E1; border-bottom: 1px solid #ddd; padding-bottom: 5px;">Move Details</h3>
           <p><strong style="color: #4169E1;">Moving Date:</strong> ${requestData.moveDate}</p>
           <p><strong style="color: #4169E1;">Current Address:</strong> ${requestData.currentAddress}</p>
           <p><strong style="color: #4169E1;">New Address:</strong> ${requestData.newAddress}</p>
           
           <p><strong style="color: #4169E1;">Move Type:</strong> ${getMoveTypes()}</p>
           <p><strong style="color: #4169E1;">Services Needed:</strong> ${getServicesNeeded()}</p>
         </div>
         
         <div style="background-color: #f4f4f4; padding: 15px; border-radius: 5px; margin-bottom: 15px;">
           <h3 style="color: #4169E1; border-bottom: 1px solid #ddd; padding-bottom: 5px;">Additional Details</h3>
           <p><strong style="color: #4169E1;">Special Requests:</strong></p>
           <p style="background-color: #fff; padding: 10px; border-radius: 3px;">${requestData.specialRequests}</p>
           <p><strong style="color: #4169E1;">Preferred Contact Method:</strong> ${getContactMethods()}</p>
         </div>
         
         <p style="font-size: 12px; color: #777; text-align: center; margin-top: 20px;">This is an automated email sent from your Borderless Movers quote request form.</p>
       </div>
     `;
   };

   const validateForm = () => {
     // Check required fields
     if (!requestData.fullName) {
       toast.error("Full Name is required");
       return false;
     }
     if (!requestData.email) {
       toast.error("Email Address is required");
       return false;
     }
     if (!requestData.phone) {
       toast.error("Phone Number is required");
       return false;
     }
     if (!requestData.moveDate) {
       toast.error("Moving Date is required");
       return false;
     }
     if (!requestData.currentAddress) {
       toast.error("Current Address is required");
       return false;
     }
     if (!requestData.newAddress) {
       toast.error("New Address is required");
       return false;
     }
     
     // Check if at least one move type is selected
     const hasMoveType = requestData.localMove || requestData.longDistanceMove || 
                         requestData.officeMove || requestData.homeMove || 
                         requestData.moveTypeOther;
     if (!hasMoveType) {
       toast.error("Please select at least one Move Type");
       return false;
     }
     
     // Check if at least one service is selected
     const hasService = requestData.packingService || requestData.loadingService || 
                       requestData.furnitureService || requestData.storageService || 
                       requestData.junkService || requestData.specialtyService || 
                       requestData.serviceOther;
     if (!hasService) {
       toast.error("Please select at least one Service");
       return false;
     }
     
     // Check if special requests is provided
     if (!requestData.specialRequests) {
       toast.error("Please provide details about your move");
       return false;
     }
     
     // Check if at least one contact method is selected
     const hasContactMethod = requestData.contactPhone || requestData.contactEmail || 
                             requestData.contactText;
     if (!hasContactMethod) {
       toast.error("Please select at least one Preferred Contact Method");
       return false;
     }
     
     return true;
   };

   const sendEmail = async () => {
     const emailRequest = {
       emailBdy: getRequestQuoteEmailBody(),
       senderEmail: requestData.email,
       subject: "New Moving Quote Request",
     };
     
     try {
       const response = await fetch("/api/send-email", {
         method: "POST",
         headers: {
           "Content-Type": "application/json",
         },
         body: JSON.stringify(emailRequest),
       });
   
       const data = await response.json();
   
       if (!response.ok) {
         throw new Error(data.error || "Failed to send email");
       }
       
       return true; // Indicate success
     } catch (error) {
       console.error("Failed to send email:", error);
       toast.warning("Quote request saved, but confirmation email could not be sent");
       return false;
     }
   };

   const handleSubmit = async (e: React.FormEvent) => {
     e.preventDefault();
     
     if (!validateForm()) {
       return;
     }
     
     setLoading(true);
     
     try {
       // Send the email
       const emailSent = await sendEmail();
       
       // Reset form and show success message
       if (emailSent) {
         setRequestData({
           fullName: "",
           email: "",
           phone: "",
           moveDate: "",
           currentAddress: "",
           newAddress: "",
           localMove: false,
           longDistanceMove: false,
           officeMove: false,
           homeMove: false,
           moveTypeOther: false,
           packingService: false,
           loadingService: false,
           furnitureService: false,
           storageService: false,
           junkService: false,
           specialtyService: false,
           serviceOther: false,
           specialRequests: "",
           contactPhone: false,
           contactEmail: false,
           contactText: false,
         });
         toast.success("Your quote request has been submitted successfully!");
       }
     } catch (error) {
       console.error("Error submitting form:", error);
       toast.error("Failed to submit your quote request. Please try again.");
     } finally {
       setLoading(false);
     }
   };

   return (
      <section className="about__area-two section-py-120">
         <div className="container">
            <div className="row">
               <div className="col-lg-12">
                  <div className="request__wrap">
                     {/* <div className="request__nav">
                        <ul className={`nav nav-tabs ${style ? "request__nav-two" : ""}`} id="myTab">
                           {tab_title.map((tab, index) => (
                              <li key={index} onClick={() => handleTabClick(index)} className="nav-item" role="presentation">
                                 <button className={`nav-link ${activeTab === index ? "active" : ""}`}>{tab}</button>
                              </li>
                           ))}
                        </ul>
                     </div> */}
                     <div className="request__tab-wrap">
                        <div className="tab-content" id="myTabContent">
                           <div className={`tab-pane fade ${activeTab === 0 ? 'show active' : ''}`} id="request-tab-pane">
                              <form onSubmit={handleSubmit} className="request__form">
                                 <span className="title">Contact Information</span>
                                 <div className="row gutter-20">
                                    <div className="col-lg-12">
                                       <div className="form-grp">
                                          <label htmlFor="fullName">Full Name <span className="text-danger">*</span></label>
                                          <input 
                                            type="text" 
                                            id="fullName" 
                                            placeholder="Your Full Name" 
                                            value={requestData.fullName}
                                            onChange={handleInputChange}
                                          />
                                       </div>
                                    </div>
                                    <div className="col-lg-6">
                                       <div className="form-grp">
                                          <label htmlFor="email">Email Address <span className="text-danger">*</span></label>
                                          <input 
                                            type="email" 
                                            id="email" 
                                            placeholder="Your Email Address" 
                                            value={requestData.email}
                                            onChange={handleInputChange}
                                          />
                                       </div>
                                    </div>
                                    <div className="col-lg-6">
                                       <div className="form-grp">
                                          <label htmlFor="phone">Phone Number <span className="text-danger">*</span></label>
                                          <div className="input-group">
                                             {/* <span className="input-group-text">+1</span> */}
                                             <input 
                                               type="tel" 
                                               id="phone" 
                                               placeholder="Your Phone Number" 
                                               value={requestData.phone}
                                               onChange={handleInputChange}
                                             />
                                          </div>
                                       </div>
                                    </div>
                                 </div>

                                 <span className="title mt-4">Move Details</span>
                                 <div className="row gutter-20">
                                    <div className="col-lg-12">
                                       <div className="form-grp">
                                          <label htmlFor="moveDate">Moving Date <span className="text-danger">*</span></label>
                                          <input 
                                            type="date" 
                                            id="moveDate" 
                                            placeholder="Your Move Date" 
                                            value={requestData.moveDate}
                                            onChange={handleInputChange}
                                          />
                                       </div>
                                    </div>
                                    <div className="col-lg-6">
                                       <div className="form-grp">
                                          <label htmlFor="currentAddress">Current Address <span className="text-danger">*</span></label>
                                          <input 
                                            type="text" 
                                            id="currentAddress" 
                                            placeholder="Your Current Address" 
                                            value={requestData.currentAddress}
                                            onChange={handleInputChange}
                                          />
                                       </div>
                                    </div>
                                    <div className="col-lg-6">
                                       <div className="form-grp">
                                          <label htmlFor="newAddress">New Address <span className="text-danger">*</span></label>
                                          <input 
                                            type="text" 
                                            id="newAddress" 
                                            placeholder="Your New Address" 
                                            value={requestData.newAddress}
                                            onChange={handleInputChange}
                                          />
                                       </div>
                                    </div>
                                 </div>

                                 <div className="row mt-4">
                                    <div className="col-lg-6">
                                       <span className="subtitle">Move Type <span className="text-danger">*</span></span>
                                       <div className="request__checkbox-wrap">
                                          <div className="form-check request__radio-wrap-two">
                                             <input 
                                               className="form-check-input text-danger" 
                                               type="checkbox" 
                                               id="localMove" 
                                               checked={requestData.localMove}
                                               onChange={handleCheckboxChange}
                                             />
                                             <label className="form-check-label" htmlFor="localMove">
                                                Local Move
                                             </label>
                                          </div>
                                          <div className="form-check request__radio-wrap-two">
                                             <input 
                                               className="form-check-input text-danger" 
                                               type="checkbox" 
                                               id="longDistanceMove" 
                                               checked={requestData.longDistanceMove}
                                               onChange={handleCheckboxChange}
                                             />
                                             <label className="form-check-label" htmlFor="longDistanceMove">
                                                Long-Distance Move
                                             </label>
                                          </div>
                                          <div className="form-check request__radio-wrap-two">
                                             <input 
                                               className="form-check-input text-danger" 
                                               type="checkbox" 
                                               id="officeMove" 
                                               checked={requestData.officeMove}
                                               onChange={handleCheckboxChange}
                                             />
                                             <label className="form-check-label" htmlFor="officeMove">
                                                Office/Commercial Move
                                             </label>
                                          </div>
                                          <div className="form-check request__radio-wrap-two">
                                             <input 
                                               className="form-check-input text-danger" 
                                               type="checkbox" 
                                               id="homeMove" 
                                               checked={requestData.homeMove}
                                               onChange={handleCheckboxChange}
                                             />
                                             <label className="form-check-label" htmlFor="homeMove">
                                                Home Move
                                             </label>
                                          </div>
                                          <div className="form-check request__radio-wrap-two">
                                             <input 
                                               className="form-check-input text-danger" 
                                               type="checkbox" 
                                               id="moveTypeOther" 
                                               checked={requestData.moveTypeOther}
                                               onChange={handleCheckboxChange}
                                             />
                                             <label className="form-check-label" htmlFor="moveTypeOther">
                                                Other
                                             </label>
                                          </div>
                                          <small className="form-text text-muted">Select all options that apply</small>
                                       </div>
                                    </div>
                                    <div className="col-lg-6">
                                       <span className="subtitle">Services Needed <span className="text-danger">*</span></span>
                                       <div className="request__checkbox-wrap">
                                          <div className="form-check request__radio-wrap-two">
                                             <input 
                                               className="form-check-input" 
                                               type="checkbox" 

                                               id="packingService" 
                                               checked={requestData.packingService}
                                               onChange={handleCheckboxChange}
                                             />
                                             <label className="form-check-label" htmlFor="packingService">
                                                Packing & Unpacking
                                             </label>
                                          </div>
                                          <div className="form-check request__radio-wrap-two">
                                             <input 
                                               className="form-check-input text-danger" 
                                               type="checkbox" 
                                               id="loadingService" 
                                               checked={requestData.loadingService}
                                               onChange={handleCheckboxChange}
                                             />
                                             <label className="form-check-label" htmlFor="loadingService">
                                                Loading & Unloading
                                             </label>
                                          </div>
                                          <div className="form-check request__radio-wrap-two">
                                             <input 
                                               className="form-check-input text-danger" 
                                               type="checkbox" 
                                               id="furnitureService" 
                                               checked={requestData.furnitureService}
                                               onChange={handleCheckboxChange}
                                             />
                                             <label className="form-check-label" htmlFor="furnitureService">
                                                Furniture Disassembly & Reassembly
                                             </label>
                                          </div>
                                          <div className="form-check request__radio-wrap-two">
                                             <input 
                                               className="form-check-input text-danger" 
                                               type="checkbox" 
                                               id="storageService" 
                                               checked={requestData.storageService}
                                               onChange={handleCheckboxChange}
                                             />
                                             <label className="form-check-label" htmlFor="storageService">
                                                Storage Services
                                             </label>
                                          </div>
                                          <div className="form-check request__radio-wrap-two">
                                             <input 
                                               className="form-check-input text-danger" 
                                               type="checkbox" 
                                               id="junkService" 
                                               checked={requestData.junkService}
                                               onChange={handleCheckboxChange}
                                             />
                                             <label className="form-check-label" htmlFor="junkService">
                                                Junk Removal/Dump Runs
                                             </label>
                                          </div>
                                          <div className="form-check request__radio-wrap-two">
                                             <input 
                                               className="form-check-input text-danger" 
                                               type="checkbox" 
                                               id="specialtyService" 
                                               checked={requestData.specialtyService}
                                               onChange={handleCheckboxChange}
                                             />
                                             <label className="form-check-label" htmlFor="specialtyService">
                                                Specialty Item Handling (Pianos, Antiques, Fragile Items)
                                             </label>
                                          </div>
                                          <div className="form-check request__radio-wrap-two">
                                             <input 
                                               className="form-check-input text-danger" 
                                               type="checkbox" 
                                               id="serviceOther" 
                                               checked={requestData.serviceOther}
                                               onChange={handleCheckboxChange}
                                             />
                                             <label className="form-check-label" htmlFor="serviceOther">
                                                Other
                                             </label>
                                          </div>
                                          <small className="form-text text-muted">Select all options that apply</small>
                                       </div>
                                    </div>
                                 </div>

                                 <span className="title mt-4">Additional Details</span>
                                 <div className="row gutter-20">
                                    <div className="col-lg-12">
                                       <div className="form-grp">
                                          <label htmlFor="specialRequests">Please Provide Any Special Requests Or Details About Your Move <span className="text-danger">*</span></label>
                                          <textarea 
                                            id="specialRequests" 
                                            placeholder="Type Message Here" 
                                            rows={6}
                                            value={requestData.specialRequests}
                                            onChange={handleInputChange}
                                          ></textarea>
                                       </div>
                                    </div>
                                 </div>
                                 
                                 <div className="row mt-4">
                                    <div className="col-lg-12">
                                       <span className="subtitle">Preferred Contact Method <span className="text-danger">*</span></span>
                                       <div className="request__checkbox-wrap d-flex">
                                          <div className="form-check request__radio-wrap-two me-4">
                                             <input 
                                               className="form-check-input text-danger" 
                                               type="checkbox" 
                                               id="contactPhone" 
                                               checked={requestData.contactPhone}
                                               onChange={handleCheckboxChange}
                                             />
                                             <label className="form-check-label" htmlFor="contactPhone">
                                                Phone Call
                                             </label>
                                          </div>
                                          <div className="form-check request__radio-wrap-two me-4">
                                             <input 
                                               className="form-check-input text-danger" 
                                               type="checkbox" 
                                               id="contactEmail" 
                                               checked={requestData.contactEmail}
                                               onChange={handleCheckboxChange}
                                             />
                                             <label className="form-check-label" htmlFor="contactEmail">
                                                Email
                                             </label>
                                          </div>
                                          <div className="form-check request__radio-wrap-two">
                                             <input 
                                               className="form-check-input text-danger" 
                                               type="checkbox" 
                                               id="contactText" 
                                               checked={requestData.contactText}
                                               onChange={handleCheckboxChange}
                                             />
                                             <label className="form-check-label" htmlFor="contactText">
                                                Text Message
                                             </label>
                                          </div>
                                       </div>
                                       <small className="form-text text-muted d-block mb-4">Select all options that apply</small>
                                    </div>
                                 </div>

                                 <button 
                                    type="submit" 
                                    className="btn w-100 py-3" 
                                    disabled={loading}
                                 >
                                    {loading ? 'SENDING REQUEST...' : 'SUBMIT YOUR REQUEST'}
                                 </button>
                              </form>
                           </div>
                        </div>
                     </div>
                  </div>
               </div>
            </div>
         </div>
         {style && <div className="request__shape">
            <Image src={request_shape} alt="shape" data-aos="fade-down" data-aos-delay="400" />
         </div>}
      </section>
   )
}

export default RequestArea