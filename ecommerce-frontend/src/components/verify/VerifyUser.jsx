// "use client"

// import { userInfo } from '@/slices/userSlice'
// import axios from 'axios'
// import { useDispatch } from 'react-redux'


// const VerifyUser = ({children}) => {
//     let dispatch = useDispatch()
//     let token = JSON.parse(localStorage.getItem("token"))
//     axios.get(`${process.env.NEXT_PUBLIC_API}/auth/verifyuser`, {
//         headers: {"token" : token}
//     }).then((res)=>{
//         dispatch(userInfo(res.data.data))
//         localStorage.setItem("token", JSON.stringify(res.data.token));
//     }).catch((err)=>{
//         console.log(err)
//     })

//   return (
//     <div>{children}</div>
//   )
// }

// export default VerifyUser

"use client";

import { userInfo } from "@/slices/userSlice";
import axios from "axios";
import { useDispatch } from "react-redux";
import { useEffect } from "react";

const VerifyUser = ({ children }) => {
  let dispatch = useDispatch();

  useEffect(() => {
    let token = localStorage.getItem("token");
    if (!token) return;

    axios
      .get(`${process.env.NEXT_PUBLIC_API}/auth/verifyuser`, {
        headers: { token: token },
      })
      .then((res) => {
        dispatch(userInfo(res.data.data));
        if (res.data.token) {
          localStorage.setItem("token", res.data.token);
        }
      })
      .catch((err) => {
        console.log(err);
        localStorage.removeItem("token");
      });
  }, [dispatch]); 

  return <div>{children}</div>;
};

export default VerifyUser;
