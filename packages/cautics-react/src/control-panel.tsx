export default function FloatingGenerateButton() {
  return (
    <>
      <style>{`
        .floating-generate-btn {
          opacity: 0.4;
          position: fixed;
          right: 20px;
          bottom: 20px;
          transform: translateY(-50%);
          display: inline-flex;
          align-items: center;
          justify-content: center;
          padding: 14px 20px;
          border: none;
          border-radius: 999px;
          background: #0f172a;
          color: #f8fafc;
          font-size: 14px;
          font-weight: 600;
          cursor: pointer;
          box-shadow:
            0 10px 25px rgba(0, 0, 0, 0.25),
            0 2px 8px rgba(0, 0, 0, 0.2);
          transition:
            transform 0.2s ease,
            background 0.2s ease,
            box-shadow 0.2s ease,
            opacity 0.2s ease;
          z-index: 9999;
        }

        .floating-generate-btn:hover {
                  opacity: 1;

          background: #1e293b;
        }

        .floating-generate-btn:active {
          transform: translateY(-50%) scale(0.98);
        }

        .floating-generate-btn__dot {
          position: absolute;
          top: 6px;
          right: 6px;
          width: 10px;
          height: 10px;
          border-radius: 999px;
          background: #22c55e;
          border: 2px solid #0f172a;
          box-shadow: 0 0 0 2px rgba(34, 197, 94, 0.15);
        }
      `}</style>

      <button className="floating-generate-btn">
        Generate skeletons
        <span className="floating-generate-btn__dot" />
      </button>
    </>
  );
}
