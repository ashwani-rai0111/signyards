(self.webpackChunk_N_E=self.webpackChunk_N_E||[]).push([[410],{1740:function(e,s,t){(window.__NEXT_P=window.__NEXT_P||[]).push(["/productScreen",function(){return t(9536)}])},9536:function(e,s,t){"use strict";t.r(s);var i=t(5893),a=t(7294),c=t(1163),l=t(1234),r=t(1664),d=t.n(r);t(9603);let o=()=>(0,i.jsx)("div",{className:" shadow rounded-md p-4 max-w-sm w-full mx-auto",children:(0,i.jsxs)("div",{className:"animate-pulse",children:[(0,i.jsx)("div",{className:"aspect-w-1 aspect-h-1 sm:aspect-h-8 sm:aspect-w-7",children:(0,i.jsx)("div",{className:"w-full h-64 bg-slate-100"})}),(0,i.jsxs)("div",{className:"mt-4",children:[(0,i.jsx)("div",{className:"h-4 bg-slate-100 rounded w-3/4"}),(0,i.jsx)("div",{className:"h-4 bg-slate-100 rounded w-1/4 mt-2"})]}),(0,i.jsx)("div",{className:"mt-2",children:(0,i.jsx)("div",{className:"h-8 bg-slate-100 rounded w-full"})})]})});s.default=()=>{let{cartItems:e,addToCart:s}=(0,l.jD)(),t=(0,c.useRouter)(),[r,n]=(0,a.useState)([]),[u,m]=(0,a.useState)(!0),[g,x]=(0,a.useState)(null),[p,h]=(0,a.useState)(1),[f,j]=(0,a.useState)(1);(0,a.useEffect)(()=>{(async()=>{try{let e=await fetch("https://signyards.in/getProducts.php",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({page:"product",page_number:p})});if(!e.ok)throw Error("Failed to fetch products");let s=await e.json();n(s.filter(e=>"Product"===e.type)),j(s.totalPages),m(!1)}catch(e){x(e.message),m(!1)}})()},[p]);let v=i=>{e.find(e=>e.id===i.id)?t.push("/cart"):(s(i.id),console.log("Product with ID ".concat(i.id," added to cart")))},N=e=>{t.push("/products/".concat(e))};return u?(0,i.jsx)("div",{id:"productScreen",children:(0,i.jsx)("div",{className:"relative bg-gray-800 sm:w-[calc(100%)]",children:(0,i.jsx)("div",{className:"mx-auto max-w-7xl px-4 py-10 sm:px-6 sm:py-24 lg:px-8",children:(0,i.jsx)("div",{className:"grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 xl:gap-8",children:Array(8).fill(0).map((e,s)=>(0,i.jsx)(o,{},s))})})})}):g?(0,i.jsxs)("div",{children:["Error: ",g]}):(0,i.jsx)("div",{id:"productScreen",children:(0,i.jsx)("div",{className:"relative bg-gray-800 sm:w-[calc(100%)]",children:(0,i.jsxs)("div",{className:"mx-auto max-w-7xl px-4 py-10 sm:px-6 sm:py-24 lg:px-8",children:[(0,i.jsx)("div",{className:"grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 xl:gap-8",children:r.map(s=>(0,i.jsxs)("div",{className:"group block relative",children:[(0,i.jsxs)("div",{className:"aspect-w-1 aspect-h-1 sm:aspect-h-8 sm:aspect-w-7",children:[(0,i.jsx)(d(),{legacyBehavior:!0,href:"/products/".concat(s.id),passHref:!0,children:(0,i.jsx)("a",{children:(0,i.jsx)("div",{className:"w-full h-64 bg-gray-200",children:(0,i.jsx)("img",{src:"data:image/jpeg;base64,".concat(s.imageBase64),alt:s.title,className:"object-cover object-center w-full h-full group-hover:opacity-75 cursor-pointer"})})})}),(0,i.jsx)("div",{className:"absolute top-2 right-2",children:(0,i.jsx)("button",{onClick:()=>N(s.id),className:"px-3 py-1 bg-blue-600 hover:bg-blue-700 text-white text-sm font-medium rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500",children:"View"})})]}),(0,i.jsx)("h3",{className:"mt-4 text-sm text-gray-100",children:s.title}),(0,i.jsxs)("p",{className:"mt-1 text-lg font-medium text-yellow-400",children:["₹",s.price_per_unit]}),(0,i.jsx)("button",{onClick:()=>v(s),className:"mt-2 px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white text-sm font-medium rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500",children:e.find(e=>e.id===s.id)?"Go to Cart":"Add to Cart"})]},s.id))}),(0,i.jsxs)("div",{className:"mt-6 flex justify-center",children:[(0,i.jsx)("button",{onClick:()=>{h(p-1)},disabled:1===p,className:"mr-2 px-4 py-2 bg-gray-600 hover:bg-gray-700 text-white text-sm font-medium rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500",children:"Previous"}),(0,i.jsx)("button",{onClick:()=>{h(p+1)},disabled:p===f,className:"ml-2 px-4 py-2 bg-gray-600 hover:bg-gray-700 text-white text-sm font-medium rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500",children:"Next"})]})]})})})}},1163:function(e,s,t){e.exports=t(3035)}},function(e){e.O(0,[603,664,888,774,179],function(){return e(e.s=1740)}),_N_E=e.O()}]);