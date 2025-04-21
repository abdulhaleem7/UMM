import { StaticImageData } from "next/image";

import service_1 from "@/assets/img/services/services_img01.jpg"
import service_2 from "@/assets/img/services/services_img02.jpg"
import service_3 from "@/assets/img/services/services_img03.jpg"
import service_5 from "@/assets/img/services/services_img07.jpg"
import service_6 from "@/assets/img/services/services_img08.jpg"
import service_7 from "@/assets/img/services/services_img09.jpg"

interface DataType {
   id: number;
   page: string;
   img?: StaticImageData;
   icon: string;
   title: string;
   desc: string;
   list?: string[];
}

const service_data: DataType[] = [
   // home_4
   {
      id: 1,
      page: "home_4",
      img: service_5,
      icon: "flaticon-truck", // Replaced with a more suitable icon for logistics
      title: "Custom Logistics",
      desc: "Customized services for freight, specialty cargo, and complex delivery schedules to fit your unique needs.",
   },
   {
      id: 2,
      page: "home_4",
      img: service_6,
      icon: "flaticon-box", // Replaced with a box icon suitable for e-commerce fulfillment
      title: "E-commerce Fulfillment & Delivery",
      desc: "We help online stores with pickups, quick delivery, and trusted fulfillment across Ontario.",
   },
   {
      id: 3,
      page: "home_4",
      img: service_7,
      icon: "flaticon-delivery", // Replaced with an icon representing freight transport
      title: "Freight Transport",
      desc: "Need to move pallets or larger shipments? We’ve got you covered within Ontario and surrounding areas.",
   },

   // inner_page
   {
      id: 4,
      page: "inner_page",
      img: service_1,
      icon: "flaticon-delivery", // Replaced with an icon suitable for courier and local delivery
      title: "Courier & Local Delivery",
      desc: "Fast, reliable, and secure delivery services for packages within your city or local area, ensuring timely arrivals and excellent customer service.",
   },
   {
      id: 5,
      page: "inner_page",
      img: service_2,
      icon: "flaticon-pin", // Replaced with an icon suitable for moving and hauling
      title: "Moving and Hauling",
      desc: "Efficient and reliable moving and hauling services for your heavy-duty transport and relocation needs.",
   },
   {
      id: 6,
      page: "inner_page",
      img: service_3,
      icon: "flaticon-plane", // Replaced with an airplane icon for air freight
      title: "Air Freight",
      desc: "Fast, coordinated air freight services to transport goods between countries efficiently.",
   },
];



export default service_data;