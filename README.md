# Introduction

This is a plug and play library for [`Sveltekit`](https://kit.svelte.dev/) projects to create blogs quickly in your website's subdirectory using [`Notion`](https://www.notion.so/) as a CMS.

## Getting started

### Notion Setup
1. Duplicate this [`Notion template`] into your workspace.
2. Create an internal Notion connection from the settings [(Link)](https://www.notion.so/my-integrations), Notion's documentation on how to create an internal connection [(link)] (https://developers.notion.com/docs/create-a-notion-integration)
3. Connect the newly created connection with the blogs template duplicated in step 1 by clicking on the 3 dots on top-right. Then click on **Add Connections** and search for the connection you created in the step 3. Done!
4. New blogs will be added in the **Blogs** page of the template.

### Initialize the library in the root +layout.ts

```bash
    import { PUBLIC_NOTION_DATABASE_ID, PUBLIC_NOTION_TOKEN } from "$env/static/public";
    import { initNotion } from "sveltekit-notion-blog";

    export const prerender = true;

    initNotion({
        databaseId: PUBLIC_NOTION_DATABASE_ID, //from .env
        notionToken: PUBLIC_NOTION_TOKEN, //from .env
    });
```

### Code Setup

1. Install the package

```bash
    npm i sveltekit-notion-blog
```

2. In your existing project, create a subdirectory names **blog** and create ```+page.svelte``` and ```+page.server.ts``` files in this directory and call the _getAllPosts_ method in the ```+page.server.ts```

```bash
    import type { PageServerLoad } from './$types';
    import { getAllPosts } from "sveltekit-notion-blog";
    export const load: PageServerLoad = () => getAllPosts();
```

3. In the ```+page.svelte```, import the ```PostsList`` component

```bash
    <script lang="ts">
        import type { PageData } from './$types';
        import { PostsList } from "sveltekit-notion-blog";
        export let data: PageData;
    </script>

    <div class="max-w-4xl m-auto">
        <PostsList {data} />
    </div>
```

4. Create a new directory inside the blog directory named **[slug]** and create ```+page.svelte``` and ```+page.server.ts``` files in this directory.

5. In the ```+page.server.ts``` call the **getBlogPageBySlug** method

```bash
    import type { ServerLoadEvent } from '@sveltejs/kit';
    import { getBlogPageBySlug } from 'sveltekit-notion-blog';

    export const load = (event: ServerLoadEvent) => getBlogPageBySlug(event);
```

6. In the ```+page.svelte```

```bash
<script lang="ts">
    import { BlogPost } from 'sveltekit-notion-blog';
    import type { PageData } from './$types';
    
    export let data: PageData;
</script>

<BlogPost {data} />
```
