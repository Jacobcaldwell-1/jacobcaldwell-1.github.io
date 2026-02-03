const chars = "█▓▒░<>[]{}()*!=+-\\/|_#@%$0123456789ABCDEFGHIKLMNOPQRSTUVWXYZ:;`~&?" ;

function randomChar() {
  return chars[Math.floor(Math.random() * chars.length)];
}

function decipherEffect(el, delay = 0) {
  const finalText = el.dataset.text;
  let progress = 0;

  function animate() {
    progress += 0.025;
    let display = "";

    for (let i = 0; i < finalText.length; i++) {
      if (i < finalText.length * progress) {
        display += finalText[i];
      } else {
        display += randomChar();
      }
    }

    el.textContent = display;

    if (progress < 1) {
      requestAnimationFrame(animate);
    } else {
      el.textContent = finalText;
    }
  }

  setTimeout(() => requestAnimationFrame(animate), delay);
}

function randomGlitch(el) {
  const text = el.dataset.text;
  const charsArr = text.split("");
  const glitchCount = Math.random() < 0.3 ? 2 : 1;
  const glitchIndices = Array.from({ length: glitchCount }, () =>
    Math.floor(Math.random() * charsArr.length)
  );

  
  const isBigGlitch = Math.random() < 0.5;

  if (!isBigGlitch) {
    
    const temp = [...charsArr];
    glitchIndices.forEach((i) => (temp[i] = randomChar()));
    el.textContent = temp.join("");
    setTimeout(() => (el.textContent = text), 150 + Math.random() * 400);
  } else {
 
    let frame = 0;
    const maxFrames = 6 + Math.floor(Math.random() * 4);

    function flicker() {
      const temp = [...charsArr];
      glitchIndices.forEach((i) => {
        temp[i] = randomChar();
      });
      el.textContent = temp.join("");

      if (frame < maxFrames) {
        frame++;
        setTimeout(flicker, 40 + Math.random() * 30);
      } else {
        el.textContent = text;
      }
    }

    flicker();
  }
}

const navLinks = document.querySelectorAll(".decipher");

navLinks.forEach((el, i) => decipherEffect(el, i * 300));

let lastActivity = Date.now();
["mousemove", "keydown", "click", "scroll"].forEach((evt) =>
  window.addEventListener(evt, () => (lastActivity = Date.now()))
);

setInterval(() => {
  if (Date.now() - lastActivity > 5000) {
    const el = navLinks[Math.floor(Math.random() * navLinks.length)];
    if (Math.random() < 0.25 + (lastActivity/1000)) randomGlitch(el);
  }
}, 1500);
