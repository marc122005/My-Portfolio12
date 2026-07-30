// ---------- PRELOADER ----------
(function preloader(){
  const fill = document.getElementById('preloadFill');
  const pct = document.getElementById('preloadPct');
  const overlay = document.getElementById('preloader');
  let progress = 0;

  const tick = setInterval(()=>{
    progress += Math.random() * 18 + 6;
    if(progress >= 100){
      progress = 100;
      clearInterval(tick);
      setTimeout(()=> overlay.classList.add('hide'), 250);
    }
    fill.style.width = progress + '%';
    pct.textContent = Math.floor(progress) + '%';
  }, 140);
})();

// ---------- NAV SCROLL SHADOW ----------
const header = document.getElementById('siteHeader');
window.addEventListener('scroll', ()=>{
  header.classList.toggle('scrolled', window.scrollY > 8);
});

// ---------- HERO CURSOR GLOW ----------
const heroGlow = document.getElementById('heroGlow');
const heroSection = document.querySelector('.hero');
if(heroGlow && heroSection){
  heroSection.addEventListener('mousemove', (e)=>{
    const rect = heroSection.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    heroGlow.style.transform = `translate(${x - 320}px, ${y - 320}px)`;
  });
  heroSection.addEventListener('mouseleave', ()=>{
    heroGlow.style.transform = 'translate(-50%, 0)';
    heroGlow.style.left = '50%';
  });
}

// ---------- MAGNETIC BUTTONS ----------
document.querySelectorAll('.btn').forEach(btn=>{
  btn.addEventListener('mousemove', (e)=>{
    const rect = btn.getBoundingClientRect();
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;
    btn.style.transform = `translate(${x * 0.18}px, ${y * 0.35}px)`;
  });
  btn.addEventListener('mouseleave', ()=>{
    btn.style.transform = '';
  });
});

// ---------- SCROLL REVEAL ----------
const revealTargets = document.querySelectorAll('.reveal, .reveal-stagger');
const io = new IntersectionObserver((entries)=>{
  entries.forEach(entry=>{
    if(entry.isIntersecting){
      entry.target.classList.add('show');
      io.unobserve(entry.target);
    }
  });
}, { threshold: 0.15 });
revealTargets.forEach(el=> io.observe(el));

// ---------- SMOOTH SCROLL ----------
document.querySelectorAll('a[href^="#"]').forEach(a=>{
  a.addEventListener('click', e=>{
    const target = document.querySelector(a.getAttribute('href'));
    if(target){
      e.preventDefault();
      target.scrollIntoView({ behavior: 'smooth' });
    }
  });
});

const projectDescriptions = document.querySelectorAll('.project-desc');
projectDescriptions.forEach(desc => {
  const fullText = desc.textContent.trim();
  const maxChars = 140;
  if(fullText.length <= maxChars) return;

  const previewText = fullText.slice(0, maxChars).replace(/\s+\S*$/, '') + '…';

  const previewSpan = document.createElement('span');
  previewSpan.className = 'desc-preview';
  previewSpan.textContent = previewText;

  const fullSpan = document.createElement('span');
  fullSpan.className = 'desc-full';
  fullSpan.textContent = fullText;

  const toggle = document.createElement('button');
  toggle.type = 'button';
  toggle.className = 'read-more-toggle';
  toggle.textContent = 'Read more';
  toggle.addEventListener('click', () => {
    const expanded = desc.classList.toggle('expanded');
    toggle.textContent = expanded ? 'Read less' : 'Read more';
  });

  desc.textContent = '';
  desc.appendChild(previewSpan);
  desc.appendChild(fullSpan);
  desc.appendChild(toggle);
});
