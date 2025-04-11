export interface TableActionsProps {
    itemID: number ;
    itemName: string;
    role: string | undefined;
    onDelete: (id: number , title: string) => void;
    handleView: () => void;
  }