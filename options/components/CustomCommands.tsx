import { Card, CardContent, CardHeader } from "@/components/ui/card";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover"
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import React, { useState } from "react";

export default function CustomCommands() {
    // Read custom commands and render that list with 
    const [newCommandName, setNewCommandName] = useState<string>('');
    const [newCommandUrl, setNewCommandUrl] = useState<string>('');
    const [commands, setCommands] = useState([]);
    const [forceUpdate, setForceUpdate] = useState<boolean>(false);

    const onCreateCommand = (name: string, url: string) => {
        chrome.runtime.sendMessage({
            type: 'options_new_command',
            name,
            url,
        }, () => {
            setForceUpdate((value) => !value);
        });
    };

    const onDeleteCommand = (name: string) => {
        chrome.runtime.sendMessage({
            type: 'options_delete_command',
            name,
        }, (_) => {
            setForceUpdate((value) => !value);
        });
    };

    // biome-ignore lint/correctness/useExhaustiveDependencies:
    React.useEffect(() => {
        chrome.runtime.sendMessage({
            type: 'options_get_commands',
            // biome-ignore lint/suspicious/noExplicitAny: 
        }, (commands: any) => {
            setCommands(commands);
        });
    }, [forceUpdate]);


    return <div className="flex flex-col w-full h-full p-10">
        <Card>
            <CardHeader className="items-end">
                <Popover>
                    <PopoverTrigger asChild>
                        <Button variant="outline">Create Command</Button>
                    </PopoverTrigger>
                    <PopoverContent align="start" side="left">
                        <div className="grid gap-4">
                            <div className="space-y-2">
                                <h4 className="font-medium leading-none">New Command</h4>
                                <p className="text-sm text-muted-foreground">
                                    Create a new custom command
                                </p>
                            </div>
                            <div className="grid gap-2">
                                <div className="grid grid-cols-3 items-center gap-4">
                                    <Label htmlFor="name">Name</Label>
                                    <Input
                                        id="name"
                                        defaultValue=""
                                        className="col-span-3 h-8"
                                        onChange={(e) => setNewCommandName(e.target.value)}
                                    />
                                </div>
                                <div className="grid grid-cols-3 items-center gap-4">
                                    <Label htmlFor="url">URL</Label>
                                    <Input
                                        id="url"
                                        defaultValue=""
                                        className="col-span-3 h-8"
                                        onChange={(e) => setNewCommandUrl(e.target.value)}
                                    />
                                </div>
                                <div className="grid grid-cols-3 items-center gap-4">
                                    <Button onClick={() => {
                                        onCreateCommand(newCommandName, newCommandUrl);
                                    }}>Create</Button>
                                </div>
                            </div>
                        </div>
                    </PopoverContent>
                </Popover>

            </CardHeader>
            <CardContent>
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead className="w-[100px]">Name</TableHead>
                            <TableHead className="w-[100px]">Url</TableHead>
                            <TableHead className="w-[100px]">Actions</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>

                        {
                            // biome-ignore lint/suspicious/noExplicitAny: 
                            (commands ?? []).map((command: any) => {
                                return <TableRow key={command.name}>
                                    <TableCell className="font-medium">{command.name}</TableCell>
                                    <TableCell>{command.url}</TableCell>
                                    <TableCell>
                                        <Button onClick={() => {
                                            onDeleteCommand(command.name);
                                        }}>Delete</Button>
                                    </TableCell>
                                </TableRow>
                            })
                        }
                    </TableBody>
                </Table>
            </CardContent>
        </Card>
    </div >
}