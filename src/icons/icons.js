export const BookIcon = (props) => (
  <svg height="1em" viewBox="0 0 24 24" width="1em" xmlns="http://www.w3.org/2000/svg" {...props}>
    <path
      d="M6 22h15v-2H6.012C5.55 19.988 5 19.805 5 19s.55-.988 1.012-1H21V4c0-1.103-.897-2-2-2H6c-1.206 0-3 .799-3 3v14c0 2.201 1.794 3 3 3zM5 8V5c0-.805.55-.988 1-1h13v12H5V8z"
      fill="blue"
    />
    <path d="M8 6h9v2H8z" fill="currentColor" />
  </svg>
);

export const PullRequestIcon = (props) => (
  <svg height="1em" viewBox="0 0 24 24" width="1em" xmlns="http://www.w3.org/2000/svg" {...props}>
    <path
      d="M19.01 15.163V7.997C19.005 6.391 17.933 4 15 4V2l-4 3 4 3V6c1.829 0 2.001 1.539 2.01 2v7.163c-1.44.434-2.5 1.757-2.5 3.337 0 1.93 1.57 3.5 3.5 3.5s3.5-1.57 3.5-3.5c0-1.58-1.06-2.903-2.5-3.337zm-1 4.837c-.827 0-1.5-.673-1.5-1.5s.673-1.5 1.5-1.5 1.5.673 1.5 1.5-.673 1.5-1.5 1.5zM9.5 5.5C9.5 3.57 7.93 2 6 2S2.5 3.57 2.5 5.5c0 1.58 1.06 2.903 2.5 3.337v6.326c-1.44.434-2.5 1.757-2.5 3.337C2.5 20.43 4.07 22 6 22s3.5-1.57 3.5-3.5c0-1.58-1.06-2.903-2.5-3.337V8.837C8.44 8.403 9.5 7.08 9.5 5.5zm-5 0C4.5 4.673 5.173 4 6 4s1.5.673 1.5 1.5S6.827 7 6 7s-1.5-.673-1.5-1.5zm3 13c0 .827-.673 1.5-1.5 1.5s-1.5-.673-1.5-1.5S5.173 17 6 17s1.5.673 1.5 1.5z"
      fill="currentColor"
    />
  </svg>
);

export const FaceIcon = (props) => (
  <svg height="1em" viewBox="0 0 24 24" width="1em" xmlns="http://www.w3.org/2000/svg" {...props}>
    <path
      d="M12 2C6.486 2 2 6.486 2 12s4.486 10 10 10 10-4.486 10-10S17.514 2 12 2zm0 2c3.213 0 5.982 1.908 7.254 4.648a7.8 7.8 0 0 1-.895-.498c-.409-.258-.873-.551-1.46-.772-.669-.255-1.4-.378-2.234-.378s-1.565.123-2.234.377c-.587.223-1.051.516-1.472.781-.378.237-.703.443-1.103.594C9.41 8.921 8.926 9 8.33 9c-.595 0-1.079-.079-1.524-.248-.4-.151-.728-.358-1.106-.598-.161-.101-.34-.208-.52-.313C6.587 5.542 9.113 4 12 4zm0 16c-4.411 0-8-3.589-8-8 0-.81.123-1.59.348-2.327.094.058.185.11.283.173.411.26.876.554 1.466.776.669.255 1.399.378 2.233.378.833 0 1.564-.123 2.235-.377.587-.223 1.051-.516 1.472-.781.378-.237.703-.443 1.103-.595.445-.168.929-.247 1.525-.247s1.08.079 1.525.248c.399.15.725.356 1.114.602.409.258.873.551 1.46.773.363.138.748.229 1.153.291.049.357.083.717.083 1.086 0 4.411-3.589 8-8 8z"
      fill="blue"
    />
  </svg>
);

export const WallIcon = (props) => (
  <svg height="1em" viewBox="0 0 24 24" width="1em" xmlns="http://www.w3.org/2000/svg" {...props}>
    <path
      d="M20 7V5c0-1.103-.897-2-2-2H5C3.346 3 2 4.346 2 6v12c0 2.201 1.794 3 3 3h15c1.103 0 2-.897 2-2V9c0-1.103-.897-2-2-2zM5 5h13v2H5a1.001 1.001 0 0 1 0-2zm15 14H5.012C4.55 18.988 4 18.805 4 18V8.815c.314.113.647.185 1 .185h15v10z"
      fill="blue"
    />
  </svg>
);

export const PlusIcon = ({ size = 24, width, height, ...props }) => (
  <svg
    aria-hidden="true"
    fill="none"
    focusable="false"
    height={size || height}
    role="presentation"
    viewBox="0 0 24 24"
    width={size || width}
    {...props}
  >
    <g
      fill="none"
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={1.5}
    >
      <path d="M6 12h12" />
      <path d="M12 18V6" />
    </g>
  </svg>
);

export const SearchIcon = (props) => (
  <svg
    aria-hidden="true"
    fill="none"
    focusable="false"
    height="1em"
    role="presentation"
    viewBox="0 0 24 24"
    width="1em"
    {...props}
  >
    <path
      d="M11.5 21C16.7467 21 21 16.7467 21 11.5C21 6.25329 16.7467 2 11.5 2C6.25329 2 2 6.25329 2 11.5C2 16.7467 6.25329 21 11.5 21Z"
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="2"
    />
    <path
      d="M22 22L20 20"
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="2"
    />
  </svg>
);

export const ChevronDownIcon = ({ strokeWidth = 1.5, ...otherProps }) => (
  <svg
    aria-hidden="true"
    fill="none"
    focusable="false"
    height="1em"
    role="presentation"
    viewBox="0 0 24 24"
    width="1em"
    {...otherProps}
  >
    <path
      d="m19.92 8.95-6.52 6.52c-.77.77-2.03.77-2.8 0L4.08 8.95"
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeMiterlimit={10}
      strokeWidth={strokeWidth}
    />
  </svg>
);

export const VerticalDotsIcon = ({ size = 24, width, height, ...props }) => (
  <svg
    aria-hidden="true"
    fill="none"
    focusable="false"
    height={size || height}
    role="presentation"
    viewBox="0 0 24 24"
    width={size || width}
    {...props}
  >
    <path
      d="M12 10c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2zm0-6c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2zm0 12c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2z"
      fill="currentColor"
    />
  </svg>
);

export const MailIcon = (props) => (
  <svg
    aria-hidden="true"
    fill="none"
    focusable="false"
    height="1em"
    role="presentation"
    viewBox="0 0 24 24"
    width="1em"
    {...props}
  >
    <path
      d="M17 3.5H7C4 3.5 2 5 2 8.5V15.5C2 19 4 20.5 7 20.5H17C20 20.5 22 19 22 15.5V8.5C22 5 20 3.5 17 3.5ZM17.47 9.59L14.34 12.09C13.68 12.62 12.84 12.88 12 12.88C11.16 12.88 10.31 12.62 9.66 12.09L6.53 9.59C6.21 9.33 6.16 8.85 6.41 8.53C6.67 8.21 7.14 8.15 7.46 8.41L10.59 10.91C11.35 11.52 12.64 11.52 13.4 10.91L16.53 8.41C16.85 8.15 17.33 8.2 17.58 8.53C17.84 8.85 17.79 9.33 17.47 9.59Z"
      fill="currentColor"
    />
  </svg>
);

export const LockIcon = (props) => (
  <svg
    aria-hidden="true"
    fill="none"
    focusable="false"
    height="1em"
    role="presentation"
    viewBox="0 0 24 24"
    width="1em"
    {...props}
  >
    <path
      d="M12.0011 17.3498C12.9013 17.3498 13.6311 16.6201 13.6311 15.7198C13.6311 14.8196 12.9013 14.0898 12.0011 14.0898C11.1009 14.0898 10.3711 14.8196 10.3711 15.7198C10.3711 16.6201 11.1009 17.3498 12.0011 17.3498Z"
      fill="currentColor"
    />
    <path
      d="M18.28 9.53V8.28C18.28 5.58 17.63 2 12 2C6.37 2 5.72 5.58 5.72 8.28V9.53C2.92 9.88 2 11.3 2 14.79V16.65C2 20.75 3.25 22 7.35 22H16.65C20.75 22 22 20.75 22 16.65V14.79C22 11.3 21.08 9.88 18.28 9.53ZM12 18.74C10.33 18.74 8.98 17.38 8.98 15.72C8.98 14.05 10.34 12.7 12 12.7C13.66 12.7 15.02 14.06 15.02 15.72C15.02 17.39 13.67 18.74 12 18.74ZM7.35 9.44C7.27 9.44 7.2 9.44 7.12 9.44V8.28C7.12 5.35 7.95 3.4 12 3.4C16.05 3.4 16.88 5.35 16.88 8.28V9.45C16.8 9.45 16.73 9.45 16.65 9.45H7.35V9.44Z"
      fill="currentColor"
    />
  </svg>
);


export const PreviewIcon = (props) => (
  <svg
    width="16px"
    height="16px"
    viewBox="0 0 1024 1024"
    className="icon"
    version="1.1"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <path d="M511.9 924.8C91.8 924.8 2.6 524.1 1.7 520.1L0 512l1.7-8.1c0.8-4 90-404.7 510.2-404.7s509.4 400.7 510.2 404.7l1.9 9.1-2.4 9c-0.9 4-110.5 402.8-509.7 402.8zM80.6 511.9c13.7 52.8 102.2 334.2 431.4 334.2 310.8 0 413.7-279.5 431.1-335.1-14.6-55.5-104.2-333.2-431.1-333.2-330.4 0-417.8 281-431.4 334.1z" fill="#3688FF" /><path d="M511.9 708.6c-108.4 0-196.6-88.2-196.6-196.6s88.2-196.6 196.6-196.6c21.7 0 39.3 17.6 39.3 39.3 0 21.7-17.6 39.3-39.3 39.3-65 0-117.9 52.9-117.9 117.9s52.9 117.9 117.9 117.9 118-52.8 118-117.8c0-24.8-7.6-48.5-21.9-68.5-12.7-17.7-8.6-42.2 9.1-54.9 17.7-12.7 42.2-8.6 54.8 9.1 24 33.5 36.6 73 36.6 114.3 0 108.4-88.2 196.6-196.6 196.6z" fill="#5F6379" />
  </svg>
);

export const AboutMeIcon = (props) => (
  <svg
    width="1em"
    height="1em"
    viewBox="0 0 32 32"
    enableBackground="new 0 0 32 32"
    xmlSpace="preserve"
    xmlns="http://www.w3.org/2000/svg"
    xmlnsXlink="http://www.w3.org/1999/xlink"
    {...props}
  >
    <g id="Smart_Watch41" />
    <g id="Smart_Watch40">
      <g>
        <path
          d="M27,13h-1V9c0-1.65-1.35-3-3-3h-1.18H10.18H9C7.35,6,6,7.35,6,9v14c0,1.65,1.35,3,3,3h1.18h11.64H23    c1.65,0,3-1.35,3-3v-4h1c0.5527,0,1-0.4473,1-1v-4C28,13.4473,27.5527,13,27,13z M14.5,20.5c0-0.83,0.67-1.5,1.5-1.5    s1.5,0.67,1.5,1.5c0,0.83-0.67,1.5-1.5,1.5S14.5,21.33,14.5,20.5z M17,15.82V17c0,0.55-0.45,1-1,1s-1-0.45-1-1v-2    c0-0.55,0.45-1,1-1s1-0.45,1-1s-0.45-1-1-1s-1,0.45-1,1s-0.45,1-1,1s-1-0.45-1-1c0-1.65,1.35-3,3-3s3,1.35,3,3    C19,14.3,18.16,15.41,17,15.82z"
          fill="#A2C3FB"
        />
        <path
          d="M19.38,4h2.04l-0.44-2.2C20.89,1.34,20.48,1,20,1h-8c-0.48,0-0.89,0.34-0.98,0.8L10.58,4h2.04H19.38z"
          fill="blue"
        />
        <path
          d="M12.62,28h-2.04l0.44,2.2c0.09,0.46,0.5,0.8,0.98,0.8h8c0.48,0,0.89-0.34,0.98-0.8l0.44-2.2h-2.04H12.62z"
          fill="blue"
        />
      </g>
    </g>
    <g id="Smart_Watch39" />
    <g id="Smart_Watch38" />
    <g id="Smart_Watch37" />
    <g id="Smart_Watch36" />
    <g id="Smart_Watch35" />
    <g id="Smart_Watch34" />
    <g id="Smart_Watch33" />
    <g id="Smart_Watch32" />
    <g id="Smart_Watch31" />
    <g id="Smart_Watch30" />
    <g id="Smart_Watch29" />
    <g id="Smart_Watch28" />
    <g id="Smart_Watch27" />
    <g id="Smart_Watch26" />
    <g id="Smart_Watch25" />
    <g id="Smart_Watch24" />
    <g id="Smart_Watch23" />
    <g id="Smart_Watch22" />
    <g id="Smart_Watch21" />
    <g id="Smart_Watch20" />
    <g id="Smart_Watch19" />
    <g id="Smart_Watch18" />
    <g id="Smart_Watch17" />
    <g id="Smart_Watch16" />
    <g id="Smart_Watch15" />
    <g id="Smart_Watch14" />
    <g id="Smart_Watch13" />
    <g id="Smart_Watch12" />
    <g id="Smart_Watch11" />
    <g id="Smart_Watch10" />
    <g id="Smart_Watch09" />
    <g id="Smart_Watch08" />
    <g id="Smart_Watch07" />
    <g id="Smart_Watch06" />
    <g id="Smart_Watch05" />
    <g id="Smart_Watch04" />
    <g id="Smart_Watch03" />
    <g id="Smart_Watch02" />
  </svg>
);

export const TopicsIcon = (props) => (
  <svg
    width="1em"
    height="1em"
    viewBox="0 0 48 48"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <rect width={48} height={48} fill="white" fillOpacity={0.01} />
    <path
      d="M24 44C35.0457 44 44 35.0457 44 24C44 12.9543 35.0457 4 24 4C12.9543 4 4 12.9543 4 24C4 26.7117 4.53967 29.2974 5.51747 31.6554C6.02232 32.8729 6.64396 34.0297 7.36843 35.1119C7.61157 35.4751 7.15543 37.7711 6 42C10.2289 40.8446 12.5249 40.3884 12.8881 40.6316C13.9703 41.356 15.1271 41.9777 16.3446 42.4825C18.7026 43.4603 21.2883 44 24 44Z"
      fill="none"
      stroke="blue"
      strokeWidth={3}
      strokeLinejoin="round"
    />
    <path
      d="M16.6042 19.82H33.3835"
      stroke="blue"
      strokeWidth={3}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M21.8465 15.7378L18.9328 32.2622"
      stroke="blue"
      strokeWidth={3}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M28.8465 15.7378L25.9328 32.2622"
      stroke="blue"
      strokeWidth={3}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M14.6042 28H31.3835"
      stroke="blue"
      strokeWidth={3}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

export const MessageIcon = (props) => (
  <svg
    width="1em"
    height="1em"
    viewBox="0 -8.5 158 158"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <g clipPath="url(#clip0)">
      <path
        d="M25.3444 106.878C27.7828 108.544 28.102 109.755 26.8285 112.511C24.164 118.28 21.0905 125.117 18.4964 132.108C17.8052 133.97 17.7557 137.607 19.2508 139.067C20.4742 140.262 22.5497 140.426 24.5568 140.584C25.1503 140.631 25.7106 140.675 26.2382 140.744C26.3236 140.756 26.4095 140.761 26.4956 140.761C27.2256 140.692 27.9286 140.45 28.5463 140.056L28.8069 139.92C31.0067 138.785 33.2086 137.654 35.4126 136.526C41.7037 133.301 48.2085 129.963 54.5425 126.559L54.6018 126.528C62.2238 122.434 69.4168 118.566 78.2498 120.266C78.6185 120.325 78.9925 120.34 79.3651 120.309C79.483 120.303 79.6022 120.298 79.7188 120.297C100.703 120.106 116.873 115.762 130.606 106.626C151.64 92.6322 161.084 72.6056 156.517 51.6818C152.289 32.3089 143.953 20.2547 129.488 12.5985C114.782 4.81623 98.2103 0.344555 82.8262 0.00732422C82.8204 0.00829458 82.8145 0.00829458 82.8093 0.00732422C63.8205 0.0820479 47.9564 3.20238 32.8857 9.82936C14.6163 17.8612 4.59895 29.4004 2.26219 45.106C1.2549 51.4949 1.13475 57.9916 1.90517 64.4132C4.43476 83.9408 12.1024 97.831 25.3444 106.878ZM31.7762 122.668C33.0466 118.148 34.2452 113.879 35.7403 109.789C38.0855 103.379 34.6244 99.7777 31.3495 97.356C26.3685 93.6744 21.3302 89.436 18.2123 83.4113C10.1604 67.8526 9.06465 53.2775 14.86 38.8533C18.0032 31.0307 24.3842 25.2225 34.941 20.5741C49.512 14.1583 64.0147 10.9506 78.3527 10.9506C92.628 11.014 106.724 14.1301 119.691 20.088C134.661 26.8151 142.963 37.9101 145.818 55.0055C148.164 69.0345 144.266 80.7193 133.559 91.7764C124.025 101.622 111.17 107.416 93.1042 110.01C83.9989 111.317 73.2291 112.4 62.3899 110.52C61.0369 110.291 59.5235 111.136 58.2995 111.82C50.9622 115.933 43.6939 120.058 35.9996 124.425L30.3717 127.618C30.8629 125.919 31.3254 124.273 31.7762 122.668V122.668Z"
        fill="blue"
      />
      <path
        d="M50.4727 69.7116H50.5632C51.5856 69.7084 52.597 69.5011 53.5381 69.1028C54.4792 68.7038 55.3311 68.1223 56.0439 67.3913C56.6562 66.761 57.1341 66.0131 57.4489 65.1938C57.7636 64.3742 57.9086 63.4996 57.8751 62.6226C57.7597 60.8352 56.9862 59.1535 55.7032 57.9004C54.4202 56.6472 52.7181 55.9107 50.9241 55.833C49.971 55.839 49.0285 56.034 48.1513 56.406C47.2742 56.778 46.4798 57.3195 45.8141 58C45.0885 58.6916 44.507 59.5195 44.1032 60.436C43.6994 61.3525 43.4811 62.34 43.4611 63.3409C43.4557 64.1543 43.6132 64.9604 43.9245 65.7123C44.2357 66.4641 44.6943 67.1457 45.2734 67.7188C46.6738 69.043 48.5435 69.7597 50.4727 69.7116Z"
        fill="#000000"
      />
      <path
        d="M81.3262 71.5141H81.3913C83.1594 71.4998 84.8499 70.7896 86.0955 69.5382C87.4055 68.2679 88.1606 66.533 88.1964 64.7109C88.2114 62.8915 87.2016 60.7403 85.5613 59.0997C84.4492 57.855 82.8981 57.0869 81.2317 56.9556H81.2109C77.8461 56.9751 74.4957 60.6551 74.4468 64.3848C74.4299 65.3173 74.5993 66.2438 74.9452 67.11C75.2905 67.9768 75.8051 68.7662 76.4598 69.4323C77.0924 70.0833 77.8481 70.6025 78.6832 70.9599C79.519 71.3172 80.4167 71.5057 81.3262 71.5141Z"
        fill="#000000"
      />
      <path
        d="M110.697 70.7603H110.74C112.416 70.6959 114.011 70.0228 115.225 68.8681C116.439 67.7128 117.189 66.1554 117.333 64.4883C117.287 62.8406 116.594 61.2767 115.402 60.1347C113.8 58.3543 111.576 57.2516 109.186 57.0521C108.579 57.0402 107.977 57.1519 107.416 57.3796C106.854 57.6072 106.345 57.9462 105.919 58.3764C105.249 59.0638 104.722 59.8774 104.37 60.7699C104.018 61.6623 103.847 62.6157 103.869 63.5745C103.828 65.4283 104.522 67.2223 105.801 68.5679C107.079 69.913 108.839 70.7018 110.697 70.7603Z"
        fill="#000000"
      />
    </g>
    <defs>
      <clipPath id="clip0">
        <rect
          width={157}
          height={141}
          fill="white"
          transform="translate(0.777344)"
        />
      </clipPath>
    </defs>
  </svg>
);

export const DeleteIcon = (props) => (
  <svg
    aria-hidden="true"
    fill="none"
    focusable="false"
    height="1em"
    role="presentation"
    viewBox="0 0 20 20"
    width="1em"
    {...props}
  >
    <path
      d="M17.5 4.98332C14.725 4.70832 11.9333 4.56665 9.15 4.56665C7.5 4.56665 5.85 4.64998 4.2 4.81665L2.5 4.98332"
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={1.5}
    />
    <path
      d="M7.08331 4.14169L7.26665 3.05002C7.39998 2.25835 7.49998 1.66669 8.90831 1.66669H11.0916C12.5 1.66669 12.6083 2.29169 12.7333 3.05835L12.9166 4.14169"
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={1.5}
    />
    <path
      d="M15.7084 7.61664L15.1667 16.0083C15.075 17.3166 15 18.3333 12.675 18.3333H7.32502C5.00002 18.3333 4.92502 17.3166 4.83335 16.0083L4.29169 7.61664"
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={1.5}
    />
    <path
      d="M8.60834 13.75H11.3833"
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={1.5}
    />
    <path
      d="M7.91669 10.4167H12.0834"
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={1.5}
    />
  </svg>
);

export const SettingIcon = (props) => (
  <svg
    width="1em"
    height="1em"
    viewBox="0 0 1024 1024"
    className="icon"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <path
      d="M538.635 418.092h-59.712c-49.468 0-89.569 41.13-89.569 91.867 0 50.735 40.101 91.865 89.569 91.865h59.712c49.468 0 89.569-41.13 89.569-91.865 0-50.737-40.101-91.867-89.569-91.867z m-2.297 146.986h-55.119c-30.44 0-55.117-24.679-55.117-55.119 0-30.442 24.677-55.121 55.117-55.121h55.119c30.442 0 55.121 24.679 55.121 55.121 0 30.441-24.678 55.119-55.121 55.119z m321.531-165.357H820.65c-13.68-38.699-34.349-74.092-60.505-104.658l23.244-40.259c25.368-43.939 10.313-100.122-33.626-125.49l-31.822-18.373C674 85.573 617.817 100.626 592.448 144.565l-23.215 40.209a332.548 332.548 0 0 0-60.454-5.532c-20.649 0-40.85 1.91-60.451 5.531l-23.214-40.209c-25.37-43.939-81.552-58.992-125.492-33.625L267.8 129.314c-43.939 25.368-58.994 81.551-33.626 125.49l23.242 40.257c-26.157 30.567-46.827 65.96-60.507 104.66h-37.216c-50.735 0-91.865 41.13-91.865 91.865v36.746c0 50.735 41.13 91.865 91.865 91.865h37.216c13.68 38.7 34.35 74.093 60.508 104.66l-23.243 40.258c-25.368 43.939-10.313 100.122 33.626 125.49l31.822 18.373c43.939 25.368 100.122 10.315 125.492-33.625l23.215-40.21a332.504 332.504 0 0 0 60.45 5.531c20.65 0 40.852-1.91 60.453-5.532l23.216 40.211c25.37 43.939 81.552 58.992 125.492 33.625l31.822-18.373c43.939-25.368 58.994-81.551 33.626-125.49l-23.244-40.26c26.156-30.566 46.826-65.958 60.505-104.658h37.219c50.735 0 91.865-41.13 91.865-91.865v-36.746c0.001-50.735-41.129-91.865-91.864-91.865z m0 183.731h-64.383c-13.523 52.541-41.217 99.387-78.751 136.248l27.642 47.878c20.295 35.149 8.251 80.097-26.9 100.392-35.151 20.293-80.097 8.25-100.392-26.9l-27.602-47.808c-25.051 6.945-51.442 10.667-78.704 10.667-27.261 0-53.651-3.722-78.701-10.667l-27.602 47.808c-20.295 35.15-65.241 47.193-100.392 26.9-35.151-20.295-47.195-65.243-26.9-100.392l27.641-47.876c-37.535-36.861-65.23-83.707-78.753-136.249h-46.006c-40.588 0-73.492-32.904-73.492-73.492s32.904-73.492 73.492-73.492h46.006c13.523-52.542 41.219-99.389 78.753-136.25l-27.641-47.876c-20.295-35.149-8.251-80.097 26.9-100.392 35.151-20.293 80.097-8.249 100.392 26.9l27.602 47.808c25.05-6.944 51.44-10.666 78.701-10.666 27.262 0 53.653 3.723 78.704 10.667l27.602-47.808c20.295-35.149 65.241-47.193 100.392-26.9 35.151 20.295 47.195 65.243 26.9 100.392l-27.642 47.878c37.533 36.861 65.228 83.706 78.751 136.248h64.383c40.588 0 55.119 32.904 55.119 73.492s-14.531 73.49-55.119 73.49z"
      fill="blue"
    />
  </svg>
);
