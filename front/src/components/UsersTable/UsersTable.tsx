import React, { useEffect } from "react";
import "./usersTable.scss";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import Button from "../Button/Button";
import { getAllUsersAction } from "@/redux/features/userSlice";

const UsersTable = () => {
  const user = useAppSelector((state) => state.user);
  const dispatch = useAppDispatch();

  useEffect(() => {
    (async () => {
      try {
        await dispatch(getAllUsersAction()).unwrap();
      } catch (error) {
        console.error(error);
      }
    })();
  }, [dispatch]);
  return (
    <table className='table'>
      <thead>
        <tr>
          <th>Name</th>
          <th>Surname</th>
          <th>Username</th>
          <th>Email</th>
          <th>Plan</th>
          <th>Plan Ends</th>
          <th>Role</th>
          <th></th>
        </tr>
      </thead>
      <tbody>
        {user.users.map((user) => {
          return (
            <tr key={user.username}>
              <td>{user.name}</td>
              <td>{user.surname}</td>
              <td>{user.username}</td>
              <td>{user.email}</td>
              <td>{user.planName}</td>
              <td>{user.endDateOfPlan}</td>
              <td>{user.role}</td>
              <td>
                <div className='table--buttons'>
                  <Button class='button__edit'>Update</Button>
                  <Button class='button__delete'>Delete</Button>
                </div>
              </td>
            </tr>
          );
        })}
      </tbody>
    </table>
  );
};

export default UsersTable;
