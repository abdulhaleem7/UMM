"use client"
import VideoPopup from "@/modals/VideoPopup"
import { useState } from "react"

interface VideoAreaProps {
   style?: boolean;
}
const VideoArea = ({ style }: VideoAreaProps) => {

   const [isVideoOpen, setIsVideoOpen] = useState(false);

   return (
      <>
         <section className="video__area">
            <div className="video__bg" style={{ backgroundImage: `url(/assets/img/bg/video_bg.jpg)` }}></div>
            <div className="container">
               <div className="row align-items-center">
                  <div className="col-xl-7 col-lg-6 order-0 order-lg-2">
                     <div className={`video__play-btn ${style ? "video__play-btn-three" : ""}`}>
                        <a onClick={() => setIsVideoOpen(true)} style={{ cursor: "pointer" }} className="play-btn popup-video"><i className="fas fa-play"></i></a>
                     </div>
                  </div>
                  <div className="col-xl-5 col-lg-6">
                     <div className="video__content">
                        <div className="section__title white-title">
                           <span className="sub-title">Customer Teams & An Agile Services</span>
                           <h2 className="title">We provide the best and fastest courier services nowadays</h2>
                        </div>
                     </div>
                  </div>
               </div>
            </div>
         </section>
         <VideoPopup
            isVideoOpen={isVideoOpen}
            setIsVideoOpen={setIsVideoOpen}
            videoId={"Ml4XCF-JS0k"}
         />
      </>
   )
}

export default VideoArea
