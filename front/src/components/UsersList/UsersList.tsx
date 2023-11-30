import React, { useEffect, useState } from "react";
import "./usersList.scss";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import Button from "../Button/Button";
import {
  changeUserRoleAction,
  deleteUserAction,
  getAllUsersAction,
  setUsersPlanAction,
} from "@/redux/features/userSlice";

const UsersList = () => {
  const [viewPlan, setViewPlan] = useState(false);
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

  const handleDeleteUser = async (username: string) => {
    try {
      await dispatch(deleteUserAction(username)).unwrap();
    } catch (error) {
      console.error(error);
    }
  };
  const handleChangeRole = async (
    username: string,
    role: "USER" | "TRAINER"
  ) => {
    try {
      await dispatch(
        changeUserRoleAction({ username, newRole: role })
      ).unwrap();
    } catch (error) {
      console.error(error);
    }
  };
  const handleViewPlan = async (planId: string | undefined) => {
    try {
      if (planId) {
        await dispatch(setUsersPlanAction(planId)).unwrap();
        setViewPlan(true);
      }
    } catch (error) {
      console.error(error);
    }
  };
  return (
    <>
      <h1 className='users__all'>All Users</h1>
      <table className='usersTable'>
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
                <td
                  onMouseEnter={() => handleViewPlan(user.planId)}
                  onMouseLeave={() => setViewPlan(false)}
                  className='table__plan'
                >
                  {viewPlan ? user.planName : user.planId}
                </td>
                <td>
                  {user.endDateOfPlan &&
                    new Date(user.endDateOfPlan).toLocaleDateString()}
                </td>
                <td>{user.role}</td>
                <td>
                  <div className='table--buttons'>
                    <Button
                      class='change__button'
                      onClick={() =>
                        handleChangeRole(
                          user.username,
                          user.role === "USER" ? "TRAINER" : "USER"
                        )
                      }
                    >
                      Change Role
                    </Button>
                    <Button
                      class='remove__user__button'
                      onClick={() => handleDeleteUser(user.username)}
                    >
                      Delete
                    </Button>
                  </div>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
      <div className='usersList__cards'>
        {user.users.map((user) => {
          return (
            <div className='user__card' key={user.username}>
              <div className='user__card__desc'>
                <div className='user__card__info'>
                  <div className='user__card__item'>
                    <h4>Name:</h4>
                    <span>{user.name}</span>
                  </div>
                  <div className='user__card__item user__card__item__right'>
                    <h4>Surname:</h4>
                    <span>{user.surname}</span>
                  </div>
                </div>
                <div className='user__card__info'>
                  <div className='user__card__item'>
                    <h4>Username:</h4>
                    <span>{user.username}</span>
                  </div>
                  <div className='user__card__item user__card__item__right'>
                    <h4>Email:</h4>
                    <span>{user.email}</span>
                  </div>
                </div>
                <div className='user__card__item'>
                  <h4>Plan:</h4>
                  <span
                    onMouseEnter={() => handleViewPlan(user.planId)}
                    onMouseLeave={() => setViewPlan(false)}
                  >
                    {viewPlan ? user.planName : user.planId}
                  </span>
                </div>
                <div className='user__card__info'>
                  <div className='user__card__item'>
                    <h4>End Date of Plan: </h4>
                    <span>
                      {user.endDateOfPlan &&
                        new Date(user.endDateOfPlan).toLocaleDateString()}
                    </span>
                  </div>
                  <div className='user__card__item user__card__item__right'>
                    <h4>Role:</h4>
                    <span>{user.role}</span>
                  </div>
                </div>
              </div>
              <div className='user__card__buttons'>
                <Button
                  class='change__button'
                  onClick={() =>
                    handleChangeRole(
                      user.username,
                      user.role === "USER" ? "TRAINER" : "USER"
                    )
                  }
                >
                  Change Role
                </Button>
                <Button
                  class='remove__user__button'
                  onClick={() => handleDeleteUser(user.username)}
                >
                  Delete
                </Button>
              </div>
            </div>
          );
        })}
      </div>
    </>
  );
};

export default UsersList;
