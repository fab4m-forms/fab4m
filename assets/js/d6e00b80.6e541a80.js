"use strict";(self.webpackChunkdocs=self.webpackChunkdocs||[]).push([[6934],{3775:(e,t,n)=>{n.r(t),n.d(t,{assets:()=>d,contentTitle:()=>p,default:()=>b,frontMatter:()=>u,metadata:()=>c,toc:()=>f});var l=n(7462),r=n(7294),a=n(3905),i=n(1809),o=n(891);const s=(0,o.Np)({name:(0,o.KQ)({label:"Your website",required:!0})});function m(){return r.createElement(o.H,{form:s,hideSubmit:!0})}const u={},p="URL field",c={unversionedId:"components/url",id:"components/url",title:"URL field",description:"Data type:* string",source:"@site/docs/components/url.mdx",sourceDirName:"components",slug:"/components/url",permalink:"/docs/components/url",draft:!1,tags:[],version:"current",frontMatter:{},sidebar:"tutorialSidebar",previous:{title:"Text field",permalink:"/docs/components/text"},next:{title:"Checkbox",permalink:"/docs/widgets/checkbox"}},d={},f=[{value:"Example",id:"example",level:2},{value:"Available Widgets",id:"available-widgets",level:2}],k={toc:f};function b(e){let{components:t,...n}=e;return(0,a.kt)("wrapper",(0,l.Z)({},k,n,{components:t,mdxType:"MDXLayout"}),(0,a.kt)("h1",{id:"url-field"},"URL field"),(0,a.kt)("ul",null,(0,a.kt)("li",{parentName:"ul"},(0,a.kt)("strong",{parentName:"li"},"Data type:")," string"),(0,a.kt)("li",{parentName:"ul"},(0,a.kt)("strong",{parentName:"li"},"JSON Schema data type:")," string")),(0,a.kt)("p",null,"The url component handles url inputs\nThe JSON Schema will be a string with the uri format."),(0,a.kt)("h2",{id:"example"},"Example"),(0,a.kt)(i.Z,{source:'import React from "react";\nimport { createForm, urlField, StatefulFormView } from "@fab4m/fab4m";\nimport "fab4m/css/basic/basic.css";\n\nconst form = createForm({\n  name: urlField({\n    label: "Your website",\n    required: true,\n  }),\n});\n\nexport default function UrlFieldExample() {\n  return <StatefulFormView form={form} hideSubmit={true} />;\n}\n',example:(0,a.kt)(m,{mdxType:"ExampleComponent"}),mdxType:"Example"}),(0,a.kt)("h2",{id:"available-widgets"},"Available Widgets"),(0,a.kt)("ul",null,(0,a.kt)("li",{parentName:"ul"},(0,a.kt)("a",{parentName:"li",href:"/docs/widgets/linkfield"},"Link"))))}b.isMDXComponent=!0}}]);