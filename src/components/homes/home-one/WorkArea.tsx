import InjectableSvg from "@/components/common/InjectableSvg";
import work_data from "@/data/WorkData";

const WorkArea = () => {
   return (
      <section className="work__area work__bg" style={{ backgroundImage: `url(/assets/img/bg/vector_bg.svg)` }}>
         <div className="container">
            <div className="row justify-content-center">
               <div className="col-lg-6">
                  <div className="section__title text-center white-title mb-50">
                     <span className="sub-title">HOW IT WORKS</span>
                     <h2 className="title">How We Operate Unveiling <br /> Our Logistics Process</h2>
                  </div>
               </div>
            </div>
            <div className="work__item-wrap">
               <div className="row justify-content-center">
                  {work_data.map((item) => (
                     <div key={item.id} className="col-lg-3 col-sm-6">
                        <div className="work__item">
                           <div className="work__icon">
                              <i className={item.icon}></i>
                              <span className="number">{item.number}</span>
                           </div>
                           <div className="work__content">
                              <h4 className="title">{item.title}</h4>
                              <p>{item.desc}</p>
                           </div>
                           <div className="work__shape">
                              <InjectableSvg src="/assets/img/images/work_shape01.svg" alt="" className="injectable" />
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

export default WorkArea
