import { getDb } from "@/lib/firebase-db";
import type { IApplicationResponse } from "@/types";
import { collection, deleteDoc, doc, onSnapshot } from "firebase/firestore";
import { useState } from "react";

export const useApplications = () => {
  const [applications, setApplications] = useState<IApplicationResponse[]>([]);

  const fetchApplications = () => {
    const applicationsRef = collection(getDb(), "applications");
    const unsubscribe = onSnapshot(applicationsRef, (snapshot) => {
      if (!snapshot.empty) {
        const applicationsData: IApplicationResponse[] = [];
        snapshot.forEach((doc) => {
          applicationsData.push({
            ...doc.data(),
            id: doc.id,
          } as IApplicationResponse);
        });

        // Sort applications by date - newer first
        const sortedApplications = applicationsData.sort((a, b) => {
          // Parse dates in MM/DD/YYYY format
          let dateA: Date, dateB: Date;

          if (
            a.created_at &&
            typeof a.created_at === "string" &&
            a.created_at.includes("/")
          ) {
            const [month, day, year] = a.created_at.split("/");
            dateA = new Date(
              parseInt(year),
              parseInt(month) - 1,
              parseInt(day),
            );
          } else {
            dateA = new Date(0);
          }

          if (
            b.created_at &&
            typeof b.created_at === "string" &&
            b.created_at.includes("/")
          ) {
            const [month, day, year] = b.created_at.split("/");
            dateB = new Date(
              parseInt(year),
              parseInt(month) - 1,
              parseInt(day),
            );
          } else {
            dateB = new Date(0);
          }

          // Sort descending (newer first)
          return dateB.getTime() - dateA.getTime();
        });

        setApplications(sortedApplications);
      }
    });

    return unsubscribe;
  };

  const deleteApplication = async (id: string) => {
    if (confirm("Ви впевнені, що хочете видалити цю заявку?")) {
      try {
        const itemRef = doc(getDb(), "applications", id);
        await deleteDoc(itemRef);
        alert("Заявку успішно видалено!");
        // Remove from local state immediately for better UX
        setApplications((prev) => prev.filter((app) => app.id !== id));
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
