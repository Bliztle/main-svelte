# main-svelte

This is just a small project I created on a vacation to learn Svelte. Currently it contains a map which will eventually allow you to mark down notifiers at various locations and then get notified when you are near them.

I have aimed to use as few libraries as possible and instead write everything from scratch, as a way of getting more experience with Svelte, and also to properly learn Tailwind CSS. There are however still a few libraries in use.

| Library             | Purpose                                                                                                                                                    |
| ------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Openlayers          | Creating the map                                                                                                                                           |
| Tailwind            | Styling                                                                                                                                                    |
| @table/icons-svelte | Icon library as there is no learning process in finding and pasting icons instead<br><br>`warning`: This currently breaks SSR. A manual fix is noted below |

## Development

### Known issues

The node module `@tabler/icons-svelte` currently contains an issue which breaks SSR on pages loading icons due to a wrong path in `package.json`. I have posted a temporary fix for this issue [here](https://github.com/tabler/tabler-icons/issues/693#issuecomment-1646684979). Hopefully it will be resolved soon.
