import Breadcumb from "@/components/common/Breadcumb"
import ScrollToTop from "@/components/common/ScrollToTop"
import HeaderFour from "@/layouts/headers/HeaderFour"
import TeamArea from "./TeamArea"
import FooterTwo from "@/layouts/footers/FooterTwo"

const Team = () => {
   return (
      <div className="theme-red">
         <ScrollToTop />
         <HeaderFour />
         <main className="fix">
            <Breadcumb title="Our Team" sub_title="Team" />
            <TeamArea />
         </main>
         <FooterTwo />
      </div>
   )
}

export default Team
