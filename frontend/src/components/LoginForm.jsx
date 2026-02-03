const LoginForm = (props) => {
  return (
    <div>
      <h2>Login</h2>
      <form onSubmit={props.handleSubmit}>
        <div>
          username
          <input
            data-testid="username"
            type="text"
            value={props.username}
            name="Username"
            onChange={props.handleUsernameChange}
          />
        </div>
        <div>
          password
          <input
            data-testid="password"
            type="password"
            value={props.password}
            name="Password"
            onChange={props.handlePasswordChange}
          />
        </div>
        <button type="submit">login</button>
      </form>
    </div>
  )
}

export default LoginForm
