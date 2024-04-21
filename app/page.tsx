import Header from "@/components/Header";
import Hero from "@/components/Hero";
import Offer from "@/components/Offers";
import PopularSubjects from "@/components/PopularSubjects";
import Virtual from "@/components/Virtual";
import PrivateSession from "@/components/PrivateSession";
import HomeworkSupport from "@/components/HomeworkSupport";
import PopularClasses from "@/components/PopularClasses";
import GetStarted from "@/components/GetStarted";
import Testimonials from "@/components/Testimonials";

export default function Home() {
  return (
    <div className="bg-stone-100">
      <Header />
      <Hero />
      <Offer />
      <PopularSubjects />
      <Virtual />
      <PrivateSession />
      <HomeworkSupport />
      <PopularClasses />
      <GetStarted />
      <Testimonials />
    </div>
  );
}
