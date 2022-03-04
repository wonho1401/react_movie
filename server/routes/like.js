const express = require("express");
const router = express.Router();
const { Like } = require("../models/Like");

router.post("/likeNumber", (req, res) => {
  //bodyParser를 이용해서 body를 사용하는 것.

  //mongoDB에서 Like 숫자 가져오기
  Like.find({ movieId: req.body.movieId }).exec((err, info) => {
    if (err) return res.status(400).send(err);
    // 그다음 다시 프론트로 숫자 정보 보내주기
    res.status(200).json({ success: true, likeNumber: info.length });
  });
});

router.post("/liked", (req, res) => {
  //내가 이 영화를 좋아요 리스트에 넣었는지 DB에서 가져오기
  Like.find({ movieId: req.body.movieId, userFrom: req.body.userFrom }).exec(
    (err, info) => {
      if (err) return res.status(400).send(err);

      let result = false;
      if (info.length !== 0) {
        result = true;
      }
      res.status(200).json({ success: true, liked: result });
    }
  );
});

router.post("/removeFromLike", (req, res) => {
  Like.findOneAndDelete({
    movieId: req.body.movieId,
    userFrom: req.body.userFrom,
  }).exec((err, doc) => {
    if (err) return res.status(400).send(err);
    res.status(200).json({ success: true, doc });
  });
});

router.post("/addToLike", (req, res) => {
  const like = new Like(req.body);

  like.save((err, doc) => {
    if (err) return res.status(400).send(err);
    res.status(200).json({ success: true });
  });
});

module.exports = router;
