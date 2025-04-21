import Image from "next/image"
import cta_img from "@/assets/img/images/cta_img.jpg"

const CTA = () => {
   return (
      <section className="cta__area-two">
         <div className="container">
            <div className="cta__wrap-two cta__wrap-three">
               <div className="cta__img">
                  <Image src={cta_img} alt="img" />
               </div>
               <div className="cta__content-two cta__content-three">
                  <div className="content__left">
                     <h2 className="title">Would you Like to get The Best Transport Services?</h2>
                     <p>Experience fast, reliable, and tailored logistics solutions designed to move your business forward.</p>
                  </div>
                  <div className="cta__btn-two cta__btn-three">
                     {/* <Link href="/contact" className="btn">Read More <InjectableSvg src="/assets/img/icon/right_arrow.svg" alt="" className="injectable" /></Link> */}
                  </div>
               </div>
            </div>
         </div>
      </section>
   )
}

export default CTA
