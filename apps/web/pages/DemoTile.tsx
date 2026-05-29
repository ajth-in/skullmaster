"use client";

import { useState } from "react";
import { Bone } from "./Bone";
import styles from "./page.module.css";

export function DemoCard({
  title,
  skeletonName,
  children,
}: {
  title: string;
  skeletonName: any;
  children: React.ReactNode;
}) {
  const [showBone, setShowBone] = useState(false);

  return (
    <div className={styles.demoCard}>
      <div className={styles.demoHeader}>
        <h3>{title}</h3>

        <button className={styles.toggleButton} onClick={() => setShowBone((v) => !v)}>
          {showBone ? "Show Component" : "Show Skeleton"}
        </button>
      </div>

      <div className={styles.demoContent}>{showBone ? <Bone name={skeletonName} /> : children}</div>
    </div>
  );
}
