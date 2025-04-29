import Link from "next/link"
import ContactForm from "../form/ContactForm"

const ContactArea = () => {
   return (
      <section className="contact__area section-py-120">
         <div className="container">
            <div className="row">
               <div className="col-12">
                  <div className="contact-map contact-map-two">
                     <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d371913.54563385877!2d-80.26278416434535!3d43.260337155528774!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x882c986c27de778f%3A0x2b6aee56d8df0e21!2sHamilton%2C%20ON%2C%20Canada!5e0!3m2!1sen!2sng!4v1745889028249!5m2!1sen!2sng" style={{border:"0"}} loading="lazy" referrerPolicy="no-referrer-when-downgrade"></iframe>
                  </div>
               </div>
            </div>
            <div className="row">
               <div className="col-lg-4 col-sm-6">
                  <div className="contact__info-item">
                     <h4 className="title">Office in Ontario</h4>
                     <p className="info-one">Hamilton, <br/> Ontario</p>
                     <h4 className="title"><Link href="tel:+1(365-356-3255)">+1(365-356-3255)</Link></h4>
                     <p className="info-two">Monday – Saturday: 8:00-18:00 <br/> </p>
                     <Link href="mailto:admin@unifiedmovingmaster.ca">admin@unifiedmovingmaster.ca</Link>
                  </div>
               </div>
            </div>
            <div className="row">
               <div className="col-12">
                  <div className="contact__form-wrap">
                     <h2 className="title">Send Us Message</h2>
                     <ContactForm />
                     <p className="ajax-response mb-0"></p>
                  </div>
               </div>
            </div>
         </div>
      </section>
   )
}

export default ContactArea
