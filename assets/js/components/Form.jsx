import React from "react";

class Form extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      form: {
        username: ''
      }
    }

    this.onFormSubmit = this.onFormSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  onFormSubmit(e) {
    e.preventDefault();
    this.props.getData(this.state.form.username);
  }

  handleChange(event) {
    const { form } = this.state;

    form.username = event.target.value;

    this.setState({ form });
  }

  render() {
    const { tweets } = this.state;

    return (
      <form onSubmit={this.onFormSubmit}>
        <div>
          <input type="text" placeholder="Username" required onChange={this.handleChange} />
        </div>
        <div className="hidden">
          <input type="submit" value="Press me" />
        </div>
      </form>
    )
  }
}

export default Form;
