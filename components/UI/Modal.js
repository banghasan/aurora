import ReactDOM from "react-dom";
import { useState, useEffect } from "react";
import { Card } from "./Card";

export function Modal(props) {
  const { isOpen } = props;
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isOpen) {
    return null;
  }

  const el = (
    <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity flex items-center justify-center overflow-y-hidden h-screen">
      <Card className="max-w-lg bg-white p-6">{props.children}</Card>
    </div>
  );

  return (
    isMounted &&
    ReactDOM.createPortal(el, document.getElementById("modal-portal"))
  );
}
