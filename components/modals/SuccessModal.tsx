import { createPortal } from "react-dom";
import { useBodyScrollLock } from "@/hooks/useBodyScrollLock";
import { useTranslations } from "next-intl";
import Lottie from "lottie-react";
import firework from "../../constants/animations/firework.json";
import CloseIcon from "@/components/icons/CloseIcon";

interface ModalProps {
  handleClose: () => void;
  isModalOpen: boolean;
}

const SuccessModal = ({ handleClose, isModalOpen }: ModalProps) => {
  const t = useTranslations("Form");

  useBodyScrollLock(isModalOpen);

  const ModalLayout = () => (
    <div className="fixed inset-0 z-[1000] flex items-center justify-center bg-black/50 ">
      <div className="relative h-[40vh] xl:h-[60vh] w-[80%] xl:w-[45%] overflow-y-auto rounded-lg bg-black text-white scrollbar-none sm:w-[90.5%] md:max-h-[95vh] md:max-w-[632px] flex-col xl:max-w-[900px] 5xl:max-w-[964px] flex justify-center  border-2 border-white items-center gap-[1rem] p-4 overflow-hidden z-[9999]">
        <div
          onClick={handleClose}
          className="absolute right-[1rem] top-[1rem] h-[1.5rem] w-[1.5rem] cursor-pointer z-[999]"
        >
          <CloseIcon fill="#FFFFFF" />
        </div>
        <h3 className="text-3xl text-center">{t("modal.title")}</h3>
        <p className="text-xl text-center">{t("modal.subtitle")}</p>
        <Lottie
          animationData={firework}
          className="w-full h-full absolute top-0 left-0 -z-2"
        />
      </div>
    </div>
  );

  return <>{isModalOpen && createPortal(<ModalLayout />, document.body)}</>;
};

export default SuccessModal;
