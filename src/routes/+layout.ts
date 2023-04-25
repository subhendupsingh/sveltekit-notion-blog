import { PUBLIC_NOTION_TOKEN, PUBLIC_NOTION_DATABASE_ID } from "$env/static/public";
import { initNotion } from "$lib";

export const prerender = true;

initNotion({
	databaseId: PUBLIC_NOTION_DATABASE_ID,
	notionToken: PUBLIC_NOTION_TOKEN,
});