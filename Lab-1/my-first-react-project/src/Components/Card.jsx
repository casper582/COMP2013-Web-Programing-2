export default function Card(props) {
  let ratingClass;
  if (props.rating >= 4) {
    ratingClass = "rating good";
  } else {
    ratingClass = "rating bad";
  }

  return (
    <div className="Card-Component">
      <img src={props.image} alt="" width="100px" />
      <h2>{props.name}</h2>
      <p>{props.resort}</p>
      <p className={ratingClass}>{props.rating}★</p>
      <p>{props.price}</p>
    </div>
  );
}
