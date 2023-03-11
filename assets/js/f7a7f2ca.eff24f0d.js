"use strict";(self.webpackChunkdocs=self.webpackChunkdocs||[]).push([[972],{5604:(e,t,r)=>{r.r(t),r.d(t,{assets:()=>l,contentTitle:()=>c,default:()=>k,frontMatter:()=>m,metadata:()=>p,toc:()=>f});var a=r(7462),o=r(7294),n=r(3905);const s='import * as React from "react";\nimport { createForm, textField, pageBreak } from "@fab4m/fab4m";\nimport { FormRoute } from "../../src";\n\nconst form = createForm({\n  text: textField({ label: "First field", required: true }),\n  pagebreak: pageBreak(),\n  nextText: textField({ label: "Second field" }),\n});\n\nexport default function RouterExample() {\n  const [data, setData] = React.useState({});\n  const [submitted, setSubmitted] = React.useState(false);\n  form.onDataChange(setData).onSubmit((e) => {\n    e.preventDefault();\n    setSubmitted(true);\n  });\n  return (\n    <div>\n      {submitted && <p>Thanks for your response!</p>}\n      <FormRoute basePath="/basic-example" form={form} data={data} />\n    </div>\n  );\n}\n';var u=r(2406);function i(e){let{source:t}=e;const r=t.replace("../../src","@fab4m/routerforms");return o.createElement(u.Z,{language:"jsx"},r)}const m={},c="Router forms",p={unversionedId:"packages/routerforms",id:"packages/routerforms",title:"Router forms",description:"The @fab4m/routerforms package integrates your fab4m forms with React router. This allows you to render multipage forms as react router routes!",source:"@site/docs/packages/routerforms.md",sourceDirName:"packages",slug:"/packages/routerforms",permalink:"/docs/packages/routerforms",draft:!1,tags:[],version:"current",frontMatter:{},sidebar:"tutorialSidebar",previous:{title:"Password",permalink:"/docs/packages/password"}},l={},f=[],d={toc:f};function k(e){let{components:t,...r}=e;return(0,n.kt)("wrapper",(0,a.Z)({},d,r,{components:t,mdxType:"MDXLayout"}),(0,n.kt)("h1",{id:"router-forms"},"Router forms"),(0,n.kt)("p",null,"The ",(0,n.kt)("inlineCode",{parentName:"p"},"@fab4m/routerforms")," package integrates your fab4m forms with ",(0,n.kt)("a",{parentName:"p",href:"https://reactrouter.com/en/main"},"React router"),". This allows you to render multipage forms as react router routes!"),(0,n.kt)("h1",{id:"installing"},"Installing"),(0,n.kt)("p",null,"Install the ",(0,n.kt)("inlineCode",{parentName:"p"},"@fab4m/routerforms")," and the ",(0,n.kt)("inlineCode",{parentName:"p"},"react-router-dom")," packages. Only react router 6 is supported:"),(0,n.kt)("pre",null,(0,n.kt)("code",{parentName:"pre",className:"language-bash"},"npm install --save @fab4m/routerforms react-router-dom@6\n")),(0,n.kt)("h1",{id:"setting-it-up"},"Setting it up"),(0,n.kt)("p",null,"Create your form just as any other fab4m form, and then you use the ",(0,n.kt)("inlineCode",{parentName:"p"},"RouterFormView")," component from this package instead of the ",(0,n.kt)("inlineCode",{parentName:"p"},"FormView"),". This will set your form up with\na React browser router that then allows the user to navigate between the form pages\nusing the browser url."),(0,n.kt)(i,{source:s,mdxType:"Rewrite"}),(0,n.kt)("h1",{id:"usage-with-an-existing-router"},"Usage with an existing router"),(0,n.kt)("p",null,"If you have an exising react router app you can integrate your form within that router by using the ",(0,n.kt)("inlineCode",{parentName:"p"},"FormRoute")," or, if you don't want to handle state by yourself, the ",(0,n.kt)("inlineCode",{parentName:"p"},"StatefulFormRoute")," compnent."),(0,n.kt)(i,{source:s,mdxType:"Rewrite"}),(0,n.kt)("h1",{id:"integrating-with-remixreact-router-actions"},"Integrating with Remix/React router actions"),(0,n.kt)("p",null,"Fab4m router forms have support for react router actions, you can use a\nfab4m form as you would with any React router ",(0,n.kt)("inlineCode",{parentName:"p"},"<Form>"),"."),(0,n.kt)(i,{source:'import { createForm, textField, pageBreak } from "@fab4m/fab4m";\nimport { RouteObject } from "react-router-dom";\nimport { StatefulFormRoute } from "../../src";\n\nconst form = createForm({\n  text: textField({ label: "First field", required: true }),\n  pagebreak: pageBreak(),\n  nextText: textField({ label: "Second field" }),\n});\n\nexport const route: RouteObject = {\n  path: "/route-forms/:part",\n  action: async ({ request }) => {\n    const formData = await request.formData();\n    const data = Object.fromEntries(formData);\n    console.log(data);\n  },\n  element: (\n    <StatefulFormRoute\n      form={form}\n      basePath="/route-forms"\n      useRouteAction={true}\n    />\n  ),\n};\n',mdxType:"Rewrite"}))}k.isMDXComponent=!0}}]);