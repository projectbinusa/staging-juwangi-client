// eslint-disable-next-line no-unused-vars
import React from "react";
import {  RouterProvider } from "react-router-dom";
import router from "./routes/MainRoutes"; 
// import {SideBar} from "./component/sidebar/index";

export default function App() {
  return (
        <RouterProvider router={router} />
        
  );
}

