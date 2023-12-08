function RoomPackages({
  setRoomPackage,
  roomPackage,
  totalPrice,
  setTotalPrice,
  numberOfDays,
  packagedPrice,
}) {
  function formattedPrice(price) {
    return price.toLocaleString("da-DK", {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    });
  }

  function handlePackage(selectedPackage, price) {
    setRoomPackage(selectedPackage);
    setTotalPrice(price);
  }

  return (
    <div className="packages-main-wrapper">
      <h2 className="packages-main-heading">Packages</h2>
      <div className="packages">
        <button
          className={roomPackage === 1 ? "selected" : ""}
          onClick={() => handlePackage(1, packagedPrice)}
        >
          <span className="package-heading">Overnight stay with breakfast</span>
          <span className="package-paragraph">
            Accommodation with large breakfast buffet with organic and local
            specialties
          </span>
          <span className="package-price">
            {formattedPrice(packagedPrice)} kr.
          </span>
          <div className={roomPackage === 1 ? "chosen checkmark" : "checkmark"}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              fill="currentColor"
              className="bi bi-check2"
              viewBox="0 0 16 16"
            >
              <path d="M13.854 3.646a.5.5 0 0 1 0 .708l-7 7a.5.5 0 0 1-.708 0l-3.5-3.5a.5.5 0 1 1 .708-.708L6.5 10.293l6.646-6.647a.5.5 0 0 1 .708 0z" />
            </svg>
          </div>
        </button>
        <button
          className={roomPackage === 2 ? "selected" : ""}
          onClick={() => handlePackage(2, packagedPrice + 200 * numberOfDays)}
        >
          <span className="package-heading">Blissful break</span>
          <span className="package-paragraph">
            Cosy afternoon coffee with cake - and later 3-course dinner
          </span>
          <span className="package-price">
            {formattedPrice(packagedPrice + 200 * numberOfDays)} kr.
          </span>
          <div className={roomPackage === 2 ? "chosen checkmark" : "checkmark"}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              fill="currentColor"
              className="bi bi-check2"
              viewBox="0 0 16 16"
            >
              <path d="M13.854 3.646a.5.5 0 0 1 0 .708l-7 7a.5.5 0 0 1-.708 0l-3.5-3.5a.5.5 0 1 1 .708-.708L6.5 10.293l6.646-6.647a.5.5 0 0 1 .708 0z" />
            </svg>
          </div>
        </button>
        <button
          className={roomPackage === 3 ? "selected" : ""}
          onClick={() => handlePackage(3, packagedPrice + 400 * numberOfDays)}
        >
          <span className="package-heading">
            Spadelight at two Comwell-hotels
          </span>
          <span className="package-paragraph">
            Enjoy a spa stay at one of our two spa hotels in Denmark. This stay
            is including free AquaSpa access, 3-course dinner, accommodation and
            breakfast buffet.
          </span>
          <span className="package-price">
            {formattedPrice(packagedPrice + 400 * numberOfDays)} kr.
          </span>
          <div className={roomPackage === 3 ? "chosen checkmark" : "checkmark"}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              fill="currentColor"
              className="bi bi-check2"
              viewBox="0 0 16 16"
            >
              <path d="M13.854 3.646a.5.5 0 0 1 0 .708l-7 7a.5.5 0 0 1-.708 0l-3.5-3.5a.5.5 0 1 1 .708-.708L6.5 10.293l6.646-6.647a.5.5 0 0 1 .708 0z" />
            </svg>
          </div>
        </button>
      </div>
    </div>
  );
}

export default RoomPackages;
