import AddressForm from "@/components/AddressForm";
import FooterPage from "@/components/Footer";
import Header from "@/components/Header";
import ProtectedUser from "@/components/ProtectedUser";
import axios from "axios";
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

export default function EditProductPage() {
  const [personalInfoData, setPersonalInfoData] = useState(null);
  const router = useRouter();
  const { data: session } = useSession();

  useEffect(() => {
    if (!session?.user?.id) {
      return;
    }
    axios
      .get("/api/personalinfo?userid=" + session?.user?.id)
      .then((response) => {
        if (response.data != null) {
          setPersonalInfoData(response.data);
        }
        // router.push("/account/edit/" + session?.user?.id);
      });
  }, [session?.user?.id]);

  return (
    <ProtectedUser userId={session?.user?.id}>
      {!personalInfoData && (
        <div>
          <Header />
          <div className="min-h-screen mx-auto">
            <h1 className="text-2xl font-bold ml-3 lg:text-center mt-5 mb-5">
              Add Personal Info
            </h1>
            <AddressForm />
          </div>

          <FooterPage />
        </div>
      )}
    </ProtectedUser>
  );
}
