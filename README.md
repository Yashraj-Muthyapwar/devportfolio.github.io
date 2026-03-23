# DevPortfolio

A static developer portfolio built with vanilla HTML, CSS, and JavaScript. No build
step, no frameworks — just files that work in any browser. Deploys to GitHub Pages
automatically via GitHub Actions.

**Live demo:** https://Yashraj-Muthyapwar.github.io/devportfolio

---

## What's in here

```
devportfolio/
├── index.html          Homepage with hero and featured projects
├── about.html          Bio, work history, skills
├── projects.html       Full project list with tech filter
├── contact.html        Contact form (Formspree backend)
├── css/
│   ├── style.css       All styles — light + dark mode via CSS variables
│   └── dark.css        Edge-case dark mode overrides
├── js/
│   ├── data.js         Your projects, skills, and social links (edit this!)
│   └── app.js          Nav, theme toggle, card rendering, form handling
└── .github/workflows/
    └── ci.yml          GitHub Actions — validates HTML and deploys to Pages
```

## Forking and making it your own

This project is used as the hands-on example in **The Git & GitHub Handbook**
by Yashraj. Fork it to practice real Git workflows — branching, rebasing,
resolving conflicts, and opening pull requests.

### Quick start

```bash
# 1. Fork on GitHub, then clone your fork
git clone git@github.com:YOUR-USERNAME/devportfolio.git
cd devportfolio

# 2. Make it yours — edit your info
#    js/data.js       replace projects and skills
#    about.html       update the bio
#    index.html       change the name in the hero section

# 3. Commit and push
git add .
git commit -m "feat: personalise portfolio with my own details"
git push origin main

# 4. Enable GitHub Pages
#    Repository → Settings → Pages → Source: GitHub Actions
```

### Personalisation checklist

- [ ] Update `js/data.js` with your actual projects
- [ ] Update the bio in `about.html`
- [ ] Change the name and hero text in `index.html`
- [ ] Set up Formspree for the contact form (see `contact.html` comments)
- [ ] Update social links in `js/data.js`
- [ ] Replace `alice` references with your GitHub username

## Contributing

Found a bug or have an improvement? Open an issue or send a pull request.
The project is intentionally kept simple — the focus is on learning Git,
not on the site itself.

See the handbook for the full Git workflow walkthrough.

## License

MIT — do whatever you want with it.
