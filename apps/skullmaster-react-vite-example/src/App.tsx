import { useState, useEffect } from "react";
import { useLoading } from "./context/LoadingContext";
import "./App.css";
import { SkullMaster } from "@skullmaster/react";
import Skeleton from "./skeletons/registry";
import { ImageCard } from "./common/components";

type Tab = "components" | "images" | "interactive";

const IMAGES = [
  {
    name: "MountainRange",
    seed: "mountains",
    w: 600,
    h: 400,
    title: "Mountain Range",
    desc: "Snow-capped peaks under a golden sunrise.",
    footer: "Northern Alps",
  },
  {
    name: "DeepOcean",
    seed: "ocean",
    w: 400,
    h: 600,
    title: "Deep Ocean",
    desc: "Crystal clear waters revealing vibrant coral reefs.",
    footer: "Pacific Ridge",
  },
  {
    name: "CityLights",
    seed: "city",
    w: 500,
    h: 350,
    title: "City Lights",
    desc: "Neon-drenched streets in the heart of the metropolis.",
    footer: "Downtown Core",
  },
  {
    name: "ForestCanopy",
    seed: "forest",
    w: 450,
    h: 450,
    title: "Forest Canopy",
    desc: "Dense woodland bathed in dappled afternoon light.",
    footer: "Redwood National",
  },
  {
    name: "DesertDunes",
    seed: "desert",
    w: 550,
    h: 300,
    title: "Desert Dunes",
    desc: "Endless waves of sand stretching to the horizon.",
    footer: "Sahara Basin",
  },
  {
    name: "NightSky",
    seed: "aurora",
    w: 350,
    h: 500,
    title: "Night Sky",
    desc: "Aurora borealis dancing across the arctic sky.",
    footer: "Iceland Highlands",
  },
];
function LoadingToggle() {
  const { isLoading, toggleLoading } = useLoading();
  return (
    <button className="loading-toggle" onClick={toggleLoading}>
      {isLoading ? "Hide" : "Show"}
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
            <ImageCard />
          </div>
        </div>
      </div>
    </section>
  );
}

function DarkModeToggle() {
  const [dark, setDark] = useState(false);
  useEffect(() => {
    document.documentElement.classList.toggle("dark", dark);
  }, [dark]);
  return (
    <button className="dark-toggle" onClick={() => setDark((d) => !d)}>
      {dark ? "☀️ Light" : "🌙 Dark"}
    </button>
  );
}

function Dashboard() {
  const { isLoading } = useLoading();
  if (isLoading) return <Skeleton name="Dashboard" />;
  const stats = [
    { label: "Total Revenue", value: "$128.5K", trend: "+12.5%", up: true },
    { label: "Active Users", value: "24,890", trend: "+8.2%", up: true },
    { label: "Orders", value: "1,432", trend: "-3.1%", up: false },
    { label: "Conversion", value: "3.24%", trend: "+1.8%", up: true },
  ];
  const rows = [
    {
      name: "John Doe",
      email: "john@example.com",
      role: "Admin",
      status: "Active",
      spent: "$4,320",
    },
    {
      name: "Jane Smith",
      email: "jane@example.com",
      role: "Editor",
      status: "Active",
      spent: "$2,150",
    },
    {
      name: "Bob Johnson",
      email: "bob@example.com",
      role: "Viewer",
      status: "Inactive",
      spent: "$890",
    },
    {
      name: "Alice Brown",
      email: "alice@example.com",
      role: "Editor",
      status: "Active",
      spent: "$3,670",
    },
    {
      name: "Charlie Lee",
      email: "charlie@example.com",
      role: "Admin",
      status: "Suspended",
      spent: "$12,400",
    },
  ];
  return (
    <section className="dashboard-section" data-skullmaster="Dashboard">
      <h2 className="section-title">Dashboard</h2>
      <div className="stats-grid">
        {stats.map((s) => (
          <div className="stat-card" key={s.label}>
            <span className="stat-label">{s.label}</span>
            <span className="stat-value">{s.value}</span>
            <span className={`stat-trend ${s.up ? "trend-up" : "trend-down"}`}>{s.trend}</span>
          </div>
        ))}
      </div>
      <div className="table-card">
        <div className="table-header">
          <span>Name</span>
          <span>Email</span>
          <span>Role</span>
          <span>Status</span>
          <span>Spent</span>
        </div>
        {rows.map((r) => (
          <div className="table-row" key={r.name}>
            <span className="cell-name">{r.name}</span>
            <span className="cell-email">{r.email}</span>
            <span>
              <span className="badge badge-primary">{r.role}</span>
            </span>
            <span>
              <span
                className={`badge ${
                  r.status === "Active"
                    ? "badge-success"
                    : r.status === "Suspended"
                      ? "badge-danger"
                      : "badge-default"
                }`}
              >
                {r.status}
              </span>
            </span>
            <span className="cell-spent">{r.spent}</span>
          </div>
        ))}
      </div>
    </section>
  );
}

function ImagesGrid() {
  const { isLoading } = useLoading();
  const [activeImage, setActiveImage] = useState<string | null>(null);

  if (isLoading) {
    return (
      <section className="images-section">
        <h2 className="section-title">Image Gallery</h2>
        <div className="images-grid">
          {IMAGES.map((img) => (
            <div key={img.seed} data-skullmaster={img.name}>
              <Skeleton name={img.name} />
            </div>
          ))}
        </div>
      </section>
    );
  }

  return (
    <section className="images-section">
      <h2 className="section-title">Image Gallery</h2>
      <div className="images-grid">
        {IMAGES.map((img) => (
          <div
            key={img.seed}
            className={`card image-card-grid ${activeImage === img.seed ? "image-card--active" : ""}`}
            data-skullmaster={img.name}
            data-seed={img.seed}
            onClick={() => setActiveImage(activeImage === img.seed ? null : img.seed)}
            role="button"
            tabIndex={0}
            onKeyDown={(e) => {
              if (e.key === "Enter" || e.key === " ") {
                e.preventDefault();
                setActiveImage(activeImage === img.seed ? null : img.seed);
              }
            }}
          >
            <img
              className="image-card-grid-img"
              src={`https://picsum.photos/seed/${img.seed}/${img.w}/${img.h}`}
              alt={img.title}
              loading="lazy"
            />
            <div className="image-card-grid-body">
              <h3 className="image-card-grid-title">{img.title}</h3>
              <p className="image-card-grid-desc">{img.desc}</p>
            </div>
            <div className="image-card-grid-footer">
              <span>{img.footer}</span>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

function InteractiveElements() {
  const { isLoading } = useLoading();
  const [rangeVal, setRangeVal] = useState(50);
  const [detailsOpen, setDetailsOpen] = useState(false);

  if (isLoading) {
    const cardNames = [
      "Buttons",
      "AnchorLinks",
      "TextInputs",
      "ChoiceInputs",
      "RangeInput",
      "FileColor",
      "SelectMenu",
      "Textarea",
      "DetailsSummary",
      "Dialog",
      "ProgressMeter",
      "FieldsetForm",
    ];

    return (
      <section className="interactive-section" data-skullmaster="InteractiveElements">
        <h2 className="section-title">Interactive Elements</h2>
        <div className="interactive-grid">
          {cardNames.map((name) => (
            <Skeleton name={name} key={name} />
          ))}
        </div>
      </section>
    );
  }

  return (
    <section className="interactive-section" data-skullmaster="InteractiveElements">
      <h2 className="section-title">Interactive Elements</h2>
      <div className="interactive-grid">
        <div className="card interactive-card" data-skullmaster="Buttons">
          <h3>Buttons</h3>
          <div className="interactive-demo">
            <button className="btn btn-primary">Button</button>
            <button className="btn btn-secondary" disabled>
              Disabled
            </button>
            <button className="btn btn-outline">Outline</button>
          </div>
        </div>

        <div className="card interactive-card" data-skullmaster="AnchorLinks">
          <h3>Anchor Links</h3>
          <div className="interactive-demo">
            <a href="#" className="btn btn-ghost">
              Regular Link
            </a>
            <a href="#" className="btn btn-primary">
              Button Link
            </a>
            <a href="#" className="interactive-link">
              Text Link
            </a>
          </div>
        </div>

        <div className="card interactive-card" data-skullmaster="TextInputs">
          <h3>Text Inputs</h3>
          <div className="interactive-demo interactive-stack">
            <label className="interactive-label">
              Text
              <input type="text" placeholder="Enter text..." className="interactive-input" />
            </label>
            <label className="interactive-label">
              Search
              <input type="search" placeholder="Search..." className="interactive-input" />
            </label>
            <label className="interactive-label">
              URL
              <input type="url" placeholder="https://" className="interactive-input" />
            </label>
            <label className="interactive-label">
              Tel
              <input type="tel" placeholder="+1 555..." className="interactive-input" />
            </label>
            <label className="interactive-label">
              Email
              <input type="email" placeholder="user@example.com" className="interactive-input" />
            </label>
            <label className="interactive-label">
              Number
              <input type="number" placeholder="42" className="interactive-input" />
            </label>
            <label className="interactive-label">
              Password
              <input type="password" placeholder="••••••••" className="interactive-input" />
            </label>
          </div>
        </div>

        <div className="card interactive-card" data-skullmaster="ChoiceInputs">
          <h3>Choice Inputs</h3>
          <div className="interactive-demo interactive-stack">
            <label className="interactive-check-label">
              <input type="checkbox" defaultChecked /> Checkbox
            </label>
            <label className="interactive-check-label">
              <input type="checkbox" /> Unchecked
            </label>
            <label className="interactive-check-label">
              <input type="checkbox" disabled /> Disabled
            </label>
            <label className="interactive-check-label">
              <input type="radio" name="radio-group" defaultChecked /> Radio One
            </label>
            <label className="interactive-check-label">
              <input type="radio" name="radio-group" /> Radio Two
            </label>
          </div>
        </div>

        <div className="card interactive-card" data-skullmaster="RangeInput">
          <h3>Range</h3>
          <div className="interactive-demo interactive-stack">
            <input
              type="range"
              min={0}
              max={100}
              value={rangeVal}
              onChange={(e) => setRangeVal(Number(e.target.value))}
              className="interactive-range"
            />
            <output className="interactive-output">Value: {rangeVal}</output>
          </div>
        </div>

        <div className="card interactive-card" data-skullmaster="FileColor">
          <h3>File &amp; Color</h3>
          <div className="interactive-demo interactive-stack">
            <label className="interactive-label">
              File
              <input type="file" className="interactive-file" />
            </label>
            <label className="interactive-label">
              Color
              <input type="color" defaultValue="#ff0055" className="interactive-color" />
            </label>
            <label className="interactive-label">
              Date
              <input type="date" className="interactive-input" />
            </label>
          </div>
        </div>

        <div className="card interactive-card" data-skullmaster="SelectMenu">
          <h3>Select &amp; Datalist</h3>
          <div className="interactive-demo interactive-stack">
            <label className="interactive-label">
              Select
              <select className="interactive-select">
                <optgroup label="Group A">
                  <option>Option One</option>
                  <option>Option Two</option>
                </optgroup>
                <optgroup label="Group B">
                  <option>Option Three</option>
                  <option>Option Four</option>
                </optgroup>
              </select>
            </label>
            <label className="interactive-label">
              Datalist
              <input
                list="browsers"
                placeholder="Type a browser..."
                className="interactive-input"
              />
              <datalist id="browsers">
                <option value="Chrome" />
                <option value="Firefox" />
                <option value="Safari" />
                <option value="Edge" />
              </datalist>
            </label>
          </div>
        </div>

        <div className="card interactive-card" data-skullmaster="Textarea">
          <h3>Textarea</h3>
          <div className="interactive-demo interactive-stack">
            <textarea
              className="interactive-textarea"
              rows={4}
              placeholder="Enter multiline text..."
              defaultValue="Line one&#10;Line two&#10;Line three"
            />
          </div>
        </div>

        <div className="card interactive-card" data-skullmaster="DetailsSummary">
          <h3>Details / Summary</h3>
          <details
            className="interactive-details"
            open={detailsOpen}
            onToggle={(e) => setDetailsOpen((e.target as HTMLDetailsElement).open)}
          >
            <summary className="interactive-summary">
              Click to {detailsOpen ? "collapse" : "expand"}
            </summary>
            <div className="interactive-details-body">
              <p>This content is toggled via the native &lt;details&gt; element.</p>
              <p>No JavaScript required for the basic toggle behavior.</p>
            </div>
          </details>
        </div>

        <div className="card interactive-card" data-skullmaster="Dialog">
          <h3>Dialog</h3>
          <div className="interactive-demo">
            <button
              className="btn btn-primary"
              onClick={() => document.getElementById("demo-dialog")?.showModal()}
            >
              Open Dialog
            </button>
          </div>
          <dialog id="demo-dialog" className="interactive-dialog">
            <div className="interactive-dialog-content">
              <h3>Modal Dialog</h3>
              <p>
                This is a native &lt;dialog&gt; element opened with <code>showModal()</code>.
              </p>
              <form method="dialog">
                <button className="btn btn-primary">Close</button>
              </form>
            </div>
          </dialog>
        </div>

        <div className="card interactive-card" data-skullmaster="ProgressMeter">
          <h3>Progress &amp; Meter</h3>
          <div className="interactive-demo interactive-stack">
            <label className="interactive-label">
              Progress (75%)
              <progress className="interactive-progress" value={75} max={100} />
            </label>
            <label className="interactive-label">
              Meter (42%)
              <meter
                className="interactive-meter"
                value={0.42}
                min={0}
                max={1}
                low={0.25}
                high={0.75}
                optimum={0.5}
              />
            </label>
          </div>
        </div>

        <div className="card interactive-card" data-skullmaster="FieldsetForm">
          <h3>Fieldset &amp; Form</h3>
          <form
            className="interactive-form"
            onSubmit={(e) => {
              e.preventDefault();
              const data = new FormData(e.currentTarget);
              alert(
                `Submitted: ${data.get("username")}, ${data.get("agree") ? "Agreed" : "Not agreed"}`,
              );
            }}
          >
            <fieldset data-skip-skull className="interactive-fieldset">
              <legend>Login Form</legend>
              <label className="interactive-label">
                Username
                <input type="text" name="username" className="interactive-input" required />
              </label>
              <label className="interactive-check-label">
                <input type="checkbox" name="agree" /> Agree to terms
              </label>
              <menu className="interactive-menu">
                <button className="btn btn-primary" type="submit">
                  Submit
                </button>
                <button className="btn btn-outline" type="reset">
                  Reset
                </button>
              </menu>
            </fieldset>
          </form>
        </div>
      </div>
    </section>
  );
}

function App() {
  const [activeTab, setActiveTab] = useState<Tab>("components");

  return (
    <main>
      <SkullMaster />
      <LoadingToggle />
      <DarkModeToggle />
      <nav className="tab-bar">
        <button
          className={`tab-btn ${activeTab === "components" ? "tab-btn--active" : ""}`}
          onClick={() => setActiveTab("components")}
        >
          Components
        </button>
        <button
          className={`tab-btn ${activeTab === "images" ? "tab-btn--active" : ""}`}
          onClick={() => setActiveTab("images")}
        >
          Images
        </button>
        <button
          className={`tab-btn ${activeTab === "interactive" ? "tab-btn--active" : ""}`}
          onClick={() => setActiveTab("interactive")}
        >
          Interactive
        </button>
      </nav>
      {activeTab === "components" && (
        <>
          <Hero />
          <UserProfileCard />
          <UIComponents />
          <Dashboard />
        </>
      )}
      {activeTab === "images" && <ImagesGrid />}
      {activeTab === "interactive" && <InteractiveElements />}
      <footer className="footer">
        <p>Built with React + TypeScript &bull; Neo Brutalism Edition</p>
      </footer>
    </main>
  );
}

export default App;
