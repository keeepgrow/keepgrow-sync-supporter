export class Todo {
  id: number = Math.floor(Math.random() * 1000);
  content: string = "";
  isCompleted: boolean = false;
  color: string = "purple";

  constructor(todo?: Todo) {
    if (!todo) return;
    this.id = todo.id;
    this.content = todo.content;
    this.isCompleted = todo.isCompleted;
    this.color = todo.color;
  }
}
