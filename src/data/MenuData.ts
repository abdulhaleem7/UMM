interface MenuItem {
   id: number;
   title: string;
   link: string;
   has_dropdown: boolean;
   sub_menus?: {
      link: string;
      title: string;
      mega_menu?: {
         link: string;
         title: string;
      }[];
   }[];
};

const menu_data: MenuItem[] = [
   {
      id: 1,
      has_dropdown: false,
      title: "Home",
      link: "home"
   },
   {
      id: 2,
      has_dropdown: false,
      title: "About",
      link: "/about",
   },
   {
      id: 3,
      has_dropdown: false,
      title: "Service",
      link: "/services",
   },
   {
      id: 4,
      has_dropdown: false,
      title: "Project",
      link: "/project",
   },
   {
      id: 5,
      has_dropdown: false,
      title: "FAQ",
      link: "/faq",
   },
   {
      id: 6,
      has_dropdown: false,
      title: "Contact",
      link: "/contact",
   },
   // {
   //    id: 3,
   //    has_dropdown: true,
   //    title: "Pages",
   //    link: "#",
   //    sub_menus: [
   //       { link: "/who-we-are", title: "Who We Are" },
   //       { link: "/history", title: "Our Company History" },
   //       {
   //          link: "#",
   //          title: "Services",
   //          mega_menu: [
   //             { link: "/services", title: "Our Services" },
   //             { link: "/services-details", title: "Services Details" },
   //          ]
   //       },
   //       {
   //          link: "#",
   //          title: "Portfolio",
   //          mega_menu: [
   //             { link: "/project", title: "Our Portfolio" },
   //             { link: "/project-details", title: "Portfolio Details" },
   //          ]
   //       },
   //       {
   //          link: "#",
   //          title: "Team",
   //          mega_menu: [
   //             { link: "/team", title: "Team Page" },
   //             { link: "/team-details", title: "Team Details" },
   //          ]
   //       },
   //       { link: "/how-it-work", title: "How It’s Work" },
   //       { link: "/pricing", title: "Pricing Page" },
   //       { link: "/faq", title: "FAQ Page" },
   //       { link: "/testimonial", title: "Testimonial Page" },
   //       { link: "/client", title: "Our Partners" },
   //    ],
   // },
   // {
   //    id: 4,
   //    has_dropdown: true,
   //    title: "Blog",
   //    link: "#",
   //    sub_menus: [
   //       { link: "/blog", title: "Our Blog" },
   //       { link: "/blog-details", title: "Blog Details" },
   //    ],
   // },
];
export default menu_data;