import { Message } from "@/models/message";
import { on } from "events";

const DB_NAME = "loveDumpDB";
const DB_VERSION = 1;
const DB_STORE_NAME = "messages";

export function addMessage(text: string, onSuccess?: () => void, onError?: (e: Event) => void) {
    if (!onSuccess) {
        onSuccess = () => {};
    }
    if (!onError) {
        onError = (e: Event) => {
            console.error(e);
        };
    }

    const request = indexedDB.open(DB_NAME, DB_VERSION);

    request.onupgradeneeded = dbInit;

    request.onsuccess = (e) => {
        const db = request.result;
        const transaction = db.transaction(DB_STORE_NAME, "readwrite");
        const store = transaction.objectStore(DB_STORE_NAME);

        const data: Message = {
            text: text,
            createdAt: new Date(),
        };

        const putRequest = store.put(data);

        putRequest.onsuccess = () => {
            onSuccess();
        };

        putRequest.onerror = (e) => {
            onError(e);
        };
        db.close();
    };

    request.onerror = (e) => {
        onError(e);
    };
}

function dbInit(e: IDBVersionChangeEvent) {
    const db = (e.target as IDBOpenDBRequest).result;

    db.createObjectStore(DB_STORE_NAME, { keyPath: "id", autoIncrement: true });
}
