"use strict";(self.webpackChunkdocs=self.webpackChunkdocs||[]).push([[2021],{2662:(e,t,l)=>{l.r(t),l.d(t,{assets:()=>u,contentTitle:()=>s,default:()=>b,frontMatter:()=>d,metadata:()=>c,toc:()=>f});var a=l(7462),i=l(7294),n=l(3905),o=l(1809),r=l(891);const m=(0,r.Np)({name:(0,r.At)({label:"File upload",required:!0})});function p(){return i.createElement(r.H,{form:m,hideSubmit:!0})}const d={},s="File upload",c={unversionedId:"components/file",id:"components/file",title:"File upload",description:"Data type:* File",source:"@site/docs/components/file.mdx",sourceDirName:"components",slug:"/components/file",permalink:"/docs/components/file",draft:!1,tags:[],version:"current",frontMatter:{},sidebar:"tutorialSidebar",previous:{title:"Email",permalink:"/docs/components/email"},next:{title:"Float field",permalink:"/docs/components/float"}},u={},f=[{value:"Example",id:"example",level:2},{value:"Available Widgets",id:"available-widgets",level:2}],k={toc:f};function b(e){let{components:t,...l}=e;return(0,n.kt)("wrapper",(0,a.Z)({},k,l,{components:t,mdxType:"MDXLayout"}),(0,n.kt)("h1",{id:"file-upload"},"File upload"),(0,n.kt)("ul",null,(0,n.kt)("li",{parentName:"ul"},(0,n.kt)("strong",{parentName:"li"},"Data type:")," File"),(0,n.kt)("li",{parentName:"ul"},(0,n.kt)("strong",{parentName:"li"},"JSON Schema data type:")," N/A")),(0,n.kt)("p",null,"Create a file field component that can be added to the form."),(0,n.kt)("h2",{id:"example"},"Example"),(0,n.kt)(o.Z,{source:'import React from "react";\nimport { createForm, fileField, StatefulFormView } from "@fab4m/fab4m";\nimport "fab4m/css/basic/basic.css";\n\nconst form = createForm({\n  name: fileField({\n    label: "File upload",\n    required: true,\n  }),\n});\n\nexport default function FileFieldExample() {\n  return <StatefulFormView form={form} hideSubmit={true} />;\n}\n',example:(0,n.kt)(p,{mdxType:"ExampleComponent"}),mdxType:"Example"}),(0,n.kt)("h2",{id:"available-widgets"},"Available Widgets"),(0,n.kt)("ul",null,(0,n.kt)("li",{parentName:"ul"},(0,n.kt)("a",{parentName:"li",href:"/docs/widgets/file"},"Upload field"))))}b.isMDXComponent=!0}}]);