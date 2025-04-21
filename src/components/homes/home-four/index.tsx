import HeaderFour from "@/layouts/headers/HeaderFour"
import Hero from "./Hero"
import Feature from "./Feature"
import About from "./About"
import Brand from "../home-one/Brand"
import Service from "./Service"
import VideoArea from "../home-one/VideoArea"
import RequestArea from "../home-one/RequestArea"
import Counter from "./Counter"
import Project from "./Project"
import WorkArea from "../home-two/WorkArea"
import CTA from "../home-two/CTA"
import FooterTwo from "@/layouts/footers/FooterTwo"
import Testimonial from "./Testimonial"

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
