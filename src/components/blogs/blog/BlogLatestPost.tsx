import Image, { StaticImageData } from "next/image";
import Link from "next/link";

import img_1 from "@/assets/img/blog/blog_img01.jpg"
import img_2 from "@/assets/img/blog/blog_img02.jpg"
import img_3 from "@/assets/img/blog/blog_img03.jpg"

interface DataType {
   id: number;
   img: StaticImageData;
   date: string;
   title: string;
}

const recent_post: DataType[] = [
   {
      id: 1,
      img: img_1,
      date: "25 Nov, 2024",
      title: "the Right Learning Path for your"
   },
   {
      id: 2,
      img: img_2,
      date: "25 Nov, 2024",
      title: "The Growing Need Management"
   },
   {
      id: 3,
      img: img_3,
      date: "25 Nov, 2024",
      title: "the Right Learning Path for your"
   },
   {
      id: 4,
      img: img_1,
      date: "25 Nov, 2024",
      title: "The Growing Need Management"
   },
];

const BlogLatestPost = () => {
   return (
      <div className="blog-widget">
         <h4 className="widget-title">Latest Post</h4>
         {recent_post.map((item) => (
            <div key={item.id} className="rc-post-item">
               <div className="rc-post-thumb">
                  <Link href="/blog-details">
                     <Image src={item.img} alt="img" />
                  </Link>
               </div>
               <div className="rc-post-content">
                  <span className="date"><i className="flaticon-calendar"></i>{item.date}</span>
                  <h4 className="title"><Link href="/blog-details">{item.title}</Link></h4>
               </div>
            </div>
         ))}
      </div>
   )
}

export default BlogLatestPost
