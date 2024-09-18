
import {
  KBarProvider,
} from "kbar";
import type { Action } from 'kbar';
import { Toaster } from "@/components/ui/toaster"

import "./App.css";
import CommandBar from "./components/CommandBar";

function App() {
  const initialActions: Action[] = []
  return (
    <>
      <KBarProvider actions={initialActions} options={{
        toggleShortcut: "$mod+Shift+L"
      }}>
        <CommandBar />
      </KBarProvider>
      <Toaster />
    </>
  );
}

export default App;