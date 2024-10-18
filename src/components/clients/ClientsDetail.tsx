import { stateJSX, vztahMapa } from "../../utils/ClientsFunctions";
import "./ClientsDetail.scss";

type ClientDetailsProps = {
  clientDetails: any;
  categories: any;
};

const ClientDetails: React.FC<ClientDetailsProps> = ({
  clientDetails,
  categories,
}) => {
  const removeHTMLTags = (text: string) => {
    return text ? text.replace(/<\/?[^>]+(>|$)/g, "") : "";
  };

  return (
    <section className="client-details">
      {clientDetails && (
        <>
          <div className="flex-top">
            <div className="flex-top-2">
              <div className="kategorie-details">
                {categories
                  ?.filter(
                    (category: any) =>
                      category.code01 === clientDetails.category?.value
                  )
                  .map((filteredCategory: any) => (
                    <span
                      style={{
                        backgroundColor: `#${filteredCategory.code02}`,
                      }}
                      key={filteredCategory.code01}
                    >
                      {filteredCategory.code01}
                    </span>
                  ))}
              </div>
              {stateJSX(clientDetails)}{" "}
              <div>{vztahMapa[clientDetails.role] || clientDetails.role}</div>
            </div>
          </div>
          <h3>{clientDetails.name}</h3>
          <div className="adresa-detail">
            {clientDetails.regNumber && (
              <p className="detail-ic">IČ {clientDetails.regNumber}</p>
            )}
            <p>{clientDetails.primaryAddress?.address.street}</p>
            <p>
              {clientDetails.primaryAddress?.address.zipCode} {""}
              {clientDetails.primaryAddress?.address.city}
            </p>
            <p>{clientDetails.primaryAddress?.address.country}</p>
            {clientDetails.primaryAddress?.address.street &&
              clientDetails.primaryAddress?.address.city && (
                <a
                  href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
                    clientDetails.primaryAddress.address.street
                  )}+${encodeURIComponent(
                    clientDetails.primaryAddress.address.city
                  )}`}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Zobrazit na mapě
                </a>
              )}
          </div>
          {clientDetails.notice && (
            <p className="detail-info">
              {removeHTMLTags(clientDetails.notice)}
            </p>
          )}
          <p>
            Vlastník: <strong>{clientDetails.owner.fullName}</strong>
          </p>
        </>
      )}
    </section>
  );
};

export default ClientDetails;
