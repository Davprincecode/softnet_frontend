import React, { useState, useEffect} from 'react'
import AdminTopHeader from '../../component/AdminTopHeader'
import SideNavAdmin from '../../component/SideNavAdmin'
import AllBlog from './component/AllBlog';
import EditBlog from './component/EditBlog';
import AddAboutUs from './component/AddAboutUs';
import EditAboutUs from './component/EditAboutUs';
import AllAboutUs from './component/AllAboutUs';
import EditConsulting from './component/EditConsulting';
import AllConsulting from './component/AllConsulting';
import AddConsulting from './component/AddConsulting';
import EditTeam from './component/EditTeam';
import AllTeam from './component/AllTeam';
import AddTeam from './component/AddTeam';
import { userAuth } from '../context/AuthContext';
// import GoogleDocsEditor from './component/GoogleDocsEditor';


function Team() {
     
    const {role, teamList, createTeam}  = userAuth();  
    const headers = [
            (role === 'admin' || teamList) && 'team',
            (role === 'admin' || createTeam) && 'create team',
        ].filter(Boolean) as string[];
    const [activeTab, setActiveTab] = useState(
            headers[0] ?? ''
        );
    const toggleToDefault = () => {
        setActiveTab(headers[0]);
    }

      const [editHero, setEditHero] = useState<boolean>(false);
      const [editId, setEditId] = useState<string>('');

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
                        activeTab == 'team' ? (
                             editHero ? (
                                    <EditTeam heroFunction={heroFunction} editId={editId} setEditId={setEditId}/>
                                ) : (
                                  <AllTeam  heroFunction={heroFunction} setEditId={setEditId}/>
                              )

                        ) : (
                           < AddTeam toggleToDefault={toggleToDefault}/>
                        )
                    }
                   
                </div>


           </div>
           </div>
           
           </div>
    
  )
}

export default Team