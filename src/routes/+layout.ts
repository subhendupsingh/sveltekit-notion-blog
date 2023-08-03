import { PUBLIC_NOTION_TOKEN, PUBLIC_NOTION_DATABASE_ID } from "$env/static/public";
import { initNotionBlog } from "$lib";

export const prerender = true;

initNotionBlog({
	tokens: {
		databaseId: PUBLIC_NOTION_DATABASE_ID,
		notionToken: PUBLIC_NOTION_TOKEN,
	},
	settings: {
		blogTitle: "Notion Blog",
		blogDescription: "A blog powered by Notion"
	}
});