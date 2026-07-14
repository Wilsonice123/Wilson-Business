// Constantes de ADMIN
const ADMIN_EMAIL = 'wchiveio@gmail.com';
const ADMIN_SENHA = 'admin123';

function login() {
  const email = document.getElementById('email').value;
  const senha = document.getElementById('senha').value;

  if (email === '' || senha === '') {
    alert('Preencha todos os campos!');
    return;
  }

  // Verificar se é ADMIN
  if (email === ADMIN_EMAIL && senha === ADMIN_SENHA) {
    const admin = { email: ADMIN_EMAIL, senha: ADMIN_SENHA, tipo: 'admin' };
    localStorage.setItem('usuarioLogado', JSON.stringify(admin));
    alert('Login como ADMIN realizado!');
    window.location.href = 'Loja.html';
    return;
  }

  // Login normal de usuário
  const usuarios = JSON.parse(localStorage.getItem('usuarios')) || [];
  const usuario = usuarios.find(u => u.email === email && u.senha === senha);

  if (usuario) {
    localStorage.setItem('usuarioLogado', JSON.stringify(usuario));
    window.location.href = 'Loja.html';
  } else {
    alert('Email ou senha incorretos!');
  }
}

function cadastrar() {
  const nome = document.getElementById('nome').value;
  const email = document.getElementById('email').value;
  const senha = document.getElementById('senha').value;
  const confirmeSenha = document.getElementById('Confirme a senha').value;
  const dataNascimento = document.getElementById('data-de-nascimento').value;
  const sexo = document.querySelector('input[name="sexo"]:checked');

  if (!nome || !email || !senha || !confirmeSenha || !dataNascimento || !sexo) {
    alert('Preencha todos os campos!');
    return;
  }

  if (senha !== confirmeSenha) {
    alert('As senhas não coincidem!');
    return;
  }

  const usuarios = JSON.parse(localStorage.getItem('usuarios')) || [];
  const usuarioExistente = usuarios.find(u => u.email === email);

  if (usuarioExistente) {
    alert('Email já cadastrado!');
    return;
  }

  const novoUsuario = {
    nome: nome,
    email: email,
    senha: senha,
    dataNascimento: dataNascimento,
    sexo: sexo.value
  };

  usuarios.push(novoUsuario);
  localStorage.setItem('usuarios', JSON.stringify(usuarios));

  alert('Cadastro realizado com sucesso!');
  window.location.href = 'Loja.html'; // Redirecionar para a loja após cadastro
}

// Função para troca de idioma
const translations = {
  pt: {
    title: 'Wilson_Business - Loja Virtual',
    searchPlaceholder: 'Pesquisar artigos...',
    searchButton: 'Pesquisar',
    promoButton: 'Ver Promoções',
    productsTitle: 'ARTIGOS DISPONÍVEIS NA LOJA',
    buyButton: 'COMPRAR',
    infoButton: '+ Info',
    discountButton: 'Ver Desconto'
  },
  en: {
    title: 'Wilson_Business - Online Store',
    searchPlaceholder: 'Search products...',
    searchButton: 'Search',
    promoButton: 'View Promotions',
    productsTitle: 'AVAILABLE STORE ITEMS',
    buyButton: 'BUY',
    infoButton: '+ Info',
    discountButton: 'View Discount'
  }
};

function switchLanguage(lang) {
  // Salvar idioma no localStorage
  localStorage.setItem('language', lang);

  // Atualizar botões de idioma
  document.querySelectorAll('.lang-switch button').forEach(btn => {
    btn.classList.remove('active');
  });
  document.querySelector(`.lang-switch button:nth-child(${lang === 'pt' ? 1 : 2})`).classList.add('active');

  // Atualizar textos
  document.title = translations[lang].title;
  document.querySelector('.search-container input').placeholder = translations[lang].searchPlaceholder;
  document.querySelector('.search-container button').textContent = translations[lang].searchButton;
  document.querySelector('.promo-button').textContent = translations[lang].promoButton;
  document.querySelector('h2').textContent = translations[lang].productsTitle;

  // Atualizar botões dos produtos
  document.querySelectorAll('.produto a:first-child').forEach(btn => {
    btn.textContent = translations[lang].buyButton;
  });
  document.querySelectorAll('.produto a:nth-child(2)').forEach(btn => {
    btn.textContent = translations[lang].infoButton;
  });
  document.querySelectorAll('.desconto').forEach(btn => {
    btn.textContent = translations[lang].discountButton;
  });
}

// Inicializar idioma ao carregar página
document.addEventListener('DOMContentLoaded', function() {
  const savedLang = localStorage.getItem('language') || 'pt';
  switchLanguage(savedLang);

  // Adicionar event listeners aos botões de idioma
  document.querySelectorAll('.lang-switch button').forEach((btn, index) => {
    btn.addEventListener('click', () => {
      const lang = index === 0 ? 'pt' : 'en';
      switchLanguage(lang);
    });
  });
});