import { PUBLIC_NOTION_TOKEN, PUBLIC_NOTION_DATABASE_ID } from "$env/static/public";
import { getAllBlogSlugs, initNotionBlog } from "$lib";

export const prerender = true;

initNotionBlog({
	tokens: {
		databaseId: PUBLIC_NOTION_DATABASE_ID,
		notionToken: PUBLIC_NOTION_TOKEN,
	},
	settings: {
	},
	seo: {
		logo: "https://res.cloudinary.com/curead/image/upload/v1669054676/Shootmail/logos/shootm-logo-with-name-dark-mode_rziumz.png",
		siteName: "Shootmail",
		siteUrl: "https://shootmail.app",
		siteSlogan: "The best email marketing solution",
		twitterHandle: "@subhendupsingh",
		ogImage: "https://res.cloudinary.com/curead/image/upload/v1669054676/Shootmail/logos/shootm-logo-with-name-dark-mode_rziumz.png"
	}
});