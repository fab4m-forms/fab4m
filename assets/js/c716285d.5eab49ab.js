(self.webpackChunkdocs=self.webpackChunkdocs||[]).push([[4240],{117:(e,t,n)=>{"use strict";n.r(t),n.d(t,{assets:()=>g,contentTitle:()=>y,default:()=>k,frontMatter:()=>b,metadata:()=>v,toc:()=>S});var r=n(7462),a=n(7294),o=n(3905),i=n(1809),l=n(891);const u=(0,l.Np)({likeBio:(0,l.Qr)({label:"Do you like to talk about yourself?"}),bio:[["likeBio",(0,l.Gg)(),(0,l.Zv)({label:"You have to write your bio now!",required:!0})],(0,l.Zv)({label:"Biography"})]});function s(){return a.createElement(l.H,{form:u,hideSubmit:!0})}const c=(0,l.Np)({city:(0,l.$S)({label:"Select your city",widget:(0,l.Gn)(["London","Paris","New york"])}),attractions:[["city",(0,l.fS)("Paris"),(0,l.Qr)({label:"I visited the eiffel tower",required:!0})],["city",(0,l.fS)("London"),(0,l.Qr)({label:"I visited Buckinghamn palace",required:!0})],["city",(0,l.fS)("New york"),(0,l.Qr)({label:"I visited the statue of liberty",required:!0})],(0,l.kQ)({},(()=>"Select a city to tell us if you visited a popular attraction!"))]});function d(){return a.createElement(l.H,{form:c,hideSubmit:!0})}var f=n(8966),m=n.n(f);const p=(0,l.Np)({transport:(0,l.$S)({label:"How do you get to work?",required:!0,widget:(0,l.Gn)(["Car","Public transport"])}),questions:[["transport",(0,l.fS)("Car"),(0,l.ru)({label:"Questions"},{car:(0,l.$S)({label:"What type of car do you have?",required:!0})})],["transport",(0,l.fS)("Public transport"),(0,l.ru)({label:"Questions"},{publicTransport:(0,l.$S)({label:"What type of public transport do you use?",required:!0})})]]});function h(){const[e,t]=a.useState((0,l.$H)(p));return p.onDataChange((e=>{t((0,l.$H)(p,e))})),a.createElement("div",null,a.createElement(l.H,{form:p,hideSubmit:!0}),a.createElement("h4",null,"Here's the schema:"),a.createElement("pre",null,m()(e,null,2,80)))}const b={sidebar_position:7},y="Component Variants",v={unversionedId:"guide/variants",id:"guide/variants",title:"Component Variants",description:"Component variants allows you to change all aspects of a form component based",source:"@site/docs/guide/variants.mdx",sourceDirName:"guide",slug:"/guide/variants",permalink:"/docs/guide/variants",draft:!1,tags:[],version:"current",sidebarPosition:7,frontMatter:{sidebar_position:7},sidebar:"tutorialSidebar",previous:{title:"Component Rules",permalink:"/docs/guide/rules"},next:{title:"Validation with JSON Schema",permalink:"/docs/guide/validation"}},g={},S=[{value:"Variant selection",id:"variant-selection",level:2},{value:"A note about variants and JSON Schema",id:"a-note-about-variants-and-json-schema",level:2}],w={toc:S};function k(e){let{components:t,...n}=e;return(0,o.kt)("wrapper",(0,r.Z)({},w,n,{components:t,mdxType:"MDXLayout"}),(0,o.kt)("h1",{id:"component-variants"},"Component Variants"),(0,o.kt)("p",null,"Component variants allows you to change all aspects of a form component based\non the state of the rest of the form."),(0,o.kt)("p",null,"While rules allows you to show and hide different component based on the form state,\nvariants lets you customize everything."),(0,o.kt)("p",null,"Here's a simple example where we make the form component required or not, depending\non the form state:"),(0,o.kt)(i.Z,{source:'import * as React from "react";\nimport {\n  textAreaField,\n  booleanField,\n  exists,\n  createForm,\n  StatefulFormView,\n} from "@fab4m/fab4m";\n\nconst form = createForm({\n  likeBio: booleanField({ label: "Do you like to talk about yourself?" }),\n  bio: [\n    // This variant is defined like a rule. If the rule is true,\n    // then the variant is activated.\n    [\n      "likeBio",\n      exists(),\n      textAreaField({\n        label: "You have to write your bio now!",\n        required: true,\n      }),\n    ],\n    // You can also provide a component without a rule. If you reach this point,\n    // then the component will be rendered.\n    textAreaField({ label: "Biography" }),\n  ],\n});\n\nexport default function RequiredWhenPresent() {\n  return <StatefulFormView form={form} hideSubmit={true} />;\n}\n',example:(0,o.kt)(s,{mdxType:"RequiredWhenPresent"}),mdxType:"Example"}),(0,o.kt)("h2",{id:"variant-selection"},"Variant selection"),(0,o.kt)("p",null,"A variant array is evaluated in order, and the first variant where the rule passes\nis selected. If you provide a component without a rule, it will always be selected."),(0,o.kt)(i.Z,{source:'import * as React from "react";\nimport {\n  booleanField,\n  textField,\n  equals,\n  content,\n  createForm,\n  StatefulFormView,\n  selectWidget,\n} from "@fab4m/fab4m";\n\nconst form = createForm({\n  city: textField({\n    label: "Select your city",\n    widget: selectWidget(["London", "Paris", "New york"]),\n  }),\n  attractions: [\n    // This variant is defined like a rule. If the rule is true,\n    // then the variant is activated.\n    [\n      "city",\n      equals("Paris"),\n      booleanField({\n        label: "I visited the eiffel tower",\n        required: true,\n      }),\n    ],\n    [\n      "city",\n      equals("London"),\n      booleanField({\n        label: "I visited Buckinghamn palace",\n        required: true,\n      }),\n    ],\n    [\n      "city",\n      equals("New york"),\n      booleanField({\n        label: "I visited the statue of liberty",\n        required: true,\n      }),\n    ],\n    content(\n      {},\n      () => "Select a city to tell us if you visited a popular attraction!"\n    ),\n  ],\n});\n\nexport default function VariantSelection() {\n  return <StatefulFormView form={form} hideSubmit={true} />;\n}\n',example:(0,o.kt)(d,{mdxType:"VariantSelection"}),mdxType:"Example"}),(0,o.kt)("h2",{id:"a-note-about-variants-and-json-schema"},"A note about variants and JSON Schema"),(0,o.kt)("p",null,"When you use variants, you need to provide the data you want to validate when you generate your\nJSON Schema, for example:"),(0,o.kt)(i.Z,{source:'import * as React from "react";\nimport * as beautify from "json-beautify";\nimport {\n  textField,\n  equals,\n  createForm,\n  StatefulFormView,\n  selectWidget,\n  group,\n  generateSchema,\n} from "@fab4m/fab4m";\nimport { Schema } from "ajv";\n\nconst form = createForm({\n  transport: textField({\n    label: "How do you get to work?",\n    required: true,\n    widget: selectWidget(["Car", "Public transport"]),\n  }),\n\n  questions: [\n    [\n      "transport",\n      equals("Car"),\n      group(\n        { label: "Questions" },\n        {\n          car: textField({\n            label: "What type of car do you have?",\n            required: true,\n          }),\n        },\n      ),\n    ],\n    [\n      "transport",\n      equals("Public transport"),\n      group(\n        { label: "Questions" },\n        {\n          publicTransport: textField({\n            label: "What type of public transport do you use?",\n            required: true,\n          }),\n        },\n      ),\n    ],\n  ],\n});\n\nexport default function VariantSchema() {\n  const [schema, changeSchema] = React.useState<string | Schema>(\n    generateSchema(form),\n  );\n  form.onDataChange((data) => {\n    changeSchema(generateSchema(form, data));\n  });\n  return (\n    <div>\n      <StatefulFormView form={form} hideSubmit={true} />\n      <h4>Here\'s the schema:</h4>\n      <pre>{beautify.default(schema, null, 2, 80)}</pre>\n    </div>\n  );\n}\n',example:(0,o.kt)(h,{mdxType:"VariantSchema"}),mdxType:"Example"}))}k.isMDXComponent=!0},8966:e=>{var t,n,r,a=/[\\\"\u0000-\u001f\u007f-\u009f\u00ad\u0600-\u0604\u070f\u17b4\u17b5\u200c-\u200f\u2028-\u202f\u2060-\u206f\ufeff\ufff0-\uffff]/g,o={"\b":"\\b","\t":"\\t","\n":"\\n","\f":"\\f","\r":"\\r",'"':'\\"',"\\":"\\\\"};function i(e){return a.lastIndex=0,a.test(e)?'"'+e.replace(a,(function(e){var t=o[e];return"string"==typeof t?t:"\\u"+("0000"+e.charCodeAt(0).toString(16)).slice(-4)}))+'"':'"'+e+'"'}function l(e,a,o){var u,s,c,d,f,m=t,p=a[e];switch(p&&"object"==typeof p&&"function"==typeof p.toJSON&&(p=p.toJSON(e)),"function"==typeof r&&(p=r.call(a,e,p)),typeof p){case"string":return i(p);case"number":return isFinite(p)?String(p):"null";case"boolean":case"null":return String(p);case"object":if(!p)return"null";if(t+=n,f=[],"[object Array]"===Object.prototype.toString.apply(p)){for(d=p.length,u=0;u<d;u+=1)f[u]=l(u,p,o)||"null";return c=0===f.length?"[]":t?t.length+f.join(", ").length+4>o?"[\n"+t+f.join(",\n"+t)+"\n"+m+"]":"[ "+f.join(", ")+" ]":"["+f.join(",")+"]",t=m,c}if(r&&"object"==typeof r)for(d=r.length,u=0;u<d;u+=1)"string"==typeof r[u]&&(c=l(s=r[u],p,o))&&f.push(i(s)+(t?": ":":")+c);else for(s in p)Object.prototype.hasOwnProperty.call(p,s)&&(c=l(s,p,o))&&f.push(i(s)+(t?": ":":")+c);return c=0===f.length?"{}":t?t.length+f.join(", ").length+4>o?"{\n"+t+f.join(",\n"+t)+"\n"+m+"}":"{ "+f.join(", ")+" }":"{"+f.join(",")+"}",t=m,c}}e.exports=function(e,a,o,i){var u;if(t="",n="",i||(i=0),"number"!=typeof i)throw new Error("beaufifier: limit must be a number");if("number"==typeof o)for(u=0;u<o;u+=1)n+=" ";else"string"==typeof o&&(n=o);if(r=a,a&&"function"!=typeof a&&("object"!=typeof a||"number"!=typeof a.length))throw new Error("beautifier: wrong replacer parameter");return l("",{"":e},i)}}}]);