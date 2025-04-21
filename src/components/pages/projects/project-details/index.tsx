import Breadcumb from "@/components/common/Breadcumb"
import ScrollToTop from "@/components/common/ScrollToTop"
import FooterTwo from "@/layouts/footers/FooterTwo"
import HeaderFour from "@/layouts/headers/HeaderFour"
import ProjectDetailsArea from "./ProjectDetailsArea"
import CTA from "../../who-we-are/CTA"

const ProjectDetails = () => {
   return (
      <div className="theme-red">
         <ScrollToTop />
         <HeaderFour />
         <main className="fix">
            <Breadcumb sub_title="Portfolio Details" title="Portfolio Details" />
            <ProjectDetailsArea />
            <CTA />
         </main>
         <FooterTwo style={true} />
      </div>
   )
}

export default ProjectDetails
