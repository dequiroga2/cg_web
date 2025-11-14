import { Clock, Calendar, Database, MessageSquare, AlertCircle, CheckCircle } from 'lucide-react';
import { useState, useEffect } from 'react';

function App() {
  const [showTerms, setShowTerms] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const [isRetellReady, setIsRetellReady] = useState(false);
  
  // Usamos 'any' para evitar pelear con TypeScript por el objeto window
  const [retellClient, setRetellClient] = useState<any>(null);

  useEffect(() => {
    // Revisar cada 100ms si el script del index.html ya cargó
    const t = setInterval(() => {
      if ((window as any).RetellWebClient) {
        console.log('Retell SDK loaded successfully');
        setIsRetellReady(true);
        setRetellClient(new (window as any).RetellWebClient());
        clearInterval(t);
      } else {
        console.log('Waiting for Retell SDK...');
      }
    }, 100);

    return () => clearInterval(t);
  }, []);

  const handleAcceptTerms = async () => {
    if (!isRetellReady || !retellClient) {
      alert('El SDK de Retell aún no está listo. Por favor espera un momento.');
      return;
    }
    
    setIsLoading(true);

    try {
      // 1. Pedir el token a tu backend
      const response = await fetch(
        `${import.meta.env.VITE_API_BASE_URL}/register-call`,
        {
          method: 'POST',
        }
      );


      if (!response.ok) {
        throw new Error('Failed to register call');
      }

      // 2. Obtener el access_token
      const data = await response.json();
      const accessToken = data.access_token;

      // 3. Iniciar la conversación
      await retellClient.startCall({
        accessToken: accessToken,
        sampleRate: 24000, 
      });

      // 4. Ocultar los términos
      setShowTerms(false);
      console.log('Retell conversation started');

    } catch (error: any) {
      console.error('Error starting Retell conversation:', error);
      alert('Error al inicializar el asistente. Verifica que el backend esté corriendo.');
    } finally {
      setIsLoading(false);
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
                    disabled={!isRetellReady || isLoading}
                    className={`w-full py-3 px-4 rounded-xl font-semibold text-base transition-all duration-300 transform hover:scale-105 active:scale-95 ${
                      (isRetellReady && !isLoading)
                        ? 'bg-green-600 hover:bg-green-700 text-white shadow-lg shadow-green-600/30'
                        : 'bg-gray-400 text-gray-200 cursor-not-allowed'
                    }`}
                  >
                    {isLoading ? 'Conectando...' : (isRetellReady ? 'Acepto y Continuar' : 'Cargando SDK...')}
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
                    El asistente de voz está conectado.
                  </p>
                  
                  <div className="bg-white rounded-lg p-3 border border-green-200">
                    <p className="text-slate-600 mb-1.5 text-sm font-semibold">
                      Instrucciones:
                    </p>
                    <ol className="text-left text-slate-600 space-y-1 text-xs md:text-sm">
                      <li>1. Permite el acceso al micrófono cuando se solicite</li>
                      <li>2. ¡Comienza a hablar con el asistente!</li>
                      <li>3. Cierra esta pestaña o recarga la página para finalizar la llamada.</li>
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