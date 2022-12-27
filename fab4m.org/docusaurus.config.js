// @ts-check
// Note: type annotations allow type checking and IDEs autocompletion

const lightCodeTheme = require("prism-react-renderer/themes/github");
const darkCodeTheme = require("prism-react-renderer/themes/dracula");

/** @type {import('@docusaurus/types').Config} */
const config = {
  title: "Fab4m",
  tagline: "Take the hard parts out of form building!",
  url: "https://fab4m.org",
  baseUrl: "/",
  onBrokenLinks: "throw",
  onBrokenMarkdownLinks: "warn",
  favicon: "img/favicon.ico",

  // GitHub pages deployment config.
  // If you aren't using GitHub pages, you don't need these.
  organizationName: "fab4m-forms", // Usually your GitHub org/user name.
  projectName: "fab4m", // Usually your repo name.
  trailingSlash: false,

  // Even if you don't use internalization, you can use this field to set useful
  // metadata like html lang. For example, if your site is Chinese, you may want
  // to replace "en" with "zh-Hans".
  i18n: {
    defaultLocale: "en",
    locales: ["en"],
  },

  presets: [
    [
      "classic",
      /** @type {import('@docusaurus/preset-classic').Options} */
      {
        docs: {
          sidebarPath: require.resolve("./sidebars.js"),
        },
        theme: {
          customCss: require.resolve("./src/css/custom.css"),
        },
      },
    ],
  ],

  themeConfig:
    /** @type {import('@docusaurus/preset-classic').ThemeConfig} */
    {
      navbar: {
        logo: {
          alt: "Fab4m",
          src: "img/logo.svg",
          srcDark: "img/logo_inverted.svg",
        },
        items: [
          {
            type: "doc",
            docId: "intro",
            position: "left",
            label: "Documentation",
          },
          {
            to: "blog",
            position: "left",
            label: "Blog",
          },
          {
            href: "https://github.com/fab4m-forms/fab4m",
            label: "GitHub",
            position: "right",
          },
        ],
      },
      footer: {
        style: "dark",
        links: [
          {
            title: "Docs",
            items: [
              {
                label: "Documentation",
                to: "/docs/intro",
              },
            ],
          },
          {
            title: "Community",
            items: [
              {
                label: "Stack Overflow",
                href: "https://stackoverflow.com/questions/tagged/fab4m",
              },
              {
                label: "Matrix chat",
                href: "https://matrix.to/#/#fab4m:matrix.org",
              },
              {
                label: "Twitter",
                href: "https://twitter.com/fabsor_",
              },
            ],
          },
          {
            title: "More",
            items: [
              {
                label: "Fab4m",
                to: "/blog",
              },
              {
                label: "GitHub",
                href: "https://github.com/fab4m-forms/fab4m",
              },
            ],
          },
        ],
        copyright: `Copyright © ${new Date().getFullYear()} Fabian Sörqvist.`,
      },
      prism: {
        theme: lightCodeTheme,
        darkTheme: darkCodeTheme,
        additionalLanguages: ["php"],
      },
    },
  themes: ["@docusaurus/theme-live-codeblock"],
  scripts: [
    {
      src: "https://plausible.io/js/script.js",
      defer: true,
      "data-domain": "fab4m.org",
    },
  ],
};

module.exports = config;
