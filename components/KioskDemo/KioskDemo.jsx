'use client';

import { useEffect, useRef, useState } from 'react';
import { Pause, Play } from '../icons';
import { computeFrame, SHOP_NAME } from './timeline';
import useWalkthrough from './useWalkthrough';
import IdShelf from './IdShelf';
import WelcomeScene from './scenes/WelcomeScene';
import DetailsScene from './scenes/DetailsScene';
import HealthScene from './scenes/HealthScene';
import AgreementScene from './scenes/AgreementScene';
import IdScene from './scenes/IdScene';
import SignScene from './scenes/SignScene';
import DoneScene from './scenes/DoneScene';
import StepFrame from './scenes/StepFrame';
import k from './scenes/Kiosk.module.css';
import styles from './KioskDemo.module.css';

// The kiosk screen is designed at the 11" iPad's landscape size and scaled to fit.
const SCREEN_W = 1180;
const SCREEN_H = 820;

const STEP_SCENES = {
  details: { title: "Let's start with you", Scene: DetailsScene },
  health: { title: 'Your tattoo and your health', Scene: HealthScene },
  agreement: { title: "Here's what you're agreeing to", Scene: AgreementScene },
  sign: { title: 'Sign your release', Scene: SignScene, nextLabel: 'Send my release' },
};

export default function KioskDemo() {
  const screenRef = useRef(null);
  const [scale, setScale] = useState(0.6);
  const { time, playing, toggle } = useWalkthrough(screenRef);
  const f = computeFrame(time);

  // Scale the 1180×820 screen to whatever width the device frame has
  useEffect(() => {
    const el = screenRef.current;
    if (!el) return undefined;
    const fit = () => el.clientWidth && setScale(el.clientWidth / SCREEN_W);
    fit();
    const ro = new ResizeObserver(fit);
    ro.observe(el);
    return () => ro.disconnect();
  }, []);

  const step = STEP_SCENES[f.sceneId];

  return (
    <section id="demo" className={styles.section} aria-label="See a client check-in">
      <figure
        className={styles.figure}
        role="img"
        aria-label="Animated walkthrough of a client checking in on Purple Line Consent: entering details, answering health questions, agreeing to the consent terms, placing an ID on the ID shelf beside the iPad to take its photo, signing, and finishing."
      >
        <IdShelf frame={f} />

        <div className={styles.bezel}>
          <div ref={screenRef} className={styles.screen} style={{ aspectRatio: `${SCREEN_W} / ${SCREEN_H}` }}>
            <div
              className={k.stage}
              style={{ width: SCREEN_W, height: SCREEN_H, transform: `scale(${scale})` }}
              aria-hidden="true"
            >
              <div className={k.topBar}>
                <div className={k.shopName}>{SHOP_NAME}</div>
                {f.sceneId !== 'welcome' && f.sceneId !== 'done' && (
                  <div className={k.kicker}>Step {f.step} of 4</div>
                )}
              </div>

              {f.sceneId === 'welcome' && <WelcomeScene frame={f} />}
              {step && (
                <StepFrame frame={f} title={step.title} nextLabel={step.nextLabel}>
                  <step.Scene frame={f} />
                </StepFrame>
              )}
              {f.sceneId === 'id' && <IdScene frame={f} />}
              {f.sceneId === 'done' && <DoneScene frame={f} />}
            </div>
          </div>
        </div>
      </figure>

      <div className={styles.controls}>
        <button
          type="button"
          className={`btn btn-ghost ${styles.playBtn}`}
          onClick={toggle}
          aria-label={playing ? 'Pause the walkthrough' : 'Play the walkthrough'}
        >
          {playing ? <><Pause /> Pause</> : <><Play /> Play</>}
        </button>
        <div className={styles.stepLabel} aria-live="polite">{f.label}</div>
        <div className={styles.progress} role="presentation">
          <div className={styles.progressFill} style={{ width: `${Math.round(f.progress * 100)}%` }} />
        </div>
      </div>
    </section>
  );
}
