/**
 * Decorative gradient-mesh backdrop — the brand's signature atmospheric hero.
 * Approximated with radial-gradient blobs as per DESIGN.md guidance.
 */
export default function GradientMesh({ style }) {
  return (
    <div
      aria-hidden="true"
      style={{
        position: 'absolute',
        inset: 0,
        zIndex: 0,
        overflow: 'hidden',
        borderRadius: 'inherit',
        ...style,
      }}
    >
      {/* cream / sherbet orange stop */}
      <div
        style={{
          position: 'absolute',
          width: '70%',
          height: '140%',
          top: '-30%',
          left: '-10%',
          background:
            'radial-gradient(ellipse at 30% 40%, #f5e9d4 0%, transparent 60%)',
          opacity: 0.9,
        }}
      />
      {/* lavender stop */}
      <div
        style={{
          position: 'absolute',
          width: '60%',
          height: '120%',
          top: '-20%',
          left: '20%',
          background:
            'radial-gradient(ellipse at 50% 30%, #d6c6fd 0%, transparent 55%)',
          opacity: 0.7,
        }}
      />
      {/* indigo stop */}
      <div
        style={{
          position: 'absolute',
          width: '50%',
          height: '100%',
          top: '-10%',
          right: '5%',
          background:
            'radial-gradient(ellipse at 70% 20%, #533afd 0%, transparent 50%)',
          opacity: 0.25,
        }}
      />
      {/* ruby / magenta stop */}
      <div
        style={{
          position: 'absolute',
          width: '40%',
          height: '80%',
          top: '10%',
          right: '-5%',
          background:
            'radial-gradient(ellipse at 80% 30%, #ea2261 0%, transparent 50%)',
          opacity: 0.2,
        }}
      />
    </div>
  );
}
