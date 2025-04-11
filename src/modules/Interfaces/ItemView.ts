import { Project } from "./project";
import { Task } from "./Task";
import { UserList } from "./User";

export interface ItemViewProps {
    handleClose: () => void;
    show: boolean;
    item: Project | Task | UserList;
    role: string | undefined;
    itemType: 'project' | 'task' | 'user';
  }