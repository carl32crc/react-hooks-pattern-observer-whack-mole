
class Subject {

  observers = [];

  attach(observer) {
    this.observers.push(observer);
  }

  detach(observer) {
    this.observers = this.observers.filter(observerToRemove => observerToRemove !== observer);
  }
  
  publish(data) {
    if(this.observers.length > 0) {
      this.observers.forEach(fn => fn(data)); 
    }
  }
}

export {
  Subject
}