import "./news.scss";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import React, { useEffect } from "react";
import Button from "../UI/Button/Button";
import Modal from "../Modal/Modal";
import { openModal } from "@/redux/features/modalSlice";
import { deleteNewsAction, getNewsAction } from "@/redux/features/newsSlice";

const News = () => {
  const dispatch = useAppDispatch();
  const user = useAppSelector((state) => state.user);
  const modal = useAppSelector((state) => state.modal);
  const { news } = useAppSelector((state) => state.news);

  useEffect(() => {
    (async () => {
      try {
        await dispatch(getNewsAction()).unwrap();
      } catch (error) {
        console.error(error);
      }
    })();
  }, []);

  const addNewsHandler = async () => {
    dispatch(openModal({ modalType: "addNews" }));
  };

  const deleteHandler = async (newsId: string) => {
    try {
      await dispatch(deleteNewsAction(newsId)).unwrap();
    } catch (error) {
      console.error(error);
    }
  };
  return (
    <>
      {modal.modalType === "addNews" && <Modal />}
      <div className='news'>
        <h1 className='news__heading'>News</h1>
        <div className='news__desc'>
          {news.map((newsItem) => (
            <div className='news__item' key={newsItem.id}>
              <div className='news__desc__item'>
                <p>{newsItem.newsDescription}</p>
                {user.isLoggedIn && user.role === "ADMIN" && (
                  <Button
                    class='remove__button'
                    onClick={() => deleteHandler(newsItem.id)}
                  >
                    -
                  </Button>
                )}
              </div>
              <hr />
            </div>
          ))}
        </div>
        {user.isLoggedIn && user.role === "ADMIN" && (
          <div className='news__buttons'>
            <Button class='news__button' onClick={addNewsHandler}>
              +
            </Button>
          </div>
        )}
      </div>
    </>
  );
};

export default News;
