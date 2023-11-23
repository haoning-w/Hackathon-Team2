import { Link } from "react-router-dom";

function Logo() {
  return (
    <div className="w-[160px]">
      <Link to="/">
        <h1 className="text-[48px]">UWBC</h1>
      </Link>
    </div>
  );
}

export default Logo;
