"use client";

import { CausticsProvider, Skeleton } from "@o-slash/react";
import Head from "next/head";
import { useState } from "react";
import styles from "./page.module.css";

export default function Page() {
  const [loading, setLoading] = useState(false);

  return (
    <CausticsProvider>
      <div className={styles.container}>
        <Head>
          <title>Ø-Slash | Automated Skeleton UI Generation</title>
          <meta
            name="description"
            content="Generate perfect, zero-layout-shift Skeleton Screen loaders automatically from your React components."
          />
        </Head>

        {/* Navigation Bar */}
        <Skeleton name="navBar">
          <header className={styles.header}>
            <div className={styles.logo}>Ø-slash</div>
            <div className={styles.badge}>Minimal Preview</div>
          </header>
        </Skeleton>

        {/* Hero Section */}
        <Skeleton name="heroSection">
          <section className={styles.hero}>
            <h1 className={styles.title}>Automated loaders.</h1>
            <p className={styles.subtitle}>
              Ø-slash compiles your React component layout into perfect, CSS-animated skeleton
              screens.
            </p>
          </section>
        </Skeleton>

        {/* Big Switch */}
        <div className={styles.controlSection}>
          <span className={styles.switchLabel}>Toggle Loader</span>
          <div className={styles.switchContainer} onClick={() => setLoading((prev) => !prev)}>
            <div className={`${styles.switch} ${loading ? styles.switchActive : ""}`}>
              <div className={`${styles.switchKnob} ${loading ? styles.switchKnobActive : ""}`} />
            </div>
          </div>
        </div>

        {/* Preview Card */}
        {loading ? (
          <div className={styles.card}>
            <Skeleton name="skeletonAvatar">
              <div className={`${styles.avatar} ${styles.shimmer} ${styles.circleShimmer}`} />
            </Skeleton>
            <div className={styles.details}>
              <Skeleton name="skeletonName">
                <div className={styles.shimmer} style={{ width: "160px", height: "20px" }} />
              </Skeleton>
              <Skeleton name="skeletonTag">
                <div
                  className={styles.shimmer}
                  style={{ width: "90px", height: "14px", marginTop: "4px" }}
                />
              </Skeleton>
              <Skeleton name="skeletonBio">
                <div
                  style={{ display: "flex", flexDirection: "column", gap: "6px", marginTop: "8px" }}
                >
                  <div className={styles.shimmer} style={{ width: "100%", height: "14px" }} />
                  <div className={styles.shimmer} style={{ width: "80%", height: "14px" }} />
                </div>
              </Skeleton>
            </div>
          </div>
        ) : (
          <div className={styles.card}>
            <Skeleton name="profileAvatar">
              <div className={styles.avatar}>Ø</div>
            </Skeleton>
            <div className={styles.details}>
              <Skeleton name="profileName">
                <h3 className={styles.cardTitle}>Caustic Compiler</h3>
              </Skeleton>
              <Skeleton name="profileTag">
                <span className={styles.cardTag}>@caustics/server</span>
              </Skeleton>
              <Skeleton name="profileBio">
                <p className={styles.cardBio}>
                  Analyzing components via ts-morph and writing static loaders directly into your
                  filesystem ins real-time.
                </p>
              </Skeleton>
            </div>
          </div>
        )}

        <footer className={styles.footer}>
          <span>Ø-slash © {new Date().getFullYear()}</span>
        </footer>
      </div>
    </CausticsProvider>
  );
}
