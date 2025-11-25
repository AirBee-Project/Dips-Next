import { Link } from "react-router";

type Props = {
  name: string;
  url?: string;
  license?: string;
  note?: string;
};

export default function UsedLicense(props: Props) {
  return (
    <div className="border-t-2 py-4.5 border-gray-100">
      <p className="text-gray-300 text-2xl mb-1">{props.name}</p>
      {props.url && (
        <Link
          className="text-1xl text-gray-200"
          to={props.url}
          target="_blank"
          rel="noopener noreferrer"
        >
          URL:{props.url}
        </Link>
      )}
      {props.license && (
        <p className="text-1xl text-gray-200">License:{props.license}</p>
      )}

      {props.note && (
        <p className="text-1xl text-gray-200">Note:{props.note}</p>
      )}
    </div>
  );
}
