import project_data from "@/data/ProjectData"
import Image from "next/image"
import Link from "next/link"

const Project = () => {
   return (
      <section className="project__area-four section-pt-140 section-pb-110">
         <div className="container custom-container-three">
            <div className="row justify-content-center">
               <div className="col-xl-5 col-lg-6">
                  <div className="section__title text-center mb-50">
                     <span className="sub-title">Featured Projects</span>
                     <h2 className="title">We Are Proud to Excellence Deliver Success</h2>
                  </div>
               </div>
            </div>
            <div className="row gutter-24">
               {project_data.filter((items) => items.page === "home_4").map((item) => (
                  <div key={item.id} className="col-lg-4 col-md-6">
                     <div className="project__item-three">
                        <div className="project__thumb-three">
                           <Link href="/project-details"><Image src={item.img} alt="img" /></Link>
                        </div>
                        <div className="project__content-three">
                           <span>{item.tag}</span>
                           <h3 className="title"><Link href="/project-details">{item.title}</Link></h3>
                        </div>
                        <div className="project__icon">
                           <Link href="/project-details"><i className="flaticon-diagonal-arrow"></i></Link>
                        </div>
                     </div>
                  </div>
               ))}
            </div>
         </div>
      </section>
   )
}

export default Project
