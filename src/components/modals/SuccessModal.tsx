import CloseIcon from "@/components/icons/close-icon";
import { useBodyScrollLock } from "@/hooks/useBodyScrollLock";
import { useTranslations } from "next-intl";
import { createPortal } from "react-dom";
import { FaCheckCircle, FaStar } from "react-icons/fa";

interface ModalProps {
  handleClose: () => void;
  isModalOpen: boolean;
}

const SuccessModal = ({ handleClose, isModalOpen }: ModalProps) => {
  const t = useTranslations("Form");

  useBodyScrollLock(isModalOpen);

  const ModalLayout = () => (
    <div className="fixed inset-0 z-[1000] flex items-center justify-center bg-black/50">
      <div className="5xl:max-w-[964px] relative z-[9999] flex h-[40vh] w-[80%] flex-col items-center justify-center gap-[1rem] overflow-hidden overflow-y-auto rounded-lg border-2 border-white bg-black p-4 text-white scrollbar-none sm:w-[90.5%] md:max-h-[95vh] md:max-w-[632px] xl:h-[60vh] xl:w-[45%] xl:max-w-[900px]">
        <button
          type="button"
          onClick={handleClose}
          className="absolute right-[1rem] top-[1rem] z-[999] h-[1.5rem] w-[1.5rem] cursor-pointer"
          aria-label={t("modal.close")}
        >
          <CloseIcon fill="#FFFFFF" />
        </button>
        <div className="flex flex-col items-center gap-4">
          <div className="relative">
            <FaCheckCircle className="h-16 w-16 text-green-500 animate-pulse" />
            <FaStar className="absolute -top-2 -right-2 h-6 w-6 text-yellow-400 animate-spin" />
          </div>
          <h3 className="text-center text-3xl">{t("modal.title")}</h3>
          <p className="text-center text-xl">{t("modal.subtitle")}</p>
        </div>
      </div>
    </div>
  );

  return <>{isModalOpen && createPortal(<ModalLayout />, document.body)}</>;
};

export default SuccessModal;
