"use strict";(self.webpackChunkdocs=self.webpackChunkdocs||[]).push([[3931],{978:(e,t,n)=>{n.r(t),n.d(t,{assets:()=>u,contentTitle:()=>c,default:()=>k,frontMatter:()=>d,metadata:()=>p,toc:()=>v});var a=n(7462),i=n(7294),r=n(3905),o=n(1809),l=n(891);const m=(0,l.Np)({minValue:(0,l.OL)({label:"Min 10",validators:[(0,l.VV)(10)],required:!0}),break:(0,l.Pr)(),content:(0,l.kQ)({},(()=>i.createElement("div",null,"Great choice!")))});function s(){return i.createElement(l.H,{form:m,hideSubmit:!0})}const d={},c="Min value",p={unversionedId:"validators/min",id:"validators/min",title:"Min value",description:"The min validator ensures that a number is equal or greater than",source:"@site/docs/validators/min.mdx",sourceDirName:"validators",slug:"/validators/min",permalink:"/docs/validators/min",draft:!1,tags:[],version:"current",frontMatter:{},sidebar:"tutorialSidebar",previous:{title:"Allowed mime types",permalink:"/docs/validators/mimetype"},next:{title:"Minimal length",permalink:"/docs/validators/minLength"}},u={},v=[{value:"Example",id:"example",level:2},{value:"Compatible components",id:"compatible-components",level:2}],f={toc:v};function k(e){let{components:t,...n}=e;return(0,r.kt)("wrapper",(0,a.Z)({},f,n,{components:t,mdxType:"MDXLayout"}),(0,r.kt)("h1",{id:"min-value"},"Min value"),(0,r.kt)("p",null,"The min validator ensures that a number is equal or greater than\nthe provided value."),(0,r.kt)("h2",{id:"example"},"Example"),(0,r.kt)(o.Z,{source:'import React from "react";\nimport {\n  createForm,\n  pageBreak,\n  integerField,\n  StatefulFormView,\n  content,\n  min,\n} from "@fab4m/fab4m";\nimport "@fab4m/fab4m/css/basic/basic.css";\n\nconst form = createForm({\n  minValue: integerField({\n    label: "Min 10",\n    validators: [min(10)],\n    required: true,\n  }),\n  break: pageBreak(),\n  content: content({}, () => <div>Great choice!</div>),\n});\n\nexport default function Example() {\n  return <StatefulFormView form={form} hideSubmit={true} />;\n}\n',example:(0,r.kt)(s,{mdxType:"ExampleComponent"}),mdxType:"Example"}),(0,r.kt)("h2",{id:"compatible-components"},"Compatible components"),(0,r.kt)("ul",null,(0,r.kt)("li",{parentName:"ul"},(0,r.kt)("a",{parentName:"li",href:"/docs/components/integer"},"Integer field")),(0,r.kt)("li",{parentName:"ul"},(0,r.kt)("a",{parentName:"li",href:"/docs/components/float"},"Float field"))))}k.isMDXComponent=!0}}]);