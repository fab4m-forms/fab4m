"use strict";(self.webpackChunkdocs=self.webpackChunkdocs||[]).push([[6491],{1724:(t,e,n)=>{n.r(e),n.d(e,{assets:()=>c,contentTitle:()=>b,default:()=>k,frontMatter:()=>s,metadata:()=>p,toc:()=>d});var a=n(7462),o=n(7294),i=n(3905),m=n(1809),l=n(891);const u=(0,l.Np)({name:(0,l.$S)({label:"Your name",description:"Enter your full name",required:!0}),submit:(0,l.Ps)({label:"My submit button"},{title:"button text"}),otherField:(0,l.$S)({label:"This field comes after the buttton"})}).onSubmit((t=>t.preventDefault()));function r(){return o.createElement(l.H,{form:u,hideSubmit:!0})}const s={},b="Submit button",p={unversionedId:"components/submit",id:"components/submit",title:"Submit button",description:"Data type:* unknown",source:"@site/docs/components/submit.mdx",sourceDirName:"components",slug:"/components/submit",permalink:"fab4m/docs/components/submit",draft:!1,tags:[],version:"current",frontMatter:{},sidebar:"tutorialSidebar",previous:{title:"Page break",permalink:"fab4m/docs/components/pagebreak"},next:{title:"Text field",permalink:"fab4m/docs/components/text"}},c={},d=[{value:"Example",id:"example",level:2},{value:"Available Widgets",id:"available-widgets",level:2}],f={toc:d};function k(t){let{components:e,...n}=t;return(0,i.kt)("wrapper",(0,a.Z)({},f,n,{components:e,mdxType:"MDXLayout"}),(0,i.kt)("h1",{id:"submit-button"},"Submit button"),(0,i.kt)("ul",null,(0,i.kt)("li",{parentName:"ul"},(0,i.kt)("strong",{parentName:"li"},"Data type:")," unknown"),(0,i.kt)("li",{parentName:"ul"},(0,i.kt)("strong",{parentName:"li"},"JSON Schema data type:")," N/A")),(0,i.kt)("p",null,"The Submit component allows you to place a submit button anywhere in the form."),(0,i.kt)("h2",{id:"example"},"Example"),(0,i.kt)(m.Z,{source:'import React from "react";\nimport { createForm, textField, StatefulFormView, submit } from "@fab4m/fab4m";\nimport "fab4m/css/basic/basic.css";\n\nconst form = createForm({\n  name: textField({\n    label: "Your name",\n    description: "Enter your full name",\n    required: true,\n  }),\n  submit: submit(\n    {\n      label: "My submit button",\n    },\n    { title: "button text" }\n  ),\n  otherField: textField({\n    label: "This field comes after the buttton",\n  }),\n}).onSubmit((e) => e.preventDefault());\n\nexport default function SubmitExample() {\n  return <StatefulFormView form={form} hideSubmit={true} />;\n}\n',example:(0,i.kt)(r,{mdxType:"ExampleComponent"}),mdxType:"Example"}),(0,i.kt)("h2",{id:"available-widgets"},"Available Widgets"),(0,i.kt)("ul",null,(0,i.kt)("li",{parentName:"ul"},(0,i.kt)("a",{parentName:"li",href:"/docs/widgets/submit"},"Submit button"))))}k.isMDXComponent=!0}}]);