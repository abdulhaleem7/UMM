import Breadcumb from "@/components/common/Breadcumb"
import ScrollToTop from "@/components/common/ScrollToTop"
import FooterTwo from "@/layouts/footers/FooterTwo"
import HeaderFour from "@/layouts/headers/HeaderFour"
import BlogDetailsArea from "./BlogDetailsArea"

const BlogDetails = () => {
   return (
      <div className="theme-red">
         <ScrollToTop />
         <HeaderFour />
         <main className="fix">
            <Breadcumb title="Blog Details" sub_title="Blog Details" />
            <BlogDetailsArea />
         </main>
         <FooterTwo />
      </div>
   )
}

export default BlogDetails
