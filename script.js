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

// ===== PARA ATIVAR O ENVIO POR EMAIL E WHATSAPP =====
// 1) FormSubmit NÃO precisa de conta — só troque pelo SEU email abaixo.
//    No primeiro envio, o FormSubmit manda um email de confirmação pra você;
//    é só clicar em "ativar" uma única vez.
const FORMSUBMIT_ENDPOINT = "https://formsubmit.co/ajax/seuemail@gmail.com";

// 2) Troque pelo seu número de WhatsApp, com código do país, SEM + nem espaços.
//    Exemplo Moçambique: "258841234567"
const WHATSAPP_NUMBER = "258SEUNUMEROAQUI";

form.addEventListener('submit', async (e) => {
  e.preventDefault();
  if(!validateStep(currentStep)) return;

  const data = new FormData(form);
  submitBtn.disabled = true;
  submitBtn.textContent = "Enviando...";

  // ---- Abre o WHATSAPP já com a mensagem pronta ----
  // (precisa ser chamado ANTES do fetch, senão o navegador bloqueia o popup)
  const texto =
    `*Nova Pré-Inscrição Hypergrowth*%0A` +
    `Nome: ${data.get('nome')}%0A` +
    `Email: ${data.get('email')}%0A` +
    `WhatsApp: ${data.get('whatsapp')}%0A` +
    `Negócio: ${data.get('negocio')}%0A` +
    `Faturamento: ${data.get('faturamento')}%0A` +
    `Desafio: ${data.get('desafio')}`;
  window.open(`https://wa.me/${WHATSAPP_NUMBER}?text=${texto}`, "_blank");

  // ---- Envia para o seu EMAIL via FormSubmit ----
  try{
    await fetch(FORMSUBMIT_ENDPOINT, {
      method: "POST",
      body: data,
      headers: { "Accept": "application/json" }
    });
  }catch(err){
    console.error("Erro ao enviar para o FormSubmit:", err);
  }

  form.style.display = 'none';
  document.querySelector('.steps-indicator').style.display = 'none';
  formSuccess.style.display = 'block';
});

showStep(1);
