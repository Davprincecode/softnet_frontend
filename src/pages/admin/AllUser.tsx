import React, { useEffect, useState } from 'react'
import { IoIosArrowBack, IoIosArrowDown, IoIosArrowForward } from 'react-icons/io';
import invImg from '../../../assets/images/inventoryImg.png'
import { CiSearch } from 'react-icons/ci';
import { RiDeleteBinLine, RiEdit2Fill, RiFolderDownloadLine } from 'react-icons/ri';
import { MdDelete, MdOutlineArrowDropDownCircle, MdOutlineDelete } from 'react-icons/md';
import { AiOutlineEye } from 'react-icons/ai';
import { toast } from 'react-toastify';
import { BsEyeFill } from 'react-icons/bs';
import { userAuth } from '../context/AuthContext';
import ButtonPreloader from '../../component/ButtonPreloader';
import AdminPagination from './component/AdminPagination';
import DeletePopup from './component/DeletePopUp';
import UserDetails from '../../component/UserDetails';
import { Meta, userIntern } from '../../types/types';
 

interface HeroInterface {
  heroFunction: () => void;
  setEditId : (id : string) => void;
}

const AllUser : React.FC<HeroInterface> = ({  heroFunction, setEditId }) => {

    const [user, setUser] = useState<userIntern[]>([]);

    const [meta, setMeta] = useState<Meta | null>(null);
    const [activeOrderId, setActiveOrderId] = useState<string | null>(null);
    const [showPopup, setShowPopup] = useState(false);
    const [selectedId, setSelectedId] = useState<string | null>(null);





    const handleToggleDropdown = (id: string) => {
    setActiveOrderId(prev => (prev === id ? null : id));
    };
    const [activeViewId, setActiveViewId] = useState<string | null>(null);
    const handleToggleView = (id: string) => {
    setActiveViewId(prev => (prev === id ? null : id));
    };

    const [page, setPage] = useState(1);
    const [loading, setLoading] = useState<boolean>(false);

    const [PopOrder, setPopOrder] = useState<userIntern[]>([]);

    const{baseUrl, token} = userAuth();

     const [authAction, setAuthAction] = useState<boolean>(false);

    useEffect(() => {
      getData(page)
      }, [page]);

    const getData = async (pageNumber : number) => {
        setLoading(true);
            const myHeaders = new Headers();
            myHeaders.append("Content-Type", "application/json");
            myHeaders.append("Authorization", token);
            const requestOptions: RequestInit = {
                method: "GET",
                headers: myHeaders,
                redirect: "follow"
            };
            try {
                const response = await fetch(`${baseUrl}/auth/getsubadmin?page=${pageNumber}`, requestOptions);    
                if (!response.ok) {
                const errorResponse = await response.json();
                throw new Error(errorResponse.message);
                }
                const result = await response.json();                
                setUser(result.data);
                setMeta(result.meta);
                setLoading(false);
            } catch (error) {
                setLoading(false);
                if (typeof error === "object" && error !== null && "message" in error && typeof error.message === "string") {
                toast.error(error.message);
                } else {
                toast.error('An unknown error occurred.');
                }   
        }
    }
   

    const updateStatus = async (id: string) => {
       setLoading(true);
              const myHeaders = new Headers();
              myHeaders.append("Content-Type", "application/json");
              myHeaders.append("Authorization", token);
              const requestOptions: RequestInit = {
                  method: "GET",
                  headers: myHeaders,
                  redirect: "follow"
              };
              try {
                  const response = await fetch(`${baseUrl}/auth/updatestatus/${id}`, requestOptions);
                  if (!response.ok) {
                  const errorResponse = await response.json();
                  throw new Error(errorResponse.message);
                  }
                  const result = await response.json();   
                  toast.success("status updated successfully");
                  getData(page);
                 setAuthAction(!authAction);
                  setLoading(false);
              } catch (error) {
                        setLoading(false);
                        if (typeof error === "object" && error !== null && "message" in error && typeof error.message === "string") {
                        toast.error(error.message);
                        } else {
                        toast.error('An unknown error occurred.');
                        }
                  
              }
      setActiveOrderId(null); // Close dropdown
    };


    const viewOrder = (id : string) => {
        setPopOrder(user.filter(item => item.userId == id));
        setAuthAction(!authAction)
    }

    const handleSearch = async (search : string, status : string) => {
        if(search == ''){
                getData(page);
        }
        setLoading(true);
            const myHeaders = new Headers();
            myHeaders.append("Content-Type", "application/json");
            const requestOptions: RequestInit = {
                method: "GET",
                headers: myHeaders,
                redirect: "follow"
            };
            try {
                const response = await fetch(`${baseUrl}/order-search/${search}/${status}`, requestOptions);
                
                if (!response.ok) {
                const errorResponse = await response.json();
                throw new Error(errorResponse.message);
                }
                const result = await response.json();
            
                setMeta(result.meta);
                setLoading(false);
            } catch (error) {
                        setLoading(false);
                        if (typeof error === "object" && error !== null && "message" in error && typeof error.message === "string") {
                        toast.error(error.message);
                        } else {
                        toast.error('An unknown error occurred.');
                        }
                
            }
    }
    const handleDeleteClick = (id: string) => {
            setSelectedId(id);
            setShowPopup(true);
            };

    const handleDeleteConfirm = async (id: string | number) => {
            setLoading(true);
            const myHeaders = new Headers();
            myHeaders.append("Content-Type", "application/json");
            myHeaders.append("Authorization", token);
            const requestOptions: RequestInit = {
                method: "DELETE",
                headers: myHeaders,
                redirect: "follow"
            };
            try {
                const response = await fetch(`${baseUrl}/auth/adminuser/${id}`, requestOptions);        
                if (!response.ok) {
                const errorResponse = await response.json();
                throw new Error(errorResponse.message);
                }
                const result = await response.json();   
                // setProducts(result.data);
                setLoading(false);
              setShowPopup(false);
              setSelectedId(null);
                setLoading(false);
                getData(page);
                
                
                toast.error("delete successfully");
            } catch (error) {
            setLoading(false);
            if (typeof error === "object" && error !== null && "message" in error && typeof error.message === "string") {
            toast.error(error.message);
            } else {
            toast.error('An unknown error occurred.');
            }
                
            }

    };

    const handleId = (id : string) => {
            setEditId(id);
            heroFunction();
            setAuthAction(!authAction);
            setPopOrder([]);
        };
       
  return (
    <div>
            <div className="admin-header-form  flex-center gap-10 justification-between">
                <div className="flex-center gap-10">
                <div className="header-form-input">
                <input type="text" placeholder='Search' onChange={(e) => handleSearch(e.target.value, "pending")}/>
                <CiSearch />
                </div>
                </div>
            </div>


            <div className="admin-shop-container">


            {
            loading && (
            <div className="cart-prealoader">
            <ButtonPreloader/>
            </div>

            ) 
            }
            <table>
            <tr>
            <th>s/n</th>
            <th>full names</th>
            <th>email</th>
            <th>phone no</th>
            <th>role</th>
            <th>address</th>
            <th>date added</th>
            <th>status</th>
            <th>action</th>
            </tr>

            {user.map((item, index) => (
            <React.Fragment key={index}>
            <tr>
            <td>{index + 1}</td>
            <td>{item.name}</td>
            <td>{item.email}</td>
            <td>{item.phoneNumber}</td>
            <td>{item.role}</td>
            <td>{item.address}</td>
            <td>{item.date}</td>
            <td>
                {
                    item.status == "inactive" ? (
                        <div className="delete">Restricted</div>
                    ) : (
                        <div className="active">active</div>
                    )
                }
            </td>
            <td>
                <div className="flex-center gap-10">

                <div className="edit">
                   <BsEyeFill className="edit"  onClick={() => viewOrder(item.userId)}/>
                </div>

                <div className="delete">
                <MdDelete className='delete' onClick={() => handleDeleteClick(item.userId)} />
                </div>

                </div>
            </td>
           


            {/* <td className='action-arrow'   style={{position : 'relative'}}  onClick={() => handleToggleView(item.id)}>
            <MdOutlineArrowDropDownCircle />

            {activeViewId === item.id && (
            <div className="viewPop">
            <div className='viewAction'>
            <div className="confirmView  statusAction"  onClick={() => viewOrder(item.id)}>
            <AiOutlineEye /> View Order Details
            </div>
            
            </div>
            </div>
            )}

            </td> */}

            </tr>

            </React.Fragment>
            ))}
            </table>
            </div>

            {
            showPopup && (    
            <DeletePopup
            isOpen={showPopup}
            itemId={selectedId ?? ""}
            onCancel={() => setShowPopup(false)}
            onDelete={handleDeleteConfirm}
            />
            )}

            <div className="adminPagination">
               {meta && <AdminPagination meta={meta} onPageChange={setPage} />}
            </div>


            {
                authAction && (
                  <UserDetails  authAction={authAction} setAuthAction={setAuthAction} PopOrder={PopOrder} updateStatus={updateStatus} handleId={handleId} loading={loading}/>
                )
            }
            

    </div>
  )
}

export default AllUser