import Image, { StaticImageData } from "next/image";

import history_img1 from "@/assets/img/images/history_img01.jpg"
import history_img2 from "@/assets/img/images/history_img02.jpg"
import history_img3 from "@/assets/img/images/history_img03.jpg"
import InjectableSvg from "@/components/common/InjectableSvg";

interface DataType {
   id: number;
   img: StaticImageData;
   date: string;
   title: JSX.Element;
   desc: JSX.Element;
}

const history_data: DataType[] = [
   {
      id: 1,
      img: history_img1,
      date: "2009-2023",
      title: (<>Provide Transportation <br /> Services Since 1996</>),
      desc: (<>Mivamus suscipit tortor eget felis porttitor volutpat. Vestibulum ante ipsum primis in faucibus orci luctus  ultrices posuere cubilia Curae Donec velit neque, auctor sit amet aliquam vel, ullamcorper sit ligulNulla quis lorem ligulNulla quis ut libero.</>),
   },
   {
      id: 2,
      img: history_img2,
      date: "2003-2006",
      title: (<>What is the exact sequence events that will take where you</>),
      desc: (<>Mivamus suscipit tortor eget felis porttitor volutpat. Vestibulum ante ipsum primis in faucibus orci luctus  ultrices posuere cubilia Curae Donec velit neque, auctor sit amet aliquam vel, ullamcorper sit ligulNulla quis lorem ligulNulla quis ut libero.</>),
   },
   {
      id: 3,
      img: history_img3,
      date: "2009-2023",
      title: (<>Delivering Monster for indutry leaders Our operations around the world</>),
      desc: (<>Mivamus suscipit tortor eget felis porttitor volutpat. Vestibulum ante ipsum primis in faucibus orci luctus  ultrices posuere cubilia Curae Donec velit neque, auctor sit amet aliquam vel, ullamcorper sit ligulNulla quis lorem ligulNulla quis ut libero.</>),
   },
];

const HistoryArea = () => {
   return (
      <section className="history__area section-py-130">
         <div className="container">
            <div className="row">
               <div className="col-12">
                  <div className="history__item-wrap">
                     {history_data.map((item) => (
                        <div key={item.id} className="history__item">
                           <div className="history__thumb">
                              <Image src={item.img} alt="img" data-aos="flip-left" />
                           </div>
                           <div className="history__content">
                              <div className="history__years-wrap">
                                 <div className="shape">
                                    <InjectableSvg src="assets/img/images/years_shape.svg" alt="" className="injectable" />
                                 </div>
                                 <span>{item.date}</span>
                              </div>
                              <h2 className="title">{item.title}</h2>
                              <p>{item.desc}</p>
                           </div>
                        </div>
                     ))}
                  </div>
               </div>
            </div>
         </div>
      </section>
   )
}

export default HistoryArea
