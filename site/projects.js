const frequency = document.querySelector('#frequency');
const amplitude = document.querySelector('#amplitude');
function drawTrace() {
  const hz = Number(frequency.value);
  const volts = Number(amplitude.value);
  const points = [];
  for (let x = 0; x <= 640; x += 2) {
    const y = 80 - 70 * volts * Math.sin(2 * Math.PI * hz * x / 640);
    points.push((x === 0 ? 'M' : 'L') + x + ' ' + y.toFixed(2));
  }
  document.querySelector('#trace').setAttribute('d', points.join(' '));
  document.querySelector('#hz').value = hz + ' Hz';
  document.querySelector('#volts').value = volts + ' V';
}
for (const control of [frequency, amplitude]) control.addEventListener('input', drawTrace);
drawTrace();
