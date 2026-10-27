import { useEffect, useState } from 'react'
import logo from '../assets/images/logo.png';
import {toast } from 'react-toastify';
import {NavLink, useLocation, useNavigate, useParams } from 'react-router-dom';
import { userAuth } from '../pages/context/AuthContext';
import { FaEye, FaEyeSlash, FaRegUser } from 'react-icons/fa';
import { RxCross2, RxDividerVertical } from 'react-icons/rx';
import imgProfile from '../assets/images/commentImage.jpg'
import { IoIosArrowDown } from 'react-icons/io';
import ButtonPreloader from './ButtonPreloader';
import { userIntern } from '../types/types';

 interface authComponentInterface {
    authAction : boolean,
    setAuthAction: React.Dispatch<React.SetStateAction<boolean>>;
    PopOrder : userIntern[];
    updateStatus : (id : string)=> void;
    handleId : (id : string)=> void;
    loading : boolean;
 }



const UserDetails : React.FC<authComponentInterface> = ({authAction, setAuthAction, PopOrder, updateStatus, handleId, loading}) =>{

  const navigate = useNavigate();
  const {baseUrl} = userAuth();  
  const { pathname } = useLocation();
  const [print, setPrint] = useState<boolean>(false);

    const [homePage, setHomePage] = useState<boolean>(PopOrder[0].menu.homePage ?? false);
    const [brandLogo, setBrandLogo] = useState<boolean>(PopOrder[0].menu.brandLogo ?? false);

    const [pricing, setPricing] = useState<boolean>(PopOrder[0].menu.pricing ?? false);
    const [servicePricing, setServicePricing] = useState<boolean>(PopOrder[0].menu.servicePricing ?? false);
    const [createService, setCreateService] = useState<boolean>(PopOrder[0].menu.createService ?? false);

    const [orders, setOrders] = useState<boolean>(PopOrder[0].menu.orders ?? false);
    const [serviceOrder, setServiceOrder] = useState<boolean>(PopOrder[0].menu.serviceOrder ?? false);

    const [booking, setBooking] = useState<boolean>(PopOrder[0].menu.booking ?? false);
    const [scheduleBooking, setScheduleBooking] = useState<boolean>(PopOrder[0].menu.scheduleBooking ?? false);
    const [createBooking, setCreateBooking] = useState<boolean>(PopOrder[0].menu.createBooking ?? false);

    const [services, setServices] = useState<boolean>(PopOrder[0].menu.services ?? false);
    const [servicesList, setServicesList] = useState<boolean>(PopOrder[0].menu.servicesList ?? false);
    const [createServices, setCreateServices] = useState<boolean>(PopOrder[0].menu.createServices ?? false);

    const [team, setTeam] = useState<boolean>(PopOrder[0].menu.team ?? false);
    const [teamList, setTeamList] = useState<boolean>(PopOrder[0].menu.teamList ?? false);
    const [createTeam, setCreateTeam] = useState<boolean>(PopOrder[0].menu.createTeam ?? false);

    const [blog, setBlog] = useState<boolean>(PopOrder[0].menu.blog ?? false);
    const [blogList, setBlogList] = useState<boolean>(PopOrder[0].menu.blogList ?? false);
    const [createBlog, setCreateBlog] = useState<boolean>(PopOrder[0].menu.createBlog ?? false);

    const [aboutUs, setAboutUs] = useState<boolean>(PopOrder[0].menu.aboutUs ?? false);
    const [aboutUsList, setAboutUsList] = useState<boolean>(PopOrder[0].menu.aboutUsList ?? false);
    const [createAboutUs, setCreateAboutUs] = useState<boolean>(PopOrder[0].menu.createAboutUs ?? false);

    const [contactUs, setContactUs] = useState<boolean>(PopOrder[0].menu.contactUs ?? false);
    const [contact, setContact] = useState<boolean>(PopOrder[0].menu.contact ?? false);
    const [menuEmail, setMenuEmail] = useState<boolean>(PopOrder[0].menu.menuEmail ?? false);
    const [address, setAddress] = useState<boolean>(PopOrder[0].menu.address ?? false);
 

  useEffect(() => {
      window.scrollTo(0, 0);
    }, [pathname]);

 const handlePrint = () => {
    setPrint(true);
  };

  useEffect(() => {
    if (print) {
      setTimeout(() => {
        window.print();
        setPrint(false); 
      }, 100);
    }
  }, [print]);


  return (
    <div className="track-con" style={{display : authAction ? "flex" : "none"}}>

      <div className={print ? "track-con-print" : "track-body viewDetailsPopUp" } >
         
         <div className="track-cancel-con flex-center justification-between">

             <div className="track-header flex-center gap-10">
                  {/* <h1>Order Details</h1> */}
             </div>

            <div className="track-cancel">
                <div className="cancel"  onClick={() => setAuthAction(!authAction)}>
                <RxCross2 />
                </div>
            </div>

         </div>

      {  PopOrder.map((item, index) => (


         <div className='user-details' key={index}>

                <div className="form-con">
                <div className="form-title" style={{textAlign : "center"}}>Admin Profile</div>

                <div className="profileImageCon flex-center gap-10">
                {/* <div className="profileImage">
                {
                item.profileImage ? (
                    <img src={item.profileImage} alt="" />
                ) : (
                    <img src={imgProfile} alt="" />
                )
                }
                </div> */}
                <div className="profileName">
                <div className="name flex-center gap-5">
                <p>{item.name}</p>
                </div>
                <div className="email">{item.email}</div>
                </div>
                </div>

                <div className="profile-section">

                <div className="profile flex-center justification-between">
                <div className="profile-first">phone no</div>
                <div className="profile-second">{item.phoneNumber}</div>
                </div>

                <div className="profile flex-center justification-between">
                <div className="profile-first">address</div>
                <div className="profile-second">{item.address}</div>
                </div>

                <div className="profile flex-center justification-between">
                <div className="profile-first">status</div>
                <div className="profile-second">
                {
                item.status == "inactive" ? (
                <div className="delete">Restricted</div>
                ) : (
                <div className="active">active</div>
                )
                }
                </div>
                </div>

                </div>

                {/* <div className="profileEditBtn" onClick={bioFunction}>Edit profile</div> */}

                </div>

              <div className="role-con">
                 <div className="profile-second">ROLE ACCESS</div>

                    <div className="wrapper-containers">
                         <div className="wrapper-parent">
                                      {/* Homepage */}
                                      <div className="wrapper-flex">
                                      <div
                                      className={`radio-con ${homePage ? "color" : "nocolor"}`}
                                      onClick={() => setHomePage(!homePage)}
                                      ></div>
                                      <div className="container-parent-flex">
                                      <div className="container">
                                      <p>homepage</p>
                                      </div>
                                      <IoIosArrowDown />
                                      </div>
                                      </div>
                        
                                      {homePage && (
                                      <div className="wrapper-flex-parent">
                                      <div className="wrapper-flex">
                                      <div
                                      className={`radio-con ${brandLogo ? "color" : "nocolor"}`}
                                      onClick={() => setBrandLogo(!brandLogo)}
                                      ></div>
                                      <div className="container-child">
                                      <p>brand logo</p>
                                      </div>
                                      </div>
                                      </div>
                                      )}
                                      </div>
                        
                                      <div className="wrapper-parent">
                                      {/* Pricing */}
                                      <div className="wrapper-flex">
                                        <div
                                          className={`radio-con ${pricing ? "color" : "nocolor"}`}
                                          onClick={() => setPricing(!pricing)}
                                        ></div>
                        
                                        <div className="container-parent-flex">
                                          <div className="container">
                                            <p>pricing</p>
                                          </div>
                                          <IoIosArrowDown />
                                        </div>
                                      </div>
                        
                                      {pricing && (
                                        <div className="wrapper-flex-parent">
                                          <div className="wrapper-flex">
                                            <div
                                              className={`radio-con ${servicePricing ? "color" : "nocolor"}`}
                                              onClick={() => setServicePricing(!servicePricing)}
                                            ></div>
                                            <div className="container-child">
                                              <p>service pricing</p>
                                            </div>
                                          </div>
                        
                                          <div className="wrapper-flex">
                                            <div
                                              className={`radio-con ${createService ? "color" : "nocolor"}`}
                                              onClick={() => setCreateService(!createService)}
                                            ></div>
                                            <div className="container-child">
                                              <p>create service</p>
                                            </div>
                                          </div>
                                        </div>
                                      )}
                                      </div>
                        
                                      <div className="wrapper-parent">
                                      {/* Orders */}
                                      <div className="wrapper-flex">
                                        <div
                                          className={`radio-con ${orders ? "color" : "nocolor"}`}
                                          onClick={() => setOrders(!orders)}
                                        ></div>
                        
                                        <div className="container-parent-flex">
                                          <div className="container">
                                            <p>orders</p>
                                          </div>
                                          <IoIosArrowDown />
                                        </div>
                                      </div>
                        
                                      {orders && (
                                        <div className="wrapper-flex-parent">
                                          <div className="wrapper-flex">
                                            <div
                                              className={`radio-con ${serviceOrder ? "color" : "nocolor"}`}
                                              onClick={() => setServiceOrder(!serviceOrder)}
                                            ></div>
                                            <div className="container-child">
                                              <p>service order</p>
                                            </div>
                                          </div>
                                        </div>
                                      )}
                                      </div>
                        
                                      <div className="wrapper-parent">
                                      {/* Booking */}
                                      <div className="wrapper-flex">
                                        <div
                                          className={`radio-con ${booking ? "color" : "nocolor"}`}
                                          onClick={() => setBooking(!booking)}
                                        ></div>
                        
                                        <div className="container-parent-flex">
                                          <div className="container">
                                            <p>booking</p>
                                          </div>
                                          <IoIosArrowDown />
                                        </div>
                                      </div>
                        
                                      {booking && (
                                        <div className="wrapper-flex-parent">
                                          <div className="wrapper-flex">
                                            <div
                                              className={`radio-con ${scheduleBooking ? "color" : "nocolor"}`}
                                              onClick={() => setScheduleBooking(!scheduleBooking)}
                                            ></div>
                                            <div className="container-child">
                                              <p>schedule booking</p>
                                            </div>
                                          </div>
                        
                                          <div className="wrapper-flex">
                                            <div
                                              className={`radio-con ${createBooking ? "color" : "nocolor"}`}
                                              onClick={() => setCreateBooking(!createBooking)}
                                            ></div>
                                            <div className="container-child">
                                              <p>create booking</p>
                                            </div>
                                          </div>
                                        </div>
                                      )}
                                      </div>
                        
                                      <div className="wrapper-parent">
                                      {/* Services */}
                                      <div className="wrapper-flex">
                                        <div
                                          className={`radio-con ${services ? "color" : "nocolor"}`}
                                          onClick={() => setServices(!services)}
                                        ></div>
                        
                                        <div className="container-parent-flex">
                                          <div className="container">
                                            <p>services</p>
                                          </div>
                                          <IoIosArrowDown />
                                        </div>
                                      </div>
                        
                                      {services && (
                                        <div className="wrapper-flex-parent">
                                          <div className="wrapper-flex">
                                            <div
                                              className={`radio-con ${servicesList ? "color" : "nocolor"}`}
                                              onClick={() => setServicesList(!servicesList)}
                                            ></div>
                                            <div className="container-child">
                                              <p>services list</p>
                                            </div>
                                          </div>
                        
                                          <div className="wrapper-flex">
                                            <div
                                              className={`radio-con ${createServices ? "color" : "nocolor"}`}
                                              onClick={() => setCreateServices(!createServices)}
                                            ></div>
                                            <div className="container-child">
                                              <p>create services</p>
                                            </div>
                                          </div>
                                        </div>
                                      )}
                                      </div>
                        
                                      <div className="wrapper-parent">
                                      {/* Team */}
                                      <div className="wrapper-flex">
                                        <div
                                          className={`radio-con ${team ? "color" : "nocolor"}`}
                                          onClick={() => setTeam(!team)}
                                        ></div>
                        
                                        <div className="container-parent-flex">
                                          <div className="container">
                                            <p>team</p>
                                          </div>
                                          <IoIosArrowDown />
                                        </div>
                                      </div>
                        
                                      {team && (
                                        <div className="wrapper-flex-parent">
                                          <div className="wrapper-flex">
                                            <div
                                              className={`radio-con ${teamList ? "color" : "nocolor"}`}
                                              onClick={() => setTeamList(!teamList)}
                                            ></div>
                                            <div className="container-child">
                                              <p>team list</p>
                                            </div>
                                          </div>
                        
                                          <div className="wrapper-flex">
                                            <div
                                              className={`radio-con ${createTeam ? "color" : "nocolor"}`}
                                              onClick={() => setCreateTeam(!createTeam)}
                                            ></div>
                                            <div className="container-child">
                                              <p>create team</p>
                                            </div>
                                          </div>
                                        </div>
                                      )}
                                      </div>
                        
                                      <div className="wrapper-parent">
                                      {/* Blog */}
                                      <div className="wrapper-flex">
                                        <div
                                          className={`radio-con ${blog ? "color" : "nocolor"}`}
                                          onClick={() => setBlog(!blog)}
                                        ></div>
                        
                                        <div className="container-parent-flex">
                                          <div className="container">
                                            <p>blog</p>
                                          </div>
                                          <IoIosArrowDown />
                                        </div>
                                      </div>
                        
                                      {blog && (
                                        <div className="wrapper-flex-parent">
                                          <div className="wrapper-flex">
                                            <div
                                              className={`radio-con ${blogList ? "color" : "nocolor"}`}
                                              onClick={() => setBlogList(!blogList)}
                                            ></div>
                                            <div className="container-child">
                                              <p>blog list</p>
                                            </div>
                                          </div>
                        
                                          <div className="wrapper-flex">
                                            <div
                                              className={`radio-con ${createBlog ? "color" : "nocolor"}`}
                                              onClick={() => setCreateBlog(!createBlog)}
                                            ></div>
                                            <div className="container-child">
                                              <p>create blog</p>
                                            </div>
                                          </div>
                                        </div>
                                      )}
                                      </div>
                        
                                      <div className="wrapper-parent">
                                      {/* About Us */}
                                      <div className="wrapper-flex">
                                        <div
                                          className={`radio-con ${aboutUs ? "color" : "nocolor"}`}
                                          onClick={() => setAboutUs(!aboutUs)}
                                        ></div>
                        
                                        <div className="container-parent-flex">
                                          <div className="container">
                                            <p>about us</p>
                                          </div>
                                          <IoIosArrowDown />
                                        </div>
                                      </div>
                        
                                      {aboutUs && (
                                        <div className="wrapper-flex-parent">
                                          <div className="wrapper-flex">
                                            <div
                                              className={`radio-con ${aboutUsList ? "color" : "nocolor"}`}
                                              onClick={() => setAboutUsList(!aboutUsList)}
                                            ></div>
                                            <div className="container-child">
                                              <p>about us list</p>
                                            </div>
                                          </div>
                        
                                          <div className="wrapper-flex">
                                            <div
                                              className={`radio-con ${createAboutUs ? "color" : "nocolor"}`}
                                              onClick={() => setCreateAboutUs(!createAboutUs)}
                                            ></div>
                                            <div className="container-child">
                                              <p>create about us</p>
                                            </div>
                                          </div>
                                        </div>
                                      )}
                                      </div>
                        
                                      <div className="wrapper-parent">
                                      {/* Contact Us */}
                                      <div className="wrapper-flex">
                                        <div
                                          className={`radio-con ${contactUs ? "color" : "nocolor"}`}
                                          onClick={() => setContactUs(!contactUs)}
                                        ></div>
                        
                                        <div className="container-parent-flex">
                                          <div className="container">
                                            <p>contact us</p>
                                          </div>
                                          <IoIosArrowDown />
                                        </div>
                                      </div>
                        
                                      {contactUs && (
                                        <div className="wrapper-flex-parent">
                                          <div className="wrapper-flex">
                                            <div
                                              className={`radio-con ${contact ? "color" : "nocolor"}`}
                                              onClick={() => setContact(!contact)}
                                            ></div>
                                            <div className="container-child">
                                              <p>contact</p>
                                            </div>
                                          </div>
                        
                                          <div className="wrapper-flex">
                                            <div
                                              className={`radio-con ${menuEmail ? "color" : "nocolor"}`}
                                              onClick={() => setMenuEmail(!menuEmail)}
                                            ></div>
                                            <div className="container-child">
                                              <p>email</p>
                                            </div>
                                          </div>
                        
                                          <div className="wrapper-flex">
                                            <div
                                              className={`radio-con ${address ? "color" : "nocolor"}`}
                                              onClick={() => setAddress(!address)}
                                            ></div>
                                            <div className="container-child">
                                              <p>address</p>
                                            </div>
                                          </div>
                                        </div>
                                      )}
                                      </div>
                    </div>
              
            

              </div>

              <div className="role-button">

                  <div className="profileEdit" onClick={() => handleId(PopOrder[0].userId)}>
                    Edit 
                 </div>

                 
                    {
                        loading ? (
                         <ButtonPreloader/>
                        ) : (
                        PopOrder[0].status == "inactive" ? (
                            <div className="profileActiveBtn" onClick={() => updateStatus(PopOrder[0].userId)}>
                                Activate
                            </div>
                           
                        ) : (
                            <div className="profileDeleteBtn" onClick={() => updateStatus(PopOrder[0].userId)}>
                            Restrict
                        </div>
                        )
                    )

                   }
                
              </div>

         </div>
       ))}

      </div>

    </div>
  )
}

export default UserDetails


