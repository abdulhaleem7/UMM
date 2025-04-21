import img_1 from "@/assets/img/brand/brand_img01.png"
import img_2 from "@/assets/img/brand/brand_img02.png"
import img_3 from "@/assets/img/brand/brand_img03.png"
import img_4 from "@/assets/img/brand/brand_img04.png"
import img_5 from "@/assets/img/brand/brand_img05.png"
import img_6 from "@/assets/img/brand/brand_img06.png"
import Image, { StaticImageData } from "next/image"

const partner_logo: StaticImageData[] = [img_1, img_2, img_3, img_4, img_5, img_6, img_2, img_2, img_3, img_4, img_5, img_6]

const PartnerArea = () => {
   return (
      <section className="partner__area section-py-120">
         <div className="container">
            <div className="row">
               <div className="col-lg-12">
                  <div className="section__title text-center mb-50">
                     <span className="sub-title">Our Partners</span>
                     <h2 className="title">Our World wide Partners</h2>
                  </div>
               </div>
            </div>
            <div className="row gx-0">
               <div className="col-lg-12">
                  <div className="partner__item-wrap">
                     {partner_logo.map((item, i) => (
                        <div key={i} className="partner__item">
                           <Image src={item} alt="img" />
                        </div>
                     ))}
                  </div>
               </div>
            </div>
         </div>
      </section>
   )
}

export default PartnerArea
