import './App.css';

function App() {

  let companies = [
    { name: "Tesla", revenue: 140 },
    { name: "Microsoft", revenue: 300 },
    { name: "Google", revenue: 600 }
  ];

  const showCompany = (name, revenue) => {
    return (
      <div id={name} key={name}>
        {name} makes {revenue} every year
      </div>
    );
  };

  const getClassName = (temperature) => {
    if (temperature < 15) return "freezing";
    if (temperature >= 15 && temperature <= 30) return "fair";
    return "hell-scape";
  };

  return (
    <div className="App">

      <div className="ex-space">
        <h4 className="ex-title">Exercise 1</h4>
        <div className="exercise" id="ex-1">
          {companies.map(c => showCompany(c.name, c.revenue))}
        </div>
      </div>

      <div className="ex-space">
        <h4 className="ex-title">Exercise 2</h4>
        <div className="exercise" id="ex-2">
          <div id="weatherBox" className={getClassName(20)}></div>
        </div>
      </div>

    </div>
  );
}

export default App;