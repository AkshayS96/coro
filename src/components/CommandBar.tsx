import { KBarAnimator, KBarPortal, KBarPositioner } from "kbar";
import Results from "./Results";
import Footer from "./Footer";
import { useTabActions, useBookmarkActions, useBrowserActions } from "./hooks/useActions";
import Search from "./Search";
import { useToast } from "@/hooks/use-toast"


const animatorStyle = {
    maxWidth: "600px",
    width: "100%",
    borderRadius: "8px",
    overflow: "hidden",
    boxShadow: "var(--shadow)",
    zIndex: 5000,
};

export default function CommandBar() {
    const { toast } = useToast();

    useBrowserActions(toast);
    useTabActions();
    useBookmarkActions();
    return (
        <KBarPortal>
            <KBarPositioner style={{
                zIndex: 5000,
            }}>
                <KBarAnimator style={animatorStyle} className="z-50 bg-white">
                    <div>
                        <Search />
                        <Results />
                        <Footer />
                    </div>
                </KBarAnimator>
            </KBarPositioner>
        </KBarPortal>
    );
}