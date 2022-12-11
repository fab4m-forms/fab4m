"use strict";(self.webpackChunkdocs=self.webpackChunkdocs||[]).push([[6068],{1176:(e,t,n)=>{n.r(t),n.d(t,{assets:()=>m,contentTitle:()=>i,default:()=>h,frontMatter:()=>a,metadata:()=>r,toc:()=>l});var o=n(7462),s=(n(7294),n(3905));const a={sidebar_position:3},i="Theming",r={unversionedId:"guide/theming",id:"guide/theming",title:"Theming",description:"Fab4m provides a basic look and feel called basic, which is used as the default",source:"@site/docs/guide/theming.mdx",sourceDirName:"guide",slug:"/guide/theming",permalink:"/docs/guide/theming",draft:!1,tags:[],version:"current",sidebarPosition:3,frontMatter:{sidebar_position:3},sidebar:"tutorialSidebar",previous:{title:"Rendering forms",permalink:"/docs/guide/rendering-the-form"},next:{title:"Form events",permalink:"/docs/guide/events"}},m={},l=[{value:"Provided themes",id:"provided-themes",level:2},{value:"Select your theme",id:"select-your-theme",level:2},{value:"Using the basic basic theme",id:"using-the-basic-basic-theme",level:2},{value:"Using the bulma theme",id:"using-the-bulma-theme",level:2},{value:"Creating your own theme",id:"creating-your-own-theme",level:2},{value:"Using your own theme",id:"using-your-own-theme",level:2}],u={toc:l};function h(e){let{components:t,...n}=e;return(0,s.kt)("wrapper",(0,o.Z)({},u,n,{components:t,mdxType:"MDXLayout"}),(0,s.kt)("h1",{id:"theming"},"Theming"),(0,s.kt)("p",null,"Fab4m provides a basic look and feel called basic, which is used as the default\nform theme. This works for basic use cases, but if you want to tightly integrate\nfab4m into your solution, you probably want to change the theme of your forms to fit your use case."),(0,s.kt)("h2",{id:"provided-themes"},"Provided themes"),(0,s.kt)("p",null,"Fab4m provides two themes out of the box. ",(0,s.kt)("inlineCode",{parentName:"p"},"basic")," and ",(0,s.kt)("inlineCode",{parentName:"p"},"bulma"),". The basic form is designed to blend in with other design, and the bulma theme uses classes from the ",(0,s.kt)("inlineCode",{parentName:"p"},"bulma")," css framework, which means the forms conform to the style used there."),(0,s.kt)("h2",{id:"select-your-theme"},"Select your theme"),(0,s.kt)("p",null,"You get to select your desired form theme for each form you create:"),(0,s.kt)("pre",null,(0,s.kt)("code",{parentName:"pre",className:"language-jsx"},"createForm(theme_name, name);\n")),(0,s.kt)("h2",{id:"using-the-basic-basic-theme"},"Using the basic basic theme"),(0,s.kt)("p",null,"In order for your forms to be styled, you need to include the basic css, for example byimporting it (if you're build pipeline supports that):"),(0,s.kt)("pre",null,(0,s.kt)("code",{parentName:"pre",className:"language-jsx"},'import "fab4m/css/basic/basic.css";\n')),(0,s.kt)("h2",{id:"using-the-bulma-theme"},"Using the bulma theme"),(0,s.kt)("p",null,"If you want to use the bulma theme, you need to include the bulma css. See the\n",(0,s.kt)("a",{parentName:"p",href:"https://bulma.io/"},"bulma documentation")," on how to include the CSS."),(0,s.kt)("h2",{id:"creating-your-own-theme"},"Creating your own theme"),(0,s.kt)("p",null,"If you have existing CSS you probably want to define your own theme.\nFab4m provides an object with the defined classes for all elements."),(0,s.kt)("pre",null,(0,s.kt)("code",{parentName:"pre",className:"language-jsx"},'import { defaultThemeClasses } from "@fab4m/fab4m"\nconst yourTheme = {\n  name: "your theme",\n  module: "yourmodule",\n  classes: {\n    ...defaultThemeClasses\n  }\n}\n')),(0,s.kt)("p",null,"This is all you need to define your theme. You can now override any default classes\nwith your own:"),(0,s.kt)("pre",null,(0,s.kt)("code",{parentName:"pre",className:"language-jsx"},'import { defaultThemeClasses } from "@fab4m/fab4m"\nconst yourTheme = {\n  name: "your theme",\n  module: "yourmodule",\n  classes: {\n    ...defaultThemeClasses,\n    componentWrapper: "my-component-class"\n    input: "my-input-class"\n  }\n}\n')),(0,s.kt)("h2",{id:"using-your-own-theme"},"Using your own theme"),(0,s.kt)("p",null,"Once your theme is defined, it can be used as any of the core themes:"),(0,s.kt)("pre",null,(0,s.kt)("code",{parentName:"pre",className:"language-jsx"},"const form = createForm(yourTheme, {});\n")))}h.isMDXComponent=!0}}]);