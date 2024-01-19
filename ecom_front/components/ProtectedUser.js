import React, { useEffect, useState } from "react";
import axios from "axios";

const ProtectedUser = ({ userId, children }) => {
  const [isAuthorized, setIsAuthorized] = useState(false);
  console.log(userId);

  //Checking the user are present in the User Collection using id
  useEffect(() => {
    if (userId) {
      axios
        .get(`/api/getuser?userid=${userId}`)
        .then((response) => {
          if (response.data) {
            setIsAuthorized(true);
          }
        })
        .catch((error) => {
          console.error("Error checking authorization:", error);
        });
    }
  }, [userId]);

  //Throw Erro if Not Found Any user of that id
  if (!isAuthorized) {
    return <p>Not Authorized</p>;
  }

  return <>{children}</>;
};

export default ProtectedUser;
