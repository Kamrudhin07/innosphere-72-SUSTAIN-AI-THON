import React, { useState, useRef, useEffect } from 'react';
import { 
  Thermometer, 
  Droplets, 
  Sprout, 
  LineChart,
  Leaf,
  AlertCircle,
  MessageSquare,
  Mic,
  MicOff,
  X,
  Send,
  Globe2
} from 'lucide-react';
import { translations, type Language } from './translations';

function App() {
  const [language, setLanguage] = useState<Language>('en');
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [messages, setMessages] = useState<Array<{ text: string; isUser: boolean }>>([
    { text: "Hello! I'm your agriculture assistant. How can I help you today?", isUser: false }
  ]);
  const [newMessage, setNewMessage] = useState('');
  const [isListening, setIsListening] = useState(false);
  const chatContainerRef = useRef<HTMLDivElement>(null);

  const t = translations[language];

  // Static data for demonstration
  const environmentalData = {
    temperature: "28°C",
    humidity: "65%",
    soilMoisture: "45%",
    npk: {
      nitrogen: "45 mg/kg",
      phosphorus: "32 mg/kg",
      potassium: "28 mg/kg"
    }
  };

  const cropRecommendations = [
    {
      name: "Tomatoes",
      confidence: "95%",
      reason: "Optimal soil conditions and temperature"
    },
    {
      name: "Bell Peppers",
      confidence: "88%",
      reason: "Good NPK levels for growth"
    },
    {
      name: "Lettuce",
      confidence: "82%",
      reason: "Suitable humidity levels"
    }
  ];

  useEffect(() => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
    }
  }, [messages]);

  const handleSendMessage = () => {
    if (newMessage.trim()) {
      setMessages([...messages, { text: newMessage, isUser: true }]);
      setTimeout(() => {
        setMessages(prev => [...prev, {
          text: "I understand you're asking about " + newMessage + ". Let me help you with that.",
          isUser: false
        }]);
      }, 1000);
      setNewMessage('');
    }
  };

  const startListening = () => {
    if ('webkitSpeechRecognition' in window) {
      const recognition = new (window as any).webkitSpeechRecognition();
      recognition.continuous = false;
      recognition.interimResults = false;

      // Set language for speech recognition
      const langMap: Record<Language, string> = {
        en: 'en-US',
        es: 'es-ES',
        hi: 'hi-IN',
        ta: 'ta-IN',
        ml: 'ml-IN',
        te: 'te-IN',
        kn: 'kn-IN'
      };
      recognition.lang = langMap[language];

      recognition.onstart = () => {
        setIsListening(true);
      };

      recognition.onresult = (event: any) => {
        const transcript = event.results[0][0].transcript;
        setNewMessage(transcript);
        setIsListening(false);
      };

      recognition.onerror = () => {
        setIsListening(false);
      };

      recognition.onend = () => {
        setIsListening(false);
      };

      recognition.start();
    } else {
      alert('Voice recognition is not supported in your browser.');
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-green-600 text-white p-6">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Sprout className="h-8 w-8" />
            <h1 className="text-2xl font-bold">{t.title}</h1>
          </div>
          <div className="flex items-center gap-2">
            <Globe2 className="h-5 w-5" />
            <select
              value={language}
              onChange={(e) => setLanguage(e.target.value as Language)}
              className="bg-green-700 text-white border-none rounded px-2 py-1 focus:ring-2 focus:ring-white"
            >
              <option value="en">English</option>
              <option value="es">Español</option>
              <option value="hi">हिंदी</option>
              <option value="ta">தமிழ்</option>
              <option value="ml">മലയാളം</option>
              <option value="te">తెలుగు</option>
              <option value="kn">ಕನ್ನಡ</option>
            </select>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto p-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* Environmental Metrics */}
          <div className="bg-white rounded-xl shadow-md p-6">
            <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
              <LineChart className="h-5 w-5 text-green-600" />
              {t.environmentalMetrics}
            </h2>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Thermometer className="h-5 w-5 text-red-500" />
                  <span>{t.temperature}</span>
                </div>
                <span className="font-semibold">{environmentalData.temperature}</span>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Droplets className="h-5 w-5 text-blue-500" />
                  <span>{t.humidity}</span>
                </div>
                <span className="font-semibold">{environmentalData.humidity}</span>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Sprout className="h-5 w-5 text-green-500" />
                  <span>{t.soilMoisture}</span>
                </div>
                <span className="font-semibold">{environmentalData.soilMoisture}</span>
              </div>
            </div>
          </div>

          {/* NPK Values */}
          <div className="bg-white rounded-xl shadow-md p-6">
            <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
              <Leaf className="h-5 w-5 text-green-600" />
              {t.npkValues}
            </h2>
            <div className="space-y-4">
              <div className="p-3 bg-gray-50 rounded-lg">
                <div className="font-semibold text-gray-700">{t.nitrogen}</div>
                <div className="text-lg">{environmentalData.npk.nitrogen}</div>
              </div>
              <div className="p-3 bg-gray-50 rounded-lg">
                <div className="font-semibold text-gray-700">{t.phosphorus}</div>
                <div className="text-lg">{environmentalData.npk.phosphorus}</div>
              </div>
              <div className="p-3 bg-gray-50 rounded-lg">
                <div className="font-semibold text-gray-700">{t.potassium}</div>
                <div className="text-lg">{environmentalData.npk.potassium}</div>
              </div>
            </div>
          </div>

          {/* Crop Recommendations */}
          <div className="bg-white rounded-xl shadow-md p-6">
            <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
              <AlertCircle className="h-5 w-5 text-green-600" />
              {t.recommendedCrops}
            </h2>
            <div className="space-y-4">
              {cropRecommendations.map((crop, index) => (
                <div key={index} className="p-3 bg-gray-50 rounded-lg">
                  <div className="flex justify-between items-center mb-1">
                    <span className="font-semibold text-gray-700">{crop.name}</span>
                    <span className="text-green-600 font-medium">{crop.confidence}</span>
                  </div>
                  <p className="text-sm text-gray-600">{crop.reason}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Current Crops Gallery */}
          <div className="md:col-span-2 lg:col-span-3">
            <h2 className="text-xl font-semibold mb-4">{t.currentCrops}</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="rounded-lg overflow-hidden shadow-md">
                <img 
                  src="https://images.unsplash.com/photo-1601493700631-2b16ec4b4716?auto=format&fit=crop&w=800&q=80"
                  alt="Tomato plants"
                  className="w-full h-48 object-cover"
                />
                <div className="p-4 bg-white">
                  <h3 className="font-semibold">Tomatoes</h3>
                  <p className="text-sm text-gray-600">{t.growthStage}: {t.flowering}</p>
                </div>
              </div>
              <div className="rounded-lg overflow-hidden shadow-md">
                <img 
                  src="https://images.unsplash.com/photo-1595855759920-86582396756c?auto=format&fit=crop&w=800&q=80"
                  alt="Bell peppers"
                  className="w-full h-48 object-cover"
                />
                <div className="p-4 bg-white">
                  <h3 className="font-semibold">Bell Peppers</h3>
                  <p className="text-sm text-gray-600">{t.growthStage}: {t.earlyFruiting}</p>
                </div>
              </div>
              <div className="rounded-lg overflow-hidden shadow-md">
                <img 
                  src="https://images.unsplash.com/photo-1622206151226-18ca2c9ab4a1?auto=format&fit=crop&w=800&q=80"
                  alt="Lettuce"
                  className="w-full h-48 object-cover"
                />
                <div className="p-4 bg-white">
                  <h3 className="font-semibold">Lettuce</h3>
                  <p className="text-sm text-gray-600">{t.growthStage}: {t.mature}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* Chat Button */}
      <button
        onClick={() => setIsChatOpen(true)}
        className="fixed bottom-6 right-6 bg-green-600 text-white p-4 rounded-full shadow-lg hover:bg-green-700 transition-colors"
      >
        <MessageSquare className="h-6 w-6" />
      </button>

      {/* Chat Interface */}
      {isChatOpen && (
        <div className="fixed bottom-24 right-6 w-96 bg-white rounded-lg shadow-xl">
          {/* Chat Header */}
          <div className="flex items-center justify-between p-4 border-b">
            <h3 className="font-semibold">{t.chatTitle}</h3>
            <button
              onClick={() => setIsChatOpen(false)}
              className="text-gray-500 hover:text-gray-700"
            >
              <X className="h-5 w-5" />
            </button>
          </div>

          {/* Chat Messages */}
          <div 
            ref={chatContainerRef}
            className="h-96 overflow-y-auto p-4 space-y-4"
          >
            {messages.map((message, index) => (
              <div
                key={index}
                className={`flex ${message.isUser ? 'justify-end' : 'justify-start'}`}
              >
                <div
                  className={`max-w-[80%] p-3 rounded-lg ${
                    message.isUser
                      ? 'bg-green-600 text-white'
                      : 'bg-gray-100 text-gray-800'
                  }`}
                >
                  {message.text}
                </div>
              </div>
            ))}
          </div>

          {/* Chat Input */}
          <div className="p-4 border-t">
            <div className="flex items-center gap-2">
              <input
                type="text"
                value={newMessage}
                onChange={(e) => setNewMessage(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                placeholder={t.chatPlaceholder}
                className="flex-1 p-2 border rounded-lg focus:outline-none focus:border-green-600"
              />
              <button
                onClick={startListening}
                className={`p-2 rounded-lg ${
                  isListening
                    ? 'bg-red-500 text-white'
                    : 'bg-gray-100 text-gray-600'
                } hover:bg-opacity-90`}
              >
                {isListening ? <MicOff className="h-5 w-5" /> : <Mic className="h-5 w-5" />}
              </button>
              <button
                onClick={handleSendMessage}
                className="p-2 bg-green-600 text-white rounded-lg hover:bg-green-700"
              >
                <Send className="h-5 w-5" />
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;