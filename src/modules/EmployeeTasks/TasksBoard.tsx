/* eslint-disable @typescript-eslint/no-unused-vars */
import { useEffect, useState } from "react"
import { Status, Task, TaskResponse } from "../Interfaces/taskBoard"
import { privateAxiosInstance } from "../services/api/apiInstance"
import { TASK_URLS } from "../services/api/apiConfig"
import axios from "axios"
import { toast } from "react-toastify"
import Column from "./Column"
import { 
    DndContext, 
    DragOverlay, 
    closestCorners, 
    KeyboardSensor, 
    PointerSensor, 
    useSensor, 
    useSensors,
    DragEndEvent,
    DragStartEvent,
    DragOverEvent
  } from '@dnd-kit/core';
import { arrayMove,sortableKeyboardCoordinates } from "@dnd-kit/sortable"
import TaskItem from "./TaskItem"
import Loading from "../shared/Loading/Loading"


export default function TasksBoard() {
    const [tasks, setTasks] = useState<Task[]>([])
    const [isLoading, setIsLoading] = useState<boolean>(false)
    const [pageNumber, setPageNumber] = useState<number>(1)
    const [pageSize,setPageSize] = useState<number>(10)
    const [activeId, setActiveId] = useState<number | null>(null);
    const activeTask = activeId ? tasks.find(t => t.id === activeId) : null;
    const sensors = useSensors(
        useSensor(PointerSensor),
        useSensor(KeyboardSensor, {
          coordinateGetter: sortableKeyboardCoordinates,
        })
      );
    const getAllMyAssignedTasks = async (): Promise<void> => {
        setIsLoading(true)
        try {
            const response = await privateAxiosInstance.get<TaskResponse>(TASK_URLS.GET_ALL_MY_ASSIGNED_TASKS, {
                params: {
                    pageNumber,
                    pageSize
                }
            })
            setTasks(response?.data?.data)
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

    const getTaskByStatus =  (status: Status):Task[]  => {
        return tasks.filter((task) => task.status === status)
    }
    const handleDragStart = (event: DragStartEvent) => {
        const { active } = event;
        setActiveId(active.id as number);
      };

      const handleDragEnd = async (event: DragEndEvent) => {
        const { active, over } = event;
        
        setActiveId(null);
        
        if (!over) return;
    
        const taskId = active.id as number;
        
        //* Get the actual column ID - either directly or from parent
        let targetContainer;
        
        if (over.data.current?.type === 'column') {
            targetContainer = over.id;
        } else {
            const overTaskId = over.id;
            const overTask = tasks.find(t => t.id === overTaskId);
            targetContainer = overTask?.status;
        }
        
        if (targetContainer === 'ToDo' || targetContainer === 'InProgress' || targetContainer === 'Done') {
            const newStatus = targetContainer;
            const task = tasks.find(t => t.id === taskId);
            
            if (task && task.status !== newStatus) {
                setTasks(prevTasks =>
                    prevTasks.map(task =>
                      task.id === taskId ? { ...task, status: newStatus as 'ToDo' | 'InProgress' | 'Done' } : task
                    )
                );
                try {
                    const response = await privateAxiosInstance.put(
                        TASK_URLS.CHANGE_TASK_STATUS(taskId), 
                        { status: newStatus }
                    );
                    toast.success(response?.data?.message || 'Task status updated successfully!');             
                } catch (err) {
                    console.log(err);
                }
            }
        }
    };
          useEffect(() => {
        getAllMyAssignedTasks() 
    }, [])
    if (isLoading) {
        return <Loading />;
    }
  return (
         <div>
          <div className="dark-text contentBg  py-3 px-4 mb-3">
          <h3 className='h3 dark-text fw-medium'>Task Board</h3>
        </div>
        <div className="container">
        <DndContext
    sensors={sensors}
    collisionDetection={closestCorners}
    onDragStart={handleDragStart}
    onDragEnd={handleDragEnd}
  >
        <div className="row  py-3 mb-3 gx-3">
            <Column id={'ToDo'} title="To Do" tasks={getTaskByStatus('ToDo')} />
            <Column id={'InProgress'} title="In Progress" tasks={getTaskByStatus('InProgress')} />
            <Column id={'Done'}title="Done" tasks={getTaskByStatus('Done')} />
        </div>
    <DragOverlay>
        {activeTask ? <TaskItem task={activeTask} /> : null}
      </DragOverlay>
    </DndContext>
        </div>

    </div>
  )
}
