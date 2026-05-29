"use client";

import { CausticsProvider, Skeleton } from "@o-slash/react";
import Head from "next/head";
import { useState } from "react";

export default function Page() {
  const [activeTab, setActiveTab] = useState<"ui" | "skeleton">("ui");

  return (
    <CausticsProvider>
      <div className="landing-page-container">
        <Head>
          <title>Ø-Slash | Automated Skeleton UI Generation</title>
          <meta
            name="description"
            content="Generate perfect, zero-layout-shift Skeleton Screen loaders automatically from your React components."
          />
        </Head>

        {/* Global styling */}
        <style jsx global>{`
          @import url("https://fonts.googleapis.com/css2?family=Outfit:wght@300;400;500;600;700;800&family=JetBrains+Mono:wght@400;500&display=swap");

          :root {
            --bg-color: #030712;
            --text-color: #f3f4f6;
            --text-muted: #9ca3af;
            --accent-cyan: #06b6d4;
            --accent-blue: #3b82f6;
            --glass-bg: rgba(17, 24, 39, 0.7);
            --glass-border: rgba(255, 255, 255, 0.08);
          }

          * {
            box-sizing: border-box;
            margin: 0;
            padding: 0;
          }

          body {
            background-color: var(--bg-color);
            color: var(--text-color);
            font-family: "Outfit", sans-serif;
            overflow-x: hidden;
            background-image:
              radial-gradient(circle at 10% 20%, rgba(6, 182, 212, 0.05) 0%, transparent 40%),
              radial-gradient(circle at 90% 80%, rgba(59, 130, 246, 0.05) 0%, transparent 40%);
          }

          .landing-page-container {
            width: 100%;
            min-height: 100vh;
            display: flex;
            flex-direction: column;
            align-items: center;
          }

          /* Header / Navigation */
          .nav-bar {
            width: 100%;
            max-width: 1200px;
            display: flex;
            justify-content: space-between;
            align-items: center;
            padding: 24px;
            margin-top: 12px;
          }

          .logo-container {
            display: flex;
            align-items: center;
            gap: 8px;
            font-size: 24px;
            font-weight: 800;
            background: linear-gradient(135deg, var(--accent-cyan), var(--accent-blue));
            -webkit-background-clip: text;
            -webkit-text-fill-color: transparent;
            cursor: pointer;
          }

          .nav-links {
            display: flex;
            align-items: center;
            gap: 32px;
          }

          .nav-link {
            color: var(--text-muted);
            text-decoration: none;
            font-size: 15px;
            font-weight: 500;
            transition: color 0.2s ease;
          }

          .nav-link:hover {
            color: var(--text-color);
          }

          .nav-cta-btn {
            background: linear-gradient(135deg, var(--accent-cyan), var(--accent-blue));
            color: #000;
            border: none;
            padding: 10px 20px;
            border-radius: 999px;
            font-size: 14px;
            font-weight: 600;
            cursor: pointer;
            transition:
              transform 0.2s ease,
              box-shadow 0.2s ease;
          }

          .nav-cta-btn:hover {
            transform: translateY(-1px);
            box-shadow: 0 0 20px rgba(6, 182, 212, 0.4);
          }

          /* Hero Section */
          .hero-section {
            width: 100%;
            max-width: 1200px;
            display: flex;
            flex-direction: column;
            align-items: center;
            text-align: center;
            padding: 80px 24px;
          }

          .hero-badge {
            background: rgba(6, 182, 212, 0.1);
            color: var(--accent-cyan);
            border: 1px solid rgba(6, 182, 212, 0.2);
            padding: 6px 16px;
            border-radius: 999px;
            font-size: 13px;
            font-weight: 600;
            letter-spacing: 0.5px;
            margin-bottom: 24px;
            display: inline-block;
          }

          .hero-title {
            font-size: 64px;
            font-weight: 800;
            line-height: 1.1;
            max-width: 800px;
            letter-spacing: -1px;
            margin-bottom: 24px;
          }

          .hero-title-gradient {
            background: linear-gradient(135deg, #06b6d4, #3b82f6, #8b5cf6);
            -webkit-background-clip: text;
            -webkit-text-fill-color: transparent;
          }

          .hero-subtitle {
            font-size: 20px;
            color: var(--text-muted);
            max-width: 600px;
            line-height: 1.5;
            margin-bottom: 40px;
          }

          .hero-cta-group {
            display: flex;
            gap: 16px;
            margin-bottom: 60px;
          }

          .hero-btn {
            padding: 14px 28px;
            border-radius: 999px;
            font-size: 16px;
            font-weight: 600;
            cursor: pointer;
            transition: all 0.2s ease;
          }

          .hero-btn.primary {
            background: linear-gradient(135deg, var(--accent-cyan), var(--accent-blue));
            color: #000;
            border: none;
          }

          .hero-btn.primary:hover {
            transform: translateY(-2px);
            box-shadow: 0 10px 25px rgba(6, 182, 212, 0.35);
          }

          .hero-btn.secondary {
            background: rgba(255, 255, 255, 0.03);
            color: var(--text-color);
            border: 1px solid var(--glass-border);
          }

          .hero-btn.secondary:hover {
            background: rgba(255, 255, 255, 0.08);
            transform: translateY(-2px);
          }

          /* Showcase Section */
          .showcase-wrapper {
            width: 100%;
            max-width: 800px;
            margin-bottom: 100px;
            display: flex;
            flex-direction: column;
            align-items: center;
          }

          .tab-selector {
            display: flex;
            background: rgba(255, 255, 255, 0.03);
            border: 1px solid var(--glass-border);
            padding: 4px;
            border-radius: 999px;
            margin-bottom: 24px;
          }

          .tab-btn {
            border: none;
            background: transparent;
            color: var(--text-muted);
            padding: 8px 24px;
            border-radius: 999px;
            font-size: 14px;
            font-weight: 600;
            cursor: pointer;
            transition: all 0.2s ease;
          }

          .tab-btn.active {
            background: rgba(255, 255, 255, 0.1);
            color: var(--text-color);
          }

          .showcase-card {
            width: 100%;
            min-height: 240px;
            padding: 32px;
            background: var(--glass-bg);
            border: 1px solid var(--glass-border);
            border-radius: 24px;
            box-shadow: 0 20px 40px rgba(0, 0, 0, 0.5);
            display: flex;
            align-items: flex-start;
            gap: 24px;
            position: relative;
            overflow: hidden;
            text-align: left;
          }

          .profile-avatar {
            width: 80px;
            height: 80px;
            border-radius: 50%;
            background: linear-gradient(135deg, var(--accent-cyan), var(--accent-blue));
            display: flex;
            align-items: center;
            justify-content: center;
            font-size: 32px;
            font-weight: bold;
            color: #000;
            flex-shrink: 0;
            border: 2px solid rgba(255, 255, 255, 0.1);
          }

          .profile-details {
            display: flex;
            flex-direction: column;
            gap: 8px;
            flex-grow: 1;
          }

          .profile-name {
            font-size: 24px;
            font-weight: 700;
            color: var(--text-color);
          }

          .profile-tag {
            font-size: 14px;
            color: var(--accent-cyan);
            font-weight: 600;
          }

          .profile-bio {
            font-size: 15px;
            color: var(--text-muted);
            line-height: 1.6;
            margin-top: 4px;
          }

          .profile-stats {
            display: flex;
            gap: 24px;
            margin-top: 16px;
          }

          .stat-item {
            display: flex;
            flex-direction: column;
            gap: 2px;
          }

          .stat-val {
            font-weight: 700;
            font-size: 18px;
            color: var(--text-color);
          }

          .stat-lbl {
            font-size: 12px;
            color: var(--text-muted);
          }

          /* Simulated Skeleton Shimmer CSS */
          .shimmer-box {
            background: linear-gradient(
              90deg,
              rgba(255, 255, 255, 0.05) 25%,
              rgba(255, 255, 255, 0.12) 50%,
              rgba(255, 255, 255, 0.05) 75%
            );
            background-size: 200% 100%;
            animation: shimmer 1.5s infinite linear;
            border-radius: 4px;
          }

          .shimmer-circle {
            background: linear-gradient(
              90deg,
              rgba(255, 255, 255, 0.05) 25%,
              rgba(255, 255, 255, 0.12) 50%,
              rgba(255, 255, 255, 0.05) 75%
            );
            background-size: 200% 100%;
            animation: shimmer 1.5s infinite linear;
            border-radius: 50%;
          }

          @keyframes shimmer {
            0% {
              background-position: 200% 0;
            }
            100% {
              background-position: -200% 0;
            }
          }

          /* Features Section */
          .features-section {
            width: 100%;
            max-width: 1200px;
            padding: 80px 24px;
            display: flex;
            flex-direction: column;
            align-items: center;
          }

          .features-title {
            font-size: 40px;
            font-weight: 800;
            margin-bottom: 48px;
            text-align: center;
          }

          .features-grid {
            width: 100%;
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(320px, 1fr));
            gap: 24px;
          }

          .feature-card {
            background: var(--glass-bg);
            border: 1px solid var(--glass-border);
            border-radius: 20px;
            padding: 32px;
            text-align: left;
            transition: all 0.3s ease;
          }

          .feature-card:hover {
            transform: translateY(-4px);
            border-color: rgba(6, 182, 212, 0.3);
            box-shadow: 0 10px 30px rgba(6, 182, 212, 0.05);
          }

          .feature-icon {
            font-size: 32px;
            margin-bottom: 20px;
            background: linear-gradient(135deg, var(--accent-cyan), var(--accent-blue));
            -webkit-background-clip: text;
            -webkit-text-fill-color: transparent;
          }

          .feature-card-title {
            font-size: 20px;
            font-weight: 700;
            margin-bottom: 12px;
          }

          .feature-card-desc {
            font-size: 15px;
            color: var(--text-muted);
            line-height: 1.6;
          }

          /* Footer Section */
          .footer-section {
            width: 100%;
            max-width: 1200px;
            border-top: 1px solid var(--glass-border);
            padding: 40px 24px;
            margin-top: 100px;
            display: flex;
            justify-content: space-between;
            align-items: center;
            color: var(--text-muted);
            font-size: 14px;
          }

          .footer-logo {
            font-weight: 700;
            color: var(--text-color);
          }
        `}</style>

        {/* Navigation Bar */}
        <Skeleton name="nav-bar">
          <nav className="nav-bar">
            <Skeleton name="logo">
              <div className="logo-container">Ø-slash</div>
            </Skeleton>

            <Skeleton name="nav-links">
              <div className="nav-links">
                <Skeleton name="nav-link-features">
                  <a href="#features" className="nav-link">
                    Features
                  </a>
                </Skeleton>
                <Skeleton name="nav-link-docs">
                  <a href="#docs" className="nav-link">
                    Docs
                  </a>
                </Skeleton>
                <Skeleton name="nav-link-github">
                  <a href="#github" className="nav-link">
                    Github
                  </a>
                </Skeleton>
              </div>
            </Skeleton>

            <Skeleton name="nav-cta">
              <button className="nav-cta-btn">Launch App</button>
            </Skeleton>
          </nav>
        </Skeleton>

        {/* Hero Section */}
        <Skeleton name="hero-section">
          <section className="hero-section">
            <Skeleton name="hero-badge">
              <span className="hero-badge">INTRODUCING CAUSTICS COMPILER</span>
            </Skeleton>

            <Skeleton name="hero-title">
              <h1 className="hero-title">
                Automated loaders.
                <br />
                <span className="hero-title-gradient">Zero Layout Shift.</span>
              </h1>
            </Skeleton>

            <Skeleton name="hero-subtitle">
              <p className="hero-subtitle">
                Ø-slash compiles your actual React component layout into perfect, CSS-animated
                skeleton screens. No more manual drawing, no more layout shifts.
              </p>
            </Skeleton>

            <Skeleton name="hero-cta-group">
              <div className="hero-cta-group">
                <Skeleton name="hero-cta-primary">
                  <button className="hero-btn primary">Get Started Free</button>
                </Skeleton>
                <Skeleton name="hero-cta-secondary">
                  <button className="hero-btn secondary">View Documentation</button>
                </Skeleton>
              </div>
            </Skeleton>

            {/* Interactive Showcase Card */}
            <Skeleton name="showcase-wrapper">
              <div className="showcase-wrapper">
                <Skeleton name="tab-selector">
                  <div className="tab-selector">
                    <Skeleton name="tab-btn-ui">
                      <button
                        className={`tab-btn ${activeTab === "ui" ? "active" : ""}`}
                        onClick={() => setActiveTab("ui")}
                      >
                        Actual UI
                      </button>
                    </Skeleton>
                    <Skeleton name="tab-btn-skeleton">
                      <button
                        className={`tab-btn ${activeTab === "skeleton" ? "active" : ""}`}
                        onClick={() => setActiveTab("skeleton")}
                      >
                        Generated Skeleton
                      </button>
                    </Skeleton>
                  </div>
                </Skeleton>

                <Skeleton name="showcase-card">
                  <div className="showcase-card">
                    {activeTab === "ui" ? (
                      <>
                        <Skeleton name="profile-avatar">
                          <div className="profile-avatar">Ø</div>
                        </Skeleton>
                        <div className="profile-details">
                          <Skeleton name="profile-name">
                            <h3 className="profile-name">Caustic Compiler</h3>
                          </Skeleton>
                          <Skeleton name="profile-tag">
                            <span className="profile-tag">@caustics/server</span>
                          </Skeleton>
                          <Skeleton name="profile-bio">
                            <p className="profile-bio">
                              Analyzing components via ts-morph and writing static loaders directly
                              into your filesystem in real-time.
                            </p>
                          </Skeleton>
                          <div className="profile-stats">
                            <Skeleton name="profile-stat-1">
                              <div className="stat-item">
                                <span className="stat-val">120ms</span>
                                <span className="stat-lbl">Generation Time</span>
                              </div>
                            </Skeleton>
                            <Skeleton name="profile-stat-2">
                              <div className="stat-item">
                                <span className="stat-val">0px</span>
                                <span className="stat-lbl">Layout Shift</span>
                              </div>
                            </Skeleton>
                          </div>
                        </div>
                      </>
                    ) : (
                      <>
                        <Skeleton name="skeleton-avatar">
                          <div
                            className="shimmer-circle"
                            style={{ width: "80px", height: "80px", flexShrink: 0 }}
                          />
                        </Skeleton>
                        <div className="profile-details" style={{ width: "100%", gap: "12px" }}>
                          <Skeleton name="skeleton-name">
                            <div
                              className="shimmer-box"
                              style={{ width: "180px", height: "24px" }}
                            />
                          </Skeleton>
                          <Skeleton name="skeleton-tag">
                            <div
                              className="shimmer-box"
                              style={{ width: "110px", height: "16px" }}
                            />
                          </Skeleton>
                          <Skeleton name="skeleton-bio">
                            <div style={{ display: "flex", flexDirection: "column", gap: "6px" }}>
                              <div
                                className="shimmer-box"
                                style={{ width: "100%", height: "14px" }}
                              />
                              <div
                                className="shimmer-box"
                                style={{ width: "85%", height: "14px" }}
                              />
                            </div>
                          </Skeleton>
                          <div className="profile-stats" style={{ gap: "24px" }}>
                            <Skeleton name="skeleton-stat-1">
                              <div style={{ display: "flex", flexDirection: "column", gap: "6px" }}>
                                <div
                                  className="shimmer-box"
                                  style={{ width: "60px", height: "18px" }}
                                />
                                <div
                                  className="shimmer-box"
                                  style={{ width: "80px", height: "12px" }}
                                />
                              </div>
                            </Skeleton>
                            <Skeleton name="skeleton-stat-2">
                              <div style={{ display: "flex", flexDirection: "column", gap: "6px" }}>
                                <div
                                  className="shimmer-box"
                                  style={{ width: "40px", height: "18px" }}
                                />
                                <div
                                  className="shimmer-box"
                                  style={{ width: "70px", height: "12px" }}
                                />
                              </div>
                            </Skeleton>
                          </div>
                        </div>
                      </>
                    )}
                  </div>
                </Skeleton>
              </div>
            </Skeleton>
          </section>
        </Skeleton>

        {/* Features Section */}
        <Skeleton name="features-section">
          <section id="features" className="features-section">
            <Skeleton name="features-title">
              <h2 className="features-title">Designed for Modern Workflows</h2>
            </Skeleton>

            <div className="features-grid">
              <Skeleton name="feature-card-1">
                <div className="feature-card">
                  <div className="feature-icon">⚙️</div>
                  <h3 className="feature-card-title">Static AST Analysis</h3>
                  <p className="feature-card-desc">
                    Leverages ts-morph to intelligently parse your JSX layouts and extract precise
                    dimensional styles automatically.
                  </p>
                </div>
              </Skeleton>

              <Skeleton name="feature-card-2">
                <div className="feature-card">
                  <div className="feature-icon">⚡</div>
                  <h3 className="feature-card-title">Real-Time Polling</h3>
                  <p className="feature-card-desc">
                    Listens to your local development environment and regenerates the skeleton
                    loaders on component changes instantly.
                  </p>
                </div>
              </Skeleton>

              <Skeleton name="feature-card-3">
                <div className="feature-card">
                  <div className="feature-icon">📦</div>
                  <h3 className="feature-card-title">Zero Dependency Output</h3>
                  <p className="feature-card-desc">
                    Generates clean, native React JSX skeletons with minimal inline styles or custom
                    layouts, ready to be copied or auto-linked.
                  </p>
                </div>
              </Skeleton>
            </div>
          </section>
        </Skeleton>

        {/* Footer */}
        <Skeleton name="footer-section">
          <footer className="footer-section">
            <span className="footer-logo">Ø-slash © {new Date().getFullYear()}</span>
            <span>Created for the developers of tomorrow.</span>
          </footer>
        </Skeleton>
      </div>
    </CausticsProvider>
  );
}
