<!-- This file is autogenerated. If you want to change this content, please do the changes in `./docs/README.md` instead. -->

<div align="center">
    <br />
    <a href="https://github.com/dcastil/tailwind-merge">
        <img src="https://github.com/dcastil/tailwind-merge/raw/v3.3.1/assets/logo.svg" alt="tailwind-merge" height="150px" />
    </a>
</div>

# tailwind-merge

Utility function to efficiently merge [Tailwind CSS](https://tailwindcss.com) classes in JS without style conflicts.

```ts
import { twMerge } from 'tailwind-merge'

twMerge('px-2 py-1 bg-red hover:bg-dark-red', 'p-3 bg-[#B91C1C]')
// → 'hover:bg-dark-red p-3 bg-[#B91C1C]'
```

- Supports Tailwind v4.0 up to v4.1 (if you use Tailwind v3, use [tailwind-merge v2.6.0](https://github.com/dcastil/tailwind-merge/tree/v2.6.0))
- Works in all modern browsers and maintained Node versions
- Fully typed
- [Check bundle size on Bundlephobia](https://bundlephobia.com/package/tailwind-merge)

## Get started

- [What is it for](https://github.com/dcastil/tailwind-merge/tree/v3.3.1/docs/what-is-it-for.md)
- [When and how to use it](https://github.com/dcastil/tailwind-merge/tree/v3.3.1/docs/when-and-how-to-use-it.md)
- [Features](https://github.com/dcastil/tailwind-merge/tree/v3.3.1/docs/features.md)
- [Limitations](https://github.com/dcastil/tailwind-merge/tree/v3.3.1/docs/limitations.md)
- [Configuration](https://github.com/dcastil/tailwind-merge/tree/v3.3.1/docs/configuration.md)
- [Recipes](https://github.com/dcastil/tailwind-merge/tree/v3.3.1/docs/recipes.md)
- [API reference](https://github.com/dcastil/tailwind-merge/tree/v3.3.1/docs/api-reference.md)
- [Writing plugins](https://github.com/dcastil/tailwind-merge/tree/v3.3.1/docs/writing-plugins.md)
- [Versioning](https://github.com/dcastil/tailwind-merge/tree/v3.3.1/docs/versioning.md)
- [Contributing](https://github.com/dcastil/tailwind-merge/tree/v3.3.1/docs/contributing.md)
- [Similar packages](https://github.com/dcastil/tailwind-merge/tree/v3.3.1/docs/similar-packages.md)
