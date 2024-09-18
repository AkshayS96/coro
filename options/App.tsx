
import {
    Tabs,
    TabsContent,
    TabsList,
    TabsTrigger,
} from "@/components/ui/tabs"
import CustomCommands from "./components/CustomCommands";
import Help from "./components/Help";

export function App() {
    return (
        <Tabs defaultValue="Custom Commands" orientation="horizontal" className="w-screen h-screen">
            <div className="flex flex-col w-full h-full">
                <div className="flex flex-col w-full p-10">
                    <TabsList className="grid w-full grid-cols-2">
                        <TabsTrigger value="Custom Commands">Custom Commands</TabsTrigger>
                        <TabsTrigger value="Help">Help</TabsTrigger>
                    </TabsList>
                </div>
                <div className="flex flex-col h-full w-full">
                    <TabsContent value="Custom Commands">
                        <div className="flex flex-col w-full h-full">
                            <CustomCommands />
                        </div>
                    </TabsContent>
                    <TabsContent value="Help">
                        <div className="flex flex-col w-full h-full">
                            <Help />
                        </div>
                    </TabsContent>
                </div>
            </div>
        </Tabs>
    )
}

export default App;