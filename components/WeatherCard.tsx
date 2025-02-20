import React from "react"
import Image from "next/image"

interface WeatherWidgetProps {
  temperature?: string
  feelsLike?: string
  city?: string
  condition?: string
  iconSrc?: string
  sunrise?: string
  sunset?: string
  forecast?: Array<{ day: string; high: number; low: number }>
}

/**
 * A reusable weather widget component.
 * Pass in props for dynamic data, or rely on defaults for demonstration.
 */
export default function WeatherWidget({
  temperature = "75°F",
  feelsLike = "65°F",
  city = "San Francisco",
  condition = "Sunny",
  iconSrc = "/sun_icon.png",
  sunrise = "6:37 AM",
  sunset = "5:37 PM",
  forecast = [
    { day: "Tomorrow", high: 70, low: 50 },
    { day: "Sunday", high: 68, low: 44 },
    { day: "Monday", high: 80, low: 66 },
    { day: "Tuesday", high: 53, low: 32 },
    { day: "Wednesday", high: 72, low: 59 },
  ],
}: WeatherWidgetProps) {
  return (
    <div className="mb-4">
      <h2 className="h1 mb-0">{temperature}</h2>
      <p className="text-muted mb-1">Feels like: {feelsLike}</p>
      <div className="d-flex align-items-center">
        <Image
          src={iconSrc}
          alt={`${condition} icon`}
          width={40}
          height={40}
        />
        <div className="ms-2">
          <h5 className="mb-0">{city}</h5>
          <small className="text-muted">{condition}</small>
        </div>
      </div>
      <p className="mt-2 mb-1">Sunrise: {sunrise}</p>
      <p className="mb-2">Sunset: {sunset}</p>
      <ul className="list-unstyled">
        {forecast.map(({ day, high, low }, index) => (
          <li key={index}>
            {high}°/{low}° {day}
          </li>
        ))}
      </ul>
    </div>
  )
}
