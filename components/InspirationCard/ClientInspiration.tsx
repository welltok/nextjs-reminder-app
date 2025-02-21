"use client"; // This is a Client Component

import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchInspirationStart } from "@/features/inspiration/inspirationSlice";
import { RootState } from "@/store/store";
import InspirationCard from "@/components/InspirationCard";

export default function ClientInspiration({ initialMessage }: { initialMessage: string }) {
  const dispatch = useDispatch();
  const { message: inspMessage, error: inspError } = useSelector((state: RootState) => state.inspiration);
  const [inspirationalMessage, setInspirationalMessage] = useState(initialMessage);

  useEffect(() => {
    if (!initialMessage) {
      dispatch(fetchInspirationStart({ latitude: 37.7749, longitude: -122.4194 }));
    }
  }, [dispatch, initialMessage]);

  useEffect(() => {
    if (inspError) {
      setInspirationalMessage("Error fetching inspiration.");
    } else if (inspMessage) {
      setInspirationalMessage(inspMessage);
    }
  }, [inspError, inspMessage]);

  return <InspirationCard text={inspirationalMessage} title="Inspiration of the Day!" generatedAt={new Date()} />;
}
