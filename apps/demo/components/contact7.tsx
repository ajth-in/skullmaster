import { Mail, MapPin, MessageCircle, Phone } from "lucide-react";

import { cn } from "@/lib/utils";

interface Contact7Props {
  title?: string;
  description?: string;
  emailLabel?: string;
  emailDescription?: string;
  email?: string;
  officeLabel?: string;
  officeDescription?: string;
  officeAddress?: string;
  phoneLabel?: string;
  phoneDescription?: string;
  phone?: string;
  chatLabel?: string;
  chatDescription?: string;
  chatLink?: string;
  className?: string;
}

const Contact7 = ({
  title = "Contact Us",
  description = "Have a question or need assistance? Reach out through any of the channels below.",
  emailLabel = "Email",
  emailDescription = "We respond to all emails within 24 hours.",
  email = "hello@example.com",
  officeLabel = "Office",
  officeDescription = "Drop by our office for a chat.",
  officeAddress = "1 Eagle St, Brisbane, QLD, 4000",
  phoneLabel = "Phone",
  phoneDescription = "We're available Mon-Fri, 9am-5pm.",
  phone = "(123) 456-7890",
  chatLabel = "Live Chat",
  chatDescription = "Get instant help from our support team.",
  chatLink = "Start Chat",
  className,
}: Contact7Props) => {
  return (
    <section className={cn("py-32", className)}>
      <div className="container">
        <div className="mx-auto max-w-6xl">
          <div className="mb-14">
            <h1 className="mb-4 text-4xl font-medium tracking-tight md:text-5xl">
              {title}
            </h1>
            <p className="text-muted-foreground">{description}</p>
          </div>
          <div className="grid gap-6 md:grid-cols-2">
            <div className="rounded-xl bg-muted/50 p-8">
              <Mail className="mb-4 size-5 text-muted-foreground" />
              <p className="mb-1 font-medium">{emailLabel}</p>
              <p className="mb-4 text-sm text-muted-foreground">
                {emailDescription}
              </p>
              <a href={`mailto:${email}`} className="hover:underline">
                {email}
              </a>
            </div>
            <div className="rounded-xl bg-muted/50 p-8">
              <MapPin className="mb-4 size-5 text-muted-foreground" />
              <p className="mb-1 font-medium">{officeLabel}</p>
              <p className="mb-4 text-sm text-muted-foreground">
                {officeDescription}
              </p>
              <a href="#" className="hover:underline">
                {officeAddress}
              </a>
            </div>
            <div className="rounded-xl bg-muted/50 p-8">
              <Phone className="mb-4 size-5 text-muted-foreground" />
              <p className="mb-1 font-medium">{phoneLabel}</p>
              <p className="mb-4 text-sm text-muted-foreground">
                {phoneDescription}
              </p>
              <a href={`tel:${phone}`} className="hover:underline">
                {phone}
              </a>
            </div>
            <div className="rounded-xl bg-muted/50 p-8">
              <MessageCircle className="mb-4 size-5 text-muted-foreground" />
              <p className="mb-1 font-medium">{chatLabel}</p>
              <p className="mb-4 text-sm text-muted-foreground">
                {chatDescription}
              </p>
              <a href="#" className="hover:underline">
                {chatLink}
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export { Contact7 };
