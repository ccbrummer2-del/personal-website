# Casey Brummer personal website

This is a static website prepared for GitHub Pages. Its source is in the public GitHub repository `ccbrummer2-del/personal-website`, but GitHub Pages is not enabled.

For step-by-step instructions, see `OWNER-GUIDE.md`.

## Preview

Open `index.html` in a browser, or run any local static file server from this folder. The site has Home, About, Research, Teaching, CV, Tags, and individual post/tag views.

## Update your content

Edit `site-data.js`. The comments show the structure for your name, tagline, email, profile photo, social links, About text, research, teaching, and posts. The sample post is marked as sample content; replace or remove it before sharing. Tags and recent posts update automatically from your posts.

To add a photo, place it in `assets/` and set `photo` to its relative path, such as `assets/profile.jpg`.

To add your real CV, put the file in `assets/`, set `cvFile` to its relative path, and change `cvLabel`. Remove `assets/casey-brummer-cv-draft.txt` after replacing it. The current download is a clearly labeled draft template, not your completed CV.

## Publish later with GitHub Pages

1. Create a GitHub repository and upload the **contents** of this folder to its root.
2. In the repository, open **Settings → Pages** and select **Deploy from a branch**, then `main` and `/ (root)`.
3. Save and wait for the Pages link. All links in this site are relative, so it works at either a user site or a project site URL.

Do not publish until you are ready for the information in `site-data.js` to be public.
