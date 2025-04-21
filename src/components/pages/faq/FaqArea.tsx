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
      title: " Can i specify a delivery date when ordering?",
      desc: (<>Gorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Quam pellentesque nec nam nulla facilisi etiam aliquam.Lorem ipsum dolor sit amet, consectetur adipiscing elit empor incididunt ut labore et dolore magna uam pellentesque nec nam nulla facilisi etiam aliquam.</>),
      showAnswer: true,
   },
   {
      id: 2,
      title: "How can I safely use files?",
      desc: (<>Gorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Quam pellentesque nec nam nulla facilisi etiam aliquam.Lorem ipsum dolor sit amet, consectetur adipiscing elit empor incididunt ut labore et dolore magna uam pellentesque nec nam nulla facilisi etiam aliquam.</>),
      showAnswer: false,
   },
   {
      id: 3,
      title: "Where do I find my Office product key?",
      desc: (<>Gorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Quam pellentesque nec nam nulla facilisi etiam aliquam.Lorem ipsum dolor sit amet, consectetur adipiscing elit empor incididunt ut labore et dolore magna uam pellentesque nec nam nulla facilisi etiam aliquam.</>),
      showAnswer: false,
   },
   {
      id: 4,
      title: "What payment methods are supported?",
      desc: (<>Gorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Quam pellentesque nec nam nulla facilisi etiam aliquam.Lorem ipsum dolor sit amet, consectetur adipiscing elit empor incididunt ut labore et dolore magna uam pellentesque nec nam nulla facilisi etiam aliquam.</>),
      showAnswer: false,
   },
   {
      id: 5,
      title: "How can I Track My Shipments?",
      desc: (<>Gorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Quam pellentesque nec nam nulla facilisi etiam aliquam.Lorem ipsum dolor sit amet, consectetur adipiscing elit empor incididunt ut labore et dolore magna uam pellentesque nec nam nulla facilisi etiam aliquam.</>),
      showAnswer: false,
   },
   {
      id: 6,
      title: "What options for logistics plans are available?",
      desc: (<>Gorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Quam pellentesque nec nam nulla facilisi etiam aliquam.Lorem ipsum dolor sit amet, consectetur adipiscing elit empor incididunt ut labore et dolore magna uam pellentesque nec nam nulla facilisi etiam aliquam.</>),
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
