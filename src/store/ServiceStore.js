import alt from '../util/alt.js'
import ServiceActions from '../actions/ServiceActions.js'
import eventManager from '../util/eventManager.js'
import ServiceModel from '../model/ServiceModel.js'
import { List } from 'immutable'

class ServiceStore {
  constructor () {
    this.state = {
      loading: true,
      err: null,
      collection: new List()
    }

    this.bindListeners({
      handleUpdate: ServiceActions.UPDATE,
      handleOnEnable: ServiceActions.ON_ENABLE,
      handleOnDisable: ServiceActions.ON_DISABLE,
      handleOnModify: ServiceActions.ON_MODIFY,
      handleFetch: ServiceActions.FETCH,
      handleFailed: ServiceActions.FAILED
    })

    eventManager.on('service/enable', (e) => {
      const data = JSON.parse(e.data)
      ServiceActions.onEnable(new ServiceModel(data))
    })

    eventManager.on('service/disable', (e) => {
      const data = JSON.parse(e.data)
      ServiceActions.onDisable(data.id)
    })

    eventManager.on('service/modify', (e) => {
      const data = JSON.parse(e.data)
      ServiceActions.onModify(new ServiceModel(data))
    })
  }

  handleUpdate (services) {
    this.setState({
      loading: false,
      err: null,
      collection: services
    })
  }

  handleOnEnable (service) {
    this.setState({
      loading: false,
      err: null,
      collection: this.state.collection.push(service)
    })
  }

  handleOnDisable (serviceId) {
    this.setState({
      loading: false,
      err: null,
      collection: this.state.collection.filter(x => x.id !== serviceId)
    })
  }

  handleOnModify (service) {
    const ndx = this.state.collection.findIndex(x => x.id === service.id)
    this.setState({
      loading: false,
      err: null,
      collection: (ndx === -1) ? this.state.collection.push(service) : this.state.collection.set(ndx, service)
    })
  }

  handleFetch () {
    this.setState({
      loading: true,
      err: null,
      collection: new List()
    })
  }

  handleFailed (err) {
    this.setState({
      loading: false,
      err: err,
      collection: new List()
    })
  }
}

export default alt.createStore(ServiceStore, 'ServiceStore')
