import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

export default function Home() {
  const [images, setImages] = useState<string[]>([]);

  useEffect(() => {
    const fetchImages = async () => {
      try {
        const response = await fetch("http://localhost:5000/api/uploads");
        if (response.ok) {
          const data = await response.json();
          setImages(data);
        } else {
          console.error("Failed to fetch images");
        }
      } catch (error) {
        console.error("Error fetching images:", error);
      }
    };

    fetchImages();
  }, []);
  return (
    <div>
      <header className="App-header">
        <h1 className="text-2xl text-center font-bold">Uploaded Images</h1>
      </header>
      <main>
        <div className="text-center my-5">
          <Link to="/uploads">
            <button className="underline text-sky-500">Go to Uploads</button>
          </Link>
        </div>
        <div className="container mx-auto px-4 py-8">
          <h1 className="text-3xl text-center font-bold mb-4">Image Gallery</h1>
          {images.length === 0 && (
            <p className="text-center font-bold text-xs text-red-500">No images were uploaded</p>
          )}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {images.map((image, index) => (
              <div key={index} className="bg-gray-200 p-4 rounded-md h-fit">
                <img src={image} alt={`Image ${index}`} className="w-full h-fit rounded-md" />
              </div>
            ))}
          </div>
        </div>
      </main>
    </div>
  );
}
