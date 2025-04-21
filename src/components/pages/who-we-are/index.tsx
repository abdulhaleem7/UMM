import Breadcumb from "@/components/common/Breadcumb"
import ScrollToTop from "@/components/common/ScrollToTop"
import HeaderFour from "@/layouts/headers/HeaderFour"
import Mission from "./Mission"
import Vision from "./Vision"
import FooterTwo from "@/layouts/footers/FooterTwo"
import CTA from "./CTA"

const WhoWeAre = () => {
   return (
      <div className="theme-red">
         <ScrollToTop />
         <HeaderFour />
         <main className="fix">
            <Breadcumb title="Who We Are" sub_title="Who We Are" />
            <Mission />
            <Vision />
            <CTA />
            <FooterTwo style={true} />
         </main>
      </div>
   )
}

export default WhoWeAre
