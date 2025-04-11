import { Dropdown } from "react-bootstrap";
import { Link } from "react-router-dom";
import { TableActionsProps } from "../../Interfaces/TableActions";
export default function TableActions({
  itemID,
  itemName,
  role,
  onDelete,
  handleView,
}: TableActionsProps) {
  return (
    <Dropdown>
      <Dropdown.Toggle className="bg-transparent border-0" id="dropdown-basic">
        <i className="fa fa-ellipsis-v textContent"></i>
      </Dropdown.Toggle>
      <Dropdown.Menu>
        <Dropdown.Item onClick={handleView} className="textContent">
          <i className="fa fa-eye mx-2"></i>
          view
        </Dropdown.Item>
        {role === "Manager" && (
          <>
            <Dropdown.Item
              className="textContent"
              onClick={() => onDelete(itemID, itemName)}
            >
              <i className="fa fa-trash mx-2"></i>
              Delete
            </Dropdown.Item>
            <Dropdown.Item className="textContent">
              <Link
                to={`/dashboard/projects/${itemID}`}
                className="text-decoration-none textContent"
              >
                <i className="fa fa-edit mx-2"></i>Edit
              </Link>
            </Dropdown.Item>
          </>
        )}
      </Dropdown.Menu>
    </Dropdown>
  );
}
