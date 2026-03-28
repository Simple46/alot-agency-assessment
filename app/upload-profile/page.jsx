'use client';

import { useState, useRef } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/context/AuthContext';
import AuthLayout from '@/components/auth/AuthLayout';
import Button from '@/components/ui/Button';
import Alert from '@/components/ui/Alert';

export default function UploadProfilePage() {
  const { user, updateProfilePicture } = useAuth();
  const router = useRouter();
  const fileInputRef = useRef(null);
  const [image, setImage] = useState(null);
  const [preview, setPreview] = useState(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const handleAddPhotoClick = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    if (!file.type.startsWith("image/")) {
      setError("Please upload an image file (JPG, PNG)");
      return;
    }
    setError("");
    const reader = new FileReader();
    reader.onloadend = () => {
      setPreview(reader.result);
      setImage(reader.result);
    };
    reader.readAsDataURL(file);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!image) {
      setError("Please select an image");
      return;
    }
    setError("");
    setLoading(true);
    try {
      await updateProfilePicture(user.email, image);
      setSuccess(true);
      setTimeout(() => {
        router.push("/dashboard");
      }, 1500);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <AuthLayout
      backLink="/dashboard"
      title="Upload profile picture"
      subtitle="We require that you use your picture"
    >
      <form
        onSubmit={handleSubmit}
        className="space-y-6 flex justify-between items-center "
      >
        {error && <Alert type="error" message={error} />}
        {success && (
          <Alert
            type="success"
            message="Profile picture updated! Redirecting..."
          />
        )}

        <div className="text-center bg-grey-50 p-5 w-xl  ">
          {preview ? (
            <img
              src={preview}
              alt="Preview"
              className=" object-cover mx-auto border-2 border-indigo-200 shadow-sm"
            />
          ) : (
            <div className="w-64 h-64  bg-gray-100 mx-auto flex items-center justify-center text-gray-400 border border-gray-200">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="w-12 h-12"
              >
                <path
                  strokeLinecap="square"
                  strokeLinejoin="square"
                  d="M15.75 6a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0ZM4.501 20.118a7.5 7.5 0 0 1 14.998 0A17.933 17.933 0 0 1 12 21.75c-2.676 0-5.216-.584-7.499-1.632Z"
                />
              </svg>
            </div>
          )}
        </div>

        <div>
          <p className="text-xl text-gray-600">
            We require that you use a professional picture. Do not upload any
            Picture that is not yours.
          </p>

          <div className="bg-gray-50">
            <p className="text-xl text-gray-800 font-bold mt-2">Recommended</p>
            <p className="text-xl font-medium text-gray-700 mb-5">
              Square JPG, PNG, at least 1,000 pixels per side.
            </p>
          </div>

          <input
            ref={fileInputRef}
            type="file"
            accept="image/jpeg,image/png"
            className="hidden"
            onChange={handleFileChange}
          />
          <div className="flex justify-between">
            <Button
              type="button"
              className="flex py-5 px-7 cursor-pointer"
              onClick={handleAddPhotoClick}
              disabled={loading}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="w-5 h-5"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M12 4.5v15m7.5-7.5h-15"
                />
              </svg>
              Add Photo
            </Button>

            <Button
              type="submit"
              loading={loading}
              className="py-5 px-7 cursor-pointer"
            >
              Continue
            </Button>
          </div>
        </div>
      </form>
    </AuthLayout>
  );
}