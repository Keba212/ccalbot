const app = document.querySelector('#app');
const tg = window.Telegram?.WebApp;
const STORAGE_KEY = 'rytm-profile-v1';
const FOOD_RULES_VERSION = 4;

const foodCatalog = [
  { id: 'beans', name: 'Бобові', detail: 'сухі, сирі', group: 'Вуглеводи', kcal: 310, maxGrams: 115 },
  { id: 'potato', name: 'Картопля', detail: 'сира, очищена', group: 'Вуглеводи', kcal: 77, maxGrams: 470 },
  { id: 'corn', name: 'Кукурудза свіжа', detail: 'сирі зерна', group: 'Вуглеводи', kcal: 86, maxGrams: 420 },
  { id: 'rice', name: 'Рис (не шліфований)', detail: 'сухий', group: 'Вуглеводи', kcal: 360, maxGrams: 110 },
  { id: 'buckwheat', name: 'Будь-яка крупа', detail: 'гречка, булгур, суха', group: 'Вуглеводи', kcal: 350, maxGrams: 110 },
  { id: 'flour', name: 'Цільнозернове борошно', detail: 'сухе', group: 'Вуглеводи', kcal: 340, maxGrams: 115 },
  { id: 'crispbread', name: 'Хлібці', detail: 'цільнозернові', group: 'Вуглеводи', kcal: 360, maxGrams: 115 },
  { id: 'wholebread', name: 'Цільнозерновий хліб', detail: 'свіжий', group: 'Вуглеводи', kcal: 250, maxGrams: 145 },
  { id: 'pasta', name: 'Макарони т.с.', detail: 'сухі, твердих сортів', group: 'Вуглеводи', kcal: 350, maxGrams: 105 },
  { id: 'lavash', name: 'Лаваш', detail: 'тонкий', group: 'Вуглеводи', kcal: 260, maxGrams: 150 },
  { id: 'veal', name: 'Телятина', detail: 'сира', group: 'Білки', kcal: 170, maxGrams: 295 },
  { id: 'liver', name: 'Печінка', detail: 'сира', group: 'Білки', kcal: 135, maxGrams: 385 },
  { id: 'chicken', name: 'Куряче або індиче філе', detail: 'сире', group: 'Білки', kcal: 110, maxGrams: 455 },
  { id: 'fish', name: 'Риба (до 5% жиру)', detail: 'сира', group: 'Білки', kcal: 100, maxGrams: 455 },
  { id: 'fattyfish', name: 'Риба (від 5% жиру)', detail: 'сира', group: 'Білки', kcal: 155, maxGrams: 295 },
  { id: 'eggs', name: 'Яйця', detail: '6 шт. без шкаралупи', group: 'Білки', kcal: 143, maxGrams: 300 },
  { id: 'seafood', name: 'Морепродукти', detail: 'сирі або заморожені', group: 'Білки', kcal: 90, maxGrams: 500 },
  { id: 'mushrooms', name: 'Гриби', detail: 'свіжі', group: 'Овочі', kcal: 27, maxGrams: 600 },
  { id: 'vegetables', name: 'Овочі (квашені також і зелень)', detail: 'свіжі або заморожені', group: 'Овочі', kcal: 30, maxGrams: 600 },
  { id: 'flax', name: 'Будь-яка олія', detail: 'рекомендуємо лляну', group: 'Жири', kcal: 884, maxGrams: 24 },
  { id: 'mayo', name: 'Майонез', detail: 'помірно', group: 'Жири', kcal: 620, maxGrams: 35 },
  { id: 'avocado', name: 'Авокадо', detail: 'м’якоть', group: 'Жири', kcal: 160, maxGrams: 135 },
  { id: 'olives', name: 'Оливки', detail: 'без кісточок', group: 'Жири', kcal: 115, maxGrams: 190 },
  { id: 'mustard', name: 'Гірчиця', detail: 'без цукру', group: 'Жири', kcal: 111, maxGrams: 170 },
  { id: 'ketchup', name: 'Кетчуп', detail: 'помірно', group: 'Жири', kcal: 110, maxGrams: 110 },
  { id: 'cottage', name: 'Сир кисломолочний нежирний (0,2%)', detail: 'сирий продукт', group: 'Молочні', kcal: 80, maxGrams: 325 },
  { id: 'cheese', name: 'Сири м’які, тверді, плавлені', detail: 'порція', group: 'Молочні', kcal: 280, maxGrams: 75 },
  { id: 'sourcream', name: 'Сметана 15%', detail: 'помірно', group: 'Молочні', kcal: 160, maxGrams: 170 },
  { id: 'kefir', name: 'Кефір 1%', detail: 'без цукру', group: 'Молочні', kcal: 40, maxGrams: 625 },
  { id: 'yogurt', name: 'Несолодкий йогурт 1%', detail: 'без наповнювача', group: 'Молочні', kcal: 45, maxGrams: 600 },
  { id: 'milk', name: 'Молоко 1%', detail: 'без цукру', group: 'Молочні', kcal: 42, maxGrams: 645 },
  { id: 'fruit', name: 'Фрукти та ягоди', detail: 'сезонні', group: 'Фрукти', kcal: 50, maxGrams: 580 },
  { id: 'banana', name: 'Банани, виноград, хурма', detail: 'солодкі фрукти', group: 'Фрукти', kcal: 90, maxGrams: 295 },
  { id: 'nuts', name: 'Будь-які горіхи', detail: 'рекомендуємо грецькі', group: 'Додатково', kcal: 650, maxGrams: 20 },
  { id: 'seeds', name: 'Насіння', detail: 'гарбузове або соняшникове', group: 'Додатково', kcal: 560, maxGrams: 20 },
  { id: 'treats', name: 'Будь-що', detail: 'солодощі, снеки, ковбаса тощо', group: 'Рідко', kcal: 500, maxGrams: 85 },
  { id: 'fruitLarge', name: 'Фрукти', detail: 'звичайні, не солодкі', group: 'Рідко', kcal: 50, maxGrams: 850 },
  { id: 'bananaLarge', name: 'Банани', detail: 'солодкі фрукти', group: 'Рідко', kcal: 90, maxGrams: 450 },
];

const planTemplates = [
  [
    { name: 'Сніданок', icon: '☀️', items: [['buckwheat', 60], ['yogurt', 150], ['fruit', 100], ['seeds', 10]] },
    { name: 'Обід', icon: '🥗', items: [['chicken', 180], ['buckwheat', 70], ['vegetables', 250], ['flax', 8]] },
    { name: 'Вечеря', icon: '🍲', items: [['fish', 180], ['potato', 250], ['vegetables', 200], ['flax', 5]] },
  ],
  [
    { name: 'Сніданок', icon: '🍳', items: [['eggs', 120], ['bread', 70], ['avocado', 50], ['vegetables', 150]] },
    { name: 'Обід', icon: '🍚', items: [['seafood', 200], ['rice', 70], ['vegetables', 250], ['flax', 8]] },
    { name: 'Вечеря', icon: '🥣', items: [['cottage', 200], ['banana', 120], ['nuts', 15], ['yogurt', 100]] },
  ],
  [
    { name: 'Сніданок', icon: '🌯', items: [['lavash', 80], ['chicken', 120], ['vegetables', 180], ['yogurt', 50]] },
    { name: 'Обід', icon: '🍝', items: [['liver', 180], ['pasta', 70], ['vegetables', 220], ['flax', 8]] },
    { name: 'Вечеря', icon: '🍓', items: [['kefir', 250], ['cottage', 150], ['fruit', 150], ['seeds', 10]] },
  ],
];

const categoryCalories = { 'Вуглеводи': 360, 'Білки': 500, 'Овочі': 120, 'Жири': 220, 'Молочні': 260, 'Фрукти': 290, 'Додатково': 145, 'Рідко': 425 };
const basePlanCalories = Object.values(categoryCalories).reduce((sum, value) => sum + value, 0);

const defaultState = {
  profile: null,
  meals: [
    { id: 1, icon: '☀️', name: 'Сніданок', note: 'Вівсянка, йогурт, ягоди', kcal: 0, eaten: false },
    { id: 2, icon: '🥗', name: 'Обід', note: 'Курка, гречка, овочі', kcal: 0, eaten: false },
    { id: 3, icon: '🍲', name: 'Вечеря', note: 'Риба, картопля, салат', kcal: 0, eaten: false },
  ],
};

const resetForNewAccount = new URLSearchParams(window.location.search).has('new-account');
if (resetForNewAccount) localStorage.removeItem(STORAGE_KEY);
let state = JSON.parse(localStorage.getItem(STORAGE_KEY) || 'null') || defaultState;
if (resetForNewAccount) window.history.replaceState({}, document.title, window.location.pathname);
if (state.foodRulesVersion !== FOOD_RULES_VERSION) {
  state.foodLog ??= {};
  state.foodRulesVersion = FOOD_RULES_VERSION;
  localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
}
tg?.ready();
tg?.expand();
if (tg?.setHeaderColor) tg.setHeaderColor('#f5f6f2');

function save() { localStorage.setItem(STORAGE_KEY, JSON.stringify(state)); }
function esc(value) { return String(value).replace(/[&<>"']/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c])); }
function today() { return new Intl.DateTimeFormat('uk-UA', { day: 'numeric', month: 'long' }).format(new Date()); }
function dayKey() { const date = new Date(); return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}-${String(date.getDate()).padStart(2, '0')}`; }
function resetDailyFoodLog() {
  state.foodLog = {};
  state.foodLogDate = dayKey();
  save();
}
function ensureDailyFoodLog() {
  if (state.foodLogDate !== dayKey()) resetDailyFoodLog();
  state.foodLog ??= {};
}
function scheduleDailyFoodReset() {
  const now = new Date();
  const nextMidnight = new Date(now.getFullYear(), now.getMonth(), now.getDate() + 1);
  window.setTimeout(() => {
    resetDailyFoodLog();
    if (document.querySelector('.food-catalog')) renderFoods();
    else if (document.querySelector('.dashboard-grid')) renderDashboard();
    scheduleDailyFoodReset();
  }, nextMidnight - now + 50);
}
function userName() { return tg?.initDataUnsafe?.user?.first_name || 'друже'; }
function shell(content) { app.innerHTML = `<header class="topbar"><div class="brand"><span class="brand-mark">Р</span><span>Ритм</span></div><div class="status"><i class="status-dot"></i> все під контролем</div></header>${content}`; }

function food(id) { return foodCatalog.find(item => item.id === id); }
function portionScale() { return (state.profile?.target || basePlanCalories) / basePlanCalories; }
function foodKcal(item, grams) { return grams / foodOriginalMax(item) * categoryCalories[item.group] * portionScale(); }
function foodConsumed(id) { return Number(state.foodLog?.[id] || 0); }
function categoryConsumedKcal(group) { return foodCatalog.filter(item => item.group === group).reduce((sum, item) => sum + foodKcal(item, foodConsumed(item.id)), 0); }
function foodOriginalMax(item) { return Math.max(5, Math.round(item.maxGrams * portionScale() / 5) * 5); }
function foodAvailableMax(item) { return Math.max(0, Math.round(foodOriginalMax(item) - categoryConsumedKcal(item.group) / (categoryCalories[item.group] * portionScale()) * foodOriginalMax(item))); }
function loggedFoodKcal() { return foodCatalog.reduce((sum, item) => sum + foodKcal(item, foodConsumed(item.id)), 0); }
function loggedFoodMacros() {
  const groupProfiles = {
    'Вуглеводи': { protein: 7, fats: 2 },
    'Білки': { protein: 22, fats: 5 },
    'Овочі': { protein: 2, fats: 0.3 },
    'Жири': { protein: 0, fats: 90 },
    'Молочні': { protein: 5, fats: 2 },
    'Фрукти': { protein: 1, fats: 0.3 },
    'Додатково': { protein: 15, fats: 35 },
    'Рідко': { protein: 5, fats: 20 },
  };
  return foodCatalog.reduce((totals, item) => {
    const grams = foodConsumed(item.id);
    const profile = groupProfiles[item.group];
    const carbs = Math.max(0, (item.kcal - profile.protein * 4 - profile.fats * 9) / 4);
    totals.protein += grams / 100 * profile.protein;
    totals.fats += grams / 100 * profile.fats;
    totals.carbs += grams / 100 * carbs;
    return totals;
  }, { protein: 0, fats: 0, carbs: 0 });
}
function categoryClosed(group) { return categoryConsumedKcal(group) >= categoryCalories[group] * portionScale() - 1; }
function groupIcon(group) { return { 'Вуглеводи': 'А', 'Білки': 'Б', 'Овочі': 'В', 'Жири': 'Г', 'Молочні': 'Д', 'Фрукти': 'Е', 'Додатково': 'Є', 'Рідко': 'Ж' }[group] || '•'; }
function groupTone(group) { return { 'Вуглеводи': 'tone-blue', 'Білки': 'tone-red', 'Овочі': 'tone-green', 'Жири': 'tone-gold', 'Молочні': 'tone-purple', 'Фрукти': 'tone-pink', 'Додатково': 'tone-brown', 'Рідко': 'tone-orange' }[group] || 'tone-blue'; }
function planForToday(target) {
  const template = planTemplates[new Date().getDate() % planTemplates.length];
  return template.map((meal, mealIndex) => {
    const items = meal.items.map(([id, grams]) => ({ ...food(id), grams }));
    const rawKcal = items.reduce((sum, item) => sum + item.kcal * item.grams / 100, 0);
    const targetShare = [0.25, 0.4, 0.35][mealIndex];
    const multiplier = target * targetShare / rawKcal;
    const scaledItems = items.map(item => ({ ...item, grams: Math.max(5, Math.round(item.grams * multiplier / 5) * 5), baseGrams: Math.max(5, Math.round(item.grams * multiplier / 5) * 5), recommendedGrams: Math.max(5, Math.round(item.grams * multiplier / 5) * 5), consumedGrams: 0 }));
    const kcal = Math.round(scaledItems.reduce((sum, item) => sum + item.kcal * item.grams / 100, 0));
    return { id: mealIndex + 1, name: meal.name, icon: meal.icon, items: scaledItems, kcal, eaten: false };
  });
}

function ensureDailyPlan() {
  if (!state.profile) return;
  if (state.planDate !== dayKey() || !state.meals[0]?.items) {
    state.planDate = dayKey();
    state.meals = planForToday(state.profile.target);
    save();
  }
  state.meals.forEach(meal => meal.items.forEach(item => {
    item.baseGrams ??= item.grams;
    item.recommendedGrams ??= item.grams;
    item.consumedGrams ??= 0;
  }));
}

function renderOnboarding() {
  const editing = Boolean(state.profile);
  shell(`<section class="hero fade-in"><p class="eyebrow">харчування без крайнощів</p><h1>${editing ? 'Твій профіль' : 'Твій здоровий ритм починається тут.'}</h1><p class="lead">${editing ? 'Онови особисті дані, якщо вони змінилися.' : 'Введи кілька даних, а ми порахуємо комфортну ціль для схуднення, підтримки або набору м’язів.'}</p><div class="hero-shape" aria-hidden="true"></div></section><form id="profile-form" class="card form-card fade-in">${editing ? '<button class="back-button profile-back" id="profile-back" type="button">← Назад</button>' : ''}<h2>Розкажи про себе</h2><div class="field-grid"><div class="field"><label for="gender">Стать</label><select id="gender" required><option value="female">Жінка</option><option value="male">Чоловік</option></select></div><div class="field"><label for="age">Вік, років</label><input id="age" type="number" min="14" max="100" placeholder="28" required /></div><div class="field"><label for="height">Зріст, см</label><input id="height" type="number" min="120" max="230" placeholder="170" required /></div><div class="field"><label for="weight">Вага, кг</label><input id="weight" type="number" min="35" max="250" step="0.1" placeholder="75" required /></div><div class="field full"><label for="activity">Твоя активність</label><select id="activity" required><option value="1.2">Малорухливий спосіб життя</option><option value="1.375">Легка активність, 1–3 тренування</option><option value="1.55">Середня активність, 3–5 тренувань</option><option value="1.725">Висока активність, 6–7 тренувань</option></select></div><div class="field full"><label for="goal">Мета</label><select id="goal"><option value="0.85">Поступове схуднення</option><option value="0.9">М’який дефіцит</option><option value="1">Підтримка ваги</option><option value="1.08">Набір м’язів</option></select></div>${editing ? '' : '<div class="field full"><label for="targetWeight">Цільова вага, кг</label><input id="targetWeight" type="number" min="30" max="250" step="0.1" placeholder="75" required /></div>'}</div><button class="primary" type="submit">${editing ? 'Зберегти зміни' : 'Порахувати мою ціль'} <span aria-hidden="true">→</span></button><p class="disclaimer">Розрахунок орієнтовний. Не замінює консультацію лікаря або дієтолога.</p></form>`);
  if (!editing) document.querySelector('#profile-form .field-grid').insertAdjacentHTML('beforeend', '<div class="field"><label for="shoulder">Плече, см</label><input id="shoulder" type="number" min="1" max="300" step="0.1" placeholder="39" required /></div><div class="field"><label for="chest">Груди, см</label><input id="chest" type="number" min="1" max="300" step="0.1" placeholder="104" required /></div><div class="field"><label for="waist">Талія, см</label><input id="waist" type="number" min="1" max="300" step="0.1" placeholder="94" required /></div><div class="field"><label for="hips">Стегна, см</label><input id="hips" type="number" min="1" max="300" step="0.1" placeholder="107" required /></div><div class="field"><label for="thigh">Стегно, см</label><input id="thigh" type="number" min="1" max="300" step="0.1" placeholder="54" required /></div>');
  if (editing) {
    document.querySelector('#gender').value = state.profile.gender || 'female';
    document.querySelector('#age').value = state.profile.age || '';
    document.querySelector('#height').value = state.profile.height || '';
    document.querySelector('#weight').value = state.profile.weight || '';
    document.querySelector('#activity').value = state.profile.activity || '1.2';
    document.querySelector('#goal').value = state.profile.goal || '0.85';
  }
  document.querySelector('#profile-back')?.addEventListener('click', renderDashboard);
  document.querySelector('#profile-form').addEventListener('submit', handleProfile);
}

function handleProfile(event) {
  event.preventDefault();
  const editing = Boolean(state.profile);
  const get = id => document.querySelector(`#${id}`).value;
  const age = Number(get('age')); const height = Number(get('height')); const weight = Number(get('weight'));
  const measurements = editing ? state.dashboard?.measurements : { shoulder: Number(get('shoulder')), chest: Number(get('chest')), waist: Number(get('waist')), hips: Number(get('hips')), thigh: Number(get('thigh')) };
  const bmr = get('gender') === 'male' ? 10 * weight + 6.25 * height - 5 * age + 5 : 10 * weight + 6.25 * height - 5 * age - 161;
  const goal = Number(get('goal'));
  const target = Math.round(Math.max(1200, bmr * Number(get('activity')) * goal) / 50) * 50;
  const targetWeight = editing ? (state.profile.targetWeight || 75) : Number(get('targetWeight'));
  const proteinPerKg = goal > 1 ? 1.8 : 1.6;
  const protein = Math.round(weight * proteinPerKg);
  const fats = Math.round(weight * .8);
  state.profile = { name: userName(), gender: get('gender'), activity: Number(get('activity')), goal, age, height, weight, targetWeight, registeredAt: state.profile?.registeredAt || dayKey(), target, protein, fats, carbs: Math.max(0, Math.round((target - (protein * 4) - (fats * 9)) / 4)) };
  state.planDate = dayKey();
  state.foodLog = {};
  if (!editing) state.dashboard = { steps: {}, training: {}, weights: [{ date: dayKey(), value: weight }], startWeight: weight, measurements };
  state.meals = planForToday(target);
  save(); renderDashboard();
}

function mealItemsMarkup(meal) {
  return meal.items.map(item => `<li><span class="food-item-toggle" data-meal-id="${meal.id}" data-item-id="${item.id}" role="button" tabindex="0"><span>${esc(item.name)}<small>${item.consumedGrams ? `з’їдено ${item.consumedGrams} г` : 'натисни, щоб додати'}</small></span><strong>${item.recommendedGrams} г</strong></span></li>`).join('');
}

function rebalanceCategory(category) {
  const items = state.meals.flatMap(meal => meal.items).filter(item => item.group === category);
  const consumedKcal = items.reduce((sum, item) => sum + item.consumedGrams * item.kcal / 100, 0);
  const untouched = items.filter(item => item.consumedGrams === 0);
  const untouchedBaseKcal = untouched.reduce((sum, item) => sum + item.baseGrams * item.kcal / 100, 0);
  items.forEach(item => {
    if (item.consumedGrams > 0) item.recommendedGrams = item.consumedGrams;
    else {
      const itemShare = untouchedBaseKcal ? (item.baseGrams * item.kcal / 100) / untouchedBaseKcal : 0;
      const reducedKcal = consumedKcal * itemShare;
      item.recommendedGrams = Math.max(0, Math.round((item.baseGrams - reducedKcal * 100 / item.kcal) / 5) * 5);
    }
  });
}

function openFoodEditor(mealId, itemId) {
  const meal = state.meals.find(item => item.id === mealId);
  const item = meal.items.find(foodItem => foodItem.id === itemId);
  app.insertAdjacentHTML('beforeend', `<div class="food-modal" role="dialog" aria-modal="true"><form class="food-modal-card"><button class="modal-close" type="button" aria-label="Закрити">×</button><p class="eyebrow">додати до щоденника</p><h2>${esc(item.name)}</h2><p class="modal-note">Вага сирого продукту. Після додавання інші продукти цієї категорії перерахуються.</p><label for="eaten-grams">Скільки з’їв сьогодні, г</label><input id="eaten-grams" type="number" min="0" max="2000" step="5" value="${item.consumedGrams}" autofocus /><button class="primary" type="submit">Зберегти кількість</button></form></div>`);
  const modal = document.querySelector('.food-modal');
  modal.querySelector('.modal-close').addEventListener('click', () => modal.remove());
  modal.querySelector('form').addEventListener('submit', event => { event.preventDefault(); item.consumedGrams = Math.max(0, Math.min(2000, Number(modal.querySelector('#eaten-grams').value) || 0)); rebalanceCategory(item.group); save(); renderDashboard(); });
}

function renderFoods() {
  ensureDailyFoodLog();
  const eatenKcal = foodCatalog.reduce((sum, item) => sum + foodKcal(item, foodConsumed(item.id)), 0);
  const groups = [...new Set(foodCatalog.map(item => item.group))];
  const groupsMarkup = groups.map(group => {
    const closed = categoryClosed(group);
    const visibleItems = foodCatalog.filter(item => item.group === group && (!closed || foodConsumed(item.id) > 0));
    const rows = visibleItems.map(item => { const consumed = foodConsumed(item.id); const max = foodOriginalMax(item); const available = foodAvailableMax(item); return `<button class="food-item food-row ${consumed ? 'is-logged' : ''}" data-food-id="${item.id}" type="button"><span class="food-letter ${groupTone(group)}">${groupIcon(group)}</span><span class="food-row-info"><strong>${esc(item.name)}</strong><small>${item.kcal} ккал · ${item.detail}</small></span><span class="food-row-amount"><b>${available}</b> г<small>${consumed ? `залишилось (з’їдено ${consumed} / ${max} г)` : 'доступно сьогодні'}</small></span></button>`; }).join('');
    return `<div class="food-group ${closed ? 'is-closed' : ''}"><div class="food-group-head"><h2>${group}</h2>${closed ? '<span class="closed-badge">закрито ✓</span>' : ''}</div><div class="food-grid">${rows}</div></div>`;
  }).join('');
  shell(`<section class="products-head fade-in"><button class="back-button" id="back-today" type="button">← Сьогодні</button><div class="products-title"><div><p class="eyebrow">щоденний конструктор</p><h1>Продукти</h1><p class="lead">Натисни на продукт і вкажи, скільки з’їв. Усі ваги вказані в сирому вигляді.</p></div><div class="products-kcal"><strong>${Math.round(eatenKcal)}</strong><span>/ ${state.profile?.target || 0} ккал</span></div></div><div class="catalog-progress"><span style="width:${Math.min(100, Math.round(eatenKcal / (state.profile?.target || 1) * 100))}%"></span></div><button class="secondary reset-food-button" id="reset-food-log" type="button">Скинути за сьогодні</button></section><section class="food-catalog food-list fade-in">${groupsMarkup}</section><nav class="bottom-nav"><button class="nav-item" type="button" id="today-nav"><span class="nav-icon">⌂</span>Сьогодні</button><button class="nav-item active" type="button"><span class="nav-icon">▦</span>Продукти</button><button class="nav-item" type="button" id="edit-profile"><span class="nav-icon">◌</span>Профіль</button></nav>`);
  document.querySelector('#back-today').addEventListener('click', renderDashboard);
  document.querySelector('#today-nav').addEventListener('click', renderDashboard);
  document.querySelector('#edit-profile').addEventListener('click', renderOnboarding);
  document.querySelector('#reset-food-log').addEventListener('click', () => { resetDailyFoodLog(); renderFoods(); });
  document.querySelectorAll('.food-row').forEach(row => row.addEventListener('click', () => openCatalogEditor(row.dataset.foodId)));
}

function openCatalogEditor(foodId) {
  const item = food(foodId);
  const originalMax = foodOriginalMax(item);
  const current = foodConsumed(item.id);
  const available = foodAvailableMax(item);
  const allowedMax = Math.min(originalMax, current + available);
  app.insertAdjacentHTML('beforeend', `<div class="food-modal" role="dialog" aria-modal="true"><form class="food-modal-card product-modal-card"><button class="modal-close" type="button" aria-label="Закрити">×</button><h2>${esc(item.name)}</h2><p class="modal-note">Оригінальна рекомендація: ${originalMax} г</p><div class="category-limit">Залишилось у категорії: ${Math.round((categoryCalories[item.group] * portionScale()) - categoryConsumedKcal(item.group))} ккал. Інші продукти групи зменшаться автоматично.</div><label for="catalog-grams">Кількість (грам): <strong id="catalog-grams-value">${current}</strong> <small>(максимум зараз: ${allowedMax} г)</small></label><input id="catalog-grams" type="range" min="0" max="${allowedMax}" step="1" value="${Math.min(current, allowedMax)}" /><div class="modal-stats"><strong><span id="modal-kcal">${Math.round(foodKcal(item, current))}</span><small>ккал</small></strong><strong><span>${Math.round(foodKcal(item, current) * .4)}</span><small>білки</small></strong></div><div class="quick-grams">${[25, 50, 75, 100].map(percent => `<button type="button" data-percent="${percent}">${percent}%</button>`).join('')}</div><div class="modal-actions"><button class="secondary modal-cancel" type="button">Скасувати</button><button class="primary" type="submit">Підтвердити</button></div></form></div>`);
  const modal = document.querySelector('.food-modal');
  const slider = modal.querySelector('#catalog-grams');
  const update = grams => { modal.querySelector('#catalog-grams-value').textContent = grams; modal.querySelector('#modal-kcal').textContent = Math.round(foodKcal(item, grams)); slider.value = grams; };
  modal.querySelectorAll('[data-percent]').forEach(button => button.addEventListener('click', () => update(Math.round(originalMax * Number(button.dataset.percent) / 100 / 5) * 5)));
  slider.addEventListener('input', () => update(Number(slider.value)));
  modal.querySelector('.modal-close').addEventListener('click', () => modal.remove());
  modal.querySelector('.modal-cancel').addEventListener('click', () => modal.remove());
  modal.querySelector('form').addEventListener('submit', event => { event.preventDefault(); state.foodLog[item.id] = Math.min(allowedMax, Number(slider.value)); save(); modal.remove(); renderFoods(); });
}

function dashboardData() {
  state.profile.registeredAt ??= dayKey();
  state.dashboard ??= { steps: {}, training: {}, weights: [], measurements: {} };
  state.dashboard.steps ??= {};
  state.dashboard.training ??= {};
  state.dashboard.weights ??= [];
  state.dashboard.measurements ??= {};
  if (!state.dashboard.weights.length && state.profile?.weight) state.dashboard.weights.push({ date: dayKey(), value: state.profile.weight });
  state.dashboard.startWeight ??= state.dashboard.weights[0]?.value || state.profile?.weight || 0;
  const defaults = { shoulder: 39, chest: 104, waist: 94, hips: 107, thigh: 54 };
  Object.entries(defaults).forEach(([key, value]) => { state.dashboard.measurements[key] ??= value; });
  save();
  return state.dashboard;
}

function weekKey() {
  const date = new Date();
  const first = new Date(date.getFullYear(), 0, 1);
  return `${date.getFullYear()}-${Math.ceil((((date - first) / 86400000) + first.getDay() + 1) / 7)}`;
}

function closeDashboardModal(modal) {
  modal.querySelectorAll('.modal-close, .modal-cancel').forEach(button => button.addEventListener('click', () => modal.remove()));
}

function openDashboardCard(index) {
  if (index === 0) { renderFoods(); return; }
  if (index === 1) { renderStepsScreen(); return; }
  const data = dashboardData();
  const config = {
    1: { title: 'Кроки', label: 'Кроків сьогодні', value: data.steps[dayKey()] || 0, field: 'steps-value', min: 0, max: 100000, step: 100, note: 'Вкажи кількість кроків за сьогодні.' },
    2: { title: 'Тренування', label: 'Тренувань цього тижня', value: data.training[weekKey()] || 0, field: 'training-value', min: 0, max: 7, step: 1, note: 'Скільки тренувань уже було цього тижня?' },
    3: { title: 'Вага', label: 'Поточна вага, кг', value: data.weights.at(-1)?.value || state.profile.weight, field: 'weight-value', min: 30, max: 300, step: 0.1, note: 'Значення збережеться як вимірювання за сьогодні.' },
  };
  if (index <= 3) {
    const item = config[index];
    app.insertAdjacentHTML('beforeend', `<div class="food-modal" role="dialog" aria-modal="true"><form class="food-modal-card dashboard-modal"><button class="modal-close" type="button" aria-label="Закрити">×</button><p class="eyebrow">${item.title}</p><h2>${item.label}</h2><p class="modal-note">${item.note}</p><label for="${item.field}">${item.label}</label><input id="${item.field}" type="number" min="${item.min}" max="${item.max}" step="${item.step}" value="${item.value}" required />${index === 3 ? `<p class="locked-note">Цільова вага: ${state.profile.targetWeight || 75} кг. Змінити її можна лише через Telegram-бот.</p>` : ''}<div class="modal-actions"><button class="secondary modal-cancel" type="button">Скасувати</button><button class="primary" type="submit">Зберегти</button></div></form></div>`);
    const modal = document.querySelector('.food-modal');
    closeDashboardModal(modal);
    modal.querySelector('form').addEventListener('submit', event => {
      event.preventDefault();
      const value = Number(modal.querySelector(`#${item.field}`).value);
      if (index === 1) data.steps[dayKey()] = value;
      if (index === 2) data.training[weekKey()] = value;
      if (index === 3) { data.weights.push({ date: dayKey(), value }); state.profile.weight = value; }
      save(); modal.remove(); renderDashboard();
    });
    return;
  }
  const measurementKeys = ['shoulder', 'chest', 'waist', 'hips', 'thigh'];
  const measurementNames = ['Обхват плеча', 'Обхват грудей', 'Обхват талії', 'Обхват стегон', 'Обхват стегна'];
  const key = measurementKeys[index - 4];
  app.insertAdjacentHTML('beforeend', `<div class="food-modal" role="dialog" aria-modal="true"><form class="food-modal-card dashboard-modal"><button class="modal-close" type="button" aria-label="Закрити">×</button><p class="eyebrow">Заміри</p><h2>${measurementNames[index - 4]}</h2><p class="modal-note">Вкажи актуальний обхват у сантиметрах.</p><label for="measurement-value">Значення, см</label><input id="measurement-value" type="number" min="1" max="300" step="0.1" value="${data.measurements[key] || ''}" required /><button class="primary" type="submit">Зберегти</button></form></div>`);
  const modal = document.querySelector('.food-modal');
  closeDashboardModal(modal);
  modal.querySelector('form').addEventListener('submit', event => { event.preventDefault(); data.measurements[key] = Number(modal.querySelector('#measurement-value').value); save(); modal.remove(); renderDashboard(); });
}

function openReport() {
  const data = dashboardData();
  const p = state.profile;
  const report = `Звіт Ритм за ${today()}\nКалорії: ${Math.round(loggedFoodKcal())} / ${p.target} ккал\nКроки: ${data.steps[dayKey()] || 0}\nТренування цього тижня: ${data.training[weekKey()] || 0}\nВага: ${data.weights.at(-1)?.value || p.weight} кг`;
  app.insertAdjacentHTML('beforeend', `<div class="food-modal" role="dialog" aria-modal="true"><div class="food-modal-card dashboard-modal"><button class="modal-close" type="button" aria-label="Закрити">×</button><p class="eyebrow">Твій прогрес</p><h2>Звіт готовий</h2><textarea class="report-text" readonly>${report}</textarea><button class="primary copy-report" type="button">Скопіювати звіт</button></div></div>`);
  const modal = document.querySelector('.food-modal');
  closeDashboardModal(modal);
  modal.querySelector('.copy-report').addEventListener('click', async () => { await navigator.clipboard?.writeText(report); modal.querySelector('.copy-report').textContent = 'Скопійовано'; });
}

function dateKeyOffset(offset) {
  const date = new Date();
  date.setDate(date.getDate() + offset);
  return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}-${String(date.getDate()).padStart(2, '0')}`;
}

function openStepsEditor() {
  const data = dashboardData();
  const current = data.steps[dayKey()] || 0;
  app.insertAdjacentHTML('beforeend', `<div class="food-modal" role="dialog" aria-modal="true"><form class="food-modal-card dashboard-modal"><button class="modal-close" type="button" aria-label="Закрити">×</button><p class="eyebrow">Кроки</p><h2>Внести дані</h2><p class="modal-note">Скільки кроків ти зробив сьогодні?</p><label for="steps-value">Кількість кроків</label><input id="steps-value" type="number" min="0" max="100000" step="100" value="${current}" required /><button class="primary" type="submit">Зберегти</button></form></div>`);
  const modal = document.querySelector('.food-modal');
  closeDashboardModal(modal);
  modal.querySelector('form').addEventListener('submit', event => { event.preventDefault(); data.steps[dayKey()] = Number(modal.querySelector('#steps-value').value); save(); modal.remove(); renderStepsScreen(); });
}

function renderStepsScreen() {
  const data = dashboardData();
  const registeredDate = new Date(`${state.profile.registeredAt}T12:00:00`);
  const currentDate = new Date(`${dayKey()}T12:00:00`);
  const daysSinceRegistration = Math.max(1, Math.floor((currentDate - registeredDate) / 86400000) + 1);
  const points = Array.from({ length: daysSinceRegistration }, (_, index) => {
    const date = dateKeyOffset(index - daysSinceRegistration + 1);
    return { date, value: data.steps[date] || 0 };
  });
  const recorded = points.filter(point => point.value > 0);
  const average = recorded.length ? Math.round(recorded.reduce((sum, point) => sum + point.value, 0) / recorded.length) : 0;
  const max = Math.max(7000, ...points.map(point => point.value), 1) * 1.15;
  const bars = points.map(point => `<div class="step-bar-wrap" title="${point.value.toLocaleString('uk-UA')} кроків"><span class="step-bar" style="height:${Math.max(point.value ? 3 : 1, Math.round(point.value / max * 100))}%"></span><small>${new Intl.DateTimeFormat('uk-UA', { day: '2-digit', month: 'short' }).format(new Date(`${point.date}T12:00:00`))}</small></div>`).join('');
  shell(`<section class="steps-head fade-in"><button class="back-button" id="steps-back" type="button">← Головна</button><p class="eyebrow">активність</p><h1>Кроки</h1><p class="lead">Твоя щоденна активність від реєстрації акаунта.</p></section><section class="steps-summary fade-in"><p>Середній показник</p><small>Середня кількість кроків за дні з даними</small><strong>${average.toLocaleString('uk-UA')}</strong></section><section class="steps-chart-card fade-in"><div class="steps-chart-head"><div><h2>Щоденні кроки</h2><p>Ціль: 7 000 кроків на день</p></div><span>${recorded.length} днів</span></div><div class="steps-chart"><div class="steps-target" style="bottom:${Math.round(7000 / max * 100)}%"></div>${bars}</div></section><button class="report-button steps-entry-button" id="add-steps" type="button">Внести дані</button><nav class="bottom-nav"><button class="nav-item active" type="button" id="today-nav"><span class="nav-icon">⌂</span>Головна</button><button class="nav-item" type="button" id="foods-nav"><span class="nav-icon">▦</span>Продукти</button><button class="nav-item" type="button" id="edit-profile"><span class="nav-icon">◌</span>Профіль</button></nav>`);
  document.querySelector('#steps-back').addEventListener('click', renderDashboard);
  document.querySelector('#today-nav').addEventListener('click', renderDashboard);
  document.querySelector('#foods-nav').addEventListener('click', renderFoods);
  document.querySelector('#edit-profile').addEventListener('click', renderOnboarding);
  document.querySelector('#add-steps').addEventListener('click', openStepsEditor);
}

function refreshDashboardData() {
  const data = dashboardData();
  const cards = document.querySelectorAll('.dash-card');
  const steps = data.steps[dayKey()] || 0;
  const training = data.training[weekKey()] || 0;
  const currentWeight = data.weights.at(-1)?.value || state.profile.weight;
  const targetWeight = state.profile.targetWeight || 75;
  const gaining = Number(state.profile.goal) > 1;
  const weightRange = Math.abs(data.startWeight - targetWeight);
  const weightProgress = weightRange ? Math.max(0, Math.min(100, Math.round((gaining ? currentWeight - data.startWeight : data.startWeight - currentWeight) / weightRange * 100))) : 0;
  cards[1].querySelector('strong').textContent = steps.toLocaleString('uk-UA');
  cards[1].querySelector('.ring span').innerHTML = `${steps ? '✓' : '0%'}<small>кроки</small>`;
  cards[2].querySelector('strong').textContent = `${training}/3`;
  cards[2].querySelector('.ring span').innerHTML = `${Math.min(100, Math.round(training / 3 * 100))}%<small>тиждень</small>`;
  cards[3].querySelector('strong').innerHTML = `${currentWeight} <em>кг</em>`;
  cards[3].querySelector('small').textContent = `Ціль: ${targetWeight} кг`;
  cards[3].querySelector('.ring').style.setProperty('--progress', `${weightProgress}%`);
  cards[3].querySelector('.ring span').innerHTML = `${weightProgress}%<small>ціль</small>`;
  ['shoulder', 'chest', 'waist', 'hips', 'thigh'].forEach((key, index) => {
    cards[index + 4].querySelector('strong').innerHTML = `${data.measurements[key]} <em>см</em>`;
  });
}

function renderDashboard() {
  ensureDailyPlan();
  const p = state.profile; const eaten = Math.round(loggedFoodKcal()); const percent = Math.min(100, Math.round(eaten / p.target * 100));
  const macros = loggedFoodMacros();
  const proteinTarget = p.protein || Math.round((p.weight || 0) * 1.6);
  const fatsTarget = p.fats || Math.round((p.weight || 0) * .8);
  const macroTargets = { protein: proteinTarget, fats: fatsTarget, carbs: p.carbs || Math.round((p.target - proteinTarget * 4 - fatsTarget * 9) / 4) };
  const macroItems = [['protein', 'Білки', macroTargets.protein, '#52a781'], ['fats', 'Жири', macroTargets.fats, 'var(--coral)'], ['carbs', 'Вуглеводи', macroTargets.carbs, '#c19628']];
  const macroMarkup = macroItems.map(([key, label, target, color]) => `<div class="nutrition-macro"><div><strong>${Math.round(macros[key])} г</strong><span>${label}</span><small>з ${target} г</small></div><div class="nutrition-track"><span style="width:${Math.min(100, Math.round(macros[key] / target * 100))}%; background:${color}"></span></div></div>`).join('');
  shell(`<section class="home-title fade-in"><div><p class="greeting">Привіт, ${esc(p.name)} 👋</p><h1>Головна</h1><p class="date">${today()} · твій прогрес</p></div><div class="profile-badge">${esc((p.name || 'К').slice(0, 1).toUpperCase())}</div></section><section class="dashboard-grid fade-in"><article class="dash-card meal-progress-card"><div class="dash-card-main"><div class="dash-icon">🍴</div><strong>${eaten > 0 ? 'Раціон частково завершено' : 'Раціон ще не розпочато'}</strong><p>${eaten.toLocaleString('uk-UA')} з ${p.target.toLocaleString('uk-UA')} ккал</p><div class="mini-progress"><span style="width:${percent}%"></span></div></div><div class="ring" style="--progress:${percent}%"><span>${percent}%<small>Ккал</small></span></div></article><article class="dash-card"><div class="dash-card-main"><div class="dash-icon steps-icon">♧</div><strong>0</strong><p>Кроків сьогодні</p><small>Ціль: 7 000 кроків</small></div><div class="ring muted-ring"><span>0%<small>кроки</small></span></div></article><article class="dash-card"><div class="dash-card-main"><div class="dash-icon training-icon">♧</div><strong>2/3</strong><p>тренувань цього тижня</p><small>Останнє: тренування 14 годин тому</small></div><div class="ring dark-ring"><span>67%<small>тиждень</small></span></div></article><article class="dash-card"><div class="dash-card-main"><div class="dash-icon measure-icon">⌁</div><strong>98 <em>кг</em> <b>↓ 1,2 кг</b></strong><p>поточна вага</p><small>Ціль: 75 кг</small></div><div class="ring dark-ring"><span>32%<small>ціль</small></span></div></article><article class="dash-card chart-card"><span class="alert-dot"></span><div class="dash-card-main"><div class="dash-icon measure-icon">⌁</div><strong>39 <em>см</em></strong><p>обхват плеча</p></div><span class="sparkline">⌁⌁⌁</span></article><article class="dash-card chart-card"><span class="alert-dot"></span><div class="dash-card-main"><div class="dash-icon measure-icon">⌁</div><strong>104 <em>см</em> <b class="negative">↓ 3 см</b></strong><p>обхват грудей</p></div><span class="sparkline down">⌁⌁⌁</span></article><article class="dash-card chart-card"><span class="alert-dot"></span><div class="dash-card-main"><div class="dash-icon measure-icon">⌁</div><strong>94 <em>см</em> <b>↓ 3 см</b></strong><p>обхват талії</p></div><span class="sparkline wave">⌁⌁⌁</span></article><article class="dash-card chart-card"><span class="alert-dot"></span><div class="dash-card-main"><div class="dash-icon measure-icon">⌁</div><strong>107 <em>см</em> <b>↓ 3 см</b></strong><p>обхват стегон</p></div><span class="sparkline wave">⌁⌁⌁</span></article><article class="dash-card chart-card"><span class="alert-dot"></span><div class="dash-card-main"><div class="dash-icon measure-icon">⌁</div><strong>54 <em>см</em></strong><p>обхват стегна</p></div><span class="sparkline down">⌁⌁⌁</span></article></section><button class="report-button" type="button">➤ &nbsp; Надіслати звіт</button><nav class="bottom-nav"><button class="nav-item active" type="button" id="today-nav"><span class="nav-icon">⌂</span>Головна</button><button class="nav-item" type="button" id="foods-nav"><span class="nav-icon">▦</span>Продукти</button><button class="nav-item" type="button" id="edit-profile"><span class="nav-icon">◌</span>Профіль</button></nav>`);
  document.querySelector('.dashboard-grid').insertAdjacentHTML('beforebegin', `<section class="nutrition-summary fade-in"><div class="nutrition-head"><div><p class="eyebrow">щоденний баланс</p><h2>Харчування сьогодні</h2></div><span>орієнтовно</span></div><div class="nutrition-calories"><strong>${eaten.toLocaleString('uk-UA')}</strong><span>з ${p.target.toLocaleString('uk-UA')} ккал</span></div><div class="nutrition-progress"><span style="width:${percent}%"></span></div><div class="nutrition-macros">${macroMarkup}</div></section>`);
  refreshDashboardData();
  document.querySelector('#edit-profile').addEventListener('click', renderOnboarding);
  document.querySelector('#foods-nav').addEventListener('click', renderFoods);
  document.querySelectorAll('.dash-card').forEach((card, index) => {
    card.classList.add('dash-card-interactive');
    card.setAttribute('role', 'button');
    card.tabIndex = 0;
    const activate = () => openDashboardCard(index);
    card.addEventListener('click', activate);
    card.addEventListener('keydown', event => {
      if (event.key === 'Enter' || event.key === ' ') { event.preventDefault(); activate(); }
    });
  });
  document.querySelector('.report-button').addEventListener('click', openReport);
}

ensureDailyFoodLog();
scheduleDailyFoodReset();
state.profile ? renderDashboard() : renderOnboarding();
