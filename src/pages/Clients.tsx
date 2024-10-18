import Search from "../components/clients/Search";
import "./Clients.scss";
import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../store/store";
import {
  fetchClients,
  fetchClientDetails,
  increaseOffset,
  decreaseOffset,
  increasePage,
  decreasePage,
  fetchClientCategory,
  selectRow,
  deselectRow,
} from "../store/features/clientsSlice";
import {
  BsArrowLeftSquare,
  BsArrowRightSquare,
  BsRepeat,
} from "react-icons/bs";

import ClientDetails from "../components/clients/ClientsDetail";
import { stateJSX, vztahMapa } from "../utils/ClientsFunctions";
import Filter from "../components/clients/Filter";

const Clients = () => {
  const dispatch = useAppDispatch();
  const { clients, loading, offset, limit, page, clientDetails } =
    useAppSelector((state) => state.client);

  const categories = useAppSelector((state) => state.client.clientCategory);
  const selectedId = useAppSelector((state) => state.client.selectedIdName);

  const handleAddPage = () => {
    if (clients.length === limit) {
      dispatch(increasePage());
      dispatch(increaseOffset());
    }
  };

  const handlePageBack = () => {
    if (page > 1) {
      dispatch(decreasePage());
      dispatch(decreaseOffset());
    }
  };

  const handleDetails = (clientId: number) => {
    dispatch(selectRow(clientId));
    dispatch(fetchClientDetails(clientId));
  };

  useEffect(() => {
    if (!loading) {
      dispatch(fetchClients({ offset, limit }));
      dispatch(fetchClientCategory());
    }
  }, [dispatch, offset, limit]);

  return (
    <section className="clients">
      <h2>Klienti</h2>
      <div>
        <div className="clients-flex">
          <div className="clients-flex-col-1">
            <div className="search-filter">
              <Search />
              <Filter />
            </div>
            <div className="refetch">
              <div>
                <BsRepeat
                  onClick={() => {
                    dispatch(fetchClients({ offset, limit, force: true }));
                    dispatch(deselectRow());
                  }}
                />
              </div>
            </div>
            <div className="table-wrapper">
              <div className="table-container">
                <div className="table-header">
                  <div className="table-row head">
                    <div className="th nazev">NÁZEV/JMÉNO</div>
                    <div className="th stav">STAV</div>
                    <div className="th vztah">VZTAH</div>
                    <div className="th rating">RATING</div>
                    <div className="th vlastnik">VLASTNÍK</div>
                    <div className="th ic">IČ</div>
                    <div className="th mesto">MĚSTO</div>
                    <div className="th kategorie">KATEGORIE</div>
                  </div>
                </div>
                <div className="table-body">
                  {clients.map((client) => {
                    return (
                      <div
                        className={`table-row ${
                          selectedId === client.id ? "selected" : ""
                        }`}
                        key={client.id}
                        onClick={() => handleDetails(client.id)}
                      >
                        <div className="td nazev">{client.name}</div>
                        {stateJSX(client)}
                        <div className="td vztah">
                          {vztahMapa[client.role] || client.role}
                        </div>
                        <div className="td rating">{client.rating}</div>
                        <div className="td vlastnik">
                          {client.owner.fullName}
                        </div>
                        <div className="td ic">{client.regNumber}</div>
                        <div className="td mesto">
                          {client.primaryAddress?.address.city}
                        </div>
                        <div className="td kategorie">
                          {categories
                            ?.filter(
                              (category) =>
                                category.code01 === client.category?.value
                            )
                            .map((filteredCategory) => (
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
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>
          {clientDetails ? (
            <div className="clients-flex-col-2">
              <ClientDetails
                clientDetails={clientDetails}
                categories={categories}
              />
            </div>
          ) : (
            ""
          )}
        </div>
      </div>

      <div className="arrows">
        <BsArrowLeftSquare onClick={handlePageBack} />
        <p>{page}</p>
        <BsArrowRightSquare onClick={handleAddPage} />
      </div>
    </section>
  );
};

export default Clients;
