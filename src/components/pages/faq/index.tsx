import Breadcumb from "@/components/common/Breadcumb"
import ScrollToTop from "@/components/common/ScrollToTop"
import FooterTwo from "@/layouts/footers/FooterTwo"
import HeaderFour from "@/layouts/headers/HeaderFour"
import FaqArea from "./FaqArea"

const Faq = () => {
   return (
      <div className="theme-red">
         <ScrollToTop />
         <HeaderFour />
         <main className="fix">
            <Breadcumb title="Faq’s" sub_title="Faq’s" />
            <FaqArea />
         </main>
         <FooterTwo />
      </div>
   )
}

export default Faq
