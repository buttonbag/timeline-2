import Events from "./Events";
import DATA from '../../api/data';
import { useMemo } from "react";
import '../styles/decades.css';

interface Event {
    event_date: string,
    event_title: string,
    event_desc: string,
    event_img: string,
}

function toYear(value: string | number | Date) {
  if (value instanceof Date) return value.getFullYear();
  const d = new Date(value);
  if (Number.isNaN(d)) return null;
  return d.getFullYear();
}

function groupByDecade(data: any, start = 1900, bucketSize = 10) {
  // returns map like { "1900-1999": [items], "2000-2099": [...] }
  const groups = new Map();
  data.forEach((event: Event) => {
    const year = toYear(event.event_date);
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
  const grouped = useMemo(()=>groupByDecade(DATA, 1900, 10), []);
  
  return (
    <>
      <div id="decade">
      {grouped.map(([label, items]) => (
        <section key={label} className="mb-15">
          <h2 className="text-3xl">{label}</h2>

            {items.map((it: any, i: number) => (
              <Events key={i} it={it}/>
            ))}

        </section>
      ))}
      </div>
    </>
  );
}