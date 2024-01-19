import Layout from "@/components/Layout";
import axios from "axios";
import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

export default function SettingPage() {
  const [admins, setAdmins] = useState([]);
  const [email, setEmail] = useState("");
  const router = useRouter();

  //To get all users that role:admin and set it to the state variable
  useEffect(() => {
    axios.get("/api/users").then((response) => {
      setAdmins(response.data);
    });
  }, []);

  //Check user on the user when find that user then open edit form to update user role
  function searchUser(ev) {
    ev.preventDefault();
    axios.get("/api/users?email=" + email).then((response) => {
      if (response.data) {
        router.push("/settings/edit/" + response.data);
      } else {
        console.log("Not Found that user");
      }
    });
  }

  return (
    <Layout>
      <h1>Search User to Add Admin</h1>
      <div className="flex flex-wrap gap-2">
        <input
          text="search"
          value={email}
          onChange={(ev) => setEmail(ev.target.value)}
        />
        <button className="btn-default" onClick={searchUser}>
          Search User
        </button>
      </div>
      <h1 className="mt-2">Admins</h1>{" "}
      <table className="basic ">
        <thead>
          <tr>
            <th>ID</th>
            <th>NAME</th>
            <th>EMAIL</th>
            <th>ROLE</th>
            <th>ACTION</th>
          </tr>
        </thead>

        <tbody>
          {admins.length > 0 &&
            admins.map((a) => (
              <tr key={a._id}>
                <td>{a._id}</td>
                <td>{a.name}</td>
                <td>{a.email}</td>
                <td>{a.role}</td>
                <td>
                  <Link
                    href={"/settings/edit/" + a._id}
                    className="btn-primary"
                  >
                    EDIT
                  </Link>
                </td>
              </tr>
            ))}
        </tbody>
      </table>
    </Layout>
  );
}
