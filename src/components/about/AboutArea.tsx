import Image from 'next/image'
import Link from 'next/link'
import about_img from "@/assets/img/images/h4_about_img2.jpg"
import about_img2 from "@/assets/img/images/h4_about_img3.jpg"
import about_img3 from "@/assets/img/images/h4_about_img4.jpg"
import Count from '../common/Count'

const AboutArea = () => {
   return (
      <>
         {/* About Area Section */}
         <section className="about-area section-py-120 bg-light-gradient position-relative overflow-hidden">
            {/* Decorative elements */}
            <div className="position-absolute top-0 end-0 w-50 h-100" style={{backgroundColor: '#d70006', opacity: '0.05', clipPath: 'polygon(30% 0, 100% 0, 100% 100%, 0% 100%)'}}></div>
            <div className="position-absolute bottom-0 start-0" style={{zIndex: 0}}>
               <svg width="350" height="350" viewBox="0 0 350 350" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <circle cx="175" cy="175" r="175" fill="#d70006" fillOpacity="0.05"/>
               </svg>
            </div>
            
            <div className="container position-relative" style={{zIndex: 1}}>
               <div className="row align-items-center justify-content-center gutter-24">
                  <div className="col-lg-6 col-md-9 mb-5 mb-lg-0">
                     <div className="about-img-gallery position-relative">
                        {/* Main image with floating badge */}
                        <div className="mb-4 position-relative">
                           <Image 
                              src={about_img} 
                              alt="Moving services" 
                              className="rounded-4 shadow-lg img-fluid" 
                              data-aos="fade-right" 
                              data-aos-delay="200"
                              style={{width: "100%"}}
                           />
                           
                        </div>
                        
                        {/* Image grid */}
                        <div className="row g-3">
                           <div className="col-6">
                              <div className="overflow-hidden rounded-4 shadow-sm" data-aos="fade-up" data-aos-delay="300">
                                 <Image 
                                    src={about_img2} 
                                    alt="Moving expertise" 
                                    className="w-100 rounded-4 img-fluid hover-scale" 
                                    style={{transition: 'transform 0.5s ease'}}
                                 />
                              </div>
                           </div>
                           <div className="col-6">
                              <div className="overflow-hidden rounded-4 shadow-sm" data-aos="fade-up" data-aos-delay="400">
                                 <Image 
                                    src={about_img3} 
                                    alt="Professional movers" 
                                    className="w-100 rounded-4 img-fluid hover-scale" 
                                    style={{transition: 'transform 0.5s ease'}}
                                 />
                              </div>
                           </div>
                        </div>
                        
                        {/* Stats panel */}
                        <div className="bg-white rounded-4 shadow-lg p-4 mt-4" data-aos="fade-up" data-aos-delay="500">
                           <div className="row g-3">
                              <div className="col-md-6">
                                 <div className="d-flex align-items-center">
                                    <div className="p-3 rounded-3 me-3" style={{backgroundColor: 'rgba(215, 0, 6, 0.1)'}}>
                                       <i className="flaticon-planet-earth fs-3" style={{color: '#d70006'}}></i>
                                    </div>
                                    <div>
                                       <h3 className="mb-0 text-dark fw-bold"><Count number={15.9} /></h3>
                                       <span className="text-muted">Clients Worldwide</span>
                                    </div>
                                 </div>
                              </div>
                              <div className="col-md-6">
                                 <div className="d-flex align-items-center">
                                    <div className="p-3 rounded-3 me-3" style={{backgroundColor: 'rgba(215, 0, 6, 0.1)'}}>
                                       <i className="flaticon-package fs-3" style={{color: '#d70006'}}></i>
                                    </div>
                                    <div>
                                       <h3 className="mb-0 text-dark fw-bold"><Count number={9.5} /></h3>
                                       <span className="text-muted">Delivered Goods</span>
                                    </div>
                                 </div>
                              </div>
                           </div>
                        </div>
                     </div>
                  </div>
                  
                  <div className="col-lg-6">
                     <div className="ps-lg-5">
                     <span className="sub-title text-danger fs-4">About The Company</span>
                        <div className="mb-4">
                           <p className="fs-5">At Unified Moving Master, we view moving as more than transporting belongings — it&apos;s about embracing new beginnings. Built on a vision to elevate relocation services, we have earned a trusted reputation across Canada for delivering secure, seamless, and customer-focused moving experiences. Whether moving locally or across provinces, we provide personalized solutions backed by professionalism, innovation, and a commitment to excellence. At Unified Moving Master, we move more than just goods — we move lives forward with care, precision, and trust.</p>
                        </div>
                        
                        {/* Mission & Vision Cards */}
                        <div className="row g-4 mb-4">
                           <div className="col-md-6">
                              <div className="h-100 p-4 rounded-4 shadow" data-aos="fade-up" style={{backgroundColor: '#d70006', color: 'white'}}>
                                 <div className="d-flex align-items-center mb-3">
                                    <div className="bg-white rounded-3 p-2 me-3" style={{color: '#d70006'}}>
                                       <i className="flaticon-target fs-3"></i>
                                    </div>
                                    <h4 className="mb-0 fw-bold">Our Mission</h4>
                                 </div>
                                 <p className="mb-0 opacity-90" style={{color: 'white'}}>To deliver superior relocation services through operational excellence, customer-centric solutions, and continuous improvement.</p>
                              </div>
                           </div>
                           <div className="col-md-6">
                              <div className="h-100 p-4 bg-dark text-white rounded-4 shadow" data-aos="fade-up" data-aos-delay="100">
                                 <div className="d-flex align-items-center mb-3">
                                    <div className="bg-white text-dark rounded-3 p-2 me-3">
                                       <i className="flaticon-vision fs-3"></i>
                                    </div>
                                    <h4 className="mb-0 fw-bold" style={{color: '#d70006'}}>Our Vision</h4>
                                 </div>
                                 <p className="mb-0 opacity-90" style={{color: 'white'}}>To be recognized as Canada&apos;s premier moving company, setting industry benchmarks for quality and innovation.</p>
                              </div>
                           </div>
                        </div>
                        
                        {/* Features List */}
                        <div className="row g-3 mb-4">
                           <div className="col-md-6">
                              <div className="d-flex align-items-start" data-aos="fade-up">
                                 <div className="rounded-3 p-2 me-3" style={{backgroundColor: 'rgba(215, 0, 6, 0.1)', color: '#d70006'}}>
                                    <i className="flaticon-check fs-5"></i>
                                 </div>
                                 <div>
                                    <h5 className="mb-1 fw-bold">Quality Control System</h5>
                                    <p className="text-muted mb-0">Rigorous standards for every move</p>
                                 </div>
                              </div>
                           </div>
                           <div className="col-md-6">
                              <div className="d-flex align-items-start" data-aos="fade-up" data-aos-delay="100">
                                 <div className="rounded-3 p-2 me-3" style={{backgroundColor: 'rgba(215, 0, 6, 0.1)', color: '#d70006'}}>
                                    <i className="flaticon-check fs-5"></i>
                                 </div>
                                 <div>
                                    <h5 className="mb-1 fw-bold">100% Satisfaction</h5>
                                    <p className="text-muted mb-0">Guaranteed peace of mind</p>
                                 </div>
                              </div>
                           </div>
                           <div className="col-md-6">
                              <div className="d-flex align-items-start" data-aos="fade-up" data-aos-delay="200">
                                 <div className="rounded-3 p-2 me-3" style={{backgroundColor: 'rgba(215, 0, 6, 0.1)', color: '#d70006'}}>
                                    <i className="flaticon-check fs-5"></i>
                                 </div>
                                 <div>
                                    <h5 className="mb-1 fw-bold">Professional Team</h5>
                                    <p className="text-muted mb-0">Highly trained specialists</p>
                                 </div>
                              </div>
                           </div>
                           <div className="col-md-6">
                              <div className="d-flex align-items-start" data-aos="fade-up" data-aos-delay="300">
                                 <div className="rounded-3 p-2 me-3" style={{backgroundColor: 'rgba(215, 0, 6, 0.1)', color: '#d70006'}}>
                                    <i className="flaticon-check fs-5"></i>
                                 </div>
                                 <div>
                                    <h5 className="mb-1 fw-bold">Safe & Reliable</h5>
                                    <p className="text-muted mb-0">Your belongings in good hands</p>
                                 </div>
                              </div>
                           </div>
                        </div>
                        
                        {/* Contact Info */}
                        <div className="bg-white rounded-4 shadow-sm p-4 mb-4" data-aos="fade-up" style={{width: "40pc"}}>
                           <div className="row g-3">
                              <div className="col-md-6">
                                 <div className="d-flex align-items-center">
                                    <div className="rounded-3 p-3 me-3" style={{backgroundColor: 'rgba(215, 0, 6, 0.1)', color: '#d70006'}}>
                                       <i className="flaticon-envelope fs-3"></i>
                                    </div>
                                    <div>
                                       <span className="d-block text-muted small">Email Address</span>
                                       <a href="mailto:admin@unifiedmovingmaster.ca" className="fw-bold text-dark">admin@unifiedmovingmaster.ca</a>
                                    </div>
                                 </div>
                              </div>
                              <div className="col-md-6">
                                 <div className="d-flex align-items-center">
                                    <div className="rounded-3 p-3 me-3" style={{backgroundColor: 'rgba(215, 0, 6, 0.1)', color: '#d70006'}}>
                                       <i className="flaticon-telephone fs-3"></i>
                                    </div>
                                    <div>
                                       <span className="d-block text-muted small">Hot Line Number</span>
                                       <a href="tel:+1(365-356-3255)" className="fw-bold text-dark">+1 (365) 356-3255</a>
                                    </div>
                                 </div>
                              </div>
                           </div>
                        </div>
                        
                        {/* CTA Buttons */}
                        <div className="d-flex flex-wrap gap-3" data-aos="fade-up" data-aos-delay="200">
                           <Link href="/contact" className="btn btn-lg px-4 py-3 shadow-sm" style={{backgroundColor: '#d70006', color: 'white'}}>
                              <span className="d-flex align-items-center">
                                 <i className="flaticon-phone-call me-2"></i>
                                 Contact Us
                              </span>
                           </Link>
                           <Link href="/request-a-quote" className="btn btn-outline-dark btn-lg px-4 py-3">
                              <span className="d-flex align-items-center">
                                 <i className="flaticon-quote me-2"></i>
                                 Request A Quote
                              </span>
                           </Link>
                        </div>
                     </div>
                  </div>
               </div>
            </div>
         </section>
      </>
   )
}

export default AboutArea