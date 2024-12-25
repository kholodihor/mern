import Hero from "@/components/pages/home/hero/hero";
import Location from "@/components/pages/home/location/location";
import Reviews from "@/components/pages/home/reviews/reviews";
import Services from "@/components/pages/home/services/services";

export default function Home() {
  return (
    <>
      <Hero />
      <Services />
      <Reviews />
      <Location />
    </>
  );
}
