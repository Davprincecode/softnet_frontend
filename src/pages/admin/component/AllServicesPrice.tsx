import React, { useState, useEffect } from 'react'
import { RiEdit2Fill} from 'react-icons/ri';
import { MdDelete } from 'react-icons/md';
import { userAuth } from '../../context/AuthContext';
import { toast } from 'react-toastify';
import DeletePopup from './DeletePopUp';
import ButtonPreloader from '../../../component/ButtonPreloader';
import { ServicesForm } from '../../../types/types';



interface HeroInterface {
  heroFunction: () => void;
  setEditId : (id : string) => void;
}


interface dataIntern{
    id : string;
    serviceTitle : string;
    serviceContent :  string;
}

const  AllServicesPrice : React.FC<HeroInterface> = ({  heroFunction, setEditId }) => {
    
    const {baseUrl, token} = userAuth();
    const[loading, setLoading] = useState<boolean>(false);
    const [showPopup, setShowPopup] = useState(false);
    const [selectedId, setSelectedId] = useState<string | null>(null);
    
    const [data, setData] = useState<ServicesForm[]>([]);


    useEffect(() => {
      getData()
      }, []);
    
      const getData = async () => {
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
                  const response = await fetch(`${baseUrl}/services-form`, requestOptions); 
                  if (!response.ok) {
                  const errorResponse = await response.json();
                  throw new Error(errorResponse.message);
                  }
                  const result = await response.json();
                  setData(result.data);
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
        
          const handleId = (id : string) => {
            setEditId(id);
            heroFunction();
          };
        
     

          const handleDeleteClick = (id: string) => {
          setSelectedId(id);
          setShowPopup(true);
          };
          const handleDeleteConfirm = async (id: string | number) => {
                      setLoading(true);
                      const myHeaders = new Headers();
                      myHeaders.append("Authorization", token);
                      const requestOptions: RequestInit = {
                          method: "DELETE",
                          headers: myHeaders,
                          redirect: "follow"
                      };
                      try {
                          const response = await fetch(`${baseUrl}/services/${id}`, requestOptions);      
                          if (!response.ok) {
                          const errorResponse = await response.json();
                          throw new Error(errorResponse.message);
                          }
                          const result = await response.json();   
                          
                          setLoading(false);
                         setData(data => data.filter(item => item.serviceId !== id));
                          toast.error("delete successfully");
                          setShowPopup(false);
                          setSelectedId(null);
                      } catch (error) {
                        setLoading(false);
                        if (typeof error === "object" && error !== null && "message" in error && typeof error.message === "string") {
                        toast.error(error.message);
                        } else {
                        toast.error('An unknown error occurred.');
                        }
                          
                      }
              
          };

              
  return (
    <div>

        

<div className="admin-shop-container">
        {
        loading ? (
        <div className="cart-prealoader">
            <ButtonPreloader/>
        </div>
        ) : (
            <section className="pricing-section">
            <div className="pricing-header">
                <span className="pricing-eyebrow">
                    OUR SERVICES
                </span>
            </div>

            <div className="pricing-grid">
                {data.map((service) => (
                    <article
                        key={service.serviceId}
                        className="pricing-card"
                    >
                        <div className="pricing-card-header">
                            <h3>{service.name}</h3>
                            <p>{service.description}</p>
                        </div>

                        <div className="pricing-price">
                            <h2>
                                {new Intl.NumberFormat("en-NG", {
                                    style: "currency",
                                    currency: "NGN",
                                    maximumFractionDigits: 2,
                                }).format(service.price)}
                            </h2>
                        </div>

                        <ul className="pricing-features">
                            {service.feature.map((item, index) => (
                                <li
                                    key={`${item.serviceId}-${index}`}
                                >
                                    <span className="feature-check">
                                        ✓
                                    </span>
                                    <span>{item.feature}</span>
                                </li>
                            ))}
                        </ul>

                        <button
                            type="button"
                            className="pricing-button pricing-button-primary"
                        >
                            Get Started
                        </button>
                    </article>
                ))}
            </div>
        </section>
        )
        
        }
       
</div>

    <DeletePopup
    isOpen={showPopup}
    itemId={selectedId ?? ""}
    onCancel={() => setShowPopup(false)}
    onDelete={handleDeleteConfirm}
    />
    
        
    </div>
  )
}

export default AllServicesPrice