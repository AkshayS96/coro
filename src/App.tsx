
import {
  KBarProvider,
} from "kbar";
import { Toaster } from "@/components/ui/toaster"

import { getInitialActions } from "./components/actions";
import { useToast } from "@/hooks/use-toast"

import "./App.css";
import CommandBar from "./components/CommandBar";

function App() {
  // All Current tabs
  // All Bookmarks
  // History search
  // Commands -> Write with JS (maybe)
  // Tabs/Window related functionality

  const { toast } = useToast();

  const initialActions = [
    ...getInitialActions(toast),
  ]
  return (
    <>
      <KBarProvider actions={initialActions}>
        <CommandBar />
      </KBarProvider>
      <Toaster />
    </>
  );
}

export default App;