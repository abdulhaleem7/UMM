interface DataType {
   id: number;
   icon: string;
   title: string;
   desc: JSX.Element;
}

const feature_data: DataType[] = [
   {
      id: 1,
      icon: "flaticon-warehouse-1",
      title: "Moving and Hauling",
      desc: (<> • Residential Moving.
         • Office Relocation
         • Heavy Hauling
         • Loading and Unloading
         • Packing and Unpacking Services</>),
   },
   {
      id: 2,
      icon: "flaticon-air-freight",
      title: "Freight Transport",
      desc: (<>Need to move pallets or larger shipments? We’ve got you covered within Ontario and
surrounding areas.</>),
   },
   {
      id: 3,
      icon: "flaticon-ship",
      title: "Courier & Local Delivery",
      desc: (<>• Same-day and next-day delivery
• Route optimization for speed & savings</>),
   },
];

const Feature = () => {
   return (
      <section className="features__area section-pb-110">
         <div className="container">
            <div className="features__item-wrap-two">
               <div className="row justify-content-center gutter-24">
                  {feature_data.map((item) => (
                     <div key={item.id} className="col-lg-4 col-md-6">
                        <div className="features__item">
                           <div className="features__icon">
                              <i className={item.icon}></i>
                           </div>
                           <div className="features__content">
                              <h2 className="title">{item.title}</h2>
                              <p>{item.desc}</p>
                              <h2 className="number">0{item.id}</h2>
                           </div>
                        </div>
                     </div>
                  ))}
               </div>
            </div>
         </div>
      </section>
   )
}

export default Feature
