import { ServerLocationOptions } from "../../comm/types/settings";
import { ServerAsset } from "../../comm/types/shapes";
import { wrapSocket } from "../helpers";
import { socket } from "../socket";

export const sendLocationOptions = wrapSocket<{ options: Partial<ServerLocationOptions>; location: number | null }>(
    "Location.Options.Set",
);
export const sendLocationOrder = wrapSocket<number[]>("Locations.Order.Set");
export const sendLocationChange = wrapSocket<{
    location: number;
    users: string[];
    position?: { x: number; y: number };
}>("Location.Change");
export const sendNewLocation = wrapSocket<string>("Location.New");
export const sendLocationRename = wrapSocket<{ location: number; name: string }>("Location.Rename");
export const sendLocationRemove = wrapSocket<number>("Location.Delete");

export async function requestSpawnInfo(location: number): Promise<ServerAsset[]> {
    socket.emit("Location.Spawn.Info.Get", location);
    return await new Promise((resolve: (value: ServerAsset[]) => void) => socket.once("Location.Spawn.Info", resolve));
}
