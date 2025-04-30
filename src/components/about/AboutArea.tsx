// import Image from 'next/image'
// import about_img from "@/assets/img/images/h4_about_img2.jpg"
// import about_shape from "@/assets/img/images/choose_logo.svg"
// import Count from '../common/Count'
import Link from 'next/link'
import "./about.css"
const AboutArea = () => {
   return (
      <section className="about__area-two section-py-120">
         <div className="container">
            {/* <div className="container py-4">
               <div className="image-grid">
                  <Image src={about_img} alt="Birds" />
                  <Image src={about_img} alt="Bread" />
                  <Image src={about_img} alt="People" />
                  <Image src={about_img} alt="Flowers" />
               </div>
            </div> */}


            {/* Content Section */}
            <div className="row gutter-24">
               {/* Left Column - About Content with Mission and Vision */}
               <div className="col-lg-6">
                  <div className="about__content-left p-4 h-100 bg-light rounded shadow-sm">
                     <div className="section__title mb-4">
                        <span className="sub-title d-block text-danger fw-bold mb-2" >About The Company</span>
                     </div>
                     <div className="about-description mb-4">
                        <p>At Unified Moving Master, we view moving as more than transporting belongings — it&apos;s about embracing new beginnings. Built on a vision to elevate relocation services, we have earned a trusted reputation across Canada for delivering secure, seamless, and customer-focused moving experiences. Whether moving locally or across provinces, we provide personalized solutions backed by professionalism, innovation, and a commitment to excellence. At Unified Moving Master, we move more than just goods — we move lives forward with care, precision, and trust.</p>
                     </div>

                     <div className="mission-vision-section">
                        <div className="mission-box mb-4 p-3 bg-white rounded shadow-sm">
                           <h3 className="text-danger fs-4 mb-2">Mission:</h3>
                           <p className="mb-0">To deliver superior relocation services through operational excellence, customer-centric solutions, and a commitment to continuous improvement.</p>
                        </div>
                        <div className="vision-box p-3 bg-white rounded shadow-sm">
                           <h3 className="text-danger fs-4 mb-2">Vision:</h3>
                           <p className="mb-0">To be recognized as Canada&apos;s premier moving company, setting industry benchmarks for quality, innovation, and customer satisfaction.</p>
                        </div>
                     </div>
                     <div className="d-flex flex-wrap gap-3 mt-50">
                        <Link href="/contact" className="btn btn-lg px-4 py-3 shadow-sm" style={{ backgroundColor: '#d70006', color: 'white' }}>
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

               {/* Right Column - Lists and Contact Info */}
               <div className="col-lg-6">
                  <div className="about__content-right p-4 h-100 bg-white rounded shadow-sm">
                     <div className="about__content-inner-three mb-4">
                        <div className="about__list-box about__list-box-five mb-4">
                           <h3 className="fs-4 mb-3 text-danger">We Stand For</h3>
                           <ul className="list-wrap list-unstyled">
                              <li><i className="flaticon-check"></i>Quality Control System</li>
                              <li><i className="flaticon-check"></i>100% Satisfaction Guarantee</li>
                              <li><i className="flaticon-check"></i>Professional and Qualified</li>
                              <li><i className="flaticon-check"></i>Safe, Reliable And Express</li>
                              <li><i className="flaticon-check"></i>Honesty, Integrity and Transparency</li>
                           </ul>
                        </div>

                        <div className="about__list-wrap-two mb-4">
                           <h3 className="fs-4 mb-3 text-danger">Our Advantages</h3>
                           <div className="d-flex flex-column gap-3">
                              <div className="about__list-item-two p-3 bg-light rounded d-flex align-items-center">
                                 <div className="icon me-3">
                                    <i className="flaticon-delivery-cart text-danger fs-2"></i>
                                 </div>
                                 <div className="content">
                                    <h4 className="title fs-5 mb-1">Reliable Delivery</h4>
                                    <p className="mb-0">On-time performance is our promise</p>
                                 </div>
                              </div>
                              <div className="about__list-item-two p-3 bg-light rounded d-flex align-items-center">
                                 <div className="icon me-3">
                                    <i className="flaticon-warehouse-1 text-danger fs-2"></i>
                                 </div>
                                 <div className="content">
                                    <h4 className="title fs-5 mb-1">Trusted Professionals</h4>
                                    <p className="mb-0">Trained drivers and a responsive team</p>
                                 </div>
                              </div>
                           </div>
                        </div>
                     </div>

                     <div className="about__content-bottom-two mt-4 pt-4 border-top">
                        <h3 className="fs-4 mb-3 text-danger">Contact Us</h3>
                        <div className="row">
                           <div className="col-md-6" style={{ width: "auto" }}>
                              <div className="about__contact p-3 bg-light rounded mb-3 d-flex align-items-center">
                                 <div className="icon me-3">
                                    <i className="flaticon-envelope text-white fs-3"></i>
                                 </div>
                                 <div className="content">
                                    <span className="d-block text-muted mb-1">Email Address</span>
                                    <a href="mailto:admin@unifiedmovingmaster.ca" className="fw-bold text-decoration-none">admin@unifiedmovingmaster.ca</a>
                                 </div>
                              </div>
                           </div>
                           <div className="col-md-6" style={{ width: "auto" }}>
                              <div className="about__contact p-3 bg-light rounded mb-3 d-flex align-items-center">
                                 <div className="icon me-3">
                                    <i className="flaticon-telephone text-white fs-3"></i>
                                 </div>
                                 <div className="content">
                                    <span className="d-block text-muted mb-1">Hot Line Number</span>
                                    <a href="tel:+1(365-356-3255)" className="fw-bold text-decoration-none">+1(365-356-3255)</a>
                                 </div>
                              </div>
                           </div>
                        </div>
                     </div>
                  </div>
               </div>
            </div>
         </div>
      </section>
   )
}

export default AboutArea