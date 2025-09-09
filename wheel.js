let canvas = document.getElementById('wheelCanvas');
let ctx = canvas.getContext('2d');

let startAngle = 0;
let spinning = false;
let anglePerSegment;
const radius = canvas.width / 2;
const duration = 5000;
let segmentAngles = [];

const tickAudio = new Audio(chrome.runtime.getURL("tick.mp3"));
tickAudio.preload = "auto";


// Visual: Glow/Shadow Setup
function setGlow() {
  ctx.shadowColor = 'rgba(0, 0, 0, 0.5)';
  ctx.shadowBlur = 10;
}

function drawWheel(labels) {
  const total = labels.length;

  anglePerSegment = (2 * Math.PI) / total;
  segmentAngles = [];

  // Cycle through 3 distinct colors
  const segmentColors = ['#d40000', '#fff600', '#009e60','#00FFFF']; // red, yellow, green , cyan

  ctx.clearRect(0, 0, canvas.width, canvas.height);
  setGlow();

  labels.forEach((name, i) => {
    const angleStart = (startAngle + anglePerSegment * i) % (2 * Math.PI);
    const angleEnd = (angleStart + anglePerSegment) % (2 * Math.PI);

    segmentAngles.push({ name, start: angleStart, end: angleEnd });

    ctx.beginPath();
    ctx.moveTo(radius, radius);
    ctx.arc(radius, radius, radius, angleStart, angleEnd);
    ctx.fillStyle = segmentColors[i % segmentColors.length];  // cycle through colors
    ctx.fill();
    ctx.strokeStyle = 'gold';
    ctx.lineWidth = 2;
    ctx.stroke();

    ctx.save();
    ctx.translate(radius, radius);
    ctx.rotate(angleStart + anglePerSegment / 2);
    ctx.textAlign = 'right';
    ctx.fillStyle = '#fff';
    ctx.font = `${labels.length > 12 ? '11' : '14'}px sans-serif`;
    ctx.fillText(name, radius - 12, 0);
    ctx.restore();
  });

  // Center disc gloss
  ctx.beginPath();
  ctx.arc(radius, radius, 18, 0, 2 * Math.PI);
  ctx.fillStyle = '#ffffffcc';
  ctx.fill();
  ctx.strokeStyle = '#000';
  ctx.stroke();

  drawPointer(radius);
}

function drawPointer(radius) {
  ctx.save();
  ctx.translate(radius, radius);
  ctx.beginPath();
  ctx.moveTo(0, -radius);
  ctx.lineTo(-15, -radius + 20);
  ctx.lineTo(15, -radius + 20);
  ctx.closePath();
  ctx.fillStyle = '#000';
  ctx.fill();
  ctx.restore();
}

function getPickedFromSegments() {
  const pointerAngle = (3 * Math.PI / 2) % (2 * Math.PI);

  for (const seg of segmentAngles) {
    const start = (seg.start + 2 * Math.PI) % (2 * Math.PI);
    const end = (seg.end + 2 * Math.PI) % (2 * Math.PI);

    if (start < end) {
      if (pointerAngle >= start && pointerAngle < end) return seg.name;
    } else {
      if (pointerAngle >= start || pointerAngle < end) return seg.name;
    }
  }

  return null;
}

function spinWheel(labels, onFinish) {
  if (spinning) return;

  spinning = true;
  const now = performance.now();
  const totalRotations = 6;
  const randomOffset = Math.random() * 2 * Math.PI;
  const totalAngle = totalRotations * 2 * Math.PI + randomOffset;
  let lastTickIndex = -1;

  // Play full tick.mp3 to match 5s
  tickAudio.currentTime = 0;
  tickAudio.play();

  function easeOut(t) {
    return 1 - Math.pow(1 - t, 3);
  }

  function animate(currentTime) {
    const elapsed = currentTime - now;
    const progress = Math.min(elapsed / duration, 1);
    const easedProgress = easeOut(progress);
    const currentAngle = easedProgress * totalAngle;

    startAngle = currentAngle;

    // Determine tick based on segment passed
    const tickIndex = Math.floor(currentAngle / anglePerSegment);
    if (tickIndex !== lastTickIndex) {
      lastTickIndex = tickIndex;
      // Optional per-tick effect could go here
    }
    drawWheel(labels);

    if (progress < 1) {
      requestAnimationFrame(animate);
    } else {
      tickAudio.pause();
      tickAudio.currentTime = 0;

      // Optional winning visual (confetti)
      if (typeof confetti === 'function') {
        confetti({ particleCount: 100, spread: 70, origin: { y: 0.6 } });
      }

      const picked = getPickedFromSegments();
      onFinish(picked || labels[0]);
      spinning = false;
    }
  }

  requestAnimationFrame(animate);
}
