import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import "./ProductOrbit.css";

export default function ProductOrbit({ product, features, active, setActive }) {

const orbitRef = useRef(null);
const imgRef = useRef(null);
const activeRef = useRef(-1);

let angle = 0;
let speed = 0.3;
const radius = 170;

useEffect(() => {

const items = orbitRef.current.querySelectorAll(".orbitItem");

let rafId;

const rotate = () => {

angle += speed;

items.forEach((item, i) => {

const itemAngle = angle + (360 / features.length) * i;

const x = radius * Math.cos(itemAngle * Math.PI / 180);
const y = radius * Math.sin(itemAngle * Math.PI / 180);

gsap.set(item, { x, y });

});

const index =
Math.floor((angle % 360) / (360 / features.length));

if (index !== activeRef.current) {
activeRef.current = index;
setActive(index);
}

rafId = requestAnimationFrame(rotate);

};

rafId = requestAnimationFrame(rotate);

return () => cancelAnimationFrame(rafId);

}, [features.length, setActive]);

/* Slow rotation on hover */

useEffect(() => {

const orbit = orbitRef.current;

const slow = () => speed = 0.05;
const normal = () => speed = 0.3;

orbit.addEventListener("mouseenter", slow);
orbit.addEventListener("mouseleave", normal);

return () => {

orbit.removeEventListener("mouseenter", slow);
orbit.removeEventListener("mouseleave", normal);

};

}, []);


/* Snap orbit when hovering a feature */

const handleHover = (index) => {

const snapAngle = index * (360 / features.length);

gsap.to({}, {
duration: 0.5,
onUpdate: () => {
angle = snapAngle;
}
});

setActive(index);
activeRef.current = index;

};


/* 3D tilt inverter */

useEffect(() => {

const img = imgRef.current;

const handleMove = (e) => {

const rect = img.getBoundingClientRect();

const x = e.clientX - rect.left;
const y = e.clientY - rect.top;

const rotateY = (x - rect.width/2) / 10;
const rotateX = -(y - rect.height/2) / 10;

gsap.to(img,{
rotationX:rotateX,
rotationY:rotateY,
transformPerspective:900,
duration:.3
});

};

const reset = () => {
gsap.to(img,{rotationX:0,rotationY:0,duration:.4});
};

img.addEventListener("mousemove",handleMove);
img.addEventListener("mouseleave",reset);

return ()=>{

img.removeEventListener("mousemove",handleMove);
img.removeEventListener("mouseleave",reset);

};

},[]);


return (

<div className="orbitWrapper">

<div className="orbitCircle" ref={orbitRef}>

{features.map((f,i)=>(
<div
key={i}
className={`orbitItem ${active===i?"active":""}`}
onMouseEnter={()=>handleHover(i)}
>
{f.title}
</div>
))}

<div className="orbitCenter">

<img
ref={imgRef}
src={product.image}
alt={product.name}
loading="lazy"
decoding="async"
fetchPriority="low"
/>

</div>

<div className="orbitGlow"></div>

</div>

</div>

);

}
