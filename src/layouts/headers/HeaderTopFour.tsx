import Link from "next/link"

const HeaderTopFour = () => {

   return (
      <div className="tg-header__top tg-header__top-two">
         <div className="container-fluid p-0">
            <div className="row align-items-center">
               <div className="col-xl-7">
                  <ul className="tg-header__top-info tg-header__top-info-two left-side list-wrap">
                     <li><i className="flaticon-location-1"></i>Hamilton Ontario</li>
                     <li><i className="flaticon-envelope"></i><a href="mailto:info@unifiedmastermovers.com">info@unifiedmastermovers.com</a></li>
                     <li><i className="flaticon-time"></i>Mon – Sun: 9.00 am – 8.00pm</li>
                  </ul>
               </div>
               <div className="col-xl-5">
                  <div className="tg-header__top-right tg-header__top-right-two">
                     <ul className="tg-header__top-menu tg-header__top-menu-two list-wrap">
                        <li><Link href="/contact">Help Center</Link></li>
                        <li><Link href="/contact">Find Store</Link></li>
                     </ul>
                     <div className="tg-header__top-social tg-header__top-social-two">
                        <span>Follow Us On:</span>
                        <ul className="list-wrap">
                           <li><Link href="https://www.facebook.com/" target="_blank"><i className="fab fa-facebook-f"></i></Link></li>
                           <li><Link href="https://twitter.com" target="_blank"><i className="fab fa-twitter"></i></Link></li>
                           <li><Link href="https://www.whatsapp.com/" target="_blank"><i className="fab fa-whatsapp"></i></Link></li>
                           <li><Link href="https://www.instagram.com/" target="_blank"><i className="fab fa-instagram"></i></Link></li>
                           <li><Link href="https://www.youtube.com/" target="_blank"><i className="fab fa-youtube"></i></Link></li>
                        </ul>
                     </div>
                  </div>
               </div>
            </div>
         </div>
      </div>
   )
}

export default HeaderTopFour
