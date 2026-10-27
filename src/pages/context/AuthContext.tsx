import React, { createContext, useContext, useState, useEffect, ReactNode, MouseEventHandler } from 'react';
import {useLocation, useNavigate } from 'react-router-dom';

  interface AuthProviderProps {
    children: ReactNode;
  }

 interface accountDetails {
        accountName : string,
        accountNumber : string,
        bankCode : string,
        bankName : string,
        customerName : string,
  }

  interface AuthContextType {
      loggedIn: boolean;
      googleIn: boolean;
      loginAuth: Function;
      logInUser: Function;
      logout: Function;
      setLoggedIn: Function;
      setGoogleIn: Function;
      setUserId : Function;
      setName : Function;
      setEmail : Function;
      setMobile1 : Function;
      setMobile2 : Function;
      setAddress1 : Function;
      setAddress2 : Function;
      setPhoneNumber1 : Function;
      setPhoneNumber2 : Function;
      setState : Function;
      setCity : Function;
      setPostalCode : Function;
      setImage : Function;
      setCart : Function;
      setNotification : Function;
      setRole : Function;
      setSignin : Function;
      setAdminLoading : Function;
      setToken : Function;
      baseUrl: string; 
      userId : string;
      name : string;
      email : string;
      mobile1 : string;
      mobile2 : string;
      address1 : string;
      address2 : string;
      phoneNumber1 : string;
      phoneNumber2 : string;
      state : string;
      city : string;
      postalCode : string;
      image : string;
      cart : string;
      notification : string;
      role : string;
      signin : boolean;
      adminLoading : boolean;
      token: string;


      // New UI state flags
homePage: boolean;
brandLogo: boolean;
pricing: boolean;
servicePricing: boolean;
createService: boolean;
orders: boolean;
serviceOrder: boolean;
booking: boolean;
scheduleBooking: boolean;
createBooking: boolean;
services: boolean;
servicesList: boolean;
createServices: boolean;
team: boolean;
teamList: boolean;
createTeam: boolean;
blog: boolean;
blogList: boolean;
createBlog: boolean;
aboutUs: boolean;
aboutUsList: boolean;
createAboutUs: boolean;
contactUs: boolean;
contact: boolean;
menuEmail: boolean;
address: boolean;

// Setters for new UI state
setHomePage: Function;
setBrandLogo: Function;
setPricing: Function;
setServicePricing: Function;
setCreateService: Function;
setOrders: Function;
setServiceOrder: Function;
setBooking: Function;
setScheduleBooking: Function;
setCreateBooking: Function;
setServices: Function;
setServicesList: Function;
setCreateServices: Function;
setTeam: Function;
setTeamList: Function;
setCreateTeam: Function;
setBlog: Function;
setBlogList: Function;
setCreateBlog: Function;
setAboutUs: Function;
setAboutUsList: Function;
setCreateAboutUs: Function;
setContactUs: Function;
setContact: Function;
setMenuEmail: Function;
setAddress: Function;

// Bulk updater
updateUIState: Function;
      }
  
  const AuthContext = createContext<AuthContextType>({
      loggedIn: false,
      googleIn: false,
      loginAuth: () => {},
      logInUser: () => {},
      logout: () => {},
      setLoggedIn : () => {},
      setGoogleIn : () => {},
      setUserId  : () => {},
      setName  : () => {},
      setEmail  : () => {},
      setMobile1  : () => {},
      setMobile2  : () => {},
      setAddress1  : () => {},
      setAddress2  : () => {},
      setPhoneNumber1  : () => {},
      setPhoneNumber2  : () => {},
      setState  : () => {},
      setCity  : () => {},
      setPostalCode  : () => {},
      setImage  : () => {},
      setCart : () => {},
      setNotification : () => {},
      setRole  : () => {},
      setSignin : () => {},
      setAdminLoading  : () => {},
      setToken  : () => {},
      baseUrl: '',
      userId : '',
      name : '',
      email : '',
      mobile1 : '',
      mobile2 : '',
      address1 : '',
      address2 : '',
      phoneNumber1 : '',
      phoneNumber2 : '',
      state : '',
      city : '',
      postalCode : '',
      image : '',
      cart : '',
      notification : '',
      role : '',
      signin : false,
      adminLoading  : false,
      token: '',


      // New UI state flags
homePage: false,
brandLogo: false,
pricing: false,
servicePricing: false,
createService: false,
orders: false,
serviceOrder: false,
booking: false,
scheduleBooking: false,
createBooking: false,
services: false,
servicesList: false,
createServices: false,
team: false,
teamList: false,
createTeam: false,
blog: false,
blogList: false,
createBlog: false,
aboutUs: false,
aboutUsList: false,
createAboutUs: false,
contactUs: false,
contact: false,
menuEmail: false,
address: false,

// Setters for new UI state
setHomePage:  () => {},
setBrandLogo:  () => {},
setPricing:  () => {},
setServicePricing:  () => {},
setCreateService:  () => {},
setOrders:  () => {},
setServiceOrder:  () => {},
setBooking:  () => {},
setScheduleBooking:  () => {},
setCreateBooking:  () => {},
setServices:  () => {},
setServicesList:  () => {},
setCreateServices:  () => {},
setTeam:  () => {},
setTeamList:  () => {},
setCreateTeam:  () => {},
setBlog:  () => {},
setBlogList:  () => {},
setCreateBlog:  () => {},
setAboutUs:  () => {},
setAboutUsList:  () => {},
setCreateAboutUs:  () => {},
setContactUs:  () => {},
setContact:  () => {},
setMenuEmail:  () => {},
setAddress:  () => {},

// Bulk updater
updateUIState:  () => {},
  });

 const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {

    const navigate = useNavigate();
    const location = useLocation();
   
    const [baseUrl] = useState<string>('http://127.0.0.1:8000/api/v1');
    
    // const [baseUrl] = useState<string>('https://softapi.softnets.net/api/v1');

  // ==========================================
    const [userId, setUserId] = useState<string>('');
    const [name, setName] = useState<string>('');
    const [email, setEmail] = useState<string>('');
    const [mobile1, setMobile1] = useState<string>('');
    const [mobile2, setMobile2] = useState<string>('');
    const [address1, setAddress1] = useState<string>('');
    const [address2, setAddress2] = useState<string>('');
    const [phoneNumber1, setPhoneNumber1] = useState<string>('');
    const [phoneNumber2, setPhoneNumber2] = useState<string>('');
    const [state, setState] = useState<string>('');
    const [city, setCity] = useState<string>('');
    const [postalCode, setPostalCode] = useState<string>('');
    const [image, setImage] = useState<string>('');
    const [cart, setCart] = useState<string>('');
    const [notification, setNotification] = useState<string>('');
    const [role, setRole] = useState<string>('');
    const [signin, setSignin] = useState<boolean>(false);
    const [googleIn, setGoogleIn] = useState<boolean>(false);

    const [adminLoading, setAdminLoading] = useState<boolean>(false);



    const [homePage, setHomePage] = useState<boolean>(false);
    const [brandLogo, setBrandLogo] = useState<boolean>(false);
    const [pricing, setPricing] = useState<boolean>(false);
    const [servicePricing, setServicePricing] = useState<boolean>(false);
    const [createService, setCreateService] = useState<boolean>(false);
    const [orders, setOrders] = useState<boolean>(false);
    const [serviceOrder, setServiceOrder] = useState<boolean>(false);
    const [booking, setBooking] = useState<boolean>(false);
    const [scheduleBooking, setScheduleBooking] = useState<boolean>(false);
    const [createBooking, setCreateBooking] = useState<boolean>(false);
    const [services, setServices] = useState<boolean>(false);
    const [servicesList, setServicesList] = useState<boolean>(false);
    const [createServices, setCreateServices] = useState<boolean>(false);
    const [team, setTeam] = useState<boolean>(false);
    const [teamList, setTeamList] = useState<boolean>(false);
    const [createTeam, setCreateTeam] = useState<boolean>(false);
    const [blog, setBlog] = useState<boolean>(false);
    const [blogList, setBlogList] = useState<boolean>(false);
    const [createBlog, setCreateBlog] = useState<boolean>(false);
    const [aboutUs, setAboutUs] = useState<boolean>(false);
    const [aboutUsList, setAboutUsList] = useState<boolean>(false);
    const [createAboutUs, setCreateAboutUs] = useState<boolean>(false);
    const [contactUs, setContactUs] = useState<boolean>(false);
    const [contact, setContact] = useState<boolean>(false);
    const [menuEmail, setMenuEmail] = useState<boolean>(false);
    const [address, setAddress] = useState<boolean>(false);
  
  // =========================

    const [token, setToken] = useState<string>(() => {
      const storedToken = localStorage.getItem('myToken');
      return storedToken ? storedToken : '';
    });   
  
    const [loggedIn, setLoggedIn] = useState<boolean>(() => {
      const storedState = localStorage.getItem('myState');
      return storedState ? JSON.parse(storedState) : false;
    });
  
    const logInUser = () => {
      setLoggedIn(true);
      setSignin(true);
      localStorage.setItem('myState', JSON.stringify(true));
    };
  
    const loginAuth = (userId: string, name: string, email: string,  address1: string, address2 : string, phoneNumber1 : string, phoneNumber2 : string, state : string, city : string, postalCode: string, image: string, cart : string, notification : string, role: string, token?: string) => {
         setUserId(userId);
         setName(name);
         setEmail(email);
         setAddress1(address1);
         setAddress2(address2);
         setPhoneNumber1(phoneNumber1);
         setPhoneNumber2(phoneNumber2);
         setState(state);
         setCity(city);
         setPostalCode(postalCode);
         setImage(image);
         setCart(cart);         
         setNotification(notification);
         setRole(role);
      if(token){
          localStorage.setItem('myToken', token);
          setToken(token);
      }
      
    }

    const logout = (event?: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
      const storedToken: string | null = localStorage.getItem('myToken');
      const tokens: string = storedToken || '';
      setAdminLoading(true);
      if(tokens !== ''){
         logOutUser(tokens);
      }else{
        localStorage.removeItem("myState");
        localStorage.removeItem("myToken");
        setAdminLoading(false);
        setSignin(false);
        navigate("/");
      }
    };

    const logOutUser = async (tokens : string) => {
      setAdminLoading(true);
      const myHeaders = new Headers();
      myHeaders.append("Content-Type", "application/json");
      myHeaders.append("Authorization", tokens);
      const requestOptions: RequestInit = {
        method: 'GET',
        headers: myHeaders,
        redirect: 'follow'
      };
      try {
        const response = await fetch(`${baseUrl}/auth/logout`, requestOptions);
        if (!response.ok) {
          const errorResponse = await response.json();
          throw new Error(errorResponse.message);
        }
        const result = await response.json();
        setAdminLoading(false);
          localStorage.removeItem("myState");
          localStorage.removeItem("myToken");
          setSignin(false);
          navigate("/");
      } catch (error) {
        localStorage.removeItem("myState");
        localStorage.removeItem("myToken");
        navigate("/");
      }
  };
   

const updateUIState = (newState: {
  homePage?: boolean;
  brandLogo?: boolean;
  pricing?: boolean;
  servicePricing?: boolean;
  createService?: boolean;
  orders?: boolean;
  serviceOrder?: boolean;
  booking?: boolean;
  scheduleBooking?: boolean;
  createBooking?: boolean;
  services?: boolean;
  servicesList?: boolean;
  createServices?: boolean;
  team?: boolean;
  teamList?: boolean;
  createTeam?: boolean;
  blog?: boolean;
  blogList?: boolean;
  createBlog?: boolean;
  aboutUs?: boolean;
  aboutUsList?: boolean;
  createAboutUs?: boolean;
  contactUs?: boolean;
  contact?: boolean;
  menuEmail?: boolean;
  address?: boolean;
}) => {
  if (newState.homePage !== undefined) setHomePage(newState.homePage);
  if (newState.brandLogo !== undefined) setBrandLogo(newState.brandLogo);

  if (newState.pricing !== undefined) setPricing(newState.pricing);
  if (newState.servicePricing !== undefined) setServicePricing(newState.servicePricing);
  if (newState.createService !== undefined) setCreateService(newState.createService);

  if (newState.orders !== undefined) setOrders(newState.orders);
  if (newState.serviceOrder !== undefined) setServiceOrder(newState.serviceOrder);

  if (newState.booking !== undefined) setBooking(newState.booking);
  if (newState.scheduleBooking !== undefined) setScheduleBooking(newState.scheduleBooking);
  if (newState.createBooking !== undefined) setCreateBooking(newState.createBooking);

  if (newState.services !== undefined) setServices(newState.services);
  if (newState.servicesList !== undefined) setServicesList(newState.servicesList);
  if (newState.createServices !== undefined) setCreateServices(newState.createServices);

  if (newState.team !== undefined) setTeam(newState.team);
  if (newState.teamList !== undefined) setTeamList(newState.teamList);
  if (newState.createTeam !== undefined) setCreateTeam(newState.createTeam);

  if (newState.blog !== undefined) setBlog(newState.blog);
  if (newState.blogList !== undefined) setBlogList(newState.blogList);
  if (newState.createBlog !== undefined) setCreateBlog(newState.createBlog);

  if (newState.aboutUs !== undefined) setAboutUs(newState.aboutUs);
  if (newState.aboutUsList !== undefined) setAboutUsList(newState.aboutUsList);
  if (newState.createAboutUs !== undefined) setCreateAboutUs(newState.createAboutUs);

  if (newState.contactUs !== undefined) setContactUs(newState.contactUs);
  if (newState.contact !== undefined) setContact(newState.contact);
  if (newState.menuEmail !== undefined) setMenuEmail(newState.menuEmail);
  if (newState.address !== undefined) setAddress(newState.address);
};


   useEffect(() => {
  
    const exemptedPaths = [
  /^\/register$/,                     // /register
  /^\/register\/[^\/]+$/,            // /register/:referralId
  /^\/forgetpassword$/,              // /forgetpassword
  /^\/changepassword\/[^\/]+$/,     // /changepassword/:token
  /^\/emailconfirm\/[^\/]+$/,       // /emailconfirm/:token
  /^\/[^\/]+$/,       // /:token
  /^\/redirectform$/,                // /redirectform
  /^\/verifyotp$/,                   // /verifyotp
  /^\/login$/                        // /login
];
 const fetchData = async () => {
      const isExempted = exemptedPaths.some((pattern) => pattern.test(location.pathname));
      if (loggedIn) {
        const storedToken: string | null = localStorage.getItem('myToken');
         const tokens: string = storedToken || '';
        const myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");
        myHeaders.append("Authorization", tokens);
        const requestOptions: RequestInit = {
          method: 'GET',
          headers: myHeaders,
          redirect: 'follow'
        };
        try {
          const response = await fetch(`${baseUrl}/auth/getuser`, requestOptions);    
          if (!response.ok) {
            const errorResponse = await response.json();
            throw new Error(errorResponse.message);
          }
            const result = await response.json(); 
            loginAuth(result.data.userId, result.data.name, result.data.email,  result.data.address1, result.data.address2, result.data.phoneNumber1, result.data.phoneNumber2, result.data.city, result.data.city, result.data.postalCode, result.data.profileImage, result.cart, result.notification, result.data.role,  result.token);
            
            updateUIState(result.data.menu ?? "");

            // if(result.data.role == "admin"){
            //  navigate("/admin/admin-dashboard");
            //   logInUser();
            // }

            logInUser();
             
        } catch (error) {          
          if (!isExempted) {
            logout();
          }
        }
      } else {       
        if (!isExempted) {
            logout();
          }
      }
    };
         fetchData();
  }, [loggedIn]);

    return (
      <AuthContext.Provider value={{
        loggedIn, googleIn, loginAuth, logInUser, logout, setLoggedIn, setGoogleIn, 
      setUserId,
      setName,
      setEmail,
      setMobile1,
      setMobile2,
      setAddress1,
      setAddress2,
      setPhoneNumber1,
      setPhoneNumber2,
      setState,
      setCity,
      setPostalCode,
      setImage,
      setCart,
      setNotification,
      setRole,
      setSignin,
      setAdminLoading,
      setToken,
      baseUrl, userId, name, email,
      mobile1,
      mobile2,
      address1,
      address2,
      phoneNumber1,
      phoneNumber2,
      state,
      city,
      postalCode,
      image,
      cart,
      notification,
      role,
      signin,
      adminLoading,
      token,



      homePage,
brandLogo,
pricing,
servicePricing,
createService,
orders,
serviceOrder,
booking,
scheduleBooking,
createBooking,
services,
servicesList,
createServices,
team,
teamList,
createTeam,
blog,
blogList,
createBlog,
aboutUs,
aboutUsList,
createAboutUs,
contactUs,
contact,
menuEmail,
address,

setHomePage,
setBrandLogo,
setPricing,
setServicePricing,
setCreateService,
setOrders,
setServiceOrder,
setBooking,
setScheduleBooking,
setCreateBooking,
setServices,
setServicesList,
setCreateServices,
setTeam,
setTeamList,
setCreateTeam,
setBlog,
setBlogList,
setCreateBlog,
setAboutUs,
setAboutUsList,
setCreateAboutUs,
setContactUs,
setContact,
setMenuEmail,
setAddress,
updateUIState

      }}>

        {children}
      </AuthContext.Provider>
    );
  };

  export const userAuth = (): AuthContextType => {
    return useContext(AuthContext);
  };

  export { AuthContext, AuthProvider };