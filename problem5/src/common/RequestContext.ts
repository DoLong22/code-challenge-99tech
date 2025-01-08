import { AsyncLocalStorage } from 'async_hooks';

export class RequestContext {
    private static storage = new AsyncLocalStorage<Map<string, any>>();

    /**
     * Run a callback within a specific context
     * @param context Context map
     * @param callback Function to run within the context
     */
    static run(context: Map<string, any>, callback: () => void) {
        this.storage.run(context, callback);
    }

    /**
     * Set a key-value pair in the context
     * @param key Context key
     * @param value Context value
     */
    static set(key: string, value: any) {
        const store = this.storage.getStore();
        if (store) {
            store.set(key, value);
        }
    }

    /**
     * Get a value from the context
     * @param key Context key
     */
    static get(key: string): any {
        const store = this.storage.getStore();
        return store?.get(key);
    }

    /**
     * Get the entire context map
     */
    static getAll(): Map<string, any> | undefined {
        return this.storage.getStore();
    }
}
