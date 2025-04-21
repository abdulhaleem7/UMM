"use client"
import Image from "next/image"

import shape_1 from "@/assets/img/images/newsletter_shape01.svg"
import shape_2 from "@/assets/img/images/newsletter_shape02.svg"

const Newsletter = () => {
   return (
      <section className="newsletter__area">
         <div className="container">
            <div className="newsletter__wrap">
               <div className="row gx-0">
                  <div className="col-lg-6">
                     <div className="newsletter__content-left">
                        <div className="experiences__wrap">
                           <h2 className="count">30</h2>
                           <span>Of Year <strong>Experiences</strong></span>
                        </div>
                        <h2 className="title">Have A Wide Range Of Logistics Solution Your Next Business.</h2>
                        <Image src={shape_1} alt="" className="shape" />
                     </div>
                  </div>
                  <div className="col-lg-6">
                     <div className="newsletter__content">
                        <h2 className="title"><i className="flaticon-waving-flag"></i>Track & Trace</h2>
                        <form onSubmit={(e) => e.preventDefault()} className="newsletter__form">
                           <input type="text" placeholder="Enter Tracking Number" />
                           <button type="submit">Track & trace</button>
                        </form>
                        <Image src={shape_2} alt="" className="shape rotateme-two" />
                     </div>
                  </div>
               </div>
            </div>
         </div>
      </section>
   )
}

export default Newsletter
