// components/SuccessAlert.tsx
"use client";

import { useRouter } from "next/navigation";
import { useEffect } from "react";

interface Props {
  message: string;
  visible: boolean;
  onClose: () => void;
}

const SuccessAlert = ({ message, visible, onClose }: Props) => {
  const router = useRouter();

  useEffect(() => {
    if (visible) {
      const timeout = setTimeout(() => {
        onClose();
      }, 5000); // Optional auto close in 5 sec

      return () => clearTimeout(timeout);
    }
  }, [visible, onClose]);

  const handleLinkClick = () => {
    // Open WhatsApp group in a new tab
    window.open("https://chat.whatsapp.com/Fd5GT3cqznS3PajALxXS5H?mode=r_c", "_blank");

    // Redirect current tab to "/"
    router.push("/");
  };

  if (!visible) return null;

  return (
    <div className="fixed inset-0 bg-black/70 bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-xl text-center max-w-sm w-full">
        <h2 className="text-xl font-bold text-green-600">Success</h2>
        <p className="text-gray-700 dark:text-gray-300 mt-2">{message}</p>

        {/* Link styled like a button */}
        <button
          onClick={handleLinkClick}
          className="mt-4 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 block w-full"
        >
          Join WhatsApp Group
        </button>
        <br/>
        {/* OR simple OK button */}
        <button
          className="mt-2 px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700"
          onClick={() => router.push("/")}
        >
          OK
        </button>
      </div>
    </div>
  );
};

export default SuccessAlert;

