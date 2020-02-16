import React from "react";
import { Form, Accordion, Card, Button } from "react-bootstrap";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import { updateModule } from "../Actions";
import Loader from "../components/Loader";

class UpdateModule extends React.Component {
  constructor() {
    super();
    this.state = {
      title: null,
      description: null,
      body: null,
      faq: null
    };
  }

  handleChange = ({ target: { name, value } }) => {
    this.setState({ [name]: value });
  };

  componentDidMount() {
    fetch(
      `/api/v1/subjects/${this.props.module &&
        this.props.module.subject._id}/modules/${this.props.module &&
        this.props.module._id}`,
      {
        method: "GET",
        headers: {
          "content-type": "application/json",
          authorization: localStorage.token
        }
      }
    )
      .then(res => res.json())
      .then(Module => {
        if (Module.success) {
          this.setState({
            title: Module.module && Module.module.title,
            description: Module.module && Module.module.description,
            body: Module.module && Module.module.body,
            faq: Module.module && Module.module.faq
          });
        }
      });
  }

  handleUpdate = event => {
    event.preventDefault();
    this.props.dispatch(
      updateModule(
        this.props.module && this.props.module.subject._id,
        this.props.module && this.props.module._id,
        this.state.title,
        this.state.description,
        this.state.body,
        this.state.faq,
        this.props.history
      )
    );
  };
  render() {
    return (
      <section className="update_form_container">
        {this.state.title ||
        this.state.description ||
        this.state.body ||
        this.state.faq ? (
          <Form onSubmit={this.handleUpdate}>
            <Form.Group controlId="formBasicEmail">
              <Form.Label>Title</Form.Label>
              <Form.Control
                type="text"
                placeholder="Update Title of the module"
                name="title"
                onChange={this.handleChange}
                value={this.state.title}
              />
              <Form.Text className="text-muted">
                create a module that prople can read!
              </Form.Text>
            </Form.Group>

            <Form.Group controlId="formBasicPassword">
              <Form.Label>Description</Form.Label>
              <Form.Control
                type="text"
                placeholder="Update Description for module"
                name="description"
                onChange={this.handleChange}
                value={this.state.description}
              />
            </Form.Group>
            <Form.Group controlId="formBasicEmail">
              <Form.Label>Body</Form.Label>

              <textarea
                className="form_module_update"
                as="textarea"
                rows="30"
                name="body"
                onChange={this.handleChange}
                value={this.state.body}
                placeholder="Update your content in Mark down"
              ></textarea>

              <Form.Text className="text-muted"></Form.Text>
            </Form.Group>
            <Form.Group controlId="formBasicEmail">
              <Form.Label>FAQ</Form.Label>

              <textarea
                className="form_module-faq_update"
                as="textarea"
                rows="30"
                name="faq"
                value={this.state.faq}
                onChange={this.handleChange}
                placeholder="Update faq in Mark down"
              ></textarea>

              <Form.Text className="text-muted"></Form.Text>
            </Form.Group>
            <Button variant="primary" type="submit">
              Update  ✓
            </Button>
          </Form>
        ) : (
          <Loader />
        )}
      </section>
    );
  }
}

function mapStateToProps({ modules }) {
  return {
    module: modules.module && modules.module.module
  };
}

export default connect(mapStateToProps)(withRouter(UpdateModule));
