import Breadcumb from "@/components/common/Breadcumb"
import ScrollToTop from "@/components/common/ScrollToTop"
import FooterTwo from "@/layouts/footers/FooterTwo"
import HeaderFour from "@/layouts/headers/HeaderFour"
import Testimonial from "./Testimonial"

const TestimonialMain = () => {
  return (
    <div className="theme-red">
      <ScrollToTop />
      <HeaderFour />
      <main className="fix">
        <Breadcumb title="Pricing plan" sub_title="Pricing" />
        <Testimonial />
      </main>
      <FooterTwo />
    </div>
  )
}

export default TestimonialMain
