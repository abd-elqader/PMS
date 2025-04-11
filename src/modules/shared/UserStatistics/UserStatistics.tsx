import React, { useEffect } from 'react'
import DashboardCard from '../DashboardCard/DashboardCard';
import { privateAxiosInstance } from '../../services/api/apiInstance';
import { USER_URLS } from '../../services/api/apiConfig';

interface userCountInterface {
    activatedEmployeeCount: number;
    deactivatedEmployeeCount: number;
  }
const UserStatistics = ({role}:{role:string}) => {
      const [userData, setUserData] = React.useState<userCountInterface | null>(null);
    

   const getUserCount = async () => {
      try {
        const { data } = await privateAxiosInstance.get(USER_URLS.GET_USERS_COUNT);
        console.log(data);
        setUserData(data);
      } catch (error) {
        console.log(error);
      }
    };
  
       useEffect(() => {
        
        if(role==="Employee"){
          getUserCount();
        }
         
    
        }, []);
  return (
    <div className=" py-3  rounded-2">
    <div className="card-left-line textContent px-5">
      <h5>Users</h5>
      <p className="">Monitor active team members.</p>
    </div>
    <div className="row p-3">
      <div className="col-12 col-sm-6 col-md-6">
        <DashboardCard
          status={'Active'}
          number={userData?.activatedEmployeeCount ?? 0}
          color="#CFD1EC"
          icon={<i className="fa-solid fa-users"></i>}
        />
      </div>
      <div className="col-12 col-sm-6 col-md-6">
        <DashboardCard
          status={'Inactive'}
          number={userData?.deactivatedEmployeeCount ?? 0}
          color="#E4E4BC"
          icon={<i className="fa-solid fa-users-slash"></i>}
        />
      </div>
    </div>
  </div>
  )
}

export default UserStatistics