import { useContext, useEffect, useState } from "react";
import { Badge, Container, Dropdown, Form, Row, Table } from "react-bootstrap";
import axios from "axios";
import { privateAxiosInstance } from "../../services/api/apiInstance.ts";
import { USER_URLS } from "../../services/api/apiConfig.ts";
import { UserList, UserListResponse } from "../../Interfaces/User.ts";
import { format } from "date-fns";
import { toast } from "react-toastify";
import NoData from "../../shared/NoData/NoData.tsx";
import Loading from "../../shared/Loading/Loading.tsx";
import { Authcontext } from "../../AuthContext/AuthContext.tsx";
import ItemView from "../../shared/ItemView/ItemView.tsx";

export default function UsersList() {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [pageSize, setPageSize] = useState<number>(8);
  const [pageNumber, setPageNumber] = useState<number>(1);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [totalPages, setTotalPages] = useState<number>(1);
  const [users, setUsers] = useState<UserList[]>([]);
  const [userName, setUserName] = useState<string>("");
  const [country, setCountry] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [groups, setGroups] = useState<string>("");
  const [itemToView, setItemToView] = useState<UserList>({} as UserList);
  const [showItemViewModal, setShowItemViewModal] = useState<boolean>(false);
  const authContext=useContext(Authcontext)
  const role = authContext?.role
  const getUsers = async (): Promise<void> => {
    setIsLoading(true);
    try {
      const response = await privateAxiosInstance.get<UserListResponse>(USER_URLS.GET_USERS, {
        params: {
          userName,
          country,
          email,
          groups,
          pageSize,
          pageNumber,
        },
      });
      console.log("response", response);

      setUsers(response.data.data);
      setTotalPages(response?.data?.totalNumberOfPages);
    } catch (error) {
      if (axios.isAxiosError(error)) {
        const message =
          error.response?.data?.message || "An error occurred";
        toast.error(message);
      } else {
        const message = "An error occurred";
        toast.error(message);
      }
    } finally {
      setIsLoading(false);
    }
  };

  const toggleUserStatus = async (id: string): Promise<void> => {
    try {
      const response = await privateAxiosInstance.put<UserListResponse>(
        USER_URLS.TOGGLE_USER_STATUS(id)
      );
      console.log("response", response);
      toast.success("User status updated successfully");
    } catch (error) {
      if (axios.isAxiosError(error)) {
        const message =
          error.response?.data?.message || "An error occurred";
        toast.error(message);
      } else {
        const message = "An error occurred";
        toast.error(message);
      }
    } finally {
      setIsLoading(false);
      getUsers();
    }
  };
  // *search and filter
  const handleUserNameValue = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUserName(e.target.value);
    setPageNumber(1);
  };
 
  const handleCountryValue = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCountry(e.target.value)
    setPageNumber(1)
  }
  const handleEmailValue = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value)
    setPageNumber(1)
  }
  const handleGroupsValue = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setGroups(e.target.value);
    setPageNumber(1);
  }

  useEffect(() => {
    getUsers();
    // console.log(users[0].isActivated);
  }, [pageNumber, pageSize,userName,email,country,groups]);
  return (
    <>
      <section className="bg-white">
        <div className="bcox-dark-color contentBg  d-flex align-items-center justify-content-between py-3 px-4 mb-3">
          <h3 className='h3 textMaster fw-medium'>Users</h3>
        </div>
      </section>

      <div className="ms-4 project contentBg cbox-dark-color pt-3 rounded-2">
        <Container>
        <Row className=" g-2 ">
        <div className="position-relative  col-lg-3 col-sm-6 col-12 ">
          <Form.Control
            onInput={handleUserNameValue}
            type="search"
            placeholder="Search by Name"
            className="projecInput searchInput "
            />
          <i className="fa fa-search position-absolute search text-gray-400"></i>
        </div>
        <div className="position-relative col-lg-3 col-sm-6 col-12">
          <Form.Control
            onInput={handleEmailValue}
            type="search"
            placeholder="Search by email"
            className="projecInput searchInput "
            />
          <i className="fa fa-envelope position-absolute search text-gray-400"></i>
        </div>
        <div className="position-relative col-lg-3 col-sm-6 col-12">
          <Form.Control
            onInput={handleCountryValue}
            type="search"
            placeholder="Search by Country"
            className="projecInput searchInput "
            />
          <i className="fa fa-globe position-absolute search text-gray-400"></i>
          </div>
        <div className="position-relative col-lg-3 col-sm-6 col-12">
          <Form.Select
            onChange={handleGroupsValue}
            className="projecInput searchInput "
            >
            <option value="">Select group</option>
            <option value="1">Manager</option>
            <option value="2">Employee</option>
            </Form.Select>
          <i className="fa fa-user position-absolute search text-gray-400"></i>
          </div>
        </Row>
        </Container>
        <Table responsive striped bordered hover className='mt-3 '>
          <thead>
            <tr>
              <th scope="col">#</th>
              <th scope="col">userName</th>
              <th scope="col">status</th>
              <th scope="col">phoneNumber</th>
              <th scope="col">email</th>
              <th scope="col">date created</th>
              <th scope="col"></th>
            </tr>
          </thead>
          <tbody>
            {isLoading ? (
              <tr>
                <td colSpan={8} className="text-center">
                  <Loading/>
                </td>
              </tr>
            ) : users.length ? (
              users.map((user: UserList) => (
                <tr key={user.id} className="body-row">
                  <th scope="row">{user.id}</th>
                  <td>{user.userName}</td>
                  <td>
                    {user.isActivated ? (
                      <Badge bg="success">active</Badge>
                    ) : (
                      <Badge bg="warning">
                        not active
                      </Badge>
                    )}
                  </td>
                  <td>{user.phoneNumber}</td>
                  <td>{user.email}</td>
                  <td>
                    {format(
                      new Date(user.creationDate),
                      "MMMM dd, yyyy hh:mm:ss a"
                    )}
                  </td>
                  <td>
                    <Dropdown>
                      <Dropdown.Toggle
                        as="button"
                        className="btn btn-link p-0 border-0"
                        id="dropdown-custom-toggle"
                      >
                        <i className="fa-solid fa-ellipsis-vertical textContent"></i>
                      </Dropdown.Toggle>
                      <Dropdown.Menu>
                        <Dropdown.Item
                          href="#/action-1"
                          onClick={async () => {
                            await toggleUserStatus(
                              user.id
                            );
                          }}
                        >
                          {user?.isActivated ?  <i className="fa fa-lock me-2"></i> : <i className="fa fa-unlock me-2"></i>}
                          {user?.isActivated ? 'deactivate' : 'activate'}
                        </Dropdown.Item>
                        <Dropdown.Item onClick={() => {
                        setItemToView(user)
                        setShowItemViewModal(true)
                      }}>
                          <i className="fa fa-eye me-2"></i>view
                        </Dropdown.Item>
                      </Dropdown.Menu>
                    </Dropdown>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td className="text-center" colSpan={6}>
                  <NoData/>
                </td>
              </tr>
            )}
          </tbody>
        </Table>
        <ItemView 
      itemType='user'
        role={role}
        item={itemToView}
        show={showItemViewModal}
        handleClose={() => { setShowItemViewModal(false) }} />
      </div>
    </>
  );
}
