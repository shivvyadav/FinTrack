import React, { useState, useRef, useEffect } from "react";
import EmojiPicker from "emoji-picker-react";
import { Image, X } from "lucide-react";

const EmojuPickerPopup = ({ icon, onSelect }) => {
  const [isOpen, setIsOpen] = useState(false);
  const popupRef = useRef(null);

  // Close on outside click
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (popupRef.current && !popupRef.current.contains(e.target)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="mb-5 flex flex-col items-start gap-4 md:flex-row">
      {/* Icon preview */}
      <div
        className="flex cursor-pointer items-center gap-4"
        onClick={() => setIsOpen(true)}
      >
        <div className="flex h-14 w-14 items-center justify-center rounded-xl border border-gray-200 bg-gray-100 shadow-sm transition-all hover:shadow">
          {icon ? (
            <img src={icon} alt="Icon" className="h-10 w-10 rounded-md" />
          ) : (
            <Image className="size-6 text-gray-400" />
          )}
        </div>

        <p className="font-medium text-gray-700 transition">
          {icon ? "Change Icon" : "Pick Icon"}
        </p>
      </div>

      {/* Emoji picker popup */}
      {isOpen && (
        <div ref={popupRef} className="relative z-50 mt-3 md:mt-0">
          {/* Close Button */}
          <button
            className="absolute -top-3 -right-3 z-10 flex h-7 w-7 cursor-pointer items-center justify-center rounded-full border border-gray-200 bg-white shadow-sm transition hover:bg-gray-100"
            onClick={() => setIsOpen(false)}
          >
            <X className="size-4 text-gray-600" />
          </button>

          {/* Picker Container */}
          <div className="overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-2xl">
            <EmojiPicker
              open={isOpen}
              skinTonesDisabled
              onEmojiClick={(emojiData) => {
                onSelect(emojiData?.imageUrl || "");
                setIsOpen(false);
              }}
              width={300}
              height={380}
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default EmojuPickerPopup;
