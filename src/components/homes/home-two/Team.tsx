import Image from "next/image";
import Link from "next/link";
import team_data from "@/data/TeamData";

const Team = () => {
    return (
        <section className="team__area-two section-pt-140 section-pb-110">
            <div className="container">
                <div className="row align-items-center">
                    <div className="col-lg-7">
                        <div className="section__title mb-50 mb-md-30">
                            <span className="sub-title">Expert Team</span>
                            <h2 className="title">Meet Our Executive People</h2>
                        </div>
                    </div>
                    <div className="col-lg-5">
                        <div className="section__content mb-40">
                            <p>Adipiscing elit. Aliquam vulputate, tortor nec comviverra uspen disse faucibus sed dolor eget Sed id urna.</p>
                        </div>
                    </div>
                </div>
                <div className="row gutter-24 justify-content-center">
                    {team_data.filter((items) => items.page === "home_2").map((item) => (
                        <div key={item.id} className="col-xl-3 col-lg-4 col-sm-6">
                            <div className="team__item-two">
                                <div className="team__thumb-two">
                                    <Image src={item.img} alt="img" />
                                </div>
                                <div className="team__content-two">
                                    <h2 className="title"><Link href="/team-details">{item.title}</Link></h2>
                                    <span>{item.designation}</span>
                                </div>
                                <ul className="list-wrap team__social-two">
                                    <li><Link href="https://www.facebook.com/" target="_blank"><i className="fab fa-facebook-f"></i></Link></li>
                                    <li><Link href="https://www.linkedin.com" target="_blank"><i className="fab fa-linkedin-in"></i></Link></li>
                                    <li><Link href="https://www.instagram.com/" target="_blank"><i className="fab fa-instagram"></i></Link></li>
                                    <li><Link href="https://www.pinterest.com/" target="_blank"><i className="fab fa-pinterest-p"></i></Link></li>
                                </ul>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
            <div className="team__overlay-content">
                <h1 className="title">Team</h1>
            </div>
        </section>
    )
}

export default Team
