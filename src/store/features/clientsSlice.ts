import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";

const apiKey = import.meta.env.VITE_API_KEY;
const apiInstance = import.meta.env.VITE_INSTANCE;
const apiUser = import.meta.env.VITE_USER;

export interface Client {
  id: number;
  name: string;
  rating: string;
  state: string;
  role: string;
  category: {
    value: string;
  };
  owner: {
    id: number;
    fullName: string;
  };
  regNumber: string;
  primaryAddress?: {
    address: {
      city: string;
      country: string;
      street: string;
      zipCode: string;
    };
  };
  notice?: string;
  logo?: {
    fileName: string;
  };
}
interface ClientCategory {
  code01: string;
  code02: string;
  id: number;
}

interface clientsState {
  loading: boolean;
  clients: Client[];
  error: string;
  offset: number;
  limit: number;
  page: number;
  clientDetails: Client | null;
  clientSearch: Client | null;
  clientCategory: ClientCategory[] | null;
  selectedIdName: number | null;
}
const initialState: clientsState = {
  loading: false,
  clients: [],
  error: "",
  offset: 0,
  limit: 5,
  page: 1,
  clientDetails: null,
  clientSearch: null,
  clientCategory: null,
  selectedIdName: null,
};

const headerAPI = {
  headers: {
    "X-Instance-Name": apiInstance,
    Authorization: "Basic " + btoa(`${apiUser}:${apiKey}`),
  },
};

// Klienti
export const fetchClients = createAsyncThunk<
  Client[],
  { offset: number; limit: number; force?: boolean }
>("client/fetchClient", async ({ offset, limit }) => {
  const response = await fetch(
    `https://app.raynet.cz/api/v2/company/?offset=${offset}&limit=${limit}`,

    headerAPI
  );

  if (!response.ok) {
    throw new Error("Chyba při načtení klientů");
  }

  const data = await response.json();

  return data.data;
});

// Klienti detail
export const fetchClientDetails = createAsyncThunk<Client, number>(
  "client/fetchClientDetails",
  async (clientId) => {
    const response = await fetch(
      `https://app.raynet.cz/api/v2/company/${clientId}/`,

      headerAPI
    );

    if (!response.ok) {
      throw new Error("Chyba při načtení detailů klienta");
    }

    const data = await response.json();

    return data.data;
  }
);

// Klienti search
export const fetchClientSearch = createAsyncThunk<Client[], string>(
  "search/fetchClientSearch",
  async (searchText) => {
    const response = await fetch(
      `https://app.raynet.cz/api/v2/company/?fulltext=${searchText}`,
      headerAPI
    );

    if (!response.ok) {
      throw new Error("Chyba při hledání klienta");
    }

    const data = await response.json();
    return data.data;
  }
);

// Kategorie klient
export const fetchClientCategory = createAsyncThunk<ClientCategory[]>(
  "category/fetchClientCategory",
  async () => {
    const response = await fetch(
      `https://app.raynet.cz/api/v2/companyCategory/`,

      headerAPI
    );

    if (!response.ok) {
      throw new Error("Chyba při načtení kategorie");
    }

    const data = await response.json();

    return data.data;
  }
);

export const fetchFilterStav = createAsyncThunk<
  Client[],
  { filterType: string; filterValue?: string | null }
>("filterStav/fetchClientFilter", async ({ filterType, filterValue }) => {
  const validStates = [
    "A_POTENTIAL",
    "B_ACTUAL",
    "C_DEFERRED",
    "D_UNATTRACTIVE",
  ];
  const validRoles = [
    "A_SUBSCRIBER",
    "B_PARTNER",
    "C_SUPPLIER",
    "D_RIVAL",
    "E_OWN",
  ];
  const validRating = ["A", , "B", "C"];

  let response;

  if (
    filterType === "state" &&
    filterValue &&
    validStates.includes(filterValue)
  ) {
    response = await fetch(
      `https://app.raynet.cz/api/v2/company/?state=${filterValue}`,
      headerAPI
    );
  } else if (
    filterType === "role" &&
    filterValue &&
    validRoles.includes(filterValue)
  ) {
    response = await fetch(
      `https://app.raynet.cz/api/v2/company/?role=${filterValue}`,
      headerAPI
    );
  } else if (
    filterType === "rating" &&
    filterValue &&
    validRating.includes(filterValue)
  ) {
    response = await fetch(
      `https://app.raynet.cz/api/v2/company/?rating=${filterValue}`,
      headerAPI
    );
  } else if (filterType === "kategorie" && filterValue) {
    response = await fetch(
      `https://app.raynet.cz/api/v2/company/?category=${filterValue}`,
      headerAPI
    );
  } else {
    throw new Error("Neplatný filtr");
  }

  const data = await response.json();
  return data.data;
});

const clientSlice = createSlice({
  name: "clients",
  initialState,
  reducers: {
    increaseOffset(state) {
      state.offset += state.limit;
    },
    decreaseOffset(state) {
      state.offset = Math.max(state.offset - state.limit, 0);
    },
    increasePage(state) {
      state.page++;
    },
    decreasePage(state) {
      state.page--;
    },
    selectRow: (state, action: PayloadAction<number>) => {
      state.selectedIdName = action.payload;
    },
    deselectRow: (state) => {
      state.selectedIdName = null;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchClients.pending, (state, action) => {
      state.loading = true;
      state.error = "";

      if (action.meta.arg.force) {
        state.clients = [];
        state.clientDetails = null;
      }
    });
    builder.addCase(fetchClients.fulfilled, (state, action) => {
      state.loading = false;
      state.clients = action.payload;
      state.error = "";
    });
    builder.addCase(fetchClients.rejected, (state, action) => {
      state.loading = false;
      state.clients = [];
      state.error = action.error.message || "Chyba při načtení klientů";
    });

    // Detail
    builder.addCase(fetchClientDetails.pending, (state) => {
      state.loading = true;
      state.error = "";
    });
    builder.addCase(fetchClientDetails.fulfilled, (state, action) => {
      state.loading = false;
      state.clientDetails = action.payload;
      state.error = "";
    });
    builder.addCase(fetchClientDetails.rejected, (state, action) => {
      state.loading = false;
      state.clientDetails = null;
      state.error = action.error.message || "Chyba při načtení detailů klienta";
    });

    // Search

    builder.addCase(fetchClientSearch.pending, (state) => {
      state.loading = true;
      state.error = "";
    });
    builder.addCase(fetchClientSearch.fulfilled, (state, action) => {
      state.loading = false;
      state.clients = action.payload;
      state.error = "";
    });
    builder.addCase(fetchClientSearch.rejected, (state, action) => {
      state.loading = false;
      state.clientSearch = null;
      state.error = action.error.message || "Chyba při hledání klienta";
    });

    // Kategorie
    builder.addCase(fetchClientCategory.pending, (state) => {
      state.loading = true;
      state.error = "";
    });
    builder.addCase(fetchClientCategory.fulfilled, (state, action) => {
      state.loading = false;
      state.clientCategory = action.payload;
      state.error = "";
    });
    builder.addCase(fetchClientCategory.rejected, (state, action) => {
      state.loading = false;
      state.clientCategory = null;
      state.error = action.error.message || "Chyba při hledání klienta";
    });

    // Filter stav
    builder.addCase(fetchFilterStav.pending, (state) => {
      state.loading = true;
      state.error = "";
    });
    builder.addCase(fetchFilterStav.fulfilled, (state, action) => {
      state.loading = false;
      state.clients = action.payload;
      state.error = "";
    });
    builder.addCase(fetchFilterStav.rejected, (state, action) => {
      state.loading = false;
      state.clients = [];
      state.error = action.error.message || "Chyba při filtrování";
    });
  },
});

export const {
  increaseOffset,
  decreaseOffset,
  increasePage,
  decreasePage,
  selectRow,
  deselectRow,
} = clientSlice.actions;

export default clientSlice.reducer;
