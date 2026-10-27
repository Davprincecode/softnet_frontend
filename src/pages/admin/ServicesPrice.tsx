import React, { useState, useEffect} from 'react'
import AdminTopHeader from '../../component/AdminTopHeader'
import SideNavAdmin from '../../component/SideNavAdmin'
import AllBlog from './component/AllBlog';
import EditBlog from './component/EditBlog';
import AddAboutUs from './component/AddAboutUs';
import EditAboutUs from './component/EditAboutUs';
import AllAboutUs from './component/AllAboutUs';
import EditServices from './component/EditServices';
import AllServices from './component/AllServices';
import AddServices from './component/AddServices';
import AddServicesPrice from './component/AddServicesPrice';
import AllServicesPrice from './component/AllServicesPrice';
import { userAuth } from '../context/AuthContext';
// import GoogleDocsEditor from './component/GoogleDocsEditor';




const ServicesPrice = () => {

const [editHero, setEditHero] = useState<boolean>(false);
const [editId, setEditId] = useState<string>('');

const {role, servicePricing, createService}  = userAuth(); 

const headers = [
(role === 'admin' || servicePricing) && 'services',
(role === 'admin' || createService) && 'create services',
].filter(Boolean) as string[];

const [activeTab, setActiveTab] = useState(
headers[0] ?? ''
);

const heroFunction = () => {
setEditHero(!editHero);
}

const toggleToDefault = () => {
setActiveTab('services');
}

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
                activeTab == 'services' ? (
                        editHero ? (
                            <EditServices heroFunction={heroFunction} editId={editId} setEditId={setEditId}/>
                        ) : (
                            <AllServicesPrice  heroFunction={heroFunction} setEditId={setEditId}/>
                        )

                ) : (
                    <AddServicesPrice  toggleToDefault={toggleToDefault}/>
                )
            }
            
        </div>


    </div>
    </div>
    
    </div>

)
}

export default ServicesPrice