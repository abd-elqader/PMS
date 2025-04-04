import { useEffect, useState } from "react";
import { Badge, Dropdown, Pagination, Table } from "react-bootstrap";
import axios, { AxiosError } from "axios";
import { privateAxiosInstance } from "../../services/api/apiInstance.ts";
import { USER_URLS } from "../../services/api/apiConfig.ts";
import { UserList } from "../../Interfaces/User.ts";
import { format } from "date-fns";
import { toast } from "react-toastify";

export default function UsersList() {
    const [isLoading, setIsLoading] = useState(true);

    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);

    let items = [];
    for (let number = 1; number <= totalPages; number++) {
        items.push(
            <Pagination.Item key={number} active={number === currentPage}>
                {number}
            </Pagination.Item>
        );
    }

    const [users, setUsers] = useState([]);
    let getUsers = async (pageSize: number, pageNumber: number) => {
        try {
            setIsLoading(true);
            let response = await privateAxiosInstance.get(USER_URLS.GET_USERS, {
                params: {
                    pageSize: pageSize,
                    pageNumber: pageNumber,
                },
            });
            console.log("response", response);

            setUsers(response.data.data);
            setTotalPages(response?.data?.totalNumberOfPages);
        } catch (error) {
            // if (axios.isAxiosError(error)) {
            //     const message =
            //         error.response?.data?.message || "An error occurred";
            //     toast.error(message);
            // } else {
            //     const message = "An error occurred";
            //     toast.error(message);
            // }
        } finally {
            setIsLoading(false);
        }
    };

    let toggleUserStatus = async (id: string) => {
        try {
            setIsLoading(true);
            let response = await privateAxiosInstance.put(
                USER_URLS.TOGGLE_USER_STATUS(id)
            );
            console.log("response", response);
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

    useEffect(() => {
        getUsers(50, currentPage).then((r) => console.log(r));
    }, []);
    return (
        <>
            <section className="bg-white">
                <div className="p-3 mb-3">
                    <h1>Users</h1>
                </div>
            </section>
            <div className="mx-3">
                <Table striped bordered hover>
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
                                    <div
                                        className="spinner-border text-success"
                                        role="status"
                                    >
                                        <span className="visually-hidden">
                                            Loading...
                                        </span>
                                    </div>
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
                                                <i className="fa-solid fa-ellipsis-vertical text-muted fs-3"></i>
                                            </Dropdown.Toggle>
                                            <Dropdown.Menu>
                                                <Dropdown.Item
                                                    href="#/action-1"
                                                    onClick={async () => {
                                                        console.log(
                                                            "User blocked"
                                                        );
                                                        await toggleUserStatus(
                                                            user.id
                                                        );
                                                    }}
                                                >
                                                    block
                                                </Dropdown.Item>
                                                <Dropdown.Item href="#/action-2">
                                                    view
                                                </Dropdown.Item>
                                            </Dropdown.Menu>
                                        </Dropdown>
                                    </td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td className="text-center" colSpan={6}>
                                    <div>
                                        <div className="text-center">
                                            <img
                                                className="w-25"
                                                src=""
                                                alt="no data"
                                            />
                                            <h4>No Data</h4>
                                            <p>No data available</p>
                                        </div>
                                    </div>
                                </td>
                            </tr>
                        )}
                    </tbody>
                </Table>
                <Pagination>{items}</Pagination>
            </div>
        </>
    );
}
