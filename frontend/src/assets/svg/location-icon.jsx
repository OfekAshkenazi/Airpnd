// icon:map-pin | Feathericons https://feathericons.com/ | Cole Bemis
import * as React from "react";

function IconMapPin(props) {
  return (
    <svg
      fill="none"
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      viewBox="0 0 24 24"
      height="1em"
      width="1em"
      {...props}
    >
      <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z" />
      <path d="M15 10 A3 3 0 0 1 12 13 A3 3 0 0 1 9 10 A3 3 0 0 1 15 10 z" />
    </svg>
  );
}

export default IconMapPin;
