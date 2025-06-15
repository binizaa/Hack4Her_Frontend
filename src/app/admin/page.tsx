"use client";

import type React from "react";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Upload, X } from "lucide-react";
import { ImageIcon } from "lucide-react";

export default function AdminPage() {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [isDragging, setIsDragging] = useState(false);

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setSelectedImage(e.target?.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);

    const files = e.dataTransfer.files;
    if (files.length > 0) {
      const file = files[0];
      if (file.type.startsWith("image/")) {
        const reader = new FileReader();
        reader.onload = (e) => {
          setSelectedImage(e.target?.result as string);
        };
        reader.readAsDataURL(file);
      }
    }
  };

  const removeImage = () => {
    setSelectedImage(null);
  };

  return (
    <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold bg-gradient-to-r from-[#c31f39] to-[#F97659] bg-clip-text text-transparent mb-2">
          Gráfica de consumo de usuarios
        </h1>
        <p className="text-gray-600">
          Sube una imagen para visualizar los datos de consumo
        </p>
      </div>

      {/* Upload Area */}
      <Card className="border-2 border-dashed border-[#A4D4D8] bg-gradient-to-br from-[#A4D4D8]/5 to-[#4DB9E8]/5">
        <CardContent className="p-8">
          <div
            className={`relative w-full min-h-[400px] border-2 border-dashed rounded-xl transition-all duration-300 ${
              isDragging
                ? "border-[#c31f39] bg-[#c31f39]/10"
                : selectedImage
                ? "border-[#4DB9E8] bg-white"
                : "border-[#A4D4D8] bg-white/50 hover:border-[#4DB9E8] hover:bg-[#4DB9E8]/5"
            }`}
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
            onDrop={handleDrop}
          >
            {selectedImage ? (
              // Imagen cargada
              <div className="relative w-full h-full min-h-[400px]">
                <img
                  src={selectedImage || "/placeholder.svg"}
                  alt="Gráfica de consumo"
                  className="w-full h-full object-contain rounded-lg"
                />
                <Button
                  onClick={removeImage}
                  className="absolute top-4 right-4 w-10 h-10 rounded-full bg-[#c31f39] hover:bg-[#a01729] p-0"
                >
                  <X className="w-5 h-5" />
                </Button>
              </div>
            ) : (
              // Área de carga
              <div className="flex flex-col items-center justify-center h-full min-h-[400px] text-center p-8">
                <div className="w-20 h-20 bg-gradient-to-r from-[#4DB9E8] to-[#A4D4D8] rounded-full flex items-center justify-center mb-6">
                  <Upload className="w-10 h-10 text-white" />
                </div>

                <h3 className="text-2xl font-bold text-[#1A1926] mb-4">
                  Sube tu gráfica de consumo
                </h3>

                <p className="text-gray-600 mb-6 max-w-md">
                  Arrastra y suelta una imagen aquí, o haz clic para seleccionar
                  un archivo desde tu dispositivo
                </p>

                <div className="space-y-4">
                  <label htmlFor="image-upload">
                    <Button
                      as="span"
                      className="bg-gradient-to-r from-[#c31f39] to-[#F97659] hover:shadow-lg transition-all duration-300 cursor-pointer"
                    >
                      <ImageIcon className="w-5 h-5 mr-2" />
                      Seleccionar Imagen
                    </Button>
                  </label>

                  <input
                    id="image-upload"
                    type="file"
                    accept="image/*"
                    onChange={handleImageUpload}
                    className="hidden"
                  />

                  <p className="text-sm text-gray-500">
                    Formatos soportados: JPG, PNG, GIF (máx. 10MB)
                  </p>
                </div>

                {isDragging && (
                  <div className="absolute inset-0 bg-[#c31f39]/10 border-2 border-[#c31f39] border-dashed rounded-xl flex items-center justify-center">
                    <div className="text-center">
                      <Upload className="w-12 h-12 text-[#c31f39] mx-auto mb-2" />
                      <p className="text-[#c31f39] font-semibold">
                        Suelta la imagen aquí
                      </p>
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>

          {/* Additional Info */}
          {selectedImage && (
            <div className="mt-6 p-4 bg-gradient-to-r from-[#A4D4D8]/20 to-[#4DB9E8]/20 rounded-lg border border-[#4DB9E8]/30">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-gradient-to-r from-[#4DB9E8] to-[#A4D4D8] rounded-lg flex items-center justify-center">
                    <ImageIcon className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <p className="font-semibold text-[#1A1926]">
                      Gráfica cargada exitosamente
                    </p>
                    <p className="text-sm text-gray-600">
                      La imagen se ha subido correctamente
                    </p>
                  </div>
                </div>
                <Button
                  variant="outline"
                  onClick={removeImage}
                  className="border-[#F97659] text-[#F97659] hover:bg-[#F97659] hover:text-white"
                >
                  Cambiar Imagen
                </Button>
              </div>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Instructions */}
      <Card className="mt-6 border-2 border-[#F97659]/30 bg-gradient-to-r from-[#F97659]/5 to-[#c31f39]/5">
        <CardHeader>
          <CardTitle className="text-[#1A1926] flex items-center space-x-2">
            <div className="w-6 h-6 bg-gradient-to-r from-[#F97659] to-[#c31f39] rounded-full flex items-center justify-center">
              <span className="text-white text-xs font-bold">i</span>
            </div>
            <span>Instrucciones</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="text-center p-4 bg-white rounded-lg border border-gray-200">
              <div className="w-12 h-12 bg-gradient-to-r from-[#4DB9E8] to-[#A4D4D8] rounded-full flex items-center justify-center mx-auto mb-3">
                <span className="text-white font-bold">1</span>
              </div>
              <h3 className="font-semibold text-[#1A1926] mb-2">Selecciona</h3>
              <p className="text-sm text-gray-600">
                Elige una imagen de tu gráfica de consumo desde tu dispositivo
              </p>
            </div>

            <div className="text-center p-4 bg-white rounded-lg border border-gray-200">
              <div className="w-12 h-12 bg-gradient-to-r from-[#F97659] to-[#c31f39] rounded-full flex items-center justify-center mx-auto mb-3">
                <span className="text-white font-bold">2</span>
              </div>
              <h3 className="font-semibold text-[#1A1926] mb-2">Sube</h3>
              <p className="text-sm text-gray-600">
                Arrastra y suelta o haz clic para cargar la imagen
              </p>
            </div>

            <div className="text-center p-4 bg-white rounded-lg border border-gray-200">
              <div className="w-12 h-12 bg-gradient-to-r from-[#A4D4D8] to-[#4DB9E8] rounded-full flex items-center justify-center mx-auto mb-3">
                <span className="text-white font-bold">3</span>
              </div>
              <h3 className="font-semibold text-[#1A1926] mb-2">Visualiza</h3>
              <p className="text-sm text-gray-600">
                La gráfica se mostrará en el área de visualización
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </main>
  );
}
