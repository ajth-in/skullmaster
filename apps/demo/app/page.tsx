import { Contact7 } from "@/components/contact7"
import { Download2 } from "@/components/download2"
import { Pricing4 } from "@/components/pricing4"
import { Projects5 } from "@/components/projects5"
import { Team1 } from "@/components/team1"
import { Testimonial10 } from "@/components/testimonial10"
import { Button } from "@/components/ui/button"
import SkeletonSwitch from "@/components/ui/SkeletonSwitch"

export default function Page() {
  return (
    <div className="flex min-h-svh flex-col p-6">
      <Projects5 />
      <SkeletonSwitch>
        <Pricing4 />
      </SkeletonSwitch>
      <Contact7 />
      <Testimonial10 />
      <Download2 />
      <Team1 />
    </div>
  )
}
