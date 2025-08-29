"use client";
import Image from "next/image";
import { useState, useEffect, useRef } from "react";
import data from "./components/data";
import { FaLongArrowAltLeft, FaLongArrowAltRight } from "react-icons/fa";

const rightSection = [
  "Feature 1: Lorem ipsum dolor",
  "Feature 2: Lorem ipsum dolor",
  "Feature 3: Lorem ipsum dolor",
  "Feature 4: Lorem ipsum dolor",
  "Feature 5: Lorem ipsum dolor",
];

const HeroSection = () => (
  <section className="min-h-screen bg-gradient-to-b from-blue-50 to-white flex items-center justify-center">
    <div className="text-center px-4">
      <h1 className="text-5xl md:text-7xl font-bold text-gray-900 mb-6">
        Amazing Product
      </h1>
      <p className="text-xl md:text-2xl text-gray-600 mb-8 max-w-2xl mx-auto">
        Discover the features that make our product stand out from the
        competition
      </p>
      <button className="bg-cyan-500 text-white px-8 py-3 rounded-lg text-lg font-medium hover:bg-cyan-600 transition-colors">
        Get Started
      </button>
    </div>
  </section>
);

const FeatureShowcase = () => {
  const [currentId, setCurrentId] = useState(0);
  const sectionRef = useRef<HTMLDivElement | null>(null);
  const isScrolling = useRef(false);
  const currentContent = data.find((item) => item.id === currentId);

  const getHeightMultiplier = () => {
    if (typeof window !== "undefined") {
      return window.innerWidth <= 768 ? 60 : 25;
    }
    return 25;
  };

  useEffect(() => {
    const handleWheel = (e: WheelEvent) => {
      if (!sectionRef.current) return;

      const rect = sectionRef.current.getBoundingClientRect();
      const isInView = rect.top <= 0 && rect.bottom > window.innerHeight;

      if (isInView) {
        e.preventDefault();

        if (isScrolling.current) return;
        isScrolling.current = true;

        if (e.deltaY < 0 && currentId === 0) {
          isScrolling.current = false;
          window.scrollBy(0, -50);
          return;
        }

        if (e.deltaY > 0 && currentId === rightSection.length - 1) {
          isScrolling.current = false;
          window.scrollBy(0, 50);
          return;
        }

        if (window.innerWidth <= 1024) {
          if (e.deltaX > 0 || e.deltaY > 0) {
            setCurrentId((prev) => Math.min(prev + 1, rightSection.length - 1));
          } else if (e.deltaX < 0 || e.deltaY < 0) {
            setCurrentId((prev) => Math.max(prev - 1, 0));
          }
        } else {
          if (e.deltaY > 0) {
            setCurrentId((prev) => Math.min(prev + 1, rightSection.length - 1));
          } else if (e.deltaY < 0) {
            setCurrentId((prev) => Math.max(prev - 1, 0));
          }
        }

        setTimeout(() => {
          isScrolling.current = false;
        }, 250);
      }
    };

    window.addEventListener("wheel", handleWheel, { passive: false });

    return () => {
      window.removeEventListener("wheel", handleWheel);
    };
  }, [currentId]);

  return (
    <section
      ref={sectionRef}
      className="min-h-screen sticky top-0"
      style={{ height: `${rightSection.length * getHeightMultiplier()}vh` }}
    >
      <div className="min-h-screen overflow-hidden">
        <div className="flex flex-col md:flex-row justify-between items-center w-full p-20 gap-8 ">
          {currentContent && (
            <>
              <div id="left" className="flex-1 max-w-md ">
                <h1 className="font-bold text-xl text-cyan-500 mb-15">
                  {currentContent.leftHeading}
                </h1>
                <h2 className="font-bold text-2xl mb-15">
                  {currentContent.leftSubHeading}
                </h2>
                <ul className="list-disc ml-6 font-roboto text-gray-500 space-y-2">
                  {currentContent.leftListData.map((item, index) => (
                    <li key={index}>{item}</li>
                  ))}
                </ul>
                <div className="hidden md:flex gap-x-2 items-center mt-20">
                  <FaLongArrowAltLeft
                    size={40}
                    className="cursor-pointer text-gray-500"
                    onClick={() =>
                      setCurrentId((prev) => Math.max(prev - 1, 0))
                    }
                  />
                  <div className="bg-cyan-500 w-1 h-15 rounded-xs"></div>
                  <FaLongArrowAltRight
                    size={40}
                    className="cursor-pointer text-gray-500"
                    onClick={() =>
                      setCurrentId((prev) =>
                        Math.min(prev + 1, rightSection.length - 1)
                      )
                    }
                  />
                </div>
              </div>
              <div id="middle" className="w-xs lg:w-2xl">
                <Image
                  src={currentContent.img}
                  width={600}
                  height={600}
                  alt="phone"
                />
                <div className="flex md:hidden justify-center gap-x-2 items-center mt-20">
                  <FaLongArrowAltLeft
                    size={40}
                    className="cursor-pointer text-gray-500"
                    onClick={() =>
                      setCurrentId((prev) => Math.max(prev - 1, 0))
                    }
                  />
                  <div className="bg-cyan-500 w-1 h-15 rounded-xs"></div>
                  <FaLongArrowAltRight
                    size={40}
                    className="cursor-pointer text-gray-500"
                    onClick={() =>
                      setCurrentId((prev) =>
                        Math.min(prev + 1, rightSection.length - 1)
                      )
                    }
                  />
                </div>
              </div>
            </>
          )}

          <div id="right" className="hidden lg:block max-w-xs">
            <h1 className="font-bold text-xl mb-15">Feature showcase</h1>
            <ul className="font-roboto space-y-8">
              {rightSection.map((content, index) => (
                <div className="flex items-center" key={index}>
                  <div className="w-2 h-10 flex items-center justify-center">
                    {index === currentId && (
                      <div className="bg-cyan-500 w-1.5 h-14 rounded-xs"></div>
                    )}
                  </div>

                  <li
                    onClick={() => setCurrentId(index)}
                    className={`cursor-pointer ml-5 ${
                      index === currentId ? "text-black" : "text-gray-500"
                    }`}
                  >
                    {content}
                  </li>
                </div>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
};

// Footer section component
const FooterSection = () => (
  <section className="min-h-screen bg-gray-900 text-white flex items-center justify-center ">
    <div className="text-center px-4">
      <h2 className="text-4xl md:text-6xl font-bold mb-6">Ready to Start?</h2>
      <p className="text-xl md:text-2xl text-gray-300 mb-8 max-w-2xl mx-auto">
        Join thousands of users who are already enjoying our amazing features
      </p>
      <button className="bg-cyan-500 text-white px-8 py-3 rounded-lg text-lg font-medium hover:bg-cyan-600 transition-colors">
        Sign Up Now
      </button>
    </div>
  </section>
);

export default function Home() {
  return (
    <div className="overflow-x-hidden">
      <HeroSection />
      <FeatureShowcase />

      <FooterSection />
    </div>
  );
}
