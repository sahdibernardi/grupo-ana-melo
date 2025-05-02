"use client";

import { useState } from "react";
import Image from "next/image";

const images = [
  "/Grupo1.jpg",
  "/Grupo2.jpg",
  "/Grupo4.jpg",
];

export default function ImageGallery() {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  return (
    <section className="w-full py-12 bg-white">
      <div className="max-w-6xl mx-auto px-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 justify-items-center">
          {images.map((src, index) => (
            <div key={index} className="cursor-pointer w-full">
              <Image
                src={src}
                alt={`Imagem ${index + 1}`}
                width={500}
                height={300}
                className="rounded-xl object-cover w-full h-auto hover:opacity-80 transition"
                onClick={() => setSelectedImage(src)}
              />
            </div>
          ))}
        </div>
      </div>

      {selectedImage && (
        <div
          className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-50"
          onClick={() => setSelectedImage(null)}
        >
          <div className="max-w-4xl w-full px-4">
            <Image
              src={selectedImage}
              alt="Imagem ampliada"
              width={1000}
              height={600}
              className="rounded-xl w-full h-auto"
            />
          </div>
        </div>
      )}
    </section>
  );
}
