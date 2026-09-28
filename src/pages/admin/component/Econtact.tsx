import React, { useEffect, useState } from 'react'
import { IoIosStar } from 'react-icons/io'
import { IoEyeOutline } from 'react-icons/io5'
import { RiDeleteBin6Line } from 'react-icons/ri'
import { userAuth } from '../../context/AuthContext';
import { toast } from 'react-toastify';
import ButtonPreloader from '../../../component/ButtonPreloader';
import DeletePopup from './DeletePopUp';


interface userInterface {
  id: number;
  contact: string;
}

const Econtact = () => {

const {baseUrl, token} = userAuth();
const [loading, setLoading] = useState<boolean>(false);
const [showPopup, setShowPopup] = useState(false);
const [selectedId, setSelectedId] = useState<number | null>(null);
const [currentIndex, setCurrentIndex] = useState<number | null>(null);
const [userData, setUserData] = useState<userInterface[]>([]);


const [contact, setContact] = useState<string>('');


    useEffect(() => {
         getContact();
    }, []);

    const getContact = async () => {
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
            const response = await fetch(`${baseUrl}/contact`, requestOptions);
            if (!response.ok) {
            const errorResponse = await response.json();
            throw new Error(errorResponse.message);
            }
            const result = await response.json();
            setUserData(result);
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


    const validateForm = () => {
        if (!contact.trim()) {
        toast.error("You need to fill the contact");
        return false;
        }
        return true;
    };

    const handleReview = async () => {
        if(!validateForm()){
            return;
        }
        setLoading(true);
            const myHeaders = new Headers();
            myHeaders.append("Authorization", token);
            const formData = new FormData();
            
            formData.append("contact", contact);

            const requestOptions: RequestInit = {
                method: "POST",
                headers: myHeaders,
                body: formData,
                redirect: "follow"
            };
            try {
                const response = await fetch(`${baseUrl}/contact`, requestOptions);
                if (!response.ok) {
                const errorResponse = await response.json();
                throw new Error(errorResponse.message);
                }
                const result = await response.json();  
                setLoading(false);       
                toast.success("Contact Upload Successfully"); 
                setUserData(prev => [...prev, result]); 
                setContact('');      
            } catch (error) {
                setLoading(false);
                if (typeof error === "object" && error !== null && "message" in error && typeof error.message === "string") {
                toast.error(error.message);
                } else {
                toast.error('An unknown error occurred.');
                }
                setLoading(false); 
            }
    }

    const handleDeleteClick = (id: number) => {
    setSelectedId(id);
    setShowPopup(true);
    };

    const handleDeleteConfirm = async(id: number | string) => {
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
            const response = await fetch(`${baseUrl}/contact/${id}`, requestOptions);
            
            if (!response.ok) {
            const errorResponse = await response.json();
            throw new Error(errorResponse.message);
            }

            const result = await response.json();

            setUserData(prev => prev.filter(item => item.id !== id));
            setShowPopup(false);
            setSelectedId(null);
            setLoading(false);
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


const openModal = (index: number) =>{
setCurrentIndex(index); 
} 

const closeModal = () =>{
setCurrentIndex(null); 
} 

const goPrev = () => {
if (currentIndex !== null && currentIndex > 0) {
setCurrentIndex(currentIndex - 1);
}
};

const goNext = () => {
if (currentIndex !== null && currentIndex < 17) {
setCurrentIndex(currentIndex + 1);
}
};


return (

<div>
<h2>add new contact</h2>

<div className="admin-testimonial-form">
<div className="admin-input">
<label>Contact</label>
<input
  type="text"
  value={contact}
  onChange={(e) => setContact(e.target.value)}
  placeholder="Enter Contact"
/>
</div>




      
{
loading ? (
    <div className="admin-input">
        <button className='inActive'><ButtonPreloader/></button>
    </div>
) : (
    <div className="admin-input" onClick={handleReview}>
        <button>Apply & Save</button>
    </div>
)
}

    <div className="mainGallery flex-center">
    {userData.map((value, index) => (
    <div className="flex-center gap-10" key={value.id}>
    {/* <IoEyeOutline className="eye" onClick={()=> openModal(index)}/> */}
    <p>{value.contact}</p>
    <RiDeleteBin6Line
    className="delete"
    onClick={() => handleDeleteClick(value.id)}
    style={{ cursor: "pointer" }}
    />
    </div>
    ))}
    </div>
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

export default Econtact