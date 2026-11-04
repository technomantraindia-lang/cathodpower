import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import "./AdvantageCards.css";

export default function AdvantageCards({features,active}){

const cardsRef = useRef([]);

useEffect(()=>{
const card = cardsRef.current[active];
if (!card) return;
gsap.killTweensOf(card);
gsap.fromTo(
card,
{y:30,opacity:0},
{y:0,opacity:1,duration:0.6,ease:"power3.out"}
);
return () => gsap.killTweensOf(card);
},[active]);

return(

<section className="cardsSection">

<div className="cardsContainer">

{features.map((f,i)=>(
<div
key={i}
ref={el => cardsRef.current[i] = el}
className={`card ${active===i?"active":""}`}
>

<h3>{f.title}</h3>

<ul>
{f.points.map((p,index)=>(
<li key={index}>{p}</li>
))}
</ul>

</div>
))}

</div>

</section>

);

}