import Count from "@/components/common/Count"
import Image from "next/image"

import shape_1 from "@/assets/img/images/features_shape.svg"

const Features = () => {
   return (
      <section className="features__area-two">
         <div className="container">
            <div className="row gx-0 align-items-center">
               <div className="col-lg-7 order-0 order-lg-2">
                  <div className="features__item-wrap">
                     <div className="features__item-two">
                        <div className="features__icon-two">
                           <i className="flaticon-air-freight"></i>
                        </div>
                        <div className="features__content-two">
                           <h2 className="title">General Air Freight</h2>
                           <p>There many variations passag esmery available the majore many variatis passages remery ailable.</p>
                        </div>
                     </div>
                     <div className="features__item-two">
                        <div className="features__icon-two">
                           <i className="flaticon-delivery-cart"></i>
                        </div>
                        <div className="features__content-two">
                           <h2 className="title">Product Delivery</h2>
                           <p>There many variations passag esmery available the majore many variatis passages remery ailable.</p>
                        </div>
                     </div>
                  </div>
               </div>
               <div className="col-lg-5">
                  <div className="features__content-wrap">
                     <div className="section__title white-title mb-35">
                        <h2 className="title">best transport & <br /> logistic company</h2>
                     </div>
                     <div className="counter__wrap counter__wrap-two">
                        <div className="counter__item counter__item-four">
                           <div className="counter__icon counter__icon-four">
                              <i className="flaticon-package"></i>
                           </div>
                           <div className="counter__content">
                              <h2 className="count"><span className="counter-number"><Count number={9.5} /></span>M</h2>
                              <p>Delivered Goods</p>
                           </div>
                        </div>
                        <div className="counter__item counter__item-four">
                           <div className="counter__icon counter__icon-four">
                              <i className="flaticon-planet-earth"></i>
                           </div>
                           <div className="counter__content">
                              <h2 className="count"><span className="counter-number"><Count number={15.9} /></span>M</h2>
                              <p>Clients Worldwide</p>
                           </div>
                        </div>
                     </div>
                     <Image src={shape_1} alt="shape" className="shape" />
                  </div>
               </div>
            </div>
         </div>
      </section>
   )
}

export default Features
