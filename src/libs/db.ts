const DB_NAME = "loveDumpDB";

export function addMessage(text: string) {
    
}

function dbInit() {
    const request = indexedDB.open(DB_NAME);
    request.onupgradeneeded = (e) => {
        const db = request.result;
        db.createObjectStore("messages", { keyPath: "id", autoIncrement: true });
    }
    request.onsuccess = (e) => {
        const db = request.result;
        db.close();
    }
    request.onerror = (e) => {
        console.error(e);
    }
}
