import React, { useEffect, useState } from 'react'
import { MdHome, MdLogout, MdMiscellaneousServices} from 'react-icons/md';
import { NavLink } from 'react-router-dom'
import { userAuth } from '../pages/context/AuthContext';
import { LuChartNoAxesCombined, LuUsers } from 'react-icons/lu';
import { BsQuestionCircle, BsShop } from 'react-icons/bs';
import { GoDeviceCameraVideo } from 'react-icons/go';
import { RxEnvelopeClosed } from 'react-icons/rx';
import { BiHome } from 'react-icons/bi';
import { PiNewspaperClippingLight } from 'react-icons/pi';
import ButtonPreloader from './ButtonPreloader';
import { toast } from 'react-toastify';
import { FaBlog, FaProductHunt, FaRegUser } from 'react-icons/fa';
import { IoMdContacts } from 'react-icons/io';


interface MenuItem {
    title: string;
    link?: string;
    icon : JSX.Element;
  }
  
  const menuItems: MenuItem[] = [
    {
      title: 'overview',
      link: '/admin/admin-dashboard',
      icon : <LuChartNoAxesCombined />
    },
    {
      title: 'homepage',
      link: '/admin/home-page',
      icon : <BiHome />
    },
    {
      title: 'sub admin',
      link: '/admin/sub-admin',
      icon : <BiHome />
    },
    {
      title: 'pricing',
      link: '/admin/service-price',
      icon : <BiHome />
    },
    {
      title: 'order',
      link: '/admin/service-order',
      icon : <BiHome />
    },
  
    {
      title: 'booking',
      link: '/admin/admin-consult',
      icon : <BiHome />
    },
    {
      title: 'services',
      link: '/admin/admin-services',
      icon : <MdMiscellaneousServices />
    },
    {
      title: 'team',
      link: '/admin/team',
      icon : <FaRegUser />
    },
    {
      title: 'blog',
      link: '/admin/admin-blog',
      icon : <FaBlog />
    },
    {
      title: 'about us',
      link: '/admin/about-us',
      icon : <PiNewspaperClippingLight />
    },
    {
      title: 'contact us',
      link: '/admin/contact-us',
      icon : <IoMdContacts />
    },
    {
      title: 'setting',
      link: '/admin/change-password',
      icon : <MdMiscellaneousServices />
    }
    
   
  ];


interface SideNavProps {
    open: boolean;
    setOpen: (open: boolean) => void;
  }
  


  const SideNavAdmin = () => {

    const {adminLoading, role, homePage, pricing, orders, booking, services, team, blog, aboutUs, contactUs, logout} = userAuth(); 
  

  return (
    <>

<div className='sidebar'>

{/* sidebar__inner start */}
<div className="sidebar_inner">

   {
    role == "admin" ? (
    <ul className="sidebar_menu">
    {/* -------------------------------- */}

    {menuItems.map((menuItem, index) => (
        <li key={index} className='sidebar-menu-item'>
      
            <NavLink to={menuItem.link!} className={({ isActive }) =>
              `flex-center gap-20 nav-link sidebar-parent ${isActive ? 'active-nav' : ''}`
            }>

              
              <div className="menuIcon">
                {menuItem.icon}
              </div> 
              <div className="menu-title">{menuItem.title}</div> 
            </NavLink>
        </li>
      ))}

    {/* ------------------------------------- */}
      
    </ul>
    ) : (
      <ul className="sidebar_menu">
                <li className="sidebar-menu-item">
                <NavLink to="/admin/admin-dashboard" className={({ isActive }) =>
                `flex-center gap-20 nav-link sidebar-parent ${isActive ? 'active-nav' : ''}`
                }>
                <div className="menuIcon"><LuChartNoAxesCombined /></div>
                <div className="menu-title">overview</div>
                </NavLink>
                </li>



   
    

                {/* Homepage */}
          {homePage && (
          <li className="sidebar-menu-item">
          <NavLink to="/admin/home-page" className={({ isActive }) =>
            `flex-center gap-20 nav-link sidebar-parent ${isActive ? 'active-nav' : ''}`
          }>
            <div className="menuIcon"><BiHome /></div>
            <div className="menu-title">homepage</div>
          </NavLink>
          </li>
          )}
                {/* pricing */}
          {pricing && (
          <li className="sidebar-menu-item">
          <NavLink to="/admin/service-price" className={({ isActive }) =>
            `flex-center gap-20 nav-link sidebar-parent ${isActive ? 'active-nav' : ''}`
          }>
            <div className="menuIcon"><BiHome /></div>
            <div className="menu-title">pricing</div>
          </NavLink>
          </li>
          )}

          {/* order */}
{orders && (
  <li className="sidebar-menu-item">
    <NavLink
      to="/admin/service-order"
      className={({ isActive }) =>
        `flex-center gap-20 nav-link sidebar-parent ${isActive ? 'active-nav' : ''}`
      }
    >
      <div className="menuIcon"><BiHome /></div>
      <div className="menu-title">order</div>
    </NavLink>
  </li>
)}

{/* booking */}
{booking && (
  <li className="sidebar-menu-item">
    <NavLink
      to="/admin/admin-consult"
      className={({ isActive }) =>
        `flex-center gap-20 nav-link sidebar-parent ${isActive ? 'active-nav' : ''}`
      }
    >
      <div className="menuIcon"><BiHome /></div>
      <div className="menu-title">booking</div>
    </NavLink>
  </li>
)}

{/* services */}
{services && (
  <li className="sidebar-menu-item">
    <NavLink
      to="/admin/admin-services"
      className={({ isActive }) =>
        `flex-center gap-20 nav-link sidebar-parent ${isActive ? 'active-nav' : ''}`
      }
    >
      <div className="menuIcon"><MdMiscellaneousServices /></div>
      <div className="menu-title">services</div>
    </NavLink>
  </li>
)}

{/* team */}
{team && (
  <li className="sidebar-menu-item">
    <NavLink
      to="/admin/team"
      className={({ isActive }) =>
        `flex-center gap-20 nav-link sidebar-parent ${isActive ? 'active-nav' : ''}`
      }
    >
      <div className="menuIcon"><FaRegUser /></div>
      <div className="menu-title">team</div>
    </NavLink>
  </li>
)}

{/* blog */}
{blog && (
  <li className="sidebar-menu-item">
    <NavLink
      to="/admin/admin-blog"
      className={({ isActive }) =>
        `flex-center gap-20 nav-link sidebar-parent ${isActive ? 'active-nav' : ''}`
      }
    >
      <div className="menuIcon"><FaBlog /></div>
      <div className="menu-title">blog</div>
    </NavLink>
  </li>
)}

{/* about us */}
{aboutUs && (
  <li className="sidebar-menu-item">
    <NavLink
      to="/admin/about-us"
      className={({ isActive }) =>
        `flex-center gap-20 nav-link sidebar-parent ${isActive ? 'active-nav' : ''}`
      }
    >
      <div className="menuIcon"><PiNewspaperClippingLight /></div>
      <div className="menu-title">about us</div>
    </NavLink>
  </li>
)}

{/* contact us */}
{contactUs && (
  <li className="sidebar-menu-item">
    <NavLink
      to="/admin/contact-us"
      className={({ isActive }) =>
        `flex-center gap-20 nav-link sidebar-parent ${isActive ? 'active-nav' : ''}`
      }
    >
      <div className="menuIcon"><IoMdContacts /></div>
      <div className="menu-title">contact us</div>
    </NavLink>
  </li>
)}



          <li className="sidebar-menu-item">
                <NavLink to="/admin/change-password" className={({ isActive }) =>
                `flex-center gap-20 nav-link sidebar-parent ${isActive ? 'active-nav' : ''}`
                }>
                <div className="menuIcon"><LuChartNoAxesCombined /></div>
                <div className="menu-title">setting</div>
                </NavLink>
            </li>

       
      </ul>
    )
  }

<div className="nav-bottom">


{
  adminLoading ? (
    <div className="logout-con" onClick={() => logout()}> 
          <ButtonPreloader />
    </div> 
  ) : (
    <div className="logout-con" onClick={() => logout()}> 
          <NavLink to="#" className="delete">
          <MdLogout />
        <p>log out</p> 
        </NavLink>
    </div> 
  )
}


</div>

</div> 
{/* sidebar__inner end */}


</div>
</>
  )
}

export default SideNavAdmin
