// ===== Navbar com fundo ao rolar =====
const navbar = document.getElementById('navbar');
window.addEventListener('scroll', () => {
  navbar.style.background = window.scrollY > 40 ? 'rgba(0,0,0,0.85)' : 'rgba(0,0,0,0.55)';
}, { passive:true });

// ===== Menu hambúrguer (mobile) =====
const navToggle = document.getElementById('navToggle');
const navLinks = document.getElementById('navLinks');
navToggle.addEventListener('click', () => navLinks.classList.toggle('open'));
navLinks.querySelectorAll('a').forEach(link => {
  link.addEventListener('click', () => navLinks.classList.remove('open'));
});

// ===== Ano no rodapé =====
document.getElementById('year').textContent = new Date().getFullYear();

// ===== Formulário multi-etapas =====
const form = document.getElementById('hgForm');
const steps = Array.from(form.querySelectorAll('.form-step'));
const dots = Array.from(document.querySelectorAll('.step-dot'));
const prevBtn = document.getElementById('prevBtn');
const nextBtn = document.getElementById('nextBtn');
const submitBtn = document.getElementById('submitBtn');
const reviewBox = document.getElementById('reviewBox');
const formSuccess = document.getElementById('formSuccess');
let currentStep = 1;

function showStep(n){
  steps.forEach(s => s.classList.toggle('active', Number(s.dataset.step) === n));
  dots.forEach(d => d.classList.toggle('active', Number(d.dataset.dot) <= n));
  prevBtn.style.visibility = n === 1 ? 'hidden' : 'visible';
  nextBtn.style.display = n === steps.length ? 'none' : 'inline-flex';
  submitBtn.style.display = n === steps.length ? 'inline-flex' : 'none';
  if(n === steps.length){ buildReview(); }
  currentStep = n;
}

function validateStep(n){
  const stepEl = steps.find(s => Number(s.dataset.step) === n);
  const fields = stepEl.querySelectorAll('input[required], select[required], textarea[required]');
  for(const f of fields){
    if(!f.value.trim()){
      f.focus();
      return false;
    }
  }
  return true;
}

function buildReview(){
  const data = new FormData(form);
  reviewBox.innerHTML = `
    <p><strong>Nome:</strong> ${data.get('nome') || '-'}</p>
    <p><strong>Email:</strong> ${data.get('email') || '-'}</p>
    <p><strong>WhatsApp:</strong> ${data.get('whatsapp') || '-'}</p>
    <p><strong>Negócio:</strong> ${data.get('negocio') || '-'}</p>
    <p><strong>Faturamento:</strong> ${data.get('faturamento') || '-'}</p>
    <p><strong>Desafio:</strong> ${data.get('desafio') || '-'}</p>
  `;
}

nextBtn.addEventListener('click', () => {
  if(!validateStep(currentStep)) return;
  if(currentStep < steps.length) showStep(currentStep + 1);
});

prevBtn.addEventListener('click', () => {
  if(currentStep > 1) showStep(currentStep - 1);
});

form.addEventListener('submit', (e) => {
  e.preventDefault();
  if(!validateStep(currentStep)) return;
  // Aqui entraria o envio real (fetch para um backend, Google Sheets, WhatsApp API, etc.)
  form.style.display = 'none';
  document.querySelector('.steps-indicator').style.display = 'none';
  formSuccess.style.display = 'block';
});

showStep(1);// ===== Navbar com fundo ao rolar =====
const navbar = document.getElementById('navbar');
window.addEventListener('scroll', () => {
  navbar.style.background = window.scrollY > 40 ? 'rgba(0,0,0,0.85)' : 'rgba(0,0,0,0.55)';
}, { passive:true });

// ===== Menu hambúrguer (mobile) =====
const navToggle = document.getElementById('navToggle');
const navLinks = document.getElementById('navLinks');
navToggle.addEventListener('click', () => navLinks.classList.toggle('open'));
navLinks.querySelectorAll('a').forEach(link => {
  link.addEventListener('click', () => navLinks.classList.remove('open'));
});

// ===== Ano no rodapé =====
document.getElementById('year').textContent = new Date().getFullYear();

// ===== Formulário multi-etapas =====
const form = document.getElementById('hgForm');
const steps = Array.from(form.querySelectorAll('.form-step'));
const dots = Array.from(document.querySelectorAll('.step-dot'));
const prevBtn = document.getElementById('prevBtn');
const nextBtn = document.getElementById('nextBtn');
const submitBtn = document.getElementById('submitBtn');
const reviewBox = document.getElementById('reviewBox');
const formSuccess = document.getElementById('formSuccess');
let currentStep = 1;

function showStep(n){
  steps.forEach(s => s.classList.toggle('active', Number(s.dataset.step) === n));
  dots.forEach(d => d.classList.toggle('active', Number(d.dataset.dot) <= n));
  prevBtn.style.visibility = n === 1 ? 'hidden' : 'visible';
  nextBtn.style.display = n === steps.length ? 'none' : 'inline-flex';
  submitBtn.style.display = n === steps.length ? 'inline-flex' : 'none';
  if(n === steps.length){ buildReview(); }
  currentStep = n;
}

function validateStep(n){
  const stepEl = steps.find(s => Number(s.dataset.step) === n);
  const fields = stepEl.querySelectorAll('input[required], select[required], textarea[required]');
  for(const f of fields){
    if(!f.value.trim()){
      f.focus();
      return false;
    }
  }
  return true;
}

function buildReview(){
  const data = new FormData(form);
  reviewBox.innerHTML = `
    <p><strong>Nome:</strong> ${data.get('nome') || '-'}</p>
    <p><strong>Email:</strong> ${data.get('email') || '-'}</p>
    <p><strong>WhatsApp:</strong> ${data.get('whatsapp') || '-'}</p>
    <p><strong>Negócio:</strong> ${data.get('negocio') || '-'}</p>
    <p><strong>Faturamento:</strong> ${data.get('faturamento') || '-'}</p>
    <p><strong>Desafio:</strong> ${data.get('desafio') || '-'}</p>
  `;
}

nextBtn.addEventListener('click', () => {
  if(!validateStep(currentStep)) return;
  if(currentStep < steps.length) showStep(currentStep + 1);
});

prevBtn.addEventListener('click', () => {
  if(currentStep > 1) showStep(currentStep - 1);
});

form.addEventListener('submit', (e) => {
  e.preventDefault();
  if(!validateStep(currentStep)) return;
  // Aqui entraria o envio real (fetch para um backend, Google Sheets, WhatsApp API, etc.)
  form.style.display = 'none';
  document.querySelector('.steps-indicator').style.display = 'none';
  formSuccess.style.display = 'block';
});

showStep(1);
