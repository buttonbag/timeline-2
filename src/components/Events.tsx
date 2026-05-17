export default function Events({it}:any) {
  const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
  const d = new Date(it.event_date);
  const year = d.getFullYear();
  const month = months[d.getMonth()];
  const day = d.getDay();

  return (
    <div id="event" className='ml-3 p-10 bg-gray-100 border-l-2 border-black'>
      <div id="event-text">
        <p className='text-2xl capitalize'>{it.event_title} {`${month} ${day} ${year}`}</p>
        <p className='text-base'>{it.event_desc}</p>
      </div>
      <figure>
        <img src={it.event_img}/>
      </figure>
    </div>
  );
}