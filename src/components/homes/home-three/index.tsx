import HeaderThree from "@/layouts/headers/HeaderThree"
import Hero from "./Hero"
import Features from "./Features"
import About from "./About"
import Brand from "../home-one/Brand"
import Services from "./Services"
import Counter from "./Counter"
import VideoArea from "./VideoArea"
import Project from "./Project"
import MarqueeArea from "../home-one/Marquee"
import Team from "./Team"
import Testimonial from "../home-one/Testimonial"
import Faq from "./Faq"
import Blog from "../home-two/Blog"
import FooterThree from "@/layouts/footers/FooterThree"
import ScrollToTop from "@/components/common/ScrollToTop"

const HomeThree = () => {
   return (
      <div className="theme-orange">
         <ScrollToTop />
         <HeaderThree />
         <main className="fix">
            <Hero />
            <Features />
            <About />
            <Brand style={true} />
            <Services />
            <Counter />
            <VideoArea />
            <Project />
            <MarqueeArea style={false} />
            <Team style={true} />
            <Testimonial style={true} />
            <Faq />
            <Blog />
         </main>
         <FooterThree />
      </div>
   )
}

export default HomeThree
