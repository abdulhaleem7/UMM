import Image from "next/image"
import Link from "next/link"
import InjectableSvg from "@/components/common/InjectableSvg"

import banner_title from "@/assets/img/banner/hero_title_img.jpg"
import banner_img from "@/assets/img/banner/h3_hero_img01.png"
import banner_img2 from "@/assets/img/banner/h3_hero_img02.png"
import banner_img3 from "@/assets/img/banner/h3_hero_img03.png"
import banner_shape1 from "@/assets/img/banner/h3_hero_shape01.png"
import banner_shape2 from "@/assets/img/banner/h3_hero_shape02.png"
import banner_shape3 from "@/assets/img/banner/h3_hero_shape03.png"

const Hero = () => {
   return (
      <section className="banner__area-two fix banner__bg-two" style={{ backgroundImage: `url(/assets/img/banner/h3_hero_bg.jpg)` }}>
         <div className="container">
            <div className="row gutter-20 justify-content-center">
               <div className="col-lg-6">
                  <div className="banner__content-two">
                     <h2 className="title" data-aos="fade-up" data-aos-delay="200">Air <Image src={banner_title} alt="" /> Logistics & Cargo Business</h2>
                     <p data-aos="fade-up" data-aos-delay="400">when an unknown printer took a galley type and company need scra make it better future to make attempt type specimen.</p>
                     <div className="banner__btn" data-aos="fade-up" data-aos-delay="600">
                        <Link href="/about" className="btn border-btn">Explore more <InjectableSvg src="/assets/img/icon/right_arrow.svg" alt="" className="injectable" /></Link>
                     </div>
                  </div>
               </div>
               <div className="col-lg-6 col-md-10">
                  <div className="banner__img-two">
                     <Image src={banner_img} alt="img" className="main-img" data-aos="fade-up" data-aos-delay="600" />
                     <div className="shape">
                        <Image src={banner_shape1} alt="shape" />
                        <Image src={banner_shape2} alt="shape" />
                        <Image src={banner_shape3} alt="shape" />
                     </div>
                  </div>
               </div>
            </div>
         </div>
         <div className="banner__shape-wrap-two">
            <Image src={banner_img2} alt="img" data-aos="fade-up" data-aos-delay="1000" />
            <Image src={banner_img3} alt="img" data-aos="fade-left" data-aos-delay="800" />
         </div>
      </section>
   )
}

export default Hero
