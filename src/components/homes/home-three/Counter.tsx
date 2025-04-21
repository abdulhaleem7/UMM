import Count from "@/components/common/Count"

const Counter = () => {
   return (
      <section className="counter__area-two">
         <div className="container">
            <div className="counter__item-wrap">
               <div className="row">
                  <div className="col-lg-3 col-sm-6">
                     <div className="counter__item-two">
                        <div className="counter__icon-two">
                           <i className="flaticon-air-plane"></i>
                        </div>
                        <div className="counter__content-two">
                           <h2 className="count"><span className="counter-number"><Count number={165} /> </span>+</h2>
                           <p>Product delivery</p>
                        </div>
                     </div>
                  </div>
                  <div className="col-lg-3 col-sm-6">
                     <div className="counter__item-two">
                        <div className="counter__icon-two">
                           <i className="flaticon-parcels"></i>
                        </div>
                        <div className="counter__content-two">
                           <h2 className="count"><span className="counter-number"><Count number={42} /> </span>+</h2>
                           <p>Winning Awards</p>
                        </div>
                     </div>
                  </div>
                  <div className="col-lg-3 col-sm-6">
                     <div className="counter__item-two">
                        <div className="counter__icon-two">
                           <i className="flaticon-parcel"></i>
                        </div>
                        <div className="counter__content-two">
                           <h2 className="count"><span className="counter-number"><Count number={30} /></span>+</h2>
                           <p>Years Experience</p>
                        </div>
                     </div>
                  </div>
                  <div className="col-lg-3 col-sm-6">
                     <div className="counter__item-two">
                        <div className="counter__icon-two">
                           <i className="flaticon-protected"></i>
                        </div>
                        <div className="counter__content-two">
                           <h2 className="count"><span className="counter-number"><Count number={65} /></span>+</h2>
                           <p>Secure Parcel</p>
                        </div>
                     </div>
                  </div>
               </div>
            </div>
         </div>
      </section>
   )
}

export default Counter
