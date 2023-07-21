
/** Special headers read by the service worker */
export enum SWRequestHeaders {
    /** Ignore request */
    CACHE_IGNORE = 'bliztle-sw-cache-ignore',

    /** Cache even if unsuccessfull */
    CACHE_FORCE = 'bliztle-sw-cache-force'
}