import { useState } from "preact/hooks";
import heroImg from "./assets/hero.png";
import preactLogo from "./assets/preact.svg";
import viteLogo from "./assets/vite.svg";
import "./app.css";
import { SkullMaster } from "@skullmaster/preact";
import Skeleton, { markAsSkull } from "./skeletons/registry";
import { Suspense } from "preact/compat";

function ProfileCard() {
  return (
    <section class="profile-card" {...markAsSkull("ProfileCard")}>
      <div class="profile-head">
        <span class="profile-avatar" aria-hidden="true">
          SK
        </span>
        <div class="profile-id">
          <h2>Sample User</h2>
          <p>@sample_user</p>
        </div>
        <button type="button" class="profile-follow">
          Follow
        </button>
      </div>
      <p class="profile-bio">
        Placeholder bio for the skeleton demo. Nothing here is real content.
      </p>
      <div class="profile-stats">
        <div>
          <strong>128</strong>
          <span>Posts</span>
        </div>
        <div>
          <strong>4.2k</strong>
          <span>Followers</span>
        </div>
        <div>
          <strong>96</strong>
          <span>Following</span>
        </div>
      </div>
    </section>
  );
}

export function App() {
  const [count, setCount] = useState(0);
  const [isLoading, setIsLoading] = useState(false);

  return (
    <>
      <section id="center">
        <div class="hero">
          <img src={heroImg} class="base" width="170" height="179" alt="" />
          <img src={preactLogo} class="framework" alt="Preact logo" />
          <img src={viteLogo} class="vite" alt="Vite logo" />
        </div>
        <div>
          <h1>Get started</h1>
          <p>
            Edit <code>src/app.tsx</code> and save to test <code>HMR</code>
          </p>
        </div>
        <button type="button" class="counter" onClick={() => setCount((count) => count + 1)}>
          Count is {count}
        </button>
        <button
          type="button"
          class="loading-toggle"
          onClick={() => setIsLoading((value) => !value)}
        >
          {isLoading ? "Hide" : "Show"} skeleton
        </button>
      </section>

      <div class="ticks"></div>
      {isLoading ? (
        <Suspense fallback="">
          <Skeleton name="ProfileCard" />
        </Suspense>
      ) : (
        <ProfileCard />
      )}

      <div class="ticks"></div>
      <section id="next-steps" {...markAsSkull("NextSteps")}>
        <div id="docs">
          <svg class="icon" role="presentation" aria-hidden="true">
            <use href="/icons.svg#documentation-icon"></use>
          </svg>
          <h2>Documentation</h2>
          <p>Your questions, answered</p>
          <ul>
            <li>
              <a href="https://vite.dev/" target="_blank">
                <img class="logo" src={viteLogo} alt="" />
                Explore Vite
              </a>
            </li>
            <li>
              <a href="https://preactjs.com/" target="_blank">
                <img class="button-icon" src={preactLogo} alt="" />
                Learn more
              </a>
            </li>
          </ul>
        </div>
        <div id="social">
          <svg class="icon" role="presentation" aria-hidden="true">
            <use href="/icons.svg#social-icon"></use>
          </svg>
          <h2>Connect with us</h2>
          <p>Join the Vite community</p>
          <ul>
            <li>
              <a href="https://github.com/vitejs/vite" target="_blank">
                <svg class="button-icon" role="presentation" aria-hidden="true">
                  <use href="/icons.svg#github-icon"></use>
                </svg>
                GitHub
              </a>
            </li>
            <li>
              <a href="https://chat.vite.dev/" target="_blank">
                <svg class="button-icon" role="presentation" aria-hidden="true">
                  <use href="/icons.svg#discord-icon"></use>
                </svg>
                Discord
              </a>
            </li>
            <li>
              <a href="https://x.com/vite_js" target="_blank">
                <svg class="button-icon" role="presentation" aria-hidden="true">
                  <use href="/icons.svg#x-icon"></use>
                </svg>
                X.com
              </a>
            </li>
            <li>
              <a href="https://bsky.app/profile/vite.dev" target="_blank">
                <svg class="button-icon" role="presentation" aria-hidden="true">
                  <use href="/icons.svg#bluesky-icon"></use>
                </svg>
                Bluesky
              </a>
            </li>
          </ul>
        </div>
      </section>

      <div class="ticks"></div>
      <section id="spacer"></section>
      <SkullMaster />
    </>
  );
}
