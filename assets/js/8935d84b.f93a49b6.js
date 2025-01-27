"use strict";(self.webpackChunkdocs=self.webpackChunkdocs||[]).push([[500],{9848:(e,n,o)=>{o.r(n),o.d(n,{assets:()=>z,contentTitle:()=>B,default:()=>K,frontMatter:()=>E,metadata:()=>t,toc:()=>A});const t=JSON.parse('{"id":"packages/formbuilder","title":"Form builder","description":"The @fab4m/builder package provides the basic building blocks to create a visual","source":"@site/docs/packages/formbuilder.mdx","sourceDirName":"packages","slug":"/packages/formbuilder","permalink":"/docs/packages/formbuilder","draft":false,"unlisted":false,"tags":[],"version":"current","frontMatter":{},"sidebar":"tutorialSidebar","previous":{"title":"Date and time","permalink":"/docs/packages/date"},"next":{"title":"Password","permalink":"/docs/packages/password"}}');var r=o(74848),a=o(28453),l=o(53603),i=o(96540),s=o(38711),m=o(1173);const d=(0,m.lK)((0,m.DG)({component:(0,m.M8)({label:"First component"}),second:(0,m.M8)({label:"Second component"})}));function c(){const[e,n]=(0,i.useState)(d);return(0,r.jsx)(s.b4,{form:e,formChanged:n,plugins:s.Yl,children:(0,r.jsx)(s.z4,{})})}const p='import React, { useState } from "react";\nimport {\n  FormComponents,\n  FormBuilderProvider,\n  allPlugins,\n} from "@fab4m/builder";\nimport { createForm, serialize, textField } from "@fab4m/fab4m";\n\n// The form builder works on the serialized version of the form.\nconst form = serialize(\n  createForm({\n    component: textField({ label: "First component" }),\n    second: textField({ label: "Second component" }),\n  }),\n);\n\nexport default function FormComponentsExample() {\n  const [draft, changeDraft] = useState(form);\n  return (\n    <FormBuilderProvider\n      form={draft}\n      formChanged={changeDraft}\n      plugins={allPlugins}\n    >\n      <FormComponents />\n    </FormBuilderProvider>\n  );\n}\n',u=(0,m.lK)((0,m.DG)({component:(0,m.M8)({label:"First component"}),second:(0,m.M8)({label:"Second component"})}));function f(){const[e,n]=(0,i.useState)(u);return(0,r.jsx)(s.b4,{form:e,formChanged:n,children:(0,r.jsx)(s.z4,{actions:e=>{let{component:n,removeComponent:o,updateComponent:t}=e;return(0,r.jsxs)(r.Fragment,{children:[(0,r.jsx)("button",{type:"button",onClick:o,children:"Remove"}),(0,r.jsx)("button",{type:"button",onClick:()=>t({...n,label:"Changed component"}),children:"Change component"})]})}})})}const h='import { FormComponents, FormBuilderProvider } from "@fab4m/builder";\nimport { createForm, serialize, textField } from "@fab4m/fab4m";\nimport React, { useState } from "react";\n\nconst form = serialize(\n  createForm({\n    component: textField({ label: "First component" }),\n    second: textField({ label: "Second component" }),\n  }),\n);\n\nexport default function FormActionsExample() {\n  const [draft, changeDraft] = useState(form);\n  return (\n    <FormBuilderProvider form={draft} formChanged={changeDraft}>\n      <FormComponents\n        actions={({ component, removeComponent, updateComponent }) => (\n          <>\n            <button type="button" onClick={removeComponent}>\n              Remove\n            </button>\n            <button\n              type="button"\n              onClick={() =>\n                updateComponent({ ...component, label: "Changed component" })\n              }\n            >\n              Change component\n            </button>\n          </>\n        )}\n      />\n    </FormBuilderProvider>\n  );\n}\n',b=(0,m.lK)((0,m.DG)({}));function x(){const[e,n]=(0,i.useState)(b);return(0,r.jsxs)(s.b4,{form:e,formChanged:n,plugins:s.Yl,children:[(0,r.jsx)(s.z4,{}),(0,r.jsx)("h2",{children:"Add new component"}),(0,r.jsx)(s.qw,{attributes:{name:`component_${e.components.length}`,label:`Component ${e.components.length+1}`}})]})}const g='import React, { useState } from "react";\nimport {\n  FormComponents,\n  FormBuilderProvider,\n  allPlugins,\n  NewComponent,\n} from "@fab4m/builder";\nimport { createForm, serialize } from "@fab4m/fab4m";\n\nconst form = serialize(createForm({}));\n\nexport default function NewComponentsExample() {\n  const [draft, changeDraft] = useState(form);\n  return (\n    <FormBuilderProvider\n      form={draft}\n      formChanged={changeDraft}\n      plugins={allPlugins}\n    >\n      <FormComponents />\n      <h2>Add new component</h2>\n      <NewComponent\n        attributes={{\n          name: `component_${draft.components.length}`,\n          label: `Component ${draft.components.length + 1}`,\n        }}\n      />\n    </FormBuilderProvider>\n  );\n}\n',j=(0,m.lK)((0,m.DG)({item:(0,m.M8)({label:"Item"})}));function F(){const[e,n]=(0,i.useState)(j),[o,t]=(0,i.useState)(null);return(0,r.jsxs)(s.b4,{form:e,formChanged:n,plugins:s.Yl,children:[(0,r.jsx)(s.z4,{actions:e=>(0,r.jsx)("button",{onClick:()=>t(e.formKey),children:"Edit"})}),o?(0,r.jsx)("dialog",{open:!0,className:"backdrop:bg-gray-50",children:(0,r.jsx)(s.GB,{componentKey:o,componentSaved:()=>t(null)})}):null]})}const v='import React, { useState } from "react";\nimport {\n  FormComponents,\n  FormBuilderProvider,\n  allPlugins,\n  EditFormComponent,\n} from "@fab4m/builder";\nimport { createForm, serialize, textField } from "@fab4m/fab4m";\n\nconst form = serialize(\n  createForm({\n    item: textField({ label: "Item" }),\n  }),\n);\n\nexport default function NewComponentsExample() {\n  const [draft, changeDraft] = useState(form);\n  const [editComponent, changeEditComponent] = useState<null | string>(null);\n  return (\n    <FormBuilderProvider\n      form={draft}\n      formChanged={changeDraft}\n      plugins={allPlugins}\n    >\n      <FormComponents\n        actions={(props) => (\n          <button onClick={() => changeEditComponent(props.formKey)}>\n            Edit\n          </button>\n        )}\n      />\n      {editComponent ? (\n        <dialog open={true} className="backdrop:bg-gray-50">\n          <EditFormComponent\n            componentKey={editComponent}\n            componentSaved={() => changeEditComponent(null)}\n          />\n        </dialog>\n      ) : null}\n    </FormBuilderProvider>\n  );\n}\n',C=(0,m.lK)((0,m.DG)({component:(0,m.M8)({label:"First component"}),second:(0,m.M8)({label:"Second component"})}));function w(){const[e,n]=(0,i.useState)(C);return(0,r.jsxs)(s.b4,{form:e,formChanged:n,plugins:s.Yl,children:[(0,r.jsx)(s.z4,{}),(0,r.jsx)("h2",{children:"Example"}),(0,r.jsx)(s.VM,{theme:m.HX})]})}const y='import React, { useState } from "react";\nimport {\n  FormComponents,\n  FormBuilderProvider,\n  allPlugins,\n  FormPreview,\n} from "@fab4m/builder";\nimport { basic, createForm, serialize, textField } from "@fab4m/fab4m";\n\nconst form = serialize(\n  createForm({\n    component: textField({ label: "First component" }),\n    second: textField({ label: "Second component" }),\n  }),\n);\n\nexport default function FormPreviewExample() {\n  const [draft, changeDraft] = useState(form);\n  return (\n    <FormBuilderProvider\n      form={draft}\n      formChanged={changeDraft}\n      plugins={allPlugins}\n    >\n      <FormComponents />\n      <h2>Example</h2>\n      <FormPreview theme={basic} />\n    </FormBuilderProvider>\n  );\n}\n',P=(0,m.lK)((0,m.DG)());function S(){const[e,n]=(0,i.useState)(P),[o,t]=(0,i.useState)(null);return(0,r.jsxs)(s.b4,{form:e,formChanged:n,plugins:s.Yl,children:[(0,r.jsx)(s.z4,{actions:e=>(0,r.jsx)("button",{type:"button",onClick:()=>t(e.formKey),children:"Edit"})}),o?(0,r.jsx)("div",{className:"border bg-slate-100 p-4",children:(0,r.jsx)(s.GB,{componentKey:o,componentSaved:()=>t(null)})}):(0,r.jsx)("div",{className:"border bg-slate-100 p-4",children:(0,r.jsx)(s.qw,{attributes:{name:`component_${e.components.length}`,label:`Component ${e.components.length+1}`}})})]})}const k='import React, { useState } from "react";\nimport {\n  FormComponents,\n  FormBuilderProvider,\n  allPlugins,\n  NewComponent,\n  EditFormComponent,\n} from "@fab4m/builder";\nimport { createForm, serialize } from "@fab4m/fab4m";\n\nconst form = serialize(createForm());\nexport default function FullExample() {\n  const [draft, changeDraft] = useState(form);\n  const [currentKey, changeCurrentKey] = useState<null | string>(null);\n  return (\n    <FormBuilderProvider\n      form={draft}\n      formChanged={changeDraft}\n      plugins={allPlugins}\n    >\n      <FormComponents\n        actions={(props) => (\n          <button type="button" onClick={() => changeCurrentKey(props.formKey)}>\n            Edit\n          </button>\n        )}\n      />\n      {currentKey ? (\n        <div className="border bg-slate-100 p-4">\n          <EditFormComponent\n            componentKey={currentKey}\n            componentSaved={() => changeCurrentKey(null)}\n          />\n        </div>\n      ) : (\n        <div className="border bg-slate-100 p-4">\n          <NewComponent\n            attributes={{\n              name: `component_${draft.components.length}`,\n              label: `Component ${draft.components.length + 1}`,\n            }}\n          />\n        </div>\n      )}\n    </FormBuilderProvider>\n  );\n}\n',E={},B="Form builder",z={},A=[{value:"Installing",id:"installing",level:2},{value:"Set up the form you want to edit",id:"set-up-the-form-you-want-to-edit",level:2},{value:"Add the form builder provider context",id:"add-the-form-builder-provider-context",level:2},{value:"The FormComponents component",id:"the-formcomponents-component",level:2},{value:"Adding actions to each component",id:"adding-actions-to-each-component",level:2},{value:"Adding new components to the form",id:"adding-new-components-to-the-form",level:2},{value:"Editing components",id:"editing-components",level:2},{value:"Preview the form",id:"preview-the-form",level:2},{value:"Full example",id:"full-example",level:2}];function D(e){const n={a:"a",code:"code",h1:"h1",h2:"h2",header:"header",p:"p",pre:"pre",strong:"strong",...(0,a.R)(),...e.components};return(0,r.jsxs)(r.Fragment,{children:[(0,r.jsx)(n.header,{children:(0,r.jsx)(n.h1,{id:"form-builder",children:"Form builder"})}),"\n",(0,r.jsxs)(n.p,{children:["The ",(0,r.jsx)(n.code,{children:"@fab4m/builder"})," package provides the basic building blocks to create a visual\nform builder UI capable of constructing fab4m forms."]}),"\n",(0,r.jsx)(n.h2,{id:"installing",children:"Installing"}),"\n",(0,r.jsxs)(n.p,{children:["Install ",(0,r.jsx)(n.code,{children:"@fab4m/builder"})," package."]}),"\n",(0,r.jsx)(n.pre,{children:(0,r.jsx)(n.code,{className:"language-bash",children:"npm install --save @fab4m/builder\n"})}),"\n",(0,r.jsxs)(n.p,{children:["The form builder is built using tailwind css, so you will need to have that installed as well.\nRefer to their ",(0,r.jsx)(n.a,{href:"https://tailwindcss.com/docs/installation",children:"documentation page"})," for information on how to do that."]}),"\n",(0,r.jsx)(n.h2,{id:"set-up-the-form-you-want-to-edit",children:"Set up the form you want to edit"}),"\n",(0,r.jsxs)(n.p,{children:["The form builder works with any ",(0,r.jsx)(n.a,{href:"/docs/guide/serializing",children:"serialized"})," fab4m form, for example:"]}),"\n",(0,r.jsx)(n.pre,{children:(0,r.jsx)(n.code,{className:"language-jsx",children:'import { crateForm, serialize, textField } from "@fab4m/fab4m";\nconst formToEdit = serialize(\n  createForm({\n    component: textField({ label: "First component" }),\n    second: textField({ label: "Second component" }),\n  }),\n);\n'})}),"\n",(0,r.jsx)(n.h2,{id:"add-the-form-builder-provider-context",children:"Add the form builder provider context"}),"\n",(0,r.jsxs)(n.p,{children:["Place any components that should edit the form within the ",(0,r.jsx)(n.code,{children:"<FormBuilderProvider>"})," component. This will allow you to use the form builder hooks to manipulate the form."]}),"\n",(0,r.jsxs)(n.p,{children:["The form builder context takes in ",(0,r.jsx)(n.strong,{children:"plugins"})," for the different components, widgets and validators you\nwant to be able to work with inside of the form. Plugins for all fab4m core features are provided in the @fab4m/builder package."]}),"\n",(0,r.jsx)(n.p,{children:"an export containing all plugins is provided for convenience."}),"\n",(0,r.jsx)(n.pre,{children:(0,r.jsx)(n.code,{className:"language-jsx",children:'import { allPlugins, FromBuilderContext } form "@fab4m/builder"\n<FormBuilderProvider form={formToEdit} plugins={allPlugins}>\n/* You can use any part of the form builder in here. */\n</FormBuilderProvider>\n'})}),"\n",(0,r.jsx)(n.h2,{id:"the-formcomponents-component",children:"The FormComponents component"}),"\n",(0,r.jsxs)(n.p,{children:["Start by adding the ",(0,r.jsx)(n.code,{children:"<FormComponents>"})," component. This will give you a drag and drop interface\nwhere you can drag your components around."]}),"\n",(0,r.jsx)(l.A,{source:p,example:(0,r.jsx)(c,{})}),"\n",(0,r.jsx)(n.h2,{id:"adding-actions-to-each-component",children:"Adding actions to each component"}),"\n",(0,r.jsx)(n.p,{children:"In the first step we're just able to drag the components around. The next step is to be able\nto perform actions on them."}),"\n",(0,r.jsx)(n.p,{children:"We do this by adding actions to each component:"}),"\n",(0,r.jsx)(l.A,{source:h,example:(0,r.jsx)(f,{})}),"\n",(0,r.jsx)(n.h2,{id:"adding-new-components-to-the-form",children:"Adding new components to the form"}),"\n",(0,r.jsxs)(n.p,{children:["The ",(0,r.jsx)(n.code,{children:"NewComponent"})," component can be used to easily provide a gallery of all availbale components that you can add, and offers the user an option to add them:"]}),"\n",(0,r.jsx)(l.A,{source:g,example:(0,r.jsx)(x,{})}),"\n",(0,r.jsx)(n.h2,{id:"editing-components",children:"Editing components"}),"\n",(0,r.jsxs)(n.p,{children:["You can use the ",(0,r.jsx)(n.code,{children:"EditFormComponent"})," to be able to edit any component in the form:"]}),"\n",(0,r.jsx)(l.A,{source:v,example:(0,r.jsx)(F,{})}),"\n",(0,r.jsx)(n.h2,{id:"preview-the-form",children:"Preview the form"}),"\n",(0,r.jsxs)(n.p,{children:["The form builder package provides a ",(0,r.jsx)(n.code,{children:"FormPreview"})," component that can be used to easily preview the form:"]}),"\n",(0,r.jsx)(l.A,{source:y,example:(0,r.jsx)(w,{})}),"\n",(0,r.jsx)(n.h2,{id:"full-example",children:"Full example"}),"\n",(0,r.jsx)(n.p,{children:"The example below combines all the bits below to make a complete form builder."}),"\n",(0,r.jsx)(l.A,{source:k,example:(0,r.jsx)(S,{})})]})}function K(e={}){const{wrapper:n}={...(0,a.R)(),...e.components};return n?(0,r.jsx)(n,{...e,children:(0,r.jsx)(D,{...e})}):D(e)}},53603:(e,n,o)=>{o.d(n,{A:()=>s});o(96540);var t=o(35363),r=o(55875),a=o(65537),l=o(79329),i=o(74848);function s(e){return(0,i.jsxs)(a.A,{children:[(0,i.jsx)(l.A,{value:"code",label:"Code",children:(0,i.jsx)(r.A,{language:"jsx",children:e.source})}),(0,i.jsx)(l.A,{value:"example",label:"Example",children:(0,i.jsx)(t.A,{children:()=>e.example})})]})}}}]);