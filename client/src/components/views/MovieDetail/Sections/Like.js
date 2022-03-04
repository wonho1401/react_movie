import React, { useEffect, useState } from "react";
import Axios from "axios";
import { Button } from "antd";

function Like(props) {
  const movieId = props.movieId;
  const userFrom = props.userFrom;
  const movieTitle = props.movieInfo.title;
  const moviePost = props.movieInfo.backdrop_path;
  const movieRunTime = props.movieInfo.runtime;

  const [LikeNumber, setLikeNumber] = useState(0);
  const [Liked, setLiked] = useState(false);

  let variables = {
    userFrom,
    movieId,
    movieTitle,
    moviePost,
    movieRunTime,
  };
  useEffect(() => {
    //서버에 like 정보를 요청해서 가져와야함.
    //방법이 여러가지 -> 1. fetch   2. axios
    Axios.post("/api/like/likeNumber", variables).then((response) => {
      if (response.data.success) {
        setLikeNumber(response.data.likeNumber);
      } else {
        alert("좋아요 수 정보를 가져오는데 실패했습니다.");
      }
    });

    Axios.post("/api/like/liked", variables).then((response) => {
      if (response.data.success) {
        setLiked(response.data.liked);
      } else {
        alert("좋아요 정보를 가져오는데 실패했습니다.");
      }
    });
  }, []);

  const onClickLike = () => {
    if (Liked) {
      Axios.post("/api/like/removeFromLike", variables).then((response) => {
        if (response.data.success) {
          setLikeNumber(LikeNumber - 1);
          setLiked(!Liked);
        } else {
          alert("Like 리스트에서 지우는데에 실패했습니다.");
        }
      });
    } else {
      Axios.post("/api/like/addToLike", variables).then((response) => {
        if (response.data.success) {
          setLikeNumber(LikeNumber + 1);
          setLiked(!Liked);
        } else {
          alert("Like 리스트에서 추가하는데에 실패했습니다.");
        }
      });
    }
  };

  return (
    <div>
      <Button onClick={onClickLike}>
        {Liked ? "Unlike" : "Like"} {LikeNumber}
      </Button>
    </div>
  );
}

export default Like;
