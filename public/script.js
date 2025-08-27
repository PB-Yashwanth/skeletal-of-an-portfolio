/* ===== Typing (with optional Web Audio click) ===== */
(function() {
  const typedText = document.getElementById("typing");
  if (!typedText) return;

  const words = ["Mentor", "Educator", "Researcher"]; // Edit as needed
  let wordIndex = 0, letterIndex = 0, isDeleting = false;

  // Configuration object for typing settings
  const config = {
    baseTypeSpeed: 120,
    baseDeleteSpeed: 70,
    pauseBetweenWords: 900,
    pauseBeforeNext: 260,
    fadeDuration: 220 // Keep in sync with CSS transition
  };

  // Load the typing sound effect
  const typingSound = new Audio('keyboard-typing-sound-effect-335503.mp3');

  function humanDelay(base) {
    return base + Math.floor((Math.random() * 50) - 25);
  }

  // --------- Web Audio click setup (no external file) ----------
  let audioCtx = null;
  const enableClickSound = true; // Set false to disable sound instantly

  function ensureAudioContext() {
    if (audioCtx) return;
    try {
      audioCtx = new (window.AudioContext || window.webkitAudioContext)();
      // Many browsers require a user gesture to start; resume on first click if suspended
      if (audioCtx.state === 'suspended') {
        const resumeOnce = () => {
          audioCtx.resume().catch(() => {});
          document.removeEventListener('click', resumeOnce);
          document.removeEventListener('touchstart', resumeOnce);
        };
        document.addEventListener('click', resumeOnce, { once: true });
        document.addEventListener('touchstart', resumeOnce, { once: true });
      }
    } catch (e) {
      console.error("Audio context error:", e);
      audioCtx = null;
    }
  }

  function playClick() {
    if (!enableClickSound) return;
    try {
      ensureAudioContext();
      if (!audioCtx) return;

      // Small short click using oscillator + gain envelope
      const now = audioCtx.currentTime;
      const osc = audioCtx.createOscillator();
      const gain = audioCtx.createGain();

      osc.type = 'square'; // Short click timbre
      osc.frequency.value = 900; // Pitch
      gain.gain.setValueAtTime(0.0001, now);
      gain.gain.exponentialRampToValueAtTime(0.06, now + 0.003); // Quick attack
      gain.gain.exponentialRampToValueAtTime(0.0001, now + 0.055); // Quick decay

      osc.connect(gain);
      gain.connect(audioCtx.destination);

      osc.start(now);
      osc.stop(now + 0.06);
    } catch (e) {
      console.error("Click sound error:", e);
    }
  }

  // ------------------------------------------------------------

  let timer = null;
  function schedule(fn, ms) {
    clearTimeout(timer);
    timer = setTimeout(fn, ms);
  }

  function loop() {
    const current = words[wordIndex];

    if (!isDeleting) {
      const prevIndex = letterIndex;
      letterIndex = Math.min(letterIndex + 1, current.length);
      typedText.textContent = current.slice(0, letterIndex);

      // Play typing sound when a new character is added
      if (letterIndex > prevIndex) {
        typingSound.currentTime = 0; // Reset sound to start
        typingSound.play().catch(e => console.error("Audio play error:", e));
      }

    } else {
      letterIndex = Math.max(letterIndex - 1, 0);
      typedText.textContent = current.slice(0, letterIndex);
    }

    let delay = humanDelay(isDeleting ? config.baseDeleteSpeed : config.baseTypeSpeed);

    if (!isDeleting && letterIndex === current.length) {
      // Fade then delete
      schedule(() => typedText.classList.add("fade"), Math.max(0, config.pauseBetweenWords - config.fadeDuration));
      schedule(() => {
        typedText.classList.remove("fade");
        isDeleting = true;
        loop();
      }, config.pauseBetweenWords);
      return;
    }

    if (isDeleting && letterIndex === 0) {
      isDeleting = false;
      wordIndex = (wordIndex + 1) % words.length;
      typedText.classList.remove("fade");
      schedule(loop, config.pauseBeforeNext);
      return;
    }

    schedule(loop, delay);
  }

  document.addEventListener("DOMContentLoaded", () => {
    setTimeout(loop, 300);
  });
})();
