import Layout from "@/components/Layout";
import SettingForm from "@/components/SettingForm";
import axios from "axios";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

export default function EditAdmins() {
  const [adminData, setAdminData] = useState(null);
  const router = useRouter();
  const { id } = router.query;

  //Getting id from query then that data set to the SettingForm but you only edit role other fields are only read
  useEffect(() => {
    if (!id) {
      return;
    }
    console.log(id);
    axios.get("/api/users?id=" + id).then((response) => {
      console.log(response.data);
      setAdminData(response.data);
    });
  }, [id]);

  return (
    <Layout>
      <h1>Edit Admin</h1>
      {adminData && <SettingForm {...adminData} />}
    </Layout>
  );
}
