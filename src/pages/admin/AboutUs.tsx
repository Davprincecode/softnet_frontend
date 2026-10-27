import React, { useState, useEffect} from 'react'
import AdminTopHeader from '../../component/AdminTopHeader'
import SideNavAdmin from '../../component/SideNavAdmin'
import AllBlog from './component/AllBlog';
import EditBlog from './component/EditBlog';
import AddAboutUs from './component/AddAboutUs';
import EditAboutUs from './component/EditAboutUs';
import AllAboutUs from './component/AllAboutUs';
import { userAuth } from '../context/AuthContext';
// import GoogleDocsEditor from './component/GoogleDocsEditor';




function AboutUs() {
      
        const [editHero, setEditHero] = useState<boolean>(false);
        const [editId, setEditId] = useState<string>('');

        const {role, aboutUsList, createAboutUs}  = userAuth();  
        const headers = [
        (role === 'admin' || aboutUsList) && 'about us',
        (role === 'admin' || createAboutUs) && 'create about us',
        ].filter(Boolean) as string[];
        const [activeTab, setActiveTab] = useState(
        headers[0] ?? ''
        );
        const toggleToDefault = () => {
         setActiveTab(headers[0]);
        }

      const heroFunction = () => {
      setEditHero(!editHero);
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
                        activeTab == 'about us' ? (
                             editHero ? (
                                    <EditAboutUs heroFunction={heroFunction} editId={editId} setEditId={setEditId}/>
                                ) : (
                                  <AllAboutUs   heroFunction={heroFunction} setEditId={setEditId}/>
                              )

                        ) : (
                          < AddAboutUs  toggleToDefault={toggleToDefault}/>
                        )
                    }
                   
                </div>


           </div>
           </div>
           
           </div>
    
  )
}

export default AboutUs