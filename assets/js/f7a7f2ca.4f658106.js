"use strict";(self.webpackChunkdocs=self.webpackChunkdocs||[]).push([[5322],{23594:(e,t,r)=>{r.r(t),r.d(t,{assets:()=>l,contentTitle:()=>d,default:()=>p,frontMatter:()=>m,metadata:()=>o,toc:()=>f});const o=JSON.parse('{"id":"packages/routerforms","title":"Router forms","description":"The @fab4m/routerforms package integrates your fab4m forms with React router. This allows you to render multipage forms as react router routes!","source":"@site/docs/packages/routerforms.md","sourceDirName":"packages","slug":"/packages/routerforms","permalink":"/docs/packages/routerforms","draft":false,"unlisted":false,"tags":[],"version":"current","frontMatter":{},"sidebar":"tutorialSidebar","previous":{"title":"Password","permalink":"/docs/packages/password"},"next":{"title":"Creating widgets","permalink":"/docs/extending/widgets"}}');var a=r(74848),n=r(28453);const s='import * as React from "react";\nimport { createForm, textField, pageBreak } from "@fab4m/fab4m";\nimport { FormRoute } from "../../src";\n\nconst form = createForm({\n  text: textField({ label: "First field", required: true }),\n  pagebreak: pageBreak(),\n  nextText: textField({ label: "Second field" }),\n});\n\nexport default function RouterExample() {\n  const [data, setData] = React.useState({});\n  const [submitted, setSubmitted] = React.useState(false);\n  form.onDataChange(setData).onSubmit((e) => {\n    e.preventDefault();\n    setSubmitted(true);\n  });\n  return (\n    <div>\n      {submitted && <p>Thanks for your response!</p>}\n      <FormRoute basePath="/basic-example" form={form} data={data} />\n    </div>\n  );\n}\n',i='import { createForm, textField, pageBreak } from "@fab4m/fab4m";\nimport { RouteObject } from "react-router-dom";\nimport { StatefulFormRoute } from "../../src";\n\nconst form = createForm({\n  text: textField({ label: "First field", required: true }),\n  pagebreak: pageBreak(),\n  nextText: textField({ label: "Second field" }),\n});\n\nexport const route: RouteObject = {\n  path: "/route-forms/:part",\n  action: async ({ request }) => {\n    const formData = await request.formData();\n    const data = Object.fromEntries(formData);\n    console.log(data);\n  },\n  element: (\n    <StatefulFormRoute\n      form={form}\n      basePath="/route-forms"\n      useRouteAction={true}\n    />\n  ),\n};\n';var c=r(55875);r(96540);function u(e){let{source:t}=e;const r=t.replace("../../src","@fab4m/routerforms");return(0,a.jsx)(c.A,{language:"jsx",children:r})}const m={},d="Router forms",l={},f=[];function h(e){const t={a:"a",code:"code",h1:"h1",header:"header",p:"p",pre:"pre",...(0,n.R)(),...e.components};return(0,a.jsxs)(a.Fragment,{children:[(0,a.jsx)(t.header,{children:(0,a.jsx)(t.h1,{id:"router-forms",children:"Router forms"})}),"\n",(0,a.jsxs)(t.p,{children:["The ",(0,a.jsx)(t.code,{children:"@fab4m/routerforms"})," package integrates your fab4m forms with ",(0,a.jsx)(t.a,{href:"https://reactrouter.com/en/main",children:"React router"}),". This allows you to render multipage forms as react router routes!"]}),"\n",(0,a.jsx)(t.h1,{id:"installing",children:"Installing"}),"\n",(0,a.jsxs)(t.p,{children:["Install the ",(0,a.jsx)(t.code,{children:"@fab4m/routerforms"})," and the ",(0,a.jsx)(t.code,{children:"react-router-dom"})," packages. Only react router 6 is supported:"]}),"\n",(0,a.jsx)(t.pre,{children:(0,a.jsx)(t.code,{className:"language-bash",children:"npm install --save @fab4m/routerforms react-router-dom@6\n"})}),"\n",(0,a.jsx)(t.h1,{id:"setting-it-up",children:"Setting it up"}),"\n",(0,a.jsxs)(t.p,{children:["Create your form just as any other fab4m form, and then you use the ",(0,a.jsx)(t.code,{children:"RouterFormView"})," component from this package instead of the ",(0,a.jsx)(t.code,{children:"FormView"}),". This will set your form up with\na React browser router that then allows the user to navigate between the form pages\nusing the browser url."]}),"\n",(0,a.jsx)(u,{source:s}),"\n",(0,a.jsx)(t.h1,{id:"usage-with-an-existing-router",children:"Usage with an existing router"}),"\n",(0,a.jsxs)(t.p,{children:["If you have an exising react router app you can integrate your form within that router by using the ",(0,a.jsx)(t.code,{children:"FormRoute"})," or, if you don't want to handle state by yourself, the ",(0,a.jsx)(t.code,{children:"StatefulFormRoute"})," compnent."]}),"\n",(0,a.jsx)(u,{source:s}),"\n",(0,a.jsx)(t.h1,{id:"integrating-with-remixreact-router-actions",children:"Integrating with Remix/React router actions"}),"\n",(0,a.jsxs)(t.p,{children:["Fab4m router forms have support for react router actions, you can use a\nfab4m form as you would with any React router ",(0,a.jsx)(t.code,{children:"<Form>"}),"."]}),"\n",(0,a.jsx)(u,{source:i})]})}function p(e={}){const{wrapper:t}={...(0,n.R)(),...e.components};return t?(0,a.jsx)(t,{...e,children:(0,a.jsx)(h,{...e})}):h(e)}}}]);