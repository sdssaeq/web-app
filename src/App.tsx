import { Suspense } from "react";
import DataComponent from "./function/postComments";

function App() {
  //
  //
  return (
    <>
      <div className="">
        <div className="flex flex-col items-center border border-red-500">
          <h1>Comments</h1>
          <Suspense>
            <DataComponent />
          </Suspense>
        </div>
      </div>
    </>
  );
}

export default App;
