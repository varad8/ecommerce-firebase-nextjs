import AddressForm from "@/components/AddressForm";
import FooterPage from "@/components/Footer";
import Header from "@/components/Header";
import ProtectedUser from "@/components/ProtectedUser";
import axios from "axios";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

export default function EditProductPage() {
  const [personalInfoData, setPersonalInfoData] = useState(null);

  const router = useRouter();
  const { id } = router.query;

  useEffect(() => {
    if (!id) {
      return;
    }
    axios.get("/api/personalinfo?userid=" + id).then((response) => {
      setPersonalInfoData(response.data);
    });
  }, [id]);

  return (
    <ProtectedUser userId={id}>
      <div className="min-h-screen mx-auto">
        <div>
          <Header />
          <h1 className="text-2xl font-bold ml-3 lg:text-center mt-5 mb-5">
            Edit Personal Info
          </h1>
          {personalInfoData && <AddressForm {...personalInfoData} />}

          <FooterPage />
        </div>
      </div>
    </ProtectedUser>
  );
}
