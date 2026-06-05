const seededValue = (index, offset) => {
  const value = Math.sin(index * 12.9898 + offset * 78.233) * 43758.5453;
  return value - Math.floor(value);
};

export const createFloatingParticles = (count, seed = 1) =>
  Array.from({ length: count }, (_, index) => {
    const particle = index + seed * 100;

    return {
      id: index,
      left: `${(seededValue(particle, 1) * 100).toFixed(4)}%`,
      top: `${(seededValue(particle, 2) * 100).toFixed(4)}%`,
      x: [
        Number((seededValue(particle, 3) * 100 - 50).toFixed(4)),
        Number((seededValue(particle, 4) * 200 - 100).toFixed(4)),
      ],
      y: [
        Number((seededValue(particle, 5) * 100 - 50).toFixed(4)),
        Number((seededValue(particle, 6) * 200 - 100).toFixed(4)),
      ],
      duration: Number((5 + seededValue(particle, 7) * 5).toFixed(4)),
      delay: Number((seededValue(particle, 8) * 5).toFixed(4)),
    };
  });
