import { StaticImageData } from "next/image";
import project_1 from "@/assets/img/project/project_img01.jpg"
import project_2 from "@/assets/img/project/project_img02.jpg"
import project_3 from "@/assets/img/project/project_img03.jpg"
import project_4 from "@/assets/img/project/project_img04.jpg"
import project_5 from "@/assets/img/project/project_img10.jpg"
import project_6 from "@/assets/img/project/project_img09.jpg"
import project_7 from "@/assets/img/project/project_img08.jpg"

import project_8 from "@/assets/img/project/project_img05.jpg"
import project_9 from "@/assets/img/project/project_img06.jpg"
import project_10 from "@/assets/img/project/project_img07.jpg"

interface DataType {
   id: number;
   page: string;
   img: StaticImageData;
   title: string;
   tag: string;
}

const project_data: DataType[] = [
   {
      id: 1,
      page: "home_1",
      img: project_1,
      title: "Modern Warehouse",
      tag: "Logistics"
   },
   {
      id: 2,
      page: "home_1",
      img: project_2,
      title: "Modern Warehouse",
      tag: "Logistics"
   },
   {
      id: 3,
      page: "home_1",
      img: project_3,
      title: "Modern Warehouse",
      tag: "Logistics"
   },
   {
      id: 4,
      page: "home_1",
      img: project_2,
      title: "Modern Warehouse",
      tag: "Logistics"
   },

   // home_2
   {
      id: 1,
      page: "home_2",
      img: project_4,
      title: "Distribution Processing",
      tag: "Ocean Freight",
   },
   {
      id: 2,
      page: "home_2",
      img: project_5,
      title: "Effective packaging",
      tag: "Packaging",
   },
   {
      id: 3,
      page: "home_2",
      img: project_6,
      title: "Transparent Pricing",
      tag: "Warehouse",
   },
   {
      id: 4,
      page: "home_2",
      img: project_7,
      title: "Effective packaging",
      tag: "Packaging",
   },
   {
      id: 5,
      page: "home_2",
      img: project_5,
      title: "Effective packaging",
      tag: "Packaging",
   },
   {
      id: 6,
      page: "home_2",
      img: project_6,
      title: "Transparent Pricing",
      tag: "Warehouse",
   },

   // home_4
   {
      id: 1,
      page: "home_4",
      img: project_3,
      title: "Smart Warehouse",
      tag: "Logistics",
   },
   {
      id: 2,
      page: "home_4",
      img: project_4,
      title: "Distribution Processing",
      tag: "Ocean Freight",
   },
   {
      id: 3,
      page: "home_4",
      img: project_8,
      title: "Effective packaging",
      tag: "Packaging",
   },
   {
      id: 4,
      page: "home_4",
      img: project_9,
      title: "Transport for Product",
      tag: "Air freight",
   },
   {
      id: 5,
      page: "home_4",
      img: project_10,
      title: "Startup Investment",
      tag: "Analytics",
   },
   {
      id: 6,
      page: "home_4",
      img: project_7,
      title: "Business Consultation",
      tag: "Business",
   },

   // inner_page
   {
      id: 1,
      page: "inner_page",
      img: project_1,
      title: "Transport for Product",
      tag: "Transport",
   },
   {
      id: 2,
      page: "inner_page",
      img: project_6,
      title: "Business Consultation",
      tag: "Business",
   },
   {
      id: 3,
      page: "inner_page",
      img: project_5,
      title: "Distribution Processing",
      tag: "Packaging",
   },
   {
      id: 4,
      page: "inner_page",
      img: project_3,
      title: "Smart Warehouse",
      tag: "Logistics",
   },
   {
      id: 5,
      page: "inner_page",
      img: project_4,
      title: "Distribution Processing",
      tag: "Ocean Freight",
   },
   {
      id: 6,
      page: "inner_page",
      img: project_8,
      title: "Effective packaging",
      tag: "Packaging",
   },
   {
      id: 7,
      page: "inner_page",
      img: project_9,
      title: "Transport for Product",
      tag: "Air freight",
   },
   {
      id: 8,
      page: "inner_page",
      img: project_10,
      title: "Startup Investment",
      tag: "Analytics",
   },
   {
      id: 9,
      page: "inner_page",
      img: project_10,
      title: "Business Consultation",
      tag: "Business",
   },
];

export default project_data;