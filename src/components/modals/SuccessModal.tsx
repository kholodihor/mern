import Lottie from "lottie-react";
import { useTranslations } from "next-intl";
import { createPortal } from "react-dom";
import firework from "@/animations/firework.json";
import { useBodyScrollLock } from "@/hooks/useBodyScrollLock";
import CloseIcon from "@/components/icons/close-icon";

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
        <div
          onClick={handleClose}
          className="absolute right-[1rem] top-[1rem] z-[999] h-[1.5rem] w-[1.5rem] cursor-pointer"
          role="button"
          aria-label={t("modal.close")}
        >
          <CloseIcon fill="#FFFFFF" />
        </div>
        <h3 className="text-center text-3xl">{t("modal.title")}</h3>
        <p className="text-center text-xl">{t("modal.subtitle")}</p>
        <Lottie
          animationData={firework}
          className="-z-2 absolute left-0 top-0 h-full w-full"
        />
      </div>
    </div>
  );

  return <>{isModalOpen && createPortal(<ModalLayout />, document.body)}</>;
};

export default SuccessModal;
