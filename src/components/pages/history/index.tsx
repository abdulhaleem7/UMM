import Breadcumb from "@/components/common/Breadcumb"
import HeaderFour from "@/layouts/headers/HeaderFour"
import HistoryArea from "./HistoryArea"
import MarqueeArea from "@/components/homes/home-one/Marquee"
import Testimonial from "./Testimonial"
import Brand from "@/components/homes/home-one/Brand"
import FooterTwo from "@/layouts/footers/FooterTwo"
import ScrollToTop from "@/components/common/ScrollToTop"

const History = () => {
   return (
      <div className="theme-red">
         <ScrollToTop />
         <HeaderFour />
         <main className="fix">
            <Breadcumb title="Our Company History" sub_title="History" />
            <HistoryArea />
            <MarqueeArea style={true} />
            <Testimonial />
            <Brand />
         </main>
         <FooterTwo />
      </div>
   )
}

export default History
