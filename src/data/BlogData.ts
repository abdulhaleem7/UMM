import { StaticImageData } from "next/image";

import blog_img1 from "@/assets/img/blog/blog_img01.jpg"
import blog_img2 from "@/assets/img/blog/blog_img02.jpg"
import blog_img3 from "@/assets/img/blog/blog_img03.jpg"
import blog_img4 from "@/assets/img/blog/h2_blog_img01.jpg"
import blog_img5 from "@/assets/img/blog/h2_blog_img02.jpg"
import blog_img6 from "@/assets/img/blog/h2_blog_img03.jpg"

interface DataType {
   id: number;
   page: string;
   img: StaticImageData;
   date: string;
   title: string;
   desc?: string;
   tag?: string;
}

const blog_data: DataType[] = [
   {
      id: 1,
      page: "home_1",
      img: blog_img1,
      date: "25 Nov, 2024",
      title: "Importers achieve savings through the First Sale rule!",
      desc: "Road transpo arere tation criucial roley area coordinated trans portatn they aw countries destination.",
   },
   {
      id: 2,
      page: "home_1",
      img: blog_img2,
      date: "25 Nov, 2024",
      title: "The Future of Logistics Emb racing Technology",
      desc: "Road transpo arere tation criucial roley area coordinated trans portatn they aw countries destination.",
   },
   {
      id: 3,
      page: "home_1",
      img: blog_img3,
      date: "25 Nov, 2024",
      title: "Green Logistics Solutions for a Greener Future",
      desc: "Road transpo arere tation criucial roley area coordinated trans portatn they aw countries destination.",
   },

   // home_2

   {
      id: 1,
      page: "home_2",
      img: blog_img4,
      date: "25 Nov, 2024",
      title: "Importers achieve savings through the First Sale rule!",
      tag: "Business",
   },
   {
      id: 2,
      page: "home_2",
      img: blog_img5,
      date: "25 Nov, 2024",
      title: "The Future of Logistics Emb racing Technology",
      tag: "Business",
   },
   {
      id: 3,
      page: "home_2",
      img: blog_img6,
      date: "25 Nov, 2024",
      title: "Green Logistics Solutions for a Greener Future",
      tag: "Business",
   },

   // inner_page

   {
      id: 1,
      page: "inner_page",
      img: blog_img4,
      date: "25 Nov, 2024",
      title: "Importers achieve savings through the First Sale rule!",
      tag: "Business",
   },
   {
      id: 2,
      page: "inner_page",
      img: blog_img5,
      date: "25 Nov, 2024",
      title: "The Future of Logistics Emb racing Technology",
      tag: "Business",
   },
   {
      id: 3,
      page: "inner_page",
      img: blog_img6,
      date: "25 Nov, 2024",
      title: "Green Logistics Solutions for a Greener Future",
      tag: "Business",
   },
   {
      id: 4,
      page: "inner_page",
      img: blog_img1,
      date: "25 Nov, 2024",
      title: "Importers achieve savings through the First Sale rule!",
      tag: "Business",
   },
   {
      id: 5,
      page: "inner_page",
      img: blog_img2,
      date: "25 Nov, 2024",
      title: "The Future of Logistics Emb racing Technology",
      tag: "Ship",
   },
   {
      id: 6,
      page: "inner_page",
      img: blog_img3,
      date: "25 Nov, 2024",
      title: "Green Logistics Solutions for a Greener Future",
      tag: "Warehouse",
   },
   {
      id: 7,
      page: "inner_page",
      img: blog_img1,
      date: "25 Nov, 2024",
      title: "Importers achieve savings through the First Sale rule!",
      tag: "Business",
   },
   {
      id: 8,
      page: "inner_page",
      img: blog_img2,
      date: "25 Nov, 2024",
      title: "The Future of Logistics Emb racing Technology",
      tag: "Ship",
   },
   {
      id: 9,
      page: "inner_page",
      img: blog_img3,
      date: "25 Nov, 2024",
      title: "Green Logistics Solutions for a Greener Future",
      tag: "Warehouse",
   },
];

export default blog_data;