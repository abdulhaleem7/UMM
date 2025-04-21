import { StaticImageData } from "next/image";

import team_img1 from "@/assets/img/team/h2_team_img01.png"
import team_img2 from "@/assets/img/team/h2_team_img02.png"
import team_img3 from "@/assets/img/team/h2_team_img03.png"
import team_img4 from "@/assets/img/team/h2_team_img04.png"
import team_img5 from "@/assets/img/team/team_img01.png"
import team_img6 from "@/assets/img/team/team_img02.png"
import team_img7 from "@/assets/img/team/team_img03.png"
import team_img8 from "@/assets/img/team/team_img04.png"

interface DataType {
   id: number;
   page: string;
   img: StaticImageData;
   title: string;
   designation: string;
   data_aos_delay?: string;
}

const team_data: DataType[] = [
   {
      id: 1,
      page: "home_2",
      img: team_img1,
      title: "Kristin Watson",
      designation: "Investment Department"
   },
   {
      id: 2,
      page: "home_2",
      img: team_img2,
      title: "Guy Hawkins",
      designation: "Investment Department"
   },
   {
      id: 3,
      page: "home_2",
      img: team_img3,
      title: "Wade Warren",
      designation: "Investment Department"
   },
   {
      id: 4,
      page: "home_2",
      img: team_img4,
      title: "Jenny Wilson",
      designation: "Investment Department"
   },

   // home_2

   {
      id: 1,
      page: "home_3",
      img: team_img5,
      title: "Kristin Watson",
      designation: "Investment Department",
      data_aos_delay: "200",
   },
   {
      id: 2,
      page: "home_3",
      img: team_img6,
      title: "Guy Hawkins",
      designation: "Investment Department",
      data_aos_delay: "400",
   },
   {
      id: 3,
      page: "home_3",
      img: team_img7,
      title: "Wade Warren",
      designation: "Investment Department",
      data_aos_delay: "600",
   },
   {
      id: 4,
      page: "home_3",
      img: team_img8,
      title: "Jenny Wilson",
      designation: "Investment Department",
      data_aos_delay: "800",
   },
   // inner_page

   {
      id: 1,
      page: "inner_page",
      img: team_img5,
      title: "Kristin Watson",
      designation: "Investment Department",
      data_aos_delay: "200",
   },
   {
      id: 2,
      page: "inner_page",
      img: team_img6,
      title: "Guy Hawkins",
      designation: "Investment Department",
      data_aos_delay: "400",
   },
   {
      id: 3,
      page: "inner_page",
      img: team_img7,
      title: "Wade Warren",
      designation: "Investment Department",
      data_aos_delay: "600",
   },
   {
      id: 4,
      page: "inner_page",
      img: team_img8,
      title: "Jenny Wilson",
      designation: "Investment Department",
      data_aos_delay: "800",
   },
   {
      id: 5,
      page: "inner_page",
      img: team_img5,
      title: "Kristin Watson",
      designation: "Investment Department",
      data_aos_delay: "200",
   },
   {
      id: 6,
      page: "inner_page",
      img: team_img6,
      title: "Guy Hawkins",
      designation: "Investment Department",
      data_aos_delay: "400",
   },
   {
      id: 7,
      page: "inner_page",
      img: team_img7,
      title: "Wade Warren",
      designation: "Investment Department",
      data_aos_delay: "600",
   },
   {
      id: 8,
      page: "inner_page",
      img: team_img8,
      title: "Jenny Wilson",
      designation: "Investment Department",
      data_aos_delay: "800",
   },
]

export default team_data;