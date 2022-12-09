"use strict";(self.webpackChunkdocs=self.webpackChunkdocs||[]).push([[3977],{637:(e,t,o)=>{o.r(t),o.d(t,{assets:()=>u,contentTitle:()=>p,default:()=>k,frontMatter:()=>c,metadata:()=>d,toc:()=>b});var n=o(7462),a=o(7294),l=o(3905),r=o(1809),i=o(891);const s=(0,i.Np)({name:(0,i.Qr)({label:"I agree to the terms and conditions"})});function m(){return a.createElement(i.H,{form:s,hideSubmit:!0})}const c={},p="Yes/No",d={unversionedId:"components/boolean",id:"components/boolean",title:"Yes/No",description:"Data type:* boolean",source:"@site/docs/components/boolean.mdx",sourceDirName:"components",slug:"/components/boolean",permalink:"fab4m/docs/components/boolean",draft:!1,tags:[],version:"current",frontMatter:{},sidebar:"tutorialSidebar",previous:{title:"Component reference",permalink:"fab4m/docs/guide/component-reference"},next:{title:"Content",permalink:"fab4m/docs/components/content"}},u={},b=[{value:"Example",id:"example",level:2},{value:"Available Widgets",id:"available-widgets",level:2}],f={toc:b};function k(e){let{components:t,...o}=e;return(0,l.kt)("wrapper",(0,n.Z)({},f,o,{components:t,mdxType:"MDXLayout"}),(0,l.kt)("h1",{id:"yesno"},"Yes/No"),(0,l.kt)("ul",null,(0,l.kt)("li",{parentName:"ul"},(0,l.kt)("strong",{parentName:"li"},"Data type:")," boolean"),(0,l.kt)("li",{parentName:"ul"},(0,l.kt)("strong",{parentName:"li"},"JSON Schema data type:")," boolean")),(0,l.kt)("p",null,"The boolean field lets users input true or false values.\nThe default widget for this field is a checkbox widget."),(0,l.kt)("h2",{id:"example"},"Example"),(0,l.kt)(r.Z,{source:'import React from "react";\nimport { createForm, booleanField, StatefulFormView } from "@fab4m/fab4m";\nimport "fab4m/css/basic/basic.css";\n\nconst form = createForm({\n  name: booleanField({\n    label: "I agree to the terms and conditions",\n  }),\n});\n\nexport default function BooleanFieldExample() {\n  return <StatefulFormView form={form} hideSubmit={true} />;\n}\n',example:(0,l.kt)(m,{mdxType:"ExampleComponent"}),mdxType:"Example"}),(0,l.kt)("h2",{id:"available-widgets"},"Available Widgets"),(0,l.kt)("ul",null,(0,l.kt)("li",{parentName:"ul"},(0,l.kt)("a",{parentName:"li",href:"/docs/widgets/checkbox"},"Checkbox"))))}k.isMDXComponent=!0}}]);