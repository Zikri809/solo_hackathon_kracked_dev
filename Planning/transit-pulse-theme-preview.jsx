import React, { useState, useEffect } from 'react';
import { MapPin, Bus, AlertTriangle, Heart, User, Home, Route, Bell } from 'lucide-react';

export default function TransitPulseThemePreview() {
  const [activeTab, setActiveTab] = useState('home');
  const [isMobile, setIsMobile] = useState(true);
  const [liveUpdate, setLiveUpdate] = useState(5);

  useEffect(() => {
    const timer = setInterval(() => {
      setLiveUpdate(prev => (prev === 0 ? 30 : prev - 1));
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const TransitCard = ({ route, status, eta, delay, color }) => (
    <div className="bg-white rounded-2xl shadow-lg border-4 border-gray-200 p-4 hover:border-purple-700 transition-all duration-300 hover:shadow-xl">
      <div className="flex items-start justify-between mb-3">
        <div className="flex items-center gap-2">
          <div className={`w-3 h-3 rounded-full ${status === 'live' ? 'bg-teal-500 animate-pulse' : 'bg-gray-400'}`}></div>
          <span className="text-sm font-medium text-gray-600">
            {status === 'live' ? 'LIVE' : 'SCHEDULED'}
          </span>
        </div>
        <div className={`px-3 py-1 rounded-full text-xs font-bold ${
          delay ? 'bg-orange-100 text-orange-600' : 'bg-teal-100 text-teal-600'
        }`}>
          {delay || 'On Time'}
        </div>
      </div>
      
      <div className="flex items-center gap-3 mb-3">
        <div className={`w-12 h-12 rounded-2xl flex items-center justify-center text-white font-bold text-lg`}
             style={{ backgroundColor: color }}>
          {route}
        </div>
        <div>
          <h3 className="font-bold text-gray-900 text-lg">MRT Kajang Line</h3>
          <p className="text-sm text-gray-600">To Kajang</p>
        </div>
      </div>
      
      <div className="flex items-center justify-between">
        <div className="font-mono text-2xl font-bold text-purple-700">{eta}</div>
        <button className="text-purple-700 hover:text-purple-900 transition-colors">
          <Heart className="w-5 h-5" />
        </button>
      </div>
    </div>
  );

  const AlertCard = ({ type, location, upvotes, time }) => (
    <div className="bg-white rounded-xl border-l-4 border-orange-500 p-4 shadow-md">
      <div className="flex items-start gap-3">
        <div className="w-10 h-10 bg-orange-100 rounded-lg flex items-center justify-center flex-shrink-0">
          <AlertTriangle className="w-5 h-5 text-orange-600" />
        </div>
        <div className="flex-1">
          <h4 className="font-semibold text-gray-900">{type}</h4>
          <p className="text-sm text-gray-600 mt-1">{location}</p>
          <div className="flex items-center gap-4 mt-2 text-xs text-gray-500">
            <span className="flex items-center gap-1">
              <span className="font-mono">{upvotes}</span> upvotes
            </span>
            <span>{time}</span>
          </div>
        </div>
      </div>
    </div>
  );

  const MobileNav = () => (
    <div className="fixed bottom-0 left-0 right-0 bg-white border-t-4 border-purple-700 shadow-2xl">
      <div className="flex justify-around items-center px-4 py-3 max-w-md mx-auto">
        {[
          { id: 'home', icon: Home, label: 'Home' },
          { id: 'routes', icon: Route, label: 'Routes' },
          { id: 'alerts', icon: Bell, label: 'Alerts' },
          { id: 'profile', icon: User, label: 'Profile' }
        ].map(tab => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`flex flex-col items-center gap-1 px-4 py-2 rounded-xl transition-all ${
              activeTab === tab.id 
                ? 'bg-purple-700 text-white shadow-lg scale-105' 
                : 'text-gray-600 hover:bg-gray-100'
            }`}
          >
            <tab.icon className={`w-6 h-6 ${activeTab === tab.id ? 'animate-bounce' : ''}`} />
            <span className="text-xs font-semibold">{tab.label}</span>
          </button>
        ))}
      </div>
    </div>
  );

  const DesktopNav = () => (
    <div className="w-64 bg-gradient-to-b from-purple-900 to-purple-700 text-white h-screen fixed left-0 top-0 p-6 shadow-2xl">
      <div className="mb-8">
        <h1 className="text-2xl font-bold mb-1">TransitPulse</h1>
        <p className="text-purple-200 text-sm">Malaysia Transit Utility</p>
      </div>
      
      <nav className="space-y-2">
        {[
          { id: 'home', icon: Home, label: 'Live Map' },
          { id: 'routes', icon: Route, label: 'My Routes' },
          { id: 'alerts', icon: Bell, label: 'Urban Alerts' },
          { id: 'profile', icon: User, label: 'Settings' }
        ].map(tab => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all ${
              activeTab === tab.id 
                ? 'bg-white text-purple-900 shadow-lg font-bold' 
                : 'text-purple-100 hover:bg-purple-800'
            }`}
          >
            <tab.icon className="w-5 h-5" />
            <span>{tab.label}</span>
          </button>
        ))}
      </nav>
      
      <div className="absolute bottom-6 left-6 right-6">
        <div className="bg-purple-800 rounded-xl p-4 border-2 border-purple-600">
          <div className="flex items-center gap-2 mb-2">
            <div className="w-2 h-2 bg-teal-400 rounded-full animate-pulse"></div>
            <span className="text-xs font-mono text-purple-200">Live Data</span>
          </div>
          <p className="text-xs text-purple-300">Updated {liveUpdate}s ago</p>
        </div>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      {/* Theme Switcher */}
      <div className="fixed top-4 right-4 z-50 flex gap-2">
        <button
          onClick={() => setIsMobile(true)}
          className={`px-4 py-2 rounded-full font-semibold transition-all ${
            isMobile 
              ? 'bg-purple-700 text-white shadow-lg' 
              : 'bg-white text-gray-700 border-2 border-gray-300'
          }`}
        >
          📱 Mobile
        </button>
        <button
          onClick={() => setIsMobile(false)}
          className={`px-4 py-2 rounded-full font-semibold transition-all ${
            !isMobile 
              ? 'bg-blue-700 text-white shadow-lg' 
              : 'bg-white text-gray-700 border-2 border-gray-300'
          }`}
        >
          💻 Desktop
        </button>
      </div>

      {/* Main Content */}
      <div className={`${isMobile ? '' : 'ml-64'} min-h-screen`}>
        {!isMobile && <DesktopNav />}
        
        <div className={`p-6 ${isMobile ? 'pb-24' : ''} max-w-6xl mx-auto`}>
          {/* Header */}
          <div className="mb-8">
            <div className="flex items-center gap-3 mb-2">
              <div className="w-12 h-12 bg-gradient-to-br from-purple-700 to-purple-900 rounded-2xl flex items-center justify-center">
                <Bus className="w-7 h-7 text-white" />
              </div>
              <div>
                <h1 className="text-3xl font-bold text-gray-900">TransitPulse</h1>
                <p className="text-gray-600">Transit Pulse UI Theme Preview</p>
              </div>
            </div>
          </div>

          {/* Design System Showcase */}
          <div className="bg-white rounded-3xl shadow-2xl p-8 mb-6 border-4 border-purple-200">
            <h2 className="text-2xl font-bold text-purple-900 mb-6">🎨 Transit Pulse Design System</h2>
            
            {/* Color Palette */}
            <div className="mb-8">
              <h3 className="text-lg font-bold text-gray-900 mb-4">Color Palette</h3>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {[
                  { name: 'Deep Purple', color: '#581C87', desc: 'Primary Brand' },
                  { name: 'Transit Blue', color: '#1E40AF', desc: 'Active Routes' },
                  { name: 'Electric Teal', color: '#0D9488', desc: 'Success States' },
                  { name: 'Sunset Orange', color: '#EA580C', desc: 'Warnings' },
                  { name: 'Monsoon Gray', color: '#374151', desc: 'Body Text' },
                  { name: 'Cloud White', color: '#F9FAFB', desc: 'Backgrounds' },
                  { name: 'Night Sky', color: '#111827', desc: 'Dark Mode' },
                  { name: 'Neon Highlight', color: '#FBBF24', desc: 'Interactive' }
                ].map(({ name, color, desc }) => (
                  <div key={name} className="bg-gray-50 rounded-xl p-4 border-2 border-gray-200">
                    <div 
                      className="w-full h-16 rounded-lg mb-3 shadow-md"
                      style={{ backgroundColor: color }}
                    ></div>
                    <p className="font-bold text-sm text-gray-900">{name}</p>
                    <p className="text-xs text-gray-600 font-mono mb-1">{color}</p>
                    <p className="text-xs text-gray-500">{desc}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Typography */}
            <div className="mb-8">
              <h3 className="text-lg font-bold text-gray-900 mb-4">Typography</h3>
              <div className="space-y-4 bg-gray-50 rounded-xl p-6 border-2 border-gray-200">
                <div>
                  <p className="text-4xl font-bold text-purple-900 mb-2">Where to next?</p>
                  <span className="text-xs text-gray-500">Display (36px/Bold) - Inter</span>
                </div>
                <div>
                  <p className="text-2xl font-semibold text-blue-900 mb-2">Live Departures</p>
                  <span className="text-xs text-gray-500">Heading 1 (24px/Semibold) - Inter</span>
                </div>
                <div>
                  <p className="text-lg font-semibold text-teal-900 mb-2">Pasar Seni Station</p>
                  <span className="text-xs text-gray-500">Heading 2 (18px/Semibold) - Inter</span>
                </div>
                <div>
                  <p className="text-base text-gray-700 mb-2">Real-time tracking for all lines</p>
                  <span className="text-xs text-gray-500">Body (16px/Regular) - Inter</span>
                </div>
                <div>
                  <p className="font-mono text-2xl font-bold text-purple-700 mb-2">3 min</p>
                  <span className="text-xs text-gray-500">Monospace (24px/Bold) - JetBrains Mono</span>
                </div>
              </div>
            </div>
          </div>

          {/* Live Components */}
          <div className="grid md:grid-cols-2 gap-6 mb-6">
            <div>
              <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
                <MapPin className="w-6 h-6 text-purple-700" />
                Live Transit Cards
              </h3>
              <div className="space-y-4">
                <TransitCard 
                  route="KJ" 
                  status="live" 
                  eta="3 min" 
                  color="#581C87"
                />
                <TransitCard 
                  route="AG" 
                  status="live" 
                  eta="7 min" 
                  delay="+2 min"
                  color="#1E40AF"
                />
                <TransitCard 
                  route="T401" 
                  status="scheduled" 
                  eta="15 min" 
                  color="#0D9488"
                />
              </div>
            </div>

            <div>
              <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
                <AlertTriangle className="w-6 h-6 text-orange-600" />
                Urban Alerts Feed
              </h3>
              <div className="space-y-4">
                <AlertCard 
                  type="Pothole Alert"
                  location="Jalan Ampang, 200m from KLCC"
                  upvotes={12}
                  time="5 min ago"
                />
                <AlertCard 
                  type="Broken Streetlight"
                  location="Jalan Tun Razak, near station exit"
                  upvotes={8}
                  time="1 hour ago"
                />
                <AlertCard 
                  type="Flooding Risk"
                  location="Jalan Sultan Ismail underpass"
                  upvotes={23}
                  time="3 hours ago"
                />
              </div>
            </div>
          </div>

          {/* Action Buttons Showcase */}
          <div className="bg-white rounded-2xl shadow-lg p-6 border-2 border-gray-200">
            <h3 className="text-xl font-bold text-gray-900 mb-4">Button Components</h3>
            <div className="flex flex-wrap gap-4">
              <button className="px-8 py-4 bg-purple-700 text-white rounded-full font-bold shadow-lg hover:bg-purple-800 hover:shadow-xl transform hover:scale-105 transition-all">
                Find Route
              </button>
              <button className="px-8 py-4 bg-blue-700 text-white rounded-full font-bold shadow-lg hover:bg-blue-800 hover:shadow-xl transform hover:scale-105 transition-all">
                Report Issue
              </button>
              <button className="px-8 py-4 bg-teal-600 text-white rounded-full font-bold shadow-lg hover:bg-teal-700 hover:shadow-xl transform hover:scale-105 transition-all">
                Save Favorite
              </button>
              <button className="px-8 py-4 bg-white text-gray-700 border-4 border-gray-300 rounded-full font-bold hover:border-purple-700 hover:text-purple-700 transition-all">
                Cancel
              </button>
            </div>
          </div>

          {/* Features Grid */}
          <div className="mt-8 grid md:grid-cols-3 gap-6">
            {[
              { 
                icon: '🚇', 
                title: 'Real-Time Tracking', 
                desc: 'Live vehicle positions updated every 10 seconds',
                color: 'purple'
              },
              { 
                icon: '☂️', 
                title: 'Sheltered Routes', 
                desc: 'Find covered walkways to avoid the heat',
                color: 'blue'
              },
              { 
                icon: '🚨', 
                title: 'Urban Alerts', 
                desc: 'Community-powered hazard reporting',
                color: 'orange'
              }
            ].map(feature => (
              <div key={feature.title} className={`bg-white rounded-2xl p-6 border-4 border-${feature.color}-200 shadow-lg hover:shadow-2xl transition-all hover:-translate-y-1`}>
                <div className="text-4xl mb-3">{feature.icon}</div>
                <h4 className={`text-lg font-bold text-${feature.color}-900 mb-2`}>{feature.title}</h4>
                <p className="text-gray-600 text-sm">{feature.desc}</p>
              </div>
            ))}
          </div>
        </div>

        {isMobile && <MobileNav />}
      </div>
    </div>
  );
}
