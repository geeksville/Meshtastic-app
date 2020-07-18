import { Message } from './message';

export class Channel {
    id: number;
    name: string;
    default_key: Uint8Array;
    messages: Message[];
}