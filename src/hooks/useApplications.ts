import { useState } from "react";
import { collection, deleteDoc, doc, onSnapshot } from "firebase/firestore";
import { db } from "@/lib/firebase";
import { IApplicationResponse } from "@/types";

export const useApplications = () => {
  const [applications, setApplications] = useState<IApplicationResponse[]>([]);

  const fetchApplications = () => {
    const applicationsRef = collection(db, "applications");
    const unsubscribe = onSnapshot(applicationsRef, (snapshot) => {
      if (!snapshot.empty) {
        const applicationsData: IApplicationResponse[] = [];
        snapshot.forEach((doc) => {
          applicationsData.push({ ...doc.data(), id: doc.id } as IApplicationResponse);
        });
        setApplications(applicationsData);
      }
    });

    return unsubscribe;
  };

  const deleteApplication = async (id: string) => {
    if (confirm("Ви впевнені, що хочете видалити цю заявку?")) {
      try {
        const itemRef = doc(db, "applications", id);
        await deleteDoc(itemRef);
        alert("Заявку успішно видалено!");
        window.location.reload();
      } catch (error) {
        console.error("Error deleting application:", error);
      }
    }
  };

  return {
    applications,
    fetchApplications,
    deleteApplication,
  };
};
