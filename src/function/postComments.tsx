import { useEffect, useState } from "react";
import axios from "axios";
// import { fetchData } from "../function/fetchComments";

//Interface For CommentItem
interface User {
  _id: string;
  username: string;
  password: string;
  roles: string[];
}
interface CommentItem {
  _id: string;
  comment: string;
  author: User | null;
  likeBy: string[];
  __v: number;
}

//Interface For Api Response
interface ApiResponse<type> {
  success: boolean;
  data: type;
}

//Assign Type for Comment
type CommentArray = CommentItem[];
//Assign Type For Response
type FetchCommentResponse = ApiResponse<CommentArray>;

const API_URL = "http://localhost:5000";
const fetchData = async (endpoint: string): Promise<FetchCommentResponse> => {
  const response = await axios.get(`${API_URL}/${endpoint}`);
  return response.data;
};

function DataComponent() {
  const [response, setResponse] = useState<CommentItem[] | null>(null);

  useEffect(() => {
    const fetchDataAsync = async () => {
      const result = await fetchData("api/getComment");
      setResponse(result.data);
      await console.log(result);
    };

    fetchDataAsync();
  }, []);

  if (response === null) {
    return <div>Loading</div>;
  }

  return (
    <>
      <div className="flex flex-col gap-2">
        {response.map((item) => (
          <div
            key={item._id}
            className="w-80 bg-neutral-900 text-white rounded-xl"
          >
            <div className="flex justify-between pr-4">
              <div className="flex flex-col gap-1 justify-start p-2">
                {item.author !== null ? (
                  <span>
                    <b>{item.author.username}</b> {item.comment}
                  </span>
                ) : (
                  <span>
                    <b>UserNotAvail</b> {item.comment}
                  </span>
                )}
              </div>
              <div className="self-center">
                {
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    width="24"
                    height="24"
                  >
                    <path
                      d="M12.001 4.52853C14.35 2.42 17.98 2.49 20.2426 4.75736C22.5053 7.02472 22.583 10.637 20.4786 12.993L11.9999 21.485L3.52138 12.993C1.41705 10.637 1.49571 7.01901 3.75736 4.75736C6.02157 2.49315 9.64519 2.41687 12.001 4.52853ZM18.827 6.1701C17.3279 4.66794 14.9076 4.60701 13.337 6.01687L12.0019 7.21524L10.6661 6.01781C9.09098 4.60597 6.67506 4.66808 5.17157 6.17157C3.68183 7.66131 3.60704 10.0473 4.97993 11.6232L11.9999 18.6543L19.0201 11.6232C20.3935 10.0467 20.319 7.66525 18.827 6.1701Z"
                      fill="currentColor"
                    ></path>
                  </svg>
                }
              </div>
            </div>
            <div className="flex gap-1 justify-start pl-2 pb-2">
              <p>Likes</p>
              <p>{item.likeBy.length}</p>
              <p>Reply</p>
            </div>
            {/* <p>Liked By: {item.likeBy.join(", ")}</p> */}
            {/* Render other properties as needed */}
          </div>
        ))}
      </div>
    </>
  );
}
export default DataComponent;
