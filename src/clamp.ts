const clamp = (min: number, val: number, max: number) => {
  if (min > max) {
    [min, max] = [max, min];
  }
  return Math.max(min, Math.min(max, val));
};
export default clamp;