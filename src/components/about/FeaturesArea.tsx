import Image from "next/image"
import shape from "@/assets/img/images/features_shape.png"

const FeaturesArea = () => {
   return (
      <section className="features__area section-pb-90">
         <div className="container">
            <div className="row justify-content-center gutter-24">
               <div className="col-lg-4 col-md-6" data-aos="fade-up" data-aos-delay="400">
                  <div className="features__item">
                     <div className="features__icon">
                        <i className="flaticon-warehouse-1"></i>
                     </div>
                     <div className="features__content">
                        <h2 className="title">Warehouse</h2>
                        <p>When an unknown printer took a galley typeat better future.</p>
                        <h2 className="number">01</h2>
                     </div>
                  </div>
               </div>
               <div className="col-lg-4 col-md-6" data-aos="fade-up" data-aos-delay="600">
                  <div className="features__item">
                     <div className="features__icon">
                        <i className="flaticon-air-freight"></i>
                     </div>
                     <div className="features__content">
                        <h2 className="title">Air Freight</h2>
                        <p>When an unknown printer took a galley typeat better future.</p>
                        <h2 className="number">02</h2>
                     </div>
                  </div>
               </div>
               <div className="col-lg-4 col-md-6" data-aos="fade-up" data-aos-delay="800">
                  <div className="features__item">
                     <div className="features__icon">
                        <i className="flaticon-ship"></i>
                     </div>
                     <div className="features__content">
                        <h2 className="title">Ship Cargo</h2>
                        <p>When an unknown printer took a galley typeat better future.</p>
                        <h2 className="number">03</h2>
                     </div>
                  </div>
               </div>
            </div>
         </div>
         <div className="features__shape">
            <Image src={shape} alt="shape" data-aos="fade-left" data-aos-delay="400" />
         </div>
      </section>
   )
}

export default FeaturesArea
