"use strict";(self.webpackChunkdocs=self.webpackChunkdocs||[]).push([[2555],{6606:(e,t,a)=>{a.r(t),a.d(t,{assets:()=>c,contentTitle:()=>p,default:()=>k,frontMatter:()=>d,metadata:()=>u,toc:()=>f});var n=a(7462),i=a(7294),r=a(3905),l=a(1809),o=a(891);const s=(0,o.Np)({name:(0,o.$S)({label:"Your name",description:"Enter your full name",required:!0})});function m(){return i.createElement(o.H,{form:s,hideSubmit:!0})}const d={},p="Text field",u={unversionedId:"components/text",id:"components/text",title:"Text field",description:"Data type:* string",source:"@site/docs/components/text.mdx",sourceDirName:"components",slug:"/components/text",permalink:"/docs/components/text",draft:!1,tags:[],version:"current",frontMatter:{},sidebar:"tutorialSidebar",previous:{title:"Submit button",permalink:"/docs/components/submit"},next:{title:"URL field",permalink:"/docs/components/url"}},c={},f=[{value:"Example",id:"example",level:2},{value:"Available Widgets",id:"available-widgets",level:2}],x={toc:f};function k(e){let{components:t,...a}=e;return(0,r.kt)("wrapper",(0,n.Z)({},x,a,{components:t,mdxType:"MDXLayout"}),(0,r.kt)("h1",{id:"text-field"},"Text field"),(0,r.kt)("ul",null,(0,r.kt)("li",{parentName:"ul"},(0,r.kt)("strong",{parentName:"li"},"Data type:")," string"),(0,r.kt)("li",{parentName:"ul"},(0,r.kt)("strong",{parentName:"li"},"JSON Schema data type:")," string")),(0,r.kt)("p",null,"The text field component manages string inputs of\ndifferent kinds, and should be used whenever you want to\nprovide a way to enter text."),(0,r.kt)("h2",{id:"example"},"Example"),(0,r.kt)(l.Z,{source:'import React from "react";\nimport { createForm, textField, StatefulFormView } from "@fab4m/fab4m";\nimport "@fab4m/fab4m/css/basic/basic.css";\n\nconst form = createForm({\n  name: textField({\n    label: "Your name",\n    description: "Enter your full name",\n    required: true,\n  }),\n});\n\nexport default function TextFieldExample() {\n  return <StatefulFormView form={form} hideSubmit={true} />;\n}\n',example:(0,r.kt)(m,{mdxType:"ExampleComponent"}),mdxType:"Example"}),(0,r.kt)("h2",{id:"available-widgets"},"Available Widgets"),(0,r.kt)("ul",null,(0,r.kt)("li",{parentName:"ul"},(0,r.kt)("a",{parentName:"li",href:"/docs/widgets/hidden"},"Hidden")),(0,r.kt)("li",{parentName:"ul"},(0,r.kt)("a",{parentName:"li",href:"/docs/widgets/radios"},"Radios")),(0,r.kt)("li",{parentName:"ul"},(0,r.kt)("a",{parentName:"li",href:"/docs/widgets/select"},"Select")),(0,r.kt)("li",{parentName:"ul"},(0,r.kt)("a",{parentName:"li",href:"/docs/widgets/textarea"},"Text area")),(0,r.kt)("li",{parentName:"ul"},(0,r.kt)("a",{parentName:"li",href:"/docs/widgets/textfield"},"Text field"))))}k.isMDXComponent=!0}}]);