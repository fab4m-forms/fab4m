"use strict";(self.webpackChunkdocs=self.webpackChunkdocs||[]).push([[1244],{3181:(e,t,o)=>{o.r(t),o.d(t,{assets:()=>y,contentTitle:()=>k,default:()=>C,frontMatter:()=>g,metadata:()=>b,toc:()=>w});var n=o(7462),a=o(7294),i=o(3905),l=o(1809),m=o(2404),c=o(891);const r=(0,c.Np)({city:(0,c.$S)({label:"City",widget:(0,m.R)({items:[["Gothenburg","gothenburg"],["Stockholm","stockholm"],"copenhagen"]})})});function u(){return a.createElement(c.H,{form:r,hideSubmit:!0})}const s=(0,c.Np)({city:(0,c.$S)({label:"City",widget:(0,m.R)({items:async function(e){return[["Gothenburg","gothenburg"],["Stockholm","stockholm"]].filter((t=>t[0].toLowerCase().includes(e.toLowerCase())))}})})});function p(){return a.createElement(c.H,{form:s,hideSubmit:!0})}const d={gothenburg:{title:"Gothenburg",description:"City of the brave!"},stockholm:{title:"Stockholm",description:"City on the wrong side of the country."}},h=(0,c.Np)({city:(0,c.$S)({label:"City",widget:(0,m.R)({items:["gothenburg","stockholm"],itemElement:e=>{const t=d[e];return a.createElement("div",null,a.createElement("h3",null,t.title),a.createElement("p",null,t.description))}})})});function f(){return a.createElement(c.H,{form:h,hideSubmit:!0})}const g={},k="Autocomplete",b={unversionedId:"packages/autocomplete",id:"packages/autocomplete",title:"Autocomplete",description:"The @fab4m/autocomplete package provides an autocomplete widget component using the popular",source:"@site/docs/packages/autocomplete.mdx",sourceDirName:"packages",slug:"/packages/autocomplete",permalink:"/docs/packages/autocomplete",draft:!1,tags:[],version:"current",frontMatter:{},sidebar:"tutorialSidebar",previous:{title:"Component reference",permalink:"/docs/guide/component-reference"},next:{title:"Date and time",permalink:"/docs/packages/date"}},y={},w=[{value:"Installing",id:"installing",level:2},{value:"Using the autocomplete widget",id:"using-the-autocomplete-widget",level:2},{value:"Using a callback to fetch the items",id:"using-a-callback-to-fetch-the-items",level:2},{value:"Customizing the autocomplete item element",id:"customizing-the-autocomplete-item-element",level:2}],x={toc:w};function C(e){let{components:t,...o}=e;return(0,i.kt)("wrapper",(0,n.Z)({},x,o,{components:t,mdxType:"MDXLayout"}),(0,i.kt)("h1",{id:"autocomplete"},"Autocomplete"),(0,i.kt)("p",null,"The ",(0,i.kt)("inlineCode",{parentName:"p"},"@fab4m/autocomplete")," package provides an autocomplete widget component using the popular\n",(0,i.kt)("a",{parentName:"p",href:"https://www.downshift-js.com/"},"Downshift js package"),"."),(0,i.kt)("h2",{id:"installing"},"Installing"),(0,i.kt)("p",null,"Install ",(0,i.kt)("inlineCode",{parentName:"p"},"@fab4m/autocomplete")," and ",(0,i.kt)("inlineCode",{parentName:"p"},"downshift")," (7.x):"),(0,i.kt)("pre",null,(0,i.kt)("code",{parentName:"pre",className:"language-bash"},"npm install --save @fab4m/autocomplete downshift\n")),(0,i.kt)("h2",{id:"using-the-autocomplete-widget"},"Using the autocomplete widget"),(0,i.kt)("p",null,(0,i.kt)("inlineCode",{parentName:"p"},"@fab4m/autocomplete")," provides one widget: the ",(0,i.kt)("inlineCode",{parentName:"p"},"autocompleteWidget"),"."),(0,i.kt)("p",null,"The following example shows it in action:"),(0,i.kt)(l.Z,{source:'import * as React from "react";\n// This stylesheet that\'s needed if you use the basic theme.\nimport "@fab4m/autocomplete/src/style.css";\nimport { autocompleteWidget } from "@fab4m/autocomplete";\nimport { StatefulFormView, textField, createForm } from "@fab4m/fab4m";\nconst form = createForm({\n  city: textField({\n    label: "City",\n    widget: autocompleteWidget({\n      items: [\n        // Either use the [label, value] format...\n        ["Gothenburg", "gothenburg"],\n        ["Stockholm", "stockholm"],\n        // Or just use the value.\n        "copenhagen",\n      ],\n    }),\n  }),\n});\n\nexport default function AutocompleteExample() {\n  return <StatefulFormView form={form} hideSubmit={true} />;\n}\n',example:(0,i.kt)(u,{mdxType:"AutocompleteExample"}),mdxType:"Example"}),(0,i.kt)("h2",{id:"using-a-callback-to-fetch-the-items"},"Using a callback to fetch the items"),(0,i.kt)("p",null,"If you have many items to fetch you can use a callback to fetch the items\non the fly:"),(0,i.kt)(l.Z,{source:'import * as React from "react";\nimport "@fab4m/autocomplete/src/style.css";\nimport { autocompleteWidget } from "@fab4m/autocomplete";\nimport { StatefulFormView, textField, createForm } from "@fab4m/fab4m";\n\n// This would be your actual call to the backend.\nasync function fakeFetch(search: string) {\n  const data = [\n    ["Gothenburg", "gothenburg"],\n    ["Stockholm", "stockholm"],\n  ];\n  return data.filter((item) =>\n    item[0].toLowerCase().includes(search.toLowerCase())\n  );\n}\n\nconst form = createForm({\n  city: textField({\n    label: "City",\n    widget: autocompleteWidget({\n      items: fakeFetch,\n    }),\n  }),\n});\n\nexport default function AutocompleteExample() {\n  return <StatefulFormView form={form} hideSubmit={true} />;\n}\n',example:(0,i.kt)(p,{mdxType:"CallbackExample"}),mdxType:"Example"}),(0,i.kt)("h2",{id:"customizing-the-autocomplete-item-element"},"Customizing the autocomplete item element"),(0,i.kt)("p",null,"You might want to customize the way each item looks in the autocomplete list.\nThis can be done by specifying a custom ",(0,i.kt)("inlineCode",{parentName:"p"},"itemElement"),":"),(0,i.kt)(l.Z,{source:'import * as React from "react";\nimport "@fab4m/autocomplete/src/style.css";\nimport { autocompleteWidget } from "@fab4m/autocomplete";\nimport { StatefulFormView, textField, createForm } from "@fab4m/fab4m";\n\nconst descriptions = {\n  gothenburg: {\n    title: "Gothenburg",\n    description: "City of the brave!",\n  },\n  stockholm: {\n    title: "Stockholm",\n    description: "City on the wrong side of the country.",\n  },\n};\n\nconst form = createForm({\n  city: textField({\n    label: "City",\n    widget: autocompleteWidget({\n      items: ["gothenburg", "stockholm"],\n      itemElement: (value) => {\n        const info = descriptions[value];\n        return (\n          <div>\n            <h3>{info.title}</h3>\n            <p>{info.description}</p>\n          </div>\n        );\n      },\n    }),\n  }),\n});\n\nexport default function AutocompleteExample() {\n  return <StatefulFormView form={form} hideSubmit={true} />;\n}\n',example:(0,i.kt)(f,{mdxType:"ItemElementExample"}),mdxType:"Example"}))}C.isMDXComponent=!0}}]);