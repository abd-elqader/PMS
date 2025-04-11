import React from 'react';
import TaskStatistics from '../shared/TaskStatistics/TaskStatistics';
import UserStatistics from '../shared/UserStatistics/UserStatistics';
import ProgressChart from '../shared/ProgressChart/ProgressChart';
import { useAuth } from '../hooks/useAuth';

export default function Dashboard() {
  const { role } = useAuth()
  console.log(role, 'sddsdsdsdsdss')
  return (
    <div className="dark-bg container-fluid ">
      <div className="font-monospace rounded-4 d-flex flex-column justify-content-center header-bg text-white px-2 py-5 lh-lg">
        <h3>
          Welcome <span className="main-color">Upskilling</span>
        </h3>
        <p className="fs-3">You can add project and assign tasks to your team</p>
      </div>
      <div className={`row g-3 mt-2 pb-5 ${role !== "Employee"&&"justify-content-around  "}`}>
        <div className="col-12 col-md-6 col-lg-4">
        <div className="contentBg h-100">
          <TaskStatistics role={role} />
          </div>
        </div>
        {role !== "Employee" && <>
          <div className="col-12 col-md-6 col-lg-4 ">
          <div className="contentBg h-100">
            <UserStatistics role={role} />
            </div>
          </div>
        </>}
          <div className="col-12 col-md-4  ">
            <div className="contentBg h-100">
            <ProgressChart />
            </div>
          </div>



      </div>
    </div>
  );

}
