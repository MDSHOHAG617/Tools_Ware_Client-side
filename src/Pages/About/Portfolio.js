import React from "react";

const Portfolio = () => {
  return (
    <div>
      <div class="hero min-h-screen ">
        <div class="hero-content flex-col lg:flex-row">
          <img
            src="https://api.lorem.space/image/movie?w=260&h=400"
            class="max-w-sm rounded-lg shadow-2xl"
            alt=""
          />
          <div className="lg:p-32">
            <h1 class="text-5xl font-bold">H! I am Md Shohag</h1>
            <p class="py-6">
              Provident cupiditate voluptatem et in. Quaerat fugiat ut assumenda
              excepturi exercitationem quasi. In deleniti eaque aut repudiandae
              et a id nisi.
            </p>
            <button class="btn btn-primary">Get Started</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Portfolio;