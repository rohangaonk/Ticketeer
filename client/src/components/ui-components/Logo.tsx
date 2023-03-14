import React from "react";

function Logo() {
  return (
    <span>
      <svg
        width="41"
        height="45"
        viewBox="0 0 41 45"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="fill-sky-400 dark:fill-sky-500 inline h-8"
      >
        <path d="M0.000790384 7.54664C-0.0524463 4.23336 2.59034 1.50426 5.90362 1.45102L39.9241 0.904396L40.0205 6.90362C40.0737 10.2169 37.4309 12.946 34.1176 12.9992L27.608 13.1038L30.7967 18.6268C32.4536 21.4966 31.4703 25.1661 28.6005 26.823L23.4044 29.823L14.9044 15.1005C14.5755 14.5308 14.3506 13.9296 14.2239 13.3189L0.0971839 13.5459L0.000790384 7.54664ZM23.7967 33.6268L15.2967 18.9044L10.1005 21.9044C7.23079 23.5613 6.24754 27.2308 7.9044 30.1005L16.4044 44.823L21.6005 41.823C24.4703 40.1661 25.4536 36.4966 23.7967 33.6268Z" />
      </svg>
      <span className="dark:text-stone-300 text-xl font-bold tracking-wider font-nunito ">
        TICKETEER
      </span>
    </span>
  );
}

export default Logo;
