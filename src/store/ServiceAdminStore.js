import alt from '../util/alt.js'
import ServiceAdminActions from '../actions/ServiceAdminActions.js'
import eventManager from '../util/eventManager.js'
import ServiceModel from '../model/ServiceModel.js'
import { List } from 'immutable'

class ServiceAdminStore {
  constructor () {
    this.state = {
      loading: true,
      err: null,
      collection: new List()
    }

    this.bindListeners({
      handleUpdate: ServiceAdminActions.UPDATE,
      handleOnEnable: ServiceAdminActions.ON_ENABLE,
      handleOnModify: ServiceAdminActions.ON_MODIFY,
      handleFetch: ServiceAdminActions.FETCH,
      handleFailed: ServiceAdminActions.FAILED
    })

    eventManager.on('service/enable', (e) => {
      const data = JSON.parse(e.data)
      ServiceAdminActions.onEnable(new ServiceModel(data))
    })

    eventManager.on('service/disable', (e) => {
      const data = JSON.parse(e.data)
      ServiceAdminActions.onDisable(data.id)
    })

    eventManager.on('service/modify', (e) => {
      const data = JSON.parse(e.data)
      ServiceAdminActions.onModify(new ServiceModel(data))
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
      collection: (ndx === -1) ? this.state.collection.push(service) : this.state.collection.set(ndx, service)
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

export default alt.createStore(ServiceAdminStore, 'ServiceAdminStore')
