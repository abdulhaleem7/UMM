import HeaderFour from "@/layouts/headers/HeaderFour"
import Hero from "./Hero"
import Feature from "./Feature"
import About from "./About"
import Service from "./Service"
import Counter from "./Counter"
import Project from "./Project"
import FooterTwo from "@/layouts/footers/FooterTwo"
import Testimonial from "./Testimonial"
import Brand from "./Brand"
import VideoArea from "./VideoArea"
import RequestArea from "./RequestArea"
import WorkArea from "./WorkArea"
import CTA from "./CTA"

const HomeFour = () => {
   return (
      <div className="theme-red">
         <HeaderFour />
         <main className="fix">
            <Hero />
            <Feature />
            <About />
            <Brand />
            <Service />
            <VideoArea style={true} />
            <RequestArea style={true} />
            <Testimonial />
            <Counter />
            <Project />
            <WorkArea />
            <CTA />
            <div className="mb-20"></div>
            <FooterTwo />
         </main>
      </div>
   )
}

export default HomeFour
