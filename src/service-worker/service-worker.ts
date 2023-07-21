/// <reference types="@sveltejs/kit" />
/// <reference no-default-lib="true"/>
/// <reference lib="esnext" />
/// <reference lib="webworker" />
import { build, files, version } from '$service-worker';

import { SWRequestHeaders } from './types';

declare const self: ServiceWorkerGlobalScope;

// Create a unique cache name for this deployment
const CACHE = `cache-${version}`;

const ASSETS = [
    ...build, // the app itself
    ...files  // everything in `static`
];

const shouldCache = (request: Request, response: Response): boolean => {

    // Cannot cache non-GET requests
    if (request.method !== 'GET') return false;

    // Told to ignore
    if (request.headers.get(SWRequestHeaders.CACHE_IGNORE)) return false;

    // Told to cache
    if (request.headers.get(SWRequestHeaders.CACHE_FORCE)) return true;

    // Default behaviour is to cache only if the response is OK
    return response.status === 200;
};

self.addEventListener('install', (event) => {
    // Create a new cache and add all files to it
    const addFilesToCache = async () => {
        const cache = await caches.open(CACHE);
        await cache.addAll(ASSETS);
    };

    event.waitUntil(addFilesToCache());
});

self.addEventListener('activate', (event) => {
    // Remove previous cached data from disk
    const deleteOldCaches = async () => {
        for (const key of await caches.keys()) {
            if (key !== CACHE) await caches.delete(key);
        }
    };

    event.waitUntil(deleteOldCaches());
});

self.addEventListener('fetch', (event) => {
    // ignore POST requests etc
    if (event.request.method !== 'GET') return;

    const respond = async () => {
        const url = new URL(event.request.url);
        const cache = await caches.open(CACHE);

        // `build`/`files` can always be served from the cache
        if (ASSETS.includes(url.pathname)) {

            // Make sure to handle errors where ASSETS weren't properly cached
            const response = await cache.match(url.pathname);
            if (response) return response;
        }

        // for everything else, try the network first, but
        // fall back to the cache if we're offline

        try {
            const response = await fetch(event.request);

            if (shouldCache(event.request, response)) {
                cache.put(event.request, response.clone());
            }

            return response;
        } catch {
            return await cache.match(event.request) ?? new Response();
        }
    };

    event.respondWith(respond());
});