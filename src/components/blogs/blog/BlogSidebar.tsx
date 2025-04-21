import Link from "next/link"
import BlogLatestPost from "./BlogLatestPost"

const BlogSidebar = () => {
   return (
      <div className="col-lg-4">
         <aside className="blog-sidebar">
            <div className="blog-widget widget_search">
               <div className="sidebar-search-form">
                  <form onSubmit={(e) => e.preventDefault()}>
                     <input type="text" placeholder="Search here" />
                     <button><i className="flaticon-search"></i></button>
                  </form>
               </div>
            </div>
            <div className="blog-widget">
               <h4 className="widget-title">Categories</h4>
               <div className="shop-cat-list">
                  <ul className="list-wrap">
                     <li>
                        <Link href="/blog">Ocean Freight <span>(05)</span></Link>
                     </li>
                     <li>
                        <Link href="/blog">Air Freight <span>(07)</span></Link>
                     </li>
                     <li>
                        <Link href="/blog">Road Freight <span>(03)</span></Link>
                     </li>
                     <li>
                        <Link href="/blog">Warehouse <span>(05)</span></Link>
                     </li>
                     <li>
                        <Link href="/blog">Cargo Freight <span>(02)</span></Link>
                     </li>
                     <li>
                        <Link href="/blog">Rail Freight <span>(08)</span></Link>
                     </li>
                  </ul>
               </div>
            </div>
            <BlogLatestPost />
            <div className="blog-widget">
               <h4 className="widget-title">Tags</h4>
               <div className="tag-cloud">
                  <Link href="/blog">Cargo</Link>
                  <Link href="/blog">Air Freight</Link>
                  <Link href="/blog">Shipping</Link>
                  <Link href="/blog">Freight</Link>
                  <Link href="/blog">Warehouse</Link>
                  <Link href="/blog">Marine</Link>
               </div>
            </div>
         </aside>
      </div>
   )
}

export default BlogSidebar
