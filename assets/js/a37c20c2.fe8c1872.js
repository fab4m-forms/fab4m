"use strict";(self.webpackChunkdocs=self.webpackChunkdocs||[]).push([[429],{3459:(e,t,n)=>{n.r(t),n.d(t,{assets:()=>h,contentTitle:()=>m,default:()=>f,frontMatter:()=>d,metadata:()=>b,toc:()=>y});var o=n(7462),r=n(7294),l=n(3905),i=n(1809),u=n(891);const a=(0,u.Np)({city:(0,u.$S)({label:"City"}),inCityCenter:(0,u.Qr)({label:"Do you live in the city center?"}),streetCars:(0,u.Qr)({label:"Do you use street cars?",rules:[["city",(0,u.fS)("Gothenburg")],["inCityCenter",(0,u.fS)(!0)]]}),subway:(0,u.Qr)({label:"Do you use the subway?",rules:[["city",(0,u.fS)("Stockholm")]]}),usage:(0,u.OL)({label:"How may times do you use public transport per week?"}),expensive:(0,u.Qr)({label:"Do you think public transport is too expensive?",rules:[["usage",(0,u.Fp)(3)]]})});function s(){return r.createElement(u.H,{form:a,hideSubmit:!0})}const c=(0,u.Np)({city:(0,u.$S)({label:"City"}),usage:(0,u.OL)({label:"How may times do you use public transport per week?"}),expensive:(0,u.Qr)({label:"Do you think public transport is too expensive?",rules:[(0,u.or)([["city",(0,u.fS)("Gothenburg")],["usage",(0,u.Fp)(5)]])]})});function p(){return r.createElement(u.H,{form:c,hideSubmit:!0})}const d={sidebar_position:7},m="Component Rules",b={unversionedId:"guide/rules",id:"guide/rules",title:"Component Rules",description:"There might be situations where you want to optionally show or hide some components",source:"@site/docs/guide/rules.mdx",sourceDirName:"guide",slug:"/guide/rules",permalink:"fab4m/docs/guide/rules",draft:!1,tags:[],version:"current",sidebarPosition:7,frontMatter:{sidebar_position:7},sidebar:"tutorialSidebar",previous:{title:"Component Validators",permalink:"fab4m/docs/guide/validators"},next:{title:"Validation with JSON Schema",permalink:"fab4m/docs/guide/validation"}},h={},y=[{value:"Adding rules to a component",id:"adding-rules-to-a-component",level:2},{value:"Rule groups",id:"rule-groups",level:2},{value:"Custom rules",id:"custom-rules",level:2},{value:"Check out the widget library",id:"check-out-the-widget-library",level:2}],g={toc:y};function f(e){let{components:t,...n}=e;return(0,l.kt)("wrapper",(0,o.Z)({},g,n,{components:t,mdxType:"MDXLayout"}),(0,l.kt)("h1",{id:"component-rules"},"Component Rules"),(0,l.kt)("p",null,"There might be situations where you want to optionally show or hide some components\ndepending on the input in other components. This is what component rules are for."),(0,l.kt)("h2",{id:"adding-rules-to-a-component"},"Adding rules to a component"),(0,l.kt)("p",null,"When defining your components you can add a list of rules that needs to be fulfilled\nin order for the component to be visible:"),(0,l.kt)(i.Z,{source:'import * as React from "react";\nimport {\n  textField,\n  integerField,\n  booleanField,\n  equals,\n  max,\n  createForm,\n  StatefulFormView,\n} from "@fab4m/fab4m";\n\nconst form = createForm({\n  city: textField({ label: "City" }),\n  inCityCenter: booleanField({ label: "Do you live in the city center?" }),\n  streetCars: booleanField({\n    label: "Do you use street cars?",\n    rules: [\n      ["city", equals("Gothenburg")],\n      ["inCityCenter", equals(true)],\n    ],\n  }),\n  subway: booleanField({\n    label: "Do you use the subway?",\n    rules: [["city", equals("Stockholm")]],\n  }),\n  usage: integerField({\n    label: "How may times do you use public transport per week?",\n  }),\n  expensive: booleanField({\n    label: "Do you think public transport is too expensive?",\n    rules: [["usage", max(3)]],\n  }),\n});\n\nexport default function BasicRules() {\n  return <StatefulFormView form={form} hideSubmit={true} />;\n}\n',example:(0,l.kt)(s,{mdxType:"BasicRules"}),mdxType:"Example"}),(0,l.kt)("h2",{id:"rule-groups"},"Rule groups"),(0,l.kt)("p",null,"By default, rules are logically ANDed together."),(0,l.kt)("p",null,"You can use logical groups to override this."),(0,l.kt)(i.Z,{source:'import React from "react";\nimport {\n  textField,\n  integerField,\n  booleanField,\n  equals,\n  max,\n  createForm,\n  StatefulFormView,\n  or,\n} from "@fab4m/fab4m";\n\nconst form = createForm({\n  city: textField({ label: "City" }),\n  usage: integerField({\n    label: "How may times do you use public transport per week?",\n  }),\n  expensive: booleanField({\n    label: "Do you think public transport is too expensive?",\n    rules: [\n      or([\n        ["city", equals("Gothenburg")],\n        ["usage", max(5)],\n      ]),\n    ],\n  }),\n});\n\nexport default function BasicRules() {\n  return <StatefulFormView form={form} hideSubmit={true} />;\n}\n',example:(0,l.kt)(p,{mdxType:"RuleGroups"}),mdxType:"Example"}),(0,l.kt)("p",null,"Rule functions can also be nested:"),(0,l.kt)("pre",null,(0,l.kt)("code",{parentName:"pre",className:"language-jsx"},'expensive: booleanField({\n  title: "Do you think public transport is too expensive?",\n  rules: [or([equals("city", "Gothenburg"), and([greaterThan("usage", 5), lessThan(10)]))],\n}),\n')),(0,l.kt)("h2",{id:"custom-rules"},"Custom rules"),(0,l.kt)("p",null,"You can use the callback rule to provide any logic you want for your form."),(0,l.kt)("h2",{id:"check-out-the-widget-library"},"Check out the widget library"),(0,l.kt)("p",null,"Fab4m comes with several rules, check them out in the ",(0,l.kt)("em",{parentName:"p"},"Rule reference"),". Also, check the ",(0,l.kt)("em",{parentName:"p"},"extension guide")," on how to create your own widgets."))}f.isMDXComponent=!0}}]);