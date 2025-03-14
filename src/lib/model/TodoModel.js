// import { formatDate } from "$lib/utils/common";
import { formatDate } from "../utils/common.js";

export class Todo {
  constructor({ 
    id, 
    user_id, 
    title, 
    content, 
    complete = 'N',
    created_id,
    created_at,
    latest_id,
    latest_at
  } = {}) {
    this.id = id || null;                 // auto increment
    this.user_id = user_id;       // not null
    this.title = title;           // not null
    this.content = content;       // not null
    this.complete = complete || 'N';     // not null default : 'Y'
    this.created_at = created_at || formatDate(new Date());
    this.created_id = created_id;
    this.latest_at = latest_at || null;
    this.latest_id = latest_id || null;
  }

  toggle() {
    this.complete = this.complete === 'Y' ? 'N' : 'Y';
  }

  setLatest() {
    this.latest_id = this.user_id;
    this.latest_at = formatDate(new Date());
  }

  update(newData) {
    Object.assign(this, newData);

    return this;
  }
}

// todoList = todoList.map(element => {
//   element.created_at = formatDate(element.created_at);
//   return new Todo(element);
// });

// return todoList;