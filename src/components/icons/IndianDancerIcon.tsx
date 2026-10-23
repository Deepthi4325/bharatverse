import React from "react";

interface IndianDancerIconProps extends React.SVGProps<SVGSVGElement> {
  size?: number | string;
  className?: string;
}

export const IndianDancerIcon: React.FC<IndianDancerIconProps> = ({
  size = 24,
  className = "",
  ...props
}) => {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 512 512"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      {...props}
    >
      {/* Hair Bun */}
      <circle cx="280" cy="76" r="34" fill="#476A79" />

      {/* Head Base */}
      <circle cx="230" cy="112" r="42" fill="#FFA085" />

      {/* Hair Cap on Head */}
      <path
        d="M192 108C190 76 215 58 250 64C276 68 274 95 264 116C242 126 204 122 192 108Z"
        fill="#476A79"
      />

      {/* Neck */}
      <path d="M218 145L242 145L248 185L212 185Z" fill="#FFA085" />

      {/* Raised Left Arm (Viewer's Right) - Upper Arm Sleeve */}
      <path
        d="M272 166L390 144L402 198L284 220Z"
        fill="#A363E7"
      />
      {/* Raised Left Arm - Forearm & Mudra Hand */}
      <path
        d="M386 148L462 48C472 35 488 20 500 12C506 8 512 18 506 28C498 42 478 72 468 92L498 48C506 36 515 45 508 58C496 82 460 135 442 165L398 198L386 148Z"
        fill="#FFA085"
      />

      {/* Extended Right Arm (Viewer's Left) - Sleeve */}
      <path
        d="M212 185L144 262L172 290L230 205Z"
        fill="#A363E7"
      />
      {/* Extended Right Arm - Forearm & Hand */}
      <path
        d="M152 268L18 304C8 307 0 316 2 328C4 340 14 348 26 352L46 358C28 362 18 368 18 376C18 386 36 388 52 384L172 322L172 290L152 268Z"
        fill="#FFA085"
      />

      {/* Blouse Body / Torso */}
      <path
        d="M212 185L276 166L292 278L224 314Z"
        fill="#A363E7"
      />

      {/* Diagonal Green Sash / Pallu */}
      <path
        d="M276 166L316 160L242 314L224 314Z"
        fill="#83D45A"
      />

      {/* Golden Yellow Skirt Base */}
      <path
        d="M224 314L320 286C320 286 376 400 376 496C376 504 368 512 358 512H144C132 512 124 502 128 490L224 314Z"
        fill="#FED348"
      />

      {/* Skirt Pleat Drape Layer (Light Golden Yellow) */}
      <path
        d="M224 314C224 314 268 332 300 370C338 416 374 466 374 496C374 506 366 512 354 512H270C200 512 150 460 224 314Z"
        fill="#FFE57A"
      />

      {/* Bottom Right Skirt Shadow Curve */}
      <path
        d="M328 386C356 428 376 468 376 496C376 505 370 512 360 512L340 512C350 490 340 450 318 416L328 386Z"
        fill="#F6B832"
      />

      {/* Traditional Sun/Swirl Motifs on Skirt */}
      <g fill="#FFECA2">
        <path d="M256 414C256 408 262 404 268 406C276 408 282 418 280 426C278 434 270 436 264 432C258 428 256 420 256 414Z" />
        <path d="M246 430C240 428 234 432 232 438C230 446 236 454 244 456C252 456 256 450 254 442C252 436 248 432 246 430Z" />
        <path d="M268 450C266 456 270 462 276 464C284 466 292 460 294 452C294 444 288 440 280 442C274 444 270 446 268 450Z" />
        <path d="M284 424C290 422 296 426 298 432C300 440 294 448 286 450C278 450 274 444 276 436C278 430 282 426 284 424Z" />
        <path d="M248 406C244 412 238 414 232 412C224 408 220 398 224 390C228 384 236 384 242 390C246 394 248 402 248 406Z" />
      </g>
    </svg>
  );
};
