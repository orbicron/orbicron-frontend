'use client'
import { useState } from 'react'
import { motion } from 'framer-motion'
import { 
  PaintBrushIcon, 
  CurrencyDollarIcon, 
  GlobeAltIcon,
  DevicePhoneMobileIcon,
  ChartBarIcon,
  EyeIcon
} from '@heroicons/react/24/outline'

export const AppPreferences = () => {
  const [preferences, setPreferences] = useState({
    theme: 'dark' as 'light' | 'dark' | 'auto',
    currency: 'PI' as 'PI' | 'USD' | 'EUR',
    language: 'en' as 'en' | 'es' | 'fr' | 'de' | 'zh',
    numberFormat: 'en-US' as string,
    dateFormat: 'MM/DD/YYYY' as string,
    firstDayOfWeek: 'monday' as 'sunday' | 'monday',
    chartType: 'line' as 'line' | 'bar',
    animationsEnabled: true,
    compactMode: false,
    autoBackup: true,
    biometricAuth: false
  })

  const themes = [
    { value: 'light', label: 'Light', icon: '☀️' },
    { value: 'dark', label: 'Dark', icon: '🌙' },
    { value: 'auto', label: 'Auto', icon: '🌓' }
  ]

  const currencies = [
    { value: 'PI', label: 'Pi Token (π)', symbol: 'π' },
    { value: 'USD', label: 'US Dollar', symbol: '$' },
    { value: 'EUR', label: 'Euro', symbol: '€' }
  ]

  const languages = [
    { value: 'en', label: 'English', flag: '🇺🇸' },
    { value: 'es', label: 'Español', flag: '🇪🇸' },
    { value: 'fr', label: 'Français', flag: '🇫🇷' },
    { value: 'de', label: 'Deutsch', flag: '🇩🇪' },
    { value: 'zh', label: '中文', flag: '🇨🇳' }
  ]

  const updatePreference = (key: string, value: any) => {
    setPreferences(prev => ({ ...prev, [key]: value }))
  }

  return (
    <div className="space-y-6">
      {/* Appearance Settings */}
      <div className="bg-white/5 backdrop-blur-md rounded-2xl border border-white/10 p-6">
        <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-3">
          <PaintBrushIcon className="w-7 h-7 text-purple-400" />
          Appearance
        </h2>
        
        <div className="space-y-6">
          {/* Theme Selection */}
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-4">Theme</label>
            <div className="grid grid-cols-3 gap-4">
              {themes.map((theme) => (
                <button
                  key={theme.value}
                  onClick={() => updatePreference('theme', theme.value)}
                  className={`p-4 rounded-xl border-2 transition-all duration-200 ${
                    preferences.theme === theme.value
                      ? 'border-purple-500 bg-purple-500/20'
                      : 'border-white/10 bg-white/5 hover:border-white/20'
                  }`}
                >
                  <div className="text-2xl mb-2">{theme.icon}</div>
                  <div className="text-white font-medium">{theme.label}</div>
                </button>
              ))}
            </div>
          </div>

          {/* UI Options */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="flex items-center justify-between p-4 bg-white/5 rounded-xl">
              <div>
                <div className="text-white font-medium">Animations</div>
                <div className="text-gray-400 text-sm">Enable smooth transitions and effects</div>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  checked={preferences.animationsEnabled}
                  onChange={(e) => updatePreference('animationsEnabled', e.target.checked)}
                  className="sr-only peer"
                />
                <div className="w-11 h-6 bg-gray-600 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-purple-600"></div>
              </label>
            </div>

            <div className="flex items-center justify-between p-4 bg-white/5 rounded-xl">
              <div>
                <div className="text-white font-medium">Compact Mode</div>
                <div className="text-gray-400 text-sm">Reduce spacing for more content</div>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  checked={preferences.compactMode}
                  onChange={(e) => updatePreference('compactMode', e.target.checked)}
                  className="sr-only peer"
                />
                <div className="w-11 h-6 bg-gray-600 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-purple-600"></div>
              </label>
            </div>
          </div>
        </div>
      </div>

      {/* Currency & Language */}
      <div className="bg-white/5 backdrop-blur-md rounded-2xl border border-white/10 p-6">
        <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-3">
          <GlobeAltIcon className="w-7 h-7 text-blue-400" />
          Currency & Language
        </h2>
        
        <div className="space-y-6">
          {/* Primary Currency */}
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-4">Primary Currency</label>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {currencies.map((currency) => (
                <button
                  key={currency.value}
                  onClick={() => updatePreference('currency', currency.value)}
                  className={`p-4 rounded-xl border-2 transition-all duration-200 text-left ${
                    preferences.currency === currency.value
                      ? 'border-blue-500 bg-blue-500/20'
                      : 'border-white/10 bg-white/5 hover:border-white/20'
                  }`}
                >
                  <div className="text-2xl mb-2">{currency.symbol}</div>
                  <div className="text-white font-medium">{currency.label}</div>
                </button>
              ))}
            </div>
          </div>

          {/* Language */}
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-4">Language</label>
            <select
              value={preferences.language}
              onChange={(e) => updatePreference('language', e.target.value)}
              className="w-full md:w-1/2 px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              {languages.map((lang) => (
                <option key={lang.value} value={lang.value} className="bg-slate-800">
                  {lang.flag} {lang.label}
                </option>
              ))}
            </select>
          </div>

          {/* Format Options */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">Date Format</label>
              <select
                value={preferences.dateFormat}
                onChange={(e) => updatePreference('dateFormat', e.target.value)}
                className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="MM/DD/YYYY" className="bg-slate-800">MM/DD/YYYY</option>
                <option value="DD/MM/YYYY" className="bg-slate-800">DD/MM/YYYY</option>
                <option value="YYYY-MM-DD" className="bg-slate-800">YYYY-MM-DD</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">First Day of Week</label>
              <select
                value={preferences.firstDayOfWeek}
                onChange={(e) => updatePreference('firstDayOfWeek', e.target.value)}
                className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="sunday" className="bg-slate-800">Sunday</option>
                <option value="monday" className="bg-slate-800">Monday</option>
              </select>
            </div>
          </div>
        </div>
      </div>

      {/* Data & Privacy */}
      <div className="bg-white/5 backdrop-blur-md rounded-2xl border border-white/10 p-6">
        <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-3">
          <EyeIcon className="w-7 h-7 text-green-400" />
          Data & Privacy
        </h2>
        
        <div className="space-y-4">
          <div className="flex items-center justify-between p-4 bg-white/5 rounded-xl">
            <div>
              <div className="text-white font-medium">Auto Backup</div>
              <div className="text-gray-400 text-sm">Automatically backup your data to Pi Network</div>
            </div>
            <label className="relative inline-flex items-center cursor-pointer">
              <input
                type="checkbox"
                checked={preferences.autoBackup}
                onChange={(e) => updatePreference('autoBackup', e.target.checked)}
                className="sr-only peer"
              />
              <div className="w-11 h-6 bg-gray-600 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-green-600"></div>
            </label>
          </div>

          <div className="flex items-center justify-between p-4 bg-white/5 rounded-xl">
            <div>
              <div className="text-white font-medium">Biometric Authentication</div>
              <div className="text-gray-400 text-sm">Use fingerprint or face recognition for quick access</div>
            </div>
            <label className="relative inline-flex items-center cursor-pointer">
              <input
                type="checkbox"
                checked={preferences.biometricAuth}
                onChange={(e) => updatePreference('biometricAuth', e.target.checked)}
                className="sr-only peer"
              />
              <div className="w-11 h-6 bg-gray-600 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-green-600"></div>
            </label>
          </div>
        </div>
      </div>

      {/* Chart Preferences */}
      <div className="bg-white/5 backdrop-blur-md rounded-2xl border border-white/10 p-6">
        <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-3">
          <ChartBarIcon className="w-7 h-7 text-yellow-400" />
          Charts & Analytics
        </h2>
        
        <div>
          <label className="block text-sm font-medium text-gray-300 mb-4">Default Chart Type</label>
          <div className="grid grid-cols-2 gap-4">
            <button
              onClick={() => updatePreference('chartType', 'line')}
              className={`p-4 rounded-xl border-2 transition-all duration-200 ${
                preferences.chartType === 'line'
                  ? 'border-yellow-500 bg-yellow-500/20'
                  : 'border-white/10 bg-white/5 hover:border-white/20'
              }`}
            >
              <div className="text-2xl mb-2">📈</div>
              <div className="text-white font-medium">Line Chart</div>
              <div className="text-gray-400 text-sm">Better for trends over time</div>
            </button>
            
            <button
              onClick={() => updatePreference('chartType', 'bar')}
              className={`p-4 rounded-xl border-2 transition-all duration-200 ${
                preferences.chartType === 'bar'
                  ? 'border-yellow-500 bg-yellow-500/20'
                  : 'border-white/10 bg-white/5 hover:border-white/20'
              }`}
            >
              <div className="text-2xl mb-2">📊</div>
              <div className="text-white font-medium">Bar Chart</div>
              <div className="text-gray-400 text-sm">Better for comparisons</div>
            </button>
          </div>
        </div>
      </div>

      {/* Save Button */}
      <div className="flex justify-end">
        <button className="px-8 py-3 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-xl font-semibold hover:from-purple-700 hover:to-pink-700 transition-all duration-300">
          Save Preferences
        </button>
      </div>
    </div>
  )
}
