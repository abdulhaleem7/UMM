import Breadcumb from "@/components/common/Breadcumb"
import ScrollToTop from "@/components/common/ScrollToTop"
import FooterTwo from "@/layouts/footers/FooterTwo"
import HeaderFour from "@/layouts/headers/HeaderFour"
import ContactArea from "./ContactArea"

const Contact = () => {
   return (
      <div className="theme-red">
         <ScrollToTop />
         <HeaderFour />
         <main className="fix">
            <Breadcumb title="Contact Us" sub_title="Contact" />
            <ContactArea />
         </main>
         <FooterTwo />
      </div>
   )
}

export default Contact
