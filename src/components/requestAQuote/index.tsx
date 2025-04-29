import FooterTwo from "@/layouts/footers/FooterTwo"
import Breadcumb from "../common/Breadcumb"
import Testimonial from "../homes/home-four/Testimonial"
import HeaderFour from "@/layouts/headers/HeaderFour"
import ScrollToTop from "../common/ScrollToTop"
import RequestArea from "../homes/home-four/RequestArea"

const RequestAQuote = () => {
   return (
      <div className="theme-red">
         <HeaderFour />
         <ScrollToTop />
         <main className="fix">
            <Breadcumb sub_title="Request A Quote" title="Request A Quote" />
            <RequestArea />
            <Testimonial style={true} />
            <FooterTwo />
         </main>
      </div>
   )
}

export default RequestAQuote
