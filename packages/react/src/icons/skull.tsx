import type { SVGProps } from "react";

type SkullIconProps = SVGProps<SVGSVGElement> & {
  size?: number | string;
  furious?: boolean;
};

export default function SkullIcon({
  size = "1em",
  furious = false,
  style,
  ...props
}: SkullIconProps) {
  const eyeColor = furious ? "#f4250a" : "currentColor";
  const skullColor = furious ? "#facc15" : "currentColor";

  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="none"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="2"
      style={{
        width: size,
        height: size,
        flexShrink: 0,
        ...style,
      }}
      {...props}
    >
      <path d="m12.5 17-.5-1-.5 1z" stroke={skullColor} />
      <path
        d="M15 22a1 1 0 0 0 1-1v-1a2 2 0 0 0 1.56-3.25 8 8 0 1 0-11.12 0A2 2 0 0 0 8 20v1a1 1 0 0 0 1 1z"
        stroke={skullColor}
      />

      {[9, 15].map((cx) => (
        <circle key={cx} cx={cx} cy="12" r="1" stroke={eyeColor} />
      ))}
    </svg>
  );
}
