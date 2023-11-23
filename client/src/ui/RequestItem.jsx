import { Link } from "react-router-dom";
import styles from "./RequestItem.module.css";
import { formatDate } from "../utils/helper";

function RequestItem({ request }) {
  const { id, name, timeStamp, address, latlng } = request;
  const { lat, lng } = latlng;
  return (
    <li className="mt-6">
      <Link
        to={`${id}?lat=${lat}&lng=${lng}`}
        className={`${styles.requestItem}`}
      >
        <div className="w-full">
          <h1 className="text-[20px] font-bold">{name}</h1>
        </div>
        <h3 className={styles.name}>{address}</h3>
        <time className={styles.date}>{formatDate(timeStamp)}</time>
      </Link>
    </li>
  );
}

export default RequestItem;
