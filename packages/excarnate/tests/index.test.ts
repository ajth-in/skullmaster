import { expect, test } from "vitest";
import { html } from "lit";
import { normalize, transform } from "./utils";

test("adds skeleton class to root and transforms images", () => {
  console.log(
    transform(`<div class="page">
  <aside class="sidebar">
    <div class="profile-card">
      <img
        src="https://picsum.photos/200"
        alt="Profile"
        class="avatar"
      />

      <h2>John Doe</h2>

      <p>
        Senior Product Engineer working on frontend architecture,
        design systems and developer experience.
      </p>

      <a href="/profile">View Profile</a>
    </div>

    <nav>
      <ul>
        <li><a href="/dashboard">Dashboard</a></li>
        <li><a href="/analytics">Analytics</a></li>
        <li><a href="/settings">Settings</a></li>
      </ul>
    </nav>
  </aside>

  <main class="content">
    <section class="hero">
      <h1>Welcome Back</h1>

      <p>
        Manage your account, team members and project settings from
        this dashboard.
      </p>

      <img
        src="https://picsum.photos/800/400"
        alt="Hero"
        class="hero-image"
      />
    </section>

    <section class="settings-card">
      <h2>Account Settings</h2>

      <form>
        <label>
          Full Name
          <input
            type="text"
            value="John Doe"
            placeholder="Enter name"
            class="field"
          />
        </label>

        <label>
          Email
          <input
            type="email"
            value="john@example.com"
            class="field"
          />
        </label>

        <label>
          Search
          <input
            type="search"
            placeholder="Search projects"
            class="field"
          />
        </label>

        <label>
          Notifications
          <input
            type="checkbox"
            checked
          />
        </label>

        <button type="submit">
          Save Changes
        </button>
      </form>
    </section>

    <section class="projects">
      <h2>Recent Projects</h2>

      <div class="project-grid">
        <article class="project-card">
          <img
            src="https://picsum.photos/300/200"
            alt="Project"
          />

          <h3>Design System</h3>

          <p>
            Shared component library used across all internal
            products.
          </p>

          <button>Open</button>
        </article>

        <article class="project-card">
          <img
            src="https://picsum.photos/301/200"
            alt="Project"
          />

          <h3>Analytics Platform</h3>

          <p>
            Data visualization platform for operational metrics.
          </p>

          <button>Open</button>
        </article>
      </div>
    </section>

    <section class="stats">
      <div class="stat-card">
        <span>Total Users</span>
        <strong>24,182</strong>
      </div>

      <div class="stat-card">
        <span>Revenue</span>
        <strong>$1.2M</strong>
      </div>

      <div class="stat-card">
        <span>Conversion</span>
        <strong>8.4%</strong>
      </div>
    </section>

    <section class="icon-demo">
      <button>
        <svg
          width="20"
          height="20"
          viewBox="0 0 20 20"
          fill="currentColor"
        >
          <circle cx="10" cy="10" r="8"></circle>
        </svg>

        Create Project
      </button>
    </section>
  </main>
</div>`),
  );
  expect(
    normalize(
      transform(
        html`<div>
          <p>Hello</p>
          <img
            src="/hero.jpg"
            alt="Hero image"
            class="rounded-xl"
            width="320"
            height="180"
          />
          <script>
            alert("Hello");
          </script>
        </div>`,
      ),
    ),
  ).toBe(
    normalize(
      html`<div
        data-depth="0"
        className="empty-set__skeleton"
        role="status"
        aria-live="polite"
        aria-busy="true"
      >
        <p data-depth="1">
          <span className="empty-set__text" data-text-node="true" data-depth="1"
            >.....</span
          >
        </p>

        <img
          data-depth="1"
          className="rounded-xl"
          width="320"
          height="180"
          src="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg'/%3E"
          data-image-skeleton="true"
        ></img>
      </div>`,
    ),
  );
});
