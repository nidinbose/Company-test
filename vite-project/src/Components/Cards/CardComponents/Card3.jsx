import React, { useState } from "react";

const Card3 = () => {
  const [seoTitle, setSeoTitle] = useState("");
  const [seoKeywords, setSeoKeywords] = useState("");
  const [seoDescription, setSeoDescription] = useState("");
  const [ogImage, setOgImage] = useState(null);

  const handleImageChange = (e) => {
    setOgImage(e.target.files[0]);
  };

  return (
    <div className="min-h-screen bg-white p-6">
      <h2 className="text-2xl font-semibold mb-6">SEO details</h2>

      <div className="space-y-6">
        {/* SEO Title */}
        <div>
          <label className="block font-medium mb-1">
            SEO Title<span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            value={seoTitle}
            onChange={(e) => setSeoTitle(e.target.value)}
            placeholder="Placeholder"
            className="w-full border border-gray-300 p-2 rounded-md"
          />
        </div>

        {/* SEO Keywords */}
        <div>
          <label className="block font-medium mb-1">
            SEO Keywords<span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            value={seoKeywords}
            onChange={(e) => setSeoKeywords(e.target.value)}
            placeholder="Placeholder"
            className="w-full border border-gray-300 p-2 rounded-md"
          />
        </div>

        {/* SEO Description (Plain Textarea) */}
        <div>
          <label className="block font-medium mb-1">
            SEO Description<span className="text-red-500">*</span>
          </label>
          <textarea
            value={seoDescription}
            onChange={(e) => setSeoDescription(e.target.value)}
            placeholder="Write SEO description here..."
            rows="6"
            className="w-full border border-gray-300 p-2 rounded-md resize-none"
          ></textarea>
        </div>

        {/* OG Image Upload */}
        <div>
          <label className="block font-medium mb-2">
            SEO OG image<span className="text-red-500">*</span>
          </label>
          <label className="flex flex-col items-center w-80 justify-center h-40 p-4 border-2 border-dashed border-blue-400 rounded-md cursor-pointer hover:bg-blue-50 transition">
            <input
              type="file"
              accept="image/png, image/jpeg, image/gif"
              onChange={handleImageChange}
              className="hidden"
            />
            <div className="text-center text-blue-600">
              <div className="text-2xl mb-1">📤</div>
              <p className="font-medium">
                Drag & Drop or <span className="text-blue-700 underline">Choose</span> to Upload
              </p>
              <p className="text-xs text-gray-500">
                Image size should be 310x180 px. Max 500KB. JPG, PNG, or GIF.
              </p>
            </div>
          </label>
          {ogImage && (
            <p className="text-sm mt-2 text-green-600">
              Selected: {ogImage.name}
            </p>
          )}
        </div>

        {/* Buttons */}
        <div className="flex justify-end gap-4 mt-6">
          <button className="bg-teal-500 text-white px-6 py-2 rounded-md hover:bg-teal-600">
            Previous
          </button>
          <button className="bg-blue-500 text-white px-6 py-2 rounded-md hover:bg-blue-600">
            Next
          </button>
        </div>
      </div>
    </div>
  );
};

export default Card3;
