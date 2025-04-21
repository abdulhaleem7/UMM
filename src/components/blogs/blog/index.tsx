import Breadcumb from "@/components/common/Breadcumb"
import ScrollToTop from "@/components/common/ScrollToTop"
import FooterTwo from "@/layouts/footers/FooterTwo"
import HeaderFour from "@/layouts/headers/HeaderFour"
import BlogArea from "./BlogArea"

const Blog = () => {
   return (
      <div className="theme-red">
         <ScrollToTop />
         <HeaderFour />
         <main className="fix">
            <Breadcumb title="Our Blog" sub_title="Blogs" />
            <BlogArea />
         </main>
         <FooterTwo />
      </div>
   )
}
export default Blog
