import React, { useEffect } from 'react'
import { SubmitHandler, useForm } from 'react-hook-form';
import { ProjectInputs, ProjectUpdate } from '../../Interfaces/project';
import { Button, Form } from 'react-bootstrap';
import { REQUIRED_VALIDATION } from '../../services/validation/validation';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { PROJECT_URLS } from '../../services/api/apiConfig';
import { privateAxiosInstance } from '../../services/api/apiInstance';
import { toast } from 'react-toastify';
import axios from 'axios';

export default function ProjectData() {
  const {
    register,
    setValue,
    reset,
    formState: { errors, isSubmitting },
    handleSubmit,
  } = useForm<ProjectInputs>({ mode: 'onChange' });
  const params = useParams()
  const ProjectId: string | undefined = params.id  
  const navigate = useNavigate()
  const onSubmit: SubmitHandler<ProjectInputs> = async (data) => {
    try {
      const response = ProjectId ?
        await privateAxiosInstance.put<ProjectUpdate>(PROJECT_URLS.UPDATE_PROJECT(ProjectId ?? ''), data)
        : await privateAxiosInstance.post<ProjectUpdate>(PROJECT_URLS.CREATE_PROJECT, data)
      toast.success(response?.data?.message || ProjectId ? 'Project updated successfully!' : 'Project added successfully!')
      reset()
      navigate('/dashboard/projects')
    }
    catch (error: unknown) {
      if (axios.isAxiosError(error)) {
           toast.error(error.response?.data?.message || ProjectId ? 'faild to update project' : 'Failed to add project')
      } else {
        toast.error('An unexpected error occurred!');
      }
    }
  }
  useEffect(() => {
    if (ProjectId) {
            const getProject = async () => {
              const response = await privateAxiosInstance.get<ProjectUpdate>(PROJECT_URLS.GET_PROJECT(ProjectId));
              const project = response?.data
              setValue('title', project?.title)
              setValue('description', project?.description)
            }
            getProject();
    
          }
  }, [])
  
    return (
      <>
        <div className="bg-white  py-3 px-4 contentBg mb-3">
          <Link className='textMaster text-decoration-none' to={'/dashboard/projects'}>
            <i className='fa fa-arrow-left me-2'></i>
            View All Projects</Link>
          <h3 className='h3 textMaster fw-medium'>{ProjectId?'edit':'Add'} New Project</h3>
        </div>
        <div className='mx-auto contentBg bg-white container w-75 rounded-3 shadow-lg py-3 px-3'>
          <Form className='filterGroup' onSubmit={handleSubmit(onSubmit)}>
            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label>title</Form.Label>
              <Form.Control className='projecInput'{...register('title', REQUIRED_VALIDATION('title'))} type="text" placeholder="Name" />
              {errors?.title && <Form.Text className="text-danger">
                {errors?.title?.message}
              </Form.Text>}
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label>Description</Form.Label>
              <Form.Control className='projecInput' {...register('description', REQUIRED_VALIDATION('description'))} type="text" placeholder="Description" />
              {errors?.description && <Form.Text className="text-danger">
                {errors?.title?.message}
              </Form.Text>}
              <div className="d-flex align-items-center justify-content-between mt-4 ">
                <Link to={'/dashboard/projects'}
                  className='ProjectsBtn textMaster border-dark border d-flex align-items-center justify-content-center text-decoration-none'><span>Cancel</span></Link>
                <Button disabled={isSubmitting} className='ProjectsBtn bgMain border-0' type="submit">
                  {isSubmitting ? <i className='fa fa-spin fa-spinner'></i> : "save"}
                </Button>
              </div>
            </Form.Group>
          </Form>

        </div>
      </>
    )
  }
