import React from 'react'
import { shallow, mount } from 'enzyme'
import { createStore, StoreProvider } from 'easy-peasy'
import { storeModel } from '../src/store'
import PlayerProfile from '../src/components/PlayerProfile'

jest.mock('react', () => ({
  ...jest.requireActual('react'),
  useLayoutEffect: jest.requireActual('react').useEffect,
}))

describe('<PlayerProfile />', () => {
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
        <PlayerProfile />
      </StoreProvider>,
    )
    expect(App).toBeTruthy()
  })

  it('Loading state enable', () => {
    const store = createStore({
      ...storeModel,
      profile: {
        ...storeModel.profile,
        profileLoading: true,
      },
    })
    const App = mount(
      <StoreProvider store={store}>
        <PlayerProfile />
      </StoreProvider>,
    )
    expect(App.find('.loading').text()).toEqual('Loading player details...')
  })

  it('Loading state disabled', () => {
    const store = createStore({
      ...storeModel,
      profile: {
        ...storeModel.profile,
        profileLoading: false,
      },
    })
    const App = mount(
      <StoreProvider store={store}>
        <PlayerProfile />
      </StoreProvider>,
    )
    expect(App.find('.loading')).toHaveLength(0)
  })

  it('Empty profile data {}', () => {
    const store = createStore({
      ...storeModel,
      profile: {
        ...storeModel.profile,
        profileData: {},
      },
    })
    const App = mount(
      <StoreProvider store={store}>
        <PlayerProfile />
      </StoreProvider>,
    )
    expect(App).toBeTruthy()
  })
})
