import toast from "react-hot-toast";

export function useToast() {
  const showSuccess = (message = "Operation succeded!") => {
    toast.success(message);
  };

  const showError = (message = "Something went wrong..") => {
    toast.error(message);
  };

  return { showSuccess, showError };
}
