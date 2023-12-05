export default function RoomPackages({
  setRoomPackage,
  roomPackage,
  totalPrice,
  numberOfDays,
}) {
  return (
    <div className="packages">
      <button onClick={() => setRoomPackage("package1")}>
        <span className="package-heading">Overnight stay with breakfast</span>
        <span className="package-paragraph">
          Accommodation with large breakfast buffet with organic and local
          specialties
        </span>
        <span className="package-price">{totalPrice}</span>
      </button>
      <button onClick={() => setRoomPackage("package2")}>
        <span className="package-heading">Blissful break</span>
        <span className="package-paragraph">
          Cosy afternoon coffee with cake - and later 3-course dinner
        </span>
        <span className="package-price">{totalPrice + 200 * numberOfDays}</span>
      </button>
      <button onClick={() => setRoomPackage("package3")}>
        <span className="package-heading">
          Spadelight at two Comwell-hotels
        </span>
        <span className="package-paragraph">
          Enjoy a spa stay at one of our two spa hotels in Denmark. This stay is
          including free AquaSpa access, 3-course dinner, accommodation and
          breakfast buffet.
        </span>
        <span className="package-price">{totalPrice + 400 * numberOfDays}</span>
      </button>
    </div>
  );
}
