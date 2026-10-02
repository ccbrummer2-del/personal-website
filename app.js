(function () {
  const data = window.SITE_DATA;
  const page = document.body.dataset.page || "home";
  const params = new URLSearchParams(location.search);
  const $ = (selector) => document.querySelector(selector);
  const escape = (value) => String(value ?? "").replace(/[&<>"']/g, (char) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[char]));
  const safeUrl = (value) => /^(https?:\/\/|mailto:|assets\/|#)/i.test(value || "") ? value : "#";
  const formatDate = (date) => { const value = new Date(`${date}T12:00:00`); return Number.isNaN(value.valueOf()) ? escape(date) : value.toLocaleDateString("en-US", { year: "numeric", month: "short", day: "numeric" }); };
  const icon = (name) => {
    const paths = {
      home: '<path d="m12 3 9 8h-2v9h-5v-6h-4v6H5v-9H3z"/>',
      about: '<circle cx="12" cy="7" r="4"/><path d="M4 21c0-4 3-7 8-7s8 3 8 7z"/>',
      research: '<path d="M4 5h16v11H4zM2 19h20v2H2zM10 9l-2 2 2 2m4-4 2 2-2 2"/>',
      teaching: '<path d="m2 8 10-5 10 5-10 5zM6 11v5c4 3 8 3 12 0v-5M21 9v8"/>',
      cv: '<path d="M6 2h8l5 5v15H6zM14 2v5h5M9 12h7M9 16h7"/>',
      tags: '<path d="M3 3h10l9 9-9 9-10-10z"/><circle cx="8" cy="8" r="1.4" fill="#202022"/>',
      date: '<path d="M4 5h16v16H4zM4 9h16M8 2v5m8-5v5" fill="none" stroke="currentColor" stroke-width="2"/>',
      search: '<circle cx="10" cy="10" r="7" fill="none" stroke="currentColor" stroke-width="2"/><path d="m15 15 6 6" fill="none" stroke="currentColor" stroke-width="2"/>'
    };
    return `<svg viewBox="0 0 24 24" aria-hidden="true">${paths[name]}</svg>`;
  };
  const nav = [
    ["home", "Home", "index.html"], ["about", "About", "about.html"],
    ["research", "Research", "research.html"], ["teaching", "Teaching", "teaching.html"],
    ["cv", "CV", "cv.html"], ["tags", "Tags", "tags.html"]
  ];
  const avatar = data.photo || "assets/profile-placeholder.svg";
  const email = data.email ? `<a class="profile-email" href="mailto:${escape(data.email)}">${escape(data.email)}</a>` : "";
  const socials = data.links.length ? data.links.map((item) => `<a href="${escape(safeUrl(item.url))}" aria-label="${escape(item.label)}" title="${escape(item.label)}" target="_blank" rel="noopener noreferrer">${escape(item.label.slice(0, 2).toUpperCase())}</a>`).join("") : "";
  $("#sidebar").innerHTML = `<div class="profile"><img class="avatar" src="${escape(avatar)}" alt="${data.photo ? `Photo of ${escape(data.name)}` : "Profile photo placeholder"}"><h1>${escape(data.name)}</h1><p class="tagline">${escape(data.tagline)}</p>${email}</div><nav class="nav" aria-label="Main navigation">${nav.map(([id, label, href]) => `<a href="${href}" ${page === id ? 'class="active" aria-current="page"' : ""}>${icon(id)}<span>${label}</span></a>`).join("")}</nav><div class="social">${socials}</div>`;
  $("#mobile-name").textContent = data.name;
  $("#breadcrumb").innerHTML = page === "home" ? "Home" : `<a href="index.html">Home</a><span class="sep">›</span>${escape(({ post: "Post", tag: "Tag" })[page] || nav.find(([id]) => id === page)?.[1] || "")}`;
  const postLink = (post) => `post.html?slug=${encodeURIComponent(post.slug)}`;
  const allTags = [...new Set(data.posts.flatMap((post) => post.tags || []))].sort();
  const tagLink = (tag) => `tag.html?name=${encodeURIComponent(tag)}`;
  const postDate = (post) => `<span class="post-date">${icon("date")}${formatDate(post.date)}</span>`;
  const postCard = (post) => `<a class="post-card" href="${postLink(post)}">${post.slug === "sample-post" ? '<span class="placeholder-badge">Sample content</span>' : ""}<h2>${escape(post.title)}</h2><p>${escape(post.excerpt)}</p>${postDate(post)}</a>`;
  const empty = (title, message) => `<div class="empty"><h2>${escape(title)}</h2><p>${escape(message)}</p></div>`;
  const itemList = (items) => items.map((item) => `<div class="item"><h3>${item.url ? `<a href="${escape(safeUrl(item.url))}" target="_blank" rel="noopener noreferrer">${escape(item.title)}</a>` : escape(item.title)}</h3>${item.description ? `<p>${escape(item.description)}</p>` : ""}</div>`).join("");
  let content = "";
  let title = "Home";
  if (page === "home") content = data.posts.length ? data.posts.map(postCard).join("") : empty("No posts yet", "Add posts in site-data.js to show your writing here.");
  if (page === "about") { title = "About Me"; content = `<h1>${title}</h1>${data.about.map((paragraph) => `<p>${escape(paragraph)}</p>`).join("")}`; }
  if (page === "research") { title = "Research"; content = `<h1>${title}</h1>${data.research.length ? itemList(data.research) : empty("Research to come", "Add projects, papers, or research interests in site-data.js when ready.")}`; }
  if (page === "teaching") { title = "Teaching"; content = `<h1>${title}</h1>${data.teaching.length ? itemList(data.teaching) : empty("Teaching to come", "Add courses or teaching experience in site-data.js when ready.")}`; }
  if (page === "cv") { title = "CV"; content = `<h1>${title}</h1><p>Your full CV can be added here when it’s ready.</p><p><a class="download" href="${escape(safeUrl(data.cvFile))}" download>${escape(data.cvLabel)}</a></p>`; }
  if (page === "tags") { title = "Tags"; content = `<h1>${title}</h1>${allTags.length ? `<div class="tags">${allTags.map((tag) => `<a class="tag" href="${tagLink(tag)}">${escape(tag)} <span>${data.posts.filter((post) => (post.tags || []).includes(tag)).length}</span></a>`).join("")}</div>` : empty("No tags yet", "Tags will appear when you add posts.")}`; }
  if (page === "tag") { const tag = params.get("name") || ""; title = `Tag: ${tag}`; const matches = data.posts.filter((post) => (post.tags || []).includes(tag)); content = `<h1>${escape(title)}</h1>${matches.length ? matches.map(postCard).join("") : empty("No matching posts", "Try another tag.")}`; }
  if (page === "post") { const post = data.posts.find((entry) => entry.slug === params.get("slug")); title = post?.title || "Post not found"; content = post ? `<article class="article"><h1>${escape(post.title)}</h1>${postDate(post)}${(post.body || []).map((paragraph) => `<p>${escape(paragraph)}</p>`).join("")}<div class="tags article-tags">${(post.tags || []).map((tag) => `<a class="tag" href="${tagLink(tag)}">${escape(tag)}</a>`).join("")}</div></article>` : `<h1>Post not found</h1>${empty("This post is unavailable", "Return to Home to browse available posts.")}`; }
  $("#content").innerHTML = content;
  document.title = `${title} | ${data.name}`;
  const recent = [...data.posts].sort((a, b) => b.date.localeCompare(a.date)).slice(0, 5);
  $("#recent").innerHTML = `<h2>Recently Updated</h2>${recent.length ? recent.map((post) => `<a href="${postLink(post)}">${escape(post.title)}</a>`).join("") : '<span class="widget-empty">Posts will appear here.</span>'}`;
  $("#trending").innerHTML = `<h2>Trending Tags</h2>${allTags.length ? `<div class="tags">${allTags.slice(0, 6).map((tag) => `<a class="tag small" href="${tagLink(tag)}">${escape(tag)}</a>`).join("")}</div>` : '<span class="widget-empty">Tags will appear here.</span>'}`;
  $("#footer-name").textContent = data.name;
  $("#footer-year").textContent = new Date().getFullYear();
  const menu = $("#menu-button");
  const sidebar = $("#sidebar");
  const backdrop = $("#backdrop");
  const toggleMenu = (open) => { sidebar.classList.toggle("open", open); backdrop.classList.toggle("open", open); menu.setAttribute("aria-expanded", String(open)); menu.setAttribute("aria-label", open ? "Close navigation" : "Open navigation"); if (open) sidebar.querySelector("a")?.focus(); else menu.focus(); };
  menu.addEventListener("click", () => toggleMenu(!sidebar.classList.contains("open")));
  backdrop.addEventListener("click", () => toggleMenu(false));
  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape" && sidebar.classList.contains("open")) toggleMenu(false);
    if (event.key === "Tab" && sidebar.classList.contains("open")) {
      const links = [...sidebar.querySelectorAll("a")];
      if (event.shiftKey && document.activeElement === links[0]) { event.preventDefault(); links.at(-1).focus(); }
      else if (!event.shiftKey && document.activeElement === links.at(-1)) { event.preventDefault(); links[0].focus(); }
    }
  });
  const search = $("#search");
  const results = $("#search-results");
  const searchItems = [
    ...nav.map(([id, label, href]) => ({ label, href, terms: label.toLowerCase() })),
    ...data.posts.map((post) => ({ label: post.title, href: postLink(post), terms: `${post.title} ${post.excerpt} ${(post.tags || []).join(" ")}`.toLowerCase() }))
  ];
  search.addEventListener("input", () => {
    const query = search.value.trim().toLowerCase();
    if (!query) { results.classList.remove("open"); results.innerHTML = ""; return; }
    const matches = searchItems.filter((item) => item.terms.includes(query)).slice(0, 8);
    results.innerHTML = matches.length ? matches.map((item) => `<a href="${item.href}">${escape(item.label)}</a>`).join("") : "<p>No results found.</p>";
    results.classList.add("open");
  });
  search.addEventListener("keydown", (event) => { if (event.key === "Enter") { const first = results.querySelector("a"); if (first) location.href = first.href; } if (event.key === "Escape") results.classList.remove("open"); });
  document.addEventListener("click", (event) => { if (!event.target.closest(".search-wrap")) results.classList.remove("open"); });
})();
