"use client";

import { clinic } from "@/lib/content";
import { trackEvent } from "@/lib/analytics";

/** WhatsApp icon (brand glyph not in lucide). */
function WhatsAppGlyph({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 32 32" className={className} fill="currentColor" aria-hidden="true">
      <path d="M16.001 3.2c-7.06 0-12.8 5.74-12.8 12.8 0 2.257.59 4.46 1.71 6.402L3.2 28.8l6.57-1.72a12.74 12.74 0 0 0 6.23 1.62h.005c7.06 0 12.8-5.74 12.8-12.8 0-3.42-1.332-6.635-3.75-9.052A12.71 12.71 0 0 0 16.001 3.2Zm0 23.36h-.004a10.6 10.6 0 0 1-5.4-1.48l-.387-.23-4.005 1.05 1.07-3.903-.252-.4a10.56 10.56 0 0 1-1.62-5.597c0-5.866 4.776-10.64 10.65-10.64 2.844 0 5.518 1.11 7.528 3.122a10.57 10.57 0 0 1 3.116 7.527c0 5.867-4.775 10.64-10.646 10.64Zm5.84-7.968c-.32-.16-1.894-.934-2.187-1.04-.293-.107-.507-.16-.72.16-.214.32-.826 1.04-1.013 1.254-.187.213-.373.24-.693.08-.32-.16-1.35-.498-2.573-1.587-.95-.848-1.593-1.895-1.78-2.215-.187-.32-.02-.493.14-.652.144-.143.32-.373.48-.56.16-.187.213-.32.32-.533.107-.214.053-.4-.027-.56-.08-.16-.72-1.735-.986-2.376-.26-.624-.524-.54-.72-.55l-.613-.01c-.213 0-.56.08-.853.4-.293.32-1.12 1.095-1.12 2.67 0 1.575 1.146 3.097 1.306 3.31.16.214 2.256 3.445 5.466 4.83.764.33 1.36.527 1.825.674.767.244 1.464.21 2.016.127.615-.092 1.894-.774 2.16-1.522.267-.747.267-1.388.187-1.521-.08-.133-.293-.213-.613-.373Z" />
    </svg>
  );
}

export function WhatsAppFab() {
  return (
    <a
      href={clinic.whatsappUrl}
      target="_blank"
      rel="noopener noreferrer"
      onClick={() => trackEvent("whatsapp_click", { location: "fab" })}
      aria-label="Chat with us on WhatsApp"
      className="fixed bottom-5 right-5 z-50 inline-flex items-center justify-center h-14 w-14 rounded-full bg-whatsapp text-white shadow-lift hover:bg-whatsapp-dark hover:scale-105 active:scale-95 transition-transform focus-visible:outline-2 focus-visible:outline-offset-2"
    >
      <WhatsAppGlyph className="h-7 w-7" />
    </a>
  );
}
