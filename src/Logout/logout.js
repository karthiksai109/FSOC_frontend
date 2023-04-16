import React from "react";

import  axios  from 'axios';

const Logout=async ()=>{
        const response = await axios.delete(
          "http://localhost:4000/data"
        )
        console.log("deleted successfully!")
      }


 export default Logout