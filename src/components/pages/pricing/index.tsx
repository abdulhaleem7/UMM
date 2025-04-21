import Breadcumb from "@/components/common/Breadcumb"
import ScrollToTop from "@/components/common/ScrollToTop"
import FooterTwo from "@/layouts/footers/FooterTwo"
import HeaderFour from "@/layouts/headers/HeaderFour"
import PricingArea from "./PricingArea"

const Pricing = () => {
   return (
      <div className="theme-red">
         <ScrollToTop />
         <HeaderFour />
         <main className="fix">
            <Breadcumb title="Pricing plan" sub_title="Pricing" />
            <PricingArea />
         </main>
         <FooterTwo />
      </div>
   )
}

export default Pricing
