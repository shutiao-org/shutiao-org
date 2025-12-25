"use client";

import {
  useScroll,
  useTransform,
  motion,
} from "motion/react";
import React, { useEffect, useRef, useState } from "react";

interface TimelineEntry {
  title: string;
  content: React.ReactNode;
}

export const Timeline = ({ data }: { data: TimelineEntry[] }) => {
  const ref = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [height, setHeight] = useState(0);

  useEffect(() => {
    if (ref.current) {
      const rect = ref.current.getBoundingClientRect();
      setHeight(rect.height);
    }
  }, [ref]);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start 10%", "end 50%"],
  });

  const heightTransform = useTransform(scrollYProgress, [0, 1], [0, height]);
  const opacityTransform = useTransform(scrollYProgress, [0, 0.1], [0, 1]);

  return (
    <div
      className="w-full font-sans px-4 md:px-10"
      ref={containerRef}
    >
      <div ref={ref} className="relative max-w-7xl mx-auto pb-12 md:pb-20">
        {data.map((item, index) => (
          <div
            key={index}
            className="flex flex-col md:flex-row md:justify-start pt-8 md:pt-40 md:gap-10"
          >
            <div className="relative md:sticky flex flex-row md:flex-row z-40 items-center md:items-center top-0 md:top-40 self-start md:max-w-xs lg:max-w-sm md:w-full mb-4 md:mb-0">
              <div className="absolute left-4 md:left-8 flex items-center justify-center z-50 -translate-x-1/2">
                <div className="absolute size-5 md:size-6 rounded-full border-2 border-neutral-300 dark:border-neutral-700 shadow-sm" />
                <motion.div
                  className="relative size-3 md:size-3.5 rounded-full bg-neutral-500 dark:bg-neutral-500 ring-0 shadow-lg"
                  animate={{
                    scale: [1, 1.15, 1],
                    opacity: [0.9, 1, 0.9],
                  }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    ease: "easeInOut",
                  }}
                />
              </div>
              <h3 className="pl-12 md:pl-20 text-3xl md:text-4xl font-medium md:font-bold text-neutral-400 md:text-neutral-500 dark:text-neutral-500 leading-tight">
                {item.title}
              </h3>
            </div>

            <div className="relative pl-12 pr-4 md:pl-4 md:pr-0 w-full">
              {item.content}{" "}
            </div>
          </div>
        ))}

        <div
          style={{
            height: height + "px",
          }}
          className="absolute left-4 md:left-8 top-0 overflow-hidden w-[2px] -translate-x-1/2 bg-[linear-gradient(to_bottom,var(--tw-gradient-stops))] from-transparent from-0% via-neutral-200 dark:via-neutral-700 to-transparent to-99%  mask-[linear-gradient(to_bottom,transparent_0%,black_10%,black_90%,transparent_100%)] "
        >
          <motion.div
            style={{
              height: heightTransform,
              opacity: opacityTransform,
            }}
            className="absolute inset-x-0 top-0  w-[2px] bg-linear-to-t from-purple-500 via-blue-500 to-transparent from-0% via-10% rounded-full"
          />
        </div>
      </div>
    </div>
  );
};
