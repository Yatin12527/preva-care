import Image from "next/image";
export default function Home() {
  return (
    <div className="min-h-screen">
     <div className="flex flex-col md:flex-row justify-between items-center w-full p-10 gap-8">
        <div id="left" className="flex-1 max-w-md">
          <h1 className="font-bold text-xl text-cyan-500 mb-15">
            Feature No. 1 -
          </h1>
          <h2 className="font-bold text-2xl mb-15">TEXT HEADING DISPLAY</h2>
          <ul className="list-disc ml-6 font-roboto text-gray-500 space-y-2">
            <li>
              Vivamus varius orci ac lacus feugiat, nec aliquam justo posuere.
              Integer viverra ligula et sapien accumsan vehicula.
            </li>
            <li>
              Morbi facilisis erat sed ex convallis, id faucibus nulla
              ullamcorper. Praesent vulputate mauris ut porttitor tempor.
            </li>
            <li>
              Curabitur blandit lectus vel mi gravida, sed porta lacus
              tristique. Nulla feugiat augue ac dui viverra, sit amet.
            </li>
            <li>
              Donec posuere urna vitae enim interdum, vitae tincidunt risus
              pretium. Phasellus rhoncus eros sed lectus efficitur.
            </li>
          </ul>
        </div>
        <div id="middle" className="flex-shrink-0">
          <Image src="/iphone.webp" width={600} height={600} alt="Iphone" />
        </div>
        <div id="right" className="hidden md:block max-w-xs">
          <h1 className="font-bold text-xl mb-15">Feature showcase</h1>
          <ul className="font-roboto text-gray-500 space-y-10 ml-8">
            <li>Feature 1: Lorem ipsum dolor</li>
            <li>Feature 2: Lorem ipsum dolor</li>
            <li>Feature 3: Lorem ipsum dolor</li>
            <li>Feature 4: Lorem ipsum dolor</li>
            <li>Feature 5: Lorem ipsum dolor</li>
          </ul>
        </div>
      </div>
    </div>
  );
}
