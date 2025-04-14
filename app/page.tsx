import Features from "@/components/features";
import Hero from "@/components/hero";
import SectionWrapper from "@/components/section-wrapper";

export default function Home() {

  return (
    <>
      <div className="@container w-full h-full">
          <Hero title="Your Premium Task Manager" description="Manage and streamline tasks at your fingertips"/>
      </div>
      <SectionWrapper title="Features" className="bg-gray-100 rounded-lg p-2">
      <Features />
      </SectionWrapper>
    </>
  )
}