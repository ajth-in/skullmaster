type ProgressCircleProps = {
  "aria-label": string;
  isIndeterminate?: boolean;
};

export default function ProgressCircle({
  "aria-label": ariaLabel,
  isIndeterminate = false,
}: ProgressCircleProps) {
  return (
    <>
      <style>{`
        .progress-circle {
          width: 16px;
          height: 16px;
          border-radius: 9999px;
          border: 2px solid rgba(255,255,255,0.2);
          border-top-color: white;
          display: inline-block;
          box-sizing: border-box;
        }

        .progress-circle.indeterminate {
          animation: progress-spin 0.8s linear infinite;
        }

        @keyframes progress-spin {
          from {
            transform: rotate(0deg);
          }

          to {
            transform: rotate(360deg);
          }
        }
      `}</style>

      <div
        role="progressbar"
        aria-label={ariaLabel}
        aria-valuetext={isIndeterminate ? "Loading in progress" : undefined}
        className={`progress-circle ${isIndeterminate ? "indeterminate" : ""}`}
      />
    </>
  );
}
