import Link from "next/link";

interface DataType {
   id: number;
   title: string;
   price: number;
   plan: string;
   desc: string;
   list: string[];
   data_aos_delay: string;
}

const pricing_data: DataType[] = [
   {
      id: 1,
      title: "",
      price: 15,
      plan: "Month",
      desc: "Dorem ipsum dolor sit amet consect adipisicing elied do eiusmod",
      list: ["5000 User Activities", "Unlimited Access", "No Hidden Charge", "03 Time Updates", "Figma Source File"],
      data_aos_delay: "200",
   },
   {
      id: 2,
      title: "",
      price: 49,
      plan: "Month",
      desc: "Dorem ipsum dolor sit amet consect adipisicing elied do eiusmod",
      list: ["5000 User Activities", "Unlimited Access", "No Hidden Charge", "03 Time Updates", "Figma Source File"],
      data_aos_delay: "200",
   },
   {
      id: 3,
      title: "",
      price: 99,
      plan: "Month",
      desc: "Dorem ipsum dolor sit amet consect adipisicing elied do eiusmod",
      list: ["5000 User Activities", "Unlimited Access", "No Hidden Charge", "03 Time Updates", "Figma Source File"],
      data_aos_delay: "200",
   },
];

const Pricing = () => {
   return (
      <section className="pricing__area grey-bg section-pt-120 section-pb-90">
         <div className="container">
            <div className="row justify-content-center">
               <div className="col-xl-5 col-lg-6">
                  <div className="section__title section__title-two text-center mb-40">
                     <span className="sub-title">Affordable Pricing Table</span>
                     <h2 className="title">We Provide Effective Logistics Solution</h2>
                  </div>
               </div>
            </div>
            <div className="row justify-content-center gutter-24">
               {pricing_data.map((item) => (
                  <div key={item.id} className="col-lg-4 col-md-6">
                     <div className="pricing__box" data-aos="fade-up" data-aos-delay={item.data_aos_delay}>
                        <div className="pricing__top">
                           <h4 className="title">{item.title}</h4>
                        </div>
                        <div className="pricing__price">
                           <h2 className="price"><span>$</span>{item.price} <strong>/ {item.plan}</strong></h2>
                        </div>
                        <div className="pricing__content">
                           <p>{item.desc}</p>
                        </div>
                        <ul className="list-wrap pricing__list">
                           {item.list.map((list, i) => (
                              <li key={i}><i className="flaticon-check"></i>{list}</li>
                           ))}
                        </ul>
                        <div className="pricing__btn">
                           <Link href="#" className="btn">Purchase Now</Link>
                        </div>
                     </div>
                  </div>
               ))}
            </div>
         </div>
      </section>
   )
}

export default Pricing
