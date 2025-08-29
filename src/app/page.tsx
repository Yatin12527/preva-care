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
  const [isMobile, setIsMobile] = useState(false);
  const sectionRef = useRef<HTMLDivElement | null>(null);
  const isScrolling = useRef(false);
  const currentContent = data.find((item) => item.id === currentId);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 768);
    };

    checkMobile();
    window.addEventListener("resize", checkMobile);

    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  const getHeightMultiplier = () => {
    if (typeof window !== "undefined") {
      return window.innerWidth <= 768 ? 0 : 25;
    }
    return 25;
  };

  useEffect(() => {
    if (isMobile) return;

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

        if (e.deltaY > 0) {
          setCurrentId((prev) => Math.min(prev + 1, rightSection.length - 1));
        } else if (e.deltaY < 0) {
          setCurrentId((prev) => Math.max(prev - 1, 0));
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
  }, [currentId, isMobile]);

  useEffect(() => {
    if (!isMobile) return;

    const handleScroll = (e: Event) => {
      const container = e.target as HTMLElement;
      if (!container.classList.contains("horizontal-scroll")) return;

      const scrollLeft = container.scrollLeft;
      const cardWidth = 320;
      const currentIndex = Math.round(scrollLeft / cardWidth);

      if (
        currentIndex !== currentId &&
        currentIndex >= 0 &&
        currentIndex < rightSection.length
      ) {
        setCurrentId(currentIndex);
      }
    };

    const scrollContainer = document.querySelector(".horizontal-scroll");
    if (scrollContainer) {
      scrollContainer.addEventListener("scroll", handleScroll, {
        passive: true,
      });
      return () => scrollContainer.removeEventListener("scroll", handleScroll);
    }
  }, [isMobile, currentId]);

  // Mobile version - horizontal scrolling behavior
  if (isMobile) {
    return (
      <section className="min-h-screen bg-white flex items-center py-8">
        <div className="w-full">
          {/* Horizontal scrollable container */}
          <div
            className="flex overflow-x-auto gap-8 px-4 pb-4 horizontal-scroll"
            style={{
              scrollSnapType: "x mandatory",
              scrollbarWidth: "none",
              msOverflowStyle: "none",
            }}
          >
            {rightSection.map((_, index) => {
              const content = data.find((item) => item.id === index);
              if (!content) return null;

              return (
                <div
                  key={index}
                  className="flex-none w-80 bg-white rounded-lg p-6 flex flex-col justify-center"
                  style={{
                    scrollSnapAlign: "center",
                    minHeight: "70vh",
                  }}
                >
                  <div className="text-center mb-6">
                    <h1 className="font-bold text-xl text-cyan-500 mb-4">
                      {content.leftHeading}
                    </h1>
                    <h2 className="font-bold text-2xl mb-6">
                      {content.leftSubHeading}
                    </h2>
                    <ul className="list-disc text-left text-gray-500 space-y-2 mb-6">
                      {content.leftListData.map((item, listIndex) => (
                        <li key={listIndex}>{item}</li>
                      ))}
                    </ul>
                  </div>

                  <div className="flex justify-center mb-6">
                    <Image
                      src={content.img}
                      width={200}
                      height={200}
                      alt="phone"
                      className="w-auto h-auto max-w-full"
                    />
                  </div>

                  {/* Feature number */}
                  <div className="text-center">
                    <span className="text-cyan-500 font-semibold">
                      {index + 1} / {rightSection.length}
                    </span>
                  </div>
                </div>
              );
            })}
          </div>

          <style jsx>{`
            .horizontal-scroll::-webkit-scrollbar {
              display: none;
            }
          `}</style>
          <div className="flex justify-center mt-6 space-x-2">
            {rightSection.map((_, dotIndex) => (
              <div
                key={dotIndex}
                className={`w-2 h-2 rounded-full ${
                  dotIndex === currentId ? "bg-cyan-500" : "bg-gray-300"
                }`}
              />
            ))}
          </div>

          {/* Swipe hint */}
          <div className="text-center mt-4">
            <p className="text-gray-400 text-sm">
              ← Swipe to explore features →
            </p>
          </div>
        </div>
      </section>
    );
  }

  // Desktop version - original sticky behavior
  return (
    <section
      ref={sectionRef}
      className="min-h-screen sticky top-0"
      style={{ height: `${rightSection.length * getHeightMultiplier()}vh` }}
    >
      <div className="min-h-screen overflow-hidden">
        <div className="flex flex-row justify-between items-center w-full p-20 gap-8">
          {currentContent && (
            <>
              <div id="left" className="flex-1 max-w-md">
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
                <div className="flex gap-x-2 items-center mt-20">
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
              <div id="middle" className="w-2xl">
                <Image
                  src={currentContent.img}
                  width={600}
                  height={600}
                  alt="phone"
                />
              </div>
            </>
          )}

          <div id="right" className="max-w-xs">
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
  <section className="min-h-screen bg-gray-900 text-white flex items-center justify-center">
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
