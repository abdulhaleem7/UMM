"use client";
import { useEffect, useState } from "react";

interface DataType {
   id: number;
   title: string;
   desc: JSX.Element;
   showAnswer: boolean;

}

const faq_data: DataType[] = [
   {
      id: 1,
      title: "What services do you offer?",
      desc: (<>We offer a wide range of moving services, including local and long-distance moving, freight transport, courier and local delivery, moving and hauling, air freight, and e-commerce fulfillment across Ontario and surrounding areas.</>),
      showAnswer: true,
   },
   {
      id: 2,
      title: "How do I schedule a move with Unified Moving Master?",
      desc: (<>You can schedule your move by contacting us through our website, calling our customer service line, or emailing us directly. We will provide you with an accurate quote and schedule a convenient time for your move.</>),
      showAnswer: false,
   },
   {
      id: 3,
      title: "What areas do you serve?",
      desc: (<>We provide moving and logistics services across Ontario, including surrounding regions. We specialize in local and long-distance moves, air freight, and e-commerce fulfillment within these areas.</>),
      showAnswer: false,
   },
   {
      id: 4,
      title: "How is the pricing determined for moving services?",
      desc: (<>Our pricing is based on factors such as the type of service (e.g., local or long-distance), the volume of goods, distance, and any specialized services required. We provide free, no-obligation quotes to ensure transparency.</>),
      showAnswer: false,
   },
   {
      id: 5,
      title: "How do you handle fragile or specialty items?",
      desc: (<>We treat fragile and specialty items with the utmost care. We use high-quality packing materials and specialized equipment to ensure safe transportation. Let us know about any sensitive items ahead of time, and we will take extra precautions.</>),
      showAnswer: false,
   },
   {
      id: 6,
      title: "Can you help with packing and unpacking?",
      desc: (<>Yes, we offer professional packing and unpacking services for both residential and commercial moves. Our team can safely pack your items, ensuring they are secure during transport.</>),
      showAnswer: false,
   },
   {
      id: 7,
      title: "What is the typical delivery time for long-distance moves?",
      desc: (<>Delivery times for long-distance moves vary depending on the distance and route. We provide estimated delivery times upfront and keep you informed of any changes or delays.</>),
      showAnswer: false,
   },
   {
      id: 8,
      title: "Do you offer same-day or expedited moving services?",
      desc: (<>Yes, we offer expedited moving services for urgent moves. Please contact us for availability and pricing.</>),
      showAnswer: false,
   },
   {
      id: 9,
      title: "How do I track my shipment or delivery?",
      desc: (<>For most services, we provide real-time tracking updates. You will receive a tracking number once your goods are in transit, and our customer service team can also assist you with updates.</>),
      showAnswer: false,
   },
   {
      id: 10,
      title: "Do you offer storage solutions?",
      desc: (<>Yes, we offer short-term and long-term storage options for your belongings during the moving process. Our storage facilities are secure, climate-controlled, and accessible as needed.</>),
      showAnswer: false,
   },
   {
      id: 11,
      title: "What should I do to prepare for the move?",
      desc: (<>We recommend organizing and labeling your items ahead of time, securing fragile items, and ensuring there’s clear access for our moving team. We provide detailed instructions when scheduling your move.</>),
      showAnswer: false,
   },
   {
      id: 12,
      title: "Are your services eco-friendly?",
      desc: (<>We are committed to sustainability and continually work towards minimizing our environmental impact. We use eco-friendly materials and transport methods whenever possible.</>),
      showAnswer: false,
   },
   {
      id: 13,
      title: "How can I contact you if I have more questions?",
      desc: (<>You can reach us through our website, by phone, or via email. Our customer service team is available to assist you with any questions or concerns.</>),
      showAnswer: false,
   },
];


const FaqArea = () => {

   const [faqData, setFaqData] = useState<DataType[]>([]);

   useEffect(() => {
      setFaqData(faq_data);
   }, []);

   const toggleAnswer = (faqId: number) => {
      setFaqData((prevFaqData) =>
         prevFaqData.map((faq) =>
            faq.id === faqId
               ? { ...faq, showAnswer: !faq.showAnswer }
               : { ...faq, showAnswer: false }
         )
      );
   };

   return (
      <section className="faq__area section-py-140">
         <div className="container">
            <div className="row justify-content-center">
               <div className="col-xl-10">
                  <div className="row justify-content-center">
                     <div className="col-lg-9">
                        <div className="section__title text-center mb-50">
                           <h2 className="title">Discover Frequently Asked Questions from Our Support</h2>
                        </div>
                     </div>
                  </div>
                  <div className="faq__wrap-two">
                     <div className="accordion" id="accordionExample">
                        {faqData.map((item) => (
                           <div key={item.id} className="accordion-item">
                              <h2 className="accordion-header">
                                 <button
                                    className={`accordion-button ${item.showAnswer ? "" : "collapsed"
                                       }`}
                                    type="button"
                                    onClick={() => toggleAnswer(item.id)}
                                 >
                                    {item.title}
                                 </button>
                              </h2>
                              <div
                                 className={`accordion-collapse collapse ${item.showAnswer ? "show" : ""
                                    }`}
                              >
                                 <div className="accordion-body">
                                    <p >{item.desc}</p>
                                 </div>
                              </div>
                           </div>
                        ))}
                     </div>
                  </div>
               </div>
            </div>
         </div>
      </section>
   )
}

export default FaqArea
