import { Descriptions } from "antd";
import React from "react";

function MovieInfo(props) {
  let { movie } = props;
  return (
    <Descriptions title="Movie Info" bordered>
      <Descriptions.Item label="Title">{movie.title}</Descriptions.Item>
      <Descriptions.Item label="Release_Date">
        {movie.release_date}
      </Descriptions.Item>
      <Descriptions.Item label="Revenue">{movie.revenue}</Descriptions.Item>
      <Descriptions.Item label="Runtime">{movie.runtime}</Descriptions.Item>
      <Descriptions.Item label="Vote_Average" span={2}>
        {movie.vote_average}
      </Descriptions.Item>
      <Descriptions.Item label="Vote_Count">
        {movie.vote_count}
      </Descriptions.Item>
      <Descriptions.Item label="Status">{movie.status}</Descriptions.Item>
      <Descriptions.Item label="Popularity">
        {movie.popularity}
      </Descriptions.Item>
    </Descriptions>
  );
}

export default MovieInfo;
