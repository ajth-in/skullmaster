import { useLoading } from "./context/LoadingContext";
import "./App.css";
import { SkullMaster } from "@skullmaster/react";
import Skeleton from "./skeletons/registry";
import "@skullmaster/react/style.css";
function LoadingToggle() {
  const { isLoading, toggleLoading } = useLoading();
  return (
    <button className="loading-toggle" onClick={toggleLoading}>
      {isLoading ? "Stop Loading" : "Start Loading"}
    </button>
  );
}

function Hero() {
  const { isLoading } = useLoading();
  if (isLoading) {
    return <Skeleton name={"Hero"} />;
  }
  return (
    <section className="hero-section" data-skullmaster="Hero">
      <div className="hero-content">
        <h1 className="hero-title">SKULLMASTER</h1>
        <p className="hero-subtitle">Neo Brutalist UI Showcase</p>
        <p className="hero-desc">
          A collection of common web components reimagined with bold, unapologetic design.
        </p>
        <div className="hero-actions">
          <button className="btn btn-primary">Get Started</button>
          <button className="btn btn-secondary">Learn More</button>
        </div>
      </div>
    </section>
  );
}

function UserProfileCard() {
  const { isLoading } = useLoading();
  if (isLoading) return <Skeleton name="UserProfileCard" />;
  return (
    <div data-skullmaster="UserProfileCard" className="card profile-card">
      <div className="profile-avatar" />
      <h2 className="profile-name">Jane Doe</h2>
      <span className="profile-role">Principal Engineer</span>
      <p className="profile-bio">
        Building resilient systems and championing developer experience across the organization.
      </p>
      <div className="profile-stats">
        <div className="stat">
          <strong>2.4k</strong>
          <span>Followers</span>
        </div>
        <div className="stat">
          <strong>180</strong>
          <span>Following</span>
        </div>
        <div className="stat">
          <strong>43</strong>
          <span>Projects</span>
        </div>
      </div>
      <button className="btn btn-primary btn-full">Follow</button>
    </div>
  );
}

function UIComponents() {
  const { isLoading } = useLoading();
  if (isLoading) return <Skeleton name="UI" />;
  return (
    <section className="components-section" data-skullmaster="UI">
      <h2 className="section-title">Common Components</h2>
      <div className="components-grid">
        <div className="card component-card">
          <h3>Buttons</h3>
          <div className="component-demo">
            <button className="btn btn-primary">Primary</button>
            <button className="btn btn-secondary">Secondary</button>
            <button className="btn btn-outline">Outline</button>
            <button className="btn btn-ghost">Ghost</button>
            <button className="btn btn-danger">Danger</button>
            <button className="btn btn-primary" disabled>
              Disabled
            </button>
          </div>
        </div>

        <div className="card component-card">
          <h3>Form Controls</h3>
          <div className="component-demo form-demo">
            <label>
              Text Input
              <input type="text" placeholder="Enter something..." />
            </label>
            <label>
              Select
              <select>
                <option>Option 1</option>
                <option>Option 2</option>
                <option>Option 3</option>
              </select>
            </label>
            <label className="checkbox-label">
              <input type="checkbox" /> Accept terms
            </label>
          </div>
        </div>

        <div className="card component-card">
          <h3>Badges & Tags</h3>
          <div className="component-demo">
            <span className="badge badge-default">Default</span>
            <span className="badge badge-primary">Primary</span>
            <span className="badge badge-success">Success</span>
            <span className="badge badge-warning">Warning</span>
            <span className="badge badge-danger">Danger</span>
            <span className="badge badge-info">Info</span>
          </div>
        </div>

        <div className="card component-card">
          <h3>Alerts</h3>
          <div className="component-demo alert-demo">
            <div className="alert alert-info">ℹ️ This is an info alert.</div>
            <div className="alert alert-success">✅ Operation completed!</div>
            <div className="alert alert-warning">⚠️ Check your input.</div>
            <div className="alert alert-error">❌ Something went wrong.</div>
          </div>
        </div>

        <div className="card component-card card-wide">
          <h3>Progress</h3>
          <div className="component-demo progress-demo">
            <progress className="progress" value={75} max={100} />
            <div className="progress-labels">
              <span>75% complete</span>
            </div>
          </div>
        </div>

        <div className="card component-card card-wide">
          <h3>Cards</h3>
          <div className="component-demo cards-demo">
            <div className="mini-card">
              <h4>Card One</h4>
              <p>Simple card with a title and body.</p>
            </div>
            <div className="mini-card mini-card-accent">
              <h4>Card Two</h4>
              <p>This one has an accent border.</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function App() {
  return (
    <SkullMaster>
      <LoadingToggle />
      <Hero />
      <UserProfileCard />
      <UIComponents />
      <footer className="footer">
        <p>Built with React + TypeScript &bull; Neo Brutalism Edition</p>
      </footer>
    </SkullMaster>
  );
}

export default App;
