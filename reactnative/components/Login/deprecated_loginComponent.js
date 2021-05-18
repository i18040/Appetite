import Form from "react-validation/build/form";
import Input from "react-validation/build/input";
import CheckButton from "react-validation/build/button";

import { isEmail } from "validator";
import { render } from "react-dom";

const required = value => {
    if (!value) {
      return (
        <View className="alert alert-danger" role="alert">
          This field is required!
        </View>
      );
    }
  };
  
  const email = value => {
    if (!isEmail(value)) {
      return (
        <View className="alert alert-danger" role="alert">
          This is not a valid email.
        </View>
      );
    }
  };
  render(); {
  return (
    <View
      onSubmit={this.handleLogin}
      ref={c => {this.form = c;}}
    >

      <TextInput
        type="text"
        className="form-control"
        
        validations={[required, email]}
      />

      <CheckButton
        style={{ display: "none" }}
        ref={c => {this.checkBtn = c;}}
      />
    </View>
    
  );
  }
