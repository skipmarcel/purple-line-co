// The kiosk walkthrough is one looping timeline. Each scene has a duration;
// computeFrame(t) turns the current time into everything the scenes need to draw.
// Tweak timings here; the scenes themselves stay dumb.

export const RESTART_DEMO_EVENT = 'pl:restart-demo';

export const SHOP_NAME = 'Rose City';

export const SCENES = [
  { id: 'welcome',   label: 'Welcome',                         duration: 2600, step: 0 },
  { id: 'details',   label: 'Step 1 · Their details',          duration: 3800, step: 1 },
  { id: 'health',    label: 'Step 2 · Tattoo and health',      duration: 3600, step: 2 },
  { id: 'agreement', label: 'Step 2 · Consent terms',          duration: 3000, step: 2 },
  { id: 'id',        label: 'Step 3 · ID photo on the shelf',  duration: 4800, step: 3 },
  { id: 'sign',      label: 'Step 4 · Signature',              duration: 3400, step: 4 },
  { id: 'done',      label: 'All set',                         duration: 2800, step: 4 },
];

export const STARTS = SCENES.reduce((acc, s, i) => {
  acc.push(i === 0 ? 0 : acc[i - 1] + SCENES[i - 1].duration);
  return acc;
}, []);
export const TOTAL = SCENES.reduce((sum, s) => sum + s.duration, 0);

/** Where to park the demo for visitors who prefer reduced motion: the ID photo, just captured. */
export const REDUCED_MOTION_TIME = STARTS[4] + 0.7 * SCENES[4].duration;

// ---- helpers --------------------------------------------------------------
const clamp = (x) => Math.max(0, Math.min(1, x));
const ease = (x) => 1 - Math.pow(1 - clamp(x), 3);
const span = (p, a, b) => clamp((p - a) / (b - a));
const pulse = (p, a, b) => (p >= a && p <= b ? 0.35 * (1 - (p - a) / (b - a)) : 0);
const pressed = (p, a, b) => p >= a && p <= b;

function typeOut(strings, q) {
  const total = strings.reduce((n, s) => n + s.length, 0);
  let n = Math.round(clamp(q) * total);
  return strings.map((s) => {
    const take = Math.min(s.length, Math.max(0, n));
    n -= s.length;
    return s.slice(0, take);
  });
}

// ---- demo content ---------------------------------------------------------
const DETAILS = [
  { label: 'Legal first name', value: 'Alex' },
  { label: 'Legal last name', value: 'Rivera' },
  { label: 'Date of birth', value: '04/12/1994' },
  { label: 'Mobile phone', value: '(555) 201-4417' },
];
const HEALTH = ['Diabetes', 'Blood thinners', 'Skin conditions', 'Allergies to latex or ink', 'Pregnant or breastfeeding', 'None of the above'];
const TERMS = [
  'I am legally eligible to receive a tattoo and gave accurate information.',
  'I understand the risks, including pain, swelling, infection and scarring.',
  'I understand tattoos are permanent and removal may be difficult.',
  'I disclosed any conditions or medications that may affect healing.',
  'I received aftercare instructions and agree to follow them.',
  'I am choosing to receive this tattoo voluntarily.',
];

/** Everything the screen needs at time t (ms). */
export function computeFrame(rawT) {
  const t = ((rawT % TOTAL) + TOTAL) % TOTAL;
  let i = 0;
  while (i < SCENES.length - 1 && t >= STARTS[i + 1]) i++;
  const scene = SCENES[i];
  const p = (t - STARTS[i]) / scene.duration; // 0..1 progress through this scene

  const frame = {
    sceneId: scene.id,
    label: scene.label,
    step: scene.step,
    progress: t / TOTAL,
    stepProgress: [0, 25, 50, 75, 75, 100, 100][i],
    caretOn: Math.floor(t / 400) % 2 === 0,
  };

  switch (scene.id) {
    case 'welcome':
      frame.startPressed = pressed(p, 0.72, 0.86);
      frame.tap = pulse(p, 0.72, 0.95);
      break;

    case 'details': {
      const typed = typeOut(DETAILS.map((d) => d.value), span(p, 0.05, 0.82));
      const active = typed.findIndex((v, k) => v.length < DETAILS[k].value.length);
      frame.fields = DETAILS.map((d, k) => ({ label: d.label, value: typed[k], active: k === active }));
      break;
    }

    case 'health':
      frame.artist = p > 0.12 ? 'Inés Rosa' : '';
      frame.placement = typeOut(['Left forearm'], span(p, 0.2, 0.45))[0];
      frame.health = HEALTH.map((text, k) => ({ text, checked: k === HEALTH.length - 1 && p > 0.68 }));
      break;

    case 'agreement':
      frame.terms = TERMS;
      frame.agreed = p > 0.62;
      break;

    case 'id': {
      const slideIn = ease(span(p, 0.06, 0.34));
      const slideOut = ease(span(p, 0.84, 1));
      frame.cardOffset = (1 - slideIn) + slideOut; // 0 = on the shelf, 1 = off to the side
      frame.cardVisible = p >= 0.06 && slideOut < 1;
      frame.flash = p > 0.56 && p < 0.7 ? 1 - (p - 0.56) / 0.14 : 0;
      frame.captured = p > 0.62;
      frame.shootPressed = pressed(p, 0.48, 0.58);
      frame.tap = pulse(p, 0.48, 0.66);
      break;
    }

    case 'sign':
      frame.printedName = typeOut(['Alex Rivera'], span(p, 0.02, 0.28))[0];
      frame.signature = ease(span(p, 0.3, 0.84)); // 0..1 drawn
      break;

    case 'done':
      frame.pop = 0.6 + 0.4 * ease(span(p, 0, 0.18));
      frame.countdown = Math.max(1, 10 - Math.floor(p * 3));
      break;

    default:
      break;
  }

  // Next / Send button press at the end of each form step
  if (['details', 'health', 'agreement', 'sign'].includes(scene.id)) {
    frame.nextPressed = pressed(p, 0.88, 0.97);
    frame.nextTap = pulse(p, 0.88, 1);
  }

  return frame;
}
