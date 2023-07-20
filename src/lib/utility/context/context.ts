import { getContext, setContext } from "svelte";

const get = <T>(key: string | symbol) => getContext<T>(key);

const set = <T>(key: string | symbol, context: T) => {
    setContext(key, context);
    return context;
};

/** 
 * Typesafe way of defining contexts, which also omits the need for keys.
 * 
 * Export the getter and setter functions to use the context.
 *  
 * @example
 * const [get, set] = defineExampleContext<Example>();
 * export getExampleContext = get; // getContext<Example>(key)
 * export setExampleContext = set; // setContext<Example>(key)
 */
const defineContext = <T>(key: string | symbol = Symbol()) => {
    return [
        () => get<T>(key),
        (context: T) => set<T>(key, context)
    ] as const;
};

export default defineContext;