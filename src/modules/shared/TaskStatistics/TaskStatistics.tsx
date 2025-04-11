import React, { useEffect } from 'react'
import DashboardCard from '../DashboardCard/DashboardCard';
import { privateAxiosInstance } from '../../services/api/apiInstance';
import { TASK_URLS } from '../../services/api/apiConfig';

const TaskStatistics = ({role="manger"}:{role:string}) => {
    const [taskNumber, setTaskNumber] = React.useState<number | null>(null);
  const [projectNumber, setProjectNumber] = React.useState<number | null>(null);
 
     const getProjectCount = async () => {
        try {
          const { data } = await privateAxiosInstance.get(TASK_URLS.GET_PROJECT_FOR_MANGER());
          console.log(data);
          setProjectNumber(data?.totalNumberOfRecords);
        } catch (error) {
          console.log(error);
        }
      };
    
      const getTaskCount = async () => {
        try {
          
          const { data } = await privateAxiosInstance.get(role!=="Employee"?TASK_URLS.GET_TASK_FOR_MANGER():TASK_URLS.GET_ALL_MY_ASSIGNED_TASKS);
          console.log(data);
          setTaskNumber(data?.totalNumberOfRecords);
        } catch (error) {
          console.log(error);
        }
      };
    
        useEffect(() => {
          
          if(role!=="Employee")
            {
            console.log(role,'role');
            getProjectCount();
          }
            getTaskCount();
        }, []);
  return (
    <div className=" py-3 rounded-2">
    <div className="card-left-line px-5 textContent">
      <h5>Tasks</h5>
      <p className="">View Total Task and Project Counts</p>
    </div>
    <div className="row p-3">
     
      <div className="col-12 col-sm-6 col-md-6">
        <DashboardCard
          status={'Task Number'}
          number={taskNumber ?? 0}
          color="#E4E4BC"
          icon={<i className="fa-solid fa-list-check"></i>}
        />
      </div>
      {role!=="Employee"&& <div className="col-12 col-sm-6 col-md-6">
        <DashboardCard
          status={'Projects Number'}
          number={projectNumber ?? 0}
          color="#E7C3D7"
          icon={<i className="fa-solid fa-chalkboard-user"></i>}
        />
      </div>}
     
    </div>
  </div>
  )
}

export default TaskStatistics