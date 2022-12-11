"use strict";(self.webpackChunkdocs=self.webpackChunkdocs||[]).push([[576],{4783:(e,n,t)=>{t.r(n),t.d(n,{assets:()=>y,contentTitle:()=>h,default:()=>E,frontMatter:()=>b,metadata:()=>v,toc:()=>k});var a=t(7462),r=t(7294),i=t(3905),l=t(1809),o=t(891);const d=(0,o.Np)({name:(0,o.$S)({label:"Your name",description:"Enter your full name",required:!0}),email:(0,o.zU)({label:"Your email",description:"Enter your email address"}),website:(0,o.KQ)({label:"Show us your beautiful website"}),picture:(0,o.At)({label:"Upload a picture"}),agree:(0,o.Qr)({label:"I agree to the terms and conditons",required:!0})});function m(){const[e,n]=(0,r.useState)(void 0),[t,a]=(0,r.useState)(void 0);return d.onSubmit(((e,t)=>{if(e.preventDefault(),n(t),t.picture.type.startsWith("image")){const e=new FileReader;e.onload=function(e){a(e.target.result)},e.readAsDataURL(t.picture)}})),r.createElement("div",null,r.createElement(o.H,{form:d}),e&&r.createElement("div",{className:"card"},r.createElement("div",{className:"card__header"},r.createElement("h3",null,e.name)),r.createElement("div",{className:"card__body"},r.createElement("div",null,t&&r.createElement("img",{className:"avatar__photo avatar__photo--xl",src:t,width:"120",height:"120"})),r.createElement("div",null,r.createElement("strong",null,e.name)),r.createElement("div",null,r.createElement("strong",null,e.email)),r.createElement("div",null,r.createElement("strong",null,e.website)))))}const s=(0,o.Np)({foods:(0,o.$S)({label:"What would you like to eat?",minItems:2,maxItems:4,multiple:!0,required:!0}),allergies:(0,o.$S)({label:"Specify your allergies",description:"Specify any allergies you have.",multiple:!0})});function u(){const[e,n]=(0,r.useState)(void 0);return s.onSubmit(((e,t)=>{e.preventDefault(),n(t)})),r.createElement(r.Fragment,null,r.createElement(o.H,{form:s}),e&&r.createElement("div",null,r.createElement("strong",null,"Your food selection"),r.createElement("ul",null,e.foods.map(((e,n)=>r.createElement("li",{key:n},e)))),r.createElement("strong",null,"Allergies"),r.createElement("ul",null,e.allergies.map(((e,n)=>r.createElement("li",{key:n},e))))))}const c=(0,o.Np)({name:(0,o.$S)({label:"Band name"}),info:(0,o.ru)({label:"Band info"},{genre:(0,o.$S)({label:"Genre",description:"Genre",required:!0}),active_since:(0,o.OL)({label:"Active since",description:"Enter the year from which the band has been active"})}),performances:(0,o.ru)({label:"Performances",multiple:!0,minItems:1},{city:(0,o.$S)({label:"City",description:"Enter your full name",required:!0}),audience_count:(0,o.OL)({label:"People in the audience",required:!0})})});function p(){const[e,n]=(0,r.useState)(void 0);return c.onSubmit(((e,t)=>{e.preventDefault(),n(t)})),r.createElement("div",null,r.createElement(o.H,{form:c}),e&&r.createElement(r.Fragment,null,r.createElement("h4",null,e.name),r.createElement("dl",null,r.createElement("dt",null,"Genre"),r.createElement("dd",null,e.info.genre),r.createElement("dt",null,"Active since"),r.createElement("dd",null,e.info.active_since)),r.createElement("h5",null,"Performances"),r.createElement("ul",null,e.performances.map(((e,n)=>r.createElement("li",{key:n},e.city," (in the audience: ",e.count,")"))))))}const f=(0,o.Np)({name:(0,o.$S)({label:"Your name",description:"Enter your full name",required:!0}),email:(0,o.zU)({label:"Email"}),break1:(0,o.Pr)({}),age:(0,o.OL)({label:"Age"}),city:(0,o.$S)({label:"City"}),break2:(0,o.Pr)({}),terms:(0,o.kQ)({},(()=>r.createElement("div",null,"Very long terms and conditions"))),agree:(0,o.Qr)({label:"I agree to the terms and conditions",required:!0})});function g(){return f.onSubmit((e=>{e.preventDefault()})),r.createElement(o.H,{form:f})}const b={sidebar_position:1},h="Creating forms",v={unversionedId:"guide/define-a-form",id:"guide/define-a-form",title:"Creating forms",description:"A form consists of Components. A component can be anything, but usually it's",source:"@site/docs/guide/define-a-form.mdx",sourceDirName:"guide",slug:"/guide/define-a-form",permalink:"/docs/guide/define-a-form",draft:!1,tags:[],version:"current",sidebarPosition:1,frontMatter:{sidebar_position:1},sidebar:"tutorialSidebar",previous:{title:"Introduction",permalink:"/docs/intro"},next:{title:"Rendering forms",permalink:"/docs/guide/rendering-the-form"}},y={},k=[{value:"Forms for data input",id:"forms-for-data-input",level:2},{value:"Handling multiple data",id:"handling-multiple-data",level:2},{value:"Grouping data together",id:"grouping-data-together",level:2},{value:"Page breaks",id:"page-breaks",level:2}],F={toc:k};function E(e){let{components:n,...t}=e;return(0,i.kt)("wrapper",(0,a.Z)({},F,t,{components:n,mdxType:"MDXLayout"}),(0,i.kt)("h1",{id:"creating-forms"},"Creating forms"),(0,i.kt)("p",null,"A form consists of ",(0,i.kt)("em",{parentName:"p"},"Components"),". A component can be anything, but usually it's\na form field like a text field, but it can also be just a block of text."),(0,i.kt)("p",null,"Each component have a few common properties, like the name, label and the description.\nSee the the list of components for details."),(0,i.kt)("h2",{id:"forms-for-data-input"},"Forms for data input"),(0,i.kt)("p",null,"Fabform provides components for most kinds of data input. The following example demonstrates a form\nwith text, email, url and boolean data."),(0,i.kt)(l.Z,{source:'import React, { useState } from "react";\nimport {\n  createForm,\n  textField,\n  booleanField,\n  emailField,\n  fileField,\n  urlField,\n  StatefulFormView,\n} from "@fab4m/fab4m";\n\nconst form = createForm({\n  name: textField({\n    label: "Your name",\n    description: "Enter your full name",\n    required: true,\n  }),\n  email: emailField({\n    label: "Your email",\n    description: "Enter your email address",\n  }),\n  website: urlField({\n    label: "Show us your beautiful website",\n  }),\n  picture: fileField({\n    label: "Upload a picture",\n  }),\n  agree: booleanField({\n    label: "I agree to the terms and conditons",\n    required: true,\n  }),\n});\n\nexport default function FormFields() {\n  // We will store the submitted profile in this state.\n  const [profile, changeProfile] = useState(undefined);\n  // As an added bonus we will load any uploaded images so we can display them.\n  const [image, changeImage] = useState(undefined);\n  // The data provided is a validated object with the data.\n  form.onSubmit((e, submittedData) => {\n    e.preventDefault();\n    changeProfile(submittedData);\n    // Fab4m provides us with a file object that we can then load.\n    if (submittedData.picture.type.startsWith("image")) {\n      const reader = new FileReader();\n      reader.onload = function (e) {\n        changeImage(e.target.result);\n      };\n      reader.readAsDataURL(submittedData.picture);\n    }\n  });\n  return (\n    <div>\n      <StatefulFormView form={form} />\n      {profile && (\n        <div className="card">\n          <div className="card__header">\n            <h3>{profile.name}</h3>\n          </div>\n          <div className="card__body">\n            <div>\n              {image && (\n                <img\n                  className="avatar__photo avatar__photo--xl"\n                  src={image}\n                  width="120"\n                  height="120"\n                />\n              )}\n            </div>\n            <div>\n              <strong>{profile.name}</strong>\n            </div>\n            <div>\n              <strong>{profile.email}</strong>\n            </div>\n            <div>\n              <strong>{profile.website}</strong>\n            </div>\n          </div>\n        </div>\n      )}\n    </div>\n  );\n}\n',example:(0,i.kt)(m,{mdxType:"FormFields"}),mdxType:"Example"}),(0,i.kt)("h2",{id:"handling-multiple-data"},"Handling multiple data"),(0,i.kt)("p",null,"Any component can be defined as a multiple compnent, which means that instead of just collecting one result, an array with results will be collected."),(0,i.kt)(l.Z,{source:'import React, { useState } from "react";\nimport { createForm, textField, StatefulFormView } from "@fab4m/fab4m";\n\nconst form = createForm({\n  foods: textField({\n    label: "What would you like to eat?",\n    minItems: 2,\n    maxItems: 4,\n    multiple: true,\n    required: true,\n  }),\n  allergies: textField({\n    label: "Specify your allergies",\n    description: "Specify any allergies you have.",\n    multiple: true,\n  }),\n});\n\nexport default function FormFields() {\n  const [data, changeData] = useState(undefined);\n  form.onSubmit((e, submittedData) => {\n    e.preventDefault();\n    // The submitted data is an object with two arrays, allergies and foods.\n    changeData(submittedData);\n  });\n  return (\n    <>\n      <StatefulFormView form={form} />\n      {data && (\n        <div>\n          <strong>Your food selection</strong>\n          <ul>\n            {data.foods.map((food, i) => (\n              <li key={i}>{food}</li>\n            ))}\n          </ul>\n          <strong>Allergies</strong>\n          <ul>\n            {data.allergies.map((allergy, i) => (\n              <li key={i}>{allergy}</li>\n            ))}\n          </ul>\n        </div>\n      )}\n    </>\n  );\n}\n',example:(0,i.kt)(u,{mdxType:"MultipleFields"}),mdxType:"Example"}),(0,i.kt)("h2",{id:"grouping-data-together"},"Grouping data together"),(0,i.kt)("p",null,"If you have a complex form you might need to group several fields together in a group. Fab4m makes this possible through the ",(0,i.kt)("inlineCode",{parentName:"p"},"group")," component. When you define your group component you also add all the child components to the group."),(0,i.kt)("p",null,"Each group component you add will be represented as an object in your submitted data. As with all other components, group components can have multiple values."),(0,i.kt)(l.Z,{source:'import React, { useState } from "react";\nimport {\n  createForm,\n  textField,\n  integerField,\n  group,\n  StatefulFormView,\n} from "@fab4m/fab4m";\n\nconst form = createForm({\n  name: textField({ label: "Band name" }),\n  info: group(\n    { label: "Band info" },\n    {\n      genre: textField({\n        label: "Genre",\n        description: "Genre",\n        required: true,\n      }),\n      active_since: integerField({\n        label: "Active since",\n        description: "Enter the year from which the band has been active",\n      }),\n    }\n  ),\n  // Groups can be multiple.\n  performances: group(\n    { label: "Performances", multiple: true, minItems: 1 },\n    {\n      city: textField({\n        label: "City",\n        description: "Enter your full name",\n        required: true,\n      }),\n      audience_count: integerField({\n        label: "People in the audience",\n        required: true,\n      }),\n    }\n  ),\n});\n\nexport default function GroupedFields() {\n  const [band, changeBand] = useState(undefined);\n  form.onSubmit((e, submittedData) => {\n    e.preventDefault();\n    changeBand(submittedData);\n  });\n  return (\n    <div>\n      <StatefulFormView form={form} />\n      {band && (\n        <>\n          <h4>{band.name}</h4>\n          <dl>\n            {/*The band info group data is represented as an object*/}\n            <dt>Genre</dt>\n            <dd>{band.info.genre}</dd>\n            <dt>Active since</dt>\n            <dd>{band.info.active_since}</dd>\n          </dl>\n          <h5>Performances</h5>\n          <ul>\n            {/*Multiple groups are represented as an array of objects.*/}\n            {band.performances.map((performance, i) => (\n              <li key={i}>\n                {performance.city} (in the audience: {performance.count})\n              </li>\n            ))}\n          </ul>\n        </>\n      )}\n    </div>\n  );\n}\n',example:(0,i.kt)(p,{mdxType:"GroupedComponents"}),mdxType:"Example"}),(0,i.kt)("h2",{id:"page-breaks"},"Page breaks"),(0,i.kt)("p",null,"Large forms can be split up into multiple parts. This is done using the ",(0,i.kt)("inlineCode",{parentName:"p"},"pageBreak"),"\ncomponent. All data will be validated before each page break."),(0,i.kt)(l.Z,{source:'import React, { useState } from "react";\nimport {\n  createForm,\n  textField,\n  booleanField,\n  integerField,\n  emailField,\n  content,\n  pageBreak,\n  StatefulFormView,\n} from "@fab4m/fab4m";\n\nconst form = createForm({\n  name: textField({\n    label: "Your name",\n    description: "Enter your full name",\n    required: true,\n  }),\n  email: emailField({ label: "Email" }),\n  // This is the first page break. The user will be asked to continue here.\n  // After the user has continued, they can go back to edit the previous\n  // parts.\n  break1: pageBreak({}),\n  age: integerField({ label: "Age" }),\n  city: textField({ label: "City" }),\n  // You can add as many page breaks as necessary.\n  break2: pageBreak({}),\n  terms: content({}, () => <div>Very long terms and conditions</div>),\n  agree: booleanField({\n    label: "I agree to the terms and conditions",\n    required: true,\n  }),\n});\n\nexport default function PageBreaks() {\n  form.onSubmit((e) => {\n    e.preventDefault();\n  });\n  return <StatefulFormView form={form} />;\n}\n',example:(0,i.kt)(g,{mdxType:"PageBreaks"}),mdxType:"Example"}))}E.isMDXComponent=!0}}]);