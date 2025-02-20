"use client";

import React, {JSX, useEffect, useState} from "react";
import InspirationCard from "@/components/InspirationCard"
import WeatherCard from "@/components/WeatherCard"
import Navbar from "@/components/Narbar/NavBar"
import {useDispatch, useSelector} from "react-redux";
import {RootState} from "@/store/store";
import {fetchInspirationStart} from "@/features/inspiration/inspirationSlice";


export default function DashboardLayout(): JSX.Element {
  const dispatch = useDispatch();
  const { message: inspMessage, error: inspError } = useSelector((state: RootState)=> state.inspiration);
  const [inspirationalMessage, setInspirationalMessage] = useState<string>('')


  useEffect(() => {
    const location = {latitude: 37.7749, longitude: 122.419};
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position) => {
        const { latitude, longitude } = position.coords;
        location.latitude = latitude;
        location.longitude = longitude
      }, (error) => {
        console.log("Error getting location:", error);
      })
    } else {
      console.log("Geolocation is not supported by this browser")
    }
    dispatch(fetchInspirationStart(location!))
  }, [dispatch]);

  useEffect(() => {
    if (inspError) {
      setInspirationalMessage('');
    } else if (inspMessage) {
      setInspirationalMessage(inspMessage)
      console.log(inspirationalMessage)
    }
  }, [inspError, inspMessage]);

  return (
    <div className="container-fluid p-0" style={{ backgroundColor: "#f8f9fa" }}>
      {/* Top Navbar */}
      <Navbar />
      {/* Main Content */}
      <div className="row g-0" style={{ minHeight: "100vh" }}>
        {/* Left Column: Weather & Inspiration */}
        <div className="col-md-4 col-xl-6 border-end p-4">
         <WeatherCard />
         <InspirationCard text={inspirationalMessage} title={"Inspiration of the day!"} generatedAt={new Date()}/>
        </div>

        {/* Right Column: Reminders */}
        <div className="col-md-8 col-xl-6 p-4">
          {/* Reminders Header */}
          <div className="d-flex justify-content-between align-items-center mb-3">
            <h4 className="mb-0">Reminders: 6</h4>
            <div>
              <button className="btn btn-outline-secondary me-2">
                View Completed
              </button>
              <button className="btn btn-primary">Create New</button>
            </div>
          </div>

          {/* Example Reminder Item #1 */}
          <div className="mb-3 p-3 border rounded d-flex justify-content-between align-items-start">
            <div>
              <div className="mb-1">
                <span className="fw-bold me-2">02/20/2025</span>
                <span className="badge bg-danger">Overdue</span>
              </div>
              <h6 className="mb-1">
                Enim luctus turpis eget ornare placerat condimentum dui volutpat
              </h6>
              <p className="mb-1 text-muted">
                Tellus at sed phasellus euismod habitasse convallis nullam est
                urna.
              </p>
            </div>
            <div className="ms-3 d-flex flex-column align-items-end">
              <div className="mb-2">
                <button className="btn btn-sm btn-outline-secondary me-1" title="Delete">
                  🗑️
                </button>
                <button className="btn btn-sm btn-outline-secondary me-1" title="Edit">
                  ✏️
                </button>
                <button className="btn btn-sm btn-outline-secondary" title="Complete">
                  ✅
                </button>
              </div>
            </div>
          </div>

          {/* Example Reminder Item #2 */}
          <div className="mb-3 p-3 border rounded d-flex justify-content-between align-items-start">
            <div>
              <div className="mb-1">
                <span className="fw-bold me-2">02/26/2025</span>
                <span className="badge bg-info text-dark">To Do</span>
              </div>
              <h6 className="mb-1">
                Quam risus habitasse imperdiet ipsum quam vestibulum
              </h6>
              <p className="mb-1 text-muted">
                Cursus scelerisque vel quis morbi enim enim. Sed duis luctus
                lectus.
              </p>
            </div>
            <div className="ms-3 d-flex flex-column align-items-end">
              <div className="mb-2">
                <button className="btn btn-sm btn-outline-secondary me-1" title="Delete">
                  🗑️
                </button>
                <button className="btn btn-sm btn-outline-secondary me-1" title="Edit">
                  ✏️
                </button>
                <button className="btn btn-sm btn-outline-secondary" title="Complete">
                  ✅
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
