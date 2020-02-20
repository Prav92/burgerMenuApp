import React, { Component } from "react";
import Button from "../../../components/UI/Button/Button";
import classes from "./ContactData.css";
import Spinner from "../../../components/UI/Spinner/Spinner";
import axios from "../../../axios-orders";
import Input from "../../../components/UI/Input/Input";

class ContactData extends Component {
  state = {
    orderForm: {
      name: {
        elementType: "input",
        elementConfig: {
          type: "text",
          placeholder: "Your Name"
        },
        value: "",
        validation: {
          required: true
        },
        valid: false,
        touched: false
      },

      street: {
        elementType: "input",
        elementConfig: {
          type: "text",
          placeholder: "Street"
        },
        value: "",
        validation: {
          required: true
        },
        valid: false,
        touched: false
      },
      zipcode: {
        elementType: "input",
        elementConfig: {
          type: "text",
          placeholder: "Zip code"
        },
        value: "",
        validation: {
          required: true,
          minLegth: 5,
          maxLegth: 7
        },
        valid: false,
        touched: false
      },
      country: {
        elementType: "input",
        elementConfig: {
          type: "text",
          placeholder: "Your Country"
        },
        value: "",
        validation: {
          required: true
        },
        valid: false,
        touched: false
      },
      email: {
        elementType: "input",
        elementConfig: {
          type: "email",
          placeholder: "Your Email"
        },
        value: "",
        validation: {
          required: true
        },
        valid: false,
        touched: false
      },
      deliveryMethod: {
        elementType: "select",
        elementConfig: {
          options: [
            {
              value: "fastest",
              displayValue: "Fastest"
            },
            {
              value: "cheapest",
              displayValue: "Cheapest"
            }
          ]
        },
        value: "",
        validation: {},
        valid: true
      }
    },
    loading: false,
    formIsValid: false
  };

  checkValidity = (value, rules) => {
    let isValid = true;
    if (!rules) {
      return true;
    }
    if (rules.required) {
      isValid = value.trim() !== "" && isValid;
    }

    if (rules.minLegth) {
      isValid = value.length >= rules.minLegth && isValid;
    }

    if (rules.maxLegth) {
      isValid = value.length <= rules.maxLegth && isValid;
    }

    return isValid;
  };

  orderHandler = event => {
    event.preventDefault();
    this.setState({
      loading: true
    });

    const formData = {};
    for (let formElementIdentifier in this.state.orderForm) {
      formData[formElementIdentifier] = this.state.orderForm[
        formElementIdentifier
      ].value;
    }
    const order = {
      ingredients: this.props.ingredients ? this.props.ingredients : [],
      price: this.props.price,
      orderData: formData
    };

    axios
      .post("/orders.json", order)
      .then(response => {
        this.setState({ loading: false });
        this.props.history.push("/");
      })

      .catch(error => {
        this.setState({ loading: false });
      });
  };

  inputChangeHandler = (event, inputIdentifier) => {
    const updateOrderForm = { ...this.state.orderForm };

    const updateFormElement = { ...updateOrderForm[inputIdentifier] };

    updateFormElement.value = event.target.value;
    updateFormElement.valid = this.checkValidity(
      updateFormElement.value,
      updateFormElement.validation
    );
    updateFormElement.touched = true;
    updateOrderForm[inputIdentifier] = updateFormElement;
    let formIsValid = true;
    for (let inputIdentifier in updateOrderForm) {
      formIsValid = updateOrderForm[inputIdentifier].valid && formIsValid;
    }
    this.setState({
      orderForm: updateOrderForm,
      formIsValid: formIsValid
    });
  };

  render() {
    const formElementsArray = [];

    for (let key in this.state.orderForm) {
      formElementsArray.push({
        id: key,
        config: this.state.orderForm[key]
      });
    }
    console.log(formElementsArray, "array");
    let form = (
      <form onSubmit={this.orderHandler}>
        {formElementsArray.map(formElement => (
          <Input
            key={formElement.id}
            elementType={formElement.config.elementType}
            value={formElement.config.value}
            elementConfig={formElement.config.elementConfig}
            changed={event => {
              this.inputChangeHandler(event, formElement.id);
            }}
            shouldValide={formElement.config.validation}
            invalid={!formElement.config.valid}
            touched={formElement.config.touched}
          />
        ))}
        <Button btnType="Success" disabled={!this.state.formIsValid}>
          Order
        </Button>
      </form>
    );

    if (this.state.loading) {
      form = <Spinner />;
    }
    return (
      <div className={classes.ContactData}>
        <h4>Enter your Conduct Data</h4>
        {form}
      </div>
    );
  }
}

export default ContactData;
