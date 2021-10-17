import {
  createStore,
  action,
  Action,
  createTypedHooks,
} from 'easy-peasy';

interface Search {
  searchResult: Object | null;
  searchLoading: boolean;
  setSearchResult: Action<Search, Object | null>;
  setSearchLoading: Action<Search, boolean>;
}

interface Profile {
  profileData: Object | null;
  profileLoading: boolean;
  setProfileData: Action<Profile, Object | null>;
  setProfileLoading: Action<Profile, boolean>;
}

export interface StoreModel {
  search: Search;
  profile: Profile;
}

interface InitialState {
  search: {
    searchResult: Object | null;
    searchLoading: boolean;
  };
  profile: {
    profileData: Object | null;
    profileLoading: boolean;
  };
}

const typedHooks = createTypedHooks<StoreModel>();
export const useStoreActions = typedHooks.useStoreActions;
export const useStoreDispatch = typedHooks.useStoreDispatch;
export const useStoreState = typedHooks.useStoreState;

export const initialState: InitialState = {
  search: {
    searchResult: null,
    searchLoading: false,
  },
  profile: {
    profileData: null,
    profileLoading: false,
  },
};

export const searchModel: Search = {
  ...initialState.search,
  setSearchResult: action((state, payload) => {
    state.searchResult = payload;
  }),
  setSearchLoading: action((state, payload) => {
    state.searchLoading = payload;
  }),
};

export const profileModel: Profile = {
  ...initialState.profile,
  setProfileData: action((state, payload) => {
    state.profileData = payload;
  }),
  setProfileLoading: action((state, payload) => {
    state.profileLoading = payload;
  }),
};

export const storeModel: StoreModel = {
  search: searchModel,
  profile: profileModel,
};

function initStore(preloadedState = initialState) {
  return createStore<StoreModel, InitialState>(storeModel, {
    initialState: preloadedState,
  });
}

export default initStore();
