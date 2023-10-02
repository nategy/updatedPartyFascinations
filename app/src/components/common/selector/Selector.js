import "./selector.css";
import items from "./Sidebardata.json";
import Sidebaritems from "./Sidebaritems";

export default function Selector() {
  return (
    <div className='sidebar'>
      {items.map((item, index) => (
        <Sidebaritems key={index} item={item} />
      ))}
    </div>
  );
}
