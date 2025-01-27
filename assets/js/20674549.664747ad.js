(self.webpackChunkdocs=self.webpackChunkdocs||[]).push([[3432],{27360:(e,n,a)=>{"use strict";a.r(n),a.d(n,{assets:()=>p,contentTitle:()=>m,default:()=>j,frontMatter:()=>f,metadata:()=>r,toc:()=>g});const r=JSON.parse('{"id":"guide/validation","title":"Validation with JSON Schema","description":"All fab4m forms can generate a JSON Schema from their definition.","source":"@site/docs/guide/validation.mdx","sourceDirName":"guide","slug":"/guide/validation","permalink":"/docs/guide/validation","draft":false,"unlisted":false,"tags":[],"version":"current","sidebarPosition":8,"frontMatter":{"sidebar_position":8},"sidebar":"tutorialSidebar","previous":{"title":"Component Variants","permalink":"/docs/guide/variants"},"next":{"title":"Serializing forms","permalink":"/docs/guide/serializing"}}');var t=a(74848),i=a(28453),s=(a(96540),a(55875)),o=a(1399),l=a.n(o),c=a(1173);const h=(0,c.DG)({username:(0,c.M8)({required:!0,validators:[(0,c.Bp)(5)]}),age:(0,c.nm)({label:"Username"}),city:(0,c.M8)({required:!0,validators:[(0,c.h_)(["Gothenburg","Stockholm"])]}),vegetarian:(0,c.hQ)({label:"Vegetarian"}),interests:(0,c.M8)({label:"Interests",multiple:!0,minItems:2}),profession:(0,c.Os)({label:"Profession"},{workplace:(0,c.M8)({label:"Workplace"}),label:(0,c.M8)({label:"Title"})})}),d=(0,c.B6)(h),u=()=>(0,t.jsx)("div",{style:{maxHeight:"300px",overflowY:"scroll"},children:(0,t.jsx)(s.A,{language:"json",children:l()(d,null,2,80)})}),f={sidebar_position:8},m="Validation with JSON Schema",p={},g=[{value:"Generating a JSON Schema",id:"generating-a-json-schema",level:2},{value:"Generating a schema for each form part",id:"generating-a-schema-for-each-form-part",level:2},{value:"Using your schema",id:"using-your-schema",level:2},{value:"When is this useful?",id:"when-is-this-useful",level:2},{value:"A note about rules and variants",id:"a-note-about-rules-and-variants",level:2}];function b(e){const n={a:"a",code:"code",h1:"h1",h2:"h2",header:"header",li:"li",p:"p",pre:"pre",ul:"ul",...(0,i.R)(),...e.components};return(0,t.jsxs)(t.Fragment,{children:[(0,t.jsx)(n.header,{children:(0,t.jsx)(n.h1,{id:"validation-with-json-schema",children:"Validation with JSON Schema"})}),"\n",(0,t.jsx)(n.p,{children:"All fab4m forms can generate a JSON Schema from their definition.\nThis is very useful when you want to validate your form data on the server side."}),"\n",(0,t.jsx)(n.h2,{id:"generating-a-json-schema",children:"Generating a JSON Schema"}),"\n",(0,t.jsx)(n.p,{children:"Consider the following form:"}),"\n",(0,t.jsx)(n.pre,{children:(0,t.jsx)(n.code,{className:"language-jsx",children:'const form = createForm({\n  username: textField({ required: true, validators: [minLength(5)] }),\n  age: integerField({ label: "Username" }),\n  city: textField({\n    required: true,\n    validators: [allowedValues(["Gothenburg", "Stockholm"])],\n  }),\n  vegetarian: booleanField({ label: "Vegetarian" }),\n  interests: textField({ label: "Interests", multiple: true, minItems: 2 }),\n  profession: group(\n    { label: "Profession" },\n    {\n      workplace: textField({ label: "Workplace" }),\n      label: textField({ label: "Label" }),\n    }\n  ),\n});\n'})}),"\n",(0,t.jsx)(n.p,{children:"This data behind this form is quite complex to validate manually, luckily we don't have\nto, we can generate a schema for it and use that schema for validation instead."}),"\n",(0,t.jsxs)(n.p,{children:["Fab4m provides the ",(0,t.jsx)(n.code,{children:"generateSchema"}),"function to generate a schema for any form:"]}),"\n",(0,t.jsx)(n.pre,{children:(0,t.jsx)(n.code,{className:"language-jsx",children:'import { generateSchema } from "@fab4m/fab4m";\ngenerateSchema(form);\n'})}),"\n",(0,t.jsx)(n.p,{children:"This generates a schema that can be used by a JSON schema validator:"}),"\n",(0,t.jsx)(u,{}),"\n",(0,t.jsx)(n.p,{children:"Notice that:"}),"\n",(0,t.jsxs)(n.ul,{children:["\n",(0,t.jsx)(n.li,{children:"The validators we defined above (minLength and allowedValues) on our components are part of the schema."}),"\n",(0,t.jsx)(n.li,{children:"The interests multiple field is interpreted as an array."}),"\n",(0,t.jsx)(n.li,{children:"Our group component is properly translated to an object inside of the schema."}),"\n"]}),"\n",(0,t.jsx)(n.h2,{id:"generating-a-schema-for-each-form-part",children:"Generating a schema for each form part"}),"\n",(0,t.jsx)(n.p,{children:"If you have forms with multiple parts you might need to validate each part in\nisolation."}),"\n",(0,t.jsx)(n.pre,{children:(0,t.jsx)(n.code,{className:"language-jsx",children:'import { generatePartSchemas } from "@fab4m/fab4m";\nconst schemas = generatePartSchemas(form);\n'})}),"\n",(0,t.jsx)(n.p,{children:"This will give you an array of schemas, one for each form part in your form."}),"\n",(0,t.jsx)(n.h2,{id:"using-your-schema",children:"Using your schema"}),"\n",(0,t.jsxs)(n.p,{children:["Fab4m doesn't provide a JSON Schema validator of it's own, you are free to choose\nany validator you like. The ",(0,t.jsx)(n.a,{href:"https://ajv.js.org/",children:"AJV validator"})," for javascript is an\nexcellent choice in js environments."]}),"\n",(0,t.jsx)(n.h2,{id:"when-is-this-useful",children:"When is this useful?"}),"\n",(0,t.jsx)(n.p,{children:"Having a JSON schema readily available for any form means that you can always validate the input from any form anywhere where you can parse a JSON schema."}),"\n",(0,t.jsx)(n.h2,{id:"a-note-about-rules-and-variants",children:"A note about rules and variants"}),"\n",(0,t.jsxs)(n.p,{children:["Fab4m provides advanced features in the form of ",(0,t.jsx)(n.a,{href:"/docs/guide/rules",children:"Rules"}),"\nand ",(0,t.jsx)(n.a,{href:"/docs/guide/variants",children:"Variants"}),". We generate a schema based on the\ndata when using these features to avoid generating very complex JSON\nSchemas. Check documentation on rules and variants to see how it works."]})]})}function j(e={}){const{wrapper:n}={...(0,i.R)(),...e.components};return n?(0,t.jsx)(n,{...e,children:(0,t.jsx)(b,{...e})}):b(e)}},1399:e=>{var n,a,r,t=/[\\\"\u0000-\u001f\u007f-\u009f\u00ad\u0600-\u0604\u070f\u17b4\u17b5\u200c-\u200f\u2028-\u202f\u2060-\u206f\ufeff\ufff0-\uffff]/g,i={"\b":"\\b","\t":"\\t","\n":"\\n","\f":"\\f","\r":"\\r",'"':'\\"',"\\":"\\\\"};function s(e){return t.lastIndex=0,t.test(e)?'"'+e.replace(t,(function(e){var n=i[e];return"string"==typeof n?n:"\\u"+("0000"+e.charCodeAt(0).toString(16)).slice(-4)}))+'"':'"'+e+'"'}function o(e,t,i){var l,c,h,d,u,f=n,m=t[e];switch(m&&"object"==typeof m&&"function"==typeof m.toJSON&&(m=m.toJSON(e)),"function"==typeof r&&(m=r.call(t,e,m)),typeof m){case"string":return s(m);case"number":return isFinite(m)?String(m):"null";case"boolean":case"null":return String(m);case"object":if(!m)return"null";if(n+=a,u=[],"[object Array]"===Object.prototype.toString.apply(m)){for(d=m.length,l=0;l<d;l+=1)u[l]=o(l,m,i)||"null";return h=0===u.length?"[]":n?n.length+u.join(", ").length+4>i?"[\n"+n+u.join(",\n"+n)+"\n"+f+"]":"[ "+u.join(", ")+" ]":"["+u.join(",")+"]",n=f,h}if(r&&"object"==typeof r)for(d=r.length,l=0;l<d;l+=1)"string"==typeof r[l]&&(h=o(c=r[l],m,i))&&u.push(s(c)+(n?": ":":")+h);else for(c in m)Object.prototype.hasOwnProperty.call(m,c)&&(h=o(c,m,i))&&u.push(s(c)+(n?": ":":")+h);return h=0===u.length?"{}":n?n.length+u.join(", ").length+4>i?"{\n"+n+u.join(",\n"+n)+"\n"+f+"}":"{ "+u.join(", ")+" }":"{"+u.join(",")+"}",n=f,h}}e.exports=function(e,t,i,s){var l;if(n="",a="",s||(s=0),"number"!=typeof s)throw new Error("beaufifier: limit must be a number");if("number"==typeof i)for(l=0;l<i;l+=1)a+=" ";else"string"==typeof i&&(a=i);if(r=t,t&&"function"!=typeof t&&("object"!=typeof t||"number"!=typeof t.length))throw new Error("beautifier: wrong replacer parameter");return o("",{"":e},s)}}}]);