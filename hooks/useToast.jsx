import { useState } from "react";

export default function useToast() {
  const [toastData, setToastData] = useState({
    toggled: false,
    text: "",
    type: "",
  });

  return [toastData, setToastData];
}
