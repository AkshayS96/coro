
import {
    KBarProvider,
    KBarPortal,
    KBarPositioner,
    KBarAnimator,
    KBarSearch,
  } from "kbar";


import "../public/assets/css/App.css";
import { getAllActions } from "./components/actions";
import Results from "./components/Results";
import Search from "./components/Search";
import Footer from "./components/Footer";

const animatorStyle = {
  maxWidth: "600px",
  width: "100%",
  background: "var(--background)",
  color: "var(--foreground)",
  borderRadius: "8px",
  overflow: "hidden",
  boxShadow: "var(--shadow)",
};

const mainDiv = {
  display: 'flex',
  flexDirection: 'column'
};

function App()  {
  // All Current tabs
  // All Bookmarks
  // History search
  // Commands -> Write with JS (maybe)
  // Tabs/Window related functionality

  const actions = [
    {
      id: "blog",
      name: "Blog",
      shortcut: ["b"],
      keywords: "writing words",
      perform: () => (window.location.pathname = "blog"),
    },
    {
      id: "contact",
      name: "Contact",
      shortcut: ["c"],
      keywords: "email",
      perform: () => (window.location.pathname = "contact"),
    },
    {
      id: "google",
      name: "Google",
      shortcut: ["g"],
      keywords: "Google Search",
      perform: () => (
        window.open("https://www.google.com", "_blank")
      ),
    },
    ...getAllActions(),
  ]
  return (
    <>
    <KBarProvider actions={actions}>
      <KBarPortal> 
        <KBarPositioner>
          <KBarAnimator style={animatorStyle}>
            <div style={mainDiv}>
              <Search/>
              <Results/>
              <Footer/>
            </div>
          </KBarAnimator>
        </KBarPositioner>
      </KBarPortal>
    </KBarProvider>
    </>
  );
}

export default App;