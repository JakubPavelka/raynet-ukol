import "./Filter.scss";
import { BsFilter, BsCaretRightFill } from "react-icons/bs";
import { useState } from "react";
import { useAppDispatch, useAppSelector } from "../../store/store";
import {
  fetchClientCategory,
  fetchFilterStav,
} from "../../store/features/clientsSlice";

const Filter = () => {
  const [filterOpen, setFilterOpen] = useState<boolean>(false);
  const [filtersOpen, setFiltersOpen] = useState({
    stav: false,
    vztah: false,
    rating: false,
    kategorie: false,
  });

  const dispatch = useAppDispatch();
  const categories = useAppSelector((state) => state.client.clientCategory);

  const handleFilterOpen = () => {
    setFilterOpen((prev) => !prev);
  };

  const handleFiltersOpen = (filterKey: keyof typeof filtersOpen) => {
    setFiltersOpen((prev) => ({
      ...prev,
      [filterKey]: !prev[filterKey],
    }));
  };
  const resetFilters = () => {
    setFiltersOpen({
      stav: false,
      vztah: false,
      rating: false,
      kategorie: false,
    });
  };

  return (
    <>
      <div
        className="filter-clients"
        onClick={() => {
          handleFilterOpen();
          resetFilters();
          dispatch(fetchClientCategory());
        }}
      >
        <BsFilter />
        Filter
      </div>
      {filterOpen && (
        <section className="filter-menu">
          <div className="flex" onClick={() => handleFiltersOpen("stav")}>
            STAV
            <BsCaretRightFill />
          </div>
          <br />
          {filtersOpen.stav && (
            <div className="submenu">
              <p
                onClick={() =>
                  dispatch(
                    fetchFilterStav({
                      filterType: "state",
                      filterValue: "B_ACTUAL",
                    })
                  )
                }
              >
                Aktuální
              </p>
              <p
                onClick={() =>
                  dispatch(
                    fetchFilterStav({
                      filterType: "state",
                      filterValue: "A_POTENTIAL",
                    })
                  )
                }
              >
                Potenciální
              </p>
              <p
                onClick={() =>
                  dispatch(
                    fetchFilterStav({
                      filterType: "state",
                      filterValue: "D_UNATTRACTIVE",
                    })
                  )
                }
              >
                Nezajímavý
              </p>
              <p
                onClick={() =>
                  dispatch(
                    fetchFilterStav({
                      filterType: "state",
                      filterValue: "C_DEFERRED",
                    })
                  )
                }
              >
                Odložený
              </p>
            </div>
          )}
          <div className="flex" onClick={() => handleFiltersOpen("vztah")}>
            VZTAH
            <BsCaretRightFill />
          </div>
          <br />
          {filtersOpen.vztah && (
            <div className="submenu">
              <p
                onClick={() =>
                  dispatch(
                    fetchFilterStav({
                      filterType: "role",
                      filterValue: "C_SUPPLIER",
                    })
                  )
                }
              >
                Dodavatel
              </p>
              <p
                onClick={() =>
                  dispatch(
                    fetchFilterStav({
                      filterType: "role",
                      filterValue: "A_SUBSCRIBER",
                    })
                  )
                }
              >
                Odběratel
              </p>
              <p
                onClick={() =>
                  dispatch(
                    fetchFilterStav({
                      filterType: "role",
                      filterValue: "B_PARTNER",
                    })
                  )
                }
              >
                Partner
              </p>
              <p
                onClick={() =>
                  dispatch(
                    fetchFilterStav({
                      filterType: "role",
                      filterValue: "E_OWN",
                    })
                  )
                }
              >
                Vlastní firma
              </p>
              <p
                onClick={() =>
                  dispatch(
                    fetchFilterStav({
                      filterType: "role",
                      filterValue: "D_RIVAL",
                    })
                  )
                }
              >
                Konkurent
              </p>
            </div>
          )}
          <div className="flex" onClick={() => handleFiltersOpen("rating")}>
            RATING
            <BsCaretRightFill />
          </div>
          <br />
          {filtersOpen.rating && (
            <div className="submenu">
              <p
                onClick={() =>
                  dispatch(
                    fetchFilterStav({
                      filterType: "rating",
                      filterValue: "A",
                    })
                  )
                }
              >
                A
              </p>
              <p
                onClick={() =>
                  dispatch(
                    fetchFilterStav({
                      filterType: "rating",
                      filterValue: "B",
                    })
                  )
                }
              >
                B
              </p>
              <p
                onClick={() =>
                  dispatch(
                    fetchFilterStav({
                      filterType: "rating",
                      filterValue: "C",
                    })
                  )
                }
              >
                C
              </p>
            </div>
          )}
          <div className="flex" onClick={() => handleFiltersOpen("kategorie")}>
            KATEGORIE
            <BsCaretRightFill />
          </div>
          <br />
          {filtersOpen.kategorie && (
            <div className="submenu">
              {categories?.map((category) => (
                <p
                  onClick={() =>
                    dispatch(
                      fetchFilterStav({
                        filterType: "kategorie",
                        filterValue: `${category.id}`,
                      })
                    )
                  }
                  key={category.code01}
                >
                  {category.code01}
                </p>
              ))}
            </div>
          )}
        </section>
      )}
    </>
  );
};

export default Filter;
