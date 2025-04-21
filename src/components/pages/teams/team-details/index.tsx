import Breadcumb from "@/components/common/Breadcumb"
import ScrollToTop from "@/components/common/ScrollToTop"
import FooterTwo from "@/layouts/footers/FooterTwo"
import HeaderFour from "@/layouts/headers/HeaderFour"
import TeamDetailsArea from "./TeamDetailsArea"

const TeamDetails = () => {
   return (
      <div className="theme-red">
         <ScrollToTop />
         <HeaderFour />
         <main className="fix">
            <Breadcumb title="Team Details" sub_title="Team Details" />
            <TeamDetailsArea />
         </main>
         <FooterTwo />
      </div>
   )
}

export default TeamDetails
