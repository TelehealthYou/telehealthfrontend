import svgPaths from "./svg-exg8xwg128";

function Heading1() {
  return (
    <div className="absolute h-[300px] left-0 top-0 w-[453.6px]" data-name="Heading 1">
      <p className="absolute font-['Open_Sans',sans-serif] font-extrabold leading-[75px] left-0 not-italic text-[42px] top-[2.2px] w-[433px]" style={{ color: '#28436F' }}>Take control of your health with online care</p>
    </div>
  );
}

function Paragraph() {
  return (
    <div className="absolute h-[97.5px] left-0 top-[324px] w-[453.6px]" data-name="Paragraph">
      <p className="absolute font-['Open_Sans',sans-serif] leading-[32.5px] left-0 not-italic text-[#4a6fa5] text-[20px] top-[0.6px] w-[450px]">Quick and affordable virtual care for opioid addiction, hormone therapy, weight loss, and urgent health needs.</p>
    </div>
  );
}

function Icon() {
  return (
    <div className="absolute left-[97.41px] size-[16px] top-[16px]" data-name="Icon">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 16 16">
        <g id="Icon">
          <path d="M3.33334 8H12.6667" id="Vector" stroke="var(--stroke-0, white)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33333" />
          <path d={svgPaths.p31d670c0} id="Vector_2" stroke="var(--stroke-0, white)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33333" />
        </g>
      </svg>
    </div>
  );
}

function Button() {
  return (
    <div className="absolute bg-[#01578c] h-[48px] left-0 rounded-[2.68435e+07px] shadow-[0px_10px_15px_-3px_rgba(0,0,0,0.1),0px_4px_6px_-4px_rgba(0,0,0,0.1)] top-[453.5px] w-[125.412px]" data-name="Button">
      <p className="absolute font-['Open_Sans',sans-serif] font-semibold leading-[20px] left-[12px] not-italic text-[14px] text-nowrap text-white top-[14px] whitespace-pre">Book Now</p>
      <Icon />
    </div>
  );
}

function Container() {
  return (
    <div className="absolute h-[501.5px] left-[90px] top-[calc(50%-0.25px)] translate-y-[-50%] w-[485.6px]" data-name="Container">
      <Heading1 />
      <Paragraph />
      <Button />
    </div>
  );
}

function Group1() {
  return (
    <div className="absolute contents left-[90px] top-[34px]">
      <div className="absolute h-[269px] left-[825px] top-[34px] w-[118px]">
        <video autoPlay className="absolute max-w-none object-cover size-full" controlsList="nodownload" loop playsInline>
          <source src="/_videos/v1/ba646746229f0663f306bed686bc506245278e7e" />
        </video>
      </div>
      <div className="absolute h-[269px] left-[825px] top-[435px] w-[118px]">
        <video autoPlay className="absolute max-w-none object-cover size-full" controlsList="nodownload" loop playsInline>
          <source src="/_videos/v1/ba646746229f0663f306bed686bc506245278e7e" />
        </video>
      </div>
      <div className="absolute h-[270px] left-[943px] top-[131px] w-[118px]">
        <video autoPlay className="absolute max-w-none object-cover size-full" controlsList="nodownload" loop playsInline>
          <source src="/_videos/v1/3ce02496136fd62277aac840874ed0501fe50631" />
        </video>
      </div>
      <div className="absolute h-[270px] left-[943px] top-[532px] w-[118px]">
        <video autoPlay className="absolute max-w-none object-cover size-full" controlsList="nodownload" loop playsInline>
          <source src="/_videos/v1/3ce02496136fd62277aac840874ed0501fe50631" />
        </video>
      </div>
      <Container />
      <div className="absolute flex h-[calc(1px*((var(--transform-inner-width)*1)+(var(--transform-inner-height)*0)))] items-center justify-center left-[943px] top-[130px] w-[calc(1px*((var(--transform-inner-height)*1)+(var(--transform-inner-width)*0)))]" style={{ "--transform-inner-width": "173", "--transform-inner-height": "0" } as React.CSSProperties}>
        <div className="flex-none rotate-[90deg]">
          <div className="h-0 relative w-[173px]">
            <div className="absolute bottom-0 left-0 right-0 top-[-1px]">
              <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 173 1">
                <line id="Line 1" stroke="var(--stroke-0, white)" x2="173" y1="0.5" y2="0.5" />
              </svg>
            </div>
          </div>
        </div>
      </div>
      <div className="absolute flex h-[calc(1px*((var(--transform-inner-width)*1)+(var(--transform-inner-height)*0)))] items-center justify-center left-[943px] top-[531px] w-[calc(1px*((var(--transform-inner-height)*1)+(var(--transform-inner-width)*0)))]" style={{ "--transform-inner-width": "173", "--transform-inner-height": "0" } as React.CSSProperties}>
        <div className="flex-none rotate-[90deg]">
          <div className="h-0 relative w-[173px]">
            <div className="absolute bottom-0 left-0 right-0 top-[-1px]">
              <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 173 1">
                <line id="Line 1" stroke="var(--stroke-0, white)" x2="173" y1="0.5" y2="0.5" />
              </svg>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function Frame1() {
  return (
    <div className="bg-white relative size-full">
      <Group1 />
    </div>
  );
}