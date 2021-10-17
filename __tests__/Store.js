import { createStore } from 'easy-peasy'
import { storeModel, initialState } from '../src/store'

describe('Store', () => {
  it('Initial store successfully', () => {
    const store = createStore(storeModel)
    expect(store.getState()).toEqual(initialState)
  })

  it('Check search.setSearchResult functionality', () => {
    const mockData = { 'profile-id': 'test' }
    const store = createStore(storeModel)
    store.getActions().search.setSearchResult(mockData)
    expect(store.getState().search.searchResult).toEqual(mockData)
  })

  it('Check search.searchLoading functionality', () => {
    const mockData = true
    const store = createStore(storeModel)
    store.getActions().search.setSearchLoading(mockData)
    expect(store.getState().search.searchLoading).toEqual(mockData)
  })

  it('Check profile.setProfileData functionality', () => {
    const mockData = { id: 'test' }
    const store = createStore(storeModel)
    store.getActions().profile.setProfileData(mockData)
    expect(store.getState().profile.profileData).toEqual(mockData)
  })

  it('Check profile.setProfileLoading functionality', () => {
    const mockData = true
    const store = createStore(storeModel)
    store.getActions().profile.setProfileLoading(mockData)
    expect(store.getState().profile.profileLoading).toEqual(mockData)
  })
})
