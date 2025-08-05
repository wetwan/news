import { useParams } from "react-router";

const NewsId = () => {
  const { id } = useParams();
  return <div>NewsId {id}</div>;
};

export default NewsId;
