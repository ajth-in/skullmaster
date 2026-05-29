"use client";

import { CausticsProvider, Skeleton } from "@o-slash/react";
import { lazy, Suspense, useState } from "react";
import styles from "./page.module.css";

const registry = {
  SignupForm: lazy(() => import("../.empty-set/bones/SignupForm")),
  ProfileCard: lazy(() => import("../.empty-set/bones/ProfileCard")),
  ProductCard: lazy(() => import("../.empty-set/bones/ProductCard")),
} as const;

function toPascalCase(input: string): string {
  return input
    .trim()
    .replace(/['"]/g, "")
    .split(/[^a-zA-Z0-9]+/)
    .filter(Boolean)
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join("");
}

export function Bone({
  name,
  fallback = "Loading skeleton...",
  missingFallback = "No generated skeleton found.",
}: {
  name: string;
  fallback?: React.ReactNode;
  missingFallback?: React.ReactNode;
}) {
  const key = toPascalCase(name) as keyof typeof registry;

  const Component = registry[key];

  if (!Component) {
    return <>{missingFallback}</>;
  }

  return <Suspense fallback={fallback}>{/* <Component /> */}</Suspense>;
}

function DemoCard({
  title,
  skeletonName,
  children,
}: {
  title: string;
  skeletonName: string;
  children: React.ReactNode;
}) {
  const [showSkeleton, setShowSkeleton] = useState(false);

  return (
    <div className={styles.demoCard}>
      <div className={styles.demoHeader}>
        <h3>{title}</h3>

        <button className={styles.toggleButton} onClick={() => setShowSkeleton((v) => !v)}>
          {showSkeleton ? "Show UI" : "Show Skeleton"}
        </button>
      </div>

      <div className={styles.demoContent}>
        {showSkeleton ? <Bone name={skeletonName} /> : children}
      </div>
    </div>
  );
}

function SignupForm() {
  return (
    <div className={styles.form}>
      <h4>Create Account</h4>
      <input className={styles.input} placeholder="Email" />
      <input className={styles.input} placeholder="Password" />
      <button className={styles.primaryButton}>Sign Up</button>
    </div>
  );
}

function ProfileCard() {
  return (
    <div className={styles.profile}>
      <div className={styles.avatar}>A</div>
      <h4>Ajith</h4>
      <span className={styles.muted}>Product Engineer</span>
      <p className={styles.description}>Building accessible design systems and frontend tooling.</p>
    </div>
  );
}

function ProductCard() {
  return (
    <div className={styles.product}>
      <div className={styles.productImage} />
      <h4>Mechanical Keyboard</h4>
      <span className={styles.price}>₹4,999</span>
      <button className={styles.primaryButton}>Add to Cart</button>
    </div>
  );
}

function DashboardWidget() {
  return (
    <div className={styles.dashboard}>
      <h4>Total Users</h4>
      <div className={styles.bigNumber}>12,481</div>

      <div className={styles.metricRow}>
        <span>Growth</span>
        <span>+18%</span>
      </div>

      <div className={styles.metricRow}>
        <span>Retention</span>
        <span>92%</span>
      </div>
    </div>
  );
}

function ChatCard() {
  return (
    <div className={styles.chat}>
      <div className={styles.chatBubbleLeft}>Hey, did the build finish?</div>
      <div className={styles.chatBubbleRight}>Yep. Everything looks good.</div>
      <div className={styles.chatBubbleLeft}>Perfect.</div>
    </div>
  );
}

function PricingCard() {
  return (
    <div className={styles.pricing}>
      <h4>Pro Plan</h4>
      <div className={styles.bigNumber}>$19</div>

      <ul className={styles.featureList}>
        <li>Unlimited Projects</li>
        <li>Analytics</li>
        <li>Priority Support</li>
      </ul>

      <button className={styles.primaryButton}>Upgrade</button>
    </div>
  );
}

function AnalyticsPanel() {
  return (
    <div className={styles.analytics}>
      <h4>Traffic Overview</h4>

      <div className={styles.chart}>
        <div style={{ height: "40%" }} />
        <div style={{ height: "70%" }} />
        <div style={{ height: "55%" }} />
        <div style={{ height: "90%" }} />
        <div style={{ height: "65%" }} />
      </div>
    </div>
  );
}

function BlogCard() {
  return (
    <div className={styles.blog}>
      <div className={styles.blogImage} />

      <h4>Building Faster Frontends</h4>

      <p className={styles.description}>
        Learn how streaming, suspense and modern rendering patterns improve UX.
      </p>
    </div>
  );
}

function SettingsForm() {
  return (
    <div className={styles.form}>
      <h4>Settings</h4>

      <label className={styles.checkboxRow}>
        <input type="checkbox" defaultChecked />
        Email Notifications
      </label>

      <label className={styles.checkboxRow}>
        <input type="checkbox" />
        Beta Features
      </label>

      <button className={styles.primaryButton}>Save</button>
    </div>
  );
}

export default function Page() {
  return (
    <CausticsProvider isEnabled>
      <div className={styles.page}>
        <div className={styles.hero}>
          <h1>Ø-Slash Component Gallery</h1>
          <p>Toggle between real components and generated skeletons.</p>
        </div>

        <div className={styles.grid}>
          <DemoCard title="Signup Form" skeletonName="SignupForm">
            <Skeleton name="signupForm">
              <SignupForm />
            </Skeleton>
          </DemoCard>

          <DemoCard title="Profile Card" skeletonName="ProfileCard">
            <Skeleton name="profileCard">
              <ProfileCard />
            </Skeleton>
          </DemoCard>

          <DemoCard title="Product Card" skeletonName="ProductCard">
            <Skeleton name="productCard">
              <ProductCard />
            </Skeleton>
          </DemoCard>

          <DemoCard title="Dashboard Widget" skeletonName="DashboardWidget">
            <Skeleton name="dashboardWidget">
              <DashboardWidget />
            </Skeleton>
          </DemoCard>

          <DemoCard title="Chat Card" skeletonName="ChatCard">
            <Skeleton name="chatCard">
              <ChatCard />
            </Skeleton>
          </DemoCard>

          <DemoCard title="Pricing Card" skeletonName="PricingCard">
            <Skeleton name="pricingCard">
              <PricingCard />
            </Skeleton>
          </DemoCard>

          <DemoCard title="Analytics Panel" skeletonName="AnalyticsPanel">
            <Skeleton name="analyticsPanel">
              <AnalyticsPanel />
            </Skeleton>
          </DemoCard>

          <DemoCard title="Blog Card" skeletonName="BlogCard">
            <Skeleton name="blogCard">
              <BlogCard />
            </Skeleton>
          </DemoCard>

          <DemoCard title="Settings Form" skeletonName="SettingsForm">
            <Skeleton name="settingsForm">
              <SettingsForm />
            </Skeleton>
          </DemoCard>
        </div>
      </div>
    </CausticsProvider>
  );
}
