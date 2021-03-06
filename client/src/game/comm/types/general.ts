import { ServerShape } from "@/game/comm/types/shapes";

import { ServerLocationOptions } from "./settings";

export interface ServerLocation {
    id: number;
    name: string;
    options: Partial<ServerLocationOptions>;
}

export interface InitiativeData {
    uuid: string;
    initiative?: number;
    visible: boolean;
    group: boolean;
    source: string;
    has_img: boolean;
    effects: InitiativeEffect[];
    index: number;
}

export interface InitiativeEffect {
    uuid: string;
    name: string;
    turns: number;
}

export interface ServerFloor {
    index: number;
    name: string;
    layers: ServerLayer[];
    player_visible: boolean;
}

export interface ServerLayer {
    type_: string;
    index: number;
    name: string;
    layer: string;
    shapes: ServerShape[];
    selectable: boolean;
    player_editable: boolean;
    player_visible: boolean;
    size?: number;
}

export interface BoardInfo {
    locations: { id: number; name: string }[];
    floors: ServerFloor[];
    options: ServerLocationOptions;
}

export interface Note {
    title: string;
    text: string;
    uuid: string;
}
