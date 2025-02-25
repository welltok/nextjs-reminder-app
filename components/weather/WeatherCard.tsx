import React from "react"
import Image from "next/image"
import styles from './WeatherCard.module.css';

interface WeatherWidgetProps {
  temperature?: string
  feelsLike?: string
  city?: string
  condition?: string
  iconSrc?: string
  sunrise?: string
  sunset?: string
  forecast?: Array<{ day: string; high: number; low: number, iconSrc:string }>
  weatherGraph?: string
}

export const convertUnixToDate = (timestamp: number | string) => {
  if ( typeof(timestamp) === "string") {
    return new Date(timestamp).toLocaleString("en-US", {
      weekday: "long", // Full day name (e.g., "Monday")
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
      hour12: true, // 12-hour format
    })
  }
  return new Date(timestamp * 1000).toLocaleString("en-US", {
    weekday: "long", // Full day name (e.g., "Monday")
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
    hour12: true, // 12-hour format
  });
};


/**
 * Fetches weather icon from OpenWeather.
 */
const getWeatherIcon = (iconCode: string) => {
  return `https://openweathermap.org/img/wn/${iconCode}@2x.png`;
};

/**
 * A reusable weather widget component.
 * Pass in props for dynamic data, or rely on defaults for demonstration.
 */
export default function WeatherWidget({
  temperature = "75°F",
  feelsLike = "65°F",
  city = "San Francisco",
  condition = "Sunny",
  iconSrc = "/icons/sun_icon.svg",
  sunrise = "6:37 AM",
  sunset = "5:37 PM",
  weatherGraph = '/icons/weather_graph.svg',
  forecast = [],
}: WeatherWidgetProps) {
  return (
    <div className={`${styles.container} mb-4`}>
      <div className="row m-0 p-0">
        <div className="col col-8 p-3">
          <div className="row">
            <div className="col col-6">
              <div className="d-flex flex-column">
                <h2 className={styles.temperature}>{temperature}</h2>
                <p className={styles.feelsLike}>Feels like: <span className={styles.feelsLikeValue}>{feelsLike}</span></p>
                <p className={styles.sunRise}>Sunrise:<span className={styles.sunRiseValue}> {convertUnixToDate(sunrise)}</span> </p>
                <div className="d-flex align-items-center">
                  <Image
                    src={weatherGraph}
                    alt={`${condition} icon`}
                    width={151}
                    height={48}
                  />
                </div>
                <p className={styles.sunSet}>Sunset:<span className={styles.sunSetValue}> {convertUnixToDate(sunset)}</span> </p>
              </div>
            </div>
            <div className="col col-6">
              <div className="ms-2 d-flex flex-column align-items-center justify-content-around h-100">
                <h5 className={styles.city}>{city}</h5>
                <Image
                  src={getWeatherIcon(iconSrc)}
                  alt={`temperature icon`}
                  width={100}
                  height={100}
                />
                <p className={styles.condition}>{condition}</p>
              </div>
            </div>
          </div>

        </div>
        <div className={`col col-4 p-3 border-start`}>
          <ul className="list-unstyled h-100 d-flex flex-column h-100 justify-content-between p-2">
            {forecast.map(({ day, high, low, iconSrc }, index) => (
              <li key={index}>
                <div className="d-flex w-100 align-items-center gap-2">
                 <Image
                    src={getWeatherIcon(iconSrc)}
                    alt={`icon`}
                    width={27.83}
                    height={27.83}
                  />
                <span className={styles.dayTemp}>{high}°/{low}°</span>
                 <span className={styles.day}>{day}</span>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  )
}
