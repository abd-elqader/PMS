/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useContext, useEffect, useState } from 'react'
import { Dropdown, Form,  Table } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import { Project, ProjectResponse } from '../../Interfaces/project';
import { privateAxiosInstance } from '../../services/api/apiInstance';
import { PROJECT_URLS } from '../../services/api/apiConfig';
import DeleteConfirmation from '../../shared/DeleteConfirmation/DeleteConfirmation';
import { toast } from 'react-toastify';
import axios from 'axios';
import NoData from '../../shared/NoData/NoData';
import Loading from '../../shared/Loading/Loading';
import { Authcontext } from '../../AuthContext/AuthContext';
import TableActions from '../../shared/TableActions/TableActions';
import Pagination from "../../shared/Pagination/Pagination";
import usePagination from '../../hooks/usePagination';

export default function ProjectsList() {
  const{title, pageNumber, pageSize,totalPages,handleTitleValue,handleNext,handlePrev,handlePageSizeChange ,setTotalPages}=usePagination()
  const authContext = useContext(Authcontext)
  const role = authContext?.role
  const [projects, setProjects] = useState<Project[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const [itemToDelete, setItemToDelete] = useState<number>(NaN);
  const [itemToDeleteName, setItemToDeleteName] = useState<string | null>(null);
  const [deleteModalshow, setDeleteModalshow] = useState<boolean>(false);
  const [isDeleting, setIsDeleting] = useState<boolean>(false);


  // * get projects list
  const getProjects = async (): Promise<void> => {
    setIsLoading(true)
    try {
      const response = role === 'Manager'
        ? await privateAxiosInstance.get<ProjectResponse>(PROJECT_URLS.GET_PROJECTS_BY_MANAGER, {
          params: {
            title,
            pageNumber,
            pageSize
          }
        })
        : await privateAxiosInstance.get<ProjectResponse>(PROJECT_URLS.GET_PROJECTS_BY_EMPLOYEE, {

            params: {
              title,
              pageNumber,
              pageSize
            }
          });
          setProjects(response?.data?.data)
          setTotalPages(response?.data?.totalNumberOfRecords)
    } catch (error: unknown) {
      if (axios.isAxiosError(error)) {
        toast.error(error.response?.data?.message || '🦄 Something went wrong!');
      } else {
        toast.error('An unexpected error occurred!');
      }
    } finally {
      setIsLoading(false)
    }
  }
  // * delte peoject
  const deleteProject = async (): Promise<void> => {
    setIsDeleting(true)
    try {
      const response = await privateAxiosInstance.delete(PROJECT_URLS.delete_PROJECT(itemToDelete));
      console.log(response);
      toast.success(response?.data?.message || "Deleted successfully")
      getProjects()
    } catch (error: unknown) {
      if (axios.isAxiosError(error)) {
        toast.error(error.response?.data?.message || '🦄 Something went wrong!');
      } else {
        toast.error('An unexpected error occurred!');
      }
    } finally {
      setIsDeleting(false)
      setDeleteModalshow(false)
    }
  }
  const handleDeleteClick = (id: number, name: string) => {
    setItemToDelete(id);
    setItemToDeleteName(name);
    setDeleteModalshow(true)
  }

  // *search

  
  useEffect(() => {
    if (role) {
      getProjects();
    }
  }, [role, title, pageNumber, pageSize]);

  return (
    <>
      <DeleteConfirmation
        handleClose={() => setDeleteModalshow(false)}
        show={deleteModalshow}
        onConfirm={deleteProject}
        message={`are you sure that you want to delete project ${itemToDeleteName}`}
        isDeleting={isDeleting} />
      <div className='projects'>
        <div className="bcox-dark-color contentBg  d-flex align-items-center justify-content-between py-3 px-4 mb-3">
          <h3 className='h3 textMaster fw-medium'>Projects</h3>
          {role === "Manager" && <Link className='btn bgMain btn-custom text-white' to={'/dashboard/projects/new-Project'}>

            <i className='fa fa-plus me-2'></i>
            Add New Project</Link>}
        </div>
        <div className="ms-4 project contentBg cbox-dark-color pt-3 rounded-2">
          <div className="position-relative filterGroup ms-4">
            <Form.Control
              onInput={handleTitleValue}
              type="search"
              placeholder="Search by Title"
              className="projecInput text-dark searchInput w-200"
            />
            <i className="fa fa-search position-absolute search inputIcon"></i>
          </div>
          <Table responsive striped bordered hover className='mt-3 '>
            <thead>
              <tr>
                <th>#</th>
                <th>Title</th>
                <th>Description</th>
                <th>Creation Date</th>
                <th>Tasks</th>
                <th></th>
              </tr>
            </thead>
            <tbody>

              {isLoading ? <tr>
                <td colSpan={6} className="text-center">
                  <Loading />
                </td>
              </tr> : projects.length > 0 ? projects?.map((project, index) => (

                <tr key={index}>
                  <td>{project?.id}</td>
                  <td>{project?.title}</td>
                  <td>{project?.description}</td>
                  <td>{new Date(project?.creationDate).toLocaleString('en-GB', {
                    day: '2-digit', month: '2-digit', year: 'numeric', hour: '2-digit', minute: '2-digit', hour12: true
                  })}</td>
                  <td>{project?.task?.map(task => task?.title).join(', ')}</td>
                  <td>
                    <TableActions
                      itemID={project?.id}
                      itemName={project?.title}
                      role={role}
                      onDelete={handleDeleteClick}
                    />

                  </td>
                </tr>
              )) : <tr><td colSpan={6}><NoData /></td></tr>}
            </tbody>
          </Table>
             <Pagination
                          pageNumber={pageNumber}
                          pageSize={pageSize}
                          totalItems={totalPages}
                          onPageSizeChange={handlePageSizeChange}
                          label="Tasks"
                          handleNext={handleNext}
                          handlePrev={handlePrev}
                        />
        </div>
      </div>
    </>
  )
}
