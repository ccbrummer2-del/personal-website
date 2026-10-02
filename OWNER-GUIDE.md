# Your website guide

This guide is for Casey Brummer’s personal website. The source files are in a public GitHub repository, but the website itself has **not** been published with GitHub Pages.

## 1. Open and explore the site

Open `index.html` in the `personal-website` folder. Use the left menu to visit Home, About, Research, Teaching, CV, and Tags. On a phone-sized screen, tap the menu icon to open the same navigation.

- **Home** shows dated writing cards. Select a card to read its full post.
- **About** shows your biography.
- **Research** and **Teaching** show items you add later.
- **CV** has a download link. For now, it downloads a clearly labeled draft template.
- **Tags** groups posts by topic. Select a tag to see its posts.
- **Search** finds pages and posts by title, excerpt, or tag.

## 2. Edit your information

Open `site-data.js` in a text editor such as Notepad or VS Code. This is the main content file. Save your changes, then refresh the open website.

Keep quotation marks around text and commas between entries. Edit the text inside the quotes. For example:

```js
name: "Casey Brummer",
tagline: "Junior Accountancy Student at CSUN",
email: "casey@example.com",
```

Only add an email address if you want it visible to visitors. If you prefer no public email, leave `email: ""`.

### Profile photo

Copy your photo into the `assets` folder, then update the `photo` line:

```js
photo: "assets/casey-photo.jpg",
```

The filename and extension must match the actual file. The current illustration is a placeholder and will remain until you set `photo`.

### About page

Each quoted line in `about` becomes a paragraph. Add or remove lines as needed:

```js
about: [
  "I’m Casey Brummer, a junior accountancy student at CSUN.",
  "I’m interested in ..."
],
```

### Research and Teaching pages

Add entries inside `research` or `teaching`. The `url` is optional; leave it out if there is no link.

```js
research: [
  { title: "Project title", description: "A short description.", url: "https://example.com" }
],
teaching: [
  { title: "Course or tutoring role", description: "What you taught or supported." }
],
```

### Writing and posts

The Home page currently contains one card marked **Sample content**. Replace that entry with your writing, or delete it. Each post needs a unique `slug` using lowercase letters and hyphens. Use dates in `YYYY-MM-DD` format. Put each paragraph of the full article in `body`.

```js
posts: [
  {
    title: "What I learned in accounting",
    date: "2026-10-01",
    excerpt: "A short preview of the post.",
    body: [
      "The first paragraph of my post.",
      "The second paragraph of my post."
    ],
    tags: ["accounting", "student life"],
    slug: "what-i-learned-in-accounting"
  }
]
```

Add a comma between posts. The site creates the Tags page and Recently Updated list from your posts automatically. The search box also searches the new post.

### Social links

Add public links to the `links` list. They appear at the bottom of the left sidebar.

```js
links: [
  { label: "LinkedIn", url: "https://www.linkedin.com/in/your-profile" },
  { label: "GitHub", url: "https://github.com/your-username" }
],
```

### CV download

When your CV is ready, copy the PDF into `assets` and update these lines:

```js
cvFile: "assets/casey-brummer-cv.pdf",
cvLabel: "Download my CV (PDF)",
```

Check that the PDF opens from the CV page. You can then remove `assets/casey-brummer-cv-draft.txt`. Until you replace it, the site accurately describes the current download as a draft template.

## 3. Change the appearance

The design is in `style.css`. You can change its colors near the beginning of the file. The page layout and interactions are in `app.js`; you do not need to edit that file for normal content updates.

## 4. Publish with GitHub Pages when ready

1. On GitHub, open the `ccbrummer2-del/personal-website` repository’s **Settings → Pages**.
2. Under **Build and deployment**, choose **Deploy from a branch**. Select `main`, choose `/ (root)`, and save.
3. GitHub will show the website address in the Pages settings after publication. Open it and check the pages, photo, and CV download.

GitHub’s current instructions are here: [Configuring a publishing source for GitHub Pages](https://docs.github.com/en/pages/getting-started-with-github-pages/configuring-a-publishing-source-for-your-github-pages-site).

**Before publishing:** replace the sample post and CV draft if you do not want visitors to see them. GitHub Pages websites are publicly accessible, so only include information you want public.

## 5. Update the live site later

After publishing, changing files on your computer does **not** change the live site automatically. Upload the changed files to the same GitHub repository, or edit `site-data.js` directly on GitHub and commit the change. GitHub Pages then republishes from the selected branch. GitHub explains browser-based edits here: [Editing files in a repository](https://docs.github.com/en/repositories/working-with-files/managing-files/editing-files).

## Quick checklist

- Replace the profile illustration with your photo.
- Replace or remove the sample post.
- Add any Research and Teaching items you want visible.
- Add your public links and email, if desired.
- Replace the CV draft with your PDF.
- Refresh the local site and check every page before publishing.
