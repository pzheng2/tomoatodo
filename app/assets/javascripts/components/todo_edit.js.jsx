var TodoEdit = React.createClass ({

  getInitialState: function () {
    return { title: this.props.todo.title, body: this.props.todo.body, pomodoros: this.props.todo.pomodoros, errors: null };
  },

  updateTitle: function (e) {
    this.setState({ title: e.currentTarget.value });
  },

  updateBody: function (e) {
    this.setState({ body: e.currentTarget.value });
  },

  updatePomodoros: function (e) {
    this.setState({ pomodoros: e.currentTarget.value });
  },

  errorCallback: function (errors) {
    this.setState({ errors: errors });
  },

  handleSubmit: function (e) {
    TodoStore.update({
      id: this.props.todo.id,
      title: this.state.title,
      body: this.state.body,
      pomodoros: this.state.pomodoros
    }, this.errorCallback);
  },

  render: function () {
    var errors = [];
    if (this.state.errors) {
      for (var i = 0; i < this.state.errors.responseJSON.length; i++) {
        errors.push(this.state.errors.responseJSON[i]);
      }
    }

    return (
      <div>
        <div className="errors">
          {
            errors.map(function (error, i) {
              return <div key={ i }>{error}</div>;
            })
          }
        </div>
        <ul className="todo-fields group">
          <li><label>Title
            <input onChange={ this.updateTitle } value={ this.state.title } type="text" />
          </label></li>
          <li><label>Body
            <input onChange={ this.updateBody } value={ this.state.body } type="textarea" />
          </label></li>
          <li><label>Pomodoros
            <input onChange={ this.updatePomodoros } value={ this.state.pomodoros } type="number" />
          </label></li>
          <li><button onClick={ this.handleSubmit }>Submit</button></li>
        </ul>
      </div>
    );
  }

});
