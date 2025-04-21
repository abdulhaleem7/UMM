import Breadcumb from "@/components/common/Breadcumb"
import HeaderFour from "@/layouts/headers/HeaderFour"
import ServiceArea from "./ServiceArea"
import FooterTwo from "@/layouts/footers/FooterTwo"
import ScrollToTop from "@/components/common/ScrollToTop"

const Service = () => {
   return (
      <div className="theme-red">
         <ScrollToTop />
         <HeaderFour />
         <main className="fix">
            <Breadcumb title="Our Services" sub_title="Services" />
            <ServiceArea />
         </main>
         <FooterTwo />
      </div>
   )
}

export default Service
