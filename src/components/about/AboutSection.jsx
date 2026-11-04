import { useLayoutEffect, useRef } from "react"
import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import mountainImg from "../../assets/images/mountain.png"

gsap.registerPlugin(ScrollTrigger)

export default function AboutSection() {
  const sectionRef = useRef(null)
  const itemsRef = useRef([])
  const dotsRef = useRef([])

  const svgRef = useRef(null)
  const dottedPathRef = useRef(null)
  const maskPathRef = useRef(null)
  const circlesRef = useRef([])

  const timelineData = [
    { year: "2021", text: "Company established with strong engineering foundation." },
    { year: "2022", text: "Expanded into large-scale infrastructure projects." },
    { year: "2023", text: "Introduced advanced cathode systems." },
    { year: "2024", text: "Entered international energy markets." },
    { year: "2025", text: "Driving sustainable power innovation." },
  ]

  useLayoutEffect(() => {
    const section = sectionRef.current
    const svg = svgRef.current
    const dottedPath = dottedPathRef.current
    const maskPath = maskPathRef.current

    if (!section || !svg || !dottedPath || !maskPath) return

    const endLen = timelineData.length * 900
    let pathLength = 0

    const buildLPath = () => {
      const rect = section.getBoundingClientRect()
      const w = Math.max(1, rect.width)
      const h = Math.max(1, rect.height)
      svg.setAttribute("viewBox", `0 0 ${w} ${h}`)

      const points = dotsRef.current
        .filter(Boolean)
        .map((dot) => {
          const r = dot.getBoundingClientRect()
          return {
            x: r.left - rect.left + r.width / 2,
            y: r.top - rect.top + r.height / 2,
          }
        })

      if (points.length < 2) return 0

      // L-step path: horizontal then vertical at each step
      let d = `M ${points[0].x} ${points[0].y}`
      for (let i = 1; i < points.length; i++) {
        d += ` L ${points[i].x} ${points[i - 1].y}` // horizontal
        d += ` L ${points[i].x} ${points[i].y}`     // vertical
      }

      dottedPath.setAttribute("d", d)
      maskPath.setAttribute("d", d)

      // Put SVG circles exactly where HTML dots are
      points.forEach((p, i) => {
        const c = circlesRef.current[i]
        if (!c) return
        c.setAttribute("cx", p.x)
        c.setAttribute("cy", p.y)
      })

      // Length used ONLY for the mask animation (not the dotted line)
      pathLength = dottedPath.getTotalLength()

      // Mask hides line completely initially
      gsap.set(maskPath, {
        strokeDasharray: pathLength,
        strokeDashoffset: pathLength,
      })

      return pathLength
    }

    const ctx = gsap.context(() => {
      // Initial states
      gsap.set(itemsRef.current, { opacity: 0, y: 40 })
      gsap.set(circlesRef.current, { opacity: 0, scale: 0.8, transformOrigin: "50% 50%" })

      // Build after pin/refresh so it never shifts
      const refresh = () => {
        buildLPath()
      }
      ScrollTrigger.addEventListener("refreshInit", refresh)

      // Main pinned timeline
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: section,
          start: "top top",
          end: `+=${endLen}`,
          scrub: 1.2,
          pin: true,
          anticipatePin: 1,
          invalidateOnRefresh: true,
          onRefresh: () => buildLPath(),
        },
      })

      // Ensure path exists before animations
      tl.call(() => {
        const len = buildLPath()
        if (!len) return
      })

      // Draw dotted line by animating the MASK (keeps dotted pattern perfect)
      tl.to(maskPath, {
        strokeDashoffset: 0,
        ease: "none",
        duration: timelineData.length,
      }, 0)

      // Reveal dots + text one-by-one
      timelineData.forEach((_, i) => {
        tl.to(circlesRef.current[i], {
          opacity: 1,
          scale: 1,
          duration: 0.35,
          ease: "power2.out",
        }, i * 0.9)

        tl.to(itemsRef.current[i], {
          opacity: 1,
          y: 0,
          duration: 0.8,
          ease: "power3.out",
        }, i * 0.9)
      })

      // Subtle background zoom
      gsap.to(section, {
        backgroundSize: "110%",
        ease: "none",
        scrollTrigger: {
          trigger: section,
          start: "top bottom",
          end: "bottom top",
          scrub: true,
        },
      })

      // Resize = rebuild
      let ro
      if (typeof ResizeObserver !== "undefined") {
        ro = new ResizeObserver(() => {
          buildLPath()
          ScrollTrigger.refresh()
        })
        ro.observe(section)
      }

      return () => {
        ScrollTrigger.removeEventListener("refreshInit", refresh)
        if (ro) ro.disconnect()
      }
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  return (
    <section
      ref={sectionRef}
      className="aboutMountain"
      style={{ backgroundImage: `url(${mountainImg})` }}
    >
      <div className="aboutOverlay" />

      <div className="aboutContent">
        {/* SVG: dotted path is always dotted, mask reveals it */}
        <svg ref={svgRef} className="timelineSvg" aria-hidden="true">
          <defs>
            <mask id="revealMask">
              {/* black hides, white reveals */}
              <rect width="100%" height="100%" fill="black" />
              <path ref={maskPathRef} className="timelineMaskPath" d="" />
            </mask>
          </defs>

          <path
            ref={dottedPathRef}
            className="timelineDottedPath"
            d=""
            mask="url(#revealMask)"
          />

          {timelineData.map((t, i) => (
            <circle
              key={t.year}
              ref={(el) => (circlesRef.current[i] = el)}
              className="timelineCircle"
              r="4"
            />
          ))}
        </svg>

        {/* HTML Items (same as your current layout) */}
        {timelineData.map((item, i) => (
          <div
            key={item.year}
            ref={(el) => (itemsRef.current[i] = el)}
            className="timelineItem"
            style={{
              left: `${8 + i * 20}%`,
              bottom: `${18 + i * 12}%`,
            }}
          >
            {/* this dot is only used as a POSITION ANCHOR (SVG dot is the real dot) */}
            <div ref={(el) => (dotsRef.current[i] = el)} className="timelineDotAnchor" />

            <div className="timelineYear">{item.year}</div>
            <div className="timelineText">{item.text}</div>
          </div>
        ))}
      </div>
    </section>
  )
}