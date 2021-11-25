import { NextPage } from 'next';
import { ChangeEvent, useState } from 'react';
import axios from 'axios';

const Register: NextPage = () => {
  const [values, setValues] = useState({
    name: '',
    email: '',
    password: '',
    secret: '',
  });

  const onChange = (event: ChangeEvent<HTMLInputElement>) =>
    setValues({ ...values, [event.target.name]: event.target.value });

  const onSubmit = (event: ChangeEvent<HTMLFormElement>) => {
    event.preventDefault();
    axios
      .post('http://localhost:8000/api/register', values)
      .then((res) => console.log(res))
      .catch((err) => console.log(err));
  };

  return (
    <div className="container-fluid">
      <div className="row py-5 bg-secondary text-light">
        <div className="col text-center">
          <h1>Register Page</h1>
        </div>
      </div>

      <div className="row py-5">
        <div className="col-md-6 offset-md-3">
          <form onSubmit={onSubmit}>
            <div className="form-group p-2">
              <small>
                <label className="text-muted">Your Name</label>
              </small>
              <input
                value={values.name}
                name="name"
                onChange={onChange}
                type="text"
                className="form-control"
                placeholder="Enter Name"
              />
            </div>
            <div className="form-group p-2">
              <small>
                <label className="text-muted">Email Address</label>
              </small>
              <input
                value={values.email}
                name="email"
                onChange={onChange}
                type="email"
                className="form-control"
                placeholder="Enter email"
              />
            </div>
            <div className="form-group p-2">
              <small>
                <label className="text-muted">Password</label>
              </small>
              <input
                value={values.password}
                onChange={onChange}
                name="password"
                type="password"
                className="form-control"
                placeholder="Enter password"
              />
            </div>

            <div className="form-group p-2">
              <small>
                <label className="text-muted">Pick a question</label>
              </small>
              <select className="form-control">
                <option>What is your favourite color?</option>
                <option>{"What is your best friend's name?"}</option>
                <option>What city you were born?</option>
              </select>

              <small className="form-text text-muted">
                You can use this to reset your password if forgotten.
              </small>
            </div>

            <div className="form-group p-2">
              <input
                value={values.secret}
                onChange={onChange}
                name="secret"
                type="text"
                className="form-control"
                placeholder="Write your answer here"
              />
            </div>

            <div className="form-group p-2">
              <button className="btn btn-primary col-12">Submit</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Register;
