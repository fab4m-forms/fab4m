"use strict";(self.webpackChunkdocs=self.webpackChunkdocs||[]).push([[5415],{4116:(e,a,t)=>{t.r(a),t.d(a,{assets:()=>p,contentTitle:()=>c,default:()=>f,frontMatter:()=>d,metadata:()=>u,toc:()=>x});var n=t(7462),r=t(7294),o=t(3905),l=t(1809),i=t(891);const m=(0,i.Np)({maxValue:(0,i.OL)({label:"Max 10",validators:[(0,i.Fp)(10)],required:!0}),break:(0,i.Pr)(),content:(0,i.kQ)({},(()=>r.createElement("div",null,"Great choice!")))});function s(){return r.createElement(i.H,{form:m,hideSubmit:!0})}const d={},c="Max value",u={unversionedId:"validators/max",id:"validators/max",title:"Max value",description:"The max validator ensures that a number is equal or less than",source:"@site/docs/validators/max.mdx",sourceDirName:"validators",slug:"/validators/max",permalink:"/docs/validators/max",draft:!1,tags:[],version:"current",frontMatter:{},sidebar:"tutorialSidebar",previous:{title:"Max file Size",permalink:"/docs/validators/filesize"},next:{title:"Maxmimal length",permalink:"/docs/validators/maxLength"}},p={},x=[{value:"Example",id:"example",level:2},{value:"Compatible components",id:"compatible-components",level:2}],v={toc:x};function f(e){let{components:a,...t}=e;return(0,o.kt)("wrapper",(0,n.Z)({},v,t,{components:a,mdxType:"MDXLayout"}),(0,o.kt)("h1",{id:"max-value"},"Max value"),(0,o.kt)("p",null,"The max validator ensures that a number is equal or less than\nthe provided value."),(0,o.kt)("h2",{id:"example"},"Example"),(0,o.kt)(l.Z,{source:'import React from "react";\nimport {\n  createForm,\n  pageBreak,\n  integerField,\n  StatefulFormView,\n  content,\n  max,\n} from "@fab4m/fab4m";\nimport "fab4m/css/basic/basic.css";\n\nconst form = createForm({\n  maxValue: integerField({\n    label: "Max 10",\n    validators: [max(10)],\n    required: true,\n  }),\n  break: pageBreak(),\n  content: content({}, () => <div>Great choice!</div>),\n});\n\nexport default function TextFieldExample() {\n  return <StatefulFormView form={form} hideSubmit={true} />;\n}\n',example:(0,o.kt)(s,{mdxType:"ExampleComponent"}),mdxType:"Example"}),(0,o.kt)("h2",{id:"compatible-components"},"Compatible components"),(0,o.kt)("ul",null,(0,o.kt)("li",{parentName:"ul"},(0,o.kt)("a",{parentName:"li",href:"/docs/components/integer"},"Integer field")),(0,o.kt)("li",{parentName:"ul"},(0,o.kt)("a",{parentName:"li",href:"/docs/components/float"},"Float field"))))}f.isMDXComponent=!0}}]);