import { KBarAnimator, KBarPortal, KBarPositioner } from "kbar";
import Results from "./Results";
import Footer from "./Footer";
import useTabsActions from "./hooks/useTabsActions";
import Search from "./Search";


const animatorStyle = {
    maxWidth: "600px",
    width: "100%",
    borderRadius: "8px",
    overflow: "hidden",
    boxShadow: "var(--shadow)",
    zIndex: 5000,
};

export default function CommandBar() {
    useTabsActions();
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