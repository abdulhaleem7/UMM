import FooterTwo from "@/layouts/footers/FooterTwo"
import HeaderTwo from "@/layouts/headers/HeaderTwo"
import Hero from "./Hero"
import Newsletter from "./Newsletter"
import About from "./About"
import Service from "./Service"
import VideoArea from "../home-one/VideoArea"
import RequestArea from "../home-one/RequestArea"
import ChooseArea from "./ChooseArea"
import Project from "./Project"
import MarqueeArea from "../home-one/Marquee"
import WorkArea from "./WorkArea"
import CTA from "./CTA"
import Team from "./Team"
import Testimonial from "../home-one/Testimonial"
import Brand from "../home-one/Brand"
import Blog from "./Blog"
import ScrollToTop from "@/components/common/ScrollToTop"

const HomeTwo = () => {
   return (
      <div className="theme-red">
        <ScrollToTop />
         <HeaderTwo />
         <main className="fix">
            <Hero />
            <Newsletter />
            <About />
            <Service />
            <VideoArea style={true} />
            <RequestArea style={true} />
            <ChooseArea />
            <div className="area__bg section-pt-130" style={{ backgroundImage: `url(/assets/img/bg/vector_bg03.svg)` }}>
               <Project />
               <MarqueeArea style={true} />
            </div>
            <WorkArea />
            <CTA />
            <Team />
            <Testimonial style={true} />
            <Brand style={false} />
            <Blog />
         </main>
         <FooterTwo />
      </div>
   )
}

export default HomeTwo
