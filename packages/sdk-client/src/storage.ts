import type { MixcoreClient } from "./client";

export class MixcoreStorage {
    public client: MixcoreClient;

    constructor(client: MixcoreClient) {
        this.client = client;
    }
}   