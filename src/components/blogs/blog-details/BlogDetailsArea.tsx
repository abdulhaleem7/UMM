/* eslint-disable @typescript-eslint/no-explicit-any */
"use client"
import VideoPopup from "@/modals/VideoPopup"
import { useState } from "react"
import Image from "next/image"
import BlogSidebar from "../blog/BlogSidebar"
import Link from "next/link"
import BlogPostAuthor from "./BlogPostAuthor"
import BlogComment from "./BlogComment"

import blog_details1 from "@/assets/img/blog/blog_details.jpg"
import inner_img from "@/assets/img/blog/h2_blog_img02.jpg"

const BlogDetailsArea = ({ single_blog }: any) => {

   const [isVideoOpen, setIsVideoOpen] = useState(false);

   return (
      <>
         <section className="blog-details-area section-py-120">
            <div className="container">
               <div className="row">
                  <div className="col-lg-8">
                     <div className="blog__details-wrapper">
                        <div className="blog__details-thumb">
                           {single_blog?.img ? <Image src={single_blog.img} alt="image" /> : <Image src={blog_details1} alt="image" />}
                        </div>
                        <div className="blog__details-content">
                           <div className="blog__meta blog__meta-two">
                              <ul className="list-wrap">
                                 <li><i className="flaticon-calendar"></i> 25 Nov, 2024</li>
                                 <li><i className="far fa-user"></i> by <Link href="#">Admin</Link></li>
                                 <li><i className="flaticon-time"></i> 5 Min Read</li>
                                 <li><i className="far fa-comment-alt"></i> 05 Comments</li>
                              </ul>
                           </div>
                           <h3 className="title">{single_blog?.title ? single_blog.title : "Green Logistics Solutions for a Greener Future"}</h3>
                           <p>Maximus ligula eleifend id nisl quis interdum. Sed malesuada tortor non turpis semper bibendum. Ut ac nisi porta, malesuada risus nonrra dolo areay Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia curae in tristique libero, quis ultrices diamraesent varius diam dui. Class aptent taciti sociosqu ad litora torquent per conubia nostra.Maximus ligula eleifend.</p>
                           <p>Maximus ligula eleifend id nisl quis interdum. Sed malesuada tortor non turpis semper bibendum. Ut ac nisi porta, malesuada risus nonrra dolo areay Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia curae in tristique libero, quis ultrices diamraesent varius diam dui. Class aptent taciti sociosqu ad litora torquent per conubia nostra.Maximus ligula eleifend.</p>
                           <blockquote>
                              <p>“ urabitur varius eros rutrum consequat Mauris areathe sollicitudin enim condimentum luctus enim justo non molestie nisl ”</p>
                           </blockquote>
                           <p>Maximus ligula eleifend id nisl quis interdum. Sed malesuada tortor non turpis semper bibendum. Ut ac nisi porta, malesuada risus nonrra dolo areay Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia curae.</p>
                           <div className="blog__details-content-inner">
                              <h4 className="inner-title">What Will I Learn From This Course?</h4>
                              <p>Maximus ligula eleifend id nisl quis interdum. Sed malesuada tortor non turpis semper bibendum. Ut ac nisi porta, malesuada risus non viverra dolor. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere.</p>
                           </div>
                           <div className="blog__details-inner-wrap">
                              <div className="row">
                                 <div className="col-md-6">
                                    <div className="blog__details-inner-img">
                                       <Image src={inner_img} alt="img" />
                                       <a onClick={() => setIsVideoOpen(true)} style={{ cursor: "pointer" }} className="play-btn popup-video"><i className="fas fa-play"></i></a>
                                    </div>
                                 </div>
                                 <div className="col-md-6">
                                    <div className="blog__details-inner-content">
                                       <h2 className="inner-title">Conduct Replied Arrived Adapted</h2>
                                       <p>When An Unknown Printer Took A Galley Type Remaining Essentially Unchan Galley Of Type And Scrambled It To Make A Type Specimen Book.</p>
                                       <div className="about__list-box about__list-box-three">
                                          <ul className="list-wrap">
                                             <li><i className="flaticon-check"></i>Quality Control System</li>
                                             <li><i className="flaticon-check"></i>100% Satisfaction Guarantee</li>
                                             <li><i className="flaticon-check"></i>Professional and Qualified</li>
                                          </ul>
                                       </div>
                                    </div>
                                 </div>
                              </div>
                           </div>

                           <p>Maximus ligula eleifend id nisl quis interdum. Sed malesuada tortor non turpis semper bibendum. Ut ac nisi porta, malesuada risus nonrra dolo areay Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia curae in tristique libero, quis ultrices diamraesent varius diam dui. Class aptent taciti sociosqu ad litora torquent per conubia nostra.Maximus ligula eleifend id nisl quis interdum. Sed malesuada tortor non turpis semper bibendum. Ut ac nisi porta, malesuada risus nonVestibulum ante ipsum primis</p>
                           <div className="blog__details-bottom">
                              <div className="row align-items-center">
                                 <div className="col-xl-6 col-md-7">
                                    <div className="tg-post-tag">
                                       <h5 className="tag-title">Tags :</h5>
                                       <ul className="list-wrap p-0 mb-0">
                                          <li><Link href="#">Cargo,</Link></li>
                                          <li><Link href="#">Shipping,</Link></li>
                                          <li><Link href="#">Marine</Link></li>
                                       </ul>
                                    </div>
                                 </div>
                                 <div className="col-xl-6 col-md-5">
                                    <div className="tg-post-social justify-content-start justify-content-md-end">
                                       <h5 className="social-title">Share :</h5>
                                       <ul className="list-wrap p-0 mb-0">
                                          <li><Link href="#"><i className="fab fa-facebook-f"></i></Link></li>
                                          <li><Link href="#"><i className="fab fa-twitter"></i></Link></li>
                                          <li><Link href="#"><i className="fab fa-linkedin-in"></i></Link></li>
                                          <li><Link href="#"><i className="fab fa-pinterest-p"></i></Link></li>
                                       </ul>
                                    </div>
                                 </div>
                              </div>
                           </div>
                        </div>
                     </div>
                     <BlogPostAuthor />
                     <BlogComment />
                  </div>
                  <BlogSidebar />
               </div>
            </div>
         </section>
         <VideoPopup
            isVideoOpen={isVideoOpen}
            setIsVideoOpen={setIsVideoOpen}
            videoId={"Ml4XCF-JS0k"}
         />
      </>
   )
}

export default BlogDetailsArea
