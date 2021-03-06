import React from "react";

const BusinessSummary = () => {
  return (
    <div>
      <div className="hero mt-10 ">
        <div className=" ">
          <div className="">
            <h1 className="text-5xl font-bold my-10 ">Business Summary </h1>

            {/* cards */}
            <div className="cards my-16 grid grid-cols-1 lg:grid-cols-4 gap-8 ">
              <div className="card w-64 bg-lime-200  text-neutral-content mx-auto">
                <div className="card-body hover:bg-pink-100 items-center text-center">
                  <img
                    className="w-20"
                    src="https://img.icons8.com/external-icongeek26-outline-icongeek26/344/external-customer-casino-icongeek26-outline-icongeek26.png"
                    alt=""
                  />
                  <h2 className="card-title text-primary">
                    we served 100+ customers
                  </h2>
                  <p className="text-primary font-thin">
                    We always try our best for serve an customer
                  </p>
                  <div className="card-actions justify-end"></div>
                </div>
              </div>
              <div className="card w-64 mx-auto hover:bg-pink-100 bg-sky-300 text text-neutral-content">
                <div className="card-body items-center text-center">
                  <img
                    className="w-20"
                    src="https://img.icons8.com/external-kiranshastry-solid-kiranshastry/344/external-revenue-investment-kiranshastry-solid-kiranshastry.png"
                    alt=""
                  />
                  <h2 className="card-title text-primary">
                    120M+ Annual revenue
                  </h2>
                  <p className="text-primary font-thin">
                    We always try our best for serve an customer
                  </p>
                  <div className="card-actions justify-end"></div>
                </div>
              </div>
              <div className="card w-64 mx-auto bg-yellow-300 text-neutral-content">
                <div className="card-body items-center text-center hover:bg-pink-100">
                  <img
                    className="w-20"
                    src="https://img.icons8.com/external-smashingstocks-mixed-smashing-stocks/2x/external-reviews-customer-loyalty-program-smashingstocks-mixed-smashing-stocks.png"
                    alt=""
                  />
                  <h2 className="card-title text-primary">33K+ Reviews</h2>
                  <p className="text-primary font-thin">
                    We always try our best for serve an customer
                  </p>
                  <div className="card-actions justify-end"></div>
                </div>
              </div>
              <div className="card w-64  mx-auto bg-blue-200 text-neutral-content">
                <div className="card-body items-center text-center hover:bg-pink-100 ">
                  <img
                    className="w-20"
                    src="https://cdn-icons-png.flaticon.com/512/69/69886.png"
                    alt=""
                  />
                  <h2 className="card-title text-primary">50+ tools</h2>
                  <p className="text-primary font-thin">
                    We always try our best for serve an customer
                  </p>
                  <div className="card-actions justify-end"></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BusinessSummary;
