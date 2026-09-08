// Данные для галереи
const galleryData = [
    { id: 1, name: 'Колье «Сапфировая ночь»', price: '₽ 284 000', icon: '💎' },
    { id: 2, name: 'Серьги «Лунный свет»', price: '₽ 167 000', icon: '🌙' },
    { id: 3, name: 'Кольцо «Рубиновое сердце»', price: '₽ 210 000', icon: '❤️' },
    { id: 4, name: 'Браслет «Изумрудный сад»', price: '₽ 195 000', icon: '🌿' },
    { id: 5, name: 'Подвеска «Золотая капля»', price: '₽ 132 000', icon: '✨' },
    { id: 6, name: 'Брошь «Павлин»', price: '₽ 178 000', icon: '🦚' },
  ];
  
  // Элементы DOM
  const grid = document.getElementById('galleryGrid');
  const modal = document.getElementById('modal');
  const modalImg = document.getElementById('modalImg');
  const modalCaption = document.getElementById('modalCaption');
  const modalClose = document.getElementById('modalClose');
  const modalPrev = document.getElementById('modalPrev');
  const modalNext = document.getElementById('modalNext');
  
  let currentIndex = 0;
  
  // Рендерим галерею
  function renderGallery() {
    grid.innerHTML = '';
    galleryData.forEach((item, index) => {
      const card = document.createElement('div');
      card.className = 'gallery-item';
      card.setAttribute('data-index', index);
      card.innerHTML = `
        <div class="icon">${item.icon}</div>
        <div class="name">${item.name}</div>
        <div class="price">${item.price}</div>
      `;
      card.addEventListener('click', () => openModal(index));
      grid.appendChild(card);
    });
  }
  
  // Открыть модальное окно
  function openModal(index) {
    currentIndex = index;
    updateModalContent();
    modal.style.display = 'flex';
    document.body.style.overflow = 'hidden';
  }
  
  // Обновить контент модального окна
  function updateModalContent() {
    const item = galleryData[currentIndex];
    modalImg.src = ''; // сброс
    // Используем data:image заглушку с эмодзи для демонстрации
    // В реальном проекте здесь были бы реальные URL картинок
    modalImg.alt = item.name;
    modalImg.style.fontSize = '8rem';
    modalImg.style.display = 'flex';
    modalImg.style.alignItems = 'center';
    modalImg.style.justifyContent = 'center';
    modalImg.style.background = 'linear-gradient(145deg, #f9f6f0, #e8dfd5)';
    modalImg.style.color = '#2a241e';
    modalImg.style.fontWeight = '300';
    modalImg.textContent = item.icon;
    modalCaption.textContent = `${item.name} — ${item.price}`;
  }
  
  // Закрыть модальное окно
  function closeModal() {
    modal.style.display = 'none';
    document.body.style.overflow = 'auto';
  }
  
  // Навигация
  function prevItem() {
    currentIndex = (currentIndex - 1 + galleryData.length) % galleryData.length;
    updateModalContent();
  }
  
  function nextItem() {
    currentIndex = (currentIndex + 1) % galleryData.length;
    updateModalContent();
  }
  
  // Обработчики событий
  modalClose.addEventListener('click', closeModal);
  modal.addEventListener('click', (e) => {
    if (e.target === modal) closeModal();
  });
  modalPrev.addEventListener('click', (e) => {
    e.stopPropagation();
    prevItem();
  });
  modalNext.addEventListener('click', (e) => {
    e.stopPropagation();
    nextItem();
  });
  
  // Клавиатурная навигация
  document.addEventListener('keydown', (e) => {
    if (modal.style.display === 'flex') {
      if (e.key === 'Escape') closeModal();
      if (e.key === 'ArrowLeft') prevItem();
      if (e.key === 'ArrowRight') nextItem();
    }
  });
  
  // Инициализация
  renderGallery();