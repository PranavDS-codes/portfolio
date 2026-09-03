import { Client } from "langsmith";

// Shared client so route handlers can flush the same instance's pending
// trace batches (via awaitPendingTraceBatches) that rag.ts submitted to.
export const langsmithClient = new Client();
