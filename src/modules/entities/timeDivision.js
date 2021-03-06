// in beats per minute, a "beat" is a quarter note
function createTimeDivision(bpm) {
  // n4 = quarter note, etc
  // normally would be 60000 / bpm but we're clocking every 10 ms
  const n4 = 6000 / bpm;
  const n8 = n4 / 2;
  const n16 = n4 / 4;
  const n2 = n4 * 2;
  const n1 = n4 * 4;

  const n12 = n4 / 3;
  const n6 = n12 * 2;
  const n3 = n6 * 2;
  
  return { bpm, n1, n2, n3, n4, n6, n8, n12, n16 };
}

export { createTimeDivision };
