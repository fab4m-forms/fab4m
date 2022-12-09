"use strict";(self.webpackChunkdocs=self.webpackChunkdocs||[]).push([[3704],{1360:(e,t,n)=>{n.r(t),n.d(t,{assets:()=>k,contentTitle:()=>x,default:()=>w,frontMatter:()=>h,metadata:()=>g,toc:()=>F});var o=n(7462),r=n(7294),a=n(3905),i=n(1809),m=n(891);const d=(0,m.Np)({text:(0,m.$S)({label:"Text field"})});function l(){return r.createElement(m.mv,{form:d,data:{text:"Some text"}})}const s=(0,m.Np)({text:(0,m.$S)({label:"Text field"})});function f(){const[e,t]=r.useState({text:"Some text"});return s.onDataChange(t),r.createElement("div",null,r.createElement(m.mv,{form:s,data:e,hideSubmit:!0}),r.createElement("p",null,e.text))}const c=(0,m.Np)({text:(0,m.$S)({label:"Text field"})});function u(){return r.createElement(m.H,{form:c})}function p(){const e=(0,m.cI)((()=>(0,m.Np)({text:(0,m.$S)({label:"text field"})})));return r.createElement(m.H,{form:e})}const h={sidebar_position:2},x="Rendering forms",g={unversionedId:"guide/rendering-the-form",id:"guide/rendering-the-form",title:"Rendering forms",description:"Forms are rendered using derivatives of the FormView component. This section describes how to work with that component and it's cousin, StatefulFormView.",source:"@site/docs/guide/rendering-the-form.mdx",sourceDirName:"guide",slug:"/guide/rendering-the-form",permalink:"fab4m/docs/guide/rendering-the-form",draft:!1,tags:[],version:"current",sidebarPosition:2,frontMatter:{sidebar_position:2},sidebar:"tutorialSidebar",previous:{title:"Creating forms",permalink:"fab4m/docs/guide/define-a-form"},next:{title:"Theming",permalink:"fab4m/docs/guide/theming"}},k={},F=[{value:"Basic rendering",id:"basic-rendering",level:2},{value:"Managing the form state",id:"managing-the-form-state",level:2},{value:"Handling the state automatically",id:"handling-the-state-automatically",level:2},{value:"Defining forms inside React components",id:"defining-forms-inside-react-components",level:2}],b={toc:F};function w(e){let{components:t,...n}=e;return(0,a.kt)("wrapper",(0,o.Z)({},b,n,{components:t,mdxType:"MDXLayout"}),(0,a.kt)("h1",{id:"rendering-forms"},"Rendering forms"),(0,a.kt)("p",null,"Forms are rendered using derivatives of the ",(0,a.kt)("inlineCode",{parentName:"p"},"FormView")," component. This section describes how to work with that component and it's cousin, ",(0,a.kt)("inlineCode",{parentName:"p"},"StatefulFormView"),"."),(0,a.kt)("h2",{id:"basic-rendering"},"Basic rendering"),(0,a.kt)("p",null,"The most common way to render a form is through the ",(0,a.kt)("inlineCode",{parentName:"p"},"<FormView>")," component."),(0,a.kt)("p",null,"The FormView component takes your form definition and the form data and renders it:"),(0,a.kt)(i.Z,{source:'import React from "react";\nimport { textField, createForm, FormView } from "@fab4m/fab4m";\n\nconst form = createForm({\n  text: textField({ label: "Text field" }),\n});\n\nexport default function BasicExample() {\n  return <FormView form={form} data={{ text: "Some text" }} />;\n}\n',example:(0,a.kt)(l,{mdxType:"Basic"}),mdxType:"Example"}),(0,a.kt)("h2",{id:"managing-the-form-state"},"Managing the form state"),(0,a.kt)("p",null,"The FormView component only renders the form with the data provided,\nand doesn't manage the form state. When using the FormView component you have to do that yourself:"),(0,a.kt)(i.Z,{source:'import * as React from "react";\nimport { textField, createForm, FormView } from "@fab4m/fab4m";\n\nconst form = createForm({\n  text: textField({ label: "Text field" }),\n});\n\nexport default function FormViewExampleWithHook() {\n  const [data, changeData] = React.useState({ text: "Some text" });\n  form.onDataChange(changeData);\n  return (\n    <div>\n      <FormView form={form} data={data} hideSubmit={true} />\n      <p>{data.text}</p>\n    </div>\n  );\n}\n',example:(0,a.kt)(f,{mdxType:"FormState"}),mdxType:"Example"}),(0,a.kt)("h2",{id:"handling-the-state-automatically"},"Handling the state automatically"),(0,a.kt)("p",null,"If you don't want to manage the state of the form yourself you can use our\nprovided ",(0,a.kt)("inlineCode",{parentName:"p"},"<StatefulFormView>")," component:"),(0,a.kt)(i.Z,{source:'import * as React from "react";\nimport { textField, createForm, StatefulFormView } from "@fab4m/fab4m";\n\nconst form = createForm({\n  text: textField({ label: "Text field" }),\n});\n\nexport default function StatefulFormExample() {\n  return <StatefulFormView form={form} />;\n}\n',example:(0,a.kt)(u,{mdxType:"StatefulView"}),mdxType:"Example"}),(0,a.kt)("h2",{id:"defining-forms-inside-react-components"},"Defining forms inside React components"),(0,a.kt)("p",null,"Creating the form definition is resource heavy, so if you need to define your form definition within your react component you should use the ",(0,a.kt)("inlineCode",{parentName:"p"},"useForm()")," hook:"),(0,a.kt)(i.Z,{source:'import * as React from "react";\nimport { textField, StatefulFormView, useForm, createForm } from "@fab4m/fab4m";\n\nexport default function HookExample() {\n  const form = useForm(() =>\n    createForm({ text: textField({ label: "text field" }) })\n  );\n  return <StatefulFormView form={form} />;\n}\n',example:(0,a.kt)(p,{mdxType:"ReactHook"}),mdxType:"Example"}),(0,a.kt)("p",null,"The useForm hook optionally takes an array of dependencies as it's second argument that will be checked, and the form will be rebuilt if any changes are detected."),(0,a.kt)("p",null,"Internally, the useForm hook is just a wrapper around a ",(0,a.kt)("a",{parentName:"p",href:"https://reactjs.org/docs/hooks-reference.html#usememo"},"useMemo")," hook."))}w.isMDXComponent=!0}}]);