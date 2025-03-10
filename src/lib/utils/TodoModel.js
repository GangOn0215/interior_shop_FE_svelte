export class Todo {
  constructor(id, title, todo, complete = false) {
    this.id = id;             // auto increament
    this.title = title;       // not null
    this.todo = todo;         // not null
    this.complete = complete; // not null default : 'Y' 
    this.createAt = new Date();
  }

  toggle() {
    this.complete = !this.complete;
  }

  update(newData) {
    Object.assign(this, newData);

    return this;
  }
}