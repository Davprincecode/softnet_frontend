import React, { useEffect, useState } from 'react';
import { IoIosArrowDown } from 'react-icons/io';
import { toast } from 'react-toastify';
import { userAuth } from '../context/AuthContext';
import ButtonPreloader from '../../component/ButtonPreloader';
import { permissionGroups } from '../../types/types';


type popType = {
  toggleToDefault : () => void;
}


const AddUser : React.FC<popType>= ({toggleToDefault}) => {

        const {baseUrl, token} = userAuth();
        const [loading, setLoading] = useState<boolean>(false);
        const [email, setEmail] = useState<string>('');
        const [name, setName] = useState<string>('');
        const [phoneNumber, setPhoneNumber] = useState<number>(0);
        const [address1, setAddress1] = useState<string>('');
        const [password, setPassword] = useState<string>('');
        const [confirmPassword, setConfirmPassword] = useState('');
        const [adminRole, setAdminRole] = useState('');
        const [error, setError] = useState <boolean>(false);

       
 
      useEffect(() => {
                if (confirmPassword && confirmPassword !== password) {
                  setError(true);
                } else if(confirmPassword && confirmPassword === password) {
                  setError(false);
                }else{
                //   setError(true);
                }
              }, [password, confirmPassword]);
  


     
     
type PermissionState = Record<string, boolean>;

const [permissions, setPermissions] = useState<PermissionState>(() =>
  Object.fromEntries(
    permissionGroups.flatMap((group) => [
      [group.key, false],
      ...group.children.map((child) => [child.key, false]),
    ])
  )
);

const toggleParent = (group: (typeof permissionGroups)[number]) => {
  setPermissions((prev) => {
    const newValue = !prev[group.key];

    return {
      ...prev,
      [group.key]: newValue,

      // Parent on = all children on.
      // Parent off = all children off.
      ...Object.fromEntries(
        group.children.map((child) => [
          child.key,
          newValue,
        ])
      ),
    };
  });
};

const toggleChild = (
  group: (typeof permissionGroups)[number],
  childKey: string
) => {
  setPermissions((prev) => {
    const newChildValue = !prev[childKey];

    const updatedChildren = Object.fromEntries(
      group.children.map((child) => [
        child.key,
        child.key === childKey
          ? newChildValue
          : prev[child.key],
      ])
    );

    // Parent remains checked while at least one child is checked.
    const hasEnabledChild = group.children.some(
      (child) => updatedChildren[child.key]
    );

    return {
      ...prev,
      ...updatedChildren,
      [group.key]: hasEnabledChild,
    };
  });
};

  const validateProductForm = () => {
    if (error) {
      toast.error("Password confirmation does not match.");
      return false;
    }
  
  //   if (!price || isNaN(price)) {
  //     toast.error("Valid product price is required");
  //     return false;
  //   }
    return true;
  };


 const handleProduct =  async() => {
    if(!validateProductForm()){
       return;
    }
    setLoading(true);
    
        const formdata = new FormData();
        
        formdata.append("productName",  name);
        
        const myHeaders = new Headers();
        const raw = {
            "name" : name,
            "email" : email,
            "password" : password,
            "admin_role" : adminRole,
            "phoneNumber" : phoneNumber.toString(),
            "address1" : address1,

                'homePage': permissions.homePage,
                'brandLogo': permissions.brandLogo,

                'pricing': permissions.pricing,
                'servicePricing': permissions.servicePricing,
                'createService': permissions.createService,

                'orders': permissions.orders,
                'serviceOrder': permissions.serviceOrder,

                'booking': permissions.booking,
                'scheduleBooking': permissions.scheduleBooking,
                'createBooking': permissions.createBooking,

                'services': permissions.services,
                'servicesList': permissions.servicesList,
                'createServices': permissions.createServices,

                'team': permissions.team,
                'teamList': permissions.teamList,
                'createTeam': permissions.createTeam,

                'blog': permissions.blog,
                'blogList': permissions.blogList,
                'createBlog': permissions.createBlog,

                'aboutUs': permissions.aboutUs,
                'aboutUsList': permissions.aboutUsList,
                'createAboutUs': permissions.createAboutUs,

                'contactUs': permissions.contactUs,
                'contact': permissions.contact,
                'menuEmail': permissions.menuEmail,
                'address': permissions.address,

            };

        myHeaders.append("Authorization", token);
        myHeaders.append('Content-Type', 'application/json');
        const requestOptions: RequestInit = {
            method: "POST",
            headers: myHeaders,     
            body: JSON.stringify(raw),
        };
        try {
            const response = await fetch(`${baseUrl}/signupadminuser`, requestOptions);       
            if (!response.ok) {
            const errorResponse = await response.json();
            throw new Error(errorResponse.message);
            }
            const result = await response.json();    
            setLoading(false); 
            toast.success("Staff Deployed Successfully"); 
            toggleToDefault(); 
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

 
  return (
    <div>
      <h2 className='add-product-title'>Add Product</h2>

      <div className="product-form-conn">

        {/* Product Info */}
        <div className="product-form-top ">

          <div className="admin-prd">
            <div className="admin-prod-title">Information</div>

            <div className="admin-input">
              <label>Full Name (First Name, Last Name)</label>
              <input type="text" value={name} onChange={(e) => setName(e.target.value) } placeholder="Enter Full Names" />
            </div>

           <div className="admin-flex-input flex-center gap-10">

              <div className="flex-center gap-10 admin-short">
                    <div className="admin-input">
                      <label>Phone No</label>
                      <input type="number"  min="0" value={phoneNumber} onChange={(e) => setPhoneNumber(parseInt(e.target.value))} placeholder="Enter Phone Number" />
                    </div>
              </div>

              <div className="admin-input discount-input">
                <label>Address</label>
                <input  type="" value={address1} onChange={(e) => setAddress1(e.target.value)} placeholder="Enter Address" />
              </div>
            </div>

            <div className="admin-input">
              <label>Email</label>
              <input type="email" value={email} onChange={(e) => setEmail(e.target.value) } placeholder="Enter Email" />
            </div>
            
            <div className="admin-flex-input flex-center gap-10">
              <div className="flex-center gap-10 admin-short">
                    <div className="admin-input">
                      <label>Password</label>
                      <input type="text"  value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Enter Password" />
                    </div>
              </div>

              <div className="admin-input discount-input">
                <label>Confirm Password</label>
                <input  type="text" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} placeholder="Confirm Password" />
              </div>
            </div>
            {
                error && (
                    <p className="delete">
                        Password confirmation does not match.
                    </p>
                )
            }

            {/* <div className="admin-input">
              <label>Administration Role</label>
              <input type="text" value={adminRole} onChange={(e) => setAdminRole(e.target.value) } placeholder="Enter Role" />
            </div> */}
                 
          </div>

        </div>

        {/* role */}

      <div className="wrapper-containers">
      <div className="profile-second">ROLE ACCESS</div> 

      {permissionGroups.map((group) => (
      <div className="wrapper-parent" key={group.key}>
        {/* Parent */}
        <div className="wrapper-flex">
          <div
            className={`radio-con ${
              permissions[group.key] ? "color" : "nocolor"
            }`}
            onClick={() => toggleParent(group)}
          />

          <div className="container-parent-flex">
            <div className="container">
              <p>{group.label}</p>
            </div>

            <IoIosArrowDown />
          </div>
        </div>

        {/* Children */}
        {permissions[group.key] && (
          <div className="wrapper-flex-parent">
            {group.children.map((child) => (
              <div className="wrapper-flex" key={child.key}>
                <div
                  className={`radio-con ${
                    permissions[child.key] ? "color" : "nocolor"
                  }`}
                  onClick={() => toggleChild(group, child.key)}
                />

                <div className="container-child">
                  <p>{child.label}</p>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
      ))}

      </div>


        {/* Submit Button */}
        <div className="btn-wrapper">
           {
            loading ? (
                <div className="admin-input">
                    <div className='inActive'><ButtonPreloader/></div>
                </div>
            ) : (
          <div className="admin-input">
            <div className="btn" onClick={handleProduct}>Submit</div>
          </div> 
            )}
        </div>
      </div>
        
     
      

    </div>
  );
}

export default AddUser;
