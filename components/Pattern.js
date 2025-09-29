export default function Pattern(){
  return (
    <svg aria-hidden className="absolute inset-0 h-full w-full opacity-30" viewBox="0 0 1200 600">
      <defs>
        <linearGradient id="g" x1="0" x2="1">
          <stop offset="0%" stopColor="#22d3ee"/>
          <stop offset="100%" stopColor="#a78bfa"/>
        </linearGradient>
      </defs>
      <g fill="none" stroke="url(#g)" strokeOpacity="0.35">
        {Array.from({length:18}).map((_,i)=>(
          <path key={i} d={`M0 ${i*34} C 300 ${i*34+40}, 900 ${i*34-40}, 1200 ${i*34}`} />
        ))}
      </g>
    </svg>
  );
}
