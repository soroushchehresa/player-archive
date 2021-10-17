import React from 'react'
import { shallow, mount, render } from 'enzyme'
import { createStore, StoreProvider } from 'easy-peasy'
import { storeModel } from '../src/store'
import SearchBar from '../src/components/SearchBar'

jest.mock('react', () => ({
  ...jest.requireActual('react'),
  useLayoutEffect: jest.requireActual('react').useEffect,
}))

describe('<SearchBar />', () => {
  beforeEach(() => {
    Object.defineProperty(window, 'matchMedia', {
      writable: true,
      value: jest.fn().mockImplementation((query) => ({
        matches: false,
        media: query,
        onchange: null,
        addListener: jest.fn(),
        removeListener: jest.fn(),
        addEventListener: jest.fn(),
        removeEventListener: jest.fn(),
        dispatchEvent: jest.fn(),
      })),
    })
  })

  it('Render correctly', () => {
    const store = createStore(storeModel)
    const App = shallow(
      <StoreProvider store={store}>
        <SearchBar />
      </StoreProvider>,
    )
    expect(App).toBeTruthy()
  })

  it('Loading state enable', () => {
    const store = createStore({
      ...storeModel,
      search: {
        ...storeModel.search,
        searchLoading: true,
      },
    })
    const App = render(
      <StoreProvider store={store}>
        <SearchBar />
      </StoreProvider>,
    )
    expect(App.find('.loading')).toHaveLength(1)
  })

  it('Loading state disabled', () => {
    const store = createStore({
      ...storeModel,
      search: {
        ...storeModel.search,
        searchLoading: false,
      },
    })
    const App = render(
      <StoreProvider store={store}>
        <SearchBar />
      </StoreProvider>,
    )
    expect(App.find('.loading')).toHaveLength(0)
  })

  it('Change search input text', () => {
    const mockValue = 'fabio'
    const store = createStore(storeModel)
    const App = mount(
      <StoreProvider store={store}>
        <SearchBar />
      </StoreProvider>,
    )
    const searchInput = App.find('.search-input').at(0)
    searchInput.instance().value = mockValue
    expect(searchInput.instance().value).toEqual(mockValue)
  })

  it('Check voice search functionality in unsupported env', () => {
    Object.defineProperty(window, 'alert', {
      writable: true,
      value: jest.fn(),
    })
    const store = createStore(storeModel)
    const App = mount(
      <StoreProvider store={store}>
        <SearchBar />
      </StoreProvider>,
    )
    const voiceSearch = App.find('.voice-search').at(0)
    voiceSearch.prop('onClick')()
  })
})
