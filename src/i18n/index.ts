import i18n from 'i18next'
import { initReactI18next } from 'react-i18next'

// Переводы на русский язык
const ruTranslations = {
  common: {
    loading: 'Загрузка...',
    error: 'Ошибка',
    success: 'Успешно',
    save: 'Сохранить',
    cancel: 'Отмена',
    delete: 'Удалить',
    edit: 'Редактировать',
    search: 'Поиск',
    filter: 'Фильтр',
    clear: 'Очистить',
    back: 'Назад',
    next: 'Далее',
    publish: 'Опубликовать',
    draft: 'Черновик'
  },
  app: {
    title: 'Fractal Ads',
    subtitle: 'Децентрализованная платформа объявлений',
    welcome: 'Добро пожаловать!',
    getStarted: 'Начать'
  },
  auth: {
    createAccount: 'Создать аккаунт',
    accountName: 'Имя аккаунта',
    selectEmoji: 'Выберите эмодзи',
    accounts: 'Аккаунты',
    switchAccount: 'Переключить аккаунт',
    deleteAccount: 'Удалить аккаунт'
  },
  ads: {
    title: 'Объявления',
    myAds: 'Мои объявления',
    createAd: 'Создать объявление',
    adTitle: 'Название',
    description: 'Описание',
    price: 'Цена',
    category: 'Категория',
    location: 'Местоположение',
    tags: 'Теги',
    noAds: 'Нет объявлений',
    views: 'Просмотров',
    published: 'Опубликовано'
  },
  categories: {
    electronics: 'Электроника',
    vehicles: 'Транспорт',
    property: 'Недвижимость',
    jobs: 'Работа',
    services: 'Услуги',
    fashion: 'Мода',
    home: 'Дом и сад',
    sports: 'Спорт',
    books: 'Книги',
    other: 'Другое'
  },
  network: {
    title: 'Сеть',
    status: 'Статус сети',
    nodes: 'Узлы',
    online: 'Онлайн',
    offline: 'Оффлайн',
    connecting: 'Подключение...',
    connected: 'Подключено',
    peers: 'Пиры',
    health: 'Состояние сети'
  }
}

// Переводы на английский язык
const enTranslations = {
  common: {
    loading: 'Loading...',
    error: 'Error',
    success: 'Success',
    save: 'Save',
    cancel: 'Cancel',
    delete: 'Delete',
    edit: 'Edit',
    search: 'Search',
    filter: 'Filter',
    clear: 'Clear',
    back: 'Back',
    next: 'Next',
    publish: 'Publish',
    draft: 'Draft'
  },
  app: {
    title: 'Fractal Ads',
    subtitle: 'Decentralized Ads Platform',
    welcome: 'Welcome!',
    getStarted: 'Get Started'
  },
  auth: {
    createAccount: 'Create Account',
    accountName: 'Account Name',
    selectEmoji: 'Select Emoji',
    accounts: 'Accounts',
    switchAccount: 'Switch Account',
    deleteAccount: 'Delete Account'
  },
  ads: {
    title: 'Ads',
    myAds: 'My Ads',
    createAd: 'Create Ad',
    adTitle: 'Title',
    description: 'Description',
    price: 'Price',
    category: 'Category',
    location: 'Location',
    tags: 'Tags',
    noAds: 'No ads',
    views: 'Views',
    published: 'Published'
  },
  categories: {
    electronics: 'Electronics',
    vehicles: 'Vehicles',
    property: 'Property',
    jobs: 'Jobs',
    services: 'Services',
    fashion: 'Fashion',
    home: 'Home & Garden',
    sports: 'Sports',
    books: 'Books',
    other: 'Other'
  },
  network: {
    title: 'Network',
    status: 'Network Status',
    nodes: 'Nodes',
    online: 'Online',
    offline: 'Offline',
    connecting: 'Connecting...',
    connected: 'Connected',
    peers: 'Peers',
    health: 'Network Health'
  }
}

i18n
  .use(initReactI18next)
  .init({
    resources: {
      ru: { translation: ruTranslations },
      en: { translation: enTranslations }
    },
    lng: 'ru',
    fallbackLng: 'en',
    interpolation: {
      escapeValue: false
    }
  })

export default i18n