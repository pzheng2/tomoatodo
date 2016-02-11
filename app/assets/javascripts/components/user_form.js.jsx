var UserForm = React.createClass({

  getInitialState: function () {
    return { username: "", password: "", errors: null };
  },

  submit: function (e) {
    e.preventDefault();
    var credentials = $(e.currentTarget).serializeJSON();
    CurrentUserStore.createUser(
      credentials,
      this.successCallback(credentials),
      this.errorCallback
    );
  },

  successCallback: function (credentials) {
    setTimeout(function () {
      CurrentUserStore.login(credentials);
    }, 1000);
  },

  errorCallback: function (errors) {
    this.setState({ errors: errors });
  },

  render: function () {
    var errors = [];
    if (this.state.errors) {
      for (var i = 0; i < this.state.errors.responseJSON.length; i++) {
        errors.push(this.state.errors.responseJSON[i]);
      }
    }

    return (
      <form onSubmit={ this.submit }>
        <ul>
          <li>
            <div className="errors">
              {
                errors.map(function (error) {
                  return <div>{ error }</div>;
                })
              }
            </div>
          </li>

          <li>
            <input className="input" type="text" name="username" placeholder="Username" />
          </li>

          <li>
            <input className="input" type="password" name="password" placeholder="Password" />
          </li>

          <li><button>Sign Up</button></li>
        </ul>
      </form>
    );
  }
});