import Layout from "@/components/Layout";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import axios from "axios";
import SlilderForm from "@/components/SliderForm";

export default function EditSliderPage() {
  const [sliderInfo, setSliderInfo] = useState(null);
  const router = useRouter();
  const { id } = router.query;
  useEffect(() => {
    if (!id) {
      return;
    }
    axios.get("/api/slider?id=" + id).then((response) => {
      setSliderInfo(response.data);
    });
  }, [id]);
  return (
    <Layout>
      <h1>Edit Slider</h1>
      {sliderInfo && <SlilderForm {...sliderInfo} />}
    </Layout>
  );
}
