"use client";
import { useEffect, useState } from "react";
import Image from "next/image"
import shape from "@/assets/img/images/faq_shape.svg"
import FaqForm from "@/components/form/FaqForm";

interface DataType {
   id: number;
   title: string;
   desc: JSX.Element;
   showAnswer: boolean;

}

const faq_data: DataType[] = [
   {
      id: 1,
      title: " We offer luxury service to our customer",
      desc: (<>Aliquam ac sem et diam iaculis efficitua area Morbienim odiollam qvolutpat est, sed dapibus sapi Cras condimentum euelit id tem Curabitur purus sapie.Aliquam ac sem et diam iaculis efficitua.</>),
      showAnswer: true,
   },
   {
      id: 2,
      title: "How can I safely use files?",
      desc: (<>Aliquam ac sem et diam iaculis efficitua area Morbienim odiollam qvolutpat est, sed dapibus sapi Cras condimentum euelit id tem Curabitur purus sapie.Aliquam ac sem et diam iaculis efficitua.</>),
      showAnswer: false,
   },
   {
      id: 3,
      title: "Where do I find my Office product key?",
      desc: (<>Aliquam ac sem et diam iaculis efficitua area Morbienim odiollam qvolutpat est, sed dapibus sapi Cras condimentum euelit id tem Curabitur purus sapie.Aliquam ac sem et diam iaculis efficitua.</>),
      showAnswer: false,
   },
   {
      id: 4,
      title: "What payment methods are supported?",
      desc: (<>Aliquam ac sem et diam iaculis efficitua area Morbienim odiollam qvolutpat est, sed dapibus sapi Cras condimentum euelit id tem Curabitur purus sapie.Aliquam ac sem et diam iaculis efficitua.</>),
      showAnswer: false,
   },
];

const Faq = () => {

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
      <section className="faq__area-two section-py-140">
         <div className="container">
            <div className="row align-items-center">
               <div className="col-lg-6">
                  <div className="faq__content">
                     <div className="section__title white-title mb-30">
                        <span className="sub-title">CARGO SHIPPING FAQ&apos;S</span>
                        <h2 className="title">We Have provide the best and fastest courier services</h2>
                     </div>
                     <div className="faq__wrap-three">
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
               <div className="col-lg-6">
                  <div className="request__wrap-two">
                     <h2 className="title">Request a Quote</h2>
                     <div className="price_filter">
                        <div className="price_slider_amount">
                           <span>Distance (Miles):</span>
                           <input type="text" id="amount" name="price" placeholder="Add Your Price" />
                        </div>
                        <div id="slider-range"></div>
                     </div>
                     <FaqForm />
                  </div>
               </div>
            </div>
         </div>
         <div className="faq__shape">
            <Image src={shape} alt="shape" />
         </div>
      </section>
   )
}

export default Faq
