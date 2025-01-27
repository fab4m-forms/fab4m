"use strict";(self.webpackChunkdocs=self.webpackChunkdocs||[]).push([[3163],{44688:(e,t,i)=>{i.r(t),i.d(t,{assets:()=>o,contentTitle:()=>l,default:()=>c,frontMatter:()=>r,metadata:()=>n,toc:()=>d});var n=i(75340),a=i(74848),s=i(28453);const r={title:"Tailwind theme for fab4m",description:"I finally got around to creating an official tailwind theme for fab4m! Give it a spin!"},l="Tailwind theme for fab4m",o={authorsImageUrls:[]},d=[{value:"Install the latest version of fab4m",id:"install-the-latest-version-of-fab4m",level:2},{value:"Configure tailwind",id:"configure-tailwind",level:2},{value:"Use the default tailwind theme",id:"use-the-default-tailwind-theme",level:2},{value:"Customizing",id:"customizing",level:2}];function h(e){const t={a:"a",code:"code",h2:"h2",p:"p",pre:"pre",strong:"strong",...(0,s.R)(),...e.components};return(0,a.jsxs)(a.Fragment,{children:[(0,a.jsxs)(t.p,{children:[(0,a.jsx)(t.a,{href:"https://tailwindcss.com/",children:"Tailwind"})," seems to be everywhere nowadays. Now you use it\neasily together with fab4m using the tailwind theme."]}),"\n",(0,a.jsx)(t.h2,{id:"install-the-latest-version-of-fab4m",children:"Install the latest version of fab4m"}),"\n",(0,a.jsxs)(t.p,{children:["The tailwind theme is included in ",(0,a.jsx)(t.code,{children:"@fab4m/fab4m"})," ",(0,a.jsx)(t.strong,{children:"1.0.0-beta11"}),". make sure you install the latest version by updating your dependencies."]}),"\n",(0,a.jsx)(t.h2,{id:"configure-tailwind",children:"Configure tailwind"}),"\n",(0,a.jsxs)(t.p,{children:["Check the ",(0,a.jsx)(t.a,{href:"/docs/guide/theming#using-the-tailwind-theme",children:"documentation"})," on how to configure tailwind to find the classes from fab4m. The gist of it is that you need to add this to your ",(0,a.jsx)(t.code,{children:"tailwind.config.ts"}),":"]}),"\n",(0,a.jsx)(t.pre,{children:(0,a.jsx)(t.code,{className:"language-js",children:"module.exports = {\n  content: [\n    // Your entries...\n    './node_modules/@fab4m/fab4m/dist/index.es.js',\n  // ...\n};\n"})}),"\n",(0,a.jsx)(t.h2,{id:"use-the-default-tailwind-theme",children:"Use the default tailwind theme"}),"\n",(0,a.jsx)(t.p,{children:"If you just want to give the new theme a spin you can do it by setting it up as your\ndefault theme:"}),"\n",(0,a.jsx)(t.pre,{children:(0,a.jsx)(t.code,{className:"language-jsx",children:'import { setDefaultTheme, tailwind } from "@fab4m/fab4m";\nsetDefaultTheme(tailwind);\n'})}),"\n",(0,a.jsx)(t.h2,{id:"customizing",children:"Customizing"}),"\n",(0,a.jsxs)(t.p,{children:["You probably want to customize things to fit your design. I tried to make this\neasy by adding a ",(0,a.jsx)(t.code,{children:"createTailwindTheme"})," function:"]}),"\n",(0,a.jsx)(t.pre,{children:(0,a.jsx)(t.code,{className:"language-jsx",children:'import { createTailwindTheme } from "@fab4m/core";\nconst yourTheme = createTailwindTheme({\n  settings: {\n    primaryBg: "bg-green-700 hover:bg-green-900",\n    secondaryBg:\n      "bg-slate-500 hover:bg-slate-900 dark:bg-slate-800 dark:hover:bg-slate-500",\n    inputBorder: "border border-slate-300 dark:border-slate-500",\n    inputBg: "bg-white dark:bg-slate-700",\n    inputText: "text-white dark:text-slate-100",\n    inputHeight: "h-10",\n  }\n});\nsetDefaultTheme(yourTheme);\n'})}),"\n",(0,a.jsx)(t.p,{children:"Of course, you can customize everything after the theme has been created too:"}),"\n",(0,a.jsx)(t.pre,{children:(0,a.jsx)(t.code,{className:"language-jsx",children:'yourTheme.classes.label = "text-slate-800";\n'})}),"\n",(0,a.jsx)(t.p,{children:"And that's it. Please file an issue if you're having difficulties or suggestions for\nimprovements!"})]})}function c(e={}){const{wrapper:t}={...(0,s.R)(),...e.components};return t?(0,a.jsx)(t,{...e,children:(0,a.jsx)(h,{...e})}):h(e)}},75340:e=>{e.exports=JSON.parse('{"permalink":"/blog/2023/04/28/tailwind-theme","source":"@site/blog/2023-04-28-tailwind-theme.md","title":"Tailwind theme for fab4m","description":"I finally got around to creating an official tailwind theme for fab4m! Give it a spin!","date":"2023-04-28T00:00:00.000Z","tags":[],"readingTime":1.11,"hasTruncateMarker":true,"authors":[],"frontMatter":{"title":"Tailwind theme for fab4m","description":"I finally got around to creating an official tailwind theme for fab4m! Give it a spin!"},"unlisted":false,"prevItem":{"title":"Introducing the variants API!","permalink":"/blog/2023/06/17/variants-api"},"nextItem":{"title":"Remix and fab4m","permalink":"/blog/2023/01/28/remix-with-fab4m"}}')}}]);