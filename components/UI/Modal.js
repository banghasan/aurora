import ReactDOM from "react-dom";
import { Card } from "./Card";
import { Button } from "./Button";
import { SubTitle } from "./SubTitle";

export function Modal(props) {
  const { isOpen, onClose } = props;

  if (!isOpen) {
    return null;
  }

  const el = (
    <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity flex items-center justify-center">
      <Card className="max-w-lg bg-white p-6">
        <div className="space-y-3 mb-10 items-center flex flex-col">
          <SubTitle>Wait a second!</SubTitle>
          <div className="max-w-sm flex justify-center text-center text-lg text-gray-600">
            It seems this is you're first time here, let's create your first
            user!
          </div>
        </div>
        <Button onClick={onClose} label="Let's Go!" />
      </Card>
    </div>
  );

  return ReactDOM.createPortal(el, document.getElementById("modal-portal"));
}
