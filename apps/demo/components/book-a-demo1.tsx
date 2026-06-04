"use client";

import { ArrowRight } from "lucide-react";
import { motion } from "motion/react";
import React, { useEffect, useRef, useState } from "react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { cn } from "@/lib/utils";

const InfiniteMovingCarousel = ({ images }: { images: string[] }) => {
  const carouselRef = useRef<HTMLDivElement>(null);
  const [width, setWidth] = useState(0);

  useEffect(() => {
    if (!carouselRef.current) return;

    setWidth(carouselRef.current.clientWidth);

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setWidth(entry.target.clientWidth);
        }
      });
    });
    observer.observe(carouselRef.current);

    return () => {
      observer.disconnect();
    };
  }, []);

  return (
    <div
      style={{
        maskImage:
          "linear-gradient(to right, transparent, black 15%, black 85%, transparent)",
      }}
      className={cn("w-full overflow-hidden")}
    >
      <motion.div
        initial={{ x: -width }}
        animate={{ x: -(width / 2 + 24) }}
        transition={{
          duration: 3 * images.length,
          repeat: Infinity,
          repeatType: "loop",
          ease: "linear",
        }}
        ref={carouselRef}
        className="flex w-max items-center gap-12"
      >
        {[...images, ...images].map((image, index) => {
          return (
            <img
              key={`bookademo1-company-${index}`}
              src={image}
              alt={`Company ${index + 1}`}
              className="size-24 shrink-0 object-contain dark:invert"
            />
          );
        })}
      </motion.div>
    </div>
  );
};

const FormGroup = ({ children }: { children: React.ReactNode }) => {
  return <div className="flex w-full flex-col gap-2">{children}</div>;
};

interface BookADemo1Props {
  badge?: string;
  heading?: string;
  benefits?: string[];
  companies?: string[];
  className?: string;
}

const BookADemo1 = ({
  badge = "GET STARTED",
  heading = "Streamline your development workflow",
  benefits = [
    "Join thousands of developers using our platform.",
    "Get a personalized demo for your needs.",
  ],
  companies = [
    "https://deifkwefumgah.cloudfront.net/shadcnblocks/block/logos/company/fictional-company-logo-1.svg",
    "https://deifkwefumgah.cloudfront.net/shadcnblocks/block/logos/company/fictional-company-logo-2.svg",
    "https://deifkwefumgah.cloudfront.net/shadcnblocks/block/logos/company/fictional-company-logo-3.svg",
    "https://deifkwefumgah.cloudfront.net/shadcnblocks/block/logos/company/fictional-company-logo-4.svg",
    "https://deifkwefumgah.cloudfront.net/shadcnblocks/block/logos/company/fictional-company-logo-5.svg",
    "https://deifkwefumgah.cloudfront.net/shadcnblocks/block/logos/company/fictional-company-logo-6.svg",
    "https://deifkwefumgah.cloudfront.net/shadcnblocks/block/logos/company/fictional-company-logo-7.svg",
    "https://deifkwefumgah.cloudfront.net/shadcnblocks/block/logos/company/fictional-company-logo-8.svg",
  ],
  className,
}: BookADemo1Props) => {
  return (
    <section className={cn("py-32", className)}>
      <div className="container">
        <div className="grid grid-cols-1 gap-14 lg:grid-cols-2 lg:gap-4">
          <div className="flex flex-col items-center gap-4 lg:items-start lg:gap-8">
            <Badge variant="outline">{badge}</Badge>
            <h3 className="mt-2 max-w-md text-center text-3xl font-medium lg:mt-0 lg:max-w-xl lg:text-left lg:text-5xl">
              {heading}
            </h3>
            <ul className="flex flex-col">
              {benefits.map((benefit, index) => {
                return (
                  <li
                    key={`bookademo1-benefit-${index}`}
                    className="flex max-w-md items-start gap-2 px-4 last:hidden last:border-b-0 lg:border-b lg:py-6 last:lg:flex"
                  >
                    <ArrowRight
                      className="hidden size-6 shrink-0 lg:block"
                      strokeWidth={1}
                    />
                    <p className="text-center font-medium lg:text-left">
                      {benefit}
                    </p>
                  </li>
                );
              })}
            </ul>
            <div className="mt-20 hidden w-full overflow-hidden lg:block">
              <InfiniteMovingCarousel images={companies} />
            </div>
          </div>
          <Card className="w-full max-w-xl place-self-center bg-muted/70 px-4 pt-10 pb-4 lg:max-w-none lg:place-self-start">
            <form className="flex flex-col gap-10">
              <div className="flex w-full items-center gap-4">
                <FormGroup>
                  <Label>First Name</Label>
                  <Input
                    type="text"
                    placeholder="Alex"
                    className="bg-background"
                  />
                </FormGroup>
                <FormGroup>
                  <Label>Last Name</Label>
                  <Input
                    type="text"
                    placeholder="Smith"
                    className="bg-background"
                  />
                </FormGroup>
              </div>
              <FormGroup>
                <Label>Work Email</Label>
                <Input
                  type="email"
                  placeholder="alex.smith@company.com"
                  className="bg-background"
                />
              </FormGroup>
              <FormGroup>
                <Label>Job Title</Label>
                <Input
                  type="text"
                  placeholder="Full Stack Developer"
                  className="bg-background"
                />
              </FormGroup>
              <FormGroup>
                <Label>What are you looking to build?</Label>
                <Textarea
                  placeholder="Tell us about your project and tech stack"
                  className="bg-background"
                />
              </FormGroup>
              <FormGroup>
                <Label>How did you discover us?</Label>
                <Select>
                  <SelectTrigger className="w-full bg-background">
                    <SelectValue placeholder="GitHub, Twitter, etc." />
                  </SelectTrigger>
                  <SelectContent className="w-full">
                    <SelectItem value="github">GitHub</SelectItem>
                    <SelectItem value="twitter">Twitter</SelectItem>
                    <SelectItem value="blog">Tech Blog</SelectItem>
                    <SelectItem value="search">Search Engine</SelectItem>
                    <SelectItem value="conference">Tech Conference</SelectItem>
                    <SelectItem value="referral">Colleague Referral</SelectItem>
                    <SelectItem value="other">Other</SelectItem>
                  </SelectContent>
                </Select>
              </FormGroup>
              <Button type="submit" className="w-fit place-self-end">
                Submit
              </Button>
            </form>
          </Card>
          <div className="mt-20 block w-full overflow-hidden lg:hidden">
            <InfiniteMovingCarousel images={companies} />
          </div>
        </div>
      </div>
    </section>
  );
};

export { BookADemo1 };
