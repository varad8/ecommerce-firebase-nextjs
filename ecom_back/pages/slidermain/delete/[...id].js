import Layout from "@/components/Layout";
import axios from "axios";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

export default function DeleteSliderPage() {
  const router = useRouter();
  const { id } = router.query;
  const [sliderInfo, setSliderInfo] = useState();
  useEffect(() => {
    if (!id) {
      return;
    }
    axios.get("/api/slider?id=" + id).then((response) => {
      setSliderInfo(response.data);
    });
  }, [id]);

  function goBack() {
    router.push("/slidermain");
  }

  async function deleteProduct() {
    await axios.delete("/api/slider?id=" + id);
    goBack();
  }
  return (
    <Layout>
      <h1 className="text-center">
        Do you really want to delete &nbsp;"{sliderInfo?.title}"?
      </h1>
      <div className="flex gap-2 justify-center">
        <button className="btn-red" onClick={deleteProduct}>
          Yes
        </button>
        <button className="btn-default" onClick={goBack}>
          No
        </button>
      </div>
    </Layout>
  );
}
