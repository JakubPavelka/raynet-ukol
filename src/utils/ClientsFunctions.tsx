export const stateMapa: { [key: string]: string } = {
  A_POTENTIAL: "Potenciální",
  B_ACTUAL: "Aktuální",
  C_DEFERRED: "Odložený",
  D_UNATTRACTIVE: "Nezajímavý",
};

export const vztahMapa: { [key: string]: string } = {
  A_SUBSCRIBER: "Odběratel",
  B_PARTNER: "Partner",
  C_SUPPLIER: "Dodavatel",
  D_RIVAL: "Konkurent",
  E_OWN: "Vlastní firma",
};

export const stateJSX = (client: string | any) => {
  if (client.state === "A_POTENTIAL") {
    return (
      <div className="td stav potential">
        {stateMapa[client.state] || client.state}
      </div>
    );
  } else if (client.state === "B_ACTUAL") {
    return (
      <div className="td stav actual">
        {stateMapa[client.state] || client.state}
      </div>
    );
  } else if (client.state === "D_UNATTRACTIVE") {
    return (
      <div className="td stav unattractive">
        {stateMapa[client.state] || client.state}
      </div>
    );
  } else if (client.state === "C_DEFERRED") {
    return (
      <div className="td stav deferred">
        {stateMapa[client.state] || client.state}
      </div>
    );
  } else {
    return <div>{client.state}</div>;
  }
};
