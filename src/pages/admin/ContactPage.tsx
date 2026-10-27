import React, { useState } from 'react'
import AdminTopHeader from '../../component/AdminTopHeader'
import SideNavAdmin from '../../component/SideNavAdmin'
import Hero from './component/Hero'
import Gallery from './component/Gallery'

import BrandLogo from './component/BrandLogo'
import Email from './component/Email'
import Econtact from './component/Econtact'
import OfficeAddress from './component/OfficeAddress'
import { userAuth } from '../context/AuthContext'


function ContactPage() { 
    const {role, contactUs, menuEmail, address}  = userAuth(); 

    const headers = [
        (role === 'admin' || contactUs) && 'contact',
        (role === 'admin' || menuEmail) && 'email',
        (role === 'admin' || address) && 'address'
    ].filter(Boolean) as string[];
    
    const [activeTab, setActiveTab] = useState(
    headers[0] ?? ''
    );

  return (
    <div className='admin-dashboard'>
        <AdminTopHeader />

         <div className="flex mainWrapper">
           <SideNavAdmin/> 

           <div className="mainBody">

                <div className="mainHeader flex-center justification-center">
                    <div className="mainHeaderRouteCon flex-center justification-between">
                        {headers.map((label) => (
                            <div
                            key={label}
                            className={`mainHeaderRoute ${activeTab === label ? 'mainHeaderActive' : ''}`}
                            onClick={() => setActiveTab(label)}
                            >
                            {label}
                            </div>
                        ))}
                    </div>
                </div>

                <div className="mainBodyDetails">
                    {
                        activeTab == 'contact' ? (
                              <Econtact />
                        ) : activeTab == 'address' ? (
                             <OfficeAddress/>
                        ) :   (
                              <Email/>
                        ) 
                    }
                   
                </div>

           </div>


         </div>
        

    </div>
  )
}

export default ContactPage