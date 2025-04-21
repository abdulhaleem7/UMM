"use client"
import blogData from "@/data/BlogData"
import BlogSidebar from "./BlogSidebar"
import Link from "next/link"
import Image from "next/image"
import InjectableSvg from "@/components/common/InjectableSvg"
import { useState } from 'react'
import ReactPaginate from 'react-paginate';

const BlogArea = () => {

   const blog_data = blogData.filter(items => items.page === "inner_page");

   const itemsPerPage = 6;
   const [itemOffset, setItemOffset] = useState(0);
   const endOffset = itemOffset + itemsPerPage;
   const currentItems = blog_data.slice(itemOffset, endOffset);
   const pageCount = Math.ceil(blog_data.length / itemsPerPage);
   // click to request another page.
   const handlePageClick = (event: { selected: number }) => {
      const newOffset = (event.selected * itemsPerPage) % blog_data.length;
      setItemOffset(newOffset);
   };

   return (
      <section className="blog-area section-py-120">
         <div className="container">
            <div className="row">
               <div className="col-lg-8">
                  <div className="row">
                     {currentItems.map((item) => (
                        <div key={item.id} className="col-md-6">
                           <div className="blog__post-item shine__animate-item">
                              <div className="blog__post-thumb blog__post-thumb-two">
                                 <Link href="/blog-details" className="shine__animate-link"><Image src={item.img} alt="img" /></Link>
                                 <Link href="/blog" className="post-tag">{item.tag}</Link>
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
                  <nav className="pagination__wrap mt-25">
                     <ReactPaginate
                        breakLabel="..."
                        onPageChange={handlePageClick}
                        pageRangeDisplayed={3}
                        pageCount={pageCount}
                        renderOnZeroPageCount={null}
                        className="list-wrap"
                     />
                  </nav>
               </div>
               <BlogSidebar />
            </div>
         </div>
      </section>
   )
}

export default BlogArea
