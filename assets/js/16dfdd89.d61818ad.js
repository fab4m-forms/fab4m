"use strict";(self.webpackChunkdocs=self.webpackChunkdocs||[]).push([[1447],{9879:(e,t,a)=>{a.r(t),a.d(t,{assets:()=>p,contentTitle:()=>u,default:()=>k,frontMatter:()=>c,metadata:()=>m,toc:()=>v});var o=a(7462),l=a(7294),n=a(3905),s=a(1809),i=a(891);const r=(0,i.Np)({city:(0,i.$S)({label:"City",validators:[(0,i.FK)(["Gothenburg","Stockholm"],"Choose anything but Stockholm or Gothenburg")],required:!0}),break:(0,i.Pr)(),content:(0,i.kQ)({},(()=>l.createElement("div",null,"Great choice!")))});function d(){return l.createElement(i.H,{form:r,hideSubmit:!0})}const c={},u="Disallowed values",m={unversionedId:"validators/disallowedValues",id:"validators/disallowedValues",title:"Disallowed values",description:"The disallowed values validator let's you ensure that a component doesn't have",source:"@site/docs/validators/disallowedValues.mdx",sourceDirName:"validators",slug:"/validators/disallowedValues",permalink:"/docs/validators/disallowedValues",draft:!1,tags:[],version:"current",frontMatter:{},sidebar:"tutorialSidebar",previous:{title:"callback",permalink:"/docs/validators/callback"},next:{title:"Equals",permalink:"/docs/validators/equals"}},p={},v=[{value:"Example",id:"example",level:2},{value:"Compatible components",id:"compatible-components",level:2}],h={toc:v};function k(e){let{components:t,...a}=e;return(0,n.kt)("wrapper",(0,o.Z)({},h,a,{components:t,mdxType:"MDXLayout"}),(0,n.kt)("h1",{id:"disallowed-values"},"Disallowed values"),(0,n.kt)("p",null,"The disallowed values validator let's you ensure that a component doesn't have\none of the specified values."),(0,n.kt)("h2",{id:"example"},"Example"),(0,n.kt)(s.Z,{source:'import React from "react";\nimport {\n  createForm,\n  pageBreak,\n  textField,\n  StatefulFormView,\n  content,\n  disallowedValues,\n} from "@fab4m/fab4m";\nimport "fab4m/css/basic/basic.css";\n\nconst form = createForm({\n  city: textField({\n    label: "City",\n    validators: [\n      disallowedValues(\n        ["Gothenburg", "Stockholm"],\n        "Choose anything but Stockholm or Gothenburg"\n      ),\n    ],\n    required: true,\n  }),\n  break: pageBreak(),\n  content: content({}, () => <div>Great choice!</div>),\n});\n\nexport default function TextFieldExample() {\n  return <StatefulFormView form={form} hideSubmit={true} />;\n}\n',example:(0,n.kt)(d,{mdxType:"ExampleComponent"}),mdxType:"Example"}),(0,n.kt)("h2",{id:"compatible-components"},"Compatible components"),(0,n.kt)("ul",null,(0,n.kt)("li",{parentName:"ul"},(0,n.kt)("a",{parentName:"li",href:"/docs/components/text"},"Text field"))))}k.isMDXComponent=!0}}]);