export const GridBackground = () => (
  <>
    <div
      className="absolute inset-0 pointer-events-none"
      style={{
        backgroundSize: "20px 20px",
        backgroundImage:
          "linear-gradient(to right, #e4e4e7 1px, transparent 1px), linear-gradient(to bottom, #e4e4e7 1px, transparent 1px)",
      }}
    />
    <div className="pointer-events-none absolute inset-0 bg-white [mask-image:radial-gradient(ellipse_at_center,transparent_20%,black)]" />
  </>
);
