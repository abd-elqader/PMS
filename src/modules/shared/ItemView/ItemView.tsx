import { Button, Modal } from "react-bootstrap";
import { Project } from "../../Interfaces/project";
import { Link } from "react-router-dom";
import { ItemViewProps } from "../../Interfaces/ItemView";
import { Task } from "../../Interfaces/Task";
import { UserList } from "../../Interfaces/User";

export default function ItemView({ handleClose, show, item, role, itemType }: ItemViewProps) {
 const getStatusColor = (status: string) => {
  switch (status?.toLowerCase()) {
   case 'todo': return 'secondary';
   case 'inprogress': return 'primary';
   case 'done': return 'success';
   default: return '';
  }
 };

 const formatDate = (dateString: string) => {
  return new Date(dateString).toLocaleString('en-GB', {
   day: '2-digit', month: '2-digit', year: 'numeric', hour: '2-digit', minute: '2-digit', hour12: true
  });
 };

 return (

  <Modal show={show} onHide={handleClose} className='itemViewModal align-items-center border-0 justify-content-center d-flex modal-lg'>
   <Modal.Header className='border-0 pb-2 bgBoard'>
    <div className="d-flex justify-content-between align-items-center w-100">
     <h4 className="mb-0 text-white fw-bold">
      {itemType === 'project' && <><i className="fa-solid fa-bars-progress me-2"></i>Project Details</>}
      {itemType === 'task' && <><i className="fa-solid fa-tasks me-2"></i>Task Details</>}
      {itemType === 'user' && <><i className="fa-solid fa-user me-2"></i>User Details</>}
     </h4>
     <button
      className="btn btn-sm rounded-circle btn-light"
      onClick={handleClose}
      aria-label="Close">
      <i className="fa fa-close"></i>
     </button>
    </div>
   </Modal.Header>

   {/* Content section */}
   <Modal.Body className='pt-4 pb-3'>
    <div className="container-fluid px-3">
     <div className="row mb-4">
      <div className="col-12">
       <div className="card shadow-sm border-0">
        <div className="card-body">
         {itemType === 'project' && (
          <>
           <h5 className="card-title fw-bold mb-3">{(item as Project)?.title}</h5>
           <p className="card-text">{(item as Project)?.description}</p>
          </>
         )}

         {itemType === 'task' && (
          <>
           <h5 className="card-title fw-bold mb-3">{(item as Task)?.title}</h5>
           <div className="d-flex align-items-center mb-3">
            <span className={`badge bg-${getStatusColor((item as Task)?.status)} me-2`}>
             {(item as Task).status}
            </span>
           </div>
            <p className="textMain fs-5">description:</p>
            <span className="text-muted">description {(item as Task)?.description}</span>
          </>
         )}

         {itemType === 'user' && (
          <>
           <h5 className="card-title fw-bold mb-3">{(item as UserList)?.userName}</h5>
           <div className="d-flex align-items-center mb-2">
            <span className={`badge ${(item as UserList)?.isActivated ? 'bg-success' : 'bg-warning'} me-2`}>
             {(item as UserList)?.isActivated ? 'Active' : 'Inactive'}
            </span>
           </div>
          </>
         )}
        </div>
       </div>
      </div>
     </div>

     <div className="row g-3">
      <div className={`${itemType === 'user'?'col-md-12' :'col-md-6'}`}>
       <div className="card h-100 border-0 shadow-sm">
        <div className="card-body">
         {itemType === 'project' && (
          <>
           <h6 className="textMain fw-semibold mb-3">Project Info</h6>
           <div className="d-flex  mb-2">
            <span className="text-muted me-2">ID:</span>
            <span className="fw-medium">{(item as Project)?.id}</span>
           </div>
           <div className="d-flex mb-2">
            <span className="text-muted me-2">Created:</span>
            <span className="fw-medium">{formatDate((item as Project)?.creationDate)}</span>
           </div>
           <div className="d-flex mb-2">
            <span className="text-muted me-2">Modified:</span>
            <span className="fw-medium">{formatDate((item as Project)?.modificationDate)}</span>
           </div>
          </>
         )}

         {itemType === 'task' && (
          <>
           <h6 className="textMain fw-semibold mb-3">Task Info</h6>
           <div className="d-flex  mb-2">
            <span className="text-muted me-2">ID:</span>
            <span className="fw-medium">{(item as Task)?.id}</span>
           </div>
           <div className="d-flex  mb-2">
            <span className="text-muted me-2">Created:</span>
            <span className="fw-medium">{formatDate((item as Task)?.creationDate)}</span>
           </div>
           <div className="d-flex  mb-2">
            <span className="text-muted me-2">Assigned to:</span>
            <span className="fw-medium">{(item as Task)?.employee?.userName}</span>
           </div>
          </>
         )}

         {itemType === 'user' && (
          <>
           <h6 className="textMain fw-semibold mb-3">User Info</h6>
           <div className="d-flex  mb-2">
            <span className="text-muted me-2">ID:</span>
            <span className="fw-medium">{(item as UserList)?.id}</span>
           </div>
           <div className="d-flex  mb-2">
            <span className="text-muted me-2">Email:</span>
            <span className="fw-medium">{(item as UserList)?.email}</span>
           </div>
           <div className="d-flex  mb-2">
            <span className="text-muted me-2">Phone:</span>
            <span className="fw-medium">{(item as UserList)?.phoneNumber || 'Not provided'}</span>
           </div>
           <div className="d-flex  mb-2">
            <span className="text-muted me-2">Joined:</span>
            <span className="fw-medium">{formatDate((item as UserList)?.creationDate)}</span>
           </div>
          </>
         )}
        </div>
       </div>
      </div>

      {itemType !== 'user' && (
       <div className="col-md-6">
        <div className="card h-100 border-0 shadow-sm">
         <div className="card-body">
          {itemType === 'project' && (
           <>
       <h6 className="textMain fw-semibold mb-3">Tasks</h6>
       {(item as Project)?.task?.length > 0 ? (
        <ul className="list-group list-group-flush tasksModal">
         {(item as Project)?.task?.map((task, index) => (
          <li key={index} className="list-group-item border-0 ps-0 py-1">
           <i className="fa-solid fa-check-circle textMain me-2"></i>
           {task?.title}
          </li>
         ))}
        </ul>
       ) : (
        <p className="text-muted fst-italic">No tasks assigned</p>
       )}
           </>
          )}

          {itemType === 'task' && (
           <>
       <h6 className="textMain fw-semibold mb-3">Project</h6>
       <div className="card bg-light border-0">
        <div className="card-body py-2">
         <p className="mb-0">
          <i className="fa-solid fa-project-diagram textMain me-2"></i>
          {(item as Task)?.project?.title}
         </p>
        </div>
       </div>
           </>
          )}
         </div>
        </div>
       </div>
      )}
     </div>
    </div>
   </Modal.Body>

   <Modal.Footer className='border-top border-light pt-2 pb-3'>
    <Button variant="outline-secondary" className="text-dark" onClick={handleClose}>
     Close
    </Button>
    {role === 'Manager' && itemType !== 'user' && (
     <Link
      to={
       itemType === 'project' ? `/dashboard/projects/${(item as Project)?.id}` :
        itemType === 'task' ? `/dashboard/tasks/${(item as Task)?.id}` : ''
      }
      className="btn btn-modal bgMain text-white border-0"
     >
      <i className="fa-solid fa-edit me-1"></i>
      {itemType === 'project' ? 'Edit Project' :
       itemType === 'task' ? 'Edit Task' : ''}
     </Link>
    )}
   </Modal.Footer>
  </Modal>
 );
}