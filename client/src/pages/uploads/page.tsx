import { Link } from "react-router-dom";
import { ImageUploader } from "../../components/uploads/ImageUploader";

export default function Uploads() {
  return (
    <div>
      <header className="App-header">
        <h1 className="text-2xl text-center font-bold">Image Upload System</h1>
      </header>
      <main>
        <div className="text-center my-5">
          <Link to="/">
            <button className="underline text-sky-500">Go to Uploaded Images</button>
          </Link>
        </div>
        <ImageUploader />
      </main>
    </div>
  );
}
