// src/components/SteelAdvisor.tsx

import { useEffect, useState, useRef } from 'react';
import { marked } from 'marked';
import Papa from 'papaparse';
import { Navbar } from './Navbar';
import { Helmet } from 'react-helmet';
import LoadingSpinner from './LoadingSpinner';
import { useSearchParams } from 'react-router-dom';
import { BeakerIcon, SparklesIcon, ShieldCheckIcon, AcademicCapIcon } from '@heroicons/react/24/outline';
import './SteelAdvisor.css';

const SteelAdvisor = () => {
  const [steelData, setSteelData] = useState("");
  const [messages, setMessages] = useState<{ sender: string, text: string }[]>([]);
  const [userInput, setUserInput] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [isTyping, setIsTyping] = useState(false);
  const [searchParams] = useSearchParams();

  // Track if this is the first load
  const isInitialMount = useRef(true);
  const hasAutoSent = useRef(false);

  // NEW: remember the last prefilled query we've already consumed
  const lastPrefilledQuery = useRef<string | null>(null);

  // Load CSV when component mounts
  useEffect(() => {
    Papa.parse("/steeldb.csv", {
      download: true,
      header: true,
      complete: function (results) {
        setSteelData(Papa.unparse(results.data));
        console.log("CSV loaded, rows:", results.data.length);
        setIsLoading(false);
        // Only add the welcome message on first load
        if (isInitialMount.current) {
          appendMessage("bot", "🔬 **Welcome to Metal Selector Steel Advisor!**\n\nI'm your AI-powered metallurgical expert, ready to help you select the perfect steel grade for your application. I have access to a comprehensive database of steel grades with detailed mechanical, thermal, and chemical properties.\n\n**What can I help you with today?**\n• Material selection for specific applications\n• Property comparisons between steel grades\n• Industry-specific recommendations (Aerospace, Automotive, Marine, Construction)\n• Cost-performance optimization\n• Standards compliance (ASTM, AISI, SAE)\n\nPlease describe your application requirements, and I'll provide expert recommendations!");
          isInitialMount.current = false;
        }
      },
      error: function (error) {
        console.error("Error loading CSV:", error);
        setIsLoading(false);
        appendMessage("bot", "⚠️ **Database Connection Error**\n\nI'm experiencing technical difficulties accessing the steel database. Please try again in a moment, or contact our support team if the issue persists.\n\n**Error Details:** Database connection timeout");
      }
    });
  }, []);

  // Handle pre-filled query from URL parameters (consume each value only once)
  useEffect(() => {
    const query = searchParams.get('query');
    if (query && steelData && !isLoading && lastPrefilledQuery.current !== query) {
      setUserInput(query);
      hasAutoSent.current = false; // Reset auto-send flag when query changes
      lastPrefilledQuery.current = query; // mark this value as consumed
    }
  }, [searchParams, steelData, isLoading]);

  // Auto-send pre-filled query
  useEffect(() => {
    const query = searchParams.get('query');
    if (query && userInput === query && steelData && !isLoading && messages.length === 1 && !hasAutoSent.current) {
      // Only auto-send if we have the welcome message and the query is set
      hasAutoSent.current = true;
      const timer = setTimeout(() => {
        sendMessage();
      }, 1000); // Small delay to ensure UI is ready

      return () => clearTimeout(timer);
    }
  }, [userInput, steelData, isLoading, messages.length, searchParams]);

  // Append messages (supports markdown for bot)
  const appendMessage = (sender: string, text: string) => {
    setMessages(prev => [...prev, { sender, text }]);

    // Auto-scroll to bottom when new message is added
    setTimeout(() => {
      const chatWindow = document.querySelector('.chat-window');
      if (chatWindow) {
        (chatWindow as HTMLElement).scrollTop = (chatWindow as HTMLElement).scrollHeight;
      }
    }, 100);
  };

  // Send to Gemini
  const sendMessage = async () => {
    if (!userInput.trim() || !steelData) {
      appendMessage("bot", "⚠️ **Input Validation Error**\n\nPlease ensure you've provided a valid query and that the steel database has loaded successfully. If you continue to experience issues, please refresh the page or contact our technical support team.");
      return;
    }

    const query = userInput.trim();
    appendMessage("user", query);
    setUserInput("");

    const prompt = `You are a distinguished steel selection expert with extensive knowledge in metallurgy, materials science, and industrial applications. Your advice is sought after by engineers and manufacturers worldwide.

Here is the steel database in CSV format: 
${steelData} 

Provide an authoritative, precise, and professional response that directly addresses the user's query. Your response should be visually appealing and highly readable, especially on mobile devices.

Format your response using these mobile-friendly guidelines:
- Use clear, professional headings (## for main sections, ### for subsections)
- Present key properties and applications as concise bullet points
- For mobile readability, use simplified tables with only essential columns
- Use **bold text** for critical properties, recommendations, or optimal choices
- Include a brief "Summary" section at the end highlighting the best option(s)

For mobile-optimized tables:
- Use fewer columns (max 3-4) to prevent horizontal scrolling on mobile
- If comparing multiple grades, consider multiple small tables instead of one large table
- Use consistent decimal places for numerical values
- Sort data in a logical order (e.g., by performance, strength, or suitability)

Your response should be:
- Concise and scannable on small screens
- Free of unnecessary technical jargon while maintaining professional terminology
- Formatted with adequate spacing between sections for better readability
- Optimized for quick understanding on mobile devices
Start with short answer to the user's query, followed by detailed analysis and recommendations.(Do not include any reference to mobile optimization in the response)

Your role:
1. If the user’s query is **unclear, incomplete, or ambiguous**, respond with **1–3 short, precise clarification questions** instead of giving a final recommendation.  
   - Example: “Can you tell me whether this is for high-temperature use or general structural use?”  
   - Keep questions concise and user-friendly.  

2. If the user’s query is **clear and detailed enough**, provide an authoritative, professional answer following these guidelines:
   - Use clear headings (##, ###)
   - Bullet points for key properties
   - Small, mobile-friendly tables
   - Bold important recommendations
   - End with a **Summary** section.

**User Query:** ${query}

Now decide:  
- If clarification is needed → ask questions only.  
- If the query is clear → give full steel selection advice → ask further questions to keep conversation interactive and insightful.

Provide a comprehensive, authoritative response that demonstrates your expertise and helps the user make an informed material selection decision.`;

    try {
      setIsLoading(true);
      setIsTyping(true);

      // Show typing indicator
      const typingMessageId = Date.now().toString();
      appendMessage("bot-typing", "🔬 Analyzing steel data and consulting industry standards...");

      const response = await fetch("https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=AIzaSyDePZwuwO2S9lD_A6ITUFp-0mOjaTyA1LE", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          contents: [{ parts: [{ text: prompt }] }]
        })
      });

      const data = await response.json();
      const reply = data?.candidates?.[0]?.content?.parts?.[0]?.text || "I apologize, but I'm experiencing technical difficulties processing your request. Please try again or contact our support team for assistance.";

      // Remove typing indicator and add actual response
      setMessages(prev => prev.filter(msg => msg.sender !== "bot-typing"));
      appendMessage("bot", reply);
    } catch (err) {
      console.error(err);
      // Remove typing indicator in case of error
      setMessages(prev => prev.filter(msg => msg.sender !== "bot-typing"));
      appendMessage("bot", "⚠️ **Technical Error**\n\nI'm experiencing a connection issue with the AI processing service. This may be due to:\n\n• Network connectivity issues\n• High server load\n• Temporary service maintenance\n\n**Recommended Actions:**\n1. Check your internet connection\n2. Wait a few moments and try again\n3. Contact our technical support if the issue persists\n\n**Error Code:** AI_SERVICE_TIMEOUT");
    } finally {
      setIsLoading(false);
      setIsTyping(false);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 text-white flex flex-col">
      <Helmet>
        <title>Steel Advisor  - AI-Powered Metallurgical Expert | Metal Selector</title>
        <meta name="description" content="Get expert metallurgical advice from our AI-powered Steel Advisor. Professional steel selection for aerospace, automotive, marine, and construction applications." />

        {/* Open Graph / Social Media - Specific for Steel Advisor */}
        <meta property="og:title" content="Steel Advisor  - AI-Powered Metallurgical Expert" />
        <meta property="og:description" content="Professional metallurgical consultation with AI-powered steel selection for critical engineering applications." />
        <meta property="og:type" content="website" />
        <meta property="og:image" content="/pwa-icons/icon-512x512.svg" />
        <meta property="og:url" content="https://metal-selector.com/steel-advisor" />

        {/* Twitter Card - Specific for Steel Advisor */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Steel Advisor  - AI-Powered Metallurgical Expert" />
        <meta name="twitter:description" content="Professional metallurgical consultation with AI-powered steel selection for critical engineering applications." />
        <meta name="twitter:image" content="/pwa-icons/icon-512x512.svg" />
      </Helmet>

      <Navbar />
      <div className="flex-1 flex items-center justify-center p-2 sm:p-4 pt-24 lg:pt-28">
        <div className="w-full max-w-4xl bg-slate-800/50 shadow-2xl rounded-2xl p-4 sm:p-6 flex flex-col border border-slate-700">
          {/* Enhanced Header */}
          <div className="text-center mb-6">
            <div className="flex items-center justify-center space-x-3 mb-3">
              <div className="relative">
                <BeakerIcon className="h-8 w-8 text-cyan-400" />
                <div className="absolute -top-1 -right-1 w-3 h-3 bg-green-400 rounded-full animate-ping"></div>
              </div>
              <h1 className="text-2xl sm:text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-500">
                Steel Advisor 
              </h1>
              <SparklesIcon className="h-6 w-6 text-purple-400 animate-pulse" />
            </div>

            <p className="text-sm text-slate-300 mb-2">
              AI-Powered Metallurgical Expert • Professional Grade Recommendations
            </p>

            {searchParams.get('query') && (
              <div className="inline-flex items-center space-x-2 bg-cyan-500/20 px-3 py-1 rounded-full border border-cyan-400/30">
                <ShieldCheckIcon className="h-4 w-4 text-cyan-400" />
                <span className="text-xs text-cyan-300 font-medium">
                  Processing your query...
                </span>
              </div>
            )}
          </div>

          {/* Enhanced Chat window */}
          <div className="chat-window flex-1 overflow-y-auto border border-slate-700 rounded-xl p-4 sm:p-6 space-y-4 bg-slate-900/50 h-[calc(100vh-320px)] sm:h-[600px]">
            {isLoading && messages.length === 0 ? (
              <div className="text-slate-400 text-sm flex justify-center items-center h-full">
                <div className="flex flex-col items-center space-y-3">
                  <LoadingSpinner size="large" color="#38BDF8" />
                  <div className="text-center">
                    <div className="font-medium mb-1">Loading Steel Database</div>
                    <div className="text-xs text-slate-500">Accessing comprehensive material properties...</div>
                  </div>
                </div>
              </div>
            ) : (
              messages.map((msg, index) => (
                <div key={index} className={`${msg.sender === "user" ? "text-right" : "text-left"} mb-4`}>
                  {msg.sender === "user" ? (
                    <div className="inline-flex items-center space-x-2">
                      <div className="inline-block px-4 py-3 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 text-white max-w-[85%] break-words shadow-lg">
                        <div className="flex items-center space-x-2 mb-1">
                          <AcademicCapIcon className="h-4 w-4 text-cyan-200" />
                          <span className="text-xs font-medium text-cyan-100">Engineer Query</span>
                        </div>
                        {msg.text}
                      </div>
                    </div>
                  ) : msg.sender === "bot-typing" ? (
                    <div className="inline-flex items-center px-4 py-3 rounded-xl bg-slate-700 border border-slate-600 text-slate-300 shadow-lg">
                      <span className="mr-3">{msg.text}</span>
                      <div className="flex space-x-1">
                        <span className="w-2 h-2 bg-cyan-400 rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></span>
                        <span className="w-2 h-2 bg-cyan-400 rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></span>
                        <span className="w-2 h-2 bg-cyan-400 rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></span>
                      </div>
                    </div>
                  ) : (
                    <div className="inline-flex items-start space-x-3 max-w-[95%] sm:max-w-[90%]">
                      <div className="flex-shrink-0 w-8 h-8 bg-gradient-to-r from-cyan-500 to-blue-600 rounded-full flex items-center justify-center shadow-lg">
                        <BeakerIcon className="h-4 w-4 text-white" />
                      </div>
                      <div
                        className="px-4 py-3 rounded-xl bg-slate-700 border border-slate-600 prose prose-sm max-w-none prose-invert overflow-x-auto shadow-lg"
                        dangerouslySetInnerHTML={{
                          __html: marked.parse(msg.text)
                        }}
                      />
                    </div>
                  )}
                </div>
              ))
            )}
          </div>

          {/* Enhanced Input */}
          <div className="mt-6 flex space-x-3">
            <div className="flex-1 relative">
              <input
                value={userInput}
                onChange={(e) => setUserInput(e.target.value)}
                onKeyDown={handleKeyPress}
                type="text"
                placeholder="Describe your application requirements, material needs, or ask about specific steel grades..."
                className="w-full border border-slate-600 bg-slate-700 rounded-l-xl px-4 py-4 focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-transparent text-white placeholder-slate-400 transition-all duration-200"
                aria-label="Ask the Steel Advisor about material selection"
              />
              <div className="absolute right-3 top-1/2 transform -translate-y-1/2 text-xs text-slate-500">
                Press Enter to send
              </div>
            </div>
            <button
              onClick={sendMessage}
              disabled={isLoading || !steelData || !userInput.trim()}
              className="bg-gradient-to-r from-cyan-400 to-blue-500 hover:from-cyan-500 hover:to-blue-600 disabled:from-slate-600 disabled:to-slate-700 text-white px-6 py-4 rounded-r-xl transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center min-w-[100px] shadow-lg hover:shadow-cyan-400/30 transform hover:scale-105 disabled:hover:scale-100"
              aria-label="Send message to Steel Advisor"
            >
              {isLoading ? (
                <LoadingSpinner size="small" />
              ) : (
                <span className="flex items-center space-x-2">
                  <SparklesIcon className="h-5 w-5" />
                  <span className="font-medium">Send</span>
                </span>
              )}
            </button>
          </div>

          {/* Footer Info */}
          <div className="mt-4 text-center text-xs text-slate-500">
            <span className="flex items-center justify-center space-x-2">
              <ShieldCheckIcon className="h-3 w-3" />
              <span>Professional Grade AI • Industry Standards Compliant • 24/7 Expert Support</span>
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SteelAdvisor;
