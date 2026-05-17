import Events from "./Events";
// import DATA from '../../api/data';
import { useEffect, useMemo, useState } from "react";
import '../styles/decades.css';

interface Event {
    id: number,
    date: string,
    title: string,
    description: string,
    image: string,
}

function toYear(value: string | number | Date) {
  if (value instanceof Date) return value.getFullYear();
  const d = new Date(value);
  if (Number.isNaN(d)) return null;
  return d.getFullYear();
}

function groupByDecade(events: any, start = 1900, bucketSize = 10) {
  // returns map like { "1900-1999": [items], "2000-2099": [...] }
  const groups = new Map();
  events.forEach((event: Event) => {
    const year = toYear(event.date);
    if (year === null) return; //skip invalid
    // compute decade bucket label covering ranges of 100 years starting at `start`
    const offset = Math.floor((year - start) / bucketSize) * bucketSize;
    const bucketStart = start + offset;
    const bucketEnd = bucketStart + bucketSize - 1;
    const label = `${bucketStart}-${bucketEnd}`;
    if (!groups.has(label)) groups.set(label, []);
    groups.get(label).push(event);
  });
  // return ascending keys
  return Array.from(groups.entries()).sort((a, b) => {
    const aStart = Number(a[0].split("-")[0]);
    const bStart = Number(b[0].split("-")[0]);
    return aStart - bStart;
  });
}

export default function Decades() {
  const [events, setEvents] = useState([]);

  const getEventsData = async () => {
    const response = await fetch("http://localhost:3000/events");
    const result = await response.json();
    setEvents(result);
  }
  
  useEffect(()=>{
    getEventsData();
  }, []);
  console.log(events);

  const grouped = useMemo(()=>groupByDecade(events, 1900, 10), []);
  
  return (
    <>
      <div id="decade">
      {grouped.map(([label, items]) => (
        <section key={label} className="mb-15">
          <h2 className="text-3xl">{label}</h2>

            {items.map((it: any, id: number) => (
              <Events key={id} it={it}/>
            ))}

        </section>
      ))}
      </div>
    </>
  );
}