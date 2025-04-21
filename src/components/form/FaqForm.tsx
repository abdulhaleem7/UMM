import InjectableSvg from "@/components/common/InjectableSvg"

const FaqForm = () => {
   return (
      <form onSubmit={(e) => e.preventDefault()} className="request__form-three">
         <div className="form-grp select-grp">
            <select name="select__service" className="orderby">
               <option value="Select Service">Select Service</option>
               <option value="Incoterms">Incoterms</option>
               <option value="Incoterms">Incoterms</option>
            </select>
         </div>
         <div className="form-grp select-grp">
            <select name="service__type" className="orderby">
               <option value="Service Type">Service Type</option>
               <option value="Incoterms">Incoterms</option>
               <option value="Incoterms">Incoterms</option>
            </select>
         </div>
         <div className="form-grp">
            <input type="text" placeholder="Company Name" />
         </div>
         <div className="form-grp">
            <input type="email" placeholder="E-mail Address" />
         </div>
         <div className="form-grp">
            <input type="number" placeholder="Phone" />
         </div>
         <button className="btn">Submit Request <InjectableSvg src="/assets/img/icon/right_arrow.svg" alt="" className="injectable" /></button>
      </form>
   )
}

export default FaqForm
