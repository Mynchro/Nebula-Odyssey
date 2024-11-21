import "./LoadingScreen.css";

const LoadingScreen = () => {
  return (
    <div className="loading-animation">
      <svg xmlns="http://www.w3.org/2000/svg" version="1.1">
        <defs>
          <filter id="gooey">
            <feGaussianBlur
              in="SourceGraphic"
              stdDeviation="10"
              result="blur"
            />
            <feColorMatrix
              in="blur"
              mode="matrix"
              values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 18 -7"
              result="goo"
            />
            <feBlend in="SourceGraphic" in2="goo" />
          </filter>
        </defs>
      </svg>
      {[...Array(6)].map((_, i) => (
        <div key={i} className={`blob blob-${i}`} />
      ))}
    </div>
  );
};

export default LoadingScreen;
