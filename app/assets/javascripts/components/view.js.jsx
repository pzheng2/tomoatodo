var View = React.createClass ({

  getInitialState: function () {
    return { activeTodo: TodoStore.all()[0], todos: TodoStore.all()};
  },

  componentDidMount: function () {
    TodoStore.addChangedHandler(this.todosChanged);
    TodoStore.fetch();
  },

  componentWillUnmount: function () {
    TodoStore.removeChangedHandler(this.todosChanged);
  },

  todosChanged: function () {
    this.setState({ todos: TodoStore.all() });
  },

  findActiveTodo: function (allTodos) {
    var updatedActiveTodo = allTodos.forEach(function (todo) {
      if (todo.id === this.state.activeTodo.id) {
        return todo;
      }
    });
  },

  activateTodo: function (e) {
    e.preventDefault();
    var activeTodo = this.state.todos.find(function (todo) { return todo.title === e.currentTarget.innerHTML; });
    this.setState({ activeTodo: activeTodo });
  },

  createTodo: function (e) {
    e.preventDefault();
    this.setState({ newTodo: "true" });
  },

  render: function () {
    var active;
    if (this.state.activeTodo) {
      active = <ActiveItem todo={ this.state.activeTodo } />;
    }

    return (
      <div>
        <div className="sidebar">
        <TodoForm />
        <ul>
          {
            this.state.todos.map(function (todo) {
              return <li onClick={ this.activateTodo } key={ todo.id }>{ todo.title }</li>;
            }.bind(this))
          }
        </ul>
        </div>
        <div className="main">
          { active }
        </div>
      </div>
    );
  }

});
