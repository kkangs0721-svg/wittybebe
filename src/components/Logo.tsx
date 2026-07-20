import React from "react";
import Link from "next/link";

interface LogoProps {
  className?: string;
}

export default function Logo({ className = "text-xl sm:text-2xl" }: LogoProps) {
  const letters1 = [
    { char: "W", color: "text-pastel-pink" },
    { char: "I", color: "text-pastel-blue" },
    { char: "T", color: "text-pastel-yellow" },
    { char: "T", color: "text-pastel-pink" },
    { char: "Y", color: "text-pastel-blue" },
  ];
  
  const letters2 = [
    { char: "B", color: "text-pastel-pink" },
    { char: "É", color: "text-pastel-blue" },
    { char: "B", color: "text-pastel-yellow" },
    { char: "É", color: "text-pastel-pink" },
  ];

  return (
    <Link 
      href="/" 
      className={`font-rounded font-extrabold tracking-widest inline-flex items-center gap-3 transition-transform hover:scale-[1.03] active:scale-95 duration-300 ${className}`}
    >
      <span className="flex select-none">
        {letters1.map((item, idx) => (
          <span 
            key={idx} 
            className={`${item.color} drop-shadow-[0_1.5px_1.5px_rgba(50,50,50,0.08)]`}
          >
            {item.char}
          </span>
        ))}
      </span>
      <span className="flex select-none">
        {letters2.map((item, idx) => (
          <span 
            key={idx} 
            className={`${item.color} drop-shadow-[0_1.5px_1.5px_rgba(50,50,50,0.08)]`}
          >
            {item.char}
          </span>
        ))}
      </span>
    </Link>
  );
}
