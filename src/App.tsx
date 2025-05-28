import React, { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { useAuthStore } from './stores/authStore'
import AuthPanel from './components/AuthPanel'
import AdsList from './components/AdsList'
import CreateAdForm from './components/CreateAdForm'
import NetworkStatus from './components/NetworkStatus'
import { 
  Users, 
  Plus, 
  Search, 
  Network, 
  Globe, 
  Zap,
  Menu,
  X
} from 'lucide-react'

type ActiveTab = 'ads' | 'create' | 'network' | 'profile'

function App() {
  const { t } = useTranslation()
  const { isAuthenticated, currentUser } = useAuthStore()
  const [activeTab, setActiveTab] = useState<ActiveTab>('ads')
  const [sidebarOpen, setSidebarOpen] = useState(false)

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-primary-50 to-primary-100">
        <div className="container mx-auto px-4 py-8">
          <div className="text-center mb-8">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-primary-500 rounded-full mb-4">
              <Zap className="w-8 h-8 text-white" />
            </div>
            <h1 className="text-4xl font-bold text-gray-900 mb-2">
              {t('app.title')}
            </h1>
            <p className="text-xl text-gray-600">
              {t('app.subtitle')}
            </p>
          </div>
          <AuthPanel />
        </div>
      </div>
    )
  }

  const tabs = [
    { id: 'ads', label: t('ads.title'), icon: Search },
    { id: 'create', label: t('ads.createAd'), icon: Plus },
    { id: 'network', label: t('network.title'), icon: Network },
    { id: 'profile', label: t('auth.accounts'), icon: Users }
  ] as const

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b border-gray-200">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center space-x-4">
              <button
                onClick={() => setSidebarOpen(!sidebarOpen)}
                className="lg:hidden p-2 rounded-lg hover:bg-gray-100"
              >
                {sidebarOpen ? <X size={20} /> : <Menu size={20} />}
              </button>
              
              <div className="flex items-center space-x-2">
                <div className="w-8 h-8 bg-gradient-to-br from-primary-400 to-primary-600 rounded-lg flex items-center justify-center">
                  <Zap className="w-5 h-5 text-white" />
                </div>
                <h1 className="text-xl font-bold text-gray-900">
                  {t('app.title')}
                </h1>
              </div>
            </div>

            <div className="flex items-center space-x-4">
              <NetworkStatus />
              <div className="flex items-center space-x-2">
                <span className="text-2xl">{currentUser?.emoji}</span>
                <span className="hidden sm:block text-sm font-medium text-gray-700">
                  {currentUser?.name}
                </span>
              </div>
            </div>
          </div>
        </div>
      </header>

      <div className="flex">
        {/* Sidebar */}
        <aside className={`
          ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'}
          lg:translate-x-0 fixed lg:static inset-y-0 left-0 z-50
          w-64 bg-white shadow-lg border-r border-gray-200
          transition-transform duration-300 ease-in-out
        `}>
          <nav className="p-4 mt-16 lg:mt-0">
            <div className="space-y-2">
              {tabs.map(tab => (
                <button
                  key={tab.id}
                  onClick={() => {
                    setActiveTab(tab.id as ActiveTab)
                    setSidebarOpen(false)
                  }}
                  className={`
                    flex items-center space-x-3 w-full p-3 rounded-lg text-left
                    transition-colors duration-200
                    ${activeTab === tab.id
                      ? 'bg-primary-50 text-primary-700 border border-primary-200'
                      : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                    }
                  `}
                >
                  <tab.icon size={20} />
                  <span className="font-medium">{tab.label}</span>
                </button>
              ))}
            </div>
          </nav>
        </aside>

        {/* Overlay для мобильных устройств */}
        {sidebarOpen && (
          <div 
            className="lg:hidden fixed inset-0 bg-black bg-opacity-50 z-40"
            onClick={() => setSidebarOpen(false)}
          />
        )}

        {/* Main Content */}
        <main className="flex-1 p-6">
          <div className="max-w-6xl mx-auto">
            {activeTab === 'ads' && <AdsList />}
            {activeTab === 'create' && <CreateAdForm />}
            {activeTab === 'network' && (
              <div className="bg-white rounded-xl shadow-sm p-6">
                <h2 className="text-2xl font-bold text-gray-900 mb-6">
                  {t('network.title')}
                </h2>
                <NetworkStatus detailed />
                
                <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div className="bg-gradient-to-br from-blue-50 to-blue-100 p-6 rounded-lg">
                    <Globe className="w-8 h-8 text-blue-600 mb-3" />
                    <h3 className="font-semibold text-gray-900 mb-2">
                      Децентрализованная сеть
                    </h3>
                    <p className="text-sm text-gray-600">
                      Нет серверов, только P2P соединения между пользователями
                    </p>
                  </div>
                  
                  <div className="bg-gradient-to-br from-green-50 to-green-100 p-6 rounded-lg">
                    <Zap className="w-8 h-8 text-green-600 mb-3" />
                    <h3 className="font-semibold text-gray-900 mb-2">
                      Быстрая синхронизация
                    </h3>
                    <p className="text-sm text-gray-600">
                      Объявления распространяются мгновенно по всей сети
                    </p>