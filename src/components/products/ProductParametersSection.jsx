import { useState, useRef } from "react";
import "./ProductParametersSection.css";

export default function ProductParametersSection({ product }) {

const variants = product.parameters?.variants || [];

const [activeVariant,setActiveVariant] = useState(0);
const [open,setOpen] = useState("pv");

const refs = {
pv: useRef(null),
ac: useRef(null),
eps: useRef(null),
general: useRef(null)
};

const toggle = (key)=>{
setOpen(open === key ? "" : key);
};

const data = variants[activeVariant];

return (

<section className="paramsSection">

<div className="paramsContainer">

<h2 className="paramsTitle">Product Parameters</h2>

{/* POWER TABS */}

<div className="paramsTabs">

{variants.map((v,i)=>(
<button
key={i}
className={`paramsTab ${activeVariant===i?"active":""}`}
onClick={()=>setActiveVariant(i)}
>
{v.power}
</button>
))}

</div>


<div className="paramsLayout">

{/* IMAGE */}

<div className="paramsImage">

<img src={product.image} alt={product.name} loading="lazy" decoding="async" />

<p>{data.power}</p>

</div>


{/* ACCORDION */}

<div className="paramsAccordion">

{[
{key:"pv",title:"PV INPUT",items:data.pv},
{key:"ac",title:"AC INPUT & OUTPUT (ON-GRID)",items:data.ac},
{key:"eps",title:"EPS (OFF-GRID) OUTPUT (WITH BATTERY)",items:data.eps},
{key:"general",title:"GENERAL",items:data.general}
].map((section)=>{

const isOpen = open===section.key;
const ref = refs[section.key];

return(

<div className="paramsCard" key={section.key}>

<div
className="paramsHeader"
onClick={()=>toggle(section.key)}
>

<span>{section.title}</span>

<span className={`icon ${isOpen?"rotate":""}`}>
+
</span>

</div>

<div
ref={ref}
className="paramsContent"
style={{
height:isOpen ? ref.current?.scrollHeight : 0
}}
>

<div className="paramsInner">

{section.items.map((item,i)=>(
<div className="paramsRow" key={i}>
<span>{item.label}</span>
<span>{item.value}</span>
</div>
))}

</div>

</div>

</div>

);

})}

</div>

</div>

</div>

</section>

);

}