import ScrollToTop from "@/components/common/ScrollToTop"
import FooterTwo from "@/layouts/footers/FooterTwo"
import HeaderFour from "@/layouts/headers/HeaderFour"
import ProjectArea from "./ProjectArea"
import Breadcumb from "@/components/common/Breadcumb"

const Project = () => {
   return (
      <div className="theme-red">
         <ScrollToTop />
         <HeaderFour />
         <main className="fix">
            <Breadcumb title="Portfolio" sub_title="Portfolio" />
            <ProjectArea />
         </main>
         <FooterTwo />
      </div>
   )
}

export default Project
