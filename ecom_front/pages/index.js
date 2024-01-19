import FooterPage from "@/components/Footer";
import Header from "@/components/Header";
import NewProduct from "@/components/NewProduct";
import SliderCard from "@/components/Slider";
import { Product } from "@/lib/models/Product";
import { SliderImages } from "@/lib/models/SliderImages";
import { mongooseConnect } from "@/lib/mongoose";

export default function HomePage({ sliderImage, newProducts }) {
  return (
    <>
      <Header />
      <SliderCard sliderimage={sliderImage} />
      <div className="container min-h-screen">
        <NewProduct products={newProducts} />
      </div>
      <br />
      <FooterPage />
    </>
  );
}

export async function getServerSideProps() {
  await mongooseConnect();

  const sliderImage = await SliderImages.findOne({ title: "slider" });
  const newProducts = await Product.find({}, null, {
    sort: { _id: -1 },
    limit: 10,
  });
  return {
    props: {
      sliderImage: JSON.parse(JSON.stringify(sliderImage)),
      newProducts: JSON.parse(JSON.stringify(newProducts)),
    },
  };
}
