"use strict";(self.webpackChunkdocs=self.webpackChunkdocs||[]).push([[4240],{1150:(e,t,n)=>{n.r(t),n.d(t,{assets:()=>h,contentTitle:()=>p,default:()=>v,frontMatter:()=>m,metadata:()=>f,toc:()=>b});var i=n(7462),o=n(7294),a=n(3905),r=n(1809),l=n(891);const s=(0,l.Np)({likeBio:(0,l.Qr)({label:"Do you like to talk about yourself?"}),bio:[["likeBio",(0,l.Gg)(),(0,l.Zv)({label:"You have to write your bio now!",required:!0})],(0,l.Zv)({label:"Biography"})]});function u(){return o.createElement(l.H,{form:s,hideSubmit:!0})}const d=(0,l.Np)({city:(0,l.$S)({label:"Select your city",widget:(0,l.Gn)(["London","Paris","New york"])}),attractions:[["city",(0,l.fS)("Paris"),(0,l.Qr)({label:"I visited the eiffel tower",required:!0})],["city",(0,l.fS)("London"),(0,l.Qr)({label:"I visited Buckinghamn palace",required:!0})],["city",(0,l.fS)("New york"),(0,l.Qr)({label:"I visited the statue of liberty",required:!0})],(0,l.kQ)({},(()=>"Select a city to tell us if you visited a popular attraction!"))]});function c(){return o.createElement(l.H,{form:d,hideSubmit:!0})}const m={sidebar_position:7},p="Component Variants",f={unversionedId:"guide/variants",id:"guide/variants",title:"Component Variants",description:"Component variants allows you to change all aspects of a form component based",source:"@site/docs/guide/variants.mdx",sourceDirName:"guide",slug:"/guide/variants",permalink:"/docs/guide/variants",draft:!1,tags:[],version:"current",sidebarPosition:7,frontMatter:{sidebar_position:7},sidebar:"tutorialSidebar",previous:{title:"Component Rules",permalink:"/docs/guide/rules"},next:{title:"Validation with JSON Schema",permalink:"/docs/guide/validation"}},h={},b=[{value:"Variant selection",id:"variant-selection",level:2}],y={toc:b};function v(e){let{components:t,...n}=e;return(0,a.kt)("wrapper",(0,i.Z)({},y,n,{components:t,mdxType:"MDXLayout"}),(0,a.kt)("h1",{id:"component-variants"},"Component Variants"),(0,a.kt)("p",null,"Component variants allows you to change all aspects of a form component based\non the state of the rest of the form."),(0,a.kt)("p",null,"While rules allows you to show and hide different component based on the form state,\nvariants let's you customize everything."),(0,a.kt)("p",null,"Here's a simple example where we make the form component required or not, depending\non the form state:"),(0,a.kt)(r.Z,{source:'import * as React from "react";\nimport {\n  textAreaField,\n  booleanField,\n  exists,\n  createForm,\n  StatefulFormView,\n} from "@fab4m/fab4m";\n\nconst form = createForm({\n  likeBio: booleanField({ label: "Do you like to talk about yourself?" }),\n  bio: [\n    // This variant is defined like a rule. If the rule is true,\n    // then the variant is activated.\n    [\n      "likeBio",\n      exists(),\n      textAreaField({\n        label: "You have to write your bio now!",\n        required: true,\n      }),\n    ],\n    // You can also provide a component without a rule. If you reach this point,\n    // then the component will be rendered.\n    textAreaField({ label: "Biography" }),\n  ],\n});\n\nexport default function RequiredWhenPresent() {\n  return <StatefulFormView form={form} hideSubmit={true} />;\n}\n',example:(0,a.kt)(u,{mdxType:"RequiredWhenPresent"}),mdxType:"Example"}),(0,a.kt)("h2",{id:"variant-selection"},"Variant selection"),(0,a.kt)("p",null,"A variant array is evaluated in order, and the first variant where the rule passes\nis selected. If you provide a component without a rule, it will always be selected."),(0,a.kt)(r.Z,{source:'import * as React from "react";\nimport {\n  booleanField,\n  textField,\n  equals,\n  content,\n  createForm,\n  StatefulFormView,\n  selectWidget,\n} from "@fab4m/fab4m";\n\nconst form = createForm({\n  city: textField({\n    label: "Select your city",\n    widget: selectWidget(["London", "Paris", "New york"]),\n  }),\n  attractions: [\n    // This variant is defined like a rule. If the rule is true,\n    // then the variant is activated.\n    [\n      "city",\n      equals("Paris"),\n      booleanField({\n        label: "I visited the eiffel tower",\n        required: true,\n      }),\n    ],\n    [\n      "city",\n      equals("London"),\n      booleanField({\n        label: "I visited Buckinghamn palace",\n        required: true,\n      }),\n    ],\n    [\n      "city",\n      equals("New york"),\n      booleanField({\n        label: "I visited the statue of liberty",\n        required: true,\n      }),\n    ],\n    content(\n      {},\n      () => "Select a city to tell us if you visited a popular attraction!"\n    ),\n  ],\n});\n\nexport default function VariantSelection() {\n  return <StatefulFormView form={form} hideSubmit={true} />;\n}\n',example:(0,a.kt)(c,{mdxType:"VariantSelection"}),mdxType:"Example"}))}v.isMDXComponent=!0}}]);