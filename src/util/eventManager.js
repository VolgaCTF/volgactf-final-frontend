class EventManager {
  constructor () {
    this.eventSource = null
    this.queue = []
  }

  get enabled () {
    return window.EventSource != null
  }

  get readyState () {
    if (this.enabled) {
      return this.eventSource ? this.eventSource.readyState : -2
    }
    return -1
  }

  connect () {
    if (this.enabled) {
      this.eventSource = new window.EventSource('/stream/')
      for (const entry of this.queue) {
        this.eventSource.addEventListener(entry.name, entry.handler)
      }
    }
  }

  disconnect () {
    if (this.eventSource) {
      this.eventSource.close()
    }
  }

  on (eventName, eventHandler) {
    if (this.eventSource) {
      this.eventSource.addEventListener(eventName, eventHandler)
    } else {
      this.queue.push({
        name: eventName,
        handler: eventHandler
      })
    }
  }

  off (eventName, eventHandler) {
    if (this.eventSource) {
      this.eventSource.removeEventListener(eventName, eventHandler)
    }
  }
}

export default new EventManager()
