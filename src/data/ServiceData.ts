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
      desc: "Tailored solutions for freight, specialty cargo, and complex delivery schedules — designed to meet your unique needs with precision and care.",
   },
   {
      id: 2,
      page: "home_4",
      img: service_6,
      icon: "flaticon-box", // Replaced with a box icon suitable for e-commerce fulfillment
      title: "E-commerce Fulfillment & Delivery",
      desc: "Reliable pickups, fast deliveries, and trusted fulfillment services to power online stores across Ontario.",
   },
   {
      id: 3,
      page: "home_4",
      img: service_7,
      icon: "flaticon-delivery", // Replaced with an icon representing freight transport
      title: "Freight Transport",
      desc: "Moving pallets or large shipments? We deliver dependable freight solutions across Ontario and surrounding regions.",
   },

   // inner_page
   {
      id: 4,
      page: "inner_page",
      img: service_1,
      icon: "flaticon-delivery", // Replaced with an icon suitable for courier and local delivery
      title: "Courier & Local Delivery",
      desc: "Fast, reliable, and secure delivery services for packages within your city, ensuring on-time arrivals and top-notch customer service.",
   },
   {
      id: 5,
      page: "inner_page",
      img: service_2,
      icon: "flaticon-truck", // Replaced with an icon suitable for moving and hauling
      title: "Moving and Hauling",
      desc: "Efficient, reliable moving and hauling services for all your heavy-duty transport and relocation requirements.",
   },
   {
      id: 6,
      page: "inner_page",
      img: service_3,
      icon: "flaticon-box", // Replaced with an airplane icon for air freight
      title: "Air Freight",
      desc: "Swift and coordinated air freight services for efficient international transport of goods.",
   },
];



export default service_data;