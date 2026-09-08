// Данные для галереи с РЕАЛЬНЫМИ изображениями
const galleryData = [
    { 
      id: 1, 
      name: 'Колье «Сапфировая ночь»', 
      price: '₽ 284 000', 
      image: 'https://images.unsplash.com/photo-1605100804763-247f67b3557e?w=600&h=600&fit=crop&crop=center',
      alt: 'Сапфировое колье' 
    },
    { 
      id: 2, 
      name: 'Серьги «Лунный свет»', 
      price: '₽ 167 000', 
      image: 'https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?w=600&h=600&fit=crop&crop=center',
      alt: 'Серьги с лунным камнем' 
    },
    { 
      id: 3, 
      name: 'Кольцо «Рубиновое сердце»', 
      price: '₽ 210 000', 
      image: 'https://images.unsplash.com/photo-1603561591411-07134e71a2a9?w=600&h=600&fit=crop&crop=center',
      alt: 'Рубиновое кольцо' 
    },
    { 
      id: 4, 
      name: 'Браслет «Изумрудный сад»', 
      price: '₽ 195 000', 
      image: 'https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?w=600&h=600&fit=crop&crop=center',
      alt: 'Изумрудный браслет' 
    },
    { 
      id: 5, 
      name: 'Подвеска «Золотая капля»', 
      price: '₽ 132 000', 
      image: 'https://images.unsplash.com/photo-1611652022419-a9419f74343d?w=600&h=600&fit=crop&crop=center',
      alt: 'Золотая подвеска' 
    },
    { 
      id: 6, 
      name: 'Брошь «Павлин»', 
      price: '₽ 178 000', 
      image: 'https://images.unsplash.com/photo-1617038260897-41a1f14a8ca0?w=600&h=600&fit=crop&crop=center',
      alt: 'Брошь павлин' 
    },
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
        <img src="${item.image}" alt="${item.alt || item.name}" class="gallery-image">
        <div class="gallery-info">
          <div class="name">${item.name}</div>
          <div class="price">${item.price}</div>
        </div>
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
    modalImg.src = item.image;
    modalImg.alt = item.alt || item.name;
    modalImg.style.display = 'block';
    modalImg.textContent = '';
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