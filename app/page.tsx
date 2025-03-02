"use client";

import React, { JSX, useEffect, useRef, useState } from "react";
import InspirationCard from "@/components/InspirationCard";
import WeatherCard from "@/components/weather/WeatherCard";
import Navbar from "@/components/Narbar/NavBar";
import Reminders from "@/components/reminder/Reminders";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/store/store";
import { fetchInspirationStart } from "@/features/inspiration/inspirationSlice";
import { fetchWeatherStart } from "@/features/weather/weatherSlice";
import {
  fetchRemindersRequest,
  createReminderRequest,
  deleteReminderRequest,
  updateReminderRequest,
  completeReminderRequest,
} from "@/features/reminders/reminderSlice";

interface Reminder {
  _id: string;
  dueDate: string;
  title: string;
  description: string;
  status: "overdue" | "to-do" | "completed";
}

export default function DashboardLayout(): JSX.Element {
  const dispatch = useDispatch();
  const { message: inspMessage, error: inspError, loading } = useSelector((state: RootState) => state.inspiration);
  const { data: weatherData, error: weatherError } = useSelector((state: RootState) => state.weather);
  const { data, loading: remindersLoading } = useSelector((state: RootState) => state.reminders);

  const [inspirationalMessage, setInspirationalMessage] = useState<string>("");

  const hasFetchedData = useRef(false);

  useEffect(() => {
    if (!hasFetchedData.current) {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
          (position) => {
            const { latitude, longitude } = position.coords;
            dispatch(fetchInspirationStart({ latitude, longitude }));
            dispatch(fetchWeatherStart({ latitude, longitude }));
          },
          (error) => {
            console.log("Error getting location:", error);
            dispatch(fetchInspirationStart({ latitude: 37.7749, longitude: 122.419 })); // Default location
            dispatch(fetchWeatherStart({ latitude: 37.7749, longitude: 122.419 }));
          }
        );
      } else {
        console.log("Geolocation is not supported by this browser");
        dispatch(fetchInspirationStart({ latitude: 37.7749, longitude: 122.419 }));
        dispatch(fetchWeatherStart({ latitude: 37.7749, longitude: 122.419 }));
      }

      dispatch(fetchRemindersRequest()); // Fetch reminders from API
      hasFetchedData.current = true;
    }
  }, [dispatch]);

  useEffect(() => {
    if (inspError) {
      setInspirationalMessage("");
    } else if (inspMessage) {
      setInspirationalMessage(inspMessage);
    }
  }, [inspError, inspMessage]);

  const handleCreateNew = (newReminder: Reminder) => {
    dispatch(createReminderRequest(newReminder));
  };

  const handleDelete = (id: string) => {
    console.log('id',id)
    dispatch(deleteReminderRequest(id));
  };

  const handleEdit = (id: string, updatedReminder: Reminder) => {
    console.log('id handleEdit', id)
    dispatch(updateReminderRequest({ id, updatedReminder }));
  };

  const handleComplete = (id: string) => {
    console.log('id', id)
    dispatch(completeReminderRequest(id));
  };

  const viewCompleted = () => {

  }

  return (
    <div className="container-fluid p-0" style={{ backgroundColor: "#f8f9fa" }}>
      {/* Top Navbar */}
      <Navbar />
      {/* Main Content */}
      <div className="row g-0" style={{ minHeight: "100vh" }}>
        {/* Left Column: Weather & Inspiration */}
        <div className="col-md-4 col-xl-6 border-end p-4">
          {weatherError ? <p className="text-danger">Error loading weather data</p> : <WeatherCard {...weatherData} />}
          <InspirationCard text={inspirationalMessage} title={"Inspiration of the day!"} generatedAt={new Date()} loading={loading} />
        </div>
         
        {/* Right Column: Reminders */}
        <div className="col-md-8 col-xl-6 p-4">
        
            <Reminders
              reminders={data}
              onViewCompleted={() => console.log("Viewing completed reminders...")}
              onCreateNew={handleCreateNew}
              onDelete={handleDelete}
              onEdit={handleEdit}
              onComplete={handleComplete}
            />
          
        </div>
      </div>
    </div>
  );
}
