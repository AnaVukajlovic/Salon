// Navigacija i hamburger meni
const links = document.querySelectorAll('nav ul li a');
const sections = document.querySelectorAll('main section');
const navMenu = document.querySelector('nav ul');
const hamburger = document.querySelector('.hamburger');

links.forEach(link => {
  link.addEventListener('click', e => {
    e.preventDefault();
    const target = link.getAttribute('data-target');
    sections.forEach(section => {
      section.classList.toggle('active', section.id === target);
    });
    navMenu.classList.remove('show');
  });
});

hamburger.addEventListener('click', () => {
  navMenu.classList.toggle('show');
});

const bookingForm = document.getElementById('bookingForm');
const totalPriceEl = document.getElementById('totalPrice');

// Cene po uslugama 
const priceList = {
  // Frizer
  "Žensko šišanje": 900,
  "Žensko šišanje sa pranjem": 1000,
  "Feniranje": 700,
  "Vodena kratka kosa": 600,
  "Vodena srednja kosa": 700,
  "Vodena duga kosa": 800,
  "Mokre lokne srednja kosa": 750,
  "Mokre lokne duga kosa": 850,
  "Pranje kose": 300,
  "Farbanje donetom bojom": 1200,
  "Farbanje našom bojom": 1500,
  "Šatiranje": 1300,
  "Šatiranje 2 boje": 1600,
  "Senčenje": 1400,
  "Punđa srednja kosa": 900,
  "Punđa duga kosa": 1000,
  "Svečana frizura": 1200,
  "Blajhanje - kratka kosa": 1500,
  "Blajhanje - duga kosa": 1800,
  // Kozmetičar
  "Čišćenje lica": 1300,
  "Masaža lica": 1000,
  "Higijenski tretman lica": 1400,
  "Higijenski tretman + masaža lica": 2000,
  "Biološki tretman lica (voćne kiseline)": 1700,
  "Biološki tretman + čišćenje": 1900,
  "Mezoterapija (dermaroler)": 2200,
  "Mezoterapija (iglom)": 2500,
  "Ultrazvučni tretman lica": 2300,
  "PRX piling": 2700,
  "Venus Glow tretman": 2800,
  "Venus Glow + Higijenski tretman": 3500,
  "Venus Glow + Neinvazivna mezoterapija": 3700,
  "Venus PREMIUM": 4000,
  "Venus Glow + Dermapen": 3900,
  "Venus ULTRA": 4200,
  // Manikir
  "Klasičan manikir": 800,
  "Manikir sa lakiranjem": 900,
  "Ruski manikir": 1000,
  "Gel lak sa manikirom": 1200,
  "Trajni french u gel laku": 1300,
  "French - Ombre": 1400,
  "Crtanje po noktu": 200,
  "Skidanje gel laka": 500,
  "Skidanje tuđeg materijala": 600,
  "Izlivanje kratkih noktiju u gelu": 1500,
  "Izlivanje srednjih noktiju u gelu": 1600,
  "Izlivanje dugih noktiju u gelu": 1700,
  "Izlivanje ekstra dugih noktiju u gelu": 1800,
  "Izlivanje po noktu": 200,
  "Ojačavanje kratkih noktiju u gelu": 1400,
  // Pedikir
  "Klasičan pedikir": 900,
  "Pedikir sa lakiranjem": 1000,
  "Ruski pedikir": 1100,
  "Gel lak sa pedikirom": 1300,
  "Trajni french u gel laku": 1400,
  "French - Ombre": 1500,
  "Crtanje po noktu": 200,
  "Skidanje gel laka": 500,
  "Skidanje tuđeg materijala": 600,
  "Izlivanje kratkih noktiju u gelu": 1500,
  "Izlivanje srednjih noktiju u gelu": 1600,
  "Izlivanje dugih noktiju u gelu": 1700,
  "Izlivanje ekstra dugih noktiju u gelu": 1800,
  "Izlivanje po noktu": 200,
  "Ojačavanje kratkih noktiju u gelu": 1400,
};

// Funkcija za validaciju imena i prezimena
function validateName(name, minLen, maxLen) {
  const regex = new RegExp(`^[A-ZŠĐČĆŽ][a-zšđčćž]{${minLen - 1},${maxLen - 1}}$`);
  return regex.test(name);
}

// Validacija telefona u formatu 06x-xxx-xx-xx
function validatePhone(phone) {
    const regex = /^06\d \d{3} \d{4}$/;
    return regex.test(phone);
}

const phoneInput = document.getElementById('phone');

phoneInput.addEventListener('input', () => {
  let value = phoneInput.value.replace(/\D/g, ''); // izbaci sve što nije cifra

  // Ograniči na 10 cifara
  if (value.length > 10) value = value.slice(0, 10);

  // Automatski dodaj razmake: 3-3-4 format
  let formatted = '';
  if (value.length > 0) formatted += value.substring(0, 3);
  if (value.length >= 4) formatted += ' ' + value.substring(3, 6);
  if (value.length >= 7) formatted += ' ' + value.substring(6, 10);

  phoneInput.value = formatted;
});

  
function showError(input, message) {
  const errorSpan = document.getElementById(input.id + 'Error');
  if (errorSpan) {
    errorSpan.textContent = message;
  }
  input.classList.add('error-border');
}

function clearError(input) {
  const errorSpan = document.getElementById(input.id + 'Error');
  if (errorSpan) {
    errorSpan.textContent = '';
  }
  input.classList.remove('error-border');
}

// Izračun cene izabranih usluga
function calculatePrice(selectedServicesByCategory) {
  let sum = 0;

  Object.values(selectedServicesByCategory).forEach(services => {
    services.forEach(service => {
      if (priceList[service]) sum += priceList[service];
    });
  });

  const dateValue = bookingForm.date.value;
  let weekend = false;
  if (dateValue) {
    const day = new Date(dateValue).getDay();
    if (day === 0 || day === 6) weekend = true;
  }

  if (weekend) {
    sum = Math.round(sum * 1.1);
  }

  totalPriceEl.textContent = `Ukupna cena: ${sum} RSD` + (weekend ? " (10% skuplje vikendom)" : "");
}

// Setup funkcija za izbor usluga po kategorijama
function setupServiceSelector(category, servicesList) {
  const searchInput = document.getElementById(`serviceSearch${capitalize(category)}`);
  const suggestions = document.getElementById(`suggestions${capitalize(category)}`);
  const selectedContainer = document.getElementById(`selectedServices${capitalize(category)}`);
  const hiddenInput = document.getElementById(`selectedServices${capitalize(category)}Input`);

  let chosenServices = [];

  function updateSelected() {
    selectedContainer.innerHTML = '';
    chosenServices.forEach(service => {
      const tag = document.createElement('div');
      tag.classList.add('tag');
      tag.textContent = service;

      const removeBtn = document.createElement('span');
      removeBtn.classList.add('remove-btn');
      removeBtn.textContent = '×';
      removeBtn.title = 'Ukloni uslugu';
      removeBtn.onclick = () => {
        chosenServices = chosenServices.filter(s => s !== service);
        updateSelected();
        updateHidden();
        calculatePrice(getAllChosenServices());
      };

      tag.appendChild(removeBtn);
      selectedContainer.appendChild(tag);
    });
    searchInput.value = '';
    suggestions.style.display = 'none';
  }

  function updateHidden() {
    hiddenInput.value = chosenServices.join(',');
    if (chosenServices.length === 0) {
      hiddenInput.setCustomValidity('Molimo izaberite bar jednu uslugu.');
    } else {
      hiddenInput.setCustomValidity('');
    }
  }

  function showSuggestions(val) {
    const filtered = servicesList.filter(service =>
      service.toLowerCase().includes(val.toLowerCase()) && !chosenServices.includes(service)
    );
    if (filtered.length === 0) {
      suggestions.style.display = 'none';
      return;
    }
    suggestions.innerHTML = '';
    filtered.forEach(service => {
      const div = document.createElement('div');
      div.textContent = service;
      div.onclick = () => {
        chosenServices.push(service);
        updateSelected();
        updateHidden();
        calculatePrice(getAllChosenServices());
      };
      suggestions.appendChild(div);
    });
    suggestions.style.display = 'block';
  }

  searchInput.addEventListener('input', () => {
    const val = searchInput.value.trim();
    if (val.length > 0) {
      showSuggestions(val);
    } else {
      suggestions.style.display = 'none';
    }
  });

  document.addEventListener('click', e => {
    if (!searchInput.contains(e.target) && !suggestions.contains(e.target)) {
      suggestions.style.display = 'none';
    }
  });

  function reset() {
    chosenServices = [];
    updateSelected();
    updateHidden();
  }

  return {
    getChosenServices: () => chosenServices,
    reset: reset,
  };
}

function capitalize(str) {
  return str.charAt(0).toUpperCase() + str.slice(1);
}

// Svi podaci o uslugama po kategorijama
const services = {
  hairdresser: [
    "Žensko šišanje",
    "Žensko šišanje sa pranjem",
    "Feniranje",
    "Vodena kratka kosa",
    "Vodena srednja kosa",
    "Vodena duga kosa",
    "Mokre lokne srednja kosa",
    "Mokre lokne duga kosa",
    "Pranje kose",
    "Farbanje donetom bojom",
    "Farbanje našom bojom",
    "Šatiranje",
    "Šatiranje 2 boje",
    "Senčenje",
    "Punđa srednja kosa",
    "Punđa duga kosa",
    "Svečana frizura",
    "Blajhanje - kratka kosa",
    "Blajhanje - duga kosa"
  ],
  cosmetologist: [
    "Čišćenje lica",
    "Masaža lica",
    "Higijenski tretman lica",
    "Higijenski tretman + masaža lica",
    "Biološki tretman lica (voćne kiseline)",
    "Biološki tretman + čišćenje",
    "Mezoterapija (dermaroler)",
    "Mezoterapija (iglom)",
    "Ultrazvučni tretman lica",
    "PRX piling",
    "Venus Glow tretman",
    "Venus Glow + Higijenski tretman",
    "Venus Glow + Neinvazivna mezoterapija",
    "Venus PREMIUM",
    "Venus Glow + Dermapen",
    "Venus ULTRA"
  ],
  manicure: [
    "Klasičan manikir",
    "Manikir sa lakiranjem",
    "Ruski manikir",
    "Gel lak sa manikirom",
    "Trajni french u gel laku",
    "French - Ombre",
    "Crtanje po noktu",
    "Skidanje gel laka",
    "Skidanje tuđeg materijala",
    "Izlivanje kratkih noktiju u gelu",
    "Izlivanje srednjih noktiju u gelu",
    "Izlivanje dugih noktiju u gelu",
    "Izlivanje ekstra dugih noktiju u gelu",
    "Izlivanje po noktu",
    "Ojačavanje kratkih noktiju u gelu"
  ],
  pedicure: [
    "Klasičan pedikir",
    "Pedikir sa lakiranjem",
    "Ruski pedikir",
    "Gel lak sa pedikirom",
    "Trajni french u gel laku",
    "French - Ombre",
    "Crtanje po noktu",
    "Skidanje gel laka",
    "Skidanje tuđeg materijala",
    "Izlivanje kratkih noktiju u gelu",
    "Izlivanje srednjih noktiju u gelu",
    "Izlivanje dugih noktiju u gelu",
    "Izlivanje ekstra dugih noktiju u gelu",
    "Izlivanje po noktu",
    "Ojačavanje kratkih noktiju u gelu"
  ]
};

// Inicijalizacija selektora za svaku kategoriju
const hairdresserSelector = setupServiceSelector('hairdresser', services.hairdresser);
const cosmetologistSelector = setupServiceSelector('cosmetologist', services.cosmetologist);
const manicureSelector = setupServiceSelector('manicure', services.manicure);
const pedicureSelector = setupServiceSelector('pedicure', services.pedicure);

// Sakupi sve odabrane usluge
function getAllChosenServices() {
  return {
    hairdresser: hairdresserSelector.getChosenServices(),
    cosmetologist: cosmetologistSelector.getChosenServices(),
    manicure: manicureSelector.getChosenServices(),
    pedicure: pedicureSelector.getChosenServices()
  };
}

// Submit i validacija forme
bookingForm.addEventListener('submit', e => {
  e.preventDefault();

  const selected = getAllChosenServices();
  const allSelectedCount = Object.values(selected).reduce((acc, arr) => acc + arr.length, 0);

  // Validacija imena
  if (!validateName(bookingForm.firstName.value.trim(), 3, 15)) {
    alert('Ime mora imati 3-15 slova, prvo veliko, bez brojeva.');
    return;
  }

  // Validacija prezimena
  if (!validateName(bookingForm.lastName.value.trim(), 3, 20)) {
    alert('Prezime mora imati 3-20 slova, prvo veliko, bez brojeva.');
    return;
  }

  // Validacija emaila
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(bookingForm.email.value.trim())) {
    alert('Unesite validan email.');
    return;
  }

  // Validacija telefona
  if (!validatePhone(bookingForm.phone.value.trim())) {
    alert('Telefon mora biti u formatu 06x-xxx-xx-xx.');
    return;
  }

  if (!bookingForm.date.value) {
    alert('Izaberite datum termina.');
    return;
  }

  if (allSelectedCount === 0) {
    alert('Izaberite bar jednu uslugu iz bilo koje kategorije.');
    return;
  }

  calculatePrice(selected);

  let servicesText = '';
  Object.entries(selected).forEach(([cat, arr]) => {
    if (arr.length > 0) {
      servicesText += `\n${capitalize(cat)}: ${arr.join(', ')}\n`;
    }
  });

  alert(`Termin uspešno zakazan!\n
Ime: ${bookingForm.firstName.value}
Prezime: ${bookingForm.lastName.value}
Email: ${bookingForm.email.value}
Telefon: ${bookingForm.phone.value}
Datum termina: ${bookingForm.date.value}
${servicesText}
${totalPriceEl.textContent}
  `);

  bookingForm.reset();
  totalPriceEl.textContent = "Ukupna cena: 0 RSD";

  // Reset UI i izabrane usluge
  ['hairdresser', 'cosmetologist', 'manicure', 'pedicure'].forEach(cat => {
    document.getElementById(`selectedServices${capitalize(cat)}`).innerHTML = '';
    document.getElementById(`selectedServices${capitalize(cat)}Input`).value = '';
    document.getElementById(`serviceSearch${capitalize(cat)}`).value = '';
  });

  hairdresserSelector.reset();
  cosmetologistSelector.reset();
  manicureSelector.reset();
  pedicureSelector.reset();
});
