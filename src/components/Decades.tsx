import Events from "./Events";
import DATA from '../../api/data';

export default function Decades() {
  const data = DATA;
  
  return (
    <>
      {data.map((e) =>
        <div id="decade" className='ml-5 border-l-2 border-black'>
          {e.event_date}
          <Events />
        </div>
      )}
    </>
  );
}