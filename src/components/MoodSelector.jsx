import React from "react";
import { moodGenres } from "../../src/api/tmbd";


const MoodSelector = ({ onSelectMood }) => {
  return (
    <div className="flex flex-wrap justify-center gap-4 my-6">
      {Object.keys(moodGenres).map((emoji) => (
        <button
          key={emoji}
          onClick={() => onSelectMood(emoji)}
          className="text-3xl bg-white/10 text-white rounded-full w-16 h-16 flex items-center justify-center hover:bg-white/20 transition"
        >
          {emoji}
        </button>
      ))}
    </div>
  );
};

export default MoodSelector;
