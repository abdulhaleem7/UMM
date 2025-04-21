import Breadcumb from "@/components/common/Breadcumb"
import ScrollToTop from "@/components/common/ScrollToTop"
import FooterTwo from "@/layouts/footers/FooterTwo"
import HeaderFour from "@/layouts/headers/HeaderFour"
import PartnerArea from "./PartnerArea"

const Client = () => {
   return (
      <div className="theme-red">
         <ScrollToTop />
         <HeaderFour />
         <main className="fix">
            <Breadcumb title="Our Partners" sub_title="Partners" />
            <PartnerArea />
         </main>
         <FooterTwo />
      </div>
   )
}

export default Client
