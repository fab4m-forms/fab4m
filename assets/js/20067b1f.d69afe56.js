"use strict";(self.webpackChunkdocs=self.webpackChunkdocs||[]).push([[312],{3932:(e,t,a)=>{a.r(t),a.d(t,{assets:()=>s,contentTitle:()=>l,default:()=>u,frontMatter:()=>r,metadata:()=>i,toc:()=>m});var o=a(7462),n=(a(7294),a(3905));const r={},l="Hello world!",i={permalink:"/blog/2022/12/11/hello-world",source:"@site/blog/2022-12-11-hello-world.md",title:"Hello world!",description:"It's been a long time coming, but I finally released the first beta of",date:"2022-12-11T00:00:00.000Z",formattedDate:"December 11, 2022",tags:[],readingTime:1.325,hasTruncateMarker:!0,authors:[],frontMatter:{},prevItem:{title:"Using fab4m with Laravel and Inertia.js",permalink:"/blog/2022/12/16/fab4m-and-laravel"}},s={authorsImageUrls:[]},m=[],d={toc:m};function u(e){let{components:t,...a}=e;return(0,n.kt)("wrapper",(0,o.Z)({},d,a,{components:t,mdxType:"MDXLayout"}),(0,n.kt)("p",null,"It's been a long time coming, but I finally released the first beta of\nfab4m, a better way to work with forms!"),(0,n.kt)("p",null,"When working with development I always find dealing with forms to be\nthe most time consuming and tedious part of any project. There are\nmany solutions out there, but they tend to tailor to only part of the\nproblem: validation, rendering, and so on."),(0,n.kt)("p",null,"I set out to finally solve the problem once and for all. It took way\nmore time than I anticipated, but here it is!"),(0,n.kt)("p",null,"What are the highlights then?"),(0,n.kt)("p",null,"Instead of working directly with markup, you structure your form using a javascript object:"),(0,n.kt)("pre",null,(0,n.kt)("code",{parentName:"pre",className:"language-jsx"},'import { createForm } from "@fab4m/fab4m";\nconst form = createForm({\n    title: textField({ label: "Title" }),\n});\n')),(0,n.kt)("p",null,"This makes it easy to build your structure however you like without having to think about how to structure the markup."),(0,n.kt)("p",null,"The form is made up from ",(0,n.kt)("a",{parentName:"p",href:"/docs/guide/define-a-form"},"components"),". The component describes one part of the form and the data that it contains."),(0,n.kt)("p",null,"Each component can have different widgets. The widget is responsible for rendering the component:"),(0,n.kt)("pre",null,(0,n.kt)("code",{parentName:"pre"},'const form = createForm({\n    title: textField({ label: "Title", widget: optionsWidget({}, ["one", "two"] }),\n});\n')),(0,n.kt)("p",null,"In addition to this there's also ",(0,n.kt)("a",{parentName:"p",href:"/docs/guide/validators"},"validators")," and visibility rules to make it easy to validate your form."),(0,n.kt)("p",null,"Fab4m allows you to easily validate form submissions anywhere. You can generate a ",(0,n.kt)("a",{parentName:"p",href:"https://json-schema.org/"},"JSON Schema")," from any form."),(0,n.kt)("p",null,"The whole form structure can be ",(0,n.kt)("a",{parentName:"p",href:"/docs/guide/serializing"},"serialized")," so that it can\nbe stored easily."),(0,n.kt)("p",null,"There are many more features, have a look in the ",(0,n.kt)("a",{parentName:"p",href:"/docs/intro"},"docs")," and try it out!"))}u.isMDXComponent=!0}}]);