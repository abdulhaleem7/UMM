"use client"
import VideoPopup from "@/modals/VideoPopup"
import { useState } from "react"
import Image from "next/image"
import ServiceSidebar from "./ServiceSidebar"
import { useInView } from "react-intersection-observer";

import service_details1 from "@/assets/img/services/services_img01.jpg"
import service_details2 from "@/assets/img/services/services_details_inner_img.jpg"

const ServiceDetailsArea = () => {

  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.75,
  });

  const [isVideoOpen, setIsVideoOpen] = useState(false);

  return (
    <>
      <section className="services__details-area section-py-130">
        <div className="container">
          <div className="services__details-inner">
            <div className="row">
              <div className="col-70 order-0 order-lg-2">
                <div className="services__details-thumb">
                  <Image src={service_details1} alt="img" />
                </div>
                <div className="services__details-content">
                  <h2 className="title">Modern Business Investment Planning</h2>
                  <p>Shipping freight refers to the transportation of large quantities of goods or cargo by sea, air, or land. Freight can be shipped in various types of containers such as boxes, crates, barrels, or pallets. The transportation of goods by freight is typically arranged through a shipping company or freight forwarder, which handles the logistics of the shipment, including the booking of cargo space, transportation, customs clearance, and delivery.</p>
                  <div className="services__details-content-inner">
                    <div className="row align-items-end">
                      <div className="col-md-6">
                        <h2 className="title-two">Our Next Level Logistics Around the World</h2>
                        <p>With over four decades experience providing solutions largee enterprises throughout the globe we offer endend istics tailored for specific markets.</p>
                      </div>
                      <div className="col-md-6">
                        <div className="progress__wrap progress__wrap-three" ref={ref}>
                          <div className="progress__item progress__item-three">
                            <div className="progress__item-top">
                              <h3 className="progress__title">Successful Delivery</h3>
                              <div className="progress-value"><span className="counter-number">82</span>%</div>
                            </div>
                            <div className="progress">
                              <div className="progress-bar"
                                style={{
                                  width: "82%",
                                  animation: inView ? "animate-positive 1.8s" : "none",
                                  opacity: inView ? "1" : "0",
                                }}></div>
                            </div>
                          </div>
                          <div className="progress__item progress__item-three">
                            <div className="progress__item-top">
                              <h3 className="progress__title">Happy Customers</h3>
                              <div className="progress-value"><span className="counter-number">90</span>%</div>
                            </div>
                            <div className="progress">
                              <div className="progress-bar"
                                style={{
                                  width: "90%",
                                  animation: inView ? "animate-positive 1.8s" : "none",
                                  opacity: inView ? "1" : "0",
                                }}></div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <p>when an unknown printer took a galley of type and scrambled it to make a type specimen bookhas survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchan galley of type and scrambled it to make a type specimen book.</p>
                  <div className="services__details-content-inner-two">
                    <div className="row gutter-24">
                      <div className="col-44">
                        <div className="services__details-inner-img">
                          <Image src={service_details2} alt="img" />
                          <a onClick={() => setIsVideoOpen(true)} style={{ cursor: "pointer" }} className="play-btn popup-video"><i className="fas fa-play"></i></a>
                        </div>
                      </div>
                      <div className="col-56">
                        <h2 className="title-two">Raise capital faster & negotiate on your own terms</h2>
                        <p>when an unknown printer took a galley of type and scrambled it to make a type specimen bookhas survived not only five centuries.</p>
                        <div className="about__list-box about__list-box-two about__list-box-three">
                          <ul className="list-wrap">
                            <li><i className="flaticon-check"></i>Quality Control System</li>
                            <li><i className="flaticon-check"></i>100% Satisfaction Guarantee</li>
                            <li><i className="flaticon-check"></i>Professional and Qualified</li>
                            <li><i className="flaticon-check"></i>Safe, Reliable And Express</li>
                          </ul>
                        </div>
                      </div>
                    </div>
                  </div>
                  when an unknown printer took a galley of type and scrambled it to make a type specimen bookhas survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchan galley of type and scrambled it to make a type specimen book.
                  <div className="services__details-benefit">
                    <h2 className="title-two">Service Key Benefits</h2>
                    <p>With over four decades experience providing solutions largee enterprises throughout the globe we offer endend istics tailored for specific markets.</p>
                    <div className="faq__wrap">
                      <div className="accordion" id="accordionExample">
                        <div className="accordion-item">
                          <h2 className="accordion-header">
                            <button className="accordion-button" type="button" data-bs-toggle="collapse" data-bs-target="#collapseOne" aria-expanded="true" aria-controls="collapseOne">
                              Which Plan Is Right For Me?
                            </button>
                          </h2>
                          <div id="collapseOne" className="accordion-collapse collapse show" data-bs-parent="#accordionExample">
                            <div className="accordion-body">
                              <p>Shipping an unknown printer took a galley of type and scrambled it to make a type specimen bookhas survived not only five centuries, but also the leap into electronic typesetting.</p>
                            </div>
                          </div>
                        </div>
                        <div className="accordion-item">
                          <h2 className="accordion-header">
                            <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapseTwo" aria-expanded="false" aria-controls="collapseTwo">
                              Do I have to commit to a contract?
                            </button>
                          </h2>
                          <div id="collapseTwo" className="accordion-collapse collapse" data-bs-parent="#accordionExample">
                            <div className="accordion-body">
                              <p>Shipping an unknown printer took a galley of type and scrambled it to make a type specimen bookhas survived not only five centuries, but also the leap into electronic typesetting.</p>
                            </div>
                          </div>
                        </div>
                        <div className="accordion-item">
                          <h2 className="accordion-header">
                            <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapseThree" aria-expanded="false" aria-controls="collapseThree">
                              What Payment Methods Are Available?
                            </button>
                          </h2>
                          <div id="collapseThree" className="accordion-collapse collapse" data-bs-parent="#accordionExample">
                            <div className="accordion-body">
                              <p>Shipping an unknown printer took a galley of type and scrambled it to make a type specimen bookhas survived not only five centuries, but also the leap into electronic typesetting.</p>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <ServiceSidebar />
            </div>
          </div>
        </div>
      </section>
      <VideoPopup
        isVideoOpen={isVideoOpen}
        setIsVideoOpen={setIsVideoOpen}
        videoId={"Ml4XCF-JS0k"}
      />
    </>
  )
}

export default ServiceDetailsArea
