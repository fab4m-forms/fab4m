"use strict";(self.webpackChunkdocs=self.webpackChunkdocs||[]).push([[4655],{1622:(e,t,a)=>{a.r(t),a.d(t,{assets:()=>u,contentTitle:()=>d,default:()=>b,frontMatter:()=>s,metadata:()=>c,toc:()=>f});var m=a(7462),i=a(7294),n=a(3905),o=a(1809),l=a(891);const r=(0,l.Np)({image:(0,l.At)({label:"Image",validators:[(0,l.zF)(["image/jpg","image/png"],{message:"The mimetype is not allowed!"})]}),break:(0,l.Pr)(),content:(0,l.kQ)({},(e=>i.createElement("div",null,"Nice upload ",e.image.name,"!")))});function p(){return i.createElement(l.H,{form:r,hideSubmit:!0})}const s={},d="Allowed mime types",c={unversionedId:"validators/mimetype",id:"validators/mimetype",title:"Allowed mime types",description:"Allows you to validate that the file",source:"@site/docs/validators/mimetype.mdx",sourceDirName:"validators",slug:"/validators/mimetype",permalink:"/fab4m/docs/validators/mimetype",draft:!1,tags:[],version:"current",frontMatter:{},sidebar:"tutorialSidebar",previous:{title:"Maxmimal length",permalink:"/fab4m/docs/validators/maxLength"},next:{title:"Min value",permalink:"/fab4m/docs/validators/min"}},u={},f=[{value:"Example",id:"example",level:2},{value:"Compatible components",id:"compatible-components",level:2}],v={toc:f};function b(e){let{components:t,...a}=e;return(0,n.kt)("wrapper",(0,m.Z)({},v,a,{components:t,mdxType:"MDXLayout"}),(0,n.kt)("h1",{id:"allowed-mime-types"},"Allowed mime types"),(0,n.kt)("p",null,"Allows you to validate that the file\nmime type matches one of the provided mime types."),(0,n.kt)("h2",{id:"example"},"Example"),(0,n.kt)(o.Z,{source:'import React from "react";\nimport {\n  createForm,\n  pageBreak,\n  fileField,\n  StatefulFormView,\n  content,\n  mimeType,\n} from "@fab4m/fab4m";\nimport "fab4m/css/basic/basic.css";\n\nconst form = createForm({\n  image: fileField({\n    label: "Image",\n    validators: [\n      mimeType(["image/jpg", "image/png"], {\n        message: "The mimetype is not allowed!",\n      }),\n    ],\n  }),\n  break: pageBreak(),\n  content: content({}, (data) => <div>Nice upload {data.image.name}!</div>),\n});\n\nexport default function MimeTypeExample() {\n  return <StatefulFormView form={form} hideSubmit={true} />;\n}\n',example:(0,n.kt)(p,{mdxType:"ExampleComponent"}),mdxType:"Example"}),(0,n.kt)("h2",{id:"compatible-components"},"Compatible components"),(0,n.kt)("ul",null,(0,n.kt)("li",{parentName:"ul"},(0,n.kt)("a",{parentName:"li",href:"/docs/components/file"},"File upload"))))}b.isMDXComponent=!0}}]);