"use client";
import { BookADemo1 } from "@/components/book-a-demo1";
import { Contact7 } from "@/components/contact7";
import { Download2 } from "@/components/download2";
import { Pricing4 } from "@/components/pricing4";
import { Projects5 } from "@/components/projects5";
import { Team1 } from "@/components/team1";
import { Testimonial10 } from "@/components/testimonial10";
import SkeletonSwitch from "@/components/ui/SkeletonSwitch";
import { SkullMaster } from "@skullmaster/react";

export default function Page() {
  return (
    <SkullMaster isEnabled>
      <div className="flex min-h-svh flex-col p-6">
        <SkeletonSwitch name="Projects">
          <Projects5 />
        </SkeletonSwitch>
        <SkeletonSwitch name="Pricing">
          <Pricing4 />
        </SkeletonSwitch>
        <SkeletonSwitch name="Contact7">
          <Contact7 />
        </SkeletonSwitch>
        <SkeletonSwitch name="Testimonial10">
          <Testimonial10 />
        </SkeletonSwitch>
        <SkeletonSwitch name="Download2">
          <Download2 />
        </SkeletonSwitch>
        <SkeletonSwitch name="Team1">
          <Team1 />
        </SkeletonSwitch>
        <SkeletonSwitch name="BookADemo1">
          <BookADemo1 />
        </SkeletonSwitch>
      </div>
    </SkullMaster>
  );
}
