import React, { useState, useEffect} from 'react'
import AdminTopHeader from '../../component/AdminTopHeader'
import SideNavAdmin from '../../component/SideNavAdmin'
import Courses from './component/Courses';

import Schedule from './component/Schedule';
import AddSchedule from './component/AddSchedule';
// import EditSchedule from './component/EditSchedule';

import { userAuth } from '../context/AuthContext';



const AdminConsultant = () => {

        const {role, scheduleBooking, createBooking}  = userAuth(); 
           
        const headers = [
            (role === 'admin' || scheduleBooking) && 'schedules',
            (role === 'admin' || createBooking) && 'create',
        ].filter(Boolean) as string[];
        
        const [activeTab, setActiveTab] = useState(
            headers[0] ?? ''
        );
        
        const toggleToDefault = () => {
         setActiveTab(headers[0]);
         setCreateSchedule(headers[0]);
        }
    
        const [createSchedule, setCreateSchedule] = useState('default'); 
        const [relBookingId, setRelBookingId] = useState<string>('');
            
        const scheduleToggle = (data : string) => {
                setCreateSchedule(data);
            }

  return (
     <div className='admin-dashboard'>
        <AdminTopHeader />

         <div className="flex mainWrapper">
           <SideNavAdmin/> 

           <div className="mainBody">
               <div className="mainHeader flex-center justification-center">
                    <div className="mainHeaderRouteCon flex-center justification-between">
                        {headers.map((label, index) => (
                            <div
                            key={index}
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
                        activeTab == 'courses' && (
                              <Courses />
                        ) 
                         }
                         
                        { 
                        activeTab == 'schedules' ? (

                            createSchedule == 'create' ? (
                                <AddSchedule scheduleToggle={scheduleToggle} toggleToDefault={toggleToDefault}/>
                            ) : createSchedule == 'edit' ? (
                                <p>hello</p>
                                // <EditSchedule scheduleToggle={scheduleToggle} toggleToDefault={toggleToDefault} relBookingId={relBookingId}/>
                            ) : (
                                <Schedule scheduleToggle={scheduleToggle} relBookingId={relBookingId} setRelBookingId={setRelBookingId}/>
                            )  
                                                  
                        ) : (
                            <AddSchedule scheduleToggle={scheduleToggle} toggleToDefault={toggleToDefault}/>
                        )
                      }
                   
                </div>


           </div>
           </div>
           
           </div>
    
  )
}

export default AdminConsultant