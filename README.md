# Introduction

This is a plug and play library for [`Sveltekit`](https://kit.svelte.dev/) projects to create blogs quickly in your website's subdirectory using [`Notion`](https://www.notion.so/) as a CMS.

![Screenshot of the b sveltekit notion blog demo](https://github.com/subhendupsingh/sveltekit-notion-blog/blob/main/static/sveltekit-notion-blog-preview-1.png)

## Getting started

### Notion Setup
1. Duplicate this [`Notion template`](https://www.notion.so/Sveltekit-Notion-Blog-b3c283e482cc4a75b11cd216c71f4158?pvs=4) into your workspace.
2. Create an internal Notion connection from the settings [`(Link)`](https://www.notion.so/my-integrations), Notion's documentation on how to create an internal connection [`(link)`] (https://developers.notion.com/docs/create-a-notion-integration)
3. Connect the newly created connection with the blogs template duplicated in step 1 by clicking on the 3 dots on top-right. Then click on **Add Connections** and search for the connection you created in the step 3. Done!
![Add connection to Notion page](https://github.com/subhendupsingh/sveltekit-notion-blog/blob/main/static/notion-add-connection.png)
4. New blogs will be added in the **Blogs** page of the template.

### Get database id of your blogs from Notion

1. Click on the **Copy link to view** option and copy the URL
![Screenshot of how to get database ID from notion](https://github.com/subhendupsingh/sveltekit-notion-blog/blob/main/static/notion-database-id.png)
2. In the link
```bash https://www.notion.so/[this-is-your-database-id]?v=8f9bdbecf08d4ec9bc35c990860c780d```

### Initialize the library in the root +layout.ts

```bash
    import { PUBLIC_NOTION_DATABASE_ID, PUBLIC_NOTION_TOKEN } from "$env/static/public";
    import { initNotionBlog } from "sveltekit-notion-blog";

    export const prerender = true;

    initNotionBlog({
        tokens: {
            databaseId: PUBLIC_NOTION_DATABASE_ID, //from .env
            notionToken: PUBLIC_NOTION_TOKEN, //from .env
        },
        settings: {
            blogTitle: "Notion Blog",
            blogDescription: "A blog powered by Notion"
        }
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
