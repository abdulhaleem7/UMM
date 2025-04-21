import project_data from "@/data/ProjectData"
import Image from "next/image"
import Link from "next/link"

const ProjectArea = () => {
  return (
    <section className="project__area-four section-pt-120 section-pb-90">
      <div className="container custom-container-three">
        <div className="row gutter-24">
          {project_data.filter((items) => items.page === "inner_page").map((item) => (
            <div key={item.id} className="col-lg-4 col-md-6">
              <div className="project__item-three">
                <div className="project__thumb-three">
                  <Link href="/project-details"><Image src={item.img} alt="img" /></Link>
                </div>
                <div className="project__content-three">
                  <span>{item.tag}</span>
                  <h3 className="title"><Link href="/project-details">{item.title}</Link></h3>
                </div>
                {/* <div className="project__icon">
                  <Link href="/project-details"><i className="flaticon-diagonal-arrow"></i></Link>
                </div> */}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default ProjectArea
