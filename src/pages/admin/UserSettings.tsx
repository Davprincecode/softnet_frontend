import React, { useState } from 'react'
import { IoIosArrowBack, IoIosArrowDown, IoIosArrowForward } from 'react-icons/io';
import invImg from '../../../assets/images/inventoryImg.png'
import { CiSearch } from 'react-icons/ci';
import { RiDeleteBinLine } from 'react-icons/ri';
import { MdDelete, MdOutlineArrowDropDownCircle, MdOutlineDelete } from 'react-icons/md';
import AddUser from './AddUser';
import EditUser from './EditUser';
import AllUser from './AllUser';
import AdminTopHeader from '../../component/AdminTopHeader';
import SideNavAdmin from '../../component/SideNavAdmin';




const headers = ['all users', 'add new'];

const UserSettings = () => {
   const [activeTab, setActiveTab] = useState('all users');
   const [isActive, setIsActive] = useState(false);

   const [editHero, setEditHero] = useState<boolean>(false);
   const [editId, setEditId] = useState<string>('');
      
   const heroFunction = () => {
      setEditHero(!editHero);  
   }
   const toggleToDefault = () =>{
     setActiveTab('all users');
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
                        activeTab == "add new" ? (
                        <AddUser toggleToDefault={toggleToDefault}/>
                        )  : (
                        editHero ? (
                        <EditUser heroFunction={heroFunction} editId={editId} setEditId={setEditId}/>
                        ) : (
                        <AllUser  heroFunction={heroFunction} setEditId={setEditId}/>
                        )
                        )
                        }

                  </div>
           </div>
         </div>
    </div>
              
      )
}

export default UserSettings