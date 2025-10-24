import { Clock, Calendar, Database, MessageSquare, AlertCircle, CheckCircle } from 'lucide-react';
import { useState, useEffect } from 'react';

function App() {
  const [showTerms, setShowTerms] = useState(true);
  const [isVapiReady, setIsVapiReady] = useState(false);
  const [vapiInitialized, setVapiInitialized] = useState(false);

  // Vapi Configuration
  const VAPI_CONFIG = {
    apiKey: "ab881e10-c04f-4589-813f-ad14c3867be8",
    assistant: "a0a24277-c280-4810-8624-ce1c59a0fc7b",
    config: {
      position: "bottom-right",
      offset: "40px",
      width: "60px",
      height: "60px"
    }
  };

  useEffect(() => {
    // Agregar clase para ocultar el botón de Vapi inicialmente
    document.body.classList.add('vapi-hidden');

    // Wait for Vapi SDK to load
    const checkVapiReady = setInterval(() => {
      if (window.vapiSDK) {
        console.log('Vapi SDK loaded successfully');
        setIsVapiReady(true);
        clearInterval(checkVapiReady);
      }
    }, 100);

    return () => {
      clearInterval(checkVapiReady);
      document.body.classList.remove('vapi-hidden');
    };
  }, []);

  const handleAcceptTerms = () => {
    if (!isVapiReady) {
      alert('El SDK de Vapi aún no está listo. Por favor espera un momento.');
      return;
    }

    try {
      // Inicializar Vapi
      window.vapiSDK?.run(VAPI_CONFIG);
      setVapiInitialized(true);
      
      // Remover la clase que oculta el botón de Vapi
      document.body.classList.remove('vapi-hidden');
      
      // Ocultar los términos
      setShowTerms(false);
      
      console.log('Vapi initialized successfully');
    } catch (error) {
      console.error('Error initializing Vapi:', error);
      alert('Error al inicializar el asistente. Por favor recarga la página.');
    }
  };

  const features = [
    {
      icon: Clock,
      title: 'Disponibilidad 24/7',
      description: 'Responde llamadas automáticamente en cualquier momento'
    },
    {
      icon: Database,
      title: 'Llamadas automatizadas',
      description: 'Llama a clientes desde tu base de datos'
    },
    {
      icon: Calendar,
      title: 'Agenda citas',
      description: 'Integración con Google Calendar y CRM'
    },
    {
      icon: MessageSquare,
      title: 'Notificaciones',
      description: 'Envía información a Slack u otros canales'
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 flex items-center justify-center p-3">
      <div className="max-w-5xl w-full">
        <div className="bg-white rounded-2xl shadow-2xl p-4 md:p-6">
          <div className="text-center mb-4">
            <h1 className="text-2xl md:text-3xl font-bold text-slate-900 mb-1">Agente de IA</h1>
            <p className="text-sm md:text-base text-slate-600">Asistente de voz inteligente para tu negocio</p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-4">
            {features.map((feature, index) => (
              <div key={index} className="bg-slate-50 rounded-xl p-3 hover:bg-slate-100 transition-colors">
                <div className="flex flex-col items-center text-center space-y-1">
                  <div className="bg-blue-100 rounded-lg p-2">
                    <feature.icon className="w-4 h-4 text-blue-600" />
                  </div>
                  <h3 className="font-semibold text-slate-900 text-xs">{feature.title}</h3>
                  <p className="text-xs text-slate-600 hidden md:block">{feature.description}</p>
                </div>
              </div>
            ))}
          </div>

          <div className="border-t border-slate-200 pt-4">
            {showTerms ? (
              <div className="max-w-3xl mx-auto">
                <div className="bg-amber-50 border-2 border-amber-200 rounded-xl p-4">
                  <div className="flex items-center justify-center mb-3">
                    <div className="bg-amber-100 rounded-full p-2">
                      <AlertCircle className="w-8 h-8 text-amber-600" />
                    </div>
                  </div>
                  
                  <h2 className="text-lg md:text-xl font-bold text-slate-900 text-center mb-3">
                    Términos y Condiciones de Prueba
                  </h2>
                  
                  <div className="space-y-2 text-slate-700 mb-4">
                    <p className="text-center text-sm">
                      <strong>Importante:</strong> Esta es una demostración del asistente de voz con IA.
                    </p>
                    
                    <ul className="space-y-1.5 text-xs md:text-sm">
                      <li className="flex items-start">
                        <CheckCircle className="w-4 h-4 text-green-600 mr-1.5 mt-0.5 flex-shrink-0" />
                        <span>Esta llamada está siendo monitoreada con fines de prueba y mejora del servicio.</span>
                      </li>
                      <li className="flex items-start">
                        <CheckCircle className="w-4 h-4 text-green-600 mr-1.5 mt-0.5 flex-shrink-0" />
                        <span>Se requiere acceso al micrófono para interactuar con el asistente de voz.</span>
                      </li>
                      <li className="flex items-start">
                        <CheckCircle className="w-4 h-4 text-green-600 mr-1.5 mt-0.5 flex-shrink-0" />
                        <span>Los datos pueden ser almacenados para análisis y entrenamiento del modelo.</span>
                      </li>
                      <li className="flex items-start">
                        <CheckCircle className="w-4 h-4 text-green-600 mr-1.5 mt-0.5 flex-shrink-0" />
                        <span>Esta es solo una prueba de demostración y no constituye un servicio comercial.</span>
                      </li>
                      <li className="flex items-start">
                        <CheckCircle className="w-4 h-4 text-green-600 mr-1.5 mt-0.5 flex-shrink-0" />
                        <span>Al continuar, aceptas estos términos y condiciones de uso.</span>
                      </li>
                    </ul>
                  </div>

                  <button
                    onClick={handleAcceptTerms}
                    disabled={!isVapiReady}
                    className={`w-full py-3 px-4 rounded-xl font-semibold text-base transition-all duration-300 transform hover:scale-105 active:scale-95 ${
                      isVapiReady
                        ? 'bg-green-600 hover:bg-green-700 text-white shadow-lg shadow-green-600/30'
                        : 'bg-gray-400 text-gray-200 cursor-not-allowed'
                    }`}
                  >
                    {isVapiReady ? 'Acepto y Continuar' : 'Cargando...'}
                  </button>
                  
                  <p className="text-xs text-slate-500 text-center mt-2">
                    Al hacer clic confirmas que has leído y aceptado los términos.
                  </p>
                </div>
              </div>
            ) : (
              <div className="max-w-3xl mx-auto text-center">
                <div className="bg-green-50 border-2 border-green-200 rounded-xl p-4">
                  <div className="flex items-center justify-center mb-3">
                    <div className="bg-green-100 rounded-full p-2">
                      <CheckCircle className="w-8 h-8 text-green-600" />
                    </div>
                  </div>
                  
                  <h2 className="text-lg md:text-xl font-bold text-slate-900 mb-2">
                    ¡Asistente Activado!
                  </h2>
                  
                  <p className="text-sm md:text-base text-slate-700 mb-3">
                    El botón del asistente de voz está disponible en la esquina inferior derecha.
                  </p>
                  
                  <div className="bg-white rounded-lg p-3 border border-green-200">
                    <p className="text-slate-600 mb-1.5 text-sm font-semibold">
                      Instrucciones:
                    </p>
                    <ol className="text-left text-slate-600 space-y-1 text-xs md:text-sm">
                      <li>1. Busca el botón flotante en la esquina inferior derecha</li>
                      <li>2. Haz clic en el botón para iniciar la conversación</li>
                      <li>3. Permite el acceso al micrófono cuando se solicite</li>
                      <li>4. ¡Comienza a hablar con el asistente!</li>
                    </ol>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
