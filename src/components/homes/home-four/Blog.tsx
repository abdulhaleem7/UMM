import InjectableSvg from "@/components/common/InjectableSvg"
import blog_data from "@/data/BlogData"
import Image from "next/image"
import Link from "next/link"

const Blog = () => {
   return (
      <section className="blog__post-area-three section-pt-130 section-pb-100">
         <div className="container">
            <div className="row align-items-center">
               <div className="col-lg-6 col-md-8">
                  <div className="section__title mb-40">
                     <span className="sub-title">LATEST NEWS</span>
                     <h2 className="title">Our Recent Articles</h2>
                  </div>
               </div>
               <div className="col-lg-6 col-md-4">
                  <div className="view-all-btn text-end mb-40">
                     <Link href="/services" className="btn">See All News <InjectableSvg src="/assets/img/icon/right_arrow.svg" alt="" className="injectable" /></Link>
                  </div>
               </div>
            </div>
            <div className="row justify-content-center gutter-24">
               {blog_data.filter((items) => items.page === "home_2").map((item) => (
                  <div key={item.id} className="col-lg-4 col-md-6">
                     <div className="blog__post-item shine__animate-item">
                        <div className="blog__post-thumb blog__post-thumb-two">
                           <Link href="/blog-details" className="shine__animate-link"><Image src={item.img} alt="img" /></Link>
                           <Link href="/blog" className="post-tag">Business</Link>
                        </div>
                        <div className="blog__post-content blog__post-content-two">
                           <div className="blog__meta blog__meta-two">
                              <ul className="list-wrap">
                                 <li><i className="flaticon-calendar"></i>{item.date}</li>
                              </ul>
                           </div>
                           <h3 className="title"><Link href="/blog-details">{item.title}</Link></h3>
                           <Link href="/services" className="btn btn-two">Read More <InjectableSvg src="/assets/img/icon/right_arrow.svg" alt="" className="injectable" /></Link>
                        </div>
                     </div>
                  </div>
               ))}
            </div>
         </div>
      </section>
   )
}

export default Blog
