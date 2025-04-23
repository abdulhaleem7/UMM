import FooterTwo from "@/layouts/footers/FooterTwo"
import Breadcumb from "../common/Breadcumb"
import Testimonial from "../homes/home-four/Testimonial"
import AboutArea from "./AboutArea"
import Counter from "./Counter"
// import Pricing from "./Pricing"
import VideoArea from "./VideoArea"
import HeaderFour from "@/layouts/headers/HeaderFour"
import ScrollToTop from "../common/ScrollToTop"
import Feature from "../homes/home-four/Feature"
import Brand from "../homes/home-four/Brand"
import Team from "./Team"

const About = () => {
   return (
      <div className="theme-red">
         <HeaderFour />
         <ScrollToTop />
         <main className="fix">
            <Breadcumb sub_title="About Us" title="About Us" />
            <AboutArea />
            <Feature />
            <VideoArea />
            <Counter />
            {/* <Pricing /> */}
            <Team style={false} />
            <Testimonial style={true} />
            <Brand />
            <FooterTwo />
         </main>
      </div>
   )
}

export default About
