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
  forecast = [
    { day: "Tomorrow", high: 70, low: 50, iconSrc:'/icons/sun-behind-large-cloud.svg' },
    { day: "Sunday", high: 68, low: 44, iconSrc:'/icons/sun-behind-rain-cloud.svg' },
    { day: "Monday", high: 80, low: 66, iconSrc:'/icons/sun_icon.svg' },
    { day: "Tuesday", high: 53, low: 32, iconSrc:'/icons/sun-behind-large-cloud.svg' },
    { day: "Wednesday", high: 72, low: 59, iconSrc:'/icons/sun-behind-small-cloud.svg' },
  ],
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
                <p className={styles.sunRise}>Sunrise:<span className={styles.sunRiseValue}>{sunrise}</span> </p>
                <div className="d-flex align-items-center">
                  <Image
                    src={weatherGraph}
                    alt={`${condition} icon`}
                    width={151}
                    height={48}
                  />
                </div>
                <p className={styles.sunSet}>Sunset:<span className={styles.sunSetValue}> {sunset}</span> </p>
              </div>
            </div>
            <div className="col col-6">
              <div className="ms-2 d-flex flex-column align-items-center justify-content-around h-100">
                <h5 className={styles.city}>{city}</h5>
                <Image
                  src={iconSrc}
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
                    src={iconSrc}
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
