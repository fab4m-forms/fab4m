"use strict";(self.webpackChunkdocs=self.webpackChunkdocs||[]).push([[4200],{8598:(e,t,i)=>{i.r(t),i.d(t,{assets:()=>p,contentTitle:()=>u,default:()=>f,frontMatter:()=>d,metadata:()=>c,toc:()=>g});var s=i(7462),a=i(7294),o=i(3905),l=i(1809),n=i(891);const r=(0,n.Np)({city:(0,n.$S)({label:"Which cities did you visit?",required:!0,multiple:!0,multipleWidget:(0,n.aI)(),widget:(0,n.Gn)([["Gothenburg","gothenburg"],["Stockholm","stockholm"]])}),tags:(0,n.$S)({label:"Write some words to describe your stay",multiple:!0,multipleWidget:(0,n.aI)({})})});function m(){return a.createElement(n.H,{form:r,hideSubmit:!0})}const d={},u="Multiple items as tags",c={unversionedId:"widgets/tags",id:"widgets/tags",title:"Multiple items as tags",description:"The tags widget allows you to add items in a tag-like fasion.",source:"@site/docs/widgets/tags.mdx",sourceDirName:"widgets",slug:"/widgets/tags",permalink:"/docs/widgets/tags",draft:!1,tags:[],version:"current",frontMatter:{},sidebar:"tutorialSidebar",previous:{title:"Table",permalink:"/docs/widgets/table"},next:{title:"Text area",permalink:"/docs/widgets/textarea"}},p={},g=[{value:"Example",id:"example",level:2},{value:"Compatible components",id:"compatible-components",level:2}],b={toc:g};function f(e){let{components:t,...i}=e;return(0,o.kt)("wrapper",(0,s.Z)({},b,i,{components:t,mdxType:"MDXLayout"}),(0,o.kt)("h1",{id:"multiple-items-as-tags"},"Multiple items as tags"),(0,o.kt)("p",null,"The tags widget allows you to add items in a tag-like fasion."),(0,o.kt)("h2",{id:"example"},"Example"),(0,o.kt)(l.Z,{source:'import React from "react";\nimport {\n  createForm,\n  textField,\n  StatefulFormView,\n  selectWidget,\n  tagsWidget,\n} from "@fab4m/fab4m";\nimport "@fab4m/fab4m/css/basic/basic.css";\n\nconst form = createForm({\n  city: textField({\n    label: "Which cities did you visit?",\n    required: true,\n    multiple: true,\n    multipleWidget: tagsWidget(),\n    widget: selectWidget([\n      ["Gothenburg", "gothenburg"],\n      ["Stockholm", "stockholm"],\n    ]),\n  }),\n  tags: textField({\n    label: "Write some words to describe your stay",\n    multiple: true,\n    multipleWidget: tagsWidget({}),\n  }),\n});\n\nexport default function selectExample() {\n  return <StatefulFormView form={form} hideSubmit={true} />;\n}\n',example:(0,o.kt)(m,{mdxType:"ExampleComponent"}),mdxType:"Example"}),(0,o.kt)("h2",{id:"compatible-components"},"Compatible components"))}f.isMDXComponent=!0}}]);