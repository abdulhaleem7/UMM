import Breadcumb from "@/components/common/Breadcumb"
import ScrollToTop from "@/components/common/ScrollToTop"
import HeaderFour from "@/layouts/headers/HeaderFour"
import ServiceDetailsArea from "./ServiceDetailsArea"
import CTA from "../../who-we-are/CTA"
import FooterTwo from "@/layouts/footers/FooterTwo"

const ServiceDetails = () => {
   return (
      <div className="theme-red">
         <ScrollToTop />
         <HeaderFour />
         <main className="fix">
            <Breadcumb title="Service Details" sub_title="Service Details" />
            <ServiceDetailsArea />
         </main>
         <CTA />
         <FooterTwo style={true} />
      </div>
   )
}

export default ServiceDetails
