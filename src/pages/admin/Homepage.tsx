import React, { useState } from 'react'
import AdminTopHeader from '../../component/AdminTopHeader'
import SideNavAdmin from '../../component/SideNavAdmin'
import Hero from './component/Hero'
import Gallery from './component/Gallery'

import BrandLogo from './component/BrandLogo'


const headers = ['brand logos', 'gallery'];

function Homepage() {

   const [activeTab, setActiveTab] = useState('brand logos'); 
    
    
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
                        activeTab == 'gallery' ? (
                              <Gallery />
                        ) :   (
                            <BrandLogo/>
                        ) 
                    }
                   
                </div>

           </div>


         </div>
        

    </div>
  )
}

export default Homepage