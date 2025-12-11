'use client';

// ============================================================
// PHONE MOCKUP COMPONENTS - Visual demos for each app
// ============================================================

export function AllAboutFoodMockup() {
  return (
    <div className="relative flex justify-center items-center py-8">
      <div className="relative w-[220px] h-[450px] bg-black rounded-[40px] p-2 shadow-2xl">
        <div className="w-full h-full bg-white rounded-[32px] overflow-hidden">
          <div className="h-14 bg-gradient-to-r from-orange-500 to-orange-600 flex items-center px-4">
            <span className="text-white font-bold text-lg">AllAboutFood</span>
          </div>
          <div className="p-4 space-y-4">
            <div className="bg-orange-50 rounded-2xl p-3">
              <p className="text-xs text-orange-800 font-medium mb-1">🎤 Voice Command</p>
              <p className="text-sm">"Hey Alexa, start cooking lasagna"</p>
            </div>
            <div className="bg-gray-50 rounded-2xl p-3">
              <p className="text-xs text-gray-600 font-medium mb-1">📋 Recipe Loaded</p>
              <p className="text-sm">Classic Lasagna - 45 mins</p>
            </div>
            <div className="bg-blue-50 rounded-2xl p-3">
              <p className="text-xs text-blue-800 font-medium mb-1">👨‍🍳 Current Step</p>
              <p className="text-sm">Layer noodles, then meat sauce...</p>
            </div>
            <div className="flex gap-2 mt-4">
              <div className="flex-1 bg-yellow-100 rounded-xl p-2 text-center">
                <span className="text-xs">← Previous</span>
              </div>
              <div className="flex-1 bg-green-100 rounded-xl p-2 text-center">
                <span className="text-xs">Next →</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export function RecyclingMockup() {
  return (
    <div className="relative flex justify-center items-center py-8">
      <div className="relative w-[220px] h-[450px] bg-black rounded-[40px] p-2 shadow-2xl">
        <div className="w-full h-full bg-white rounded-[32px] overflow-hidden flex flex-col">
          {/* App Header */}
          <header className="bg-white border-b border-gray-200 p-2.5 flex-shrink-0">
            <h1 className="text-sm font-bold flex items-center gap-1.5 text-black">
              <span className="text-green-600">♻️</span>
              Recycle Terre Haute
            </h1>
          </header>

          {/* Main Content */}
          <div className="flex-1 overflow-hidden p-2.5 bg-gray-50">
            <div className="space-y-2">
              {/* Image Preview */}
              <div className="bg-white rounded-lg p-2 border border-gray-200">
                <div className="relative h-24 bg-gradient-to-br from-blue-100 to-green-100 rounded flex items-center justify-center">
                  <div className="text-3xl">🥤</div>
                  <div className="absolute top-1.5 right-1.5 bg-green-600 text-white px-1.5 py-0.5 rounded-full text-[8px] font-bold">
                    AI: 94%
                  </div>
                </div>
              </div>

              {/* Processing Status */}
              <div className="bg-blue-50 border border-blue-400 rounded-lg p-1.5 flex items-center gap-1.5">
                <div className="flex gap-0.5">
                  <div className="w-1 h-1 bg-blue-600 rounded-full animate-pulse"></div>
                  <div className="w-1 h-1 bg-blue-600 rounded-full animate-pulse"></div>
                  <div className="w-1 h-1 bg-blue-600 rounded-full animate-pulse"></div>
                </div>
                <p className="text-[9px] font-bold text-blue-800">Google Vision API</p>
              </div>

              {/* Item Identification */}
              <div className="bg-white rounded-lg p-2 border border-gray-200">
                <p className="text-[9px] font-semibold text-gray-500 mb-0.5">IDENTIFIED</p>
                <p className="text-[11px] font-bold text-black">Plastic Bottle - PET #1</p>
              </div>

              {/* Disposal Instructions */}
              <div className="bg-green-50 border border-green-500 rounded-lg p-2">
                <div className="flex items-center gap-1 mb-1">
                  <span className="text-green-600 text-[10px]">✓</span>
                  <p className="text-[9px] font-bold text-green-800">RECYCLABLE</p>
                </div>
                <div className="space-y-0.5">
                  <p className="text-[8px] text-gray-700">• Empty and rinse</p>
                  <p className="text-[8px] text-gray-700">• Keep cap on</p>
                  <p className="text-[8px] text-gray-700">• Blue bin pickup</p>
                </div>
              </div>
            </div>
          </div>

          {/* Bottom Action Button */}
          <div className="p-2 bg-white border-t border-gray-200">
            <button className="w-full bg-green-600 text-white py-1.5 rounded-lg text-[10px] font-bold">
              📷 Scan New Item
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
